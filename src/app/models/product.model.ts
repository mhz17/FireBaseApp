export class Product {
    constructor(
        public key: string,
        public name: string,
        public fat: number,
        public proteins: number,
        public carbs: number
    ) {}
}

export class MyProduct {
    constructor(
        public name: string,
        public fat: number,
        public proteins: number,
        public carbs: number,
        public weight: number
    ) {}
}

