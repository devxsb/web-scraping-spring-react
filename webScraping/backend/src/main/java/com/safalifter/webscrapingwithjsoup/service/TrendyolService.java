package com.safalifter.webscrapingwithjsoup.service;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class TrendyolService {
    private final ProductService productService;
    private final VatanService vatanService;

    public TrendyolService(ProductService productService, VatanService vatanService) {
        this.productService = productService;
        this.vatanService = vatanService;
    }

    public void scrapeProductByModelNumber(String modelNumber) {
        final String url =
                "https://www.trendyol.com/sr?q=" + modelNumber;
        try {
            final Document document = Jsoup.connect(url).get();
            final String link = "https://www.trendyol.com/" +
                    document.select("div.p-card-chldrn-cntnr.card-border a")
                            .attr("href");
            final Document doc = Jsoup.connect(link).get();
            final Element e = doc.select("div.product-container").first();
            if (e != null &&
                    e.select("h1.pr-new-br span").text().contains(modelNumber)) {
                final Double price = Double.parseDouble(e.select("div.product-price-container span.prc-dsc").text()
                        .split(" ")[0]
                        .replace(".", "")
                        .replace(",", "."));
                final Double score; // will be solved
                final String img = e.select("img").attr("src");
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
                        .seller(Seller.TRENDYOL)
                        .name(prd.getName())
                        .link(link)
                        .img(img).build();
                Product inDB = productService.getProductsBySellerAndModelNumber(Seller.TRENDYOL, modelNumber);
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