import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, {useState} from 'react';
import {useFormik} from 'formik';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {classNames} from 'primereact/utils';
import './FormDemo.css';
import AuthService from "../service/AuthService";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../redux/reduxSlice";

export const FormikFormDemo = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authService = new AuthService()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (data) => {
            setError(undefined)
            authService.login(data).then(res => {
                dispatch(login(res.data))
                navigate('/')
            }).catch(() => setError(true));
            formik.resetForm();
        }
    });


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div className="flex justify-content-center">
            <div className="card">
                <h5 className="text-center">Login</h5>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="field">
                            <span className="p-float-label">
                                <InputText id="username" name="username" value={formik.values.username}
                                           onChange={formik.handleChange} autoFocus
                                           className={classNames({'p-invalid': error})}/>
                                <label htmlFor="username"
                                       className={classNames({'p-error': isFormFieldValid('username')})}>Username*</label>
                            </span>
                        {getFormErrorMessage('username')}
                    </div>
                    <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password}
                                          onChange={formik.handleChange} toggleMask feedback={false}
                                          className={classNames({'p-invalid': error})}
                                />
                                <label htmlFor="password"
                                       className={classNames({'p-error': isFormFieldValid('password')})}>Password*</label>
                            </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <Button type="submit" label="Login" className="mt-2"/>
                </form>
            </div>
        </div>
    );
}
export default FormikFormDemo