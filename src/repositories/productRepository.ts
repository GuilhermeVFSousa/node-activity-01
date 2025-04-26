import { promises } from 'fs'; 
import path from 'path';
import ProductList from '../entities/productList';
import Product from '../entities/product';

export default class ProductRepository {
    private inputFolder: string;
    private outputFolder: string;


    constructor() {
        this.inputFolder = path.resolve('base');
        this.outputFolder = path.resolve('output');
    }

    async getProducts() {
        const data = await promises.readFile(path.join(this.inputFolder, 'products.json'));
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

    async saveOnFile(products: ProductList, filePath: string) {
        const data = JSON.stringify(products.toOutputFormat());
        await promises.writeFile(path.join(this.outputFolder, filePath), data);
    }
}