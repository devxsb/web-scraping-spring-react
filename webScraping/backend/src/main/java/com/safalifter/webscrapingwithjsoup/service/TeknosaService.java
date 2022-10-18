package com.safalifter.webscrapingwithjsoup.service;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

@Service
public class TeknosaService {
    private final ProductService productService;
    private final VatanService vatanService;

    public TeknosaService(ProductService productService, VatanService vatanService) {
        this.productService = productService;
        this.vatanService = vatanService;
    }

    public void scrapeProductByModelNumber(String modelNumber) throws IOException {
        final String url =
                "https://www.teknosa.com/arama/?s=" + modelNumber;
        final Document document = Jsoup.connect(url).get();
        final Element e = document.select("div.prd ").first();
        if (e != null &&
                e.select("h3.prd-title.prd-title-style").text().contains(modelNumber)) {
            final String price = e.select("div.prd-prc2 span").text().split(" ")[0];
            final Double score = 0.0; // will be solved
            final String link = "https://www.teknosa.com/" + e.select("a.prd-link").attr("href");
            final String img = e.select("div.prd-media img").attr("data-srcset");
            final Product prd = vatanService.getProductByModelNumber(modelNumber);
            final Product product = Product.builder()
                    .id(UUID.randomUUID())
                    .modelNumber(prd.getModelNumber())
                    .brand(prd.getBrand())
                    .ram(prd.getRam())
                    .screenSize(prd.getScreenSize())
                    .operatingSystem(prd.getOperatingSystem())
                    .processorBrand(prd.getProcessorBrand())
                    .processorTechnology(prd.getProcessorTechnology())
                    .diskType(prd.getDiskType())
                    .diskCapacity(prd.getDiskCapacity())
                    .price(price)
                    .score(score)
                    .seller(Seller.TEKNOSA)
                    .name(prd.getName())
                    .link(link)
                    .img(img).build();
            Product inDB = productService.getProductsBySellerAndModelNumber(Seller.TEKNOSA, modelNumber);
            if (inDB != null && !inDB.equals(product))
                System.out.println(productService.saveProduct(product));
            else if (inDB == null)
                System.out.println(productService.saveProduct(product));
        }
    }

    public void scrapeProducts() throws IOException {
        for (Product p : vatanService.getProducts()) {
            scrapeProductByModelNumber(p.getModelNumber());
        }
    }
}