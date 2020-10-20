import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoUsuarioService } from 'src/app/services/usuarios/estado-usuario.service';
import { ApiService } from 'src/app/services/usuarios/api.service';
import { MisValidacionesForm } from 'src/app/utiles/mis-validaciones-form'
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {

  loginFormulario:FormGroup;

  registroFormulario:FormGroup;

  mostrarMensajeError:boolean=false; 
  usuarioEstaLogueado:boolean=false;
  estadoUsuarioService:EstadoUsuarioService;

  mensajeAlIngresarORegistrar:String;
  
  
  constructor(private _apiUsuario:ApiService,private _builder:FormBuilder,private router:Router) {
      this.loginFormulario=this._builder.group({
        password:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]]
      });

      this.registroFormulario=this._builder.group({
        nombreRegistro:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]+$/),  Validators.minLength(5), Validators.maxLength(20)])],
        apellidoRegistro:['',[Validators.required, Validators.pattern(/^[a-zA-Z ]+$/), Validators.minLength(5), Validators.maxLength(20)]],
         passwordRegistro:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10),MisValidacionesForm.noTieneMayusculaConParametro(2)]],          
        emailRegistro:['',[Validators.required,Validators.email]]
      });
      // emailRegistro:['',[Validators.required,Validators.email],[MisValidacionesForm.chequearEmail(_apiUsuario)]]
      //SI QUIERO VER LOS ERRORES EN EL HTML POGO: {{ registroFormulario.get("passwordRegistro").errors | json }}



    /*  this.loginFormulario.valueChanges
      .pipe(
        debounceTime(3500)
      )
      .subscribe(value => {
        console.log(value);
      });
*/
   }


   salir(){
     // seteo el sesion storage en null, seteo la variable para informar que no esta logueado para no mostrar el form de logueo
    sessionStorage.setItem('usuarioLogeado',null);
    sessionStorage.setItem('tokenLogeado', null);
    this.usuarioEstaLogueado=false;
  //  this.ocultarAutenticacion();//oculto la ventana
   }



  // ocultarAutenticacion(){     
   // this.mostrarModal=false; 
    //this.mensajeEvento.emit(this.mostrarModal);    
 // }
  login(){     
    
    if (this.loginFormulario.valid) {

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
       // this.ocultarAutenticacion();
        this.usuarioEstaLogueado=true;

        this.mensajeAlIngresarORegistrar="Bienvenido";
        $("#modal1").modal();

        setTimeout (() => {
          $("#modal1").modal('hide');
          this.router.navigate(['/']);     
       }, 3000);               
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
          else {
            this.loginFormulario.markAllAsTouched();

          }

  }




  //----------------------------------------------------------------------------------//

  registro(){   
    
    if (this.registroFormulario.valid) {

    const nombreRegistro=this.registroFormulario.value.nombreRegistro;
    const apellidoRegistro=this.registroFormulario.value.apellidoRegistro;     
    const emailRegistro=this.registroFormulario.value.emailRegistro;
    const passwordRegistro=this.registroFormulario.value.passwordRegistro;
  // alert(apellidoRegistro);
    return this._apiUsuario.registro(emailRegistro,passwordRegistro,nombreRegistro,apellidoRegistro).subscribe(
      (respuesta) => {
        //alert("correcto logn");
        


        this.mensajeAlIngresarORegistrar="Bienvenido";
        $("#modal1").modal();


        setTimeout (() => {
          $("#modal1").modal('hide');
          this.router.navigate(['/']);     
       }, 3000);               
        },
    (error) => {   
      this.mensajeAlIngresarORegistrar="Error al registrar.";   
      console.log("error"+JSON.stringify(error));      
      this.mostrarMensajeError=true;
      this.usuarioEstaLogueado=false;           
        },
        () => {
          console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
            }             
    );

          } else {
            this.registroFormulario.markAllAsTouched();
          }

  }



  cerrarMensaje(){
    $("#modal1").modal('hide');
    this.router.navigate(['/']);     
  
  
  }

  ngOnInit(): void {
  }

}
