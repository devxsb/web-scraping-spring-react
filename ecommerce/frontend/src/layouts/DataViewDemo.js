import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import React, {useEffect, useState} from 'react';
import {DataView} from 'primereact/dataview';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import ProductService from '../service/ProductService';
import {Rating} from 'primereact/rating';
import './DataViewDemo.css';
import {InputText} from "primereact/inputtext";

const DataViewDemo = () => {
    const [products, setProducts] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(res => setProducts(res.data));
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
    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content">
                        <img src={data.img} alt={data.id}/>
                        <div className="product-name">{data.name}</div>
                        <Rating value={data.score} className="product-score" readOnly cancel={false}></Rating>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">{data.price} TL</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart"></Button>
                    </div>
                </div>
            </div>
        );
    }
    const itemTemplate = (product) => {
        if (!product) {
            return;
        }
        return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price"
                              onChange={onSortChange}/>
                </div>
                <div className="col-6" style={{textAlign: "right"}}>
                   <span className="p-input-icon-left">
                       <i className="pi pi-search"/>
                       <InputText type="search" placeholder="Search"/>
                    </span>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView value={products} layout="grid" header={header}
                          itemTemplate={itemTemplate} paginator rows={9}
                          sortOrder={sortOrder} sortField={sortField}/>
            </div>
        </div>
    );
}
export default DataViewDemo
