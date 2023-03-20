import Search from "../../views/Search";

import User from "./User";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext } from "react";
import Theme from "../Theme/Theme";
import { CompareIcon, LocationIcon } from "../icons";
const DesktopHeader = () => {
    const {
        setIsCompare,
        setCompare,
        weatherState: { isCompare, weatherData },
    } = useContext(WeatherContext);
    const handleSelectedCompare = () => {
        if (isCompare) {
            setCompare([{ ...weatherData }]);
        }
        setIsCompare(!isCompare);
    };
    return (
        <div className="relative theme dark:border-[unset]  between px-3 py-2 z-50">
            <div>
                {!isCompare && (
                    <div className="flex gap-2 text-2xl font-semibold items-center">
                        <span>
                            <LocationIcon width="20px" height="20px" />
                        </span>
                        <h1>{weatherData?.timezone}</h1>
                    </div>
                )}
            </div>
            <div className="flex gap-4">
                {/* <Search /> */}
                <Theme />
                <button
                    className={`px-4 py-2 rounded-full  border-2 duration-150 button font-bold `}
                    onClick={handleSelectedCompare}
                >
                    <span>{!isCompare ? <CompareIcon /> : "Exit"}</span>
                </button>
                <User />
            </div>
        </div>
    );
};
export default DesktopHeader;
