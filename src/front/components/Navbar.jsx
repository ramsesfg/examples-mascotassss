import React from "react";
import { Link, useNavigate } from "react-router-dom";
import nuevoImageUrl from "../assets/img/logo_512.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: 'logout' });
		navigate('/');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-glass bg-light  sticky-top">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
				 <img src={nuevoImageUrl} height={80}  alt="Fondo" />
					🐾 Peluquería Canina ArisVet
				</Link>
				
				<button 
					className="navbar-toggler" 
					type="button" 
					data-bs-toggle="collapse" 
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Inicio
							</Link>
						</li>

						{!store.token ? (
							// Menú para usuarios no logueados
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Iniciar Sesión
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link btn btn-primary text-white ms-2" to="/registro">
										Registrarse
									</Link>
								</li>
							</>
						) : (
							// Menú para usuarios logueados
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/dashboard">
										Dashboard
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/mascotas">
										Mis Mascotas
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/citas">
										Mis Citas
									</Link>
								</li>
								<li className="nav-item dropdown">
									<a 
										className="nav-link dropdown-toggle" 
										href="#" 
										id="navbarDropdown" 
										role="button" 
										data-bs-toggle="dropdown"
									>
										👤 {store.user?.nombre}
									</a>
									<ul className="dropdown-menu">
										<li>
											<Link className="dropdown-item" to="/perfil">
												Mi Perfil
											</Link>
										</li>
										<li><hr className="dropdown-divider" /></li>
										<li>
											<button 
												className="dropdown-item text-danger" 
												onClick={handleLogout}
											>
												Cerrar Sesión
											</button>
										</li>
									</ul>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};