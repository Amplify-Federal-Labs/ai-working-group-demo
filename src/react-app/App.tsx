import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function App() {
	return (
		<div className="flex min-h-svh flex-col">
			<Header />
			<main className="flex-1 px-6 py-8">
				{/* Content goes here */}
			</main>
			<Footer />
		</div>
	);
}

export default App;
