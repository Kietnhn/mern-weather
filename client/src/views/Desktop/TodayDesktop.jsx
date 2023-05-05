import Map from "./Map";
import MainView from "./MainView";
import AirPollution from "./AirPollution/AirPollution";
import Sunview from "./Sunview";
import Contact from "../Contact/Contact";
import Navigation from "./Navigation";

// import { Fade } from "react-awesome-reveal";
const TodayDesktop = () => {
    return (
        <>
            <Navigation />
            {/* <Fade cascade> */}
            <MainView />
            <AirPollution />
            <Sunview />
            <Map />
            <Contact />
            {/* </Fade> */}
        </>
    );
};

export default TodayDesktop;
