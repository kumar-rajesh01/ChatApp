import { UserModel } from "../Model/userModel";

export class UserService {
  TakeAwayTime: String = new Date().toISOString();
  public static users: UserModel[] = [
    { id: 1, name: 'User 1', phone: "123456987", email: 'iL0EiJGsg1KugHaog75=', password: 'iL0EiLqz4B==', role: 'Admin', isActive: true, dateCreated: new Date(), expiryDate: this.getCurrDate()},
    { id: 2, name: 'User 2', phone: "123456987", email: 'hrKv42Stf80y32OCi7ZaSpGsg1KugHaog75=', password: 'ZrKv42StTY3v', role: 'Admin', isActive: true, dateCreated: new Date(), expiryDate: this.getCurrDate()},
    { id: 3, name: 'User 2', phone: "123456987", email: 'h8OugL0w31iAgrZESEGF476mf1Bz37ey', password: 'ZJGEh8iAhrV=', role: 'User', isActive: true, dateCreated: new Date(), expiryDate: this.getCurrDate(10)},
    // { id: 4, name: 'User 3', phone: "123456987", email: 'test4@gmail.com', password: 'testing', role: 'User', isActive: true, dateCreated: new Date(), dateUpdated: new Date()},    
  ];
  static TakeAwayTime: string;

  private static getCurrDate(mintute?: number){
    var dt = new Date();
    const newdate = dt.setMinutes( dt.getMinutes() + (mintute ?? 60));
    return new Date(newdate);
  }

  public static getList(): UserModel[] {
    return this.users;
  }

  public static getById(id: number): UserModel | undefined {
    return this.users.find(user => user.id === id);
  }

  public static login(email: string, password: string): UserModel | undefined {
    return this.users.find(user => user.email === email && user.password == password);
  }
  
}