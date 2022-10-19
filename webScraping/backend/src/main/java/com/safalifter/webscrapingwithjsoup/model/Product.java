package com.safalifter.webscrapingwithjsoup.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;
import java.util.UUID;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Product {
    @Id
    private UUID id;
    private String modelNumber;
    private String brand;
    private Double price;
    private String ram;
    private String screenSize;
    private String operatingSystem;
    private String processorBrand;
    private String processorTechnology;
    private String diskType;
    private String diskCapacity;
    private Double score;
    private Seller seller;
    private String name;
    private String link;
    private String img;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(modelNumber, product.modelNumber) &&
                Objects.equals(brand, product.brand) &&
                Objects.equals(price, product.price) &&
                Objects.equals(ram, product.ram) &&
                Objects.equals(screenSize, product.screenSize) &&
                Objects.equals(operatingSystem, product.operatingSystem) &&
                Objects.equals(processorBrand, product.processorBrand) &&
                Objects.equals(processorTechnology, product.processorTechnology) &&
                Objects.equals(diskType, product.diskType) &&
                Objects.equals(diskCapacity, product.diskCapacity) &&
                Objects.equals(score, product.score) &&
                Objects.equals(seller, product.seller) &&
                Objects.equals(name, product.name) &&
                Objects.equals(link, product.link) &&
                Objects.equals(img, product.getImg());
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                id,
                modelNumber,
                brand,
                price,
                ram,
                screenSize,
                operatingSystem,
                processorBrand,
                processorTechnology,
                diskType,
                diskCapacity,
                score,
                seller,
                name,
                link,
                img);
    }
}