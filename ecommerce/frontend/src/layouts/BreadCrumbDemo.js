import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';

const BreadCrumbDemo = ({val}) => {
    let items;
    {
        val ? items = [
            {label: 'Computer', url: '/'},
            {label: 'Notebook', url: '/'},
            {label: 'Laptop', url: '/'},
            {label: val}] : items = [
            {label: 'Computer', url: '/'},
            {label: 'Notebook', url: '/'},
            {label: 'Laptop', url: '/'}]
    }

    const home = {icon: 'pi pi-home', url: '/'}
    return (
        <div>
            <div className="card">
                <BreadCrumb model={items} home={home}/>
            </div>
        </div>
    );
}
export default BreadCrumbDemo
