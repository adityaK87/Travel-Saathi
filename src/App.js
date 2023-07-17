import React, { useState, useEffect } from "react";
import Map from "./component/map/index";
import SearchComponent from "./component/searchField/index";

import { placeSearch } from "./api";

function App() {
	const [marker, setMarker] = useState({ lat: 51.505, lng: -0.09 });
	const [location, setLocation] = useState("New York");

	const [places, setPlaces] = useState();

	useEffect(() => {
		placeSearch(marker).then((placesData) => {
			setPlaces(placesData.results);
		});
	}, [marker]);

	return (
		<div className='App flex justify-space-between'>
			<SearchComponent setLocation={setLocation} places={places} />
			<Map places={places} marker={marker} setMarker={setMarker} />{" "}
			{/** Map component will contain the map shown in our React app */}
		</div>
	);
}
export default App;
