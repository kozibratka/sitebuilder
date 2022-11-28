import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PageBlockInterface} from '../../../page/interfaces/page-block-interface';
import {PaletteBlockGridstackService} from '../../../page/services/palette-block-gridstack.service';

@Component({
  selector: 'app-public-page-block',
  templateUrl: './public-page-block.component.html',
  styleUrls: ['./public-page-block.component.css']
})
export class PublicPageBlockComponent implements OnInit {

  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef;
  @Input() pageBlock: PageBlockInterface;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
  ) { }

  ngOnInit(): void {
    this.paletteBlockGridstackService.startGridStackPalettePublic(this.pageBlock, this.paletteContent);
  }

}
