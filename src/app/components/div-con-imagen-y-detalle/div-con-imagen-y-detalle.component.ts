import { Component, OnInit, Input } from '@angular/core';
import { Recurso } from 'src/app/models/recurso-interface';
import {UrlsMejoradasPipe} from 'src/app/pipes/urls-mejoradas.pipe';
import {ResumenParrafoPipe} from 'src/app/pipes/resumen-parrafo.pipe';


@Component({
  selector: 'app-div-con-imagen-y-detalle',
  templateUrl: './div-con-imagen-y-detalle.component.html',
  styleUrls: ['./div-con-imagen-y-detalle.component.css']
})
export class DivConImagenYDetalleComponent implements OnInit {

 // @Input() recurso: any;
  @Input() tituloRecurso: String;
  @Input() idRecurso: String;
  @Input() cuerpoRecurso: String;  
  @Input() imagen: String;
  @Input() tiporecurso: String;  
  
  constructor() { 

    
     





   // console.log(this.trecurso);
    //this.trecurso=this.recurso.Titulo;


  }

  ngOnInit() {
  }

}
