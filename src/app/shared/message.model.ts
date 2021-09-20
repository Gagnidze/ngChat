export class Message {
    constructor(
        public text: string,
        public date: Date,
        public to: string,
        public from: string
    ) { }
}