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
};

export default Circles;