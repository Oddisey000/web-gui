const INITIAL_STATE = {
  API_url: "http://10.112.130.27:3200/",
  //API_url: "http://localhost:3200/",
  /*ordersToSelect: [],
  testingEquipmentToSelect: [],
  tableRecordset: [],*/
  loggedInUser: {
    Name: ''
  },
  configurationData: {
    serverName: '',
    sspi: false,
    login: '',
    password: '',
    sqlFileName: '',
    sqlFileContent: ''
  }
};

export default INITIAL_STATE;