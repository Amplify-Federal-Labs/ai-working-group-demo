import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SneakerCondition } from "../../shared/types";

const BRANDS = ["Jordan", "Nike", "Yeezy", "New Balance", "adidas"];
const SIZES = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];
const CONDITIONS: SneakerCondition[] = ["New", "Like New", "Good", "Fair"];

export interface SneakerFilterValues {
	brand: string;
	size: string;
	condition: string;
	minPrice: string;
	maxPrice: string;
}

interface SneakerFiltersProps {
	filters: SneakerFilterValues;
	onChange: (filters: SneakerFilterValues) => void;
}

export function SneakerFilters({ filters, onChange }: SneakerFiltersProps) {
	function update(key: keyof SneakerFilterValues, value: string) {
		onChange({ ...filters, [key]: value });
	}

	function clearAll() {
		onChange({
			brand: "",
			size: "",
			condition: "",
			minPrice: "",
			maxPrice: "",
		});
	}

	const hasActiveFilters = Object.values(filters).some((v) => v !== "");

	return (
		<div className="flex flex-wrap items-end gap-3">
			<div className="grid gap-1.5">
				<label className="text-sm font-medium">Brand</label>
				<Select
					value={filters.brand}
					onValueChange={(v) => update("brand", v)}
				>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="All brands" />
					</SelectTrigger>
					<SelectContent>
						{BRANDS.map((b) => (
							<SelectItem key={b} value={b}>
								{b}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-1.5">
				<label className="text-sm font-medium">Size</label>
				<Select
					value={filters.size}
					onValueChange={(v) => update("size", v)}
				>
					<SelectTrigger className="w-[100px]">
						<SelectValue placeholder="All" />
					</SelectTrigger>
					<SelectContent>
						{SIZES.map((s) => (
							<SelectItem key={s} value={String(s)}>
								{s}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-1.5">
				<label className="text-sm font-medium">Condition</label>
				<Select
					value={filters.condition}
					onValueChange={(v) => update("condition", v)}
				>
					<SelectTrigger className="w-[130px]">
						<SelectValue placeholder="All" />
					</SelectTrigger>
					<SelectContent>
						{CONDITIONS.map((c) => (
							<SelectItem key={c} value={c}>
								{c}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-1.5">
				<label className="text-sm font-medium">Min price</label>
				<Input
					type="number"
					placeholder="$0"
					className="w-[100px]"
					value={filters.minPrice}
					onChange={(e) => update("minPrice", e.target.value)}
				/>
			</div>

			<div className="grid gap-1.5">
				<label className="text-sm font-medium">Max price</label>
				<Input
					type="number"
					placeholder="Any"
					className="w-[100px]"
					value={filters.maxPrice}
					onChange={(e) => update("maxPrice", e.target.value)}
				/>
			</div>

			{hasActiveFilters && (
				<Button variant="ghost" size="sm" onClick={clearAll}>
					Clear filters
				</Button>
			)}
		</div>
	);
}
