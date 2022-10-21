import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React from 'react';
import {BreadCrumb} from 'primereact/breadcrumb';
import {useNavigate} from "react-router";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/authSlice";

const BreadCrumbDemo = ({val}) => {
    const currentUser = useSelector(state => state.authSlice.currentUser)
    const dispatch = useDispatch()
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
    let navigate = useNavigate()
    return (
        <div className="card relative">
            <BreadCrumb model={items} home={home}/>
            {currentUser ?
                <Button className="absolute top-0 right-0 p-button-text p-button-plain"
                        onClick={() => dispatch(logout())}>
                    <i className="pi pi-fw pi-power-off"/>
                </Button> :
                <Button className="absolute top-0 right-0 p-button-text p-button-plain"
                        onClick={() => navigate('/login')}>
                    <i className="pi pi-fw pi-user"/>
                </Button>}
        </div>
    );
}
export default BreadCrumbDemo
