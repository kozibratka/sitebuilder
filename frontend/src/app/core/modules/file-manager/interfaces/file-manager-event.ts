import {FileInfoInterface} from './file-info-interface';

export interface FileManagerEvent {
  eventName: 'selected' | 'close';
  files: FileInfoInterface[];
}
