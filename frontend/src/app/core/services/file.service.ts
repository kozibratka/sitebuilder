import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  blobToFile(blob: Blob, fileName = 'output') {
    var url = window.URL.createObjectURL(blob);
    var hiddenElement = document.createElement('a');

    hiddenElement.href = url;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
    hiddenElement.remove();
  }
}
