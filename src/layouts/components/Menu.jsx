import Pago from "./icons/Pago";
import MenuButton from "./MenuButton";
import Citas from "./icons/Citas";
import User from "./icons/User";
import Casa from "./icons/Casa";
import Auto from "./icons/Auto";
import Charts from "./icons/Charts";
import Store from "./icons/Store";
import Inter from "./icons/Inter";
import Corazon from "./icons/Corazon";
import Turnosmed from "./icons/Turnosmed";
import Reclamo from "./icons/Reclamo";

import MenuSection from "./MenuSection";
import { useMenu } from "../../Context/MenuContext";
import { useLocation } from "react-router-dom";
import Email from "./icons/Email";

const Menu = () => {
    const { sistemas, error, loading } = useMenu();

    const location = useLocation();
    const path = location.pathname;
    return (
        <div className="w-2/12 justify-between md:px-5 border-r-2 border-azure-100 dark:border-azure-600 bg-white dark:bg-azure-700 pb-32">
            <div className="flex flex-col mt-5">
                <MenuSection text="HOME" />
                <MenuButton
                    path={path}
                    to={"/"}
                    icon={<Charts />}
                    title={"Dashboard"}
                />
                <MenuSection text="PERSONA" cs="mt-10" />
                <MenuButton
                    path={path}
                    to={"/personal"}
                    icon={<User />}
                    title={"Información"}
                />
                <MenuSection text="CONDUCIR" cs="mt-10" />
                <MenuButton
                    path={path}
                    to={"/citas"}
                    icon={<Citas />}
                    title={"Citas"}
                    count={sistemas?.citas?.length ?? null}
                />
                <MenuSection text="AUTOGESTIÓN" cs="mt-10" />
                <MenuButton
                    path={path}
                    to={"/pagos"}
                    icon={<Pago />}
                    title={"Pagos"}
                    count={
                        sistemas && sistemas.pagos
                            ? sistemas.pagos.length
                            : null
                    }
                />
                <MenuSection text="RAFAM" cs="mt-10" />
                <MenuButton
                    path={path}
                    to={"/rafam/comercios"}
                    icon={<Store />}
                    title={"Comercios"}
                    count={
                        sistemas?.rafam_imponibles?.comercios?.length ?? null
                    }
                />
                <MenuButton
                    path={path}
                    to={"/rafam/inmuebles"}
                    icon={<Casa />}
                    title={"Inmuebles"}
                    count={
                        sistemas?.rafam_imponibles?.inmuebles?.length ?? null
                    }
                />
                <MenuButton
                    path={path}
                    to={"/rafam/rodados"}
                    icon={<Auto />}
                    title={"Rodados"}
                    count={sistemas?.rafam_imponibles?.rodados?.length ?? null}
                />
                <MenuSection text="SALUD" cs="mt-10" />
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
                <MenuSection text="GESTIÓN" cs="mt-10" />
                <MenuButton
                    path={path}
                    to={"/gestion/reclamos"}
                    icon={<Reclamo />}
                    title={"Reclamos"}
                />
                <MenuButton
                    path={path}
                    to={"/gestion/campañas"}
                    icon={<Email />}
                    title={"Campañas"}
                />
            </div>
        </div>
    );
};

export default Menu;
