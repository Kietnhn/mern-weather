import React, { useContext, useState } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Controls from "./Controls";
import ResetLocation from "./ResetLocation";
import MarkerMap from "./MarkerMap";
import InfoMap from "./InfoMap";
const WeatherMap = () => {
    const {
        weatherState: {
            weatherData: { currentWeather, lat, lon },
        },
    } = useContext(WeatherContext);
    const [map, setMap] = useState(null);

    return (
        <div className="relative h-full">
            <MapContainer
                className="markercluster-map h-full m-3 py-3"
                center={[lat, lon]}
                zoom={10}
                zoomControl={true}
                scrollWheelZoom={true}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Controls />
                <MarkerMap weather={currentWeather} lat={lat} lon={lon} />
            </MapContainer>
            {map && (
                <ResetLocation
                    map={map}
                    center={[lat, lon]}
                    zoom={10}
                    className="absolute right-0 bottom-0 z-[999]"
                />
            )}
            {map && (
                <InfoMap
                    map={map}
                    weather={currentWeather}
                    className="absolute top-20 left-5 bg-[white] z-[999]"
                />
            )}
        </div>
    );
};

export default WeatherMap;
