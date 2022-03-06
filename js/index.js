const converter = {
	inputs: document.querySelectorAll( ".converter__input" ),
	selects: document.querySelectorAll( ".converter-select" ),
	currentItemTexts: document.querySelectorAll( ".converter-select__current-text" ),
	itemBoxes: document.querySelectorAll( ".converter-select__item-box" )
};

const currencies = {
	"RUB": 1,
	"USD": 105.81,
	"EUR": 115.62,
	"BTC": 4122950,
	"IDR": 0.007352
};

// Выбранные валюты в 1 и 2 селектах соответственно
let selectedCurrencies = ["RUB", "USD"];

const convertToRUB = ( typeCurrency, value ) => currencies[typeCurrency] * value;

const onChangeInput = ( index, value ) => {
	// Моя механика конвертации: введенное значение конвертирую в рубли, а из рублей в новую валюту.
	const _index = +!index;

	converter.inputs[_index].value = convertToRUB( selectedCurrencies[index], value ) / currencies[selectedCurrencies[_index]];
};



// Инициализация селектов
converter.itemBoxes.forEach( ( element, index ) => {
	converter.currentItemTexts[index].innerHTML = selectedCurrencies[index];

	for (const key in currencies) {
		// Анатолий, объясните, пожалуйста, как это работает? Я знаю, что этой функцией мы проверяем, не перебираем ли мы случаем ключ прототипа объекта, потому что
		// они нам не нужны. Но этот перебор и так их не перебирает.
		// Можно сделать тут console.log( key ), мы увидим только собственные ключи данного объекта.
		if (Object.hasOwnProperty.call( currencies, key )) {
			let newItem = document.createElement( "li" );
			newItem.classList.add( "converter-select__item" );
			newItem.innerHTML = key;

			element.appendChild( newItem );
		}
	}
});

// Клик по селектам
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

// Ввод в инпуты
converter.inputs.forEach( ( element, index ) => {
	element.addEventListener( "input", event => {
		const value = +event.target.value;
		// Если слишком много ввел, то удаляем последний символ. И TOFIXED ДО 2 ЗНАКОВ

		onChangeInput( index, value );
	});
});