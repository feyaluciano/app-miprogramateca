import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { EstadoUsuarioService } from 'src/app/services/usuarios/estado-usuario.service';
import { environment } from 'src/environments/environment';




 @Injectable({
  providedIn: 'root'
 })
export class TiposRecursosService {
  estadoUsuarioService:EstadoUsuarioService;

  // INSERT INTO `recursos`(
//IdRecurso, Titulo,IdUsuario,IdTipoRecurso,Activo,created_at,CuerpoRecurso,Oculto,Recomendado,TituloUrl,updated_at
//) SELECT idRecurso,CONVERT(CAST(CONVERT(titulo USING latin1) AS BINARY) USING utf8),1,IdTipoRecurso,Activo,fechaCreacion,CONVERT(CAST(CONVERT(cuerpoRecurso USING latin1) AS BINARY) USING utf8),oculto,recomendado,tituloUrl,fechaCreacion  from  recursos_original
api_url:String=environment.apiEndPoint; 
  
  constructor(private _http:HttpClient) { 


   
    

   };  
  getAll():Observable<any>{  //para menu  
    
      //sessionStorage.setItem('usuarioLogeado', JSON.stringify(respuesta.user));
      //sessionStorage.setItem('tokenLogeado', JSON.stringify(respuesta.token));
      this.estadoUsuarioService = new EstadoUsuarioService();
      var token=this.estadoUsuarioService.Token;
      return this._http.get<any>(`${this.api_url}/api/v1/TipoRecurso/tiposrecursos`);      
  }

  getRecursosPorIdTipoRecurso(IdTipoRecurso):Observable<any>{   //AYUDA:CF: ESTE METODO DEVUELVE UN OBSERVABLE CON OBJETOS ANY, QUE ES AL QUE 
    //ME SUBSCRIBO EN tipo-recurso.component.ts, AL SUBSCRIBIRME A ESTE METODO EN ESE .TS CADA VEZ QUE SE LLAMA A  getRecursosPorIdTipoRecurso
    // LA VARIABLE titulosrecursos EN tipo-recurso.component.ts CAMBIA, Y CAMBIA DONDE SE ESTE MOSTRANDO
    
    //sessionStorage.setItem('usuarioLogeado', JSON.stringify(respuesta.user));
    //sessionStorage.setItem('tokenLogeado', JSON.stringify(respuesta.token));
    this.estadoUsuarioService = new EstadoUsuarioService();
    var token=this.estadoUsuarioService.Token;   
    return this._http.get<any>(`${this.api_url}/api/v1/Recurso/${IdTipoRecurso}`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
  });      
}






enviarRecurso(IdTipoRecurso,titulo,cuerpo):Observable<any>{          
  this.estadoUsuarioService = new EstadoUsuarioService();
  var token=this.estadoUsuarioService.Token;   
const mheaders = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' }
const body = { 
  Titulo: titulo,
  TituloUrl:titulo.replace( /[^-A-Za-z0-9]+/g, '-' ).toLowerCase(),//esto no ANDA BIEN
  CuerpoRecurso : cuerpo,
	Recomendado : '0',
	IdUsuario : this.estadoUsuarioService.IdUsuario,
	IdTipoRecurso :IdTipoRecurso,
  Activo : '1',
  Oculto : '0',  
  //token : this.estadoUsuarioService.Token, 
}
   return this._http.post<any>(`${this.api_url}/api/v1/Recurso/store`, body,{headers : mheaders
});      
}


}
