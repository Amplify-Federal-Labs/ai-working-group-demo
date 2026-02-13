import { useEffect, useState, useCallback } from "react";
import type { Sneaker } from "../../shared/types";
import { SneakerCard } from "@/components/SneakerCard";
import {
	SneakerFilters,
	type SneakerFilterValues,
} from "@/components/SneakerFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const EMPTY_FILTERS: SneakerFilterValues = {
	brand: "",
	size: "",
	condition: "",
	minPrice: "",
	maxPrice: "",
};

export function BrowsePage() {
	const [sneakers, setSneakers] = useState<Sneaker[]>([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState<SneakerFilterValues>(EMPTY_FILTERS);

	const fetchSneakers = useCallback(async (f: SneakerFilterValues) => {
		setLoading(true);
		const params = new URLSearchParams();
		if (f.brand) params.set("brand", f.brand);
		if (f.size) params.set("size", f.size);
		if (f.condition) params.set("condition", f.condition);
		if (f.minPrice) {
			params.set("minPrice", String(Number(f.minPrice) * 100));
		}
		if (f.maxPrice) {
			params.set("maxPrice", String(Number(f.maxPrice) * 100));
		}

		const url = `/api/sneakers${params.toString() ? `?${params}` : ""}`;
		const res = await fetch(url);
		const data: Sneaker[] = await res.json();
		setSneakers(data);
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchSneakers(filters);
	}, [filters, fetchSneakers]);

	function handleFilterChange(newFilters: SneakerFilterValues) {
		setFilters(newFilters);
	}

	return (
		<div className="grid gap-6">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">
					Browse Sneakers
				</h1>
				<p className="text-muted-foreground">
					Collectible, high-end sneakers at concession prices
				</p>
			</div>

			<SneakerFilters
				filters={filters}
				onChange={handleFilterChange}
			/>

			<Separator />

			{loading ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="grid gap-3">
							<Skeleton className="aspect-4/3 w-full rounded-xl" />
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-4 w-1/3" />
						</div>
					))}
				</div>
			) : sneakers.length === 0 ? (
				<div className="py-12 text-center text-muted-foreground">
					No sneakers match your filters. Try adjusting your search.
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{sneakers.map((sneaker) => (
						<SneakerCard key={sneaker.id} sneaker={sneaker} />
					))}
				</div>
			)}
		</div>
	);
}
