import { useState } from "react";
import moment from "moment-timezone";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
function ChartSun({ className, weather, timezone }) {
    const [suntime] = useState({
        sunrise: moment.unix(weather.sunrise).tz(timezone).format("HH"),
        sunset: moment.unix(weather.sunset).tz(timezone).format("HH"),
    });

    return (
        <div className={`${className}`}>
            <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                    <div className="flex flex-col text-center">
                        <p>
                            {moment
                                .unix(weather.sunrise)
                                .tz(timezone)
                                .format("HH:mm")}
                        </p>
                        <h2>Sunrise</h2>
                    </div>
                    <div className="flex flex-col text-center">
                        <p>
                            {moment
                                .unix(weather.sunset)
                                .tz(timezone)
                                .format("HH:mm")}
                        </p>
                        <h2>Sunset</h2>
                    </div>
                </div>
            </div>
            <div className="-mt-[68px]">
                <Doughnut
                    data={{
                        labels: [],
                        datasets: [
                            {
                                data: [
                                    `${suntime.sunrise}`,
                                    `${suntime.sunset}`,
                                    `${24 - suntime.sunset}`,
                                ],
                                borderWidth: 1,
                                backgroundColor: [
                                    "rgba(255,255,255,.4)",
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(255,255,255,.4)",
                                ],
                                borderColor: [
                                    "rgba(240, 240, 237,1)",
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(240, 240, 237,1)",
                                ],
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: true,
                        rotation: -90,
                        circumference: 180,
                        cutout: "85%",
                    }}
                />
            </div>
        </div>
    );
}

export default ChartSun;
