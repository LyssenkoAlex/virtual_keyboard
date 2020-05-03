// eslint-disable-next-line import/extensions
import { ALPHABET, CLASS_SIZE, LANGUAGE } from './constants.js';

let capsLockKeyPressed = false;
let leftShiftKeyPressed = false;
let leftAltKeyPressed = false;

const init = (lang) => {
	localStorage.setItem('LANGUAGE', lang);
	const el = document.querySelector('.keyboard');
	el.querySelectorAll('*').forEach((n) => n.remove());
	const row = document.createElement('div');
	row.classList.add('row');
	ALPHABET.forEach((y) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.id = y.code;
		button.classList.add(CLASS_SIZE[y.size].CLASS);
		const span = document.createElement('span');
		span.classList.add('sm');
		const textNode = document.createTextNode(y[lang]);
		span.append(textNode);
		button.append(span);
		row.append(button);
		el.append(row);
	});
};

const drawTextArea = () => {
	const el = document.querySelector('.wrapper');
	const div = document.createElement('div');
	div.classList.add('area_wrapper');
	const textarea = document.createElement('textarea');
	textarea.rows = 5;
	textarea.classList.add('text_container');
	div.append(textarea);
	el.append(div);
	const divNote = document.createElement('div');
	divNote.classList.add('note');
	const spanDiv = document.createElement('span');
	spanDiv.innerText = 'Для переключения языков нажмите Shift + Alt';
	divNote.append(spanDiv);
	el.append(divNote);
};

if (localStorage.getItem('LANGUAGE') === null) {
	init(LANGUAGE.ENG);
} else {
	init(localStorage.getItem('LANGUAGE'));
}

drawTextArea();

function changeLanguage() {
	if (LANGUAGE.SELECTED === LANGUAGE.ENG) {
		LANGUAGE.SELECTED = LANGUAGE.RUS;
		init(LANGUAGE.RUS);
	} else {
		LANGUAGE.SELECTED = LANGUAGE.ENG;
		init(LANGUAGE.ENG);
	}
}

document.addEventListener('keypress', (e) => {
	const el = document.getElementById(e.code);
	if (el !== null) {
		el.classList.add('press_down_button');
		const area = document.querySelector('.text_container');

		if (e.key === 'Enter') {
			area.innerHTML += '\n';
		} else if (LANGUAGE.SELECTED === LANGUAGE.ENG) {
			area.innerHTML += e.key;
		} else {
			const key = ALPHABET.find((x) => x.code === e.code);
			area.innerHTML += key.rus;
		}
	}
});

document.addEventListener('keyup', (e) => {
	const el = document.getElementById(e.code);
	if (e.code === 'ShiftLeft') {
		leftShiftKeyPressed = false;
	}
	if (e.code === 'AltLeft') {
		leftAltKeyPressed = false;
	}
	if (el !== null) {
		el.classList.remove('press_down_button');
	}
});

document.addEventListener('keydown', (e) => {
	if (e.code === 'ShiftLeft') {
		leftShiftKeyPressed = true;
	}
	if (e.code === 'AltLeft') {
		leftAltKeyPressed = true;
	}

	if (leftAltKeyPressed && leftShiftKeyPressed) {
		changeLanguage();
	}

	const el = document.getElementById(e.code);
	if (el !== null) {
		el.classList.add('press_down_button');
		if (e.code === 'Backspace') {
			backSpaceHit(e);
		}
	}
});

const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', (e) => {
	if (e.target.nodeName === 'SPAN') {
		const element = e.target;
		const area = document.querySelector('.text_container');
		if (element.innerHTML === 'Enter') {
			area.innerHTML += '\n';
		} else if (element.innerHTML === 'Backspace') {
			backSpaceHit(e);
		} else if (element.innerHTML === 'ENG') {
			LANGUAGE.SELECTED = LANGUAGE.RUS;
			init(LANGUAGE.RUS);
		} else if (element.innerHTML === 'RUS') {
			LANGUAGE.SELECTED = LANGUAGE.ENG;
			init(LANGUAGE.ENG);
		} else if (element.innerHTML === 'Space') {
			area.innerHTML += ' ';
		} else if (element.innerHTML === 'Caps Lock') {
			capsLockKeyPressed = !capsLockKeyPressed;
		} else if (capsLockKeyPressed) {
			area.innerHTML += element.innerHTML.toUpperCase();
		} else {
			area.innerHTML += element.innerHTML;
		}
	}
});

const backSpaceHit = (e) => {
	const area = document.querySelector('.text_container');
	let text = area.innerHTML;
	text = text.substring(0, text.length - 1);
	area.innerHTML = text;
};
