import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, {useEffect, useState} from 'react';
import {DataView} from 'primereact/dataview';
import {Dropdown} from 'primereact/dropdown';
import ProductService from '../service/ProductService';
import './DataViewDemo.css';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const DataViewDemo = () => {
    const [products, setProducts] = useState([]);
    const [productsByModelNumber, setProductsByModelNumber] = useState(new Map())

    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];

    const productService = new ProductService();
    let [page, setPage] = useState(0)
    let [size, setSize] = useState(8)
    useEffect(() => {
        productService.getProducts(page, size).then(async res => {
            setProducts(res.data)
            const cache = new Map()
            for await (const i of res.data.content) {
                const j = await productService.getProductsByModelNumber(i.modelNumber)
                cache.set(i.modelNumber, j.data)
            }
            setProductsByModelNumber(cache)
        })
    }, [page, size]);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }
    const getProductsByModelNumber = (modelNumber) => {
        return productsByModelNumber.get(modelNumber)
    }
    let navigate = useNavigate()
    const renderListItem = (data) => {
        const productsByMN = getProductsByModelNumber(data.modelNumber)
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={data.img} alt={data.id} style={{height: "130px"}}/>
                    <div className="product-list-detail">
                        <div className="product-name"
                             onClick={() => navigate('/product/' + data.name)}
                             style={{cursor: 'pointer'}}>{data.name.replaceAll("-", " ")}
                        </div>
                        {productsByMN ? (
                                <div className="flex col-12">
                                    {productsByMN.map(store => (
                                        <div className="col-4" key={store.id}>
                                            <div className="product-price">{store.price} TL</div>
                                            <a href={store.link} target="blank">
                                                <Button
                                                    className="border-bluegray-100 bg-white p-button-raised w-5 align-right">
                                                    <img src={store.seller + ".png"} className="w-9 m-auto" alt={store.id}/>
                                                </Button>
                                            </a>
                                        </div>
                                    ))}
                                </div>) :
                            <div style={{height: '92.5781px'}}/>
                        }
                    </div>
                    <Button className="p-button-info p-button-sm"
                            onClick={() => navigate('/product/' + data.name)}>
                        Product details
                    </Button>
                </div>
            </div>
        );
    }

    const itemTemplate = (product) => {
        if (!product) {
            return;
        }
        return renderListItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price"
                              onChange={onSortChange}/>
                </div>
            </div>
        );
    }
    const header = renderHeader();
    return (
        <div className="dataview-demo col-10 ml-auto">
            <div className="card">
                <DataView value={products.content} header={header}
                          itemTemplate={itemTemplate} rows={size}
                          sortOrder={sortOrder} sortField={sortField}/>
            </div>
            <div className="p-paginator p-component p-paginator-bottom">
                <button type="button" className="p-paginator-first p-paginator-element p-link" disabled={products.first}
                        aria-label="First Page">
                    <span className="p-paginator-icon pi pi-angle-double-left"
                          onClick={() => setPage(0)}/>
                </button>
                <button type="button" className="p-paginator-prev p-paginator-element p-link" disabled={products.first}
                        aria-label="Previous Page" onClick={() => setPage(page - 1)}><span
                    className="p-paginator-icon pi pi-angle-left"/>
                </button>
                <span className="p-paginator-pages">
                    <button type="button"
                            className="p-paginator-page p-paginator-element p-link p-paginator-page-start p-highlight"
                            aria-label="Page 2">{page + 1}
                    </button>
                </span>
                <button type="button" className="p-paginator-next p-paginator-element p-link" aria-label="Next Page"
                        disabled={products.last} onClick={() => setPage(page + 1)}>
                    <span className="p-paginator-icon pi pi-angle-right"/>
                </button>
                <button type="button" className="p-paginator-last p-paginator-element p-link" aria-label="Last Page"
                        disabled={products.last} onClick={() => setPage(products.totalPages - 1)}>
                    <span className="p-paginator-icon pi pi-angle-double-right"/>
                </button>
            </div>
        </div>
    );
}
export default DataViewDemo