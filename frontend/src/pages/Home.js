import React from 'react';
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import DataViewDemo from "../layouts/DataViewDemo";
import CheckboxDemo from "../layouts/CheckboxDemo";

const Home = () => {
    return (
        <div>
            <BreadCrumbDemo/>
            <div className="flex col-10 m-auto">
                <CheckboxDemo/>
                <DataViewDemo/>
            </div>
        </div>
    );
};

export default Home;