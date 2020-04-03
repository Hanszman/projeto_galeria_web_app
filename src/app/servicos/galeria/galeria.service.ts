// import padrão automático:
import { Injectable } from '@angular/core';
// imports manuais:
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'; // importando tecnologia para consumir api.
import { Observable } from 'rxjs'; // importando observable rxjs para gerência de estado.
import { RespostaClass } from '../../classes/resposta-class'; // importando a classe RespostaClass, aonde será feito o tratamento das respostas json.
import { ConfigClass } from '../../classes/config-class'; // importando a classe ConfigClass, aonde tem o método que retorna a url da api.
import { getLocaleExtraDayPeriods } from '@angular/common';

// Constante com as opções do cabeçalho http:
const httpOpcoes = {
  headers: new Headers({
    'Content-type': 'application/json'
  })
}

// Caminho referente à url da api definida na classe ConfigClass:
const caminho = `${ConfigClass.getUrlApi().toString()}/galeria` 

@Injectable({
  providedIn: 'root'
})
export class GaleriaService { // Classe de serviço da galeria.

  constructor(private http: HttpClient) { } // Uso do objeto http que é do tipo HttpClient do Angular. Injetando o HttpClient dentro do construtor.
  
  // Método do tipo observable para retornar todos os registros da galeria:
  getTodos(): Observable<HttpResponse<RespostaClass>> { // Observable é uma tecnologia na qual é possível solicitar uma requisição e que, assim que a resposta for retornada, ele vai devolver a resposta para quem solicitou. O HttpResponse é o tipo de dado que será retornado na resposta e, para que os dados sejam convertidos e tratados, é necessário também a classe RepostaClass.
    return this.http.get<RespostaClass>( // O objeto http que é do tipo HttpClient faz uma requisição do tipo get, que também faz uso do generics com a classe RepostaClass para tratar os dados do json.
      caminho, {observe: 'response'} // Parâmetros do método get: o primeiro parâmetro é a rota em que será feita a requisição e o último parâmetro é um objeto que serve para informar o que será a resposta. Observe é o nome da propriedade.
    );
  } 

  // Método do tipo observable para retornar o registro da galeria com determinado id:
  getId(id: number): Observable<HttpResponse<RespostaClass>> { // Observable é uma tecnologia na qual é possível solicitar uma requisição e que, assim que a resposta for retornada, ele vai devolver a resposta para quem solicitou. O HttpResponse é o tipo de dado que será retornado na resposta e, para que os dados sejam convertidos e tratados, é necessário também a classe RepostaClass.
    return this.http.get<RespostaClass>( // O objeto http que é do tipo HttpClient faz uma requisição do tipo get, que também faz uso do generics com a classe RepostaClass para tratar os dados do json.
      `${caminho}/${id}`, {observe: 'response'} // Parâmetros do método get: o primeiro parâmetro é a rota (concatenada com o id) em que será feita a requisição e o último parâmetro é um objeto que serve para informar o que será a resposta. Observe é o nome da propriedade.
    );
  } 

  // Método do tipo observable para cadastrar registros na galeria:
  cadastrar(dados: any): Observable<HttpResponse<RespostaClass>> { // Observable é uma tecnologia na qual é possível solicitar uma requisição e que, assim que a resposta for retornada, ele vai devolver a resposta para quem solicitou. O HttpResponse é o tipo de dado que será retornado na resposta e, para que os dados sejam convertidos e tratados, é necessário também a classe RepostaClass.
    return this.http.post<RespostaClass>( // O objeto http que é do tipo HttpClient faz uma requisição do tipo post, que também faz uso do generics com a classe RepostaClass para tratar os dados do json.
      caminho, dados, {observe: 'response'} // Parâmetros do método post: o primeiro parâmetro é a rota em que será feita a requisição, o segundo parâmetro são os dados para cadastro e o último parâmetro é um objeto que serve para informar o que será a resposta. Observe é o nome da propriedade.
    );
  } 

  // Método do tipo observable para editar um registro na galeria:
  editar(dados: any): Observable<HttpResponse<RespostaClass>> { // Observable é uma tecnologia na qual é possível solicitar uma requisição e que, assim que a resposta for retornada, ele vai devolver a resposta para quem solicitou. O HttpResponse é o tipo de dado que será retornado na resposta e, para que os dados sejam convertidos e tratados, é necessário também a classe RepostaClass.
    return this.http.put<RespostaClass>( // O objeto http que é do tipo HttpClient faz uma requisição do tipo put, que também faz uso do generics com a classe RepostaClass para tratar os dados do json.
      caminho, dados, {observe: 'response'} // Parâmetros do método put: o primeiro parâmetro é a rota em que será feita a requisição, o segundo parâmetro são os dados para cadastro e o último parâmetro é um objeto que serve para informar o que será a resposta. Observe é o nome da propriedade.
    );
  } 

  // Método do tipo observable para deletar um registro na galeria:
  deletar(id: number): Observable<HttpResponse<RespostaClass>> { // Observable é uma tecnologia na qual é possível solicitar uma requisição e que, assim que a resposta for retornada, ele vai devolver a resposta para quem solicitou. O HttpResponse é o tipo de dado que será retornado na resposta e, para que os dados sejam convertidos e tratados, é necessário também a classe RepostaClass.
    return this.http.delete<RespostaClass>( // O objeto http que é do tipo HttpClient faz uma requisição do tipo delete, que também faz uso do generics com a classe RepostaClass para tratar os dados do json.
      `${caminho}/${id}`, {observe: 'response'} // Parâmetros do método delete: o primeiro parâmetro é a rota (concatenada com o id) em que será feita a requisição e o último parâmetro é um objeto que serve para informar o que será a resposta. Observe é o nome da propriedade.
    );
  } 

}
