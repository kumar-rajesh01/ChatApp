import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption';
import { UserModel } from '../Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private encryptionService: EncryptionService
  ) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    var userData = JSON.parse(this.encryptionService.decryptData(token ?? "") ?? "");

    if(userData?.id > 0 || userData.expiryDate > new Date()){
      return true;
    }
    return false; // Simple check if token exists
  }

  getLoggedInUserInfo(): UserModel | undefined {
    const token = this.getToken();
    return JSON.parse(this.encryptionService.decryptData(token ?? ""));
  }
}
