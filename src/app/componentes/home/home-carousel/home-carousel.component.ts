// import padrão automático:
import { Component, OnInit } from '@angular/core';

// imports manuais:
import { GaleriaService } from '../../../servicos/galeria/galeria.service'; // importando a classe GaleriaService do serviço de galeria.
import { ConfigClass } from '../../../classes/config-class'; // Importando classe aonde tem o método que retorna a url da api.

// Definições de estruturas, estilos e seletores do componente:
@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit { // Classe de componente do home. 

  listImgGaleria: any;
  server: String = ConfigClass.getUrlApi().toString(); // Variável (do tipo string) que instancia a classe ConfigClass e acessa seu método getUrlApi e transforma em string. Serve para pegar o diretório/caminho da api.

  constructor(private galeriaService: GaleriaService) { } // Uso do objeto galeriaService que é do tipo GaleriaService, injetando GaleriaService dentro do construtor. 

  ngOnInit(): void { // Evento/método que ocorre após o componente ser inicializado.
    this.galeriaService.getTodos().subscribe(resp => { // O objeto galeriaService do tipo GaleriaService consegue acessar o método getTodos definido na classe GaleriaService, que por sua vez, através do objeto http definido em seu construtor, consegue acessar o método get do serviço HttpClient.
      // O subscribe serve para se inscrever no observable definido na classe GaleriaService, dessa forma, ele receberá a resposta vinda do observable. Para o subscribe é passado como parâmetro uma função anônima em formato de arrow function. Essa função vai retornar uma resposta que vem do observable e salvar na variável resp.
      this.listImgGaleria = resp.body.dados.map(function(objeto){ // Variável recebe os registros que vieram da resposta da api e os mapeia como array. O map, comando para mapear o array, recebe uma função anônima, que recebe como parâmetro o próprio objeto (cada item do array).
        return { 
          id_galeria: objeto.id_galeria,
          titulo: objeto.titulo,
          caminho: this + (objeto.caminho ? objeto.caminho.substring(1) : objeto.caminho) // Esse this faz referência ao this.server. Se existir o caminho, será tirado o '.' do diretório com o substring.
         }
      }, this.server); // O this.server é passado por aqui como callback porque ele não existe no escopo dentro da função.
    });

    console.log('dados: ', this.listImgGaleria);

  }

}
