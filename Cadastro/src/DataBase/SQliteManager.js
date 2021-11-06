import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

import * as schema from './Schemas';

const database_name = 'cadastros.db';
const database_version = '1.0';
const database_displayname = 'CadastrosDB';
const database_size = 200000;

class SQLiteManager {
    constructor() {
        this.type = 'SingletonDefaultExportInstance';
        this.db = null;
    }

    initDB() {
        let db;
        return new Promise((resolve) => {
            SQLite.echoTest()
                .then(() => {
                    SQLite.openDatabase(
                            database_name,
                            database_version,
                            database_displayname,
                            database_size,
                        )
                        .then((DB) => {
                            this.db = DB;
                            db = DB;
                            db.executeSql('SELECT 1 FROM cadastros LIMIT 1')
                                .then(() => {
                                    //
                                })
                                .catch((error) => {
                                    db.transaction((tx) => {
                                            for (const name in schema.Tables) {
                                                this.createTable(tx, schema.Tables[name], name);
                                            }
                                        })
                                        .then(() => {
                                            //
                                        })
                                        .catch(() => {
                                            //
                                        });
                                });
                            resolve(db);
                        })
                        .catch((error) => {
                            //
                        });
                })
                .catch((error) => {
                    //
                });
        });
    }

    closeDatabase(db) {
        if (db) {
            db.close()
                .then((status) => {
                    //
                })
                .catch((error) => {
                    this.errorCB(error);
                });
        } else {
            //
        }
    }

    addCadastros(cadastros) {
        return new Promise((resolve) => {
            this.db
                .transaction((tx) => {
                    for (let i = 0; i < cadastros.length; i++) {
                        tx.executeSql('INSERT OR REPLACE INTO cadastros VALUES (NULL,?, ?, ?, ?, ?)', [
                            cadastros[i].image,
                            cadastros[i].name,
                            cadastros[i].sobrenome,
                            cadastros[i].dataNascimento,
                            cadastros[i].email,
                        ]).then(([tx, results]) => {
                            //
                            resolve(results);
                        });
                    }
                })
                .then((result) => {
                    //
                })
                .catch(() => {
                    //
                });
        });
    }

    showCadastros() {
        console.log('ok')
        return new Promise((resolve) => {
            this.db
                .transaction((tx) => {
                    tx.executeSql('SELECT * FROM cadastros', [],)
                    .then(([tx, results]) => {
                        const arrData = [];
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            arrData.push(results.rows.item(i))
                        }
                        resolve(arrData);
                    });
                })
                .then((result) => {
                    //
                })
                .catch(() => {
                    //
                });
        });
    }

    createTablesFromSchema() {
        if (this.db) {
            this.db.transaction((tx) => {
                for (const name in schema.Tables) {
                    this.createTable(tx, schema.Tables[name], name);
                }
            });
        }
    }

    dropDatabase() {
        return new Promise((resolve, reject) => {
            SQLite.deleteDatabase(database_name)
                .then(() => {
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size,
                    );
                })
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        }).catch((error) => {
            //
        });
    }

    createTable(tx, table, tableName) {
        let sql = `CREATE TABLE IF NOT EXISTS ${tableName} `;
        const createColumns = [];
        for (const key in table) {
            createColumns.push(
                `${key} ${table[key].type.type} ${
          table[key].primary_key ? 'PRIMARY KEY NOT NULL' : ''
        } default ${table[key].default_value}`,
            );
        }
        sql += `(${createColumns.join(', ')});`;
        tx.executeSql(
            sql,
            [],
            () => {
                //
            },
            () => {
                //
            },
        );
    }
}

export default new SQLiteManager();