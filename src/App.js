import React, { useState, useEffect } from "react";
import Map from "./component/map/index";
import SideMenu from "./component/sideMenu";
import Navbar from "./component/navbar";
import { placeSearch } from "./api";
import "./styles/tailwind.css";

function App() {
	const [marker, setMarker] = useState({ lat: 51.505, lng: -0.09 });
	const [selectedCategory, setSelectedCategory] = useState("Hotels");
	const [places, setPlaces] = useState();

	useEffect(() => {
		placeSearch(marker, selectedCategory).then((placesData) => {
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
			<div className='App flex justify-space-between'>
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
