package com.safalifter.ecommerce.controller;

import com.safalifter.ecommerce.dto.ProductRequestDto;
import com.safalifter.ecommerce.model.Product;
import com.safalifter.ecommerce.service.ProductService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/v1/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false) String search,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC, size = 8) Pageable page) {
        return ResponseEntity.ok(productService.getProducts(search, page));
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<Product>> getProductsByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.getProductsByName(name));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductRequestDto request) {
        return new ResponseEntity<>(productService.createProduct(request), HttpStatus.CREATED);
    }
}
