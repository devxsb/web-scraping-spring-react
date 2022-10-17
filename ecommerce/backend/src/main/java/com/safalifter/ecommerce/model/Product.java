package com.safalifter.ecommerce.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
    private String name;
    private String img;
}