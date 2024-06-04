export interface UserModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  dateCreated: Date;
  expiryDate: Date;
}

export interface EmailModel {
  id: number;
  name: string;
  publickKey: string;
  templateId: string;
  service_id: string;
  isActive: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}