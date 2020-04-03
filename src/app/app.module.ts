// imports padrão automático:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// imports manuais:
import { HttpClientModule } from '@angular/common/http'; // importando da biblioteca http para consumir api.
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // importando bibliotecas de módulos de forms do Angular.
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // importando ng-bootstrap (bootstrap melhorado para o Angular).

// imports padrão automático:
import { AppRoutingModule } from './app-routing.module'; // importando o módulo de rotas.
import { AppComponent } from './app.component'; // importando componente index (root) da aplicação.
// imports manuais dos componentes e serviços criados: 
import { HomeCarouselComponent } from './componentes/home/home-carousel/home-carousel.component'; // importando HomeCarouselComponent.
import { ManterGaleriaComponent } from './componentes/galeria/manter-galeria/manter-galeria.component'; // importando ManterGaleriaComponent.
import { GaleriaService } from './servicos/galeria/galeria.service'; // importando a classe GaleriaService do serviço de galeria.

@NgModule({
  declarations: [ // Componentes que foram desenvolvidos nesta aplicação.
    AppComponent,
    HomeCarouselComponent,
    ManterGaleriaComponent
  ],
  imports: [ // Bibliotecas, módulos e serviços importados do Angular.
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [GaleriaService], // Serviços que foram desenvolvidos nesta aplicação.
  bootstrap: [AppComponent]
})
export class AppModule { }
