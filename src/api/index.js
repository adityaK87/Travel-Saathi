export const placeSearch = async (coordinates, category) => {
	const { lat, lng } = coordinates;
	console.log("coordinates", lat, lng);
	try {
		const searchParams = new URLSearchParams({
			query: category,
			ll: `${lat},${lng}`,
			sort: "DISTANCE",
		});
		const results = await fetch(
			`https://api.foursquare.com/v3/places/search?${searchParams}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization:
						"fsq3BqDGjzH7gNFYLD3AkSg9vk/Bq6ZLFHarWneJGw7F9ok=",
				},
			}
		);
		const data = await results.json();
		console.log("responseData", data);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export const getPlaceDetails = async () => {
	try {
		const placeDetail = await fetch(
			"https://api.foursquare.com/v3/places/49d51ce3f964a520675c1fe3",
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization:
						"fsq3BqDGjzH7gNFYLD3AkSg9vk/Bq6ZLFHarWneJGw7F9ok=",
				},
			}
		);
		const data = await placeDetail.json();
		console.log("getPlaceDetails", data);
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getPlaceImages = async (fsq_id) => {
	try {
		const results = await fetch(
			`https://api.foursquare.com/v3/places/${fsq_id}/photos`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization:
						"fsq3BqDGjzH7gNFYLD3AkSg9vk/Bq6ZLFHarWneJGw7F9ok=",
				},
			}
		);
		const data = await results.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
export const getPlaceTips = async (fsq_id) => {
	try {
		const results = await fetch(
			`https://api.foursquare.com/v3/places/${fsq_id}/tips?limit=1`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization:
						"fsq3BqDGjzH7gNFYLD3AkSg9vk/Bq6ZLFHarWneJGw7F9ok=",
				},
			}
		);
		const data = await results.json();
		console.log("tip: " + data);
		return data[0].text;
	} catch (error) {
		console.log(error);
	}
};
