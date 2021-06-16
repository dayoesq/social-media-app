interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  isVerified?: boolean;
  status?: [string]; // pending, active, banned, suspended
  registeredAt?: Date;
  updatedAt?: Date;
  alias?: string;
  friends: IUser;
}
