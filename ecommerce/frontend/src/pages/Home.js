import React from 'react';
import DataViewDemo from '../layouts/DataViewDemo'
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import CheckboxDemo from "../layouts/CheckBoxDemo";
import DataTableCrudDemo from "../layouts/DataTableCrudDemo"
import {useSelector} from "react-redux";

const Home = () => {
    const currentUser = useSelector(state => state.authSlice.currentUser)
    return (
        <>
            {
                currentUser ?
                    <div>
                        <BreadCrumbDemo/>
                        <DataTableCrudDemo/>
                    </div> :
                    <div>
                        <BreadCrumbDemo/>
                        <div className="flex col-11 m-auto">
                            <CheckboxDemo/>
                            <DataViewDemo/>
                        </div>
                    </div>
            }
        </>
    );
};

export default Home;