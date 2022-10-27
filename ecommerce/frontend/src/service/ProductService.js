import axios from "axios";

export default class ProductService {
    getProducts(page, size, sortValue) {
        return axios.get(sortValue ?
            `/product?page=${page}&size=${size}&sort=${sortValue}` :
            `/product?page=${page}&size=${size}`);
    }

    getProductsBySearch(value, page, size, sortValue) {
        return axios.get(sortValue ?
            `/product/search/${value}?page=${page}&size=${size}&sort=${sortValue}` :
            `/product/search/${value}?page=${page}&size=${size}`)
    }

    getProductByName(name) {
        return axios.get("/product/" + name);
    }

    createProduct(body) {
        return axios.post("/product", body, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    updateProduct(body) {
        return axios.put("/product", body, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    deleteProduct(id) {
        return axios.delete("/product/" + id, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    getProductsByFilter(value, page, size, sortValue) {
        return axios.get(sortValue ?
            `/product/filter/${value}?page=${page}&size=${size}&sort=${sortValue}` :
            `/product/filter/${value}?page=${page}&size=${size}`)
    }
}
