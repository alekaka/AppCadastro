import SQLiteManager from '../SQLiteManager';

export default class CadastrosRepository {
    addCadastros(cadastros) {
        return new Promise((resolve, reject) => {
            SQLiteManager.addCadastros(cadastros)
                .then((sqlite) => {
                    resolve(sqlite);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    showCadastros() {
        return new Promise((resolve, reject) => {
            SQLiteManager.showCadastros()
                .then((sqlite) => {
                    resolve(sqlite);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}