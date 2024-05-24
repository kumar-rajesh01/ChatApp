import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../Model/Login';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.loginObj = new Login();
  }

  onLogin() {
    if (this.loginObj.Email && this.loginObj.Password) {
      this.loginObj.Email = "cGpAdmlzaW1wYWN0LmNvbQ==";      
      this.loginObj.Password = "dGVzdGluZw==";
      this.httpClient.post("http://staging.gt-crm.com/api/api/User/Login", this.loginObj).subscribe((res: any) => {
        if (res) {
          alert("Login Success");
          this.router.navigateByUrl("/dashboard")
          console.log(res);
        }
        else {
          alert(res.message);
        }
      })
    }
  }
}
