export enum Level {
  Low,
  Medium,
  High
}

export enum Policy {
  GetAccount,
  GetAllAccount,
  CreateAccount,
  UpdateAccount,
  RemoveAccount,
  RoleManagement,
  DriverManagement,
  VehicleManagement,
  EquipmentManagement,
  ImageManagement
}

export enum AccountStatus {
  Avaiable,
  Disabled
}

export enum EquipmentStatus {
  Avaiable,
  Disabled
}
export enum MedicStatus {
  Avaiable,
  Disabled
}

export enum Sex {
  Male,
  Female
}

export enum VehicleStatus {
  Registration,
  Approved,
  Rejected
}
export enum DriverStatus {
  Registration,
  Approved,
  Rejected
}

export enum BookingStatus
{
  ConsumerRegistration,
  ConsumerConfirmation,
  ProviderConfirmation,
  ProviderOnWay,
  ProviderAreServing,
  Finished
}

export enum BookingType {
  VehicleBooking,
  HomeCareBooking
}
