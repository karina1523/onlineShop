import React, { useEffect, useRef } from 'react';

const VantaBackground = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        if (window.VANTA && window.VANTA.NET) {
            const effect = window.VANTA.NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x313fca,
                backgroundColor: 0x090813,
                points: 15.00,
                maxDistance: 20.00,
                spacing: 13.00

            });

            return () => {
                if (effect) effect.destroy();
            };
        }
    }, []);

    return <div ref={vantaRef} style={{ width: '100%', height: '100vh', zIndex: -1, background_size: "100vw, 100vh", position: 'absolute', top: 0, left: 0, }} />;
};

export default VantaBackground;

