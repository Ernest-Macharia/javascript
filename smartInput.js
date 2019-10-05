const smartInput = (event,fieldIndex,fields) =>{
    if (fieldIndex < 4 ){
        let{target} = event
        const allowedKeys = ["Backspace","Delete","Tab","ArrowUp","ArrowDown","ArrowRight","ArrowLeft"]
        const checkAllowed = allowedKeys.includes(event.node)
        if (isNaN(event.key)&& !allowedKeys){
            event.preventDefault();
        }
        let innerIndex = target.selectionStart
        if (target.value.length === 4 &&fieldIndex !=3){
            smartCursor(event, fieldIndex, fields);
            fieldIndex = fieldIndex + 1;
            innerIndex = 0;
            target = fields[fieldIndex];
        }
        if (appState.cardDigits[fieldIndex] == null){
            appState.cardDigits[fieldIndex] = [];
        }
        if (event.key === 'Backspace') {
            appState.cardDigits[fieldIndex][innerIndex-1] = null;
        }
        else if(event.code == 'Delete'){
            appState.cardDigits[fieldIndex][innerIndex] = null;
        }
        let checkNull = false;
        if (appState.cardDigits[fieldIndex].length > 0){
            checkNull = appState.cardDigits[fieldIndex].some((item) => {return item === null});
        }
        if ((appState.cardDigits[fieldIndex].length < 4 || checkNull) && !isNaN(event.key)){
            appState.cardDigits[fieldIndex][innerIndex] = event.key;
        }
        if(!isNaN(event.key) && fieldIndex < 3){
            setTimeout(() => {
                target.value = '#'.repeat(appState.cardDigits[fieldIndex].length);
                if(fieldIndex == 0 && appState.cardDigits[fieldIndex].length == 4){
                    let first4Digits = appState.cardDigits[0]
                    detectCardType(first4Digits);
                }				
                }, 500)
        }
    }
};
 