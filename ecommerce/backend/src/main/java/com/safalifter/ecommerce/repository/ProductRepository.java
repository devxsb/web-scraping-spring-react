package com.safalifter.ecommerce.repository;

import com.safalifter.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByModelNumberOrderByPrice(String modelNumber);
}
