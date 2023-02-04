import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '磯川');
const ANOTHER_USER: User = new User(2, '武井');


@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser = CURRENT_USER;
  comment = '';

  constructor(private db:AngularFireDatabase) {
    this.commentsRef = db.list('/comments');
    console.log('constructor');
    this.comments$ = this.commentsRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Comment({ key: snapshot.payload.key, ...value});
          })
        })
      )
  }
  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(new Comment({user: this.currentUser, message: comment}));
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void {
    const { key, message } = comment;

    this.commentsRef.update(key!, { message });
  }

  deleteComment( comment: Comment): void {
    this.commentsRef.remove(comment.key);
  }

}
