import CadastrosRepository from '../repository/CadastrosRepository';

export default class CadastrosController {
    constructor() {
        this.repository = new CadastrosRepository();
    }
    addCadastros(cadastros) {
        return this.repository.addCadastros(cadastros);
    }
    showCadastros() {
        return this.repository.showCadastros();
    }
}