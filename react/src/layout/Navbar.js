import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Panel zarządzania pacjentami</Link>

                    <Link type="button" className="btn btn-success" to="/addpatient">Dodaj pacjenta</Link>
                </div>
            </nav>
        </div>
    )
}
