import Map from "./Map";
import MainView from "./MainView";
import AirPollution from "./AirPollution/AirPollution";
import Sunview from "./Sunview";
const TodayDesktop = () => {
    return (
        <>
            <div className="px-3 py-2">
                {/* <MainView />
                <AirPollution /> */}
                <Sunview />
                <Map />
            </div>
        </>
    );
};

export default TodayDesktop;
