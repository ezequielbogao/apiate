import PropTypes from "prop-types";

const ContentHeader = (props) => {
    ContentHeader.propTypes = {
        label: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
    };
    return (
        <div className="p-3 px-5 text-left border-b-2 border-azure-100 dark:border-azure-600 bg-white dark:bg-azure-700">
            <div className="flex flex-col text-left">
                <span className="text-md text-azure-400 font-light">
                    {props.label}
                </span>
                <span className="text-2xl text-azure-700 dark:text-azure-300 font-medium">
                    {props.title}
                </span>
                <span className="text-md text-azure-400 font-light">
                    {props.subtitle && props.subtitle}
                </span>
            </div>
        </div>
    );
};

export default ContentHeader;
