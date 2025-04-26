
import axios from "axios";
import ProductRepository from "./repositories/productRepository";
import Product from "./entities/product";

const productRepository: ProductRepository = new ProductRepository();

async function run() {
  try {
    const products = await productRepository.getProducts();

    const filteredProducts = await products.filter(isCategoryValid);

    console.log(filteredProducts)

  } catch (error) {
    throw error;
  }
}

async function isCategoryValid(product: Product) : Promise<boolean> {
  try {
    const response = await axios.get(`https://posdesweb.igormaldonado.com.br/api/allowedCategory?category=${product.getCategory().valueOf()}`);
    return response.data.allowed;
  } catch (error) {
    console.log('Request error', error);
    return false;
  }
}

run();

export default run;