interface IPost {
    _id?: string;
    id?: string;
    postAuthor: IUser;
    postAuthorImage?: string;
    postedAt?: Date | string;
    updatedAt?: Date | string;
    postBody?: string;
    postVideo?: string;
    postImages?: string;
    postVideoType?: string;
    postCommentCount?: number;
    postRepostCount?: number;
    postLoveCount?: number;
    postShareCount?: number;
}
