import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Sneaker } from "../../shared/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

function formatPrice(cents: number): string {
	return `$${(cents / 100).toFixed(2)}`;
}

export function SneakerDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [sneaker, setSneaker] = useState<Sneaker | null>(null);
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		async function fetchSneaker() {
			setLoading(true);
			const res = await fetch(`/api/sneakers/${id}`);
			if (!res.ok) {
				setNotFound(true);
				setLoading(false);
				return;
			}
			const data: Sneaker = await res.json();
			setSneaker(data);
			setLoading(false);
		}
		fetchSneaker();
	}, [id]);

	if (loading) {
		return (
			<div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
				<Skeleton className="aspect-4/3 w-full rounded-xl" />
				<div className="grid gap-4">
					<Skeleton className="h-8 w-3/4" />
					<Skeleton className="h-5 w-1/2" />
					<Skeleton className="h-10 w-1/3" />
					<Skeleton className="h-24 w-full" />
				</div>
			</div>
		);
	}

	if (notFound || !sneaker) {
		return (
			<div className="grid gap-4 py-12 text-center">
				<p className="text-lg text-muted-foreground">
					Sneaker not found.
				</p>
				<div>
					<Button asChild variant="outline">
						<Link to="/">Back to browse</Link>
					</Button>
				</div>
			</div>
		);
	}

	const discount = sneaker.originalPrice - sneaker.price;
	const discountPct = Math.round((discount / sneaker.originalPrice) * 100);

	return (
		<div className="mx-auto max-w-4xl">
			<Button asChild variant="ghost" size="sm" className="mb-6">
				<Link to="/">
					<ArrowLeft className="mr-2 size-4" />
					Back to browse
				</Link>
			</Button>

			<div className="grid gap-8 md:grid-cols-2">
				<div className="aspect-4/3 overflow-hidden rounded-xl bg-muted">
					<img
						src={sneaker.imageUrl}
						alt={`${sneaker.brand} ${sneaker.model} ${sneaker.colorway}`}
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="grid content-start gap-4">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Badge variant="secondary">
								{sneaker.brand}
							</Badge>
							<Badge variant="outline">
								{sneaker.condition}
							</Badge>
						</div>
						<h1 className="text-2xl font-bold tracking-tight">
							{sneaker.model}
						</h1>
						<p className="text-lg text-muted-foreground">
							{sneaker.colorway}
						</p>
					</div>

					<div className="flex items-baseline gap-3">
						<span className="text-3xl font-bold">
							{formatPrice(sneaker.price)}
						</span>
						{discount > 0 && (
							<>
								<span className="text-lg text-muted-foreground line-through">
									{formatPrice(sneaker.originalPrice)}
								</span>
								<Badge variant="destructive">
									{discountPct}% off
								</Badge>
							</>
						)}
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<p className="text-muted-foreground">Size</p>
							<p className="font-medium">US {sneaker.size}</p>
						</div>
						<div>
							<p className="text-muted-foreground">Condition</p>
							<p className="font-medium">{sneaker.condition}</p>
						</div>
						<div>
							<p className="text-muted-foreground">
								Release Year
							</p>
							<p className="font-medium">{sneaker.releaseYear}</p>
						</div>
						<div>
							<p className="text-muted-foreground">Brand</p>
							<p className="font-medium">{sneaker.brand}</p>
						</div>
					</div>

					<Separator />

					<div>
						<h2 className="mb-2 font-semibold">Description</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{sneaker.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
