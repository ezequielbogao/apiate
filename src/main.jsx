import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import Home from "./layouts/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Citas from "./layouts/views/Citas";
import Pagos from "./layouts/views/Pagos";
import Personal from "./layouts/views/Personal";
import { MenuProvider } from "./Context/MenuContext";
import Comercios from "./layouts/views/Comercios";
import Inmuebles from "./layouts/views/Inmuebles";
import Rodados from "./layouts/views/Rodados";
import Emergencias from "./layouts/views/Emergencias";
import Internacion from "./layouts/views/Internacion";
import Turnos from "./layouts/views/Turnos";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/citas", element: <Citas /> },
    { path: "/pagos", element: <Pagos /> },
    { path: "/personal", element: <Personal /> },
    { path: "/rafam/comercios", element: <Comercios /> },
    { path: "/rafam/inmuebles", element: <Inmuebles /> },
    { path: "/rafam/rodados", element: <Rodados /> },
    { path: "/salud/emergencias", element: <Emergencias /> },
    { path: "/salud/internacion", element: <Internacion /> },
    { path: "/salud/turnos", element: <Turnos /> },
]);
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MenuProvider>
            <div className="w-full flex flex-col justify-center bg-white text-azure-800 dark:bg-azure-900 dark:text-azure-50 bg-pattern">
                <Header />
                <RouterProvider router={router} />
                {/* <Footer /> */}
            </div>
        </MenuProvider>
    </StrictMode>
);
