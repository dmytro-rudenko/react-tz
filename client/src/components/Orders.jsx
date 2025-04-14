import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import orderStore from "../stores/orderStore";
import userStore from "../stores/userStore";
import { fetchOrders } from "../services/apiService";

const Orders = observer(() => {
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(userStore.selectedUser);
        orderStore.setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userStore.selectedUser) {
      loadOrders();
    }
  }, [userStore.selectedUser]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Orders</h2>
      <table className="w-[600px]">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderStore.orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.productId}</td>
              <td className="border px-4 py-2">{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Orders;