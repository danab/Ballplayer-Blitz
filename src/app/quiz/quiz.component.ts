import { Component, OnInit } from '@angular/core';
import { ANSWERS, NAMES } from '../mock-answers';
import { Name } from '../answer';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  answers: Name[] = NAMES;
  answersObj: Object = ANSWERS;
  time: number = 45;
  answered = 0;
  started: boolean = false;
  finished: boolean = false;
  currentName: string = '';
  interval;

  constructor() { }

  ngOnInit() {
  }

  startQuiz(): void {
    this.started = true;
    // Cheat the answerer out of one second.
    this.time = this.time - 1;
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
    const lastName = this.currentName.toLowerCase();
    if (this.answersObj[lastName] && !this.answersObj[lastName].found) {
      this.answersObj[lastName].found = true;
      this.currentName = '';
      this.answered += this.answersObj[lastName].firsts.length;
      this.time = Math.min(60, this.time + 10);

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
