import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import Citas from "@views/Citas";
import Pagos from "@views/Pagos";
import Turnos from "@views/Turnos";
import Rodados from "@views/Rodados";
import Login from "@views/auth/Login";
import Reclamos from "@views/Reclamos";
import Campanas from "@views/Campanas";
import Cartilla from "@views/Cartilla";
import Denegado from "@views/Denegado";
import Personal from "@views/Personal";
import Comercios from "@views/Comercios";
import Inmuebles from "@views/Inmuebles";
import Dashboard from "@views/Dashboard";
import Rodado from "@views/singles/Rodado";
import Emergencias from "@views/Emergencias";
import Internacion from "@views/Internacion";
import Medicos from "@views/cartilla/Medicos";
import Centros from "@views/cartilla/Centros";
import Inmueble from "@views/singles/Inmueble";
import Comercio from "@views/singles/Comercio";
import Presentaciones from "@views/Presentaciones";
import ComerciosRubros from "@views/ComerciosRubros";
import { MainLayout } from "./layouts/components/MainLayout";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { MenuProvider } from "./Context/MenuContext";
import { store } from "@store/store";
import { AuthMiddleware } from "./layouts/components/auth/AuthMiddleware";

const ProtectedRoutes = () => {
    return (
        <AuthMiddleware>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/citas" element={<Citas />} />
                    <Route path="/pagos" element={<Pagos />} />
                    <Route path="/personal" element={<Personal />} />
                    <Route path="/rafam/ddjj" element={<Presentaciones />} />
                    <Route path="/rafam/comercios" element={<Comercios />} />
                    <Route
                        path="/rafam/comercio/:comercio"
                        element={<Comercio />}
                    />
                    <Route
                        path="/rafam/comercios/:rubro"
                        element={<ComerciosRubros />}
                    />
                    <Route path="/rafam/inmuebles" element={<Inmuebles />} />
                    <Route
                        path="/rafam/inmueble/:inmueble"
                        element={<Inmueble />}
                    />
                    <Route path="/rafam/rodado/:rodado" element={<Rodado />} />
                    <Route path="/rafam/rodados" element={<Rodados />} />
                    <Route
                        path="/salud/emergencias"
                        element={<Emergencias />}
                    />
                    <Route path="/salud/cartilla" element={<Cartilla />} />
                    <Route
                        path="/salud/cartilla/medicos/:especialidad"
                        element={<Medicos />}
                    />
                    <Route
                        path="/salud/cartilla/centros/:especialidad"
                        element={<Centros />}
                    />
                    <Route
                        path="/salud/internacion"
                        element={<Internacion />}
                    />
                    <Route path="/salud/turnos" element={<Turnos />} />
                    <Route path="/gestion/reclamos" element={<Reclamos />} />
                    <Route path="/gestion/campañas" element={<Campanas />} />
                </Routes>
            </MainLayout>
        </AuthMiddleware>
    );
};

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <MenuProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<ProtectedRoutes />} />
                    <Route path="/acceso-denegado" element={<Denegado />} />
                </Routes>
            </BrowserRouter>
        </MenuProvider>
    </Provider>
);
