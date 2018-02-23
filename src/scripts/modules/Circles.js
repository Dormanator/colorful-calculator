// this module is based on paperscript implemented form paper.js
//make sure paper.js is installed on the window if useing this class
class Circles {
    constructor() {
        this.circles = [];
        this.setColors = [];
        this.onLoad();
    }

    onLoad() {
        paper.setup('canvas');
        this.createColors();
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

    randomColor() {
        // generate a randomized hex color code string
        const key = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
            LENGTH_OF_HEX_CODE = 6;
        let color = '#';

        for (let i = 0; i < 6; i++) {
            let random = Math.floor(Math.random() * 15);
            color += key[random];
        }

        return color;
    }

    createColors() {
        // a function to create a set of 10 hex colors to choose from to allow color consistency in animations if desired
        const MAX_COLORS_TO_CREATE = 10;
        for (let i = 0; i < MAX_COLORS_TO_CREATE; i++) {
            this.setColors.push(this.randomColor());
        }
    }

    pickColor(value, option) {
        // return a random color if the value we are animating is type 1 - in this case it indicates a calculator answer
        if (option) {
            return this.randomColor();
        } else {
            // otherwise use of of the colors we generated on load to have consistency for user input values
            return this.setColors[value];
        }
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

    drawMultipleCircles(times, option) {
        // allow for multiple circle creation and allow option for color selection
        for (let i = 0; i < times; i++) {
            // establish a random point to draw circle on keypress
            const point = this.randomPoint();
            // draw circle at generated point with color based on key value in KeyData object
            this.drawCircle(point, this.pickColor(times, option));
        }
    }

    create(value, option) {
        const validNumber = this.validateInput(value);

        // call to draw many circles based on number and color option passed in
        this.drawMultipleCircles(validNumber, option);

        // call function to animate circles once drawn
        this.animateCircles();
    }

    validateInput(value) {
        // establish vairbles we will asign based on input
        let numOfCircles = 0;
        // establishmax circles to draw
        const MAX_CIRCLES = 150;

        if (/\d/.test(value)) {
            // round it so we can use it properly
            value = Math.abs(Math.round(value));
            // establish how many circles we should draw based on the value entered, if the number is larger than 500 than only do 500
            numOfCircles = value > MAX_CIRCLES ? MAX_CIRCLES : value;
        } else {
            // if its not a number we don't want to make circles
            numOfCircles = 0;
        }

        return numOfCircles;
    }
};

export default Circles;