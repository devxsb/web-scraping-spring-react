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

import java.util.ArrayList;
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
    private final ECommerceService eCommerceService;

    public ProductService(ProductRepository productRepository,
                          @Lazy VatanService vatanService,
                          @Lazy TeknosaService teknosaService,
                          @Lazy TrendyolService trendyolService,
                          @Lazy N11Service n11Service,
                          @Lazy ECommerceService eCommerceService) {
        this.productRepository = productRepository;
        this.vatanService = vatanService;
        this.teknosaService = teknosaService;
        this.trendyolService = trendyolService;
        this.n11Service = n11Service;
        this.eCommerceService = eCommerceService;
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
            return productRepository.findProductsByModelNumberOrderByPrice(modelNumber).subList(0, 3);
        return productRepository.findProductsByModelNumberOrderByPrice(modelNumber);
    }

    public List<Product> getProductsByName(String name) {
        return productRepository.findProductsByNameOrderByPriceAsc(name);
    }

    public Page<Product> getProductsByFilter(String value, Pageable page) {
        String[] filter = value.toLowerCase().split("&");

        List<String> brandFilters = new ArrayList<>();
        List<String> processorBrandFilters = new ArrayList<>();
        List<String> processorTechnologyFilters = new ArrayList<>();
        List<String> operatingSystemFilters = new ArrayList<>();
        List<String> screenSizeFilters = new ArrayList<>();
        List<String> diskFilters = new ArrayList<>();
        List<String> ramFilters = new ArrayList<>();

        for (String x : filter) {
            String[] y = x.replace("-", " ").split("=");
            if ("brand".equals(y[0])) {
                brandFilters.add(y[1]);
            } else if ("processorbrand".equals(y[0])) {
                processorBrandFilters.add(y[1]);
            } else if ("processortechnology".equals(y[0])) {
                processorTechnologyFilters.add(y[1]);
            } else if ("operatingsystem".equals(y[0])) {
                operatingSystemFilters.add(y[1]);
            } else if ("screensize".equals(y[0])) {
                screenSizeFilters.add(y[1]);
            } else if ("disk".equals(y[0])) {
                diskFilters.add(y[1]);
            } else if ("ram".equals(y[0])) {
                ramFilters.add(y[1]);
            }
        }
        return productRepository.findProductsByFilter(brandFilters, processorBrandFilters, processorTechnologyFilters, operatingSystemFilters, screenSizeFilters, diskFilters, ramFilters, page);
    }

    public Object getProductsBySearch(String searchValue, Pageable page) {
        try {
            if (productRepository.findProductsByNameContainsIgnoreCaseAndSeller(
                    searchValue.replaceAll(" ", "-"), Seller.VATAN, page).getTotalElements() > 0)
                return productRepository.findProductsByNameContainsIgnoreCaseAndSeller(
                        searchValue.replaceAll(" ", "-"), Seller.VATAN, page);
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
        log.info("ecommerce scraping started");
        eCommerceService.scrapeProducts();
    }
}