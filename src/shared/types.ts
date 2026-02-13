export type SneakerCondition = "New" | "Like New" | "Good" | "Fair";

export interface Sneaker {
	id: string;
	brand: string;
	model: string;
	colorway: string;
	size: number;
	condition: SneakerCondition;
	price: number;
	originalPrice: number;
	imageUrl: string;
	description: string;
	releaseYear: number;
}
