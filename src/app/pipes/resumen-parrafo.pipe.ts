import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumenParrafo'
})
export class ResumenParrafoPipe implements PipeTransform {
  retornar:String ;
  palabras:String[];
  transform(value: String, exponent?: number): String {
    
    this.retornar = value.replace(/(<([^>]+)>)/gi, "");
    this.palabras=this.retornar.split(" ", 10);
    this.retornar=this.palabras.join(' ');
    return this.retornar;
  }

}
