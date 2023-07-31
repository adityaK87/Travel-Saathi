import React from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvent,
} from "react-leaflet";
import "../../styles/tailwind.css"; // Very important as it loads Leaflet's CSS
import { Icon } from "leaflet";
import { v4 as uuidv4 } from "uuid";
import MiniCard from "../miniCard";

// to use any marker, use following method -

const redIcon = new Icon({
	iconUrl: require("../../img/redMarker.png"), // path where red marker icon is located
	iconSize: [40, 40],
});

const Map = ({ places, marker, setMarker, selectedCategory }) => {
	function SetViewOnClick() {
		const map = useMapEvent("click", (e) => {
			console.log("click event info => ", e);
			setMarker(e.latlng); // to update the location of blue Marker
			map.setView(e.latlng, map.getZoom());
		});
		return null;
	}

	return (
		<MapContainer
			key={JSON.stringify([marker.lat, marker.latitude])}
			center={marker}
			zoom={13}
			scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			<Marker position={marker}>
				<Popup>{/* {marker.lat} {marker.lng} */}See This</Popup>
			</Marker>

			{places?.map(({ geocodes, location, name, fsq_id }) => {
				// console.log("geocodes", geocodes.main);
				const { latitude, longitude } = geocodes.main;
				return (
					<Marker
						key={uuidv4()}
						icon={redIcon}
						position={[latitude, longitude]}
						eventHandlers={{
							mouseover: (event) => event.target.openPopup(),
							// mouseout: (event) => event.target.closePopup(),
						}}>
						<Popup className='w-74 bg-white'>
							<MiniCard fsq_id={fsq_id} cardName={name} />
						</Popup>
					</Marker>
				);
			})}
			<SetViewOnClick />
		</MapContainer>
	);
};

export default Map;
