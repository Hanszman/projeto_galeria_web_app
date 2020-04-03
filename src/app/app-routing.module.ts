// imports padrão automático:
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// imports manuais dos componentes criados: 
import { HomeCarouselComponent } from './componentes/home/home-carousel/home-carousel.component'; // importando HomeCarouselComponent.
import { ManterGaleriaComponent } from './componentes/galeria/manter-galeria/manter-galeria.component'; // importando ManterGaleriaComponent.

// Definição das rotas que chamam cada componente:
const routes: Routes = [
  { path: 'home/home-carousel', component: HomeCarouselComponent},
  { path: 'galeria/manter-galeria', component: ManterGaleriaComponent},
  { path: 'galeria/manter-galeria/:id', component: ManterGaleriaComponent},
  { path: '', component: HomeCarouselComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
