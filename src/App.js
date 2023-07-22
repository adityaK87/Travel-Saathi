import React, { useState, useEffect } from "react";
import Map from "./component/map/index";
import SideMenu from "./component/sideMenu";
import Navbar from "./component/navbar";
import { getNearByPlaces } from "./api";
import "./styles/tailwind.css";

function App() {
	const [marker, setMarker] = useState({ lat: 51.505, lng: -0.09 });
	const [selectedCategory, setSelectedCategory] = useState(
		localStorage.getItem("chip")
	);
	const [places, setPlaces] = useState();

	useEffect(() => {
		getNearByPlaces(marker, selectedCategory).then((placesData) => {
			setPlaces(placesData.results);
		});

		// filterCategory(selectedCategory);
	}, [marker, selectedCategory]);

	return (
		<>
			<Navbar
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<div className='App flex flex-col-reverse justify-space-between w-full sm:flex-row '>
				<SideMenu
					setSelectedCategory={setSelectedCategory}
					places={places}
				/>
				<Map
					places={places}
					marker={marker}
					setMarker={setMarker}
					selectedCategory={selectedCategory}
				/>
				{/** Map component will contain the map shown in our React app */}
			</div>
		</>
	);
}
export default App;
