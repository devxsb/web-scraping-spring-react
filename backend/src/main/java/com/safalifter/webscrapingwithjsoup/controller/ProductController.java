package com.safalifter.webscrapingwithjsoup.controller;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.service.ProductService;
import org.aspectj.weaver.ISourceContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getProducts(@RequestParam(required = false) String modelNumber) {
        return ResponseEntity.ok(productService.getProducts(modelNumber));
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Product>> getProduct(@PathVariable String name) {
        return ResponseEntity.ok(productService.getProductsByName(name));
    }
}