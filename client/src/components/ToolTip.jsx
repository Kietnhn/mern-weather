const ToolTip = ({ children, position = "", message }) => {
    return (
        <div className="relative tooltip">
            {children}
            <div className={`tooltip-message  ${position}`}>
                <p>{message}</p>
            </div>
        </div>
    );
};
export default ToolTip;
