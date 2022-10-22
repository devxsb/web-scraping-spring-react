package com.safalifter.ecommerce.model;

import lombok.*;

import javax.persistence.*;
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
    @Column(unique = true)
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
    private String name;
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
                Objects.equals(name, product.name) &&
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
                name,
                img);
    }
}