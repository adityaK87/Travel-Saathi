import React from "react";
import ImageSlider from "../imageSlider";
import "../../styles/tailwind.css";

const MiniCard = ({ cardName, fsq_id }) => {
	return (
		<div className=' minicard w-72 rounded overflow-hidden  bg-transparent '>
			<ImageSlider fsq_id={fsq_id} />
			<div className='px-6 py-4'>
				<a
					href={`https://foursquare.com/v/${cardName}/${fsq_id}`}
					target='_blank'
					rel='noreferrer'
					className='font-bold text-xl mb-2 hover:underline'>
					{cardName}
				</a>
			</div>
		</div>
	);
};

export default MiniCard;
