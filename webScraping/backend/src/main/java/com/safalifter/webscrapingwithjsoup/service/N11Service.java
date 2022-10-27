package com.safalifter.webscrapingwithjsoup.service;

import com.safalifter.webscrapingwithjsoup.model.Product;
import com.safalifter.webscrapingwithjsoup.model.Seller;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class N11Service {
    private final ProductService productService;
    private final VatanService vatanService;

    public N11Service(ProductService productService, VatanService vatanService) {
        this.productService = productService;
        this.vatanService = vatanService;
    }

    public void scrapeProductByModelNumber(String modelNumber) {
        final String url =
                "https://www.n11.com/bilgisayar/dizustu-bilgisayar?q=" + modelNumber;
        try {
            final Document document = Jsoup.connect(url).get();
            final Element e = document.select("div.columnContent").first();
            if (e != null &&
                    e.select("h3.productName").text().contains(modelNumber)) {
                final Double price = Double.parseDouble(e.select("span.newPrice.cPoint.priceEventClick").text()
                        .split(" ")[0]
                        .replace(".", "")
                        .replace(",", "."));
                final String link = e.select("a.plink").attr("href");
                final Document doc = Jsoup.connect(link).get();
                final Double score = Double.parseDouble(doc.select("div.ratingCont  strong").text()
                        .split(" ")[0]);
                final String img = e.select("img.lazy.cardImage").attr("data-src");
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
                        .score(score)
                        .seller(Seller.N11)
                        .name(prd.getName())
                        .link(link)
                        .img(img).build();
                Product inDB = productService.getProductsBySellerAndModelNumber(Seller.N11, modelNumber);
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