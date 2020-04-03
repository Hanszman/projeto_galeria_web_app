// import padrão automático:
import { Component, OnInit } from '@angular/core';
// imports manuais:
import { FormGroup, FormControl } from '@angular/forms'; // Biblioteca de forms do Angular para controle e agrupamento de forms no html.
import { FormBuilder } from '@angular/forms'; // Biblioteca de forms do Angular para manipular os dados do form no componente.
import { GaleriaService } from '../../../servicos/galeria/galeria.service'; // importando a classe GaleriaService do serviço de galeria.
import { ConfigClass } from '../../../classes/config-class'; // Importando classe aonde tem o método que retorna a url da api.

// Definições de estruturas, estilos e seletores do componente:
@Component({
  selector: 'app-manter-galeria',
  templateUrl: './manter-galeria.component.html',
  styleUrls: ['./manter-galeria.component.css']
})
export class ManterGaleriaComponent implements OnInit { // Classe de componente da galeria. 

  exibirListagemForm: boolean = false; // Variável (tipo boolean) de controle para exibição do formulário ou lista de registros (fazer diferenciação entre add e o get no html da galeria).
  listImgGaleria: any; // Vairável (do tipo any) para receber a lista de registros recebidos na consulta da api.
  mensagem: any; // Variável (do tipo any) que vai receber a mensagem de alerta caso a api não retorne dados ou ocorra algum erro.
  imagemUrl: any // Variável (do tipo any) que vai receber a base64 das imagens. Servirá para exibir a prévia da imagem.
  galeriaFormGroup: any // Variável (do tipo any) que vai receber os valores do form.
  registro: any = {}; // Variável (do tipo any) que já instancia um objeto. Vai receber todos os valores dos campos do formulário.
  server: String = ConfigClass.getUrlApi().toString(); // Variável (do tipo string) que instancia a classe ConfigClass e acessa seu método getUrlApi e transforma em string. Serve para pegar o diretório/caminho da api.

  constructor(private galeriaService: GaleriaService, private formBuilder: FormBuilder) { } // Uso do objeto galeriaService que é do tipo GaleriaService, injetando GaleriaService dentro do construtor. Uso do objeto formBuilder que é do tipo FormBuilder, injetando FormBuilder dentro do construtor. 

  ngOnInit(): void { // Evento/método que ocorre após o componente ser inicializado.
    this.galeriaFormGroup = this.formBuilder.group({ // O método group do FormBuilder recebe um objeto com os campos do formulário. É inicializado ao chamar a página.
      id_galeria: [],
      titulo: [],
      dados_imagem: null
    });
    this.listar(); // Chama o método listar() ao inicializar a página.
  }

  prepararFormCadastro(){
    this.limparMsgAlert();
    this.exibirListagemForm = true; // Para de exibir o formulário e volta para a tela de lista.
  }

  cancelarOperacao(){
    this.limparForm();
    this.exibirListagemForm = false;
  }

  deletar(id: number): void{
    console.log('deletar id: ', id);
    this.galeriaService.deletar(id).subscribe(resp => { // O objeto galeriaService do tipo GaleriaService consegue acessar o método deletar definido na classe GaleriaService, que por sua vez, através do objeto http definido em seu construtor, consegue acessar o método get do serviço HttpClient.
      // O subscribe serve para se inscrever no observable definido na classe GaleriaService, dessa forma, ele receberá a resposta vinda do observable. Para o subscribe é passado como parâmetro uma função anônima em formato de arrow function. Essa função vai retornar uma resposta que vem do observable e salvar na variável resp.
      if (!this.verificarRetornoHttp(resp)) { // Verifica se não ocorreu nenhum erro.
        this.listar();
      }
    });
  }

  onSubmit(){
    console.log('Salvando dados...');
    console.log(this.galeriaFormGroup.value);
    console.log(this.galeriaFormGroup);

    // Verificar a operção:
    if (this.registro.id_galeria) { // Se houver id.
      this.editar(this.galeriaFormGroup.value); // Chamando editar com os dados de valor da imagem da galeriaFormGroup.
    }
    else {
      this.cadastrar(this.galeriaFormGroup.value); // Chamando cadastrar com os dados de valor da imagem da galeriaFormGroup.
    }

  }

