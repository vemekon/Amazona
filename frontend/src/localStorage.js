// eslint-disable-next-line import/prefer-default-export
export const getCartItems = () => {
	const cartItems = localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [];
	console.log(cartItems);
	return cartItems;
};

export const setCartItems = (cartItems) => {
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
