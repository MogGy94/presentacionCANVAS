import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Scene from './Scene_3';
import useAnimationFrame from '../../hooks/useAnimationFrame'
import './Slide_3.css'
//const iterable = Array.from(Array(n).keys());
const scene = new Scene(600);
console.log(scene.getCircles());

const Slide_3 = () => {

    const canvas_ref = useRef();
    const [canvasW, setCanvasW] = useState(window.innerWidth);
    const [canvasH, setCanvasH] = useState(window.innerHeight);

    const setUp = () => {
        const { current }: { current: any } = canvas_ref;
        const context = current.getContext('2d');
        context.fillStyle = "#00000022";
        context.fillRect(0, 0, canvasW, canvasH);
    }

    const handleRezice = () => {
        setCanvasW(innerWidth);
        setCanvasH(innerHeight);
        //scene.init();
        //setUp();
        //console.log({ innerWidth, innerHeight });
    }


    useEffect(() => {
        setUp();
        //scene.draw(context);
        addEventListener('resize', handleRezice)
        return () => removeEventListener('resize', handleRezice)

    }, []);
    /*  useEffect(() => {
         console.log(mousePosition);
 
     }, [mousePosition]) */

    const render = deltaTime => {
        const { current }: { current: any } = canvas_ref;
        const context = current.getContext('2d');
        setUp();
        //scene.init();
        scene.draw(context);
        scene.update();

        // mouse Reference
        // context.fillStyle = "#f0f";
        // context.fillRect(200, 200 - 10, 20, 20);


    }


    useAnimationFrame({ callback: render });




    return (
        <div className="slide-3">

            {/* <pre>
                {
                    JSON.stringify(mousePosition, null, 2)
                }
            </pre> */}
            <canvas
                ref={canvas_ref}
                id="slide-3"
                width={canvasW}
                height={canvasH}
            />
            {/* <h1 className="slide-3__title">Slide 3</h1> */}
        </div>
    )
}

export default Slide_3;