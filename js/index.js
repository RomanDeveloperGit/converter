window.onload = async() => {
	const converter = {
		inputs: document.querySelectorAll( ".converter__input" ),
		selects: document.querySelectorAll( ".converter-select" ),
		currentItemTexts: document.querySelectorAll( ".converter-select__current-text" ),
		itemBoxes: document.querySelectorAll( ".converter-select__item-box" )
	};

	const selectedCurrencies = ["RUB", "USD"];
	
	const requestTypes = ["USD", "EUR", "KZT", "INR", "KRW"];
	const currencies = await Currency.requestValues( requestTypes );

	const convertToRUB = ( typeCurrency, value ) => currencies[typeCurrency] * value;
	const onChangeInput = ( index, value ) => {
		const _index = +!index;
		const convertedValue = convertToRUB( selectedCurrencies[index], value ) / currencies[selectedCurrencies[_index]];

		converter.inputs[_index].value = parseFloat( convertedValue.toFixed( 2 ) );
	};

	converter.itemBoxes.forEach( ( element, index ) => {
		converter.currentItemTexts[index].innerHTML = selectedCurrencies[index];

		for (const key in currencies) {
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