import { useEffect, useRef } from 'react';

const useAnimationFrame = (props) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const { mousePosition } = props

    const animate = time => {
        //const { current }: { current: any } = previousTimeRef;
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;

            props.callback(deltaTime, mousePosition,)

        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [mousePosition]); // Make sure the effect runs only once
}


export default useAnimationFrame;