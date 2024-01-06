import { Sex } from './enum';


export class ResponseBody {
  status: number;
  title: string;
  detail: any;

}
export class Account {
  id: string;
  phoneNumber: string;
  name: string;
  token: string;
  roles: string[];
  status: number;

  public constructor(init?: Partial<Account>) {
    Object.assign(this, init);
  }
}
export enum EnumAccountStatus {
  Avaiable,
  Disabled
}
export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export class Equipment {
  id: string;
  cost: number;
  name: string;
  unit: string;
  class: string;
  equipmentImages: string[];
  status: number;
}
export class Medic {
  id: string;
  name: string;
  unit: string;
  cost: number;
  status: number;
}

export class Image {
  Id: string;
  name: string;
}

export class Vehicle {
  id: string;
  name: string;

  accountId: string
  vehicleImages: string[]
  plate: string

  class: string

  year: number
  cost: number
  contractTerm: Date
  approvalStatus: number
  enableStatus: number
}

export class Driver {
  id: string;
  name: string;
  dob: Date;
  sex: Sex;
  address: string;
  phoneNumber: string;
  nationalIds: string[];
  photoIds: string[];
  vehicleIds: string[];
  accountId: string;
  driveApprovalStatus: number

  nationalId : string
  nationalImages: string[];
  photos: string[];
}



export enum Level {
  Low,
  Medium,
  High
}
export enum Policy {
  AccountManagement,
  RoleManagement,
  DriverManagement,
  VehicleManagement,
  EquipmentManagement,
  ImageManagement,
  BookingManagement,
}

export enum AccountStatus {
  Avaiable,
  Disabled
}

export class Address {
  name: string = "";
  street: string = "";
  city: string = "";
  state: string = "";
  zipCode: string = "";
}
export class Booking {
  id: string;
  fromLocation: Address = new Address();
  toLocation: Address = new Address();
  startTime: string = "";
  endTime: string = "";
  name: string = "";
  consumerId: string = "";
  providerId: string = "";
  carId: string = "";
  equipmentIds: string[] = [];
  medicIds: string[] = [];
  note: string = "";
  type: number = 0;
  cost: number = 0;
  status: number = 0;
}
export enum VehicleStatus {
  Registration = 0,
  Approved = 1,
  Rejected = 2
}
export enum DriverStatus {
  Registration,
  Approved,
  Rejected
}
export enum BookingStatus {
  ConsumerRegistration,
  ConsumerConfirmation,
  ProviderConfirmation,
  ProviderOnWay,
  ProviderAreServing,
  Finished
}
export enum EquipmentStatus {
  Avaiable,
  Disabled
}


export enum BookingType {
  VehicleBooking,
  HomeCareBooking
}
