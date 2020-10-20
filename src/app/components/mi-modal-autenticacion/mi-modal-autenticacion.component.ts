import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/usuarios/api.service';


import { FormGroup,FormBuilder, Validators } from '@angular/forms'; 

import { EstadoUsuarioService } from 'src/app/services/usuarios/estado-usuario.service';


@Component({
  selector: 'app-mi-modal-autenticacion',
  templateUrl: './mi-modal-autenticacion.component.html',
  styleUrls: ['./mi-modal-autenticacion.component.css']
})

export class MiModalAutenticacionComponent implements OnInit {
  @Input() estaVisible: boolean;
  mostrarModal:boolean;
  @Output() mensajeEvento = new EventEmitter<boolean>();
  loginFormulario:FormGroup;
  mostrarMensajeError:boolean=false; 
  usuarioEstaLogueado:boolean=false;
  estadoUsuarioService:EstadoUsuarioService;
  
  
  constructor(private _apiUsuario:ApiService,private _builder:FormBuilder) {
      this.loginFormulario=this._builder.group({
        password:['',Validators.required],  
        email:['',Validators.compose([Validators.required,Validators.email])]
      });
   }


   salir(){
     // seteo el sesion storage en null, seteo la variable para informar que no esta logueado para no mostrar el form de logueo
    sessionStorage.setItem('usuarioLogeado',null);
    sessionStorage.setItem('tokenLogeado', null);
    this.usuarioEstaLogueado=false;
    this.ocultarAutenticacion();//oculto la ventana
   }

  ocultarAutenticacion(){     
    this.mostrarModal=false; 
    this.mensajeEvento.emit(this.mostrarModal);    
  }
  login(){         
    const email=this.loginFormulario.value.email;
    const password=this.loginFormulario.value.password;
    //AL SUBSCRIBIRME LO QUE ESTOY HACIENDO ES DECIRLE QUE CUANDO TERMINE DE EJECUTAR LA FUNCION LOGIN DEL SERVICIO
    // _apiUsuario, EJECUTE LO  QUE LE PASO POR PARAMETROS, EN ESTE CASO GUADRAR LA SESSION ETC, DE ESTE MODO "ESPERO" LA RESPUESTA Y NO DA ERROR
    // AL QUERER USAR EL TOKEN, ANTES DE HABERLO CONSEGUIDO, SERIA COMO UN CALLBACK EN JAVASCRIPT
    return this._apiUsuario.login(email,password).subscribe(
      (respuesta) => {
        //alert("correcto logn");
        console.log("CORRECTO"+JSON.stringify(respuesta.user));        
        sessionStorage.setItem('usuarioLogeado', JSON.stringify(respuesta.user));
        sessionStorage.setItem('tokenLogeado', JSON.stringify(respuesta.token));
        this.estadoUsuarioService = new EstadoUsuarioService();
        this.ocultarAutenticacion();
        this.usuarioEstaLogueado=true;
        },
    (error) => {
      //alert("error en login");
      console.log("error"+JSON.stringify(error));
      sessionStorage.setItem('usuarioLogeado', null);
      sessionStorage.setItem('tokenLogeado', null);
      this.mostrarMensajeError=true;
      this.usuarioEstaLogueado=false;           
        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );
  }


  ngOnInit() {
  }

    

}
