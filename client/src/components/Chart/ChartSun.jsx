import { useState } from "react";
import moment from "moment-timezone";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
function ChartSun({ className, weather, timezone }) {
    const [suntime] = useState({
        sunrise: moment.unix(weather.sunrise).tz(timezone).format("hh"),
        sunset: moment.unix(weather.sunset).tz(timezone).format("hh"),
    });
    const [data] = useState(() => {
        const labels = [
            ...Array.from({ length: 48 }, (_, index) =>
                index % 2 === 0
                    ? `${index / 2}`.length === 1
                        ? `0${index / 2}:00`
                        : `${index / 2}:00`
                    : ""
            ),
            "00:00",
        ];
        const { sunrise, sunset } = suntime;
        const range = (start, end, step = 1) =>
            Array.from(
                { length: (end - start) / step + 1 },
                (_, index) => start + index * step
            );
        const toLine = (i) => Math.sin((i * Math.PI) / 50) * 12;
        const arrayNull = (n) => Array.from({ length: n }, () => null);
        const data = [...Array(25).keys()].map((i) => toLine(i));

        const timeSunRise = [...range(+sunrise * 2, 24)].map((i) => toLine(i));
        const timeSunSet = [...range(+sunset * 2, 24)]
            .map((i) => toLine(i))
            .reverse()
            .slice(1);

        const current = moment.unix(weather.dt).tz(timezone).format("HH");
        let timeCurrent;
        if (+current > 12) {
            const after = 12 - (+current - 12);
            console.log(after, +current);
            timeCurrent = [
                ...range(0, 24),
                ...range(after * 2, 23).reverse(),
            ].map((i) => toLine(i));
            console.log([...range(0, 24), ...range(after * 2, 23).reverse()]);
        } else {
            timeCurrent = [...range(0, +current * 2)].map((i) => toLine(i));
        }

        const datasets = [
            {
                label: "Current",
                lineTension: 0.3,
                fill: true,
                data: timeCurrent,
            },
            {
                label: "Sun time",
                lineTension: 0.3,
                data: [
                    ...arrayNull(+sunrise * 2),
                    ...timeSunRise,
                    ...timeSunSet,
                ],
            },
            {
                label: "Base line",
                lineTension: 0.3,
                data: [...data, ...data.reverse().slice(1), 0],
            },
        ];
        return {
            labels,
            datasets,
        };
    });
    const [options] = useState({
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                left: 0,
                right: 0,
                bottom: 0,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                textTransform: "capitalize",
                position: "top",
            },
            scales: {
                x: {
                    ticks: {
                        callback: function (val, index) {
                            return index % 2 === 0
                                ? this.getLabelForvalue(val)
                                : "";
                        },
                    },
                },
            },
        },
    });
    console.log("re-render");
    return (
        <div className={`${className} relative`}>
            {/* <div className="absolute bottom-0 left-0 right-0">
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
            </div> */}
            <div className="chart-sun">
                <Line options={options} data={data} height={260} width="100%" />
            </div>
            {/* <div className="h-[360px]">
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
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        rotation: -90,
                        circumference: 180,
                        cutout: "99%",
                        radius: "100%",
                        layout: {
                            margin: 0,
                            padding: {
                                left: -50,
                                right: -50,
                            },
                        },
                        scales: {
                            y: {
                                grid: {
                                    display: true,
                                    color: "#000000",
                                },
                            },
                        },
                    }}
                />
            </div> */}
        </div>
    );
}

export default ChartSun;
