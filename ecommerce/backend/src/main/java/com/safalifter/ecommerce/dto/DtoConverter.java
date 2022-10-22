package com.safalifter.ecommerce.dto;

import com.safalifter.ecommerce.model.Product;
import org.springframework.stereotype.Component;

@Component
public class DtoConverter {
    public Product convert(ProductRequestDto request) {
        return Product.builder()
                .brand(request.getBrand())
                .diskCapacity(request.getDiskCapacity())
                .diskType(request.getDiskType())
                .img(request.getImg())
                .modelNumber(request.getModelNumber())
                .name(request.getName())
                .operatingSystem(request.getOperatingSystem())
                .processorTechnology(request.getProcessorTechnology())
                .price(request.getPrice())
                .ram(request.getRam())
                .screenSize(request.getScreenSize()).build();
    }
}
