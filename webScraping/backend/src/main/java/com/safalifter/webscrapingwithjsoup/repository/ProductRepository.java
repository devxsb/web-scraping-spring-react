package com.safalifter.webscrapingwithjsoup.repository;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsBySeller(Seller seller);

    Product findProductBySellerAndModelNumber(Seller seller, String modelNumber);

    List<Product> findProductsByModelNumberOrderByPrice(String modelNumber);

    List<Product> findProductsByName(String name);
}
