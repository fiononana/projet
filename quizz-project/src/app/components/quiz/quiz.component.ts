import { Component, OnInit } from '@angular/core';
import { Option, Question, Quiz, QuizConfig } from '../../models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    allowBack: true,
    allowReview: true,
    autoMove: false,  // if true, it will move to next question automatically when answered.
    duration: 15,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    pageSize: 1,
    requiredAll: false,  // indicates if you must answer all the questions before submitting.
    richText: false,
    shuffleQuestions: false,
    shuffleOptions: false,
    showClock: false,
    showPager: true,
    theme: 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  color = '';
  constructor(private dataS: DataService) { }

  ngOnInit() {
    this.dataS.getJSON().subscribe(data => {
      this.quiz = new Quiz(data);
      this.pager.count = data.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });

  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      console.log(this.pager.index);
      if (this.pager.index < 9) {
        this.goTo(this.pager.index + 1);
      } else if (this.pager.index === 9) {
        this.validate();
      }

    }
    this.ellapsedTime = this.parseTime(diff);
    console.log(this.ellapsedTime);
    if (this.ellapsedTime >  '00:09') {
      this.color = 'red cardcontainer';
    } else {
      this.color = '';
    }
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (this.pager.index === 9) {
      this.validate();
    } else {
      if (question.questionTypeId === 1 || question.questionTypeId === 2) {
        question.options.forEach((x) => { if (x.id !== option.id) { x.selected = false; } });
        setTimeout(() => {
          this.goTo(this.pager.index + 1);
        }, 1000);
      }
      if (this.config.autoMove) {
        this.goTo(this.pager.index + 1);
      }
    }


  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  }

  validate() {
    const answers = [];
    this.quiz.questions.forEach(x => answers.push({ quizId: this.quiz.id, questionId: x.id, answered: x.answered }));
    this.mode = 'result';
  }
}
