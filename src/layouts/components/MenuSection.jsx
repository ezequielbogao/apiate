import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import DownArrow from "./icons/DownArrow";

const MenuSection = (props) => {
    MenuSection.propTypes = {
        text: PropTypes.string,
        cs: PropTypes.string,
        children: PropTypes.any,
    };

    const [open, setOpen] = useState(1);
    const [isRotated, setIsRotated] = useState(false);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
        setIsRotated(!isRotated);
    };

    const rotationStyle = {
        transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
    };

    return (
        <Accordion open={open === 1} style={style}>
            <AccordionHeader
                onClick={() => handleOpen(1)}
                className={`text-azure-300 py-1 flex justify-between w-full bg-transparent rounded-sm font-light text-center md:text-left ${props.cs} text-xs md:text-xs shadow-none border-0 hover:text-azure-500 focus:outline-none`}>
                {props.text}
                <DownArrow style={rotationStyle} width={"20"} />
            </AccordionHeader>
            <AccordionBody>{props.children}</AccordionBody>
        </Accordion>
    );
};

const style = {};

export default MenuSection;

// import PropTypes from "prop-types";

// const MenuSection = (props) => {
//     MenuSection.propTypes = {
//         text: PropTypes.string,
//         cs: PropTypes.string,
//         children: PropTypes.any,
//     };

//     return (
//         <div>
//             <div
//                 className={`text-azure-300 py-1 flex justify-center sm:justify-start w-full bg-transparent rounded-sm font-light text-center md:text-left ${props.cs} text-xs md:text-xs shadow-none border-0 hover:text-azure-500 focus:outline-none`}>
//                 {props.text}
//             </div>
//             {props.children}
//         </div>
//     );
// };

// export default MenuSection;
