import React from 'react';
import './SnowOverlay.scss'; // Import global styles directly

interface SnowOverlayProps {
    totalSnowflakes?: number; // Optional prop to control number of snowflakes
}

const SnowOverlay: React.FC<SnowOverlayProps> = ({ totalSnowflakes = 200 }) => {
    const snowflakes = Array.from({ length: totalSnowflakes }, (_, i) => (
        <div key={i} className="snow"></div>
    ));

    return <div className="snow-overlay">{snowflakes}</div>;
};

export default SnowOverlay;
