let options = {
	method: "GET",
	headers: {
		Accept: "application/json",
		Authorization: "fsq3kXRRlbrqGyW0AsIwKy1ECnTkidq/OdIfnYKInSj7dOA=",
	},
};

const common_url = "https://api.foursquare.com/v3/places";

export const getNearByPlaces = async (coordinates, category) => {
	const { lat, lng } = coordinates;
	console.log("coordinates", lat, lng);
	try {
		const searchParams = new URLSearchParams({
			query: category,
			ll: `${lat},${lng}`,
			sort: "DISTANCE",
		});
		const results = await fetch(
			`${common_url}/search?${searchParams}`,
			options
		);
		const data = await results.json();
		console.log("responseData", data);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export const getPlaceImages = async (fsq_id) => {
	try {
		const results = await fetch(`${common_url}/${fsq_id}/photos`, options);
		const data = await results.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getPlaceTips = async (fsq_id) => {
	try {
		const results = await fetch(
			`${common_url}/${fsq_id}/tips?limit=1`,
			options
		);
		const data = await results.json();
		console.log("tip: " + data);
		return data[0].text;
	} catch (error) {
		console.log(error);
	}
};
