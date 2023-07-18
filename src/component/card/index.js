import React, { useEffect, useState } from "react";
import Image from "../../img/hotel.jpeg";
import { getPlaceImages, getPlaceTips } from "../../api";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AiOutlineComment, AiOutlineFieldTime } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
const Card = ({ place }) => {
	// const [cardDetails, setCardDetails] = useState();
	const [image, setImage] = useState([]);
	const [tip, setTip] = useState("");
	const {
		name,
		location,
		geocodes,
		timezone,
		categories,
		link,
		fsq_id,
		related_places,
	} = place;
	const {
		address,
		city,
		country,
		dma,
		postcode,
		cross_street,
		formatted_address,
		locality,
	} = location;
	const [first_obj] = categories;
	// console.log("first_obj", first_obj);

	useEffect(() => {
		getPlaceImages(fsq_id).then((imageObj) => {
			setImage(imageObj);
		});
		getPlaceTips(fsq_id).then((tip) => {
			const newTip = tip?.slice(0, 25);
			setTip(newTip);
		});
	}, []);

	const { icon } = first_obj;
	const [first_image] = image;
	console.log("image", image);
	// console.log("tip", tip);

	// console.log("first_image", first_image);
	return (
		<div className='w-30 max-w-sm rounded overflow-hidden shadow-lg m-4 my-8 hover:shadow-md hover:shadow-slate-600 hover:scale-105 hover:duration-300'>
			<img
				className='w-full '
				src={Image}
				alt='Sunset in the mountains'
			/>
			<div className='font-bold text-xl mb-2 px-6 py-2'>{name}</div>
			<div className='px-6 py-2 '>
				<p className='text-gray-700 text-base flex justify-between flex items-center'>
					<span className='w-4'>
						<IoLocationSharp />
					</span>
					<span>{formatted_address}</span>
				</p>
			</div>
			<div className='px-6 py-2 '>
				<p className='text-gray-700 text-base flex justify-between flex items-center'>
					<IoLocationSharp />
					<span>
						{address}, {locality}
					</span>
				</p>
			</div>
			<div className='px-6 py-2'>
				<p className='text-gray-700 text-base flex justify-between flex items-center'>
					<BiSolidMessageSquareDetail />
					{tip}...
				</p>
			</div>
			<div className='px-6 py-2'>
				<p className='text-gray-700 text-base flex justify-between flex items-center'>
					<AiOutlineFieldTime /> {timezone}
				</p>
			</div>

			<div className='px-6 pt-4 pb-2'>
				{categories.map((category, index) => {
					return (
						<span
							key={index}
							className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
							{category.name}
						</span>
					);
				})}
			</div>
		</div>
	);
};

export default Card;
