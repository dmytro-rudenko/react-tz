import { makeAutoObservable } from "mobx";

class ProductStore {
  products = [];
  quantities = {};

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products) {
    this.products = products;
  }

  updateQuantity(productId, delta) {
    this.quantities[productId] = Math.max(0, (this.quantities[productId] || 0) + delta);
  }

  resetQuantity(productId) {
    this.quantities[productId] = 0;
  }

  resetAllQuantities() {
    this.quantities = {};
  }
}

const productStore = new ProductStore();
export default productStore;