import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import ProductService from '../service/ProductService';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './DataTableDemo.css';

const DataTableCrudDemo = () => {
    let emptyProduct = {
        id: null,
        brand: '',
        diskCapacity: '',
        diskType: '',
        img: '',
        modelNumber: '',
        name: '',
        operatingSystem: '',
        price: null,
        processorTechnology: '',
        ram: '',
        screenSize: '',
    };
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new ProductService();

    const [page, setPage] = useState(0)
    const [renderFilter, setRenderFilter] = useState(null)
    const [render, setRender] = useState(false)
    const size = 6

    useEffect(() => {
        productService.getProducts(page, size, renderFilter).then(res => setProducts(res.data));
    }, [page, renderFilter, render]);

    let priceFormat = Intl.NumberFormat('tr-TR');

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setProduct(emptyProduct)
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);
        if (!editMode) {
            productService.createProduct(product).then(res => {
                products.content.unshift(res.data)
                setProductDialog(false);
                setProduct(emptyProduct);
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            });
        } else {
            productService.updateProduct(product).then(() => {
                setRender(!render)
                setEditMode(false)
                setProductDialog(false);
                setProduct(emptyProduct);
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            })
        }
    }

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
        setEditMode(true)
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        productService.deleteProduct(product.id).then(() => {
            setRender(!render)
            setDeleteProductDialog(false)
            setProduct(emptyProduct)
            toast.current.show({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        })
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2 p-button-sm" onClick={openNew}/>
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.img}
                    alt={rowData.img} className="product-image"/>
    }

    const priceBodyTemplate = (rowData) => {
        return priceFormat.format(rowData.price) + " TL";
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2"
                        onClick={() => editProduct(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                        onClick={() => confirmDeleteProduct(rowData)}/>
            </React.Fragment>
        );
    }

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    }
    const onSubmitGlobalFilter = () => {
        productService.getProductsBySearch(globalFilterValue).then(async res => {
            setProducts(res.data)
            setRenderFilter(globalFilterValue)
            setGlobalFilterValue('')
        })
    }

    const header = (
        <div className="table-header">
            {leftToolbarTemplate()}
            <div style={{textAlign: "right"}}>
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
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct}/>
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct}/>
        </React.Fragment>
    );
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast}/>
            <div className="card col-11 m-auto">
                <DataTable ref={dt} value={products ? products.content : null} selection={selectedProducts}
                           onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="id" rows={size}
                           header={header} responsiveLayout="scroll">
                    <Column field="img" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="modelNumber" header="Model Number"></Column>
                    <Column field="brand" header="Brand"></Column>
                    <Column field="processorTechnology" header="Processor"></Column>
                    <Column field="operatingSystem" header="Operating System"></Column>
                    <Column field="screenSize" header="Screen Size"></Column>
                    <Column field="diskCapacity" header="Disk (SSD)"></Column>
                    <Column field="ram" header="Ram"></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
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
                    <button type="button" className="p-paginator-next p-paginator-element p-link"
                            aria-label="Next Page"
                            disabled={products.last} onClick={() => setPage(page + 1)}>
                        <span className="p-paginator-icon pi pi-angle-right"/>
                    </button>
                    <button type="button" className="p-paginator-last p-paginator-element p-link"
                            aria-label="Last Page"
                            disabled={products.last} onClick={() => setPage(products.totalPages - 1)}>
                        <span className="p-paginator-icon pi pi-angle-double-right"/>
                    </button>
                </div>}
            </div>

            <Dialog visible={productDialog} style={{height: '625px'}} header="Product Details" modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required
                               autoFocus className={classNames({'p-invalid': submitted && !product.name})}/>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="modelNumber">Model number</label>
                        <InputText id="modelNumber" value={product.modelNumber}
                                   onChange={(e) => onInputChange(e, 'modelNumber')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.modelNumber})}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="brand">Brand</label>
                        <InputText id="brand" value={product.brand} onChange={(e) => onInputChange(e, 'brand')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.brand})}/>
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="processor">Processor</label>
                        <InputText id="processor" value={product.processorTechnology}
                                   onChange={(e) => onInputChange(e, 'processorTechnology')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.processor})}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="operatingSystem">Operating system</label>
                        <InputText id="operatingSystem" value={product.operatingSystem}
                                   onChange={(e) => onInputChange(e, 'operatingSystem')} required
                                   autoFocus
                                   className={classNames({'p-invalid': submitted && !product.operatingSystem})}/>
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="diskCapacity">Disk Capacity</label>
                        <InputText id="diskCapacity" value={product.diskCapacity}
                                   onChange={(e) => onInputChange(e, 'diskCapacity')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.diskCapacity})}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="diskType">Disk Type</label>
                        <InputText id="diskType" value={product.diskType} onChange={(e) => onInputChange(e, 'diskType')}
                                   required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.diskType})}/>
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="ram">Ram</label>
                        <InputText id="ram" value={product.ram} onChange={(e) => onInputChange(e, 'ram')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.ram})}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="screenSize">Screen size</label>
                        <InputText id="screenSize" value={product.screenSize}
                                   onChange={(e) => onInputChange(e, 'screenSize')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.screenSize})}/>
                    </div>
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price}
                                     required
                                     autoFocus className={classNames({'p-invalid': submitted && !product.price})}
                                     onValueChange={(e) => onInputNumberChange(e, 'price')}/>
                    </div>
                    <div className="field col">
                        <label htmlFor="img">Image</label>
                        <InputText id="img" value={product.img} onChange={(e) => onInputChange(e, 'img')} required
                                   autoFocus className={classNames({'p-invalid': submitted && !product.img})}/>
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{width: '450px'}} header="Confirm" modal
                    footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {product && <span>Are you sure you want to delete <b>{product.modelNumber}</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}
export default DataTableCrudDemo