import { useState, useCallback, useEffect } from "react";
const InfoMap = ({ weather, map, className }) => {
    const [position, setPosition] = useState(map.getCenter());
    const [search, setSearch] = useState("");
    const [alert, setAlert] = useState(false);
    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);
    const handleChangePosition = () => {
        console.log("change");
    };
    return (
        <div className={className}>
            <div className="p-3">
                <div>
                    <input
                        className="py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
                <h1 className="text-2xl font-bold mb-2">You are at</h1>
                <div className="between font-semibold mb-2">
                    <h3 className="">
                        latitude:
                        <span>{position.lat.toFixed(1)}</span>
                    </h3>
                    <h3 className="">
                        langitude:
                        <span>{position.lng.toFixed(1)}</span>
                    </h3>
                </div>
                <div className="info font-semibold mb-2">
                    <h2 className="text-2xl">Temperature</h2>
                    <h2 className="text-4xl">24 &deg;</h2>
                </div>
                <div>
                    <button className="button" onClick={() => setAlert(true)}>
                        View more
                    </button>
                </div>
            </div>
            {alert && (
                <div className="fixed inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <p>This will change your current Position!</p>
                        <div className="between">
                            <button onClick={() => setAlert(false)}>
                                Cancel
                            </button>
                            <button onClick={handleChangePosition}>
                                Use this Position
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default InfoMap;
