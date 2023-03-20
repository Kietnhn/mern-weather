import React from "react";
import DesktopHeader from "../../components/Desktop/DesktopHeader";
import DesktopNavigation from "../../components/Desktop/DesktopNavigation";

const DesktopLayout = ({ children }) => {
    return (
        <div className="w-full h-full overflow-hidden relative">
            <DesktopNavigation />
            <div className="ml-[calc(220px+16px)] ">
                <DesktopHeader />
                <div className="relative w-full theme">{children}</div>
            </div>
        </div>
    );
};

export default DesktopLayout;
