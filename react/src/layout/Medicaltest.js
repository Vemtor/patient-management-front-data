export default function Medicaltest({ index, props }) {
    const date = new Date(props.date);
    const formattedDate = date.toLocaleDateString('en-US');
    return (
        <tr>
            <th scope='row'>{index + 1}</th>
            <td>{props.title}</td>
            <td>{props.doctor}</td>
            <td>{formattedDate}</td>
        </tr>
    );
}
