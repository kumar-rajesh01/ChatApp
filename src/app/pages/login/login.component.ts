import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../Model/loginModel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../service/userService';
import { EncryptionService } from '../../service/encryption';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: LoginModel;

  constructor(
    private router: Router,
    private encryptionService: EncryptionService
  ) {
    localStorage.removeItem("token");
    this.loginObj = new LoginModel();
  }

  onLogin() {
    if (this.loginObj.Email && this.loginObj.Password) {
      var data = UserService.login(this.encryptionService.encryptData(window.btoa(this.loginObj.Email)), this.encryptionService.encryptData( window.btoa(this.loginObj.Password)));
      if (data) {
        if (data.isActive) {
          var token = this.encryptionService.encryptData(JSON.stringify(data));
          localStorage.setItem("token", token);
          this.router.navigateByUrl("/dashboard")
        }
        else {
          this.router.navigateByUrl("/login")
        }
      }
      else {
        alert("Invalid username or password");
      }
    }
  }

  // onLogin() {
  //   if (this.loginObj.Email && this.loginObj.Password) {
  //     this.loginObj.Email = "cGpAdmlzaW1wYWN0LmNvbQ==";      
  //     this.loginObj.Password = "dGVzdGluZw==";
  //     this.httpClient.post("http://staging.gt-crm.com/api/api/User/Login", this.loginObj).subscribe((res: any) => {
  //       if (res) {
  //         alert("Login Success");
  //         this.router.navigateByUrl("/dashboard")
  //         console.log(res);
  //       }
  //       else {
  //         alert(res.message);
  //       }
  //     })
  //   }
  // }
}