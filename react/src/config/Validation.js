export default function Validation(patient) {
    const errors = {};

    const zipCode_pattern = /^\d{2}-\d{3}$/;
    const phoneNumber_pattern = /^\+\d{2}\d*$/;
    const pesel_pattern = /^\d{11}$/;

    let is_error = false;

    if (patient.firstName === "") {
        errors.firstName = "Imię jest wymagane!";
        is_error = true;
    }
    if (patient.lastName === "") {
        errors.lastName = "Nazwisko jest wymagane!";
        is_error = true;
    }
    if (patient.street === "") {
        errors.street = "Podanie ulicy jest wymagane!";
        is_error = true;
    }
    if (patient.city === "") {
        errors.city = "Podanie miasta jest wymagane!";
        is_error = true;
    }

    if (!zipCode_pattern.test(patient.zipCode)) {
        errors.zipCode = "Podany kod pocztowy jest niepoprawny!";
        is_error = true;
    }
    if (!phoneNumber_pattern.test(patient.phoneNumber)) {
        errors.phoneNumber = "Podany numer telefonu powinien być w formacie zaczynając się od +48";
        is_error = true;
    }
    if (!pesel_pattern.test(patient.pesel)) {
        errors.pesel = "Podany PESEL jest niepoprawny!";
        is_error = true;
    }

    return [errors, is_error];
}