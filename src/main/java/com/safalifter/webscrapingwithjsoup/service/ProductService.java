package com.safalifter.webscrapingwithjsoup.service;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import com.safalifter.webscrapingwithjsoup.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Log4j2
public class ProductService {
    private final ProductRepository productRepository;
    private final VatanService vatanService;
    private final TeknosaService teknosaService;

    public ProductService(ProductRepository productRepository,
                          @Lazy VatanService vatanService,
                          @Lazy TeknosaService teknosaService) {
        this.productRepository = productRepository;
        this.vatanService = vatanService;
        this.teknosaService = teknosaService;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getProductsBySeller(Seller seller) {
        return productRepository.findProductsBySeller(seller);
    }

    public Product getProductsBySellerAndModelNumber(Seller seller, String modelNumber) {
        return productRepository.findProductBySellerAndModelNumber(seller, modelNumber);
    }

    @Bean
    public void scrape() throws IOException {
        log.info("vatan scraping started");
        vatanService.scrapeProducts();
        log.info("teknosa scraping started");
        teknosaService.scrapeProducts();
    }
}