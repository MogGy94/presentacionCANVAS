import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Scene from './Scene';

import './Slide_2.css'
//const iterable = Array.from(Array(n).keys());
const scene = new Scene(500);
console.log(scene.getCircles());

const mouse = {

    clientX: 300,
    clientY: 500
}
const Slide_1 = () => {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const canvas_ref = useRef();
    const [canvasW, setCanvasW] = useState(window.innerWidth);
    const [canvasH, setCanvasH] = useState(window.innerHeight);

    const [mousePosition, setMousePosition] = useState(mouse);

    const setUp = () => {
        const { current }: { current: any } = canvas_ref;
        const context = current.getContext('2d');
        context.fillStyle = "#00000022";
        context.fillRect(0, 0, canvasW, canvasH);
    }


    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePosition({ clientX, clientY });
    }


    const handleRezice = () => {
        setCanvasW(innerWidth);
        setCanvasH(innerHeight);
        scene.init();
        setUp();
        //console.log({ innerWidth, innerHeight });
    }


    useEffect(() => {
        setUp();

        addEventListener('resize', handleRezice)
        return () => removeEventListener('resize', handleRezice)

    }, []);
    /*  useEffect(() => {
         console.log(mousePosition);
 
     }, [mousePosition]) */

    const render = deltaTime => {
        const paramas = {
            point: { x: mousePosition.clientX, y: mousePosition.clientY },
            pointRange: 200
        }
        const { current }: { current: any } = canvas_ref;
        const context = current.getContext('2d');
        setUp();
        // scene.init();
        scene.draw(context);
        scene.update(paramas);

        //mouse Reference
        // context.fillStyle = "#f0f";
        // context.fillRect(mousePosition.clientX - 10, mousePosition.clientY - 10, 20, 20);

    }


    const animate = time => {
        //const { current }: { current: any } = previousTimeRef;
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            render(deltaTime)

        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    //useAnimationFrame({ mousePosition, callback: render });


    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [mousePosition]); // Make sure the effect runs only once

    return (
        <div className="slide-2" onMouseMove={handleMouseMove}>

            {/* <pre>
                {
                    JSON.stringify(mousePosition, null, 2)
                }
            </pre> */}
            <canvas
                ref={canvas_ref}
                id="slide-2"
                width={canvasW}
                height={canvasH}
            />
            <h1 className="slide-2__title">CANVAS</h1>


        </div>
    )
}

export default Slide_1;