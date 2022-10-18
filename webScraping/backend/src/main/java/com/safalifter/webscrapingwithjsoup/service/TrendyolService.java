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
public class TrendyolService {
    private final ProductService productService;
    private final VatanService vatanService;

    public TrendyolService(ProductService productService, VatanService vatanService) {
        this.productService = productService;
        this.vatanService = vatanService;
    }

    public void scrapeProductByModelNumber(String modelNumber) throws IOException {
        final String url =
                "https://www.trendyol.com/sr?q=" + modelNumber;
        final Document document = Jsoup.connect(url).get();
        final String link = "https://www.trendyol.com/" +
                document.select("div.p-card-chldrn-cntnr.card-border a")
                        .attr("href");
        final Document doc = Jsoup.connect(link).get();
        final Element e = doc.select("div.product-container").first();
        if (e != null &&
                e.select("h1.pr-new-br span").text().contains(modelNumber)) {
            final String price = e.select("div.product-price-container span.prc-dsc").text().split(" ")[0];
            final Double score = 0.0; // will be solved
            final String img = e.select("img").attr("src");
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
                    .seller(Seller.TRENDYOL)
                    .name(prd.getName())
                    .link(link)
                    .img(img).build();
            Product inDB = productService.getProductsBySellerAndModelNumber(Seller.TRENDYOL, modelNumber);
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