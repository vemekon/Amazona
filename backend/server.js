/* eslint-disable no-tabs */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable indent */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import data from "./data";

const app = express();

app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5002;

app.get("/api/products", (req, res) => {
	console.log("lol");
	res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
	const product = data.products.filter((x) => x._id === req.params.id);
	if (product.length >= 1) {
		res.send(product[0]);
	} else {
		res.status(404).send({ message: "Product not found" });
	}
});

app.listen(PORT, () => {
	console.log(`App is listening on port number ${PORT}`);
});
