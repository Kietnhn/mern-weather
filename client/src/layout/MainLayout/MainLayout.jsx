import Header from "../Header/Header";
import { Theme } from "../../components/Theme";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext, useEffect } from "react";
import { Navigation } from "../../views";
import SaveButton from "../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import DesktopHeader from "../../components/Desktop/DesktopHeader";
import DesktopNavigation from "../../components/Desktop/Navigation";
function MainLayout({ children }) {
    const {
        weatherState: {
            weatherData: { timezone, currentWeather },
        },
    } = useContext(WeatherContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentWeather) return navigate("/landing");
    }, [currentWeather, navigate]);

    if (!currentWeather) return <></>;
    return (
        <div className="dark:bg-dark dark:text-primaryText bg-[white] text-dark p-6 h-screen lg:brightness-100 brightness-[0.95] duration-200 lg:w-unset lg:h-unset lg:p-0">
            {window.innerWidth > 992 ? (
                <div className="w-full h-full overflow-hidden relative">
                    <DesktopNavigation />
                    <div className="ml-[calc(220px+16px)] ">
                        <DesktopHeader />
                        <div className="relative w-full theme">{children}</div>
                    </div>
                </div>
            ) : (
                <>
                    <Header />
                    <div className="fixed right-3 top-20  z-[49]">
                        <Theme />
                    </div>
                    <Navigation />
                    <div className="w-full bg-slate-400 my-4 relative z-20 lg:hidden">
                        <div className="relative z-10 flex items-center mt-10">
                            <h3 className="text-2xl font-semibold mr-2 ">
                                {timezone ? timezone : "Current Location"}
                            </h3>
                            <SaveButton></SaveButton>
                        </div>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
}

export default MainLayout;
