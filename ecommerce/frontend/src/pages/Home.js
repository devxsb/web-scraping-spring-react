import React from 'react';
import DataViewDemo from '../layouts/DataViewDemo'
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import DataTableCrudDemo from "../layouts/DataTableCrudDemo"
import {useSelector} from "react-redux";
import MultiSelectDemo from "../layouts/MultiSelectDemo";

const Home = () => {
    const currentUser = useSelector(state => state.reduxSlice.currentUser)
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
                            <MultiSelectDemo/>
                            <DataViewDemo/>
                        </div>
                    </div>
            }
        </>
    );
};

export default Home;