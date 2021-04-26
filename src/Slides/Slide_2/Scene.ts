
const colorArray = [
    "#B3372E",
    "#D6D9BA",
    "#FFA49E",
    "#6A9BCC",
    "#3072B3",
]
interface Point {
    x: number;
    y: number;
}
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
            const x = Math.random() * innerWidth;
            const y = Math.random() * innerHeight;
            const dx = (Math.random() - 0.5) * 2;
            const dy = (Math.random() - 0.5) * 2
                ;
            const radius = (Math.random() * 15) + 4;
            const color = colorArray[Math.floor(Math.random() * colorArray.length)];
            this.circles.push(new Circle(x, y, dx, dy, radius, color))
        })
    }
    update(params: Object) {
        this.circles.map((circle) => {
            circle.changeSize(params);
            circle.acelerate();
        })
    }
    draw(context) {
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
    private dx: number; //velocidad X
    private dy: number; //velocidad Y
    private radius: number;
    private maxRadius: number;
    private minRadius: number;

    private color: string;
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
        //this.maxRadius = radius + Math.floor(Math.random() * 30);
        this.maxRadius = radius * 5;

    }

    changeSize(params) {
        //  se agranda al estar cerca a un npunto
        const { point, pointRange } = params;
        const { x, y, radius, minRadius, maxRadius } = this;
        const { sqrt, pow } = Math;
        //Distancia por pitagoras
        const distance = sqrt(pow((point.x - x), 2) + pow((point.y - y), 2));

        //Limites Cuadrados
        /* if (point.x - this.x < D && point.x - this.x > -D &&
            point.y - this.y < D && point.y - this.y > -D) { */
        if (distance < pointRange) {
            if (this.radius < this.maxRadius)
                this.radius += 1;
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

    }

    acelerate() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    update() {

    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }

}

export default Scene