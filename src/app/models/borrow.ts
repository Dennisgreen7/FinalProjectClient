export class Borrow {
    borrowingId?: number;
    borrowingBookId?: number;
    borrowingUserId?: number;
    borrowingDate?: Date = new Date();
    borrowingReturnDate: Date = new Date();
    borrowingReturnedDate?: Date = new Date();
    userName?: string = "";
    bookName?: string = "";
    daysLeft?: number = 0;
}