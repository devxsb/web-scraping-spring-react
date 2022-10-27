package com.safalifter.webscrapingwithjsoup.service;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class TeknosaService {
    private final ProductService productService;
    private final VatanService vatanService;

    public TeknosaService(ProductService productService, VatanService vatanService) {
        this.productService = productService;
        this.vatanService = vatanService;
    }

    public void scrapeProductByModelNumber(String modelNumber) {
        final String url =
                "https://www.teknosa.com/arama/?s=" + modelNumber;
        try {
            final Document document = Jsoup.connect(url).get();
            final Element e = document.select("div.prd ").first();
            if (e != null &&
                    e.select("h3.prd-title.prd-title-style").text().contains(modelNumber)) {
                final Double price = Double.parseDouble(e.select("div.prd-prc2 span").text()
                        .split(" ")[0]
                        .replace(".", ""));
                final Double score; // will be solved
                final String link = "https://www.teknosa.com/" + e.select("a.prd-link").attr("href");
                final String img = e.select("div.prd-media img").attr("data-srcset");
                final Product prd = vatanService.getProductByModelNumber(modelNumber);
                final Product product = Product.builder()
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
                        .score(prd.getScore())
                        .seller(Seller.TEKNOSA)
                        .name(prd.getName())
                        .link(link)
                        .img(img).build();
                Product inDB = productService.getProductsBySellerAndModelNumber(Seller.TEKNOSA, modelNumber);
                if (inDB != null && !inDB.equals(product)) {
                    product.setId(inDB.getId());
                    System.out.println(productService.saveProduct(product));
                } else if (inDB == null)
                    System.out.println(productService.saveProduct(product));
            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }

    public void scrapeProducts() {
        for (Product p : vatanService.getProducts()) {
            scrapeProductByModelNumber(p.getModelNumber());
        }
    }
}