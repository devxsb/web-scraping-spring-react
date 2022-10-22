package com.safalifter.ecommerce.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ProductRequestDto {
    private Long id;

    @NotBlank
    private String brand, diskCapacity, diskType, img, name,
            operatingSystem, processorTechnology, ram, screenSize;

    private String modelNumber;

    @NotNull
    private Double price;

}
