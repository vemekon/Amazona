/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl , rerender } from "../utils";

const addToCart = (item, forceUpdate = false) => {
	let cartItems = getCartItems();
	// console.log(cartItems);
	const existItem = cartItems.find((x) => x.product === item.product);

	if (existItem) {
		if(forceUpdate){
			cartItems = cartItems.map((x) =>
			x.product === existItem.product ? item : x
		);
		}
		
	} else {
		cartItems = [...cartItems, item];
	}
	setCartItems(cartItems);
	if(forceUpdate){
		// eslint-disable-next-line no-use-before-define
		rerender(CartScreen)
	}
	
};

const removeFromCart = (id)=>{
	setCartItems(getCartItems().filter(x=>x.product !== id))
	if(id===parseRequestUrl().id){
		document.location.hash = '/cart'
	} else {
		rerender(CartScreen)
	}
}

const CartScreen = {
	after_render: () => {
	   const qtySelects = document.getElementsByClassName('qty-select');
	   [...qtySelects].forEach((qtselect)=>{
		   qtselect.addEventListener('change', (e)=>{
			   const item = getCartItems().find((x)=>x.product===qtselect.id);
			   addToCart({...item, qty: Number(e.target.value)}, true)
		   })

	   })

	   const deleteButtons = document.getElementsByClassName('delete-button');
	   [...deleteButtons].forEach((deleteBtn)=>{
             deleteBtn.addEventListener('click' , (e)=>{
			 removeFromCart(deleteBtn.id)
		 })
	   })
	   document.getElementById('checkout-button').addEventListener('click',()=>{
		   document.location.hash = '/signin'
	   })

	},
	render: async () => {
		const request = parseRequestUrl();
		if (request.id) {
			const product = await getProduct(request.id);

			addToCart({
				product: product._id,
				name: product.name,
				image: product.image,
				price: product.price,
				countInStock: product.countInStoke,
				qty: 1,
			});
		}
		const cartItems = getCartItems();
		return `<div class="cart content">
                <div class="cart-list">
                  <ul class="cart-list-container">
                  <li>
                  <h3>Shopping Cart</h3>
                  <div>Price</div>
                  </li>
                     ${
												cartItems.length === 0
													? '<div>Cart is Empty <a href="/#/">Go to Shopping</a></div>'
													: cartItems
															.map(
																(item) =>
																	`<li>
                         <div class="cart-image">
                            <img src="${item.image}" alt="${item.name}"/>
                         </div>
                         <div class="cart-name">
                           <div>
                           <a href="/#/product/${item.product}">${item.name}</a>
                           </div> 
                           <div>
                             Qty: <select name="" id="${
																item.product
															}" class="qty-select">
				     ${[...Array(item.countInStock).keys()].map(
								(x) =>
									`<option key="${x}" value="${x}">
									${x}
								</option>`
							)}
                             </select>
                             <button type="button" class="delete-button" id="${
																item.product
															}">Delete</button>
                           
                           
                           </div> 

                         
                         </div>
                        
                        <div class="cart-price">$${item.price}</div>
                        </li>
                        `
															)
															.join("\n")
											}


                  </ul>
                </div>
                <div class="cart-action">
                  <h3>Subtotal ( ${cartItems.reduce(
										(a, c) => a + c.qty,
										0
									)}  items)
                  :
                  $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  
                  </h3>

                  <button class = 'primary fw' id="checkout-button">Proceed to checkout</button>
                </div>
            </div>;`;
	},
};

export default CartScreen;
