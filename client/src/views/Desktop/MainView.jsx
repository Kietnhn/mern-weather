import { useContext, useState } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
import Weekly from "../../components/Desktop/Weekly";
import Hourly from "../../components/Chart/Hourly";
import ShowHistoryButton from "../../components/Button/ShowHistoryButton";
import ViewInfo from "../../components/Desktop/MainView";
import Wrapper from "../../components/Wrapper";
import CitiesWeather from "../../components/CitiesWeather";
const MainView = () => {
    const [indexActive, setIndexActive] = useState(0);

    const {
        weatherState: {
            weatherData: {
                currentWeather,
                timezone,
                weeklyWeather,
                hourlyWeather,
            },
            dataChart,
        },
    } = useContext(WeatherContext);
    const weather = () => {
        return indexActive === 0 ? currentWeather : weeklyWeather[indexActive];
    };
    return (
        <Wrapper>
            <div className="flex -mx-3  flex-wrap">
                <div className="w-4/5 px-3 ">
                    <div className="mb-3">
                        <ViewInfo
                            weather={weather()}
                            indexActive={indexActive}
                            timezone={timezone}
                        />
                        <Weekly
                            indexActive={indexActive}
                            setIndexActive={setIndexActive}
                        />
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold">
                                Hourly weather infomation:{" "}
                                <span className="capitalize"> {dataChart}</span>
                            </h3>
                            <ShowHistoryButton />
                        </div>
                        <div className="w-full relative">
                            <Hourly
                                weatherType="hourlyWeather"
                                weathers={hourlyWeather}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-1/5 px-3 mb-3">
                    <CitiesWeather />
                </div>
            </div>
        </Wrapper>
    );
};
export default MainView;
