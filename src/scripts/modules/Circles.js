// this module is based on paperscript implemented form paper.js
//make sure paper.js is installed on the window if useing this class
class Circles {
    constructor() {
        this.circles = [];
        this.onLoad();
    }

    onLoad() {
        paper.setup('canvas');
    }

    randomPoint() {
        // create and object that stores the max x and y values of viewport
        let maxPoint = new Point(view.size.width, view.size.height),
            // create an object that stores random values 0-1 for x and y
            randomPoint = Point.random(),
            // create empty object to multiple max x & y values by random x & y decimals
            // this will allow us to create random circles around the area of teh viewport on event
            point = {};
        point.x = maxPoint.x * randomPoint.x;
        point.y = maxPoint.y * randomPoint.y;

        return point;
    }

    drawCircle(point, color) {
        // create a new circle a
        const newCircle = new Path.Circle(point, 300);
        newCircle.fillColor = color;
        // add it to the class circles array so we can animate each one
        this.circles.push(newCircle);
    }

    animateCircles() {
        view.onFrame = (event) => {
            for (let i = 0; i < this.circles.length; i++) {
                //  iterat through each circle after its been drawn and change its color and shrink it
                this.circles[i].fillColor.hue += 1;
                this.circles[i].scale(.9);
                // if teh circle got small enough remove it from the canvas and our array to be efficient
                if (this.circles[i].area < 1) {
                    this.circles[i].remove();
                    this.circles.splice(i, 1);
                    i--;
                }
            }
        }
    }

    drawMultipleCircles(color, times) {
        for (let i = 0; i < times; i++) {
            // establish a random point to draw circle on keypress
            const point = this.randomPoint();
            // draw circle at generated point with color based on key value in KeyData object
            this.drawCircle(point, color);
        }
    }

    create(value, keydata) {

        const VALID_INPUT = this.validateInput(value);

        // // if the value passed in is a number
        // if (/\d/.test(value)) {
        //     // round it so we can use it properly
        //     value = Math.round(value);
        //     // establish how many circles we should draw based on the value entered, if the number is larger than 500 than only do 500
        //     numOfCircles = value > MAX_CIRCLES ? MAX_CIRCLES : value;
        //     // if the answer we recieved is larger than 9 or less than 1
        //     // select a random number to get a color from our keydata
        //     keyValue = value > HIGHEST_KEY_VALUE || value < 1 ? RANDOM_COLOR_SELECTION : value
        // } else {
        //     // if its not a number keep it as teh key value and only iterate one circle creation
        //     keyValue = value;
        //     numOfCircles = 1;
        // }

        // call to draw many circles based on the color and number passed in
        this.drawMultipleCircles(keydata[VALID_INPUT.keyValue].color, VALID_INPUT.numOfCircles);

        // call function to animate circles once drawn
        this.animateCircles();
    }

    validateInput(value) {
        // establish vairbles we will asign based on input
        let numOfCircles = 0,
            keyValue = 0;
        // establish legend for numbers used
        const MAX_CIRCLES = 500,
            HIGHEST_KEY_VALUE = 9,
            LOWEST_KEY_VALUE = 1,
            RANDOM_COLOR_SELECTION = Math.floor(Math.random() * 9),
            VALID_INPUT = {};

        if (/\d/.test(value)) {
            // round it so we can use it properly
            value = Math.round(value);
            // establish how many circles we should draw based on the value entered, if the number is larger than 500 than only do 500
            VALID_INPUT.numOfCircles = value > MAX_CIRCLES ? MAX_CIRCLES : value;
            // if the answer we recieved is larger than 9 or less than 1
            // select a random number to get a color from our keydata
            VALID_INPUT.keyValue = value > HIGHEST_KEY_VALUE || value < LOWEST_KEY_VALUE ? RANDOM_COLOR_SELECTION : value
        } else {
            // if its not a number keep it as teh key value and only iterate one circle creation
            VALID_INPUT.numOfCircles = 1;
            VALID_INPUT.keyValue = value;
        }

        return VALID_INPUT;
    }
};

export default Circles;