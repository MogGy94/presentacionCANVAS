import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
//const iterable = Array.from(Array(n).keys());


const Slide_1 = () => {
    const canvas_ref = useRef();
    const [canvasContext, setCanvasContext] = useState(null)
    const draw = (c) => {

        c.fillStyle = 'rgba(254,34,21,.8)'
        c.fillRect(100, 100, 100, 100)
        c.fillStyle = 'rgba(254,34,231,.8)'
        c.fillRect(100, 200, 100, 100)
        c.fillStyle = 'rgba(21,254,21,.8)'
        c.fillRect(100, 300, 100, 100)

        //Licne
        c.beginPath();
        //c.moveTo(x,y)
        c.moveTo(50, 300);
        c.lineTo(300, 100);
        c.lineTo(400, 300);
        c.strokeStyle = "#BBBB"
        c.stroke();


        // Arc / circle
        c.beginPath();
        c.arc(300, 300, 30, 0, Math.PI * 2, false)
        c.strokeStyle = "black"
        c.stroke();
    }

    useEffect(() => {
        const { current }: { current: any } = canvas_ref;
        const context = current.getContext('2d');

        current.width = window.innerWidth;
        current.height = window.innerHeight;

        // context.fillStyle = "#c7e2b2"
        context.fillRect(0, 0, current.width, current.height);
        context.fillStyle = "#fff"
        context.strokeStyle = "#fff";
        context.font = "20px Arial";
        context.font = "20px Georgia";
        context.font = "45px consolas"
        context.fillText("Hello World!", 10, 50);
        context.fillText('HTML CANVAS BOILERPLATE', 100, 100)


        setCanvasContext(context)


        addEventListener('resize', () => {
            current.width = innerWidth
            current.height = innerHeight
            draw(context)
        })
    }, [])

    useEffect(() => {
        if (canvasContext) {

            //console.log(canvasContext);
            draw(canvasContext)
        }
    }, [canvasContext])



    return (
        <div className="slide-1">
            <canvas
                ref={canvas_ref}
                id="slide-1"></canvas>
        </div>
    )
}

export default Slide_1;