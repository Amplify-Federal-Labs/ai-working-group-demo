import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrowsePage } from "@/pages/BrowsePage";
import { SneakerDetailPage } from "@/pages/SneakerDetailPage";

function App() {
	return (
		<div className="flex min-h-svh flex-col">
			<Header />
			<main className="flex-1 px-6 py-8">
				<Routes>
					<Route path="/" element={<BrowsePage />} />
					<Route
						path="/sneakers/:id"
						element={<SneakerDetailPage />}
					/>
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
