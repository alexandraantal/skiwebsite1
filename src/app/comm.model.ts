import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Comm {
    user: string;
    message: string;
    created: Timestamp<any>
}