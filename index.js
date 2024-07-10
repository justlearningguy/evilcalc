const numbers = document.querySelectorAll('.number');
const mainResultField = document.querySelector('.main_result');
const calculationField = document.querySelector('.calculation_result');
const signField = document.getElementById('sign');
const body = document.querySelector('body');
const mainField = document.querySelector('.main_field');
const additionalBtns = document.querySelectorAll('.additional');
const signs = document.querySelectorAll('.sign');
let addons;
//Number buttons onclick
body.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'Backspace':
            removeChar();
            break;
        case '0':
            digitClick(0);
            break;
        case '1':
            digitClick(1);
            break;
        case '2':
            digitClick(2);
            break;
        case '3':
            digitClick(3);
            break;
        case '4':
            digitClick(4);
            break;
        case '5':
            digitClick(5);
            break;
        case '6':
            digitClick(6);
            break;
        case '7':
            digitClick(7);
            break;
        case '8':
            digitClick(8);
            break;
        case '9':
            digitClick(9);
            break;
        case '.':
            document.getElementById('point').click();
            break;
        case 'Enter':
            equal();
            break;
        case '+':
            document.getElementById('plus').click();
            break;
        case '-':
            document.getElementById('minus').click();
            break;
        case '*':
            document.getElementById('multiply').click();
            break;
        case '/':
            document.getElementById('divide').click();
            break;
        case 'Escape':
            clearAll();
            break;
        case '%':
            document.getElementById('percent').click();
            break;
    }
    })
for(let i = 0;i < numbers.length; i++) {
    numbers[i].addEventListener('click', function() {
        digitClick(numbers[i].textContent)
    });
}
for(let i = 0;i < signs.length; i++) {
    signs[i].addEventListener('click', function() {
            if('+-×÷%^.'.includes(mainResultField.textContent.slice(mainResultField.textContent.length-1))) {
                if(signs[i].id == 'power') {
                    mainResultField.textContent = mainResultField.textContent.slice(0,-1) + '^';
                }
                else if(signs[i].textContent == '√') {
                    mainResultField.textContent += '√';
                }
                else if(signs[i].textContent == 'π') {
                    mainResultField.textContent += 'π';
                }
                else {
                    mainResultField.textContent = mainResultField.textContent.slice(0,-1) + signs[i].textContent;
                }
              }
            else {
                if(mainResultField.textContent == '0') {
                    switch(signs[i].textContent) {
                        case '√':
                            mainResultField.textContent = '√'
                            break;
                        case 'π':
                            mainResultField.textContent = 'π';
                            break;
                    }
                }
                else if(mainResultField.textContent.length < 35) {
                    if(signs[i].id == 'power') {
                        mainResultField.textContent += '^';
                    }
                    else if(signs[i].textContent == 'π' && mainResultField.textContent.slice(mainResultField.textContent.length-1)=='π') {
                    }
                    else {
                        mainResultField.textContent += signs[i].textContent;
                    }
                    } 
            
                 
    }});
}
function digitClick(digit) {
        if(mainResultField.textContent.length ==1 && mainResultField.textContent[0] == '0') {
            mainResultField.textContent = String(digit);
        }
        else if(mainResultField.textContent.length ==2 && mainResultField.textContent[0] == '-' && mainResultField.textContent[1] =="0") {
            mainResultField.textContent = '-' + String(digit);
        }
        else {
            if(mainResultField.textContent.length < 35) {
                mainResultField.textContent += String(digit);
            } 
        }
    }
function removeChar() {
        if(mainResultField.textContent.length == 1) {
            mainResultField.textContent = '0';
        }
        else {
            mainResultField.textContent = mainResultField.textContent.slice(0,-1);
        }
}
function clearAll() {
    mainResultField.textContent = '0';
    calculationField.textContent = '';
}
//actions
function equal() {
    let processing = mainResultField.textContent;
    processing = processing.split(/(\+|\-|×|÷|%|√|π|\^)/).filter(Boolean);
    for(i in processing) {
        switch(processing[i]) {
            case '×':
                processing[i] = '*';
                break;
            case '÷':
                processing[i] = '/';
                break;
            case '^':
                processing[i] = '**';
                break;
            case '%':
                processing[i] = Number(processing[i-1])/100;
                processing.splice(i-1,1);
                break;
            case '√':
                processing[i] = 'Math.sqrt(';
                processing.splice(i+2,0,')');    
                if(isNaN(processing[i-1]) == false) {
                    processing.splice(i,0, '*');
                }
                break;
            case 'π':
                processing[i] = Math.PI;
                if(isNaN(processing[i-1]) == false) {
                    processing.splice(i,0, '*');
                }
                break;
        }
    }
    processing = processing.join(' ');
    processing = eval(processing);
    processing = processing.toFixed(10);
    calculationField.textContent = mainResultField.textContent;
    mainResultField.textContent = processing;

    }    
// function plusminus() {
//     if(mainResultField.textContent.slice(0,1) == '-') {
//         mainResultField.textContent = mainResultField.textContent.slice(1);
//     }
//     else {      
//         mainResultField.textContent = '-' + mainResultField.textContent;
//         }
//     }
function changelayout() {
    if(!addons) {
        for(let i=0;i<additionalBtns.length;i++) {
            additionalBtns[i].style.display = 'flex';
        }
        addons = true;
    }
    else {
        for(let i=0;i<additionalBtns.length;i++) {
            additionalBtns[i].style.display = 'none';
        }
        addons = false;
    }
   
}
//info
function info() {
    document.querySelector('.modal_box_bg').style.display = 'flex';
    setTimeout(function() {
      document.querySelector('.modal_box_bg').style.opacity = '1';
    }, 0);
}
function infoBack() {
  document.querySelector('.modal_box_bg').style.opacity = '0';
  setTimeout(function() {
    document.querySelector('.modal_box_bg').style.display = 'none';
  }, 300);
  
}
document.querySelector('.modal_box_bg').addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(document.querySelector(".modal_box_focus"));
	if ( ! withinBoundaries ) {
		infoBack()
	}
})