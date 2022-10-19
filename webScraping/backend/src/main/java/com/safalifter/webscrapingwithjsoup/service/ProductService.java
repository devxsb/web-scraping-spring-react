package com.safalifter.webscrapingwithjsoup.service;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import com.safalifter.webscrapingwithjsoup.repository.ProductRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
@Log4j2
public class ProductService {
    private final ProductRepository productRepository;
    private final VatanService vatanService;
    private final TeknosaService teknosaService;
    private final TrendyolService trendyolService;
    private final N11Service n11Service;

    public ProductService(ProductRepository productRepository,
                          @Lazy VatanService vatanService,
                          @Lazy TeknosaService teknosaService,
                          @Lazy TrendyolService trendyolService,
                          @Lazy N11Service n11Service) {
        this.productRepository = productRepository;
        this.vatanService = vatanService;
        this.teknosaService = teknosaService;
        this.trendyolService = trendyolService;
        this.n11Service = n11Service;
    }

    public Object getProducts(String modelNumber, String search, Pageable page) {
        if (modelNumber != null)
            return getProductsByModelNumber(modelNumber);
        else if (search != null)
            return getProductsBySearch(search, page);
        // return productRepository.findAll(); // will be solved
        return getProductsBySeller(Seller.VATAN, page); // only vatan's products for home page
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Page<Product> getProductsBySeller(Seller seller, Pageable page) {
        return productRepository.findProductsBySeller(seller, page);
    }

    public Product getProductsBySellerAndModelNumber(Seller seller, String modelNumber) {
        return productRepository.findProductBySellerAndModelNumber(seller, modelNumber);
    }

    // 3 most affordable sites
    public List<Product> getProductsByModelNumber(String modelNumber) {
        if (productRepository.findProductsByModelNumberOrderByPrice(modelNumber).size() > 3)
            return productRepository.findProductsByModelNumberOrderByPrice(modelNumber).subList(0, 2);
        return productRepository.findProductsByModelNumberOrderByPrice(modelNumber);
    }

    public List<Product> getProductsByName(String name) {
        return productRepository.findProductsByName(name);
    }

    public Object getProductsBySearch(String searchValue, Pageable page) {
        try {
            if (productRepository.findProductsByNameContainsIgnoreCase(
                    searchValue.replaceAll(" ", "-"), page).getTotalElements() > 0)
                return productRepository.findProductsByNameContainsIgnoreCase(
                        searchValue.replaceAll(" ", "-"), page);
            else if (productRepository.findProductsByModelNumberOrderByPrice(
                    searchValue).size() > 0)
                return productRepository.findProductsByModelNumberOrderByPrice(
                        searchValue).subList(0, 1);
            else if (productRepository.findProductsBySeller(Seller.valueOf(
                    searchValue.toUpperCase(Locale.ROOT)), page).getTotalElements() > 0)
                return productRepository.findProductsBySeller(Seller.valueOf(
                        searchValue.toUpperCase(Locale.ROOT)), page);
        } catch (Exception e) {
            System.err.println("Search not found: " + searchValue);
        }
        return null;
    }

    @Bean
    public void scrape() {
        log.info("vatan scraping started");
        vatanService.scrapeProducts();
        log.info("teknosa scraping started");
        teknosaService.scrapeProducts();
        log.info("trendyol scraping started");
        trendyolService.scrapeProducts();
        log.info("n11 scraping started");
        n11Service.scrapeProducts();
    }
}