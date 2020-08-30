import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';
import {PaletteBlockGridstackService} from '../services/palette-block-gridstack.service';

@Directive({
  selector: '[appPaletteBlockGridstackItem]'
})
export class PaletteBlockGridstackItemDirective implements OnInit, AfterViewInit {

  constructor(private paletteBlockGridstackService: PaletteBlockGridstackService, private elementRef: ElementRef) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.paletteBlockGridstackService.addWidget(this.elementRef);
  }

}
