type ResponseDataUser = {
  data: IUser;
  status: string;
};
type ResponseDataPost = {
  data: IPost;
  status: string;
}
type ResponseContext = {
  status?: string;
  data: {
    user: IUser;
    token: string;
  }
};
