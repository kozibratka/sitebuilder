import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animation-hider',
  templateUrl: './animation-hider.component.html',
  styleUrls: ['./animation-hider.component.css'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        display: 'block',
      })),
      state('hide', style({
        opacity: 0,
        display: 'none',
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class AnimationHiderComponent implements OnInit {

  @Input() show = false;

  constructor() { }

  ngOnInit(): void {
  }

}
