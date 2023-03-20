import { CircleIcon, FahrenheitIcon, CelsiusIcon } from "../icons";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext } from "react";
function TemperatureIcon() {
    const {
        weatherState: { unit },
        toggleUnit,
    } = useContext(WeatherContext);
    const handleToggleUnit = () => {
        let payloadUnit = unit === "Celsius" ? "Fahrenheit" : "Celsius";
        toggleUnit(payloadUnit);
    };
    return (
        <div className="relative" onClick={handleToggleUnit}>
            <span className="absolute top-0 left-0 ">
                <CircleIcon width="8px" height="8px" />
            </span>
            <div>
                {unit === "Celsius" ? (
                    <CelsiusIcon width="18px" height="18px" />
                ) : (
                    <FahrenheitIcon width="18px" height="18px" />
                )}
            </div>
        </div>
    );
}
export default TemperatureIcon;
