import { Component, OnInit } from '@angular/core';

import { TiposRecursosService } from 'src/app/services/tiposrecursos/tipos-recursos.service';

import { ActivatedRoute } from '@angular/router';


import { DomSanitizer } from '@angular/platform-browser';

import {UrlsMejoradasPipe} from 'src/app/pipes/urls-mejoradas.pipe';


@Component({
  selector: 'app-tipo-recurso',
  templateUrl: './tipo-recurso.component.html',
  styleUrls: ['./tipo-recurso.component.css']
})

// @Pipe({ name: 'keepHtml', pure: false });
// export class EscapeHtmlPipe implements PipeTransform {
//     constructor(private sanitizer: DomSanitizer) {}

//     transform(content) {
//         return this.sanitizer.sanitize(SecurityContext.HTML, content);
//     }
// }



export class TipoRecursoComponent implements OnInit {
  titulosrecursos: String[];
  rutaActiva: ActivatedRoute;
  NombreTipoRecursoTitulo: String;
   

  constructor(private _tiposRecursosService:TiposRecursosService,private rutaActivaParam: ActivatedRoute,private sanitizer: DomSanitizer) {

     

    //VEO LOS CAMBIOS DEL PARAMETRO DE LA RUTA: SERIA ASI:
    /*
    ME "SUBSCRIBO" A LA "OBSERVAR" EL OBJETO "PARAMS" Y CUANDO PARAMS CAMBIA, LLAMO A OBTENER LOS RECURSOS DE ESTE ID,
    ({"IdTipoRecurso":"2"})   
    // rutaActivaParam.params es el observable y  
    */
    rutaActivaParam.params.subscribe(respuesta=>{        
      this.NombreTipoRecursoTitulo= respuesta.NombreTipo;//OBTENGO EL NOMBRE DEL TIPO RECURSO PARA MOSTAR EN EL TITULO, QUE LUEGO IMPRIMIRE EN EL HTML             
        this.obtenerRecursos(respuesta.IdTipoRecurso);      
    },
    (error) => {
     console.log("err cambio param");
        },
        () => {
          console.log("finalizo observador params");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }                 
    );  
  }

  ngOnInit() {   
  }


//   getSantizeUrl(url : string) { 
//     return this.sanitizer.bypassSecurityTrustUrl(url); 
// }




  obtenerRecursos(idTipoRecurso){         
    
    return this. _tiposRecursosService.getRecursosPorIdTipoRecurso(idTipoRecurso).subscribe(
      (respuesta) => {
       //console.log(JSON.stringify(respuesta));
       this.titulosrecursos=JSON.parse(JSON.stringify(respuesta));
     // alert(JSON.stringify(this.titulosrecursos[0]));
        },
    (error) => {
     // console.log(JSON.stringify(error));
        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
  }


}
