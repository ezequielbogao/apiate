import PropTypes from "prop-types";
import Menu from "./Menu";

const Content = ({ children }) => {
    Content.propTypes = {
        children: PropTypes.object,
    };
    return (
        <div className="w-full flex h-full min-h-screen bg-white dark:bg-azure-900">
            {/* <Menu /> */}
            {children}
        </div>
    );
};

export default Content;
