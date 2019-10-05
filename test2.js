// const supportedCards = {
//     visa, mastercard
//   };
  
  const countries = [
    {
      code: "US",
      currency: "USD",
      country: 'United States'
    },
    {
      code: "NG",
      currency: "NGN",
      country: 'Nigeria'
    },
    {
      code: 'KE',
      currency: 'KES',
      country: 'Kenya'
    },
    {
      code: 'UG',
      currency: 'UGX',
      country: 'Uganda'
    },
    {
      code: 'RW',
      currency: 'RWF',
      country: 'Rwanda'
    },
    {
      code: 'TZ',
      currency: 'TZS',
      country: 'Tanzania'
    },
    {
      code: 'ZA',
      currency: 'ZAR',
      country: 'South Africa'
    },
    {
      code: 'CM',
      currency: 'XAF',
      country: 'Cameroon'
    },
    {
      code: 'GH',
      currency: 'GHS',
      country: 'Ghana'
    }
  ];
  
  // Data Container
  const appState = {};
  
  // Fetch data from external API
  const fetchBill = () => {
    const api = "https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c";
    
    fetch(api).then(response => {
      return response.json();
    }).then(data => {
      // Pass json to displayCart
      console.log(data);
      displayCartTotal(data);
    }).catch(error => console.log(error));
  };
  
  // Display 
  const displayCartTotal = ({results}) => {
    const [data] = results;
    const {itemsInCart, buyerCountry } = data;
    // Reduce(), initial 
    const initial = 0; 
    
    // Setting appState {}
    appState.items = itemsInCart;
    appState.country = buyerCountry;
    appState.bill = itemsInCart.reduce((accumulator, currentValue) => {
      //value = value.price * value.qty;
      return accumulator + (currentValue['price'] * currentValue['qty']);
    }, initial);
    appState.billFormatted = formatAsMoney(appState.bill, appState.country);
    
    // Outputting to <span data-bill />
    document.querySelector('[data-bill]').textContent = appState.billFormatted;
    
    // Invoking ui
    uiCanInteract()
    
  };
  
  // Formatting bill
  const formatAsMoney = (amount, buyerCountry) => {
    // amount = amount.toLocaleString();
    // let currency = '';
    
    // Set currency 
    // for (const country of countries) {
    //   if(country.country == buyerCountry){
    //     currency = country.currency;
    //     break;
    //   } else {
    //     currency = countries.find(defaultCountry => 
    //       defaultCountry.country = "United States"
    //     ).currency;
    //   }
    // }
    const country = countries.find(country => {
      return country.country === buyerCountry;
    }) || countries.find(country =>  {
      return country.country === "United States";
    })

    const newAmount = amount.toLocaleString(`en-${country.code}`, {style: 'currency', currency: country.currency || 'USD'});

    return newAmount;


  }
  
  const flagIfInvalid = (field, isValid) => {
    console.log(field);
    if(isValid == true){
      field.classList.remove('is-invalid');
   } else {
      field.classList.add('is-invalid');
   }	
  };
  
  // Validation: credit card year = 'MM/YY'
  const expiryDateFormatIsValid = (target) => {
    const reg = /^((0[1-9])|(1[0-2]))\/(\d{2})$/;

    return reg.test(target) ? true : false;
  };
  
  // Check credit card vendor
  const detectCardType = ({target}) => {
    let creditCard = document.querySelector('[data-credit-card]');
    
    if(target.value.match('4')) {
      creditCard.classList.add("is-visa");
      creditCard.classList.remove("is-mastercard");
      document.querySelector("img[data-card-type]").src = supportedCards.visa;
      return "is-visa";
    } else if(target.value.match('5')) {
      creditCard.classList.remove("is-visa");
      creditCard.classList.add("is-mastercard");
      document.querySelector("img[data-card-type]").src = supportedCards.mastercard;
      return "is-mastercard";
    }
    
  };
  
  // Validation: check credit card expiry date format
  //const validateCardExpiryDate = ({target}) => {
    // let bool = expiryDateFormatIsValid(target.value);
    // console.log(bool);

    // if(bool) {
    //   const dateArr = target.value.split('/');
    //   const month = dateArr[0];
    //   const year = '20' + dateArr[1];
      
    //   console.log(dateArr);

    //   const expDate = new Date(year + '-' + month + '0');

    //   console.log(expDate);
    //   if(expDate > new Date()) {
    //     flagIfInvalid(target, true);
    //     return true;
    //   } else {
    //     flagIfInvalid(target, false)
    //     return false;
    //   }
    // }

  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth();

  //   const parts = target.value.split('/');
  //   const year = parseInt(parts[1], 10) + 2000;
  //   const month = parseInt(parts[0], 10);

  //   if(!expiryDateFormatIsValid(target) && (year <= currentYear && month<currentMonth)) {
  //     flagIfInvalid(target, false);
  //     return false;
  //   } else {
  //     flagIfInvalid(target, true);
  //     return true;
  //   }


  // };
  
 // Validation: check the card holder name 
  
  //Validation: check credit card expiry date format
  const validateCardExpiryDate = ({target}) => {
    let bool = expiryDateFormatIsValid(target);
    console.log(bool)

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const cardDate = target.value.split('/');
    const year = parseInt(cardDate[1], 10) +2000;
    const month = parseInt(cardDate[0], 10);
    
    if(!bool && (year <= currentYear && month < currentMonth)){
      flagIfInvalid(target, false);
      return false;
    } else {
      flagIfInvalid(target, true);
      return true;
    }
  };
  
  const validateCardHolderName = ({target}) => {
    const value = target.value;
    const regName = /(^\w+[a-zA-z]{3}\s[a-zA-Z]{3}\w+$)/;
    //const reNamet = /([a-zA-Z]{3}\s[a-zA-Z]{3})/;
    
    console.log(value);
    let test = regName.test(value);
    console.log(test);
    if (regName.test(value)) {
      flagIfInvalid(target, true);
      return true;
    } else {
      flagIfInvalid(target, false);
      return false;
    }
  };
  
  // Luhn algorithm
  const validateWithLuhn = (digits) => {
    //const ds = digits.toString(10).split("").map(Number);
    let arr = [];
    
    for (let i = 0; i < digits.length; i++) {
      if(i % 2 == 0) {
        if(digits[i] * 2 < 10) {
          arr.push(digits[i] * 2);
        } else {
          arr.push(digits[i] * 2 - 9);
        }
      } else{
        arr.push(digits[i]);
      }
    }
    //4556372551434601
    
    const sum = arr.reduce((total, acc) => total + acc)
    return (sum % 10 === 0);
  };
  
  const validateCardNumber = () => {
    let cardInputDigits = document.querySelectorAll('[data-cc-digits] input');
    const cardDigits = cardInputDigits[0].value + cardInputDigits[1].value + cardInputDigits[2].value + cardInputDigits[3].value;
    const digits = cardDigits.toString(10).split("").map(Number);

    if(validateWithLuhn(digits)){
      document.querySelector('[data-cc-digits]').classList.remove('is-invalid');
      return true;
    } else {
      document.querySelector('[data-cc-digits]').classList.add('is-invalid');
      return false;
    }
  };
  
  const uiCanInteract = () => {
    // document.querySelector('[data-bill]').textContent = appState.billFormated;
    document.querySelector('[data-cc-digits] input:first-child').addEventListener('blur',  detectCardType);
    
    document.querySelector('[data-cc-info] input:first-child').addEventListener('blur', 
      validateCardHolderName);
    
    document.querySelector('[data-cc-info] input:nth-child(2)').addEventListener('blur',
      validateCardExpiryDate);
    
    document.querySelector('[data-pay-btn]').addEventListener('click',
      validateCardNumber);
      
    document.querySelector('[data-cc-digits] input:first-child').focus()
  };
  
  const startApp = () => {
    fetchBill();
  };

  startApp();