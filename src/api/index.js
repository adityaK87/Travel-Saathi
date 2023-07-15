import axios from "axios";

export const getNearbyCities = async (coordinates) => {
	console.log("coordinates ", coordinates);
	const { lat, lng } = coordinates;

	const options = {
		method: "GET",
		url: "https://booking-com.p.rapidapi.com/v1/hotels/nearby-cities",
		params: {
			latitude: lat,
			longitude: lng,
			locale: "en-gb",
		},
		headers: {
			"X-RapidAPI-Key":
				"1337516513msh551bb42aca4977cp16ceebjsn35c31582fbb0",
			"X-RapidAPI-Host": "booking-com.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log("cities ", response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
