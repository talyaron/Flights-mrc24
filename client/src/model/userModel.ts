
export interface UserModel {
  username: string;
  email: string;
  password: string;
  role: 'Passenger' | 'Employee' | 'Sysadmin' | 'Waiting' | 'Not_Active';
}

