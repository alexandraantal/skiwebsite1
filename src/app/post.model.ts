import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Post {
    message: string;
    title: string;
    user: string;
    userId: string;
    created: Timestamp<any>;
}