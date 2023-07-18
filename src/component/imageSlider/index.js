import { Carousel } from "@material-tailwind/react";

export default function ImageSlider({ images }) {
	return (
		<Carousel
			className='rounded-xl'
			navigation={({ setActiveIndex, activeIndex, length }) => (
				<div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
					{new Array(length).fill("").map((_, i) => (
						<span
							key={i}
							className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
								activeIndex === i
									? "bg-white w-8"
									: "bg-white/50 w-4"
							}`}
							onClick={() => setActiveIndex(i)}
						/>
					))}
				</div>
			)}>
			{images?.map(
				({ id, prefix, suffix, width, height, created_at }) => {
					return (
						<img
							key={id}
							src={`${prefix}${width}x${height}${suffix}`}
							alt={created_at}
							className='h-full w-full object-cover aspect-video'
						/>
					);
				}
			)}
		</Carousel>
	);
}