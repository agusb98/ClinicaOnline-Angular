import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isEmpty',
  pure: true,
})
export class IsEmptyPipe implements PipeTransform {

  transform(value: string, kyndValue?: string): string {
    if (!value && !kyndValue) { return 'Campo Vacío'; }
    else if (!value) { return 'Sin ' + kyndValue; }
    return value;
  }

}
