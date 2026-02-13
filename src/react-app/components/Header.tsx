import { Link } from "react-router-dom";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

export function Header() {
	return (
		<header className="flex items-center justify-between border-b px-6 py-4">
			<Link to="/" className="text-xl font-bold tracking-tight">
				Sneaker Depot
			</Link>
			<Avatar>
				<AvatarImage src="" alt="User avatar" />
				<AvatarFallback>U</AvatarFallback>
			</Avatar>
		</header>
	);
}
