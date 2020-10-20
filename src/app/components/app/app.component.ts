import { Component } from '@angular/core';

//ESTE ES EL COMPONENTE POR DEFECTO
@Component({
  selector: 'app-root',//VER QUE ESTA ETIQUETA ESTA EN EL INDEX.HTML <body>  <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Programateca';
}
