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
            // pass value to calc
            calculator.handleInput(event.key);
            // draw random circles based on key value
            addFun(event.key);
        }
    };

    document.getElementById('calc-btns').addEventListener('click', (event) => {
        // check for valid click input
        if (event.target.value) {
            // pass value to calc
            calculator.handleInput(event.target.value);
            // draw random circles based on button value
            addFun(event.target.value);
        }
    });

    const addFun = (value) => {
        // establish a random point to draw circle on keypress
        const point = circles.randomPoint();
        // draw circle at generated point with color based on key value in KeyData object
        circles.drawCircle(point, KeyData[value].color);
        // call function to animate circles once drawn
        circles.animateCircles();
    };
}