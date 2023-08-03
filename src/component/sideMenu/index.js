import React, { useContext } from "react";
import "../../styles/tailwind.css";
import Card from "../card";
import Chip from "../chip";
import MapContext from "../../context";

const dropDownCategories = [
	{
		category: "Hotels",
		image: "https://maps.gstatic.com/consumer/images/icons/2x/hotel_grey800_18dp.png",
	},
	{
		category: "Coffee",
		image: "https://img.icons8.com/?size=1x&id=109214&format=png",
	},
	{
		category: "Restaurants",
		image: "https://maps.gstatic.com/consumer/images/icons/2x/restaurant_grey800_18dp.png",
	},
];

const SideMenu = () => {
	const { setSelectedCategory, places } = useContext(MapContext); //Destructuring the MapContext

	return (
		<div className='w-11/12 right-side flex flex-col items-center w-full h-screen  sm:overflow-scroll'>
			<div className='mt-4 flex'>
				{dropDownCategories?.map(({ category, image }) => (
					<Chip
						key={category}
						category={category}
						setSelectedCategory={setSelectedCategory}
						image={image}
					/>
				))}
			</div>
			<div className='cards inline-block '>
				{places?.map((place) => {
					return <Card key={place.fsq_id} place={place} />;
				})}
			</div>
		</div>
	);
};

export default SideMenu;
