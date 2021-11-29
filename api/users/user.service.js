const pool = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(username, password)
                values(?, ?)`,
            [
                data.username,
                data.password
            ],
            (error, results, fields) =>{
               if (error){
                  return callBack(error);
               }
               return callBack(null, results)
            }

        );
    },
    getUsers: callBack => {
        pool.query(
            `select id, username from registration`,
            [],
            (error, results, fields) => {
                if (error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id, username from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserName: (username, callBack) => {
        pool.query(
            `select * from registration where username = ?`,
            [username],
            (error, results, fields) => {
                if (error){
                callBack(error);
            }
            return callBack(null, results[0]);
        }
      );
    }
};