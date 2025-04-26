import Product from "./product";

export default class ProductList implements Iterable<Product> {
    private products: Product[] = [];

    push(product: Product) {
        this.products.push(product);
    }

    async filter(callback: (product: Product) => Promise<boolean>): Promise<ProductList> {
        const filteredProducts = new ProductList();
        for (const product of this.products) {
            if (await callback(product)) {
                filteredProducts.push(product);
            }
        }
        return filteredProducts;
    }

    toOutputFormat(): Array<Object> {
        return Array.from(this.products).map((product: Product) => ({
            id: product.getId(),
            name: product.getName(),
          }))
    }
    
    // Implements the Iterable interface
    *[Symbol.iterator](): Iterator<Product> {
        for (const item of this.products) {
          yield item;
        }
    }
}