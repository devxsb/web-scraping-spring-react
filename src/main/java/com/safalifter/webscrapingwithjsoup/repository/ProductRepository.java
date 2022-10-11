package com.safalifter.webscrapingwithjsoup.repository;

import com.safalifter.webscrapingwithjsoup.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
