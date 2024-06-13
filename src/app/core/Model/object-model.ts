export class User{
  name!:string;
  password!:string;
  uploadPhoto!:string;
  role!:string;
  mobNumber!:string;
  address!:Address;
  gender!:string;
  language!:string;
  email!:string;
  dob!:string;
  agreetc!:boolean;
  age!:number;
  aboutYou!:string;
}
export class Address{
  id!:number;
  addLine1!:string;
  addLine2!:string;
  city!:string;
  state!:string
  zipCode!:number;
}
export class Employee{
  id!:number;
  name!:string
  uploadPhoto!:string;
  productDesc!:string;
  mrp!:number;
  dp!:number;
  status!:boolean;
}
export class Order{
  id!:number;
  userId!:number;
  sellerId!:number;
  product!:Employee;
  deliveryAddress!:Address;
  contact!:number;
  dateTime!:string;
}
export interface FormControl {
  Length?: number;
  Type?: string;
  Label: string;
  Placeholder?: string;
  Width?:number;
  ValidRegEx?: string;
  MaxLength?: number;
  MinLength?: number;
  DefaultValue: any;
  Mask?: string
}
