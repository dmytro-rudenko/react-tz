import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import productStore from "../stores/productStore";
import userStore from "../stores/userStore";
import orderStore from "../stores/orderStore";
import { createOrder, fetchProducts } from "../services/apiService";

const Products = observer(() => {

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        productStore.setProducts(
          data.map((product) => ({
            ...product,
            price: parseFloat(product.price),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  const handleCreateOrder = async (productId) => {
    const quantity = productStore.quantities[productId] || 0;
    if (quantity === 0) {
      alert("Please select a quantity for the product.");
      return;
    }

    try {
      const newOrder = await createOrder(userStore.selectedUser, productId, quantity )
      orderStore.addOrder(newOrder);
      productStore.resetQuantity(productId);

      const product = productStore.products.find((p) => p.id === productId);
      if (product) {
        userStore.updateUserBalance(
          userStore.selectedUser,
          parseFloat((userStore.users.find((u) => u.id === userStore.selectedUser).balance - product.price * quantity).toFixed(2))
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Products</h2>
      <table className="mb-4 w-[600px]">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productStore.products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => productStore.updateQuantity(product.id, -1)}
                >
                  -
                </button>
                <span className="mx-2">{productStore.quantities[product.id] || 0}</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => productStore.updateQuantity(product.id, 1)}
                >
                  +
                </button>
              </td>
              <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-2 py-1"
                  onClick={() => handleCreateOrder(product.id)}
                >
                  Create Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Products;