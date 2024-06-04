import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailModel } from '../../Model/userModel';
import { EmailService } from '../../service/email.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { EncryptionService } from '../../service/encryption';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-email-sender',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './email-sender.component.html',
  styleUrl: './email-sender.component.css'
})
export class EmailSenderComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  emailSenders: EmailModel[];

  constructor(private formBuilder: FormBuilder, 
    private encryptionService: EncryptionService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.emailSenders = EmailService.getList();
    this.emailForm = this.formBuilder.group(
      {
        sendTo: ['', Validators.required],
        toName: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        emailContent: ['', [Validators.required]],
      }
    );
  }

  get f() { return this.emailForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (!this.emailForm.valid) {
      alert("Invalid form")
    }
    var sendToData = this.f.sendTo.value;
    var userDetail = this.authService.getLoggedInUserInfo();
    if (!this.emailForm.invalid && sendToData.isActive && userDetail.role.toLocaleLowerCase() == "admin") {
      var template_params = {
        to_name: this.f.toName.value,
        message: this.f.emailContent.value,
        subject: this.f.subject.value
      };
      // return;
      emailjs.send(
        this.encryptionService.decryptData(sendToData.service_id), 
        this.encryptionService.decryptData(sendToData.templateId),
        template_params,{publicKey: this.encryptionService.decryptData(sendToData.publickKey)}) .then(
          (res: any) => {
            if((res as EmailJSResponseStatus).status == 200){
              alert("Email sent sucessfully.");
              this.onReset();
            }
            else
              alert("Error occured, while sending email.");
          },
          (error) => {
            console.log(JSON.stringify(error));
            console.log('FAILED...', (error as EmailJSResponseStatus).text);
          },
        );
    }
  }

  onReset(): void {
    this.submitted = false;
    this.emailForm.reset();
  }
}
