import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Table } from "reactstrap"

const getDetail = async (id) => {
    const response = await fetch('http://localhost:3004/users/' + id)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const UserDetail = () => {
    const { id } = useParams();
    // Queries
    const query = useQuery('UserDetail', () => getDetail(id))
    return (
        <Table>
            <thead>
                <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">{query.data?.id}</th>
                    <td>{query.data?.name}</td>
                    <td>{query.data?.email}</td>
                    <td>{query.data?.age}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default UserDetail;
