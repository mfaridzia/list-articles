//ref: https://github.com/firebase/firebase-js-sdk/blob/master/packages/database-types/index.d.ts
export interface Article {
  val(): any;
  link: string;
  title: string;
  status: string;
}
