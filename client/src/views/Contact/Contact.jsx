import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "../../assets/img/marker-icon.png";
import L from "leaflet";
import FormContact from "./FormContact";

const Contact = () => {
    const myPosition = [10.8, 106.7];
    const markerIcon = new L.Icon({
        iconUrl: markerIconUrl,
    });
    return (
        <div className="w-full relative contact theme-reverse">
            <MapContainer
                className="markercluster-map h-[420px] brightness-[0.7]"
                center={myPosition}
                zoom={12}
                zoomControl={false}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={myPosition} icon={markerIcon}></Marker>
            </MapContainer>
            <div className="absolute w-[1300px] top-0 bottom-0 left-1/2 -translate-x-1/2 ">
                <div className="absolute bottom-4 left-0">
                    <h1 className="text-5xl font-semibold  text-[white] pointer-events-none">
                        Get In Touch
                    </h1>
                </div>
                <div className="absolute top-0 bottom-0 right-0">
                    <FormContact />
                </div>
            </div>
        </div>
    );
};

export default Contact;
