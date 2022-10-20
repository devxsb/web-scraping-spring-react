import axios from "axios";

export default class ProductService {
    getProducts(page, size, sortValue, renderFilter) {
        if (!renderFilter)
            return axios.get(sortValue ?
                `/product?page=${page}&size=${size}&sort=${sortValue}` :
                `/product?page=${page}&size=${size}`);
        else
            return axios.get(sortValue ?
                `/product?page=${page}&size=${size}&sort=${sortValue}&search=${renderFilter}` :
                `/product?page=${page}&size=${size}&search=${renderFilter}`);
    }

    getProductsBySearch(value) {
        return axios.get("/product?search=" + value);
    }

    getProductByName(name) {
        return axios.get("/product/" + name);
    }
}
