import React, { useState, useMemo, useRef, useCallback } from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
const MarkerMap = ({ weather, lat, lon }) => {
    const markerIcon = new L.Icon({
        iconUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_dot_black.svg/768px-Location_dot_black.svg.png",
        iconSize: [10, 10],
    });
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState([lat, lon]);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={markerIcon}
        >
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? "Marker is draggable"
                        : "Click here to make marker draggable"}
                </span>
            </Popup>
        </Marker>
    );
};

// return (
//     <>
//         <Marker position={[lat, lon]} icon={markerIcon}>
//             <Tooltip
//                 className="tooltip"
//                 direction="right"
//                 opacity={1}
//                 permanent
//             >
//                 <div className="tooltip-div">
//                     <p className="temp-tooltip">{weather.temp}&deg;C</p>
//                 </div>
//             </Tooltip>
//             <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//         </Marker>
//     </>
// );
export default MarkerMap;
