import { makeAutoObservable } from "mobx";

class OrderStore {
  orders = [];

  constructor() {
    makeAutoObservable(this);
  }

  setOrders(orders) {
    this.orders = orders;
  }

  addOrder(order) {
    this.orders.push(order);
  }
}

const orderStore = new OrderStore();
export default orderStore;