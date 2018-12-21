import { Component, OnInit } from '@angular/core';
// I had ideas of calling this from an API, but never got around to it. Hence "mock"
import { NAMES } from '../mock-answers';
import { Name } from '../answer';


const createAnswersObj = (answers) => {
  return answers.reduce((obj, { first, last }) => {
    if (obj[last.toLowerCase()]) {
      obj[last.toLowerCase()].firsts.push(first);
    } else {
      obj[last.toLowerCase()] = {
        found: false,
        firsts: [first],
        last: last
      }
    }
    return obj
  }, {})
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  timeAllowed: number = 30;
  maxSecondsAdded: number = 7
  answers: Name[] = NAMES;
  answersObj: Object = createAnswersObj(NAMES);
  time: number = this.timeAllowed;
  answered = 0;
  started: boolean = false;
  finished: boolean = false;
  currentName: string = '';
  secondsAdded: number[] = [];
  interval;

  constructor() { }

  ngOnInit() {
  }

  startQuiz(): void {
    // Reset, if necessary
    this.finished = false;
    this.started = true;
    this.currentName = '';
    this.answersObj = createAnswersObj(NAMES);
    this.secondsAdded = [];
    this.time = this.timeAllowed;

    this.startTicker();

    // Seems to be overwritten by a re-render or something?
    setTimeout(() => document.getElementById("last-name-input").focus(), 0);
  }

  startTicker(): void {
    this.interval = setInterval(() => {
      this.time = this.time - 1;

      if (this.time === 0) {
        this.finished = true;
        clearInterval(this.interval);
      }
    }, 1000)
  }

  endQuiz(): void {
    this.finished = true;
    clearInterval(this.interval);
  }

  handleChange() {
    const lastName: string = this.currentName.toLowerCase();
    if (this.answersObj[lastName] && !this.answersObj[lastName].found) {
      this.answersObj[lastName].found = true;
      this.currentName = '';
      this.answered += this.answersObj[lastName].firsts.length;
      this.secondsAdded.push(this.time < 53 ? this.maxSecondsAdded : 60 - this.time);
      this.time = Math.min(60, this.time + this.maxSecondsAdded);
      if (this.answered === this.answers.length) {
        this.endQuiz();
      }
    }

  }
  found(entry) {
    return this.answersObj[entry.last.toLowerCase()].found;
  }

  show(entry) {
    return this.finished || this.found(entry);
  }

}
