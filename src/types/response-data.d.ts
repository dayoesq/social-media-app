type ResponseDataUser = {
  data: IUser;
  status: string;
};
type ResponseDataPost = {
  data: IPost;
  status: string;
}
type ResponseDataPosts = {
  data: IPost[];
  status: string;
}
type ResponseDataUsers = {
  data: IUser[];
  status: string;
}
type ResponseContext = {
  status?: string;
  data: {
    user: IUser;
    token: string;
  }
};
type Logout = {
  status: string
};

