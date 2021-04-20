import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pessoas cadastradas', url: '/pessoa', icon: 'person' },
    { title: 'Cadastrar pessoa', url: '/add-pessoa', icon: 'person-add' },
    { title: 'Inicio', url: '/inicio', icon: 'home' },
  ];
  constructor() {}
}
