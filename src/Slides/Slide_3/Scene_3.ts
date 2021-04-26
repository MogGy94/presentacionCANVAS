function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

const colorArray = [
    "#B3372E",
    "#D6D9BA",
    "#FFA49E",
    "#6A9BCC",
    "#3072B3",
    '#63E3FF',
    '#61ABE8',
    '#789CFF',
    '#3F3DEB',
    '#3F3DEB'
];

interface Point {
    x: number;
    y: number;
};
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
class Scene {
    private totalOfCircles;
    private circles: Circle[];

    constructor(totCircles) {
        this.totalOfCircles = totCircles || 30;
        this.circles = [];
        this.init();
    }

    init() {
        this.circles = [];
        const iterable = Array.from(Array(this.totalOfCircles).keys());
        iterable.map((i) => {
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            const radius = randomIntFromRange(5, 20);
            const color = colorArray[Math.floor(Math.random() * colorArray.length)];
            this.circles.push(new Circle(x, y, radius, color))
        })
    }

    update(params?: Object) {
        this.circles.map((circle) => {
            circle.update()

        })
    }

    draw(context) {
        context.fillStyle = '#00000033'
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
        this.circles.map((circle) => {
            circle.draw(context);
        })
    }

    //Getter Setter
    getCircles() {
        return this.circles;
    }
}

class Circle {
    private x: number;
    private y: number;
    private radius: number;
    private maxRadius: number;
    private minRadius: number;
    private radians: number;
    private distFromCenter: Object;
    private color: string;
    private vel: number;
    private lastMouse: Point;

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;

        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = radius * 5;
        this.vel = Math.random() * 0.02 + 0.005

        this.color = color || "#000";
        this.radians = Math.random() * Math.PI * 2;
        this.lastMouse = { x: x, y: y };
        this.distFromCenter = {
            x: randomIntFromRange(8, 560),
            y: randomIntFromRange(8, 560)
        }
    }

    changeSize(params) {


    }

    acelerate() {

    }

    rotate() {

    }

    update() {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        // move points over time ;
        this.radians += this.vel;
        // drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        // Circular Motion 
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distFromCenter.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distFromCenter.x;

        /* this.x = x + Math.cos(this.radians) * this.distFromCenter.x ;
        this.y = y + Math.sin(this.radians) * this.distFromCenter.x ; */
        //this.x = this.x + Math.cos(this.radians) * 10;
        //this.y = this.y + Math.sin(this.radians) * 10;
    }

    draw(context) {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        context.beginPath()

        /* context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill() */
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(this.lastMouse.x, this.lastMouse.y);
        context.moveTo(this.x - 1, this.y - 1);
        // context.moveTo(this.x - 1, this.x - 1);
        context.lineTo(this.x, this.y);
        context.moveTo(this.y - 1, this.y - 1);
        //context.lineTo(this.x, this.y);
        context.stroke();

        context.closePath()
    }

}


addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})


export default Scene