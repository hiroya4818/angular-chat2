import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '磯川');
const ANOTHER_USER: User = new User(2, '武井');


const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です'),
  new Comment(ANOTHER_USER, 'この間の券ですが'),
  new Comment(CURRENT_USER, 'わかりません'),
  new Comment(CURRENT_USER, 'すみません💦')
]

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = '';

  addComment(comment: string): void {
    if (comment) {
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }

}
