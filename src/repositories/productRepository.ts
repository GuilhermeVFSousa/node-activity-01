import { promises } from 'fs'; 
import path from 'path';
import ProductList from '../entities/productList';
import Product from '../entities/product';

export default class ProductRepository {
    private filePath: string;

    constructor() {
        this.filePath = path.resolve('..', 'base/products.json');
    }

    async getProducts() {
        const data = await promises.readFile(this.filePath);
        const productsAsJson = JSON.parse(data.toString());

        const products = new ProductList();
        for (const productData of productsAsJson) {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.price,
                productData.category,
                productData.pictureUrl
            );
            products.push(product);
        }
        return products;
    }
}