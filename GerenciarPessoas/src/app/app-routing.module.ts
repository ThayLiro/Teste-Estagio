import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./pages/pessoa/pessoa.module').then( m => m.PessoaPageModule)
  },
  {
    path: 'add-pessoa',
    loadChildren: () => import('./pages/add-pessoa/add-pessoa.module').then( m => m.AddPessoaPageModule)
  },
  {
    path: 'add-pessoa/:id',
    loadChildren: () => import('./pages/add-pessoa/add-pessoa.module').then( m => m.AddPessoaPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
