import { Link } from "react-router-dom";
import React from "react";
import fonImageUrl from "../assets/img/Fondo-logo.png";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<img src={fonImageUrl} alt="Logo" style={{ height: "40px" }} />
				</Link>
				<div className="ml-auto">
					<Link to="/welcome">
					<i class="fa-regular fa-user"></i>
						
					</Link>
				</div>
			</div>
		</nav>
	);
};