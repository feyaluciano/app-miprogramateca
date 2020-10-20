import { Component, OnInit } from '@angular/core';

import { RecursoService } from 'src/app/services/recursos/recurso.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoUsuarioService } from 'src/app/services/usuarios/estado-usuario.service';
import { Recurso } from 'src/app/models/recurso-interface';

import Typed from 'typed.js';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  ultimosrecursos: any[];
  estadoUsuarioService:EstadoUsuarioService;
 api_url:String="http://localhost:8081/api_programateca/public";  
 //api_url:String="https://lucianoferrari.com.ar/api_programateca";  
 data: Object;


 obtenerUltimosRecursos(){         
    
  return this. _recursosService.getUltimosRecursos().subscribe(
    (respuesta) => {


      this.ultimosrecursos= respuesta.data;
      },
  (error) => {
   // console.log(JSON.stringify(error));
      },
      () => {
        console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
          }             
  );
}

//Console.log(\"una selección de recursos que me ayudan mucho en el desarrollo web y móvil, los uso, los comparto y no los pierdo\");
  
 constructor(private _http:HttpClient,private _recursosService:RecursoService) {  
   this.obtenerUltimosRecursos();    
  };  
  ngOnInit() {
    var typed = new Typed('.typed', {
      strings: ["let miprogramateca=[];<br>if (encuentroalgoútil){<br>  <span style='padding-left:30px'> miprogramateca.push(recurso);</span><br>}"
      // , "Angular"
      // , "JavaScript"
      // , "C#"
      // , "Templates"
      // , "Ionic"
      // , "Bootstrap"
      // , "Angularjs"
      // , "Iconos para web"
      // , "Herramientas de desarrollo"
      // , "..."
      

    ],      
      stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
      typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
      startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
      backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
      smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
      shuffle: false, // Alterar el orden en el que escribe las palabras.
      backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
      loop: true, // Repetir el array de strings
      loopCount: 0, // Cantidad de veces a repetir el array.  false = infinite
      showCursor: true, // Mostrar cursor palpitanto
      cursorChar: '|', // Caracter para el cursor
      contentType: 'html', // 'html' o 'null' para texto sin formato
    });    
  }

}
