import React from "react";
import { observer } from "mobx-react-lite";
import Users from "./components/Users";
import Products from "./components/Products";
import Orders from "./components/Orders";

const App = observer(() => {
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="flex flex-col space-y-4">
        <Users />
        <Products />
        <Orders />
      </div>
    </div>
  );
});

export default App;
