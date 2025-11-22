// Import necessary components and functions from react-router-dom.
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Welcome } from "./pages/Welcome";
import { Registro } from "./pages/Registro";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Perfil } from "./pages/Perfil";
import { MascotasList } from "./pages/MascotasList";
import { MascotaForm } from "./pages/MascotaForm";
import { CitasList } from "./pages/CitasList";
import { CitaForm } from "./pages/CitaForm";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Rutas de autenticación */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas - Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Rutas de mascotas */}
        <Route path="/mascotas" element={<MascotasList />} />
        <Route path="/mascotas/nueva" element={<MascotaForm />} />
        <Route path="/mascotas/editar/:id" element={<MascotaForm />} />
        
        {/* Rutas de citas */}
        <Route path="/citas" element={<CitasList />} />
        <Route path="/citas/nueva" element={<CitaForm />} />
        <Route path="/citas/editar/:id" element={<CitaForm />} />
      </Route>
    )
);