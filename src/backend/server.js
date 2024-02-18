const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
const path = require("path");

const app = express();
const port = process.env.PORT || 3200;

const config = {
  /*user: process.env.DB_USER || 'statistic_user',
  password: process.env.DB_PASSWORD || 'stat_usr_007',
  server: process.env.DB_SERVER || "SVUA5PJ05.LEONI.LOCAL",
  database: process.env.DB_DATABASE || 'BR206'*/

  user: process.env.DB_USER || 'pevi5001',
  password: process.env.DB_PASSWORD || '123',
  //server: process.env.DB_SERVER || '10.112.130.27',
  server: process.env.DB_SERVER || 'DESKTOP-B0FAKTM\\SQLEXPRESS',
  database: process.env.DB_DATABASE || 'LSMG3'
}

app.use(cors());
app.use(express.static(path.join(__dirname, '../../build')));

app.get('/authentication', (req, res) => {
  const reqParams = {
    userName: req.query.login,
    userPassword: req.query.password
  };
  const query = `SELECT Name, Role FROM Employee WHERE Name = '${reqParams.userName}' AND Password = CAST('${reqParams.userPassword}' as varbinary)`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/getuserlist', (req, res) => {
  const query = 
  `SELECT t1.ID as id, t1.Name AS login, t2.Description AS Role, t1.IsActive, t1.NFCcode, t1.DateCreated, t1.CreatedBy, t1.DateModified, t1.ModifiedBy, t1.Description
    FROM Employee AS t1
      JOIN EmployeeRoleDefinition AS t2 ON t1.Role = t2.Role`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

/*app.get('/order', (req, res) => {
  const reqParams = {
    orderID: req.query.order,
    equipmentID: req.query.equipment
  };

  const productQuery = `SELECT DISTINCT system_id FROM workflow_statistic WHERE drawing_number LIKE %${orderID}%`;
  const request = new sql.Request();
  request.query(productQuery, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/requestdata', (req, res) => {
  const reqParams = {
    orderID: req.query.order,
    equipmentID: req.query.equipment,
    startDate: req.query.startdate,
    endDate: req.query.enddate,
  };

  let query = "";

  if (reqParams.orderID) {
    if (reqParams.orderID && reqParams.equipmentID.length > 2) {
      query = `SELECT * FROM workflow_statistic WHERE drawing_number LIKE '${reqParams.orderID}%' AND system_id = '${reqParams.equipmentID}'`;
    } else {
      query = `SELECT * FROM workflow_statistic WHERE drawing_number LIKE '${reqParams.orderID}%'`;
    }
  }

  if (reqParams.startDate && reqParams.endDate) {
    if (reqParams.equipmentID.length > 2) {
      query = `SELECT * FROM workflow_statistic WHERE time >= '${reqParams.startDate}' AND time < '${reqParams.endDate} 23:59:59.999' AND system_id = '${reqParams.equipmentID}'`;
    } else {
      query = `SELECT * FROM workflow_statistic WHERE time >= '${reqParams.startDate}' AND time < '${reqParams.endDate} 23:59:59.999'`;
    }
  }

  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/getequipment', (req, res) => {
  let query = '';
  const reqParams = {
    orderID: req.query.order,
    startDate: req.query.startdate,
    endDate: req.query.enddate,
  };

  if (reqParams.orderID) {
    query = `SELECT DISTINCT system_id FROM workflow_statistic WHERE drawing_number LIKE '${reqParams.orderID}%'`;
  } else if (reqParams.startDate && reqParams.endDate) {
    query = `SELECT DISTINCT system_id FROM workflow_statistic WHERE time >= '${reqParams.startDate}' AND time < '${reqParams.endDate} 23:59:59.999'`
  }

  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});*/

sql.connect(config, err => {
  if (err) {
     console.log('Failed to open a SQL Database connection.', err.stack);
     process.exit(1);
  }
  app.listen(port, () => {
     console.log(`App is listening at http://localhost:${port}`);
  });
});
