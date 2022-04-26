export type ProjectCommentQuery = {
  size: number;
  page: number;
  projectId: number;
}

export type ProjectCommentAddParameter = {
  projectId: number;
  description: string;
}
