import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlsMejoradas'
})
export class UrlsMejoradasPipe implements PipeTransform {
  transform(value: String, exponent?: number): String {
    return value.split(' ').join('-').toLowerCase();
  } 
}
