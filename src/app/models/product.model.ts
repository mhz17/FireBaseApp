export class Product {
    constructor(
        public name: string,
        public fat: number,
        public proteins: number,
        public carbs: number
    ) {}
}

export class MyProduct {
    constructor(
        public date: Date,
        public name: string,
        public fat: number,
        public proteins: number,
        public carbs: number,
        public key: string,
        public weight: number
    ) {}
}

