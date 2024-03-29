import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { SpinnerLoading } from '../layout/SpinnerLoading';
import Validation from '../config/Validation';

export default function EditPatient() {


    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate();
    const { id } = useParams();


    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        pesel: "",
        phoneNumber: "",
        street: "",
        city: "",
        zipCode: "",
        shortDescription: ""
    });
    useEffect(() => {
        loadPatient();
    }, []);


    const loadPatient = async () => {
        try {
            const result = await fetch(`http://localhost:8080/api/patients/${id}`);
            const responseData = await result.json();
            setPatient(responseData);
        } catch (error) {
            console.error('Error loading patient:', error);
        }
        setIsLoading(false);
    };

    const handleValidation = async (event) => {
        event.preventDefault();
        const response = Validation(patient);
        setErrors(response[0]);
        setIsError(response[1]);

        if (response[1] === false) {
            try {
                await axios.put(`http://localhost:8080/api/patients/${id}`, patient);
                navigate("/");
            } catch (error) {
                console.error('Error while submitting patient data:', error);
            }
        }
    }


    const changePatient = (e) => {
        setPatient(prevPatient => ({ ...prevPatient, [e.target.name]: e.target.value }));

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        handleValidation(e);
    }


    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    const { firstName, lastName, pesel, phoneNumber, street, city, zipCode, shortDescription } = patient;

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3  border rounded p-4 mt-2 shadow mx'>
                    <h2 className='text-center m-4'>Edycja danych pacjenta</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor="firstName" className='label-form'>
                                Imię
                            </label>
                            <input type={"text"} className="form-control" placeholder='Imię pacjenta' name="firstName" value={firstName} onChange={(e) => changePatient(e)} />
                            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="lastName" className='label-form'>
                                Nazwisko
                            </label>
                            <input type={"text"} className="form-control" placeholder='Nazwisko pacjenta' name="lastName" value={lastName} onChange={(e) => changePatient(e)} />
                            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="pesel" className='label-form'>
                                PESEL
                            </label>
                            <input type={"text"} className="form-control" placeholder='PESEL pacjenta' name="pesel" value={pesel} onChange={(e) => changePatient(e)} />
                            {errors.pesel && <p style={{ color: "red" }}>{errors.pesel}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="phoneNumber" className='label-form'>
                                Numer telefonu
                            </label>
                            <input type={"text"} className="form-control" placeholder='Numer telefonu pacjetna +48' name="phoneNumber" value={phoneNumber} onChange={(e) => changePatient(e)} />
                            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="street" className='label-form'>
                                Ulica
                            </label>
                            <input type={"text"} className="form-control" placeholder='Ulica, którą zamieszkuje pacjent' name="street" value={street} onChange={(e) => changePatient(e)} />
                            {errors.street && <p style={{ color: "red" }}>{errors.street}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="city" className='label-form'>
                                Miasto
                            </label>
                            <input type={"text"} className="form-control" placeholder='Miasto, kóre zamieszkuje pacjent' name="city" value={city} onChange={(e) => changePatient(e)} />
                            {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="zipCode" className='label-form'>
                                Kod pocztowy
                            </label>
                            <input type={"text"} className="form-control" placeholder='Kod pocztowy adresu pacjenta xy-abc' name="zipCode" value={zipCode} onChange={(e) => changePatient(e)} />
                            {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="shortDescription" className='label-form'>
                                Dolegliwość
                            </label>
                            <input type={"text"} className="form-control" placeholder='Krótki opis dolegliwości' name="shortDescription" value={shortDescription} onChange={(e) => changePatient(e)} />
                        </div>
                        <button type="submit" className="btn btn-outline-success mx-2">Zapisz</button>
                        <Link to="/" className="btn btn-outline-danger mx-2">Anuluj</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
