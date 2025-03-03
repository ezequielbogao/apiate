import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import DownArrow from "./icons/DownArrow";
import ChevronDown from "./icons/chevronDown";

const MenuSection = (props) => {
    MenuSection.propTypes = {
        text: PropTypes.string,
        textsm: PropTypes.string,
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
        <Accordion open={open === 1} className="accordion-menu py-0">
            <AccordionHeader
                onClick={() => handleOpen(1)}
                className={` ${
                    isRotated
                        ? "text-azure-300 dark:text-azure-400"
                        : "text-azure-700 dark:text-azure-100"
                }  py-0 flex justify-between w-full bg-transparent rounded-sm font-bold text-center md:text-left ${
                    props.cs
                } text-xs shadow-none border-0 hover:text-azure-500 focus:outline-none`}>
                <span className="block sm:block md:hidden">{props.textsm}</span>
                <span className="hidden md:block">{props.text}</span>
                <ChevronDown
                    css={
                        isRotated
                            ? "text-azure-300 dark:text-azure-400 font-bold hidden md:block"
                            : "text-azure-700 dark:text-azure-100 font-bold hidden md:block"
                    }
                    stroke={isRotated ? "2" : "2"}
                    style={rotationStyle}
                    width={"20"}
                />
            </AccordionHeader>
            <AccordionBody>{props.children}</AccordionBody>
        </Accordion>
    );
};

export default MenuSection;
