import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, {useState} from 'react';
import {Checkbox} from 'primereact/checkbox';

const CheckboxDemo = () => {
    const categories = [
        {
            title: 'Brand',
            value: [
                {name: 'Apple', key: 'brand_0'},
                {name: 'Asus', key: 'brand_1'},
                {name: 'Huawei', key: 'brand_2'},
                {name: 'Lenovo', key: 'brand_3'}
            ]
        },
        {
            title: 'Processor',
            value: [
                {name: 'Amd', key: 'processor_0'},
                {name: 'Apple', key: 'processor_1'},
                {name: 'Intel', key: 'processor_2'}
            ]
        },
        {
            title: 'Operating System',
            value: [
                {name: 'FreeDOS', key: 'operatingSystem_0'},
                {name: 'Windows', key: 'operatingSystem_1'},
                {name: 'MacOS', key: 'operatingSystem_2'}
            ]
        },
        {
            title: 'Screen Size',
            value: [
                {name: '13.6 inch', key: 'screenSize_0'},
                {name: '14 inch', key: 'screenSize_1'},
                {name: '15.6 inch', key: 'screenSize_2'},
                {name: '16 inch', key: 'screenSize_3'}
            ]
        },
        {
            title: 'Disk',
            value: [
                {name: '128 GB', key: 'disk_0'},
                {name: '256 GB', key: 'disk_1'},
                {name: '512 GB', key: 'disk_2'}
            ]
        },
        {
            title: 'Ram',
            value: [
                {name: '4', key: 'ram_0'},
                {name: '8', key: 'ram_1'},
                {name: '16', key: 'ram_2'}
            ]
        }
    ];
    const [selectedCategories, setSelectedCategories] = useState([]);

    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
        } else {
            for (let i = 0; i < _selectedCategories.length; i++) {
                const selectedCategory = _selectedCategories[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedCategories.splice(i, 1);
                    break;
                }
            }
        }
        setSelectedCategories(_selectedCategories);
    }
    return (
        <div>
            <div className="card">
                {
                    categories.map((category) => {
                        return (
                            <div key={category.title}>
                                <h5 style={{textAlign: 'start'}}>{category.title}</h5>
                                {category.value.map(c => {
                                    return (
                                        <div key={c.key} className="field-checkbox">
                                            <Checkbox inputId={c.key} name="category" value={c}
                                                      onChange={onCategoryChange}
                                                      checked={selectedCategories.some((item) => item.key === c.key)}
                                                      disabled={c.key === 'R'}/>
                                            <label htmlFor={c.key}>{c.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default CheckboxDemo