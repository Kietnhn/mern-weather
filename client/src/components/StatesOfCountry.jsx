import { useState, useContext } from "react";
import { State, Country } from "country-state-city";
import { InfoIcon } from "./icons";
import { PositionContext } from "../contexts/PositionContext";

const StatesOfCountry = ({ countryCode, mode }) => {
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const [states, setStates] = useState(() => {
        if (mode === "country") {
            const countries = Country.getAllCountries();
            if (countryCode) {
                return countries.filter((country) =>
                    country.name.includes(countryCode)
                );
            }
            return countries;
        }
        return State.getStatesOfCountry(countryCode);
    });

    if (!countryCode) return <></>;
    return (
        <div className="w-full">
            <div className="flex flex-wrap -mx-2">
                {states.map((state) => (
                    <div className="w-1/5 px-2 mb-2" key={state.name}>
                        <div className="between bg-[white] shadow-lg px-3 py-2">
                            <h2 className="font-semibold max-h-[48px] overflow-hidden ">
                                {state.name}
                            </h2>
                            <div>
                                <button>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatesOfCountry;
