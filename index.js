
let county = "NRB";

switch(county){
    case "KJD":  
        console.log("Kajiado");
        break;
    case "MBS":
        console.log("Mombasa");
        break;
    case "NRB" :
        console.log("Nairobi");
        console.log("capital city")
        break;
    default:
        console.log("No county found");
        break; 
}
 
function myFunction(){
   let message = "Hello dear";
    return message;

}
 myFunction();
console.log(myFunction());

function meruUni(computer){
    computer.students = 500;
}
let computer = {
    school: "computing",
    department: "informatics",
    code: "sci",
    students: 350,
};
meruUni(computer)
console.log(computer.students);

let cards = [
    {
        suit: "hearts",
        value: "queen"
    },
    {
        suit: "clubs",
        value: "king"
    }
];

console.log(cards[1].value);
 
  let result = Math.random() * 100;
  result = Math.trunc(result);

  console.log(result);

  let res = new Date().toDateString();

  console.log(res);

  let rest = 3/3  ;
  console.log(Number.isNaN(rest));

  console.log((5< 2 )? "yes" : "no");

function startCard(carId){
    let message = "starting";
    let startFn = function turnKey(){
      let message = "override";
    }
    startFn();
    console.log(message)
}
startCard(236);
//IIFE
let pp = (function(){
    let cardId = 123;
console.log("in function");
return{};
})();
console.log(pp);
//CLOSURE
let app = (function(){
    let carId = 123;
    let getId = function(){
        return carId;
    };
return {
    getId : getId

};
    
})();
console.log(app.getId());

let w ={
    carId: 789,
    getId: function(){
    
        return this.carId;
    }
};
let newCar ={carId: 345};
console.log(w.getId.call(newCar));

let c ={
    caId: 789,
    geId: function(prefix){
    
        return prefix + this.caId;
    }
};
let neCar ={caId: 345};
console.log(c.geId.apply(neCar, ["ID: "]));
 
  

