import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Citas from "@views/Citas";
import Pagos from "@views/Pagos";
import Personal from "@views/Personal";
import { MenuProvider } from "./Context/MenuContext";
import Emergencias from "@views/Emergencias";
import Internacion from "@views/Internacion";
import Turnos from "@views/Turnos";
import Inmuebles from "@views/Inmuebles";
import Inmueble from "@views/singles/Inmueble";
import Rodados from "@views/Rodados";
import Rodado from "@views/singles/Rodado";
import Comercios from "@views/Comercios";
import Comercio from "@views/singles/Comercio";
import Dashboard from "@views/Dashboard";
import Login from "@views/auth/Login";
import Reclamos from "@views/Reclamos";
import Campanas from "@views/Campanas";

import "react-toastify/dist/ReactToastify.css";
import { MainLayout } from "./layouts/components/MainLayout";
import ComerciosRubros from "@views/ComerciosRubros";
import Cartilla from "@views/Cartilla";
import Buscar from "@views/cartilla/Buscar";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },

            {
                path: "/citas",
                element: <Citas />,
            },
            {
                path: "/pagos",
                element: <Pagos />,
            },
            {
                path: "/personal",
                element: <Personal />,
            },
            {
                path: "/rafam/comercios",
                element: <Comercios />,
            },
            {
                path: "/rafam/comercio/:comercio",
                element: <Comercio />,
            },
            {
                path: "/rafam/comercios/:rubro",
                element: <ComerciosRubros />,
            },
            {
                path: "/rafam/inmuebles",
                element: <Inmuebles />,
            },
            {
                path: "/rafam/inmueble/:inmueble",
                element: <Inmueble />,
            },
            {
                path: "/rafam/rodados",
                element: <Rodados />,
            },
            {
                path: "/rafam/rodado/:rodado",
                element: <Rodado />,
            },
            {
                path: "/salud/emergencias",
                element: <Emergencias />,
            },
            {
                path: "/salud/cartilla",
                element: <Cartilla />,
            },
            {
                path: "/salud/cartilla/buscar",
                element: <Buscar />,
            },
            {
                path: "/salud/internacion",
                element: <Internacion />,
            },
            {
                path: "/salud/turnos",
                element: <Turnos />,
            },
            {
                path: "/gestion/reclamos",
                element: <Reclamos />,
            },
            {
                path: "/gestion/campañas",
                element: <Campanas />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <MenuProvider>
        <RouterProvider router={router}>
            <MainLayout />
        </RouterProvider>
    </MenuProvider>
);
