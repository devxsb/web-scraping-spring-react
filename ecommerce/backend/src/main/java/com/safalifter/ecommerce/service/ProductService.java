package com.safalifter.ecommerce.service;

import com.safalifter.ecommerce.dto.DtoConverter;
import com.safalifter.ecommerce.dto.ProductRequestDto;
import com.safalifter.ecommerce.exc.NotFoundException;
import com.safalifter.ecommerce.model.Product;
import com.safalifter.ecommerce.repository.ProductRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final DtoConverter dtoConverter;

    public ProductService(ProductRepository productRepository, DtoConverter dtoConverter) {
        this.productRepository = productRepository;
        this.dtoConverter = dtoConverter;
    }

    public Page<Product> getProducts(Pageable page) {
        return productRepository.findAll(page);
    }

    public Product createProduct(ProductRequestDto request) {
        return productRepository.save(dtoConverter.convert(request));
    }

    public Product updateProduct(ProductRequestDto request) {
        Product inDB = productRepository.findById(request.getId()).orElseThrow(() ->
                new NotFoundException("Product not found"));
        inDB.setBrand(request.getBrand());
        inDB.setDiskCapacity(request.getDiskCapacity());
        inDB.setDiskType(request.getDiskType());
        inDB.setImg(request.getImg());
        inDB.setModelNumber(request.getModelNumber());
        inDB.setName(request.getName());
        inDB.setOperatingSystem(request.getOperatingSystem());
        inDB.setProcessorTechnology(request.getProcessorTechnology());
        inDB.setRam(request.getRam());
        inDB.setScreenSize(request.getScreenSize());
        inDB.setPrice(request.getPrice());
        return productRepository.save(inDB);
    }

    public String deleteProduct(Long id) {
        productRepository.deleteById(id);
        return "Product successfully deleted";
    }

    public List<Product> getProductsByName(String name) {
        return productRepository.findProductsByName(name);
    }

    public Object getProductsBySearch(String searchValue, Pageable page) {
        if (productRepository.findProductsByNameContainsIgnoreCase(
                searchValue.replaceAll(" ", "-"), page).getTotalElements() > 0)
            return productRepository.findProductsByNameContainsIgnoreCase(
                    searchValue.replaceAll(" ", "-"), page);
        else if (productRepository.findProductByModelNumber(
                searchValue) != null)
            return productRepository.findProductByModelNumber(
                    searchValue);
        else if (productRepository.findProductsByBrandContainsIgnoreCase(
                searchValue.replaceAll(" ", "-"), page).getTotalElements() > 0)
            return productRepository.findProductsByBrandContainsIgnoreCase(
                    searchValue.replaceAll(" ", "-"), page);
        else
            System.err.println("Search not found: " + searchValue);
        return null;
    }

    public Page<Product> getProductsByFilter(String value, Pageable page) {
        String[] filter = value.toLowerCase().split("&");

        List<String> brandFilters = new ArrayList<>();
        List<String> processorBrandFilters = new ArrayList<>();
        List<String> processorTechnologyFilters = new ArrayList<>();
        List<String> operatingSystemFilters = new ArrayList<>();
        List<String> screenSizeFilters = new ArrayList<>();
        List<String> diskFilters = new ArrayList<>();
        List<String> ramFilters = new ArrayList<>();

        for (String x : filter) {
            String[] y = x.replace("-", " ").split("=");
            if ("brand".equals(y[0])) {
                brandFilters.add(y[1]);
            } else if ("processorbrand".equals(y[0])) {
                processorBrandFilters.add(y[1]);
            } else if ("processortechnology".equals(y[0])) {
                processorTechnologyFilters.add(y[1]);
            } else if ("operatingsystem".equals(y[0])) {
                operatingSystemFilters.add(y[1]);
            } else if ("screensize".equals(y[0])) {
                screenSizeFilters.add(y[1]);
            } else if ("disk".equals(y[0])) {
                diskFilters.add(y[1]);
            } else if ("ram".equals(y[0])) {
                ramFilters.add(y[1]);
            }
        }
        return productRepository.findProductsByFilter(brandFilters, processorBrandFilters, processorTechnologyFilters, operatingSystemFilters, screenSizeFilters, diskFilters, ramFilters, page);
    }

    public void scrapeProductByPage(int page) {
        final String url = "https://www.vatanbilgisayar.com/laptop/?page=" + page;
        try {
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
                final Double price = Double.parseDouble(doc.select("div.d-cell.col-sm-3.col-xs-3.short-price span.product-list__price").text()
                        .replace(".", ""));
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
                Product inDB = productRepository.findProductByModelNumber(modelNumber);
                if (inDB != null && !inDB.equals(product)) {
                    product.setId(inDB.getId());
                    System.out.println(productRepository.save(product));
                } else if (inDB == null)
                    System.out.println(productRepository.save(product));
            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }

    @Bean
    public void scrapeProducts() {
        int i = 1;
        do {
            scrapeProductByPage(i);
            i++;
        } while (i < 10); // only 1 page for test
    }
}
