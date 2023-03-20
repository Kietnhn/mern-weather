import React from "react";
import navs from "../../routes/navigate";
import { NavLink } from "react-router-dom";
import Calendar from "../Calendar";
import CitiesWeather from "../CitiesWeather";
const Navigation = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 w-[220px]  theme shadow-xl">
            <div className=" px-3 py-5 flex flex-col justify-between h-full">
                <div>
                    <NavLink
                        to="/landing"
                        className="px-3 mb-3 duration-500 hover:text-primaryText text-4xl font-bold block"
                    >
                        WeT
                    </NavLink>
                    {navs.map((nav, index) => {
                        const Icon = nav.icon;
                        return (
                            <NavLink
                                key={index}
                                to={nav.to}
                                className={({ isActive }) =>
                                    `px-3 mb-3 duration-500 hover:text-primaryText flex gap-4 ${
                                        isActive
                                            ? "text-text"
                                            : "text-primaryText "
                                    }`
                                }
                            >
                                <span>
                                    <Icon width="20px" height="20px" />
                                </span>
                                <p className="font-semibold">{nav.title}</p>
                            </NavLink>
                        );
                    })}
                </div>
                <div className="">
                    <h2 className="mb-3">My Cities</h2>
                    <div className="h-[45vh] overflow-auto px-2">
                        <CitiesWeather className="py-1 px-2 hover:cursor-pointer" />
                    </div>
                </div>
                {/* <div>
                    <Calendar />
                    Theme Compare moDe
                </div> */}
            </div>
        </div>
    );
};

export default Navigation;
