import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { EstadoUsuarioService } from '../usuarios/estado-usuario.service';
import { Recurso } from 'src/app/models/recurso-interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  estadoUsuarioService:EstadoUsuarioService;
  api_url:String=environment.apiEndPoint;  
  //api_url:String="https://lucianoferrari.com.ar/api_programateca"; 

  constructor(private _http:HttpClient) { 
  }


  getRecursosPorIdRecurso(IdRecurso):Observable<any>{   
    this.estadoUsuarioService = new EstadoUsuarioService();
    var token=this.estadoUsuarioService.Token;   
    return this._http.get<any>(`${this.api_url}/api/v1/UnRecurso/${IdRecurso}`, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
  });
      
}

getUltimosRecursos():Observable<any>{  //para menu       
  this.estadoUsuarioService = new EstadoUsuarioService();
  var token=this.estadoUsuarioService.Token;
  return this._http.get<Recurso[]>(`${this.api_url}/api/v1/Recursos/ultimosrecursos`);      
}


}
