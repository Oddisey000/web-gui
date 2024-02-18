import axios from "axios";

export const StoreUserInfo = (request) => {
  let loggedInUser = {name: '', role: ''};
  const fetchData = async() => {
    try {
      const response = await axios.get(request);
      loggedInUser.name = response.data.recordset[0].Name
      loggedInUser.role = response.data.recordset[0].Role
    } catch (error) {
      console.log(error);
    }
  }
  fetchData()
  return loggedInUser;
}

export const GetUserList = (request) => {
  let dataArr = [];
  axios.get(request).then((response) => {
    response.data.recordset.map((data) => {
      dataArr.push(data);
      return dataArr;
    })
  }).catch((error) => {
    // handle error
    console.log(error);
  })
  return dataArr;
}
