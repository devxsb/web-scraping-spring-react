import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, {useState} from 'react';
import {RadioButton} from 'primereact/radiobutton';

const RadioButtonDemo = () => {
    const [city, setCity] = useState(null);
    return (
        <div className="col-2">
            <h4 style={{textAlign:"start"}}>Brand</h4>
            <div className="card">
                <div className="field-radiobutton">
                    <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
                    <label htmlFor="city1">Apple</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city2" name="city" value="Los Angeles" onChange={(e) => setCity(e.value)} checked={city === 'Los Angeles'} />
                    <label htmlFor="city2">ASUS</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city3" name="city" value="New York" onChange={(e) => setCity(e.value)} checked={city === 'New York'} />
                    <label htmlFor="city3">HUAWEI</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city4" name="city" value="San Francisco" onChange={(e) => setCity(e.value)} checked={city === 'San Francisco'} />
                    <label htmlFor="city4">LENOVO</label>
                </div>
            </div>
            <h4 style={{textAlign:"start"}}>Disk</h4>
            <div className="card">
                <div className="field-radiobutton">
                    <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
                    <label htmlFor="city1">128GB</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city2" name="city" value="Los Angeles" onChange={(e) => setCity(e.value)} checked={city === 'Los Angeles'} />
                    <label htmlFor="city2">256GB</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city3" name="city" value="New York" onChange={(e) => setCity(e.value)} checked={city === 'New York'} />
                    <label htmlFor="city3">512GB</label>
                </div>
            </div>
            <h4 style={{textAlign:"start"}}>Processor</h4>
            <div className="card">
                <div className="field-radiobutton">
                    <RadioButton inputId="city1" name="city" value="Chicago" onChange={(e) => setCity(e.value)} checked={city === 'Chicago'} />
                    <label htmlFor="city1">Amd</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city2" name="city" value="Los Angeles" onChange={(e) => setCity(e.value)} checked={city === 'Los Angeles'} />
                    <label htmlFor="city2">Apple</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton inputId="city3" name="city" value="New York" onChange={(e) => setCity(e.value)} checked={city === 'New York'} />
                    <label htmlFor="city3">Intel</label>
                </div>
            </div>
        </div>
    )
}
export default RadioButtonDemo