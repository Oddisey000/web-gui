const express = require('express');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
const path = require("path");

const app = express();
const port = process.env.PORT || 3200;

const config = {
  user: process.env.DB_USER || 'pevi5001',
  password: process.env.DB_PASSWORD || '123',
  server: process.env.DB_SERVER || '10.112.130.27',
  //server: process.env.DB_SERVER || 'DESKTOP-B0FAKTM\\SQLEXPRESS',
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
  `SELECT t1.ID AS id, t1.Name AS login, t2.Description AS Role, t1.IsActive, t1.NFCcode, FORMAT(t1.DateCreated, 'dd.MM.yyyy') AS DateCreated, t1.CreatedBy, FORMAT(t1.DateModified, 'dd.MM.yyyy') AS DateModified, t1.ModifiedBy, t1.Description, t1.Role AS AccessLevel
    FROM Employee AS t1
      JOIN EmployeeRoleDefinition AS t2 ON t1.Role = t2.Role`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/updateUserData', (req, res) => {
  const reqParams = {
    id: req.query.id,
    Name: req.query.login,
    Password: req.query.password,
    Description: req.query.Description,
    Role: req.query.role,
    isActive: req.query.isActive,
    NFCcode: req.query.NFCcode,
    ModifiedBy: req.query.ModifiedBy
  };
  const query = 
  `UPDATE Employee
	  SET Name = '${reqParams.Name}', Password = CAST('${reqParams.Password}' AS varbinary), Description = '${reqParams.Description}', Role = '${reqParams.Role}', IsActive = '${reqParams.isActive}', NFCcode = '${reqParams.NFCcode}', DateModified = GETDATE(), ModifiedBy = '${reqParams.ModifiedBy}'
		  WHERE ID = '${reqParams.id}'`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

sql.connect(config, err => {
  if (err) {
     console.log('Failed to open a SQL Database connection.', err.stack);
     process.exit(1);
  }
  app.listen(port, () => {
     console.log(`App is listening at http://localhost:${port}`);
  });
});
