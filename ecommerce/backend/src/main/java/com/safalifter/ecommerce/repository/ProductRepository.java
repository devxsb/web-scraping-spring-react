package com.safalifter.ecommerce.repository;

import com.safalifter.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductByModelNumber(String modelNumber);

    Page<Product> findProductsByNameContainsIgnoreCase(String search, Pageable page);

    List<Product> findProductsByName(String name);
}
