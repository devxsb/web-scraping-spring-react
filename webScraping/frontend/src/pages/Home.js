import React from 'react';
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import DataViewDemo from "../layouts/DataViewDemo";
import MultiSelectDemo from "../layouts/MultiSelectDemo";

const Home = () => {
    return (
        <div>
            <BreadCrumbDemo/>
            <div className="flex col-11 m-auto">
                <MultiSelectDemo/>
                <DataViewDemo/>
            </div>
        </div>
    );
};

export default Home;