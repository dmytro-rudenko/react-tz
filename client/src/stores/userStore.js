import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];
  selectedUser = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    this.users = users;
    if (!this.selectedUser && users.length > 0) {
      this.selectedUser = users[0].id;
    }
  }

  setSelectedUser(userId) {
    this.selectedUser = userId;
  }

  updateUserBalance(userId, newBalance) {
    this.users = this.users.map((user) =>
      user.id === userId ? { ...user, balance: newBalance } : user
    );
  }
}

const userStore = new UserStore();
export default userStore;