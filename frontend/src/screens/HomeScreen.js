/* eslint-disable no-underscore-dangle */
import axios from "axios";
import Rating from "../component/Rating";

const HomeScreen = {
	render: async () => {
		const response = await axios({
			url: "http://localhost:5002/api/products",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response || response.statusText !== "OK") {
			console.log("error");
			return `<div>Error Fetching</div>`;
		}
		const products = response.data;
		console.log(products);
		return `
            <ul class="products">
            ${products
							.map(
								(p) => `
                   <li>
                   <div class="product">
                         <a href="/#/product/${p._id}">
                          <img src="${p.image}" alt="p"/>
                    </a>
                    <div class="product-name">
                          <a href="/#/product/${p._id}">
                            ${p.name}
                          </a>
                    </div>
                    <div class="product-rating">
                          ${Rating.render({value:p.rating, text:`${p.numreviews} reviews`})}
                    </div>
                    <div class="product-brand">
                          ${p.brand}
                    </div>
                    <div class="product-price">
                          $${p.price}
                    </div>
                   </div>
                    </li>
		`
							)
							.join("\n")}
            
            </ul>
           
            
            `;
	},
};
export default HomeScreen;
