import React from "react";
import DesktopHeader from "../../views/Desktop/DesktopHeader";
import Navigation from "../../views/Desktop/Navigation";
import Theme from "../../components/Theme/Theme";

const DesktopLayout = ({ children }) => {
    return (
        <div className="relative ">
            <DesktopHeader />
            <Navigation />
            <Theme className="fixed right-0 top-16 z[9999]" />
            <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[9999]">
                <div className="rotate-[90deg] ">My Cities</div>
            </div>
            <div className={`mt-[52px] px-12`}>
                <div className="relative w-full theme">{children}</div>
            </div>
            <footer className="h-[1000px]"></footer>
        </div>
    );
};

export default DesktopLayout;
