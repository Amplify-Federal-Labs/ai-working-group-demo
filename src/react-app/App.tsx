import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductListingPage } from "@/components/ProductListingPage";
import { ProductDetailPageWrapper } from "@/components/ProductDetailPage";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="flex min-h-svh flex-col">
			<Header />
			<main className="flex-1 px-6 py-8">
				<Routes>
					<Route path="/" element={<ProductListingPage />} />
					<Route path="/product/:id" element={<ProductDetailPageWrapper />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
