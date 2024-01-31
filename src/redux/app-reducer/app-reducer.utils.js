import axios from "axios";

export const GetOrdersInfo = (request) => {
  let dataArr = [];
  axios.get(request.appReducer.API_url).then((response) => {
    response.data.recordset.map((data) => {
      dataArr.push(Object.values(data)[0]);
      return dataArr;
    })
  }).catch((error) => {
    // handle error
    console.log(error);
  })
  return dataArr;
}

export const GetEquipmentInfo = (request) => {
  let dataArr = [];
  axios.get(request).then((response) => {
    response.data.recordset.map((data) => {
      dataArr.push(Object.values(data)[0]);
      return dataArr;
    })
  }).catch((error) => {
    // handle error
    console.log(error);
  })
  return dataArr;
}

export const ResetEquipmentInfo = () => {
  let dataArr = [];
  return dataArr;
}

export const GetDataFromDB = (request) => {
  let dataArr = [];
  let extractRecordset = [];

  const SendData = (request) => axios.get(request).then((response) => {
    const objKeys = Object.keys(response.data.recordset[0])
    dataArr.push(objKeys.slice(1))

    response.data.recordset.map((data) => {
      return extractRecordset.push(data)
    })

    let result = [];

    for (var i = 0; i < response.data.recordset.length; i++) {
      result = Object.values(extractRecordset[i])
      dataArr.push(result.slice(1))
    }
    
  }).catch((error) => {
    console.log(error);
  })

  SendData(request)
  return dataArr
}