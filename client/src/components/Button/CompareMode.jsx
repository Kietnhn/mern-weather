import React from "react";
import ToolTip from "../ToolTip";
import { CompareIcon } from "../icons";
import { NavLink } from "react-router-dom";
const CompareMode = () => {
    return (
        <div className="fixed right-0 top-[100px]">
            <ToolTip
                message="Compare Mode"
                position="left-[calc(-100%-8px)] top-0 -translate-x-1/2"
                arrow={`top-1/2 right-0 translate-x-[100%] -translate-y-1/2 
                  border-[transparent_transparent_transparent_white] dark:border-[transparent_transparent_transparent_black]`}
            >
                <NavLink to="/comparative">
                    <button className="p-3 rounded-full theme">
                        <span>
                            <CompareIcon width="20px" height="20px" />
                        </span>
                    </button>
                </NavLink>
            </ToolTip>
        </div>
    );
};

export default CompareMode;
