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
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const DataViewDemo = () => {
    const [products, setProducts] = useState(null);

    const productService = new ProductService();
    const filter = useSelector(state => state.reduxSlice.filter)

    const [page, setPage] = useState(0)
    const [sortValue, setSortValue] = useState(null)
    const [renderFilter, setRenderFilter] = useState(null)
    const size = 9

    useEffect(() => {
        {
            filter ?
                productService.getProductsByFilter(filter, page, size).then(res => setProducts(res.data)) :
                renderFilter ?
                    productService.getProductsBySearch(renderFilter, page, size).then(res => setProducts(res.data)) :
                    productService.getProducts(page, size, sortValue).then(res => setProducts(res.data));
        }
    }, [page, sortValue, renderFilter, filter]);

    const sortOptions = [
        {label: 'Price High to Low', value: '0'},
        {label: 'Price Low to High', value: '1'},
        {label: 'Score High to Low', value: '2'},
        {label: 'Score Low to High', value: '3'},
    ];
    const onSortChange = (event) => {
        const value = event.value;
        switch (value) {
            case '0' :
                setSortValue("price,desc")
                break;
            case '1':
                setSortValue("price,asc")
                break;
            case '2' :
                setSortValue("score,desc")
                break;
            case '3':
                setSortValue("score,asc")
                break;
        }
    }
    let navigate = useNavigate()
    let priceFormat = Intl.NumberFormat('tr-TR');
    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-content">
                        <img src={data.img} alt={data.id}/>
                        <div className="product-name"
                             onClick={() => navigate('/product/' + data.name)}
                             style={{cursor: 'pointer'}}>{data.name.replaceAll("-", " ")}
                        </div>
                        <Rating value={data.score} className="product-score" readOnly cancel={false}></Rating>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">{priceFormat.format(data.price)} TL</span>
                        <Button icon="pi pi-shopping-cart"></Button>
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
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    }
    const onSubmitGlobalFilter = (e) => {
        setRenderFilter(globalFilterValue)
        setGlobalFilterValue('')
    }
    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} optionLabel="label" placeholder="Sorting"
                              onChange={onSortChange} className="w-4"/>
                </div>
                <div className="col-6" style={{textAlign: "right"}}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        onSubmitGlobalFilter()
                    }}>
                        <span className="p-input-icon-left">
                            <i className="pi pi-search"/>
                            <InputText type="search" value={globalFilterValue}
                                       onChange={onGlobalFilterChange} placeholder="Search"/>
                        </span>
                    </form>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="dataview-demo col-10 ml-auto">
            <div className="card">
                <DataView value={products && products.content} layout="grid" header={header}
                          itemTemplate={itemTemplate} rows={size}/>
            </div>
            {products && <div className="p-paginator p-component p-paginator-bottom">
                <button type="button" className="p-paginator-first p-paginator-element p-link"
                        disabled={products.first}
                        aria-label="First Page">
                    <span className="p-paginator-icon pi pi-angle-double-left"
                          onClick={() => setPage(0)}/>
                </button>
                <button type="button" className="p-paginator-prev p-paginator-element p-link"
                        disabled={products.first}
                        aria-label="Previous Page" onClick={() => setPage(page - 1)}>
                    <span className="p-paginator-icon pi pi-angle-left"/>
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
            </div>}
        </div>
    );
}
export default DataViewDemo
