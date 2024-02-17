import {ElementRef, Injectable} from '@angular/core';
import html2canvas from 'html2canvas';
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  static screenshot(ref: ElementRef): Observable<string> {
    let element = ref.nativeElement as HTMLElement;
    return from(html2canvas(element,
      {
        useCORS: true,
        allowTaint : true,
        logging: true,
      }
    ))
      .pipe(map(canvas => canvas.toDataURL("image/png")));
  }
}
