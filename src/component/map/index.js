import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../../styles/tailwind.css"; // Very important as it loads Leaflet's CSS
import { Icon } from "leaflet";
import { getNearbyCities } from "../../api";

// to use any marker, use following method -

const redIcon = new Icon({
	iconUrl: require("../../img/redMarker.png"), // path where red marker icon is located
	iconSize: [40, 40],
});

const locationCoordinates = [
	{
		name: "New York",
		coord: {
			lat: 40.712776,
			lng: -74.005974,
		},
	},
	{
		name: "Chicago",
		coord: {
			lat: 41.878113,
			lng: -87.629799,
		},
	},
	{
		name: "Texas",
		coord: {
			lat: 31.968599,
			lng: -99.90181,
		},
	},
	{
		name: "Florida",
		coord: {
			lat: 27.664827,
			lng: -81.515755,
		},
	},
	{
		name: "Virginia",
		coord: {
			lat: 37.431572,
			lng: -78.656891,
		},
	},
];

const Map = ({ location }) => {
	console.log("locaiton map ", location);
	const [marker, setMarker] = useState({ lat: 40.712843, lng: -74.005966 }); // initial coordinates of blue marker when app renders
	const [citiesLocation, setCitiesLocation] = useState([]); // it contains locations of nearby-cities
	// fetched by api

	// function SetViewOnClick() {
	// 		const map = useMapEvent("click", (e) => {
	// 			console.log("click event info => ", e);
	// 			setMarker(e.latlng); // to update the location of blue Marker
	// 			map.setView(e.latlng, map.getZoom());
	// 		});
	// 		return null;
	// 	}

	function SetViewOnClick({ coords }) {
		const map = useMap();
		map.setView(coords, map.getZoom());

		return null;
	}

	useEffect(() => {
		console.log("e.latlng ", marker);
		const selectedCity = locationCoordinates.filter(
			(item) => item.name.toLowerCase() === location.toLowerCase()
		);
		console.log("selectedCity ", selectedCity[0].coord);
		setMarker(selectedCity[0].coord);

		getNearbyCities(marker) // passing marker as coordinates to fetch nearby-cities' locations
			.then((res) => setCitiesLocation(res.data))
			.catch((err) => console.log(err));
	}, [location, marker]);
	// dependency array contains marker => It means on changing marker's value,
	// useEffect will trigger and getNearbyCities executes populating citiesLocation.

	console.log("citiesLocation", citiesLocation);

	return (
		<MapContainer
			key={JSON.stringify([marker.lat, marker.latitude])}
			center={marker}
			zoom={15}
			scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={marker}>
				<Popup>
					{marker.lat} {marker.lng}
				</Popup>
			</Marker>
			{citiesLocation?.map(({ latitude, longitude }) => (
				<Marker
					key={latitude}
					icon={redIcon}
					position={[latitude, longitude]}>
					<Popup>
						{latitude}, {longitude}
					</Popup>
				</Marker>
			))}
			<SetViewOnClick coords={[marker.lat, marker.lng]} />
		</MapContainer>
	);
};

export default Map;
