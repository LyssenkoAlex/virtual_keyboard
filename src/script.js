import {ALPHABET} from "./constants.js";


init('eng');

function init(lang) {
    console.log('stater')
    let el = document.getElementById("idKeyboard");

    ALPHABET.forEach(x => {
        let g = document.createElement('div');
        g.setAttribute("id", "id" + x.code);

        let textNode = '';
        let gSpan = document.createElement('span');

        if (x[lang] === '&nbsp') {
            textNode = document.createTextNode('');
        } else {
            textNode = document.createTextNode(x[lang]);
        }

        gSpan.append(textNode);
        g.append(gSpan);
        g.classList.add('g-' + x.size, 'key');
        el.append(g);
    })

}




