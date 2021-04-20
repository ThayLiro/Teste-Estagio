import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public appPages = [
    { title: 'Pessoas cadastradas', url: '/pessoa', icon: 'person' },
    { title: 'Cadastrar pessoa', url: '/add-pessoa', icon: 'person-add' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
