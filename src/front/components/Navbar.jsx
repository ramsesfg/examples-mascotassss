import { Link } from "react-router-dom";
import React from "react";
import fonImageUrl from "../assets/img/Fondo-logo.png";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light sticky-top" style={{
			background: 'rgba(178, 226, 208, 0.66)', // Verde menta con 85% opacidad
			backdropFilter: 'blur(10px)', // Efecto glassmorphism
			WebkitBackdropFilter: 'blur(10px)', // Para Safari
			boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
			borderBottom: '2px solid rgba(92, 184, 92, 0.3)'
		}}>
			<div className="container-fluid">





				<Link to="/">
					<img src={fonImageUrl} alt="Logo" style={{ height: "60px" }} />
				</Link>
				<div className="ml-auto">
					<Link to="/welcome" style={{
						color: '#2c3e50',
						fontSize: '24px',
						transition: 'all 0.3s ease'
					}}
						onMouseEnter={(e) => {
							e.target.style.color = '#5CB85C';
							e.target.style.transform = 'scale(1.1)';
						}}
						onMouseLeave={(e) => {
							e.target.style.color = '#2c3e50';
							e.target.style.transform = 'scale(1)';
						}}
					>
						<div className="btn-group dropstart">
							<a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						     <i className="fa-regular fa-user"></i>
							
							</a>
		
							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="#">Action</a></li>
								<li><a className="dropdown-item" href="#">Another action</a></li>
								<li><a className="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};