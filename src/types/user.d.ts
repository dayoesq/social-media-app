interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  avatar?: string;
  friends?: ObjectId[];
  status?: string; 
  registeredAt?: Date;
  updatedAt?: Date;
  followingCount?: number;
  followerCount?: number;
}
