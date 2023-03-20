import React from "react";

const AlertLimitedAPI = () => {
    return (
        <div className="absolute inset-0 bg-[rgba(0,0,0,.3)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="theme rounded-lg center flex-col px-3 py-2">
                    <h2 className="font-bold uppercase">Limited API</h2>
                    <p className="font-semibold">
                        Sorry we can't show this infomation
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlertLimitedAPI;
