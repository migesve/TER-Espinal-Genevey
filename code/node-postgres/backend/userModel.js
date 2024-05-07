const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'dataBasemaieutique',
  password: 'root',
  port: 5432,
});
//get all merchants our database
const getUsers = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM users", (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    } catch (error_1) {
      console.error(error_1);
      throw new Error("Internal server error");
    }
  };
  //create a new merchant record in the databsse
  const createUser = (body) => {
    return new Promise(function (resolve, reject) {
      const { username, cohorte } = body;
      pool.query(
        "INSERT INTO users (username, cohorte, created_at) VALUES ($1, $2, NOW()::date;) RETURNING *",
        [username, cohorte, created_at],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new merchant has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  //delete a merchant
  const deleteUser = (id) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM users WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`User deleted with ID: ${id}`);
        }
      );
    });
  };
  //update a merchant record
  const updateUser = (id, body) => {
    return new Promise(function (resolve, reject) {
      const { username, cohorte } = body;
      pool.query(
        "UPDATE users SET username = $1, cohorte = $2 WHERE id = $3 RETURNING *",
        [username, cohorte, id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`User updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser
  };