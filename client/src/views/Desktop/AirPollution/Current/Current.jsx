import React from "react";
import getStateOfAir from "../../../../utils/getStateOfAir";
import airPollutionGif from "../../../../assets/gif/air-pollution.gif";
const Current = ({ current }) => {
    if (!current) return <></>;
    return (
        <div>
            <h1>Current Air Pollution</h1>
            <h1>{getStateOfAir(current.list[0].main.aqi)}</h1>
            <div className="w-full mb-3">
                <div className="flex flex-wrap  border-t border-l">
                    <div className="ml-[calc(100%/9-1px)] w-[calc((100%/9)*8+1px)] px-3 border-r border-l ">
                        <div className="font-semibold capitalize text-center">
                            Pollutant concentration in ug/m3
                        </div>
                    </div>
                    {[
                        "Polutants",
                        ...Object.keys(current.list[0].components),
                    ].map((item, index) => (
                        <div
                            key={item}
                            className="w-[calc(100%/9)] px-3 border-b border-r border-t"
                        >
                            <div className="flex flex-col">
                                <div className="font-semibold capitalize border-b">
                                    {item}
                                </div>
                                <div>
                                    {index !== 0 &&
                                        current.list[0].components[item]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div
                    className="h-[300px] bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${airPollutionGif})` }}
                ></div>
            </div>
        </div>
    );
};

export default Current;
