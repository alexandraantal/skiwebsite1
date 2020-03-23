import { Comm } from './comm.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Post {
    message: string;
    title: string;
    user: string;
    created: Timestamp<any>;
    comments?:  Comm[]
}