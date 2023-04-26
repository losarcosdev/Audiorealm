export interface IUser {
  _id        : string;
  email      : string;
  password?  : string;
  name       : string;
  createdAt? : string;
  updatedAt? : string;
  role       : "client" | "admin";
}
