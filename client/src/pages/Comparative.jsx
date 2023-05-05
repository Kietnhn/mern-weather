import React from "react";
import Wrapper from "../components/Wrapper";
import Compare from "../components/Desktop/Compare";
import CompareChart from "../components/Chart/CompareChart";

const Comparative = () => {
    return (
        <Wrapper>
            <div>Comparative</div>;
            <div className="relative">
                <div className="flex w-full flex-wrap">
                    <div className="w-2/5 px-3">
                        {/* <DetailsInfo
                                weather={weather}
                                weatherType={weatherType}
                            /> */}
                    </div>
                    <div className="w-[35%] px-3">
                        <Compare />
                    </div>
                    <div className="w-full px-3">
                        {/* <h3 className="text-xl font-semibold mb-4">
                            {isUseWeekly ? "Weekly" : "Hourly"} weather
                            infomation:{" "}
                            <span className="capitalize"> {dataChart}</span>
                        </h3> */}
                        <div className="w-full">
                            {/* <CompareChart weatherType={weatherType} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Comparative;
