import axios from 'axios';
import { useToast } from 'vue-toastification';
// import { useRoute, useRouter } from 'vue-router';

// const router = useRouter();
// const route = useRoute();
const toast = useToast();

//TODO LATER ? create loading status for requests 


// USERS
export const getUsers = async () =>{
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
      console.log(newUsersArr)
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

