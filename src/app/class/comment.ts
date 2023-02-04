import { User } from './user';

export class Comment {
  user:User;
  date: number;
  message: string;
  key?: string;
  isEdit: boolean;

  constructor(value: any) {
    this.user = value.user;
    this.message = value.message;
    this.date = Date.now();
    if(value.key) {
      this.key = value.key;
    }
   }

}
