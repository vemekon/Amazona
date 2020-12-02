/* eslint-disable no-empty */
/* eslint-disable import/prefer-default-export */
import Axios from "axios";
import { apiUrl } from "./config";

export const getProduct = async (id) => {
	try {
		const response = await Axios({
			url: `${apiUrl}/api/products/${id}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.statusText !== "OK") {
			throw new Error(response.data.message);
		}

		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message || error.message };
	}
};
