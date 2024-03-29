import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SpinnerLoading } from '../layout/SpinnerLoading';
import Medicaltest from '../layout/Medicaltest';

export default function View() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [tests, setTests] = useState([]);
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
        loadTests();
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

    const loadTests = async () => {
        try {
            const result = await fetch(`http://localhost:8080/api/tests/search/findTestByPatientId?id=${id}`);
            const responseData = await result.json();
            setTests(responseData._embedded.tests);
        } catch (error) {
            console.error('Error loading tests for patient:', error);
        }


    }


    if (isLoading) {
        return <SpinnerLoading />;
    }

    return (
        <div>
            <section className="">
                <div className="container">
                    <div className="row">
                        <div classNameName="col-lg-12 mb-4 mb-sm-5">
                            <div className="card card-style1 border-0">
                                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7 border shadow">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 mb-4 mb-lg-0">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                                        </div>
                                        <div className="col-lg-6 px-xl-10">
                                            <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h2 text-white mb-1 p-2">{patient.firstName} {patient.lastName}</h3>
                                            </div>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">PESEL:</span>{patient.pesel}</li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Ulica:</span>{patient.street}</li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Miasto:</span>{patient.city}</li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Kod pocztowy:</span>{patient.zipCode}</li>
                                                <li className="display-28"><span className="display-26 text-secondary me-2 font-weight-600">Numer telefonu:</span>{patient.phoneNumber}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 mb-4 mb-sm-5 mt-5">
                            <div>
                                <span className="section-title text-primary mb-3 mb-sm-4"><h4>Zlecone przez lekarzy badania:</h4></span>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">

                                {tests.length > 0 ?
                                    <table className="table table-hover border shadow">
                                        <thead>
                                            <tr>
                                                <th scope='col'>#</th>
                                                <th scope='col'>Badanie</th>
                                                <th scope='col'>Lekarz</th>
                                                <th scope='col'>Data</th>

                                            </tr>


                                        </thead>
                                        <tbody>

                                            {tests.map((test, index) => (
                                                <Medicaltest key={index} index={index} props={test} />
                                            ))}
                                        </tbody>
                                    </table>
                                    :
                                    <h3>Ten pacjent nie ma na ten moment zleconych badań</h3>
                                }





                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>





    );


}