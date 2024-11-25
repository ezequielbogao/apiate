import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Citas from "./layouts/views/Citas";
import Pagos from "./layouts/views/Pagos";
import Personal from "./layouts/views/Personal";
import { MenuProvider } from "./Context/MenuContext";
import Emergencias from "./layouts/views/Emergencias";
import Internacion from "./layouts/views/Internacion";
import Turnos from "./layouts/views/Turnos";
import Inmuebles from "./layouts/views/Inmuebles";
import Inmueble from "./layouts/views/singles/Inmueble";
import Rodados from "./layouts/views/Rodados";
import Rodado from "./layouts/views/singles/Rodado";
import Comercios from "./layouts/views/Comercios";
import Comercio from "./layouts/views/singles/Comercio";
import Dashboard from "./layouts/views/Dashboard";
import Login from "./layouts/views/auth/Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainLayout } from "./layouts/components/MainLayout";

const router = createBrowserRouter([
    // Ruta de login sin Header ni Footer
    { path: "/login", element: <Login /> },

    // Ruta principal con Layout con Header y Footer
    {
        path: "/",
        element: (
            <MainLayout>
                <Dashboard />
            </MainLayout>
        ),
    },

    // Rutas con Layout que incluye Header y Footer
    {
        path: "/citas",
        element: (
            <MainLayout>
                <Citas />
            </MainLayout>
        ),
    },
    {
        path: "/pagos",
        element: (
            <MainLayout>
                <Pagos />
            </MainLayout>
        ),
    },
    {
        path: "/personal",
        element: (
            <MainLayout>
                <Personal />
            </MainLayout>
        ),
    },
    {
        path: "/rafam/comercios",
        element: (
            <MainLayout>
                <Comercios />
            </MainLayout>
        ),
    },
    {
        path: "/rafam/comercio/:comercio",
        element: (
            <MainLayout>
                <Comercio />
            </MainLayout>
        ),
    },
    {
        path: "/rafam/inmuebles",
        element: (
            <MainLayout>
                <Inmuebles />
            </MainLayout>
        ),
    },
    {
        path: "/rafam/inmueble/:inmueble",
        element: (
            <MainLayout>
                <Inmueble />
            </MainLayout>
        ),
    },
    {
        path: "/rafam/rodados",
        element: (
            <MainLayout>
                <Rodados />
            </MainLayout>
        ),
    },
    {
        path: "/rafam/rodado/:rodado",
        element: (
            <MainLayout>
                <Rodado />
            </MainLayout>
        ),
    },
    {
        path: "/salud/emergencias",
        element: (
            <MainLayout>
                <Emergencias />
            </MainLayout>
        ),
    },
    {
        path: "/salud/internacion",
        element: (
            <MainLayout>
                <Internacion />
            </MainLayout>
        ),
    },
    {
        path: "/salud/turnos",
        element: (
            <MainLayout>
                <Turnos />
            </MainLayout>
        ),
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MenuProvider>
            <RouterProvider router={router} />
        </MenuProvider>
    </StrictMode>
);
