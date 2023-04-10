const Wrapper = ({ children, title = "", styleTitle, theme = "theme" }) => {
    return (
        <div className={`w-full h-[calc(100vh-52px)] mb-5 ${theme}`}>
            <div className="w-[1300px] mx-auto ">
                {title && (
                    <h1
                        className={
                            styleTitle || `font-bold text-4xl text-center  mb-5`
                        }
                    >
                        {title}
                    </h1>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};
export default Wrapper;
