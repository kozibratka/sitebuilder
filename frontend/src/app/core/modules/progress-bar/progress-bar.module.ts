import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgresBarDirective } from './directives/progres-bar.directive';



@NgModule({
  declarations: [ProgresBarDirective],
  imports: [
    CommonModule
  ]
})
export class ProgressBarModule { }
