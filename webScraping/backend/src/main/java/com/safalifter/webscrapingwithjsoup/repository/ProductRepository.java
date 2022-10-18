package com.safalifter.webscrapingwithjsoup.repository;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends MongoRepository<Product, UUID> {
    List<Product> findProductsBySeller(Seller seller);

    Product findProductBySellerAndModelNumber(Seller seller, String modelNumber);

    List<Product> findProductsByModelNumberOrderByPrice(String modelNumber);

    List<Product> findProductsByName(String name);
}
