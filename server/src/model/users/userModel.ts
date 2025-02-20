export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: "Passenger" | "Employee" | "SysAdmin" | "Waiting" | "Not_Active";
  dateTime?: Date;
}

