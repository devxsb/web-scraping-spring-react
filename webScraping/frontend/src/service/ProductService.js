import axios from "axios";

export default class ProductService {
    getProducts(page, size, sortPrice, renderFilter) {
        if (!renderFilter)
            return axios.get(sortPrice ?
                `/product?page=${page}&size=${size}&sort=${sortPrice}` :
                `/product?page=${page}&size=${size}`);
        else
            return axios.get(sortPrice ?
                `/product?page=${page}&size=${size}&sort=${sortPrice}&search=${renderFilter}` :
                `/product?page=${page}&size=${size}&search=${renderFilter}`);
    }

    getProductsByModelNumber(modelNumber) {
        return axios.get("/product?modelNumber=" + modelNumber);
    }

    getProductsByName(name) {
        return axios.get("/product/" + name);
    }

    getProductsBySearch(value) {
        return axios.get("/product?search=" + value);
    }
}