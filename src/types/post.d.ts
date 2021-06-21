interface IPost {
  _id?: string;
  postAuthor?: string;
  postAuthorImage?: string;
  postedAt?: Date | string;
  updatedAt?: Date | string;
  postBody?: string;
  postVideo?: string;
  postImage?: string;
  postVideoType?: string;
  postCommentCount?: number;
  postRepostCount?: number;
  postLoveCount?: number;
  postShareCount?: number;
}
