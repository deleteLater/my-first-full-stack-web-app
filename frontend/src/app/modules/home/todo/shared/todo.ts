import {User} from '../../../general/user/shared/user';

export interface Comment {
  commenter: User;
  commentTime: Date;
  content: string;
}

export interface Todo {
  id: number;
  createdBy: User;
  createdTime: Date;
  title: string;
  complete: boolean;
  priority: string;
  notes: string;
  attachment: string;
  tags: string[];
  comments: Comment[];
}
