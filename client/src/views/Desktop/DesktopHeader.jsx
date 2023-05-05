import { useContext } from "react";
import User from "../../components/Desktop/User";
import { NavLink } from "react-router-dom";
import { WeatherContext } from "../../contexts/WeatherContext";
import SaveButton from "../../components/SaveButton";
import Theme from "../../components/Theme/Theme";

const DesktopHeader = () => {
    const {
        weatherState: {
            weatherData: { timezone },
        },
    } = useContext(WeatherContext);
    return (
        <div className="fixed top-0 left-0 right-0 theme dark:border-[unset]   z-[9999]">
            <div className=" w-[1300px] mx-auto">
                <div className="flex -mx-3 ">
                    <div className="w-4/5 px-3">
                        <div className="between">
                            <div className="flex items-center">
                                <NavLink
                                    to="/landing"
                                    className="px-3 mb-3 duration-500 hover:text-primaryText text-4xl font-bold block"
                                >
                                    WeT
                                </NavLink>
                                <div className="flex items-center gap-4">
                                    <h1 className="font-semibold">
                                        {timezone}
                                    </h1>
                                    <SaveButton />
                                </div>
                            </div>
                            <div>
                                <input placeholder="Enter place..." />
                            </div>
                        </div>
                    </div>

                    <div className="w-1/5 px-3">
                        <div className="between h-full">
                            <Theme className="" />
                            <User />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DesktopHeader;
