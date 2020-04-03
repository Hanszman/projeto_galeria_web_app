export class RespostaClass { // Classe aonde será feito o tratamento das respostas json.
    erro: boolean;
    msg: string;
    dados: any;

    constructor(erro: boolean, msg: string, dados: any){
        this.erro = erro;
        this.msg = msg;
        this.dados = dados;
    }
}
