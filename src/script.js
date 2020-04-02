import {ALPHABET} from "./constants.js";
import {ROW} from "./constants.js";
import {CLASS_SIZE} from "./constants.js";


init('eng');

function init(lang) {

    let el = document.querySelector(".keyboard");
    let row = document.createElement('div');
    row.classList.add('row');
    ALPHABET.forEach((y) => {
        let button = document.createElement('button');
        button.type = 'button';
        button.id = y.code;
        button.classList.add(CLASS_SIZE[y.size].CLASS);
        let span = document.createElement('span');
        span.classList.add('sm');
        let textNode = document.createTextNode(y.eng);
        span.append(textNode);
        button.append(span);
        row.append(button);
        el.append(row);
    })


}


document.addEventListener('keypress', (e) => {
   let el = document.getElementById(e.code);
   el.style.opacity = '0.6';
});

document.addEventListener('keyup', (e) => {
    let el = document.getElementById(e.code);
    el.style.opacity = '1';
});


let keyboard = document.querySelector(".keyboard");
keyboard.addEventListener('click', (e) => {
    let element =  e.target;
    console.log('el: ', element.innerHTML )
})


