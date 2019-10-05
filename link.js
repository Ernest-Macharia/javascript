(function(){


var dat = document.addEventListener("DOMContentLoaded",function(e){

    var validNames = [];
    var forEach = Array.prototype.forEach;
    
    var validElements = document.querySelectorAll("span[data-rule]");
    forEach.call(validElements, function(element){
         var validName = element.getAttribute("data-rule");
         if (validNames.indexOf(validNames) < 0){
             validNames.push(validName);
         }
    });



    var validate = function(){
        var messageElements = document.querySelectorAll(".validation-messages span");
        forEach.call(messageElements, function(element){
            element.classList.add("hide")
        });
        validateAghainstCustomRules();
        document.getElementById("change-email-form").checkValidity();

    };

    var validationFail = function(e){
        var element, validity;

        element = e.currentTarget;
        validity = element.validity;
                if(!validity.valid){
            validNames.forEach(function(validName){
                checkRule(validity, validName, element);
            });     
            e.preventDefault();
             }

    };

    var checkRule = function(state, validName, element){
        if(state[validName]){
            var rules = element
                                .nextElementSibling
                                .querySelectorAll('[data-rule = "' + validName + '"]');

            forEach.call(rules, function(rule){
                rule.classList.remove("hide");
            });
        }

    };
    
    var validateAghainstPattern = function(element, pattern, validName){
        if(element.value.match(pattern)){
            element.setCustomValidity("invalid");
            element.nextElementSibling
                    .queryselector('[data-rules="' + validName + '"]')
                    .classList
                    .remove("hide");
        
        }
        else{
            element.setCustomValidity("");
        }
    };

    var validateAghainstCustomRules = function(){
        validateAghainstPattern(document.getElementById("email"), /@iol.com/i, "isAOL");
    };


    var inputElements = document.querySelectorAll("input:not(button)");
    forEach.call(inputElements,  function(input){
        input.oninvalid = validationFail;
        input.onblur = validate;
    });
    document.getElementById("login-button").addEventListener("click", validate, false); 
});




$(function(){

    var validationModule = function(){
        var elements = $('[data-role="validate"]');
        elements.popover({ placement: "top"});

        elements.on("invalid",function(){
            var firstInvalidElement = document.querySelector("input:invalid");
            $(firstInvalidElement).popover("show");
        });

        elements.on("blur",function(){
            $(this).popover("hide");
        });

        var validate = function(formSelector){
            if(!/#/.test(formSelector)){
                formSelector = "#" + formSelector;

            }
            return document.querySelector(formSelector).checkValidity();

        };
        return{
            validate: validate 
        };

    };

    var validtor = new ValidationModule();
    var $msg = $("#msg");

    $('[data-role = "trigger-validation"]').click(function(){
        if(validator.validate("email-form")){
            $msg.text("Valid");
        }
        else{
            $msg.text("Invalid");
        }
    });
});
});