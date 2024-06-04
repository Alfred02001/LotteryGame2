const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '@hostRoot0308',
    port: '3306',
    database: 'lottery_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the pool for use in other modules
module.exports = pool;

module.exports = function repository(table) {
    return {
        create(model) {
            return new Promise((resolve, reject) => {
                pool.query('INSERT INTO ' + table + ' SET ?', model, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.insertId);
                    }
                });
            });
        },
        delete(id) {
            return new Promise((resolve, reject) => {
                pool.query('DELETE FROM ' + table + ' WHERE id = ?', [id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.affectedRows > 0);
                    }
                });
            });
        },
        filter() {
            return new Promise((resolve, reject) => {
                pool.query('SELECT * FROM ' + table, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        },
        update(model) {
            return new Promise((resolve, reject) => {
                pool.query('UPDATE ' + table + ' SET ? WHERE id = ?', [model, model.id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.affectedRows > 0);
                    }
                });
            });
        }
    }
}

/*console.log('Consulta SQL:','INSERT INTO ' + table + 'SET ?', model);
pool.query('INSERT INTO '+ table + 'SET ?', model, (error,results) => {
    if (error) {
        console.error('Error al ejecutar la consulta SQL:', error);
        reject(error);
    }else {
        resolve(results.insertId);
    }
});*/

/*
const localDb = {
    user:[],
    player:[],
    plays:[]
};

module.exports= function repository(table){
    return {
        create(model){
            if(model != undefined && model != null){
                model = {...model, id:localDb[table].length}
                localDb[table].push(model);
                return true;
            }
            return false;
        },
        delete(id){
            if(localDb[table][id] != undefined && localDb[table][id] != null){
                var newArray = localDb[table].reduce((ac, cu)=>{
                    if(cu.id != id){
                        cu.id=ac.length;
                        ac.push(cu);
                    }
                    localDb[table]=newArray??[];
                }, []);
                return true;
            }
            return false;
        },
        filter(){
            return localDb[table];
        },
        update(model){
            if(model != undefined && model != null){
                localDb[table][model.id] = model;
                return true;
            }
            return false;
        }
    }
}
*/
