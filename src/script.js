import {ALPHABET, CLASS_SIZE} from "./constants.js";


const init = (lang) => {

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
        let textNode = document.createTextNode(y[lang]);
        span.append(textNode);
        button.append(span);
        row.append(button);
        el.append(row);
    })
};

const drawTextArea = () => {
    let el = document.querySelector(".wrapper");
    let div = document.createElement('div');
    div.classList.add('area_wrapper');
    let textarea = document.createElement('textarea');
    textarea.rows = 5;
    textarea.classList.add('text_container');
    div.append(textarea);
    el.append(div);
};

init('eng');
drawTextArea();


document.addEventListener('keypress', (e) => {
    let el = document.getElementById(e.code);
    el.classList.add('press_down_button');
    let area = document.querySelector('.text_container');

    if(e.key === 'Enter') {
        area.innerHTML = area.innerHTML + '\n';
    }
    else {
        area.innerHTML = area.innerHTML + e.key;
    }
});

document.addEventListener('keyup', (e) => {
    let el = document.getElementById(e.code);
    el.classList.remove('press_down_button');
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Backspace') {
        let el = document.getElementById(e.code);
        el.classList.add('press_down_button');

        let area = document.querySelector('.text_container');
        let text = area.innerHTML;
        text = text.substring(0, text.length - 1);
        area.innerHTML = text;
    }

});


let keyboard = document.querySelector(".keyboard");

keyboard.addEventListener('click', (e) => {
    if(e.target.nodeName === 'SPAN') {
        let element = e.target;
        let area = document.querySelector('.text_container');
        if(element.innerHTML === 'Enter') {
            area.innerHTML = area.innerHTML +  '\n';
        }
        else {
            area.innerHTML = area.innerHTML + element.innerHTML;
        }
    }
});


