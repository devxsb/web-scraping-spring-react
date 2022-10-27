package com.safalifter.webscrapingwithjsoup.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@Log4j2
public class ECommerceService {
    private final ProductService productService;
    private final VatanService vatanService;

    public ECommerceService(ProductService productService, VatanService vatanService) {
        this.productService = productService;
        this.vatanService = vatanService;
    }

    public void scrapeProductByModelNumber(String modelNumber) {
        final String link = "http://localhost:8081/v1/product/search/" + modelNumber
                .replaceAll("/", "-")
                .replaceAll(" ", "-");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(link))
                .build();

        HttpResponse<String> response = null;
        try {
            response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());

        } catch (IOException | InterruptedException e) {
            log.error("response error");
        }
        assert response != null;
        if (response.body().length() > 0) {
            String json = response.body();
            try {
                if (json.startsWith("{\"content\":[")) {
                    json = json.substring("{\"content\":[".length(), json.length() - 304);
                }
                Product product = new ObjectMapper().readValue(json, Product.class);
                product.setSeller(Seller.ECOMMERCE);
                product.setLink("http://localhost:3001/product/" + product.getName().replaceAll(" ", "-"));
                Product inDB = productService.getProductsBySellerAndModelNumber(Seller.ECOMMERCE, modelNumber);
                if (inDB != null && !inDB.equals(product)) {
                    product.setId(inDB.getId());
                    System.out.println(productService.saveProduct(product));
                } else if (inDB == null) {
                    product.setId(null);
                    System.out.println(productService.saveProduct(product));
                }
            } catch (JsonProcessingException e) {
                log.error("json error");
            }
        }
    }

    public void scrapeProducts() {
        for (Product p : vatanService.getProducts()) {
            scrapeProductByModelNumber(p.getModelNumber());
        }
    }
}
