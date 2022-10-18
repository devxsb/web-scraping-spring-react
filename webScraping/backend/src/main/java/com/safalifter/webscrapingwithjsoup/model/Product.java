package com.safalifter.webscrapingwithjsoup.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String modelNumber;
    private String brand;
    private String price;
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
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
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
        return getClass().hashCode();
    }
}
