import {ALPHABET} from "./constants.js";
import {ROW} from "./constants.js";
import {CLASS_SIZE} from "./constants.js";


init('eng');

function init(lang) {
    console.log('stater')

    let el = document.querySelector(".keyboard");
    let row = document.createElement('div');
    row.classList.add('row');
    ALPHABET.filter((x) =>{
       return true
    }).forEach((y) => {
        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add(CLASS_SIZE[y.size].CLASS);
        let span = document.createElement('span');
        span.classList.add('sm')
        let textNode = document.createTextNode(y.eng);
        span.append(textNode);

        button.append(span);
        row.append(button);
        el.append(row);
    })



}




