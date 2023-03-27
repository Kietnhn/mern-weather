import User from "../../components/Desktop/User";
import { NavLink } from "react-router-dom";
const DesktopHeader = () => {
    return (
        <div className="fixed top-0 left-0 right-0 theme dark:border-[unset]  px-12 py-1 z-[9999]">
            <div className="between ">
                <NavLink
                    to="/landing"
                    className="px-3 mb-3 duration-500 hover:text-primaryText text-4xl font-bold block"
                >
                    WeT
                </NavLink>

                <div>
                    {/* <input value="" placeholer="Enter a place..." /> */}
                </div>
                <User />
            </div>
        </div>
    );
};
export default DesktopHeader;
