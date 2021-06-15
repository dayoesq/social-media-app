interface IPost {
  id?: string;
  author?: IUser;
  postedAt: Date;
  updatedAt: Date;
  content?: string;
  video?: string;
  image?: string;
  videoType?: string;
  postCommentCount?: number;
}
