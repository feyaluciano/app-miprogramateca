import {AbstractControlDirective, AbstractControl} from '@angular/forms' 
import { ApiService } from 'src/app/services/usuarios/api.service';


export class MisValidacionesForm{        
    static noTieneMayuscula(control:AbstractControl){
        var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        const valor=control.value;
        var tiene=false;
         for(var i=0; i<valor.length; i++){
            if (letras_mayusculas.indexOf(valor.charAt(i),0)!=-1){
                tiene=true;
                break;
            }
         }        
         if (!tiene) {
            return {noTieneMayuscula:true}
        }
        return null;
        //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
        
    }

    static noTieneMayusculaConParametro(cantidadMinimaDeMayusculas:number){
       return  (control:AbstractControl) =>{
           var tiene:Boolean;
        var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        const valor=control.value;
         var cantidad:number=0;
         for(var i=0; i<valor.length; i++){
            if (letras_mayusculas.indexOf(valor.charAt(i),0)!=-1){
                cantidad++;               
            }
         }          
         if (cantidad <cantidadMinimaDeMayusculas) {
            return {noTieneMayusculaConParametro:true}
         }                 
        return null;
        //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
        
    }
}


static chequearEmail(_apiService:ApiService) {
    return (control: AbstractControl) => {
      const value = control.value;

      return _apiService.chequearUnEmail(value)
    }
        
}

    //   return _apiService.chequearEmail(value).subscribe(
    //     (respuesta) => {


    //         return respuesta.success==true ? null : {chequearEmail: true};
         
    //       },
    //   (error) => {
    //     //alert("error en login");
       
    //       },
    //       () => {
    //        // console.log("finalizo");//ESTE SE EJECUTA SI O SI, SI DA SUCCES O ERROR            
    //           }             
    //   );



    //  /* return _apService.chequearEmail(value)
    //   .pipe(
    //     //map(response => {
    //       const isEmailAvailable = response.isEmailAvailable;
    //       return isEmailAvailable ? null : {notAvailable: true};
    //    // })
    //   );*/
    // };
  //}



/*static chequearEmail(_apService:ApiService){

    return  (control:AbstractControl) =>{
    const valor:String=control.value;;
     
      
      
         return {noTieneMayusculaConParametro:true}
      }
      
     
     return null;
     //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
     
 }
}*/








    static isYounger(control:AbstractControl){
        const value=control.value;
        if (value < 18) {
            return {isYounger:true}
        }
        return null;
        //IMPORTANTE: SI NO HAY ERROR, RETORNO NULL
        
    }


}