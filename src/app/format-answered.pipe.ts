import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAnswered'
})
export class FormatAnsweredPipe implements PipeTransform {

  transform(answered: number): string {
    if (answered === 0) {
      return 'Oops. Maybe you forgot to start?';
    } else if (answered < 10) {
      return 'Good start. Keep trying!';
    } else if (answered < 350) {
      return `Great work! That's ${Math.round(answered / 413 * 1000) / 10}%!`
    } else {
      return 'You should be very very proud of yourself.';
    }
  }

}
