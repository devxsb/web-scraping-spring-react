import React, {useEffect, useState} from 'react';
import ProductService from "../service/ProductService";
import {useParams} from "react-router-dom";
import {Column, DataTable} from "primereact";
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import {Rating} from "primereact/rating";

const ProductDetails = () => {
    const [products, setProducts] = useState([])
    const productService = new ProductService()
    const {name} = useParams()

    useEffect(() => {
        productService.getProductByName(name).then(res => {
            setProducts(res.data)
        })
    }, [])

    let priceFormat = Intl.NumberFormat('tr-TR');
    return (
        <>
            <BreadCrumbDemo val={products.length > 0 && products[0].modelNumber}/>
            <div className="col-10 m-auto">
                {products.length > 0 &&
                    <div className="product-list-item">
                        <img src={products[0].img} alt={products[0].id} className="w-2"/>
                        <div className="product-list-detail">
                            <div className="product-name">{products[0].name.replaceAll("-", " ")}</div>
                        </div>
                        <h5>{priceFormat.format(products[0].price)} TL</h5>
                        <Rating value={products[0].score} className="product-score mx-auto justify-content-center"
                                readOnly
                                cancel={false}></Rating>
                        <DataTable value={products} responsiveLayout="scroll" className={"mt-3"}>
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