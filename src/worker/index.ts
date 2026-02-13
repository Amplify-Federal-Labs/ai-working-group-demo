import { Hono } from "hono";
import { sneakers } from "./data/sneakers";

const app = new Hono<{ Bindings: Env }>();

app.get("/api/sneakers", (c) => {
	const brand = c.req.query("brand");
	const size = c.req.query("size");
	const condition = c.req.query("condition");
	const minPrice = c.req.query("minPrice");
	const maxPrice = c.req.query("maxPrice");

	let results = sneakers;

	if (brand) {
		results = results.filter((s) => s.brand === brand);
	}
	if (size) {
		results = results.filter((s) => s.size === Number(size));
	}
	if (condition) {
		results = results.filter((s) => s.condition === condition);
	}
	if (minPrice) {
		results = results.filter((s) => s.price >= Number(minPrice));
	}
	if (maxPrice) {
		results = results.filter((s) => s.price <= Number(maxPrice));
	}

	return c.json(results);
});

app.get("/api/sneakers/:id", (c) => {
	const sneaker = sneakers.find((s) => s.id === c.req.param("id"));
	if (!sneaker) {
		return c.json({ error: "Sneaker not found" }, 404);
	}
	return c.json(sneaker);
});

export default app;
