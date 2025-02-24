export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: 'Passenger' | 'Employee' | 'Sysadmin' | 'Waiting' | 'Not_Active';
  dateTime?: Date;
}

