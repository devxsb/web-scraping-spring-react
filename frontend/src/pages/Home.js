import React from 'react';
import BreadCrumbDemo from "../layouts/BreadCrumbDemo";
import DataViewDemo from "../layouts/DataViewDemo";
import Filter from "../layouts/Filter";

const Home = () => {
    return (
        <div>
            <BreadCrumbDemo/>
            <div className="flex col-11 m-auto">
                <Filter/>
                <DataViewDemo/>
            </div>
        </div>
    );
};

export default Home;