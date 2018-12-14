import { Pipe, PipeTransform } from '@angular/core';

import { Name } from './answer';
@Pipe({
  name: 'formatName'
})
export class FormatNamePipe implements PipeTransform {

  transform({ first, last }: Name): string {
    return `${last}, ${first}`;
  }

}
