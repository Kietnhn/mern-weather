import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const WeatherMap = ({ lat, lon, zoom = 14 }) => {
    return (
        <MapContainer
            className="markercluster-map h-full m-3 py-3"
            center={[lat, lon]}
            zoom={zoom}
            scrollWheelZoom={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Marker position={[lat, lon]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
        </MapContainer>
    );
};

export default WeatherMap;
