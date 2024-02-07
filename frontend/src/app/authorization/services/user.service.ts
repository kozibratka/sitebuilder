import { Injectable } from '@angular/core';
import {UserInterface} from "../interfaces/user-interface";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  settings: UserInterface;
  roles: string[] = []

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
  ) { }

  update() {
    this.symfonyApiClientService.post('user_update', this.settings).subscribe();
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
