import {store} from '../root.store';
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

export const InsertNewUser = (request) => {
  let dataArr = [];
  const API_url = store.getState().appReducer.API_url;
  const requestString = request.split('\\')[1];
  const reqParams = {
    Name: requestString.split('/')[0],
    Password: requestString.split('/')[1],
    NFCcode: requestString.split('/')[2],
    Description: requestString.split('/')[3],
    Role: parseInt(requestString.split('/')[4]),
    CreatedBy: requestString.split('/')[5]
  };

  const InsertData = () => {
    axios.get(`${API_url}insertUser?data=${reqParams.Name + '/' + reqParams.Password + '/' + reqParams.Description + '/' + reqParams.Role + '/' + reqParams.CreatedBy + '/' + reqParams.NFCcode}`);
    setTimeout(() => {
      axios.get(`${API_url}getuserlist`).then((response) => {
        response.data.recordset.map((data) => {
          dataArr.push(data);
          return dataArr;
        })
      })
    }, 1000);
  }
  InsertData()
  return dataArr;
}

export const DeleteUser = (id) => {
  const API_url = store.getState().appReducer.API_url;
  axios.get(`${API_url}deleteuser?id=${id}`).then((response) => {
    // response was ok
  }).catch((error) => {
    console.log(error)
  })
};

export const UpdateUserData = (request) => {
  const API_url = store.getState().appReducer.API_url;
  const requestString = request.split('\\')[1];
  const reqParams = {
    id: requestString.split('/')[0],
    Name: requestString.split('/')[1],
    Password: requestString.split('/')[2],
    NFCcode: requestString.split('/')[3],
    Description: requestString.split('/')[4],
    Role: requestString.split('/')[5],
    isActive: requestString.split('/')[6],
    ModifiedBy: requestString.split('/')[7]
  };

  const GetData = () => {
    axios.get(`${API_url}getusergrouperole?role=${reqParams.Role}`).then((response) => {
      response.data.recordset.map((data) => {
        reqParams.Role = data.Role
        axios.get(`${API_url}updateUserData?data=${reqParams.id + '/' + reqParams.Name + '/' + reqParams.Password + '/' + reqParams.NFCcode + '/' + reqParams.Description + '/' + reqParams.Role + '/' + reqParams.isActive + '/' + reqParams.ModifiedBy}`).then((response) => {})
        return reqParams
      })
    }).catch((error) => {
      // handle error
      console.log(error);
    })
  }

  GetData();
}
