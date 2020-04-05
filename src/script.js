import {ALPHABET, CLASS_SIZE} from "./constants.js";
import {LANGUAGE} from "./constants.js";


let leftShiftKeyPressed = false;
let leftAltKeyPressed = false;
let capsLockKeyPressed = false;


const init = (lang) => {
    localStorage.setItem('LANGUAGE', lang);
    let el = document.querySelector(".keyboard");
    el.querySelectorAll('*').forEach(n => n.remove());
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

if(localStorage.getItem('LANGUAGE') === null) {
    init(LANGUAGE.ENG);
}
else {
    init(localStorage.getItem('LANGUAGE'));
}

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
    let el = document.getElementById(e.code);
    el.classList.add('press_down_button');
    if(e.code === 'Backspace') {
        backSpaceHit(e);
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
        else if(element.innerHTML === 'Backspace') {
            backSpaceHit(e)
        }
        else if(element.innerHTML === 'ENG') {
            init(LANGUAGE.RUS );
        }
        else if(element.innerHTML === 'RUS') {
            init(LANGUAGE.ENG );
        }
        else {
            area.innerHTML = area.innerHTML + element.innerHTML;
        }
    }

});


const backSpaceHit = (e) => {
    let area = document.querySelector('.text_container');
    let text = area.innerHTML;
    text = text.substring(0, text.length - 1);
    area.innerHTML = text;
};
