import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const minuteString = minutes ? minutes + ':' : '';
    const secondsString = seconds < 10 && minutes ? '0' + seconds : '' + seconds;

    return minuteString + secondsString;
  }

}
