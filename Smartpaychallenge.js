<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" 
          content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    
    <title>Mini App</title>
    
    <style>
      body {
      margin: 0;
      padding: 1em;
	  background-color: white;
    }

    [data-cart-info],
    [data-credit-card] {
      transform: scale(0.78);
      margin-left: -3.4em;
    }

    [data-cc-info] input:focus,
    [data-cc-digits] input:focus {
      outline: none;
    }

    .mdc-card__primary-action,
    .mdc-card__primary-action:hover {
      cursor: auto;
      padding: 20px;
      min-height: inherit;
    }

    [data-credit-card] [data-card-type] {
      transition: width 1.5s;
      margin-left: calc(100% - 130px);
    }

    [data-credit-card].is-visa {
      background: linear-gradient(135deg, #622774 0%, #c53364 100%);
    }

    [data-credit-card].is-mastercard {
      background: linear-gradient(135deg, #65799b 0%, #5e2563 100%);
    }

    .is-visa [data-card-type],
    .is-mastercard [data-card-type] {
      width: auto;
    }

    input.is-invalid,
    .is-invalid input {
      text-decoration: line-through;
    }

    ::placeholder {
      color: #fff;
    }
      
    /* Add Your CSS From Here */

	span {
		display: inline-block;
		vertical-align: middle;
	}

	.material-icons {
		font-size: 150px;
	}

	[data-credit-card] {
		width: 435px;
		min-height: 240px;
		border-radius: 10px;
		background-color: #5d6874;
	}

	img {
		display: block;
		width: 120px;
		height: 60px;
	}

	[data-cc-digits] {
		margin-top: 2em;
	}

	[data-cc-digits]  input {
		color: white;
		font-size: 2em;
		line-height: 2em;
		border: none;
		background: none;
		margin-right: 0.5em;
	}

	[data-cc-info] {
		margin-top: 1em;
	}

	[data-cc-info] input {
		color: white;
		font-size: 1.2em;
		border: none;
		background: none;
	}

	[data-cc-info] input:nth-child(2) {
		padding-right: 10px;
		float: right;
	}

	[data-pay-btn] {
		position: fixed;
		width: 90%;
		border: 1px solid;
		bottom: 20px;
	}

    </style>
  </head>
  <body>
    
    <!-- your HTML goes here -->
	<div data-cart-info>
		<heading class="mdc-typography--headline4">
			<span class="material-icons">shopping_cart</span>
			<span data-bill></span>
		</heading>
	</div>
	<div data-credit-card class="mdc-card mdc-card--outlined">
		<div class="mdc-card__primary-action">
			<img data-card-type src="https://placehold.it/120x60.png?text=Card">
			<div data-cc-digits>
				<input type="text" size="4" placeholder="----">
				<input type="text" size="4" placeholder="----">
				<input type="text" size="4" placeholder="----">
				<input type="text" size="4" placeholder="----">
			</div>
			<div data-cc-info>
				<input type="text" size="20" placeholder="Name Surname">
				<input type="text" size="6" placeholder="MM/YY">
			</div>
		</div>
	</div>
	<button class="mdc-button" data-pay-btn>Pay Now</button>
    
    <script>
      
      const supportedCards = {
        visa, mastercard
      };

      const countries = [
        {
          code: "US",
          currency: "USD",
          currencyName: '',
          country: 'United States'
        },
        {
          code: "NG",
          currency: "NGN",
          currencyName: '',
          country: 'Nigeria'
        },
        {
          code: 'KE',
          currency: 'KES',
          currencyName: '',
          country: 'Kenya'
        },
        {
          code: 'UG',
          currency: 'UGX',
          currencyName: '',
          country: 'Uganda'
        },
        {
          code: 'RW',
          currency: 'RWF',
          currencyName: '',
          country: 'Rwanda'
        },
        {
          code: 'TZ',
          currency: 'TZS',
          currencyName: '',
          country: 'Tanzania'
        },
        {
          code: 'ZA',
          currency: 'ZAR',
          currencyName: '',
          country: 'South Africa'
        },
        {
          code: 'CM',
          currency: 'XAF',
          currencyName: '',
          country: 'Cameroon'
        },
        {
          code: 'GH',
          currency: 'GHS',
          currencyName: '',
          country: 'Ghana'
        }
      ];

      const billHype = () => {
        const billDisplay = document.querySelector('.mdc-typography--headline4');
        if (!billDisplay) return;

        billDisplay.addEventListener('click', () => {
          const billSpan = document.querySelector("[data-bill]");
          if (billSpan &&
            appState.bill &&
            appState.billFormatted &&
            appState.billFormatted === billSpan.textContent) {
            window.speechSynthesis.speak(
              new SpeechSynthesisUtterance(appState.billFormatted)
            );
          }
        });
      };
      
	  const appState = {};

	  //Function for formatting the money currency
	const formatAsMoney = (amount, buyerCountry) => {
		const country = countries.find(country =>{
			return country.country===buyerCountry;
		})||countries.find(country =>{
			return country.country==="United States";
		})
		const amountNew=amount.toLocaleString(`en-${country.code}`,{
			style:'currency', currency:country.currency||'USD'});
			return amountNew;
	};
	
	const flagIfInvalid = (field,isValid) =>{
		if(isValid === true){
			field.classList.remove('is-invalid');
		}else{
			field.classList.add('is-invalid');
		}
	};

	//Function for checking whether the expiry date format is valid
	const expiryDateFormatIsValid = (field) => {
		const regexp = /^((0[1-9])|0[1-2])\/([0-9][0-9])$/;
		if (regexp.test(field)){
			return true;
		}else{
			return false;
		}
	};

	//Function for detecting the card type
	const detectCardType = (first4Digits) =>{
		const cardDiv = document.querySelector('[data-credit-card]');
		const cardType = document.querySelector('[data-card-type]');
		//Visa
		if(first4Digits[0] === 4){
			cardDiv.classList.remove('is-mastercard');
			cardDiv.classList.add('is-visa');
			cardType.src = supportedCards.visa;
			return 'is-visa'
		}else{
			cardDiv.classList.remove('is-visa');
			cardType.src = 'https://placehold.it/120x60.png?text=card';
		}
		//mastercard
		if (first4Digits[0]===5){
			cardDiv.classList.remove('is-visa');
			cardDiv.classList.add('is-mastercard');
			cardType.src = supportedCards.mastercard;
			return 'is-mastercard'
		}else{
			cardDiv.classList.remove('is-visa');
			cardType.src = 'https://placehold.it/120x60.png?text=card';
		}
	};

	//Function for validating the expiry date of the card
	const validateCardExpiryDate = () => {
	const dateFormat = document.querySelector("[data-cc-info] input:nth-child(2)");
	const dateValue = document.querySelector("[data-cc-info] input:nth-child(2)").value
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth + 1;
	const dateCard = dateFormat.value.split("/");
	const year = parseInt(dateCard[1], 10)+2000;
	const month = parseInt(dateCard[0]);
	if (!expiryDateFormatIsValid(dateValue) && year < currentYear || (year < currentYear && month < currentMonth)){
		flagIfInvalid(dateFormat, false)
		return false;
	} else{
		flagIfInvalid(dateFormat, true)
		return true;
	}
	};

	//Function for validating the name of the card holder
	const validateCardHolderName = () => {
		const regex = /^[a-zA-Z]{3,}(\s[a-zA-Z]{3,})$/;
		const holderName = document.querySelector("[data-cc-info] input:nth-child(1)").value;
		const nameField = document.querySelector("[data-cc-info] input:nth-child(1)");
		const valid = regex.test(holderName);
		flagIfInvalid(nameField, valid)
		return valid;
	};

	const validateWithLuhn = (digits) => {
		let i;
		const doubleD = [];
		for (i=0; i<digits.length;i++){
			if (i%2==0){
				doubleD.push(digits[i]*2)
			}else{
				doubleD.push(digits[i])
			}
		}

		const checkD = [];
		let j;
		for (j of doubleD){
			if(j>9){
				checkD.push(j-9);
			}else{
				checkD.push(j);
			}
		}
		const sum = checkD.reduce((total,cur) =>total+cur);
		if (sum%10==0){
			return true
		}else{
			return false
		}
	};

	//Function for validating the card number
	const validateCardNumber = () => {
		const first = document.querySelector('[data-cc-digits]> input:nth-child(1)').value;
		const second = document.querySelector('[data-cc-digits] > input:nth-child(2)').value;
		const third = document.querySelector('[data-cc-digits] > input:nth-child(3)').value;
		const fourth = document.querySelector('[data-cc-digits] >input:nth-child(4)').value;
		const inputDiv = document.querySelector('[data-cc-digits]');
		const inputArr = [first+second+third+fourth];
		console.log(`this is card numbers ${inputArr}`)
		const inArr = [];
		let i;
		for(i of inputArr.toString()){
			inArr.push(parseInt(i));
		}
		const isCard = validateWithLuhn(inArr);
		if (isCard){
			inputDiv.classList.remove('is-invalid');
			return true;
		}else{
			inputDiv.classList.add('is-invalid');
			return false;
		}
	};

	//Function for validating the payment
	const validatePayment = () => {
		validateCardNumber();
		validateCardHolderName();
		validateCardExpiryDate();
	};

	//Function for accepting the card numbers
	const smartInput = (event, fieldIndex, fields) => {
		const controlKeys = ['Tab', 'Delete', 'Backspace', 'ArrowRight', 'ArrowLeft', 'Shift','ArrowUp','ArrowDown'];

		const isControlKey = controlKeys.includes(event.key);
		if (!isControlKey){
			if(fieldIndex <= 3){
				if (/^\d$/.test(event.key)){
					if (appState.cardDigits[fieldIndex] === undefined){
						appState.cardDigits[fieldIndex] = [];
					}

					const field = fields[fieldIndex];
					event.preventDefault();
					const target = event.target;

					let {selectionStart, value} = target;
					appState.cardDigits[fieldIndex][selectionStart] = +event.key;
					target.value = value.substr(0, selectionStart) + event.key + value.substr(selectionStart + 1);
					setTimeout(() =>{
						console.log(appState.cardDigits)

						appState.cardDigits[fieldIndex] = target.value.split('')
						.map((curr, i) =>(curr >= '0' && curr <= '9') ? Number(curr): Number(appState.cardDigits[fieldIndex][i]));
						if (fieldIndex < 3){
							target.value = target.value.replace(/\d/g, '$');
						}
						smartCursor(event, fieldIndex, fields);
						if (fieldIndex == 0 && target.value.length >= 4){
							let first4Digits = appState.cardDigits[0];

							console.log(first4Digits);
							console.log(typeof first4Digits)
							detectCardType(first4Digits);
						}

					}, 500);
				}else{
					event.preventDefault();
				}
			}else if (fieldIndex === 4){
				if (/[a-z]|\s/i.test(event.key)){
					setTimeout(() =>{
						smartCursor(event,fieldIndex,fields);
					}, 500);
				}else {
					event.preventDefault();
				}
			}else{
				if (/\d|\//.test(event.key)){
					setTimeout(() =>{
						smartCursor(event,fieldIndex, fields);
					}, 500);
				}else{
					event.preventDefault();
				}
			}
		}else{

			if (event.key === 'Backspace'){
				if (appState.cardDigits[fieldIndex].length > 0){
					appState.cardDigits[fieldIndex].splice(-1, 1)
				}
				smartBackSpace(event, fieldIndex,fields);
			}else if (event.key == 'Delete'){
				if (appState.cardDigits[fieldIndex].length > 0){
					appState.cardDigits[fieldIndex].splice(1,1)
				}
			}
		}
	};

	const smartBackSpace = (event, fieldIndex, fields) =>{
		if (fields[fieldIndex].value === '' && fieldIndex > 0 && event.key == 'Backspace'){
			fields[fieldIndex-1].focus();
		}
	};

	//smartcursor function
	const smartCursor = (event,fieldIndex,fields) => {
		if (fieldIndex < fields.length -1){
			if (fields[fieldIndex].value.length === Number(fields[fieldIndex].size)){
				fields[fieldIndex + 1].focus();
			}
		}
	};

	//function for enabling smarttyping
	const enableSmartTyping = () => {
		const [...inputfields] = document.querySelectorAll('[data-credit-card] input');
		inputfields.forEach((field,index,fields) =>{
			field.addEventListener('keydown',(event) =>{
				smartInput(event,index,fields);
			});
		});
	};

	//UI can interact function
	const uiCanInteract = () => {
		document.querySelector('[data-cc-digits]>input').focus();
		document.querySelector('[data-pay-btn]').addEventListener('click', validatePayment);

		billHype();

		enableSmartTyping ();
	};

	//Function for displaying the cart total
	const displayCartTotal = ({results}) => {
		const [data] = results;
		const {itemsInCart, buyerCountry} = data;
		appState.items = itemsInCart;
		appState.country = buyerCountry;
		appState.bill = itemsInCart.reduce((acc, item) => acc + (item.price * item.qty),0);
		appState.billFormatted = formatAsMoney(appState.bill, appState.country);
		document.querySelector('[data-bill]').textContent = appState.billFormatted;
		appState.cardDigits = [];
		uiCanInteract();
	};

	// This is the fetchBill function
	  const fetchBill = () => {
        const apiHost = 'https://randomapi.com/api';
		const apiKey = '006b08a801d82d0c9824dcfdfdfa3b3c';
		const apiEndpoint = `${apiHost}/${apiKey}`;
        fetch(apiEndpoint).then(response => response.json())
		.then(data => displayCartTotal(data)).catch(error => console.log(error));
      };
      
      const startApp = () => {
		  fetchBill();
      };


      startApp();
    </script>
  </body>
</html>