import React, { useEffect } from "react"
import LadrarImageUrl from "../assets/img/Perrito.jpg";
import LenguaImageUrl from "../assets/img/PerritoLengua.jpg";
import BañitoImageUrl from "../assets/img/Ducha.jpg";
import CachorroImageUrl from "../assets/img/Bulldog.jpg";
import BlancoImageUrl from "../assets/img/English.jpg";
import CaraImageUrl from "../assets/img/Seriedad.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Carousel } from "../components/Carousel.jsx"; // Importa el carrusel
import "../index.css";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	// Imágenes para el carrusel
	const carouselImages = [
		CachorroImageUrl,
		BañitoImageUrl,
		BlancoImageUrl, // Puedes agregar más imágenes aquí
	];

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">🐾 Peluquería Canina ArisVet 🐾</h1>

			{/* CARRUSEL AQUÍ */}
			<div className="container my-4">
				<Carousel images={carouselImages} interval={3000} autoPlay={true} />
			</div>

			<div className="card-group">
				<div className="card mx-2">
					<img src={CaraImageUrl} className="card-img-top" alt="..."  />

					<div className="card-body">
						<h5 className="card-title">Baño y Corte</h5>
						<p className="card-text">Servicio profesional de baño y corte personalizado para tu mascota.</p>
						<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
					</div>
				</div>
				<div className="card mx-2">
					<img src={LadrarImageUrl} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Spa Canino</h5>
						<p className="card-text">Tratamientos especiales de relajación para tu perro.</p>
						<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
					</div>
				</div>
				<div className="card mx-2">
					<img src={LenguaImageUrl} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Aseo Completo</h5>
						<p className="card-text">Servicio integral que incluye limpieza de oídos, corte de uñas y más.</p>
						<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
					</div>
				</div>
			</div>


		
		</div>
	);
};