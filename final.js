 const supportedCards = {
        visa, mastercard
      };
      
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
        const appState = {};
        const formatAsMoney = (amount,buyerCountry) => {
          for (let i = 0; i < countries.length; i++){
            let nation = countries[i];
            if (nation.country === buyerCountry){
              return amount.toLocaleString(nation.code,{
                style: 'currency',
                currency: nation.currency
              });
            }
          }
         return amount.toLocaleString("en-US",{
           style: 'currency',
           currency: 'USD'
           
         });
        };
          
     const flagIfInvalid = (field, isValid) =>{ 
       if(isValid){
         field.classList.remove("is-invalid");
       }
       else{
         field.classList.add("is-invalid");
       }
     };
        const expiryDateFormatIsValid = (target) =>{
          if(target === "MMYY")
            return true;
          else return false;
          
        };
        
        
      const detectCardType = ({target})=>{
       const creditCardDiv = document.querySelector('[data-credit-card]')
       const creditCardImage = document.querySelector('[data-card-type]')
       let firstFourDigits = target.value;
        let cardType;
        if (firstFourDigits.split(""))[0]=="4";{
          creditCardDiv.classList.remove("is-mastercard");
          creditCardDiv.classList.add("is-visa");
          cardType = "is-visa";
        }
        else {
          creditCardDiv.classList.remove("is-visa");
          creditCardDiv.classList.add("is-mastercard");
          cardType = "is-mastercard";
        }
        if (cardType == "is-visa"){
          creditCardImage.src = supportedCards.visa
        }
        else{
          creditCardImage.src = supportedCards.mastercard
        }
        return cardType
      
      ;
        const validateCardExpiryDate = ({target})=>{
    
          let valid = expiryDateFormatIsValid(target.textContent)
          flagIfInvalid(target, valid)
          return valid
          
      };
        
      
      
      const validateCardHolderName = ({target})=>{
        const value = target.value;
        const regname = /^[a-zA]{3,50}$/;
        if (regname.test(value)){
          return flagIfInvalid(target,isValid)
        }
        
      };
        const validateCardNumber = ()  =>{
          
        } ;      
             
      const uiCanInteract = () => {
        document.querySelector('[data-cc-digits]').addEventListener('blur',detectCardType);
        document.querySelector('[data-cc-info] >input').addEventListener('blur',validateCardHolderName);
        document.querySelector('[data-cc-info].second').addEventListener('blur',validateCardExpiryDate);
        document.querySelector('[data-pay-btn]').addEventListener('click',validateCardNumber);
        document.querySlector('[data-cc-digits] input')[0].focus()
      };
        
      const displayCartTotal = ({results}) =>{
        let [data] = results;
        let {itemsInCart, buyerCountry} = data;
        const initial = 0;
        appState.items = itemsInCart;
        appState.country = buyerCountry;
        appState.bill = itemsInCart.reduce((total, value) => {
          total += value.price * value.qty;
          return total}, 0);
        appState.billFormated = formatAsMoney(appState.bill, appState.country);
        document.querySelector('[data-bill]').textContent = appState.billFormated;
        uiCanInteract();
      };
        const fetchBill = () => {
          const api = 'https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c';
        
        fetch(api).then(response => {
          return response.json();
        }).then(data => {
          displayCartTotal(data);
        })
          .catch(err => 
          console.log(err));
        
        };
        
      const startApp = () => {
        fetchBill();
      };

      startApp();