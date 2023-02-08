import { Injectable } from '@angular/core';
import {FileInfoInterface} from '../interfaces/file-info-interface';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor() { }

  isImage(file: FileInfoInterface) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return acceptedImageTypes.includes(file.mimeType);
  }
}
