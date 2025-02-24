import pool from "../../db";
import { IUser } from "../../model/users/userModel";
import { getBcryptPass } from "./registerUser";

export const secret = (): string => {
  return process.env.SECRET as string;
};

export const cookieName = process.env.COOKIE_NAME as string;

// 🔹 Insert User
export const insertUser = async (user: IUser): Promise<number> => {
  const { username, email, password, role } = user;
  const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [username, email, password, role]);
  return (result as any).insertId;
};

// 🔹 Get All Users
export const getUsers = async (): Promise<IUser[]> => {
  const sql = `SELECT * FROM users`;
  const [rows] = await pool.execute(sql);
  return rows as IUser[];
};

// 🔹 Get User by ID
export const getUserById = async (id: number): Promise<IUser | null> => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await pool.execute(sql, [id]);
  return (rows as IUser[])[0] || null;
};

// 🔹 Update User
export const updateUser = async (
  email: string,
  user: Partial<IUser>
): Promise<boolean> => {
  const fields = Object.keys(user)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(user), email];
  if (user.password) {
    // Hash password
    const hashedPassword = await getBcryptPass(user.password);
    values[Object.keys(user).indexOf("password")] = hashedPassword;
  }
  console.log(values, fields);
  const sql = `UPDATE users SET ${fields} WHERE email = ?`;

  const [result] = await pool.execute(sql, values);
  return (result as any).affectedRows > 0;
};

// 🔹 Delete User
export const deleteUser = async (email: string): Promise<boolean> => {
  const sql = `DELETE FROM users WHERE email = ?`;
  const [result] = await pool.execute(sql, [email]);
  return (result as any).affectedRows > 0;
};
