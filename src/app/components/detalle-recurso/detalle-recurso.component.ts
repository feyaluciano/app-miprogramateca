import { Component, OnInit } from '@angular/core';
import { RecursoService } from 'src/app/services/recursos/recurso.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalle-recurso',
  templateUrl: './detalle-recurso.component.html',
  styleUrls: ['./detalle-recurso.component.css']
})

export class DetalleRecursoComponent implements OnInit {
  recursos: String[];
  NombreRecursoTitulo: String;
  CuerpoRecurso: String;
  obtenerUnRecursos(idRecurso){             
    return this. _recursoservice.getRecursosPorIdRecurso(idRecurso).subscribe(
      (respuesta) => {
       //console.log(JSON.stringify(respuesta));
       this.recursos=JSON.parse(JSON.stringify(respuesta));
       this.recursos=JSON.parse(JSON.stringify(this.recursos[0]));
       this.NombreRecursoTitulo=this.recursos["Titulo"];
       this.CuerpoRecurso=this.recursos["CuerpoRecurso"];       
        },
    (error) => {
     // console.log(JSON.stringify(error));
        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
  }
  constructor(private _recursoservice:RecursoService,private rutaActivaParam: ActivatedRoute) {
    rutaActivaParam.params.subscribe(respuesta=>{   
      //alert(JSON.stringify(respuesta));   
       this.obtenerUnRecursos(respuesta.IdRecurso);      
    },
    (error) => {
     console.log("err cambio param");
        },
        () => {
          console.log("finalizo observador params");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }                 
    );  
  }
  ngOnInit(): void {    
  }

}
