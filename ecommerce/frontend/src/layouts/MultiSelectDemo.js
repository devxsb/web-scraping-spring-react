import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, {useState} from 'react';
import {MultiSelect} from 'primereact/multiselect';
import './MultiSelectDemo.css';
import {Button} from "primereact/button";
import {useDispatch} from "react-redux";
import {filter as redux} from "../redux/reduxSlice";

const MultiSelectDemo = () => {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedProcessorBrand, setSelectedProcessorBrand] = useState(null);
    const [selectedProcessorTechnology, setSelectedProcessorTechnology] = useState(null);
    const [selectedOperatingSystem, setSelectedOperatingSystem] = useState(null);
    const [selectedScreenSize, setSelectedScreenSize] = useState(null);
    const [selectedDisk, setSelectedDisk] = useState(null);
    const [selectedRam, setSelectedRam] = useState(null);

    const brand = [
        {name: 'Acer', code: 'acer'},
        {name: 'Apple', code: 'apple'},
        {name: 'Asus', code: 'asus'},
        {name: 'Casper', code: 'casper'},
        {name: 'Dell', code: 'dell'},
        {name: 'Hometech', code: 'hometech'},
        {name: 'HP', code: 'hp'},
        {name: 'Huawei', code: 'huawei'},
        {name: 'Lenovo', code: 'lenovo'},
        {name: 'MSI', code: 'msi'}
    ];
    const processorBrand = [
        {name: 'Amd', code: 'amd'},
        {name: 'Apple', code: 'apple'},
        {name: 'Intel', code: 'intel'}
    ]
    const processorTechnology = [
        {name: 'Athlon', code: 'athlon'},
        {name: 'Celeron', code: 'celeron'},
        {name: 'Core i3', code: 'core-i3'},
        {name: 'Core i5', code: 'core-i5'},
        {name: 'Core i7', code: 'core-i7'},
        {name: 'M1', code: 'm1'},
        {name: 'M1 MAX', code: 'm1-max'},
        {name: 'M1 PRO', code: 'm1-pro'},
        {name: 'M2', code: 'm2'},
        {name: 'Ryzen™ 3', code: 'ryzen™-3'},
        {name: 'Ryzen™ 5', code: 'ryzen™-5'},
        {name: 'Ryzen™ 7', code: 'ryzen™-7'}
    ]
    const operatingSystem = [
        {name: 'FreeDOS', code: 'freedos'},
        {name: 'Windows 10', code: 'windows-10'},
        {name: 'Windows 11 Home 64', code: 'windows-11-home-64'},
        {name: 'macOS Big Sur', code: 'macOS-big-sur'},
        {name: 'macOS Monterey', code: 'macOS-monterey'}
    ]
    const screenSize = [
        {name: '13.3 inch', code: '13.3-inch'},
        {name: '14 inch', code: '14-inch'},
        {name: '15.6 inch', code: '15.6-inch'},
        {name: '16 inch', code: '16-inch'}
    ]
    const disk = [
        {name: '128 GB', code: '128-gb'},
        {name: '256 GB', code: '256-gb'},
        {name: '512 GB', code: '512-gb'},
        {name: '1 TB', code: '1-tb'}
    ]
    const ram = [
        {name: '4 GB', code: '4-gb'},
        {name: '8 GB', code: '8-gb'},
        {name: '16 GB', code: '16-gb'},
        {name: '32 GB', code: '32-gb'}
    ]

    const dispatch = useDispatch();

    let filter;
    if (selectedBrand) {
        selectedBrand.map(x => filter += '&brand=' + x.code.toString())
    }
    if (selectedProcessorBrand) {
        selectedProcessorBrand.map(x => filter += '&processorBrand=' + x.code.toString())
    }
    if (selectedProcessorTechnology) {
        selectedProcessorTechnology.map(x => filter += '&processorTechnology=' + x.code.toString())
    }
    if (selectedOperatingSystem) {
        selectedOperatingSystem.map(x => filter += '&operatingSystem=' + x.code.toString())
    }
    if (selectedScreenSize) {
        selectedScreenSize.map(x => filter += '&screenSize=' + x.code.toString())
    }
    if (selectedDisk) {
        selectedDisk.map(x => filter += '&disk=' + x.code.toString())
    }
    if (selectedRam) {
        selectedRam.map(x => filter += '&ram=' + x.code.toString())
    }
    const onFilterClick = () => {
        dispatch(redux(filter.toString().slice(10, filter.toString().length)))
    }

    return (
        <div className="multiselect-demo mt-3">
            <p className="header">Filter</p>
            <MultiSelect value={selectedBrand} options={brand}
                         onChange={(e) => setSelectedBrand(e.value)}
                         optionLabel="name" placeholder="Select a brand"
                         maxSelectedLabels={3}
                         className="filter"/>

            <MultiSelect value={selectedProcessorBrand} options={processorBrand}
                         onChange={(e) => setSelectedProcessorBrand(e.value)}
                         optionLabel="name" placeholder="Select a processor brand"
                         maxSelectedLabels={3}
                         className="filter"/>

            <MultiSelect value={selectedProcessorTechnology} options={processorTechnology}
                         onChange={(e) => setSelectedProcessorTechnology(e.value)}
                         optionLabel="name" placeholder="Select a processor technology"
                         maxSelectedLabels={3}
                         className="filter"/>

            <MultiSelect value={selectedOperatingSystem} options={operatingSystem}
                         onChange={(e) => setSelectedOperatingSystem(e.value)}
                         optionLabel="name" placeholder="Select a operating sys."
                         maxSelectedLabels={3}
                         className="filter"/>

            <MultiSelect value={selectedScreenSize} options={screenSize}
                         onChange={(e) => setSelectedScreenSize(e.value)}
                         optionLabel="name" placeholder="Select a screen size"
                         maxSelectedLabels={3}
                         className="filter"/>

            <MultiSelect value={selectedDisk} options={disk}
                         onChange={(e) => setSelectedDisk(e.value)}
                         optionLabel="name" placeholder="Select a disk"
                         maxSelectedLabels={3}
                         className="filter"/>

            <MultiSelect value={selectedRam} options={ram}
                         onChange={(e) => setSelectedRam(e.value)}
                         optionLabel="name" placeholder="Select a ram"
                         maxSelectedLabels={3}
                         className="filter"/>
            <Button className="p-button-outlined p-button-vertical w-full"
                    onClick={() => onFilterClick()}>
                Filter
            </Button>
        </div>
    );
}
export default MultiSelectDemo