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

app.get('/deleteuser', (req, res) => {
  const query = `DELETE FROM Employee WHERE id = '${req.query.id}'`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/insertUser', (req, res) => {
  const reqParams = {
    Name: req.query.data.split('/')[0],
    Password: req.query.data.split('/')[1],
    NFCcode: req.query.data.split('/')[5],
    Description: req.query.data.split('/')[2],
    Role: req.query.data.split('/')[3],
    CreatedBy: req.query.data.split('/')[4]
  };
  let query = `SELECT Name FROM Employee WHERE Name = '${reqParams.Name}'`;
  let request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     if (result.recordset[0]) {
      // such user already exists in database
     } else {
      query = 
      `INSERT INTO Employee (Name, Password, Description, Role, IsActive, CreatedBy, NFCcode, DateModified)
          VALUES ('${reqParams.Name}', CAST('${reqParams.Password}' AS varbinary), '${reqParams.Description}', '${reqParams.Role}', '1', '${reqParams.CreatedBy}', '${reqParams.NFCcode}', NULL)`;
      request = new sql.Request();
      request.query(query, (err, result) => {
        if (err) res.status(500).send(err);
        res.send(result);
      });
     }
  });
});

app.get('/getusergrouperole', (req, res) => {
  const query = 
  `SELECT Role 
	  FROM EmployeeRoleDefinition 
		  WHERE Description = '${req.query.role}'`;
  const request = new sql.Request();
  request.query(query, (err, result) => {
     if (err) res.status(500).send(err);
     res.send(result);
  });
});

app.get('/updateUserData', (req, res) => {
  let query;
  const reqParams = {
    id: req.query.data.split('/')[0],
    Name: req.query.data.split('/')[1],
    Password: req.query.data.split('/')[2],
    NFCcode: req.query.data.split('/')[3],
    Description: req.query.data.split('/')[4],
    Role: req.query.data.split('/')[5],
    isActive: req.query.data.split('/')[6],
    ModifiedBy: req.query.data.split('/')[7]
  };
  if (reqParams.Password) {
    query = 
    `UPDATE Employee
      SET Name = '${reqParams.Name}', Password = CAST('${reqParams.Password}' AS varbinary), Description = '${reqParams.Description}', Role = '${reqParams.Role}', IsActive = '${reqParams.isActive}', NFCcode = '${reqParams.NFCcode}', DateModified = GETDATE(), ModifiedBy = '${reqParams.ModifiedBy}'
        WHERE ID = '${reqParams.id}'`;
  } else {
    query = 
    `UPDATE Employee
      SET Name = '${reqParams.Name}', Description = '${reqParams.Description}', Role = '${reqParams.Role}', IsActive = '${reqParams.isActive}', NFCcode = '${reqParams.NFCcode}', DateModified = GETDATE(), ModifiedBy = '${reqParams.ModifiedBy}'
        WHERE ID = '${reqParams.id}'`;
  }
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
