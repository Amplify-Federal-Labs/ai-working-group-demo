import { Link } from "react-router-dom";
import type { Sneaker } from "../../shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatPrice(cents: number): string {
	return `$${(cents / 100).toFixed(2)}`;
}

const conditionVariant: Record<
	Sneaker["condition"],
	"default" | "secondary" | "outline"
> = {
	New: "default",
	"Like New": "secondary",
	Good: "outline",
	Fair: "outline",
};

export function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
	return (
		<Link to={`/sneakers/${sneaker.id}`} className="group">
			<Card className="overflow-hidden transition-shadow group-hover:shadow-md">
				<div className="aspect-4/3 bg-muted flex items-center justify-center overflow-hidden">
					<img
						src={sneaker.imageUrl}
						alt={`${sneaker.brand} ${sneaker.model} ${sneaker.colorway}`}
						className="h-full w-full object-cover transition-transform group-hover:scale-105"
					/>
				</div>
				<CardContent className="grid gap-2">
					<div className="flex items-center gap-2">
						<Badge variant="secondary">{sneaker.brand}</Badge>
						<Badge variant={conditionVariant[sneaker.condition]}>
							{sneaker.condition}
						</Badge>
					</div>
					<div>
						<p className="font-semibold leading-tight">
							{sneaker.model}
						</p>
						<p className="text-sm text-muted-foreground">
							{sneaker.colorway}
						</p>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-baseline gap-2">
							<span className="text-lg font-bold">
								{formatPrice(sneaker.price)}
							</span>
							{sneaker.price < sneaker.originalPrice && (
								<span className="text-sm text-muted-foreground line-through">
									{formatPrice(sneaker.originalPrice)}
								</span>
							)}
						</div>
						<span className="text-sm text-muted-foreground">
							Size {sneaker.size}
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
