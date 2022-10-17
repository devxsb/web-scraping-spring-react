import React, {useEffect, useState} from 'react';
import ProductService from "../service/ProductService";
import {useParams} from "react-router-dom";
import {Column, DataTable} from "primereact";
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import {Button} from "primereact/button";

const ProductDetails = () => {
    const [products, setProducts] = useState([])
    const [product] = useState([])
    const productService = new ProductService()
    const {name} = useParams()

    useEffect(() => {
        productService.getProductsByName(name).then(res => {
            setProducts(res.data)
            product.push(res.data[0])
        })
    }, [])

    return (
        <>
            <BreadCrumbDemo val={product.length > 0 && product[0].modelNumber}/>
            <div className="col-10 m-auto">
                {product.length > 0 && <div className="product-list-item">
                    <img src={product[0].img} alt={product[0].id} className="w-2"/>
                    <div className="product-list-detail">
                        <div className="product-name">{product[0].name.replaceAll("-"," ")}</div>
                    </div>
                    <div className="flex col-12 justify-content-center">
                        {products.map(store => (
                            <div className="col-3" key={store.id}>
                                <h5>{store.price} TL</h5>
                                <a href={store.link} target="blank">
                                    <Button
                                        className="border-bluegray-100 bg-white p-button-raised w-5 align-right">
                                        <img src={"http://localhost:3000/" + store.seller + ".png"}
                                             className="w-6 m-auto" alt={store.id}/>
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                    <DataTable value={product} responsiveLayout="scroll" className={"mt-3"}>
                        <Column field="brand" header="Brand"></Column>
                        <Column field="processorBrand" header="Processor Brand"></Column>
                        <Column field="processorTechnology" header="Processor Technology"></Column>
                        <Column field="operatingSystem" header="Operating System"></Column>
                        <Column field="diskType" header="Disk Type"></Column>
                        <Column field="diskCapacity" header="Disk Capacity"></Column>
                        <Column field="ram" header="Ram"></Column>
                        <Column field="screenSize" header="Screen Size"></Column>
                    </DataTable>
                </div>}
            </div>
        </>
    );
};

export default ProductDetails;