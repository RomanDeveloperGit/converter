class Currency {
	static url = "https://www.cbr-xml-daily.ru/latest.js";

	static async startLoading() {
		document.querySelector( ".converter__loading" ).setAttribute( "style", "display: block" );
	}

	static async stopLoading() {
		document.querySelector( ".converter__loading" ).setAttribute( "style", "display: none" );
	}

	static async requestValues( requestTypes ) {
		this.startLoading();

		try {
			const data = await fetch( "https://www.cbr-xml-daily.ru/latest.js" );
			const { rates } = await data.json();

			const response = { "RUB": 1 };

			requestTypes.forEach( type => {
				const currecnyInRUB = 1 / rates[type];
				
				if (type in rates) response[type] = parseFloat( currecnyInRUB.toFixed( 2 ) );
				else response[type] = 0;
			});


			this.stopLoading();

			return response;
		}
		catch (error) {
			console.error( error );

			this.stopLoading();
			
			return {
				"RUB": 1,
				"USD": 105.81,
				"EUR": 115.62,
				"KZT": 0.20,
				"INR": 1.38,
			};
		}
	}
}