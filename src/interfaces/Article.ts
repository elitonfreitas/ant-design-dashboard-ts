export interface Article {
  _id: string;
  title: string;
  active: boolean;
  author: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
