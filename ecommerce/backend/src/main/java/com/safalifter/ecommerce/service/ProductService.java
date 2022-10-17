package com.safalifter.ecommerce.service;

import com.safalifter.ecommerce.model.Product;
import com.safalifter.ecommerce.repository.ProductRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void scrapeProductByPage(int page) throws IOException {
        final String url = "https://www.vatanbilgisayar.com/laptop/?page=" + page;
        final Document document = Jsoup.connect(url).get();
        final Elements body = document.select("div.wrapper-product-main");
        for (Element e : body.select("div.product-list.product-list--list-page")) {
            final String link = "https://www.vatanbilgisayar.com" +
                    e.select("a.product-list__link").attr("href");
            final Document doc = Jsoup.connect(link).get();
            final Elements details = doc.select("div.global-container");
            final Elements table = details.select("table.product-table");
            final String modelNumber = doc.select("div.product-list__product-code.pull-left.product-id").attr("data-productcode");
            final String brand = doc.select("a.bradcrumb-item").get(3).text();
            final String price = doc.select("div.d-cell.col-sm-3.col-xs-3.short-price span.product-list__price").text();
            final Double score = Double.parseDouble(doc.select("strong#averageRankNum").text());
            final String name = doc.select("h1.product-list__product-name").text();
            final String img = e.select("img.lazyimg").attr("data-src");
            final Product product = new Product();
            for (Element tr : table.select("tr")) {
                for (Element td : tr.select("td")) {
                    if (td.text().equals("Ram (Sistem Belleği)")) {
                        product.setRam(tr.child(1).text());
                    }
                    if (td.text().equals("Ekran Boyutu")) {
                        product.setScreenSize(tr.child(1).text());
                    }
                    if (td.text().equals("İşletim Sistemi")) {
                        product.setOperatingSystem(tr.child(1).text());
                    }
                    if (td.text().equals("İşlemci Markası")) {
                        product.setProcessorBrand(tr.child(1).child(0).text());
                    }
                    if (td.text().equals("İşlemci Teknolojisi")) {
                        product.setProcessorTechnology(tr.child(1).text());
                    }
                    if (td.text().equals("Disk Türü")) {
                        product.setDiskType(tr.child(1).text());
                    }
                    if (td.text().equals("Disk Kapasitesi")) {
                        product.setDiskCapacity(tr.child(1).child(0).text());
                    }
                }
            }
            product.setModelNumber(modelNumber);
            product.setBrand(brand);
            product.setPrice(price);
            product.setScore(score);
            product.setName(name
                    .replaceAll(" ", "-")
                    .replaceAll("/", "-"));
            product.setImg(img);
            System.out.println(productRepository.save(product));
        }
    }

    //    @Bean
    public void scrapeProducts() throws IOException {
        int i = 1;
        do {
            scrapeProductByPage(i);
            i++;
        } while (i < 3); // only 1 page for test
    }
}
