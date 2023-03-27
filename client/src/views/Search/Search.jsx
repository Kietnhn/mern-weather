import { SearchIcon } from "../../components/icons";
import { useContext, useState, useEffect } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import CountryStateCity from "../CountryStateCity/CountryStateCity";
import Input from "./Input";
function Search() {
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);

    const [position, setPosition] = useState({
        country: "",
        state: "",
        city: "",
    });

    const [customMode] = useState([
        {
            name: "country",
        },
        {
            name: "state",
        },
    ]);

    useEffect(() => {
        if (currentPosition) {
            setPosition({
                state: "",
                city: "",
                country: currentPosition.countryCode,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPosition]);

    if (!currentPosition) return <></>;
    return (
        <div className="relative">
            <div className="dark:bg-secondDark bg-[#dee1e6]  text-dark dark:text-primaryText between font-semibold lg:px-3 w-full">
                <button className="absolute top-[50%] left-4 translate-y-[-50%] ">
                    <span>
                        <SearchIcon />
                    </span>
                </button>
                <div className="flex w-full">
                    {customMode.map((mode) => {
                        return (
                            <div key={mode.name} className="w-1/2 px-3 ">
                                <Input
                                    mode={mode}
                                    position={position}
                                    setPosition={setPosition}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="mt-6">
                <CountryStateCity position={position} />
            </div>
        </div>
    );
}

export default Search;
