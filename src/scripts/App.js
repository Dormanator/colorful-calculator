import Calculator from './modules/Calculator';
import Circles from './modules/Circles';
import KeyData from './modules/Keydata';
import paper from 'paper';

const calculator = new Calculator();

// installing paper on window and calling this as a function of window so we can use paperscript
paper.install(window);
window.onload = () => {
    // call a new instance of our Circles class within the window function so the paperscript is interpreted correctly
    const circles = new Circles();

    view.onKeyDown = (event) => {
        // check for valid keypress input
        if (calculator.validateInput(event.key)) {
            // stop defaul character press beahvior to prevent weirdness
            event.preventDefault();
            passInputValues(event.key, KeyData);
        }
    };

    document.getElementById('calc-btns').addEventListener('click', (event) => {
        // check for valid click input
        if (event.target.value) {
            // stop defaul character press beahvior to prevent weirdness
            event.preventDefault();
            passInputValues(event.target.value, KeyData);
        }
    });

    const passInputValues = (value, keyData) => {
        // pass value to calc
        calculator.handleInput(value);
        // draw random circles based on key value and corresponding keydata color
        //  if the user submitted the equation animate the answer
        const circlesToDraw = (value === '=' || value === 'enter') ? calculator.answer : value;
        circles.create(circlesToDraw, keyData);
    };

}