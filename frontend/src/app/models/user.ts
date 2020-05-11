export class User {
    constructor(
        public id: number,
        public name: string,
        public sex: string,
        public avatar: string,
        public email: string,
        public phone: string,
        public role: string,
        public description?: string,
        public online?: boolean) {
    }
}
