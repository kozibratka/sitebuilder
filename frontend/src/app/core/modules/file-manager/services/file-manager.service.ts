import {Injectable} from '@angular/core';
import {FileInfoInterface} from '../interfaces/file-info-interface';
import {HttpClient} from "@angular/common/http";
import {SymfonyApiClientService} from "../../../services/api/symfony-api/symfony-api-client.service";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(
    private httpClient: HttpClient,
    private symfonyApiClientService: SymfonyApiClientService,
  ) { }

  isImage(file: FileInfoInterface) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return acceptedImageTypes.includes(file.mimeType);
  }

  downloadFile(sourceUrl: string, path = '', fileName = '') {
    fileName = fileName ? fileName : sourceUrl.split('/').slice(-1)[0];
    return this.httpClient.get(sourceUrl, {responseType: 'blob'}).pipe(
      switchMap(response => {
        var blob = new Blob([response]);
        const formData = new FormData();
        formData.append('file', blob, fileName);
        formData.append('path', path)
        return this.symfonyApiClientService.post('user_storage_upload_files', formData);
      }),
      map(result => {
        return result.body[0];
      }),
    );
  }
}
