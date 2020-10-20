import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,  HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment';

 
@Injectable()
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };
  constructor(private _http:HttpClient) { }


  api_url:String=environment.apiEndPoint;        
  login(email, password):Observable<any>{    
      var observable:Observable<any>=this._http.post<any>(`${this.api_url}/api/v1/auth/login`,{
        email,password     
      });
      return observable;//,{headers: headers}
      //SI LE SACO LOS HEADERS FUNCIONA
  }


  chequearUnEmail(email):Observable<any>{    
    var observable:Observable<any>=this._http.post<any>(`${this.api_url}/api/v1/auth/chequearemail`,{
      email    
    });
    return observable;//,{headers: headers}
  
}


  registro(email, password,nombre,apellido):Observable<any>{              
  const mheaders = {  }
  const body = { 
    email: email,
    password: password,
    nombre : nombre,
    apellido : apellido,    
  }
     return this._http.post<any>(`${this.api_url}/api/v1/auth/registro`, body,{headers : mheaders
  });      
  }



}
