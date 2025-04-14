import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import userStore from "../stores/userStore";
import { fetchUsers } from "../services/apiService";

const Users = observer(() => {
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        userStore.setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="flex justify-between">
      <div>
        <label htmlFor="user-select" className="block mb-2">
          Select User:
        </label>
        <select
          id="user-select"
          className="border p-2 bg-white text-gray-700 rounded"
          value={userStore.selectedUser || ""}
          onChange={(e) => userStore.setSelectedUser(e.target.value)}
        >
          <option value="" disabled>
            Select a user
          </option>
          {userStore.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-lg font-semibold mt-2">
        Balance: $
        {userStore.users.find((user) => user.id === userStore.selectedUser)
          ?.balance || "0.00"}
      </div>
    </div>
  );
});

export default Users;
