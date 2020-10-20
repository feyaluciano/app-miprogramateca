import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { MiModalAutenticacionComponent } from '../mi-modal-autenticacion/mi-modal-autenticacion.component';
import { AbstractWebDriver } from 'protractor/built/browser';
//import { ApiService } from 'src/app/services/usuarios/api.service';
import { TiposRecursosService } from 'src/app/services/tiposrecursos/tipos-recursos.service';

@Component({
  selector: 'app-mi-nav-menu',
  templateUrl: './mi-nav-menu.component.html',
  styleUrls: ['./mi-nav-menu.component.css']
})


export class MiNavMenuComponent implements OnInit {  
  mostrarModal:Boolean;
  tiposrecursos: String[]

    crearMenu(){             
    return this._apiTiposRecursos.getAll().subscribe(
      (respuesta) => {
        //console.log("Correcto"+JSON.stringify(respuesta));  
        this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));  
        //console.log(this.tiposrecursos);                    
        },
    (error) => {
      alert(error);
      console.log("errrr"+JSON.stringify(error));      
        }      
    );
  }

  goto(path) {
  	this.router.navigate(["/tiporecurso/"+path]);
  }

  constructor(private _apiTiposRecursos:TiposRecursosService,private router: Router) {
    this.crearMenu();
   }
   
   recibeMensaje($event) {    
    this.mostrarModal = $event
  }

  autenticacion(){     
        this.mostrarModal=true;  
      }    

  ngOnInit() {
  }
  
  

}
