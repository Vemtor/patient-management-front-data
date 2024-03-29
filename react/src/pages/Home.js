import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SpinnerLoading } from '../layout/SpinnerLoading';
import PatientRow from '../patients/PatientRow';
import Pagination from '../layout/Pagination';


export default function Home() {

    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        loadPatients();
    }, [currentPage, searchTitle]);

    const deleteUser = async (patientToDel) => {
        try {
            await axios.delete(`http://localhost:8080/api/patients/${patientToDel.id}`)
            loadPatients();
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    }


    const loadPatients = async () => {
        try {
            if (searchTitle === '') {
                const result = await fetch(`http://localhost:8080/api/patients?page=${currentPage - 1}&size=${patientsPerPage}`);
                const responseJson = await result.json();
                const responseData = responseJson._embedded.patients;
                setPatients(responseData);

                setTotalPages(responseJson.page.totalPages)
            } else {
                const result = await fetch(`http://localhost:8080/api/patients/search/findByAnythingContaining?name=${searchTitle}&page=${currentPage - 1}&size=${patientsPerPage}`);
                const responseJson = await result.json();
                const responseData = responseJson._embedded.patients;
                setPatients(responseData);

                setTotalPages(responseJson.page.totalPages)

            }

        } catch (error) {
            console.error('Error loading patients:', error);
        }
        setIsLoading(false);

    };

    const searchHandleChange = () => {
        setCurrentPage(1);
        setSearchTitle(search);

    }

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }


    return (
        <div className='container'>
            <div className='py-4'>
                <div className="d-flex mb-3">
                    <input className="form-control me-2" type='search' placeholder="Wyszukaj" aria-labelledby="Wyszukaj"
                        onChange={e => setSearch(e.target.value)} />
                    <button className="btn btn-outline-success" onClick={() => searchHandleChange()} >
                        Wyszukaj
                    </button>
                </div>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Nr</th>
                            <th scope="col">Imię</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">PESEL</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <PatientRow index={(currentPage - 1) * patientsPerPage + index} patient={patient} deleteUser={deleteUser} />
                        ))}
                    </tbody>
                </table>
                {totalPages > 1 && <Pagination currentPage={currentPage} totalPage={totalPages} paginate={paginate} />}
            </div>
        </div>
    );
}
