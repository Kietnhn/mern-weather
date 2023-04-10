import Map from "./Map";
import MainView from "./MainView";
import AirPollution from "./AirPollution/AirPollution";
import Sunview from "./Sunview";
import Contact from "../Contact/Contact";
import { Fade } from "react-awesome-reveal";
const TodayDesktop = () => {
    return (
        <>
            <Fade>
                <MainView />
                <AirPollution />
                <Sunview />
                <Map />
                <Contact />
            </Fade>
        </>
    );
};

export default TodayDesktop;
