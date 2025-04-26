import { ProductCategory } from 'skeleton/dist/types';

export default class Product {
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private price: number, 
        private category: ProductCategory,
        private pictureUrl: string
    ) {};

    getId(): string {
        return this.id;
    }

    getCategory(): ProductCategory {
        return this.category;
    }

    getName(): string {
        return this.name;
    }
}