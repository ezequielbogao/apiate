import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Children, useState } from "react";
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
        transition: "transform 0.3s ease", // Para un cambio suave
    };

    return (
        <Accordion open={open === 1}>
            <AccordionHeader
                onClick={() => handleOpen(1)}
                className={`text-azure-300 py-1 flex justify-between w-full bg-transparent rounded-sm font-light text-center md:text-left ${props.cs} text-xs md:text-xs shadow-none border-0 hover:text-azure-500 focus:outline-none`}>
                {props.text}
                <DownArrow style={rotationStyle} width={"20"} />
            </AccordionHeader>
            <AccordionBody>{props.children}</AccordionBody>
        </Accordion>
        // <span
        //     className={`text-azure-300 font-light text-center md:text-left ${props.cs} text-xs md:text-sm mb-2`}>
        //     {props.text}
        // </span>
    );
};

export default MenuSection;
