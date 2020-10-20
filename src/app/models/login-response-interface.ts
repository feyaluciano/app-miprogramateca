import { Usuario } from './usuario-interface';

export interface LoginResponse {
        success:Boolean;
        user:Usuario;
        token:String;
        error:String;
       
  }