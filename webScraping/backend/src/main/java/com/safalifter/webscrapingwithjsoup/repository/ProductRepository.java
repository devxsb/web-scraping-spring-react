package com.safalifter.webscrapingwithjsoup.repository;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findProductsBySeller(Seller seller, Pageable page);

    Product findProductBySellerAndModelNumber(Seller seller, String modelNumber);

    List<Product> findProductsByModelNumberOrderByPrice(String modelNumber);

    List<Product> findProductsByNameOrderByPriceAsc(String name);

    Page<Product> findProductsByNameContainsIgnoreCaseAndSeller(String search, Seller seller, Pageable page);

    @Query(nativeQuery = true, value = (
            "Select * from product where " +
                    "(:#{#brandFilters.size}=0 or LOWER(brand) in ?1) and " +
                    "(:#{#processorBrandFilters.size}=0 or LOWER(processor_brand) in ?2) and " +
                    "(:#{#processorTechnologyFilters.size}=0 or LOWER(processor_technology) in ?3) and " +
                    "(:#{#operatingSystemFilters.size}=0 or LOWER(operating_system) in ?4) and " +
                    "(:#{#screenSizeFilters.size}=0 or LOWER(screen_size) in ?5) and " +
                    "(:#{#diskFilters.size}=0 or LOWER(disk_capacity) in ?6) and " +
                    "(:#{#ramFilters.size}=0 or LOWER(ram) in ?7)"
    ))
    Page<Product> findProductsByFilter(List<String> brandFilters,
                                       List<String> processorBrandFilters,
                                       List<String> processorTechnologyFilters,
                                       List<String> operatingSystemFilters,
                                       List<String> screenSizeFilters,
                                       List<String> diskFilters,
                                       List<String> ramFilters,
                                       Pageable page);
}
