import React from 'react';
import DataViewDemo from '../layouts/DataViewDemo'
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import CheckboxDemo from "../layouts/CheckBoxDemo";

const Home = () => {
    return (
        <div>
            <BreadCrumbDemo/>
            <div className="flex col-11 m-auto">
                <CheckboxDemo/>
                <div className="col-10 m-auto">
                    <DataViewDemo/>
                </div>
            </div>
        </div>
    );
};

export default Home;