import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TiposRecursosService } from 'src/app/services/tiposrecursos/tipos-recursos.service';
import { FormGroup,FormBuilder, Validators,FormControl } from '@angular/forms'; 

import { EstadoUsuarioService } from 'src/app/services/usuarios/estado-usuario.service';

//asasas algo para q cambie


import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css']
})
export class CompartirComponent implements OnInit {
  public Editor = ClassicEditor; 
  tiposrecursos: String[];
  respuestaCompartir: String[];
  compartirFormulario:FormGroup;
  detalleBotonCompartir:String="Compatirx";
  public selectedValueE =  {};

  public mensajeAlCompartir:String;


  element: HTMLElement;
  
  

  public MiSpinner:NgxSpinnerService ;

  constructor(private _apiTiposRecursos:TiposRecursosService,private _builder:FormBuilder, private _spinner: NgxSpinnerService,private router:Router) { 
    this.MiSpinner=this._spinner;
    this.cargarSelect();

    // this.compartirFormulario=this._builder.group({ 
    //   titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    //   detalle_recurso:['',Validators.required],  
    //   categoria:['',Validators.compose([Validators.required])]
    // });
  
    this.compartirFormulario= this._builder.group({     
      titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      detalle_recurso: ['', Validators.required],
      categoria: ['', [Validators.required]]
    
    });
  

    // this.compartirFormulario.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });

  }
  


 
    

  cargarSelect(){             
    return this._apiTiposRecursos.getAll().subscribe(
      (respuesta) => {      
        this.tiposrecursos=JSON.parse(JSON.stringify(respuesta));                                   
        },
    (error) => {
      alert(error);
      console.log("errrr"+JSON.stringify(error));      
        } ,
        () => {         
            }

    );
  }



  public getError(controlName: string): string {
    let error = '';
    
    const control = this.compartirFormulario.get(controlName);
    if (control.touched && control.errors != null) {
     // alert();
      error = JSON.stringify(control.errors);
    }
    return error;
  }


compartir(event:Event){ 
  
  
  event.preventDefault();//PARA QUE NO HAGA SUBMIT
//console.log(this.compartirFormulario.value);
if (sessionStorage.getItem('usuarioLogeado') == null ) {
  
  $("#toastUser").toast({
    autohide: false
});
  $("#toastUser").toast('show');
  
  setTimeout (() => {
    $("#toastUser").toast('hide');
 }, 6000);
  return false;
}


if (this.compartirFormulario.valid) { //SI EL FORMULARIO ES VALIDO
  this._spinner.show();
  return this._apiTiposRecursos.enviarRecurso(this.compartirFormulario.get('categoria').value,this.compartirFormulario.get('titulo').value,this.compartirFormulario.get('detalle_recurso').value).subscribe(
   
    (respuesta) => {           
      this.respuestaCompartir=JSON.parse(JSON.stringify(respuesta));
      //alert(respuesta.success) ;
      if (respuesta.success) {
        this.mensajeAlCompartir="Gracias por compartir";

      } else {
        this.mensajeAlCompartir="Ocurrió un error";
      }
      $("#modal1").modal();
     // console.log(this.respuestaCompartir);
     
      //console.log(this.MiSpinner);
      },
  (error) => {
    //console.log(error);    
    //console.log("errrr"+JSON.stringify(error));
    this.mensajeAlCompartir="Ocurrió un error";  
   // alert("ocurrió un error"); 
    this._spinner.hide();      

    $("#modal1").modal();

      } ,   
      () => {        
       this._spinner.hide();                 
          }        
  );
        }



}


cerrarMensaje(){
  $("#modal1").modal('hide');
  this.router.navigate(['/']);     


}

  ngOnInit() {
   // $("#modal1").modal();

    //$("#toastUser").toast({
      //delay: 4000
  //});
    //$("#toastUser").toast('show');
   
    //this.element = document.getElementById('toastUser') as HTMLElement;
    //this.element.click();

    //$('.toast').toast('show');

    //alert();
  }

}
