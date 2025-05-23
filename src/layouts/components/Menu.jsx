import Pago from "./icons/Pago";
import MenuButton from "./MenuButton";
import Citas from "./icons/Citas";
import User from "./icons/User";
import Casa from "./icons/Casa";
import Auto from "./icons/Auto";
import Charts from "./icons/Charts";
import Store from "./icons/Store";
import Devicecheck from "./icons/Devicecheck";
import Inter from "./icons/Inter";
import Corazon from "./icons/Corazon";
import Turnosmed from "./icons/Turnosmed";
import Reclamo from "./icons/Reclamo";

import MenuSection from "./MenuSection";
import { useLocation } from "react-router-dom";
import Email from "./icons/Email";
import Cartilla from "./icons/Cartilla";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Menu = () => {
    const { sistemas } = useSelector((state) => state.personal);
    const { user } = useSelector((state) => state.auth);

    const [role, setRole] = useState(null);

    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (user && user.roles) setRole(user.roles);
    }, [user]);

    return (
        <div className="w-2/12 justify-between md:px-3 border-r-2 border-azure-100 dark:border-azure-600 bg-white dark:bg-azure-700 pb-32">
            <div className="flex flex-col mt-5">
                <MenuSection
                    text="HOME"
                    textsm="HM"
                    visible={role == "admin" || role == "tasas"}>
                    <MenuButton
                        path={path}
                        to={"/"}
                        icon={<Charts />}
                        title={"Dashboard"}
                    />
                </MenuSection>
                {sistemas && Object.keys(sistemas).length > 0 && <>
                <MenuSection
                    text="PERSONA"
                    textsm="PS"
                    cs="mt-5"
                    visible={role == "admin" || role == "tasas"}>
                    <MenuButton
                        path={path}
                        to={"/personal"}
                        icon={<User />}
                        title={"Información"}
                    />
                </MenuSection>
                <MenuSection
                    text="CONDUCIR"
                    textsm="CD"
                    cs="mt-5"
                    visible={role == "admin"}>
                    <MenuButton
                        path={path}
                        to={"/citas"}
                        icon={<Citas />}
                        title={"Citas"}
                        count={sistemas?.citas?.length ?? null}
                    />
                </MenuSection>

                <MenuSection
                    text="AUTOGESTIÓN"
                    textsm="AG"
                    cs="mt-5"
                    visible={role == "admin"}>
                    <MenuButton
                        path={path}
                        to={"/pagos"}
                        icon={<Pago />}
                        title={"Pagos"}
                        count={sistemas?.pagos?.length ?? null}
                    />
                </MenuSection>

                <MenuSection
                    text="RAFAM"
                    textsm="RF"
                    cs="mt-5"
                    visible={role == "admin" || role == "tasas"}>
                    <MenuButton
                        path={path}
                        to={"/rafam/comercios"}
                        icon={<Store />}
                        title={"Comercios"}
                        count={
                            sistemas && sistemas.rafam_imponibles_deuda
                                ? sistemas.rafam_imponibles_deuda?.IMPONIBLES
                                      ?.COMERCIOS.length
                                : null
                        }
                    />
                    <MenuButton
                        path={path}
                        to={"/rafam/inmuebles"}
                        icon={<Casa />}
                        title={"Inmuebles"}
                        count={
                            sistemas && sistemas.rafam_imponibles_deuda
                                ? sistemas.rafam_imponibles_deuda?.IMPONIBLES
                                      ?.INMUEBLES.length
                                : null
                        }
                    />
                    <MenuButton
                        path={path}
                        to={"/rafam/rodados"}
                        icon={<Auto />}
                        title={"Rodados"}
                        count={
                            sistemas && sistemas.rafam_imponibles_deuda
                                ? sistemas.rafam_imponibles_deuda?.IMPONIBLES
                                      ?.RODADOS.length
                                : null
                        }
                    />
                    <MenuButton
                        path={path}
                        to={"/rafam/ddjj"}
                        icon={<Devicecheck />}
                        title={"Declaraciones Juradas"}
                    />
                </MenuSection>

                <MenuSection
                    text="SALUD"
                    textsm="SL"
                    cs="mt-5"
                    visible={role == "admin"}>
                    <MenuButton
                        path={path}
                        to={"/salud/emergencias"}
                        icon={<Corazon />}
                        title={"Emergencias"}
                        count={sistemas?.salud_emergencias?.length ?? null}
                    />{" "}
                    <MenuButton
                        path={path}
                        to={"/salud/internacion"}
                        icon={<Inter />}
                        title={"Internación"}
                        count={sistemas?.salud_internacion?.length ?? null}
                    />
                    <MenuButton
                        path={path}
                        to={"/salud/turnos"}
                        icon={<Turnosmed />}
                        title={"Turnos"}
                        count={sistemas?.salud_turnos?.length ?? null}
                    />
                    <MenuButton
                        path={path}
                        to={"/salud/cartilla"}
                        icon={<Cartilla />}
                        title={"Cartilla"}
                    />
                </MenuSection>

                <MenuSection
                    text="GESTIÓN"
                    textsm="GT"
                    cs="mt-5"
                    visible={role == "admin"}>
                    <MenuButton
                        path={path}
                        to={"/gestion/reclamos"}
                        icon={<Reclamo />}
                        count={sistemas?.reclamos?.length ?? null}
                        title={"Reclamos"}
                    />
                    <MenuButton
                        path={path}
                        to={"/gestion/campañas"}
                        icon={<Email />}
                        title={"Campañas"}
                    />
                </MenuSection>
                </>}
            </div>
        </div>
    );
};

export default Menu;
