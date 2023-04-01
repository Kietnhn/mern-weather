import React, { useCallback } from "react";

const ResetLocation = ({ map, center, zoom, className }) => {
    const onClick = useCallback(() => {
        map.setView(center, zoom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
    return (
        <div className={className}>
            <button onClick={onClick}>reset</button>
        </div>
    );
};

export default ResetLocation;
