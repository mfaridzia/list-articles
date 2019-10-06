//ref: https://github.com/firebase/firebase-js-sdk/blob/master/packages/database-types/index.d.ts
export interface DataSnapshot {
  val(): any;
  link: string;
  title: string;
  status: string;
}
