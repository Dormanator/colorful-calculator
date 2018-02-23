import Calculator from './modules/Calculator';
import Circles from './modules/Circles';
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
            // stop default character press beahvior to prevent weirdness
            event.preventDefault();
            passInputValues(event.key);
        }
    };

    document.getElementById('calc-btns').addEventListener('click', (event) => {
        // check for valid click input
        event.stopPropagation();
        event.preventDefault();
        if (event.target.value) {

            passInputValues(event.target.value);
        }
    });

    const passInputValues = (value, keyData) => {
        // pass value to calc
        calculator.handleInput(value);
        // draw random circles based on key value and corresponding keydata color
        //  if the user submitted the equation, pass the answer as the value ot be animated and indiacte it's an answer '1' 
        if (value === '=' || value === 'enter') {
            circles.create(calculator.answer, 1);
        } else {
            // otherwise submit the number value of teh user input and indicate it's not an answer '0'
            circles.create(value, 0);
        }
    };

}