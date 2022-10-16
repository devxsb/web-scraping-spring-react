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

    useEffect(() => {
        productService.getProducts().then(async res => {
            setProducts(res.data)
            const cache = new Map()
            for await (const i of res.data) {
                const j = await productService.getProductsByModelNumber(i.modelNumber)
                cache.set(i.modelNumber, j.data)
            }
            setProductsByModelNumber(cache)
        })
    }, []);

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

    const renderListItem = (data) => {
        const productsByMN = getProductsByModelNumber(data.modelNumber)
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={data.img} alt={data.id} style={{width: 150, height: 150}}/>
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        {productsByMN ? (
                                <div className="flex col-12">
                                    {productsByMN.map(store => (
                                        <div className="col-4" key={store.id}>
                                            <h5>{store.price} TL</h5>
                                            <a href={store.link} target="blank">
                                                <Button
                                                    className="border-bluegray-100 bg-white p-button-raised w-5 align-right">
                                                    <img src={store.seller + ".png"} className="w-8 m-auto" alt={store.id}/>
                                                </Button>
                                            </a>
                                        </div>
                                    ))}
                                </div>) :
                            <div style={{height: '135.289px'}}/>
                        }
                    </div>
                    <Button className="p-button-info">Product details</Button>
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
                <DataView value={products} header={header}
                          itemTemplate={itemTemplate} paginator rows={8}
                          sortOrder={sortOrder} sortField={sortField}/>
            </div>
        </div>
    );
}
export default DataViewDemo