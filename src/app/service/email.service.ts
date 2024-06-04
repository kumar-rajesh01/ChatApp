import { Injectable } from '@angular/core';
import { EmailModel } from '../Model/userModel';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  public static emailSenders: EmailModel[] = [
    { id: 1, name: 'jar', publickKey: "q_Kqwh7VUHxVv3_1T", templateId: 'yjruqfyj_lDej7nt', service_id: 'xjwAnhj_fdn6fvr', isActive: true, dateCreated: new Date(), dateUpdated: new Date()},
    { id: 1, name: 'ris', publickKey: "q_Kqwh7VUHxVv3_1T", templateId: 'yjruqfyj_kexnCxf', service_id: 'xjwAnhj_fdn6fvr', isActive: true, dateCreated: new Date(), dateUpdated: new Date()},
    { id: 1, name: 'ris-self', publickKey: "UA4g-jHnzzzUk-xnQ", templateId: 'yjruqfyj_By5olq6', service_id: 'xjwAnhj_Ebd9gyv', isActive: true, dateCreated: new Date(), dateUpdated: new Date()}
  ];

  constructor() { }

  public static getList(): EmailModel[] {
    return this.emailSenders;
  }

}
