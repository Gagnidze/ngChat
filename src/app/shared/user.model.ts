import { Message } from "./message.model";

export class User {
    constructor(
        public email: string,
        public username: string,
        public uid: string,
        private token: string,
        private tokenExpDate: Date,
        public messages?: Message[],
    ) { }

    get getToken() {
        if (!this.tokenExpDate || new Date() > this.tokenExpDate) {
            return null;
        } else {
            return this.token;
        }
    }
}