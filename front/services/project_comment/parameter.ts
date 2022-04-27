export type ProjectCommentQuery = {
  size: number;
  page: number;
  projectId: number;
  keyword?: string;
}

export type ProjectCommentAddParameter = {
  projectId: number;
  description: string;
}
