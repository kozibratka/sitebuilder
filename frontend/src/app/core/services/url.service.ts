import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Injectable, SecurityContext} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(
    private sanitizer: DomSanitizer,
  ) {
  }

  getYoutubeVideoUrl(videoPath: string) {
    const videoUrl = this.validateYouTubeUrl(videoPath);
    let result: any = '';
    if (videoUrl) {
      result = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl));
    }
    return result;
  }

  validateYouTubeUrl(url: string) {
    if (url !== undefined || url !== '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        // Do anything for being valid
        // if need to change the url to embed url then use below line
        return 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0';
      } else {
        return false;
      }
    }

    return false;
  }
}
