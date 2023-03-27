import React from "react";
import navs from "../../routes/navigate";
import { NavLink } from "react-router-dom";
const Navigation = () => {
    return (
        <div className="fixed top-16 left-0  z-[9999]">
            <div className="py-2 flex-col between  bg-[rgba(0,0,0,.05)]">
                <div>
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
                                    <Icon width="24px" height="24px" />
                                </span>
                                {/* <p className="font-semibold">{nav.title}</p> */}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
