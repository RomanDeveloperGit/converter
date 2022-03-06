window.onload = async() => {
	const converter = {
		loading: document.querySelector( ".converter__loading" ),
		inputs: document.querySelectorAll( ".converter__input" ),
		selects: document.querySelectorAll( ".converter-select" ),
		currentItemTexts: document.querySelectorAll( ".converter-select__current-text" ),
		itemBoxes: document.querySelectorAll( ".converter-select__item-box" )
	};

	const selectedCurrencies = ["RUB", "USD"]; // Выбранные валюты в 1 и 2 селектах соответственно
	
	const requestTypes = ["USD", "EUR", "KZT", "INR", "KRW"]; // Запрашиваемые валюты
	const currencies = await Currency.getValues( requestTypes );

	converter.loading.setAttribute( "style", "display: none" );



	const convertToRUB = ( typeCurrency, value ) => currencies[typeCurrency] * value;
	const onChangeInput = ( index, value ) => {
		// Моя механика конвертации: введенное значение конвертирую в рубли, а из рублей в новую валюту.

		const _index = +!index;
		const convertedValue = convertToRUB( selectedCurrencies[index], value ) / currencies[selectedCurrencies[_index]];

		converter.inputs[_index].value = parseFloat( convertedValue.toFixed( 2 ) );
	};


	// Инициализация селектов
	converter.itemBoxes.forEach( ( element, index ) => {
		converter.currentItemTexts[index].innerHTML = selectedCurrencies[index];

		for (const key in currencies) {
			// Анатолий, объясните, пожалуйста, как это работает? Я знаю, что этой функцией мы проверяем, не перебираем ли мы случаем ключ прототипа объекта, потому что
			// они нам не нужны. Но этот перебор и так их не перебирает.
			// Можно сделать тут console.log( key ), мы увидим только собственные ключи данного объекта.
			if (Object.hasOwnProperty.call( currencies, key )) {
				const newItem = document.createElement( "li" );
				
				newItem.classList.add( "converter-select__item" );
				newItem.innerHTML = key;

				element.appendChild( newItem );
			}
		}
	});

	converter.selects.forEach( ( element, index ) => {
		element.addEventListener( "click", event => {
			const target = event.target;
			const currentItemText = converter.currentItemTexts[index];

			if (target.classList.value === "converter-select__item" && selectedCurrencies[index] != target.innerHTML) {
				selectedCurrencies[index] = target.innerHTML;
				currentItemText.innerHTML = target.innerHTML;

				onChangeInput( index, converter.inputs[index].value );
			}

			element.classList.toggle( "converter-select_actived" );
		});
	});

	converter.inputs.forEach( ( element, index ) => {
		element.removeAttribute( "disabled" );

		element.addEventListener( "input", event => {
			const value = +event.target.value;
			
			onChangeInput( index, value );
		});
	});
};