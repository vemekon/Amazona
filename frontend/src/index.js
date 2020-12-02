/* eslint-disable import/extensions */
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";

const routes = {
	"/": HomeScreen,
	"/product/:id": ProductScreen,
	"/cart/:id": CartScreen,
	"/cart": CartScreen,
};

const router = async () => {
	const request = parseRequestUrl();
	const parseUrl =
		(request.resource ? `/${request.resource}` : "/") +
		(request.id ? "/:id" : "") +
		(request.verb ? `/${request.verb}` : "");
	const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

	const main = document.getElementById("main-container");

	try {
		main.innerHTML = await screen.render();
		await screen.after_render();
	} catch (error) {
		console.log(error);
	}
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
