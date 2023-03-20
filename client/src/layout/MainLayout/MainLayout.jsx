import Header from "../Header/Header";
import { Theme } from "../../components/Theme";
import { WeatherContext } from "../../contexts/WeatherContext";
import { useContext, useEffect } from "react";
import { Navigation } from "../../views";
import SaveButton from "../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import DesktopHeader from "../../components/Desktop/DesktopHeader";
import DesktopNavigation from "../../components/Desktop/Navigation";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
function MainLayout({ children }) {
    const {
        weatherState: {
            weatherData: { currentWeather },
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
                <DesktopLayout>{children}</DesktopLayout>
            ) : (
                <MobileLayout>{children}</MobileLayout>
            )}
        </div>
    );
}

export default MainLayout;
