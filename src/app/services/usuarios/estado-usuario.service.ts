import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioService {
        IdUsuario:Number;
        Email:String;
    	  Token:String;
		    Nombre:String;
		    Apellido:String;		    
    	  Activo:Boolean;    

  constructor() { 
    var user= JSON.parse(sessionStorage.getItem('usuarioLogeado'));
    var token= sessionStorage.getItem('tokenLogeado');
    if (user!=null) {
      console.log("Entro a setear usuario");
        this.IdUsuario=user.IdUsuario;
        this.Nombre=user.Nombre;
        this.Apellido=user.Apellido;
        this.Token=token;
    }

  }
}
