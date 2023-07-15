import React, { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvent,
} from "react-leaflet";
import "./index.css"; // Very important as it loads Leaflet's CSS
import { Icon } from "leaflet";
import { getNearbyCities } from "../../api/";

// to use any marker, use following method -
const redIcon = new Icon({
	iconUrl: require("../../img/redMarker.png"), // path where red marker icon is located
	iconSize: [40, 40],
});

const Map = () => {
	const [marker, setMarker] = useState({ lat: 51.505, lng: -0.09 }); // initial coordinates of blue marker when app renders
	const [citiesLocation, setCitiesLocation] = useState([]); // it contains locations of nearby-cities
	// fetched by api

	function SetViewOnClick() {
		const map = useMapEvent("click", (e) => {
			console.log("click event info => ", e);
			setMarker(e.latlng); // to update the location of blue Marker
			map.setView(e.latlng, map.getZoom());
		});
		return null;
	}

	useEffect(() => {
		console.log("e.latlng ", marker);
		getNearbyCities(marker) // passing marker as coordinates to fetch nearby-cities' locations
			.then((data) => setCitiesLocation(data))
			.catch((err) => console.log(err));
	}, [marker]);

	return (
		<MapContainer center={marker} zoom={12} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={marker}>
				<Popup>
					{marker.lat},{marker.lng}
				</Popup>
			</Marker>
			{citiesLocation?.map(
				(
					item,
					index // at each city location, redIconed marker will be visible
				) => (
					<Marker
						key={index}
						icon={redIcon}
						position={[item.latitude, item.longitude]}>
						<Popup>
							{item.name}, {item.country}
						</Popup>
					</Marker>
				)
			)}
			<SetViewOnClick />
		</MapContainer>
	);
};

export default Map;
