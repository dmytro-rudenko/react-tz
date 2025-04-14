const HOST = "http://localhost:3000";

export const fetchUsers = async () => {
  const response = await fetch(`${HOST}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${HOST}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.map((product) => ({
    ...product,
    price: parseFloat(product.price),
  }));
};

export const fetchOrders = async (userId) => {
  const response = await fetch(`${HOST}/orders/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
};

export const createOrder = async (userId, productId, quantity) => {
  const response = await fetch(`${HOST}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.error);
  }

  return response.json();
};