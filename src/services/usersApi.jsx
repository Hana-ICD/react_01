import axios from "axios"

// const BASE_URL = 'https://jsonplaceholder.typicode.com';
const BASE_URL = 'http://192.168.1.19:7000/api/user/01';

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}`);  
  if(!response.ok) {
    throw new Error("Api error")
  }
  return response.json();
}

export const addUser = async (dataForm) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataForm)
  });  
  return response.json();
}

export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response.json();
}

export const updateUser = async (id, dataForm) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataForm)
  })
  return response.json();
}



// use axios
const apiA = axios.create({
  baseURL: BASE_URL
});

export const getUsersAxios = async () => {
  try {
    const response = await apiA.get("");
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }
}

export const getUsersPaging = async ({
  page, limit
}) => {
  try {
    const start = (page - 1) * limit; // 0, 10  // 10, 20  //20 30
    const end = start + limit;
    const response = await apiA.get("");
    return {
      users: response.data,
      paging: response.data.slice(start, end),
      total: response.data.length,
      page,
    }
    // return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }
}

export const getUsersLoading = async ({
  pageParam, limit
}) => {
  try {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    const start = (pageParam - 1) * limit; // 0, 10  // 10, 20  //20 30
    const end = start + limit;
    const response = await apiA.get("");

    return {
      all: response.data,
      users: response.data.slice(start, end),
      total: response.data.length,
      page: pageParam,
      limit
    }
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }
}

const mutipleUsers = Array.from(
  { length: 45 },
  (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
  })
);
export const getUsersMutipleLoading = async ({
  pageParam, limit
}) => {
  try {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    )
    const start = (pageParam - 1) * limit;
    const end = start + limit;

    return {
      users: mutipleUsers.slice(start, end),
      total: mutipleUsers.length,
      page: pageParam,
      limit
    }
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error)
  }
}

export const addUserA = async (dataForm) => {  
  try {
    const resonse = await apiA.post("/add", dataForm)
    return resonse.data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }  
}

export const deleteUserA = async (id) => {
  try {
    const resonse = await apiA.delete(`/delete/${id}`)
    return resonse.data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }
}

export const updateUserA = async (id, payload) => {
  try {
    const resonse = await apiA.put(`/${id}`, payload)
    return resonse.data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }  
}

export const getDetailA = async (id) => {
  try {
    const resonse = await apiA.get(`/${id}`)
    return resonse.data;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error(error);
  }  
}