  editar(dados: any){
    this.galeriaService.editar(dados).subscribe(resp => { // O objeto galeriaService do tipo GaleriaService consegue acessar o método editar definido na classe GaleriaService, que por sua vez, através do objeto http definido em seu construtor, consegue acessar o método get do serviço HttpClient.
      // O subscribe serve para se inscrever no observable definido na classe GaleriaService, dessa forma, ele receberá a resposta vinda do observable. Para o subscribe é passado como parâmetro uma função anônima em formato de arrow function. Essa função vai retornar uma resposta que vem do observable e salvar na variável resp.
      if (!this.verificarRetornoHttp(resp)) { // Verifica se não ocorreu nenhum erro.
        this.limparForm(); // Limpa o formulário.
        this.listar(); // Volta para a tela de lista.
        this.exibirListagemForm = false; // Para de exibir o formulário e volta para a tela de lista.
      }
    });
  }

  cadastrar(dados: any){
    this.galeriaService.cadastrar(dados).subscribe(resp => { // O objeto galeriaService do tipo GaleriaService consegue acessar o método cadastrar definido na classe GaleriaService, que por sua vez, através do objeto http definido em seu construtor, consegue acessar o método get do serviço HttpClient.
      // O subscribe serve para se inscrever no observable definido na classe GaleriaService, dessa forma, ele receberá a resposta vinda do observable. Para o subscribe é passado como parâmetro uma função anônima em formato de arrow function. Essa função vai retornar uma resposta que vem do observable e salvar na variável resp.
      if (!this.verificarRetornoHttp(resp)) { // Verifica se não ocorreu nenhum erro.
        this.limparForm(); // Limpa o formulário.
        this.listar(); // Volta para a tela de lista.
        this.exibirListagemForm = false; // Para de exibir o formulário e volta para a tela de lista.
      }
    });
  }

  prepararFormEditar(id: number): void{
    console.log('id: ', id);
    this.exibirListagemForm = true; // Para de exibir o formulário e volta para a tela de lista.
    this.galeriaService.getId(id).subscribe(resp => { // O objeto galeriaService do tipo GaleriaService consegue acessar o método getId definido na classe GaleriaService, que por sua vez, através do objeto http definido em seu construtor, consegue acessar o método get do serviço HttpClient.
      // O subscribe serve para se inscrever no observable definido na classe GaleriaService, dessa forma, ele receberá a resposta vinda do observable. Para o subscribe é passado como parâmetro uma função anônima em formato de arrow function. Essa função vai retornar uma resposta que vem do observable e salvar na variável resp.
        if (!this.verificarRetornoHttp(resp)) { // Verifica se não ocorreu nenhum erro.
          // Será realizado o data binding. Data binding é associar uma variável ou objeto específico aos campos ou partes específicas de um formulário. Salva na variável registro os valores do banco daquela galeria.
          this.registro.id_galeria = resp.body.dados[0].id_galeria;
          this.registro.titulo = resp.body.dados[0].titulo;
          if (resp.body.dados[0].caminho != null) {
            this.imagemUrl = this.server + resp.body.dados[0].caminho.substring(1); // Salva na variável imagemUrl o caminho do servidor concatenado com o caminho do arquivo, tirando o '.' com o substring.
            console.log('img: ', this.server + resp.body.dados[0].caminho.substring(1));
          }
        }
    });
  }

  limparForm(){
    this.galeriaFormGroup.reset(); // Reseta os campos do form, menos os do tipo file (porque ele não tem um form control).
    let formHTML = <HTMLFormElement>document.getElementById('galeriaForm'); // Recupera o id do formulário. O HTMLFormElement informa pro Angular qual o tipo elemento será retornado pelo getElementById.
    formHTML.reset(); // Reseta o formHTML.
    this.imagemUrl = null; // Atribui null à variável imagemURL.
  }

