import { useState, useEffect, useContext } from "react";
import LoadingComponent from "../../../components/LoadingComponent";
import { AirContext } from "../../../contexts/AirContext";
import { WeatherContext } from "../../../contexts/WeatherContext";
import Current from "./Current/Current";
import History from "./History/History";
const AirPollution = () => {
    const [mode, setMode] = useState("current");
    // const [firsts, setFirsts] = useState({
    //     historyF1: false,
    //     forecaseF1: false,
    // });
    const {
        airState: { current, airLoading },
        getCurrentAirPollution,
    } = useContext(AirContext);
    const {
        weatherState: { weatherData },
    } = useContext(WeatherContext);

    const handleSetMode = (mode) => {
        setMode(mode);
    };
    const renderProps = () => {
        if (mode === "history") return <History />;
        return <Current current={current} />;
    };
    useEffect(() => {
        console.log({ mode });
    }, [mode]);
    useEffect(() => {
        const { lat, lon } = weatherData;
        getCurrentAirPollution({ lat, lon });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData]);
    return (
        <div className="w-full mb-3 theme-reverse px-5 py-3">
            <div className="between">
                <h2 className="font-semibold text-xl">AirPollution</h2>
            </div>
            <div className="flex -mx-3">
                <div className="w-4/5 px-3">
                    {airLoading ? (
                        <LoadingComponent className="w-full h-full relative" />
                    ) : (
                        renderProps()
                    )}
                </div>
                <div className="w-1/5 px-3">
                    <div className="flex flex-col gap-3">
                        {["current", "history", "forecast"].map((item) => (
                            <div key={item}>
                                <button
                                    onClick={() => handleSetMode(item)}
                                    className="capitalize button-reverse"
                                >
                                    {item}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AirPollution;
