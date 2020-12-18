import {SymfonyApiClientService} from '../../symfony-api-client.service';

export class Event {
  static PRE_SEND = SymfonyApiClientService.name + 'PRE_SEND';
  static POST_SEND = SymfonyApiClientService.name + 'POST_SEND';
}
