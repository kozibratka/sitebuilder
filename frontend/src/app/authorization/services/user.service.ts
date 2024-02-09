import { Injectable } from '@angular/core';
import {UserInterface} from "../interfaces/user-interface";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  settings: UserInterface;

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
  ) { }

  update() {
    this.symfonyApiClientService.post('user_update', this.settings).subscribe();
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }


  get roles(): string[] {
    let item = localStorage.getItem('roles');
    if (!item) {
      return [];
    }
    return JSON.parse(localStorage.getItem('roles'));
  }

  set roles(value: string[]) {
    if (value && value.length) {
      localStorage.setItem('roles', JSON.stringify(value));
    }
  }
}
