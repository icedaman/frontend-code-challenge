import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

//TODO LATER ? create loading status for requests 


// USERS
export const createUser = async (newUser) => {
  try {
    await axios.post(`http://localhost:3333/users`, newUser);
    toast.success('User Created Successfully');
  } catch (error) {
    console.error('Error creating user ', error);
  }
}

export const getUsers = async () => {
  let users = [];
  try {
    const response = await axios.get(`http://localhost:3333/users`);
    users = response.data;
  } catch (error) {
    console.error('Error fetching users', error);
  }
  return users;
}

export const deleteUser = async (id, users) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      await axios.delete(`http://localhost:3333/users/${id}`);
      const newUsersArr = users.filter(order => order.id !== id);
      users = newUsersArr;
      toast.success("User Successfully Deleted");
    }
  } catch (error) {
    console.error('Error deleting user', error);
    toast.error("Error Deleting User");
  }

  return users;
}

export const editUser = async (id, editedUser) => {
  try {
    await axios.put(`http://localhost:3333/user/${id}/edit`, editedUser);
    toast.success('User Updated Successfully');
  } catch (error) {
    console.error('Error updating user ', error);
    toast.error('Error Updating User');
  }
}

export const getUserById = async (id) => {
  let user = {};
  try {
    const response = await axios.get(`http://localhost:3333/user/${id}`);
    user = response.data;
  } catch (error) {
    console.error('Error fetching users ', error);
  }

  return user;
}


// ORDERS 

// Orders API is not working properly due to userId (user_id in db) always returning null from the API response
// an order is created in the db with orderDate and product but the API does not allow the userId to be stored, even if it's hard coded
// replacing the passed userId value in the form by null 

//So I'm storing the orders on the Orders Store and in Local Storage to simulate the API's behaviour