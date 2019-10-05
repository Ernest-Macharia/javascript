const smartInput = (event, fieldIndex,fields) => {
		 
		  
    const keysControl = ["Tab","Delete","Backspace","ArrowLeft","Shift","ArrowRight","ArrowUp","ArrowDown"];
    const allowedCheck = keysControl.includes(event.key);
    if(!allowedCheck){
        if(fieldIndex <= 3){
            if(/^\d$/.test(event.key)){
                if(appState.cardDigits[fieldIndex] === undefined){
              appState.cardDigits[fieldIndex] = [];	  
                }
                const field = fields[fieldIndex];
                event.preventDefault();
                const target = event.target;
                let {selectionStart, value} = target;
                appState.cardDigits[fieldIndex][selectionStart] = +event.key;
                target.value = value.substr(0, selectionStart) + event.key + value.substr(selectionStart + 1);
          setTimeout(() => {
              console.log(appState.cardDigits)
              appState.cardDigits[fieldIndex] = target.value.split('').map((curr, i) => (curr >= '0' && curr <= '9') ? Number(curr): Number(appState.cardDigits[fieldIndex][i]));
              if(fieldIndex < 3 ){
                  target.value = target.value.replace(/\d/g, '$');
              }
              smartCursor(event, fieldIndex, fields);
              if(fieldIndex == 0 && taget.value.length >= 4){
                  let first4Digits = appState.cardDigits[0];
                  console.log(first4Digits);
                  console.log(typeof first4Digits);
                  detectCardType(first4Digits);
              }
          }, 500);	  
            } else{
                event.preventDefault();
            }
        } else if(fieldIndex === 4){
            if(/[a-z]|\s/i.test(event.key)){
                setTimeout(() => {
                    smartCursor(event, fieldIndex, fields);
                }, 500);
            } else{
                event.preventDefault();
            }
        } else{
            if(/\d|\//.test(event.key)){
                setTimeout(() => {
                    smartCursor(event, fieldIndex, fields);
                }, 500);
            } else{
                event.preventDefault();
            }
        }
    } else{
        if (event.key === 'Backspace'){
            if(appState.cardDigits[fieldIndex].length > 0){
                appState.cardDigits[fieldIndex].splice(-1, 1)
            }
            smartBackSpace(event, fieldIndex, fields);
        } else if(event.key == 'Delete'){
            if(appState.cardDigits[fieldIndex].length > 0){
                appState.cardDigits[fieldIndex].splice(1,1)
            }
        }
    }
    
};