  carregarImagem(event){
    console.log('Carregando a imagem...');
    // Verificar se a imagem foi selecionada.
    if (event.target.files.length > 0) { // se o tamanho do arquivo selecionado no evento é maior que zero, ou seja, se foi selecionada pelo menos uma imagem.
      let campoUploadImagem = event.target; // Variável para salvar os dados da imagem/arquivo.
      const leitor = new FileReader(); // Declara objeto que lê o arquivo.
      const arquivo = campoUploadImagem.files[0]; // Salva na variável arquivo o primeiro elemento do array de arquivos.
      leitor.readAsDataURL(arquivo); // Leitor lê a imagem pela base64 a partir do arquivo.
      leitor.onload = () => { // Após ler a imagem em base64, é executada uma arrow function.
        const dataUrl = leitor.result; // Variável para conter as informações e o base64 da imagem. A propriedade result vai obter o resultado a partir da leitura.
        this.imagemUrl = dataUrl; // A variável assume o valor da dataUrl.
        console.log("Dados img: ", this.imagemUrl);
        this.galeriaFormGroup.get('dados_imagem').setValue({ // Completa o campo dados_imagem da variável que contém os campos de form do registro da galeria. O campo dados_imagem é preenchido com as informações e base64 carregadas da imagem.
          // Propriedades para o objeto:
          nome_arquivo: arquivo.name,
          tipo_arquivo: arquivo.types,
          imagem_base64: leitor.result.toString().split(',')[1] // Pega o resultado da leitura da imagem e separa por virgulas para gerar um array e acessa o índice 1.
        }); 
        console.log('Dados cad: ', this.galeriaFormGroup.value);
      }
    }
  }

  verificarRetornoHttp(resp){ // Recebe como parâmetro a resposta da api.
    if(resp.status >= 400){
      this.exibirMsgAlert("Erro ao realizar a requisição!", "erro");
      return true;
    }
    else{
      if (resp.body.erro) {
        this.exibirMsgAlert(resp.body.msg, "erro");
        return true;
      }
      else {
        if (resp.body.msg != null) {
          this.exibirMsgAlert(resp.body.msg, "sucesso");
          return false;
        }
      }
    }
  }

  exibirMsgAlert(msg, tipo){
    let dados = "";

    if (tipo == "sucesso") {
      dados = `<div class='alert alert-success' role='alert'>
        <strong>${msg}</strong>
      </div>`;
    }
    else if (tipo == "erro") {
      dados = `<div class='alert alert-danger' role='alert'>
        <strong>${msg}</strong>
      </div>`;
    }
    this.mensagem = dados;
  }

  limparMsgAlert(){
    this.mensagem = "";
  }

  listar(): void {
    this.galeriaService.getTodos().subscribe(resp => { // O objeto galeriaService do tipo GaleriaService consegue acessar o método getTodos definido na classe GaleriaService, que por sua vez, através do objeto http definido em seu construtor, consegue acessar o método get do serviço HttpClient.
      // O subscribe serve para se inscrever no observable definido na classe GaleriaService, dessa forma, ele receberá a resposta vinda do observable. Para o subscribe é passado como parâmetro uma função anônima em formato de arrow function. Essa função vai retornar uma resposta que vem do observable e salvar na variável resp.
      
      if (!this.verificarRetornoHttp(resp)) { // Verifica e exibe se ocorreu algum erro.
        this.listImgGaleria = resp.body.dados.map(function(objeto){ // Variável recebe os registros que vieram da resposta da api e os mapeia como array. O map, comando para mapear o array, recebe uma função anônima, que recebe como parâmetro o próprio objeto (cada item do array).
          return { 
            id_galeria: objeto.id_galeria,
            titulo: objeto.titulo,
            caminho: this + (objeto.caminho ? objeto.caminho.substring(1) : objeto.caminho) // Esse this faz referência ao this.server. Se existir o caminho, será tirado o '.' do diretório com o substring.
           }
        }, this.server); // O this.server é passado por aqui como callback porque ele não existe no escopo dentro da função.
        console.log('resposta: ', resp);
        console.log('listImgGaleria: ', this.listImgGaleria);
      }       
    }); 
  }

}
