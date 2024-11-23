import PropTypes from "prop-types";

const MenuSection = (props) => {
    MenuSection.propTypes = {
        text: PropTypes.string,
        cs: PropTypes.string,
    };
    return (
        <span
            className={`text-azure-300 font-light text-center md:text-left ${props.cs} text-xs md:text-sm mb-2`}>
            {props.text}
        </span>
    );
};

export default MenuSection;
