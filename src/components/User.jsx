import { Table } from 'reactstrap'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import ModalDelete from './Modal'
import EditModal from './EditModal'

const getUser = async () => {
    const response = await fetch('http://localhost:3004/users')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

const User = () => {
    // Queries
    const query = useQuery('User', getUser)

    const navigate = useNavigate();

    const handleLink = () => {
        navigate(`addUser`)
    }

    return (
        <>
            <h1 className='text-center'>React Query</h1>
            <div className='mx-auto my-3 border border-dark rounded'>
                <Table>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Details</th>
                            <th>Edit Details</th>
                            <th>Delete Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            query.data?.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td><Link to={`/user/${user.id}`}>View Details</Link></td>
                                    <td><EditModal userID={user.id} /></td>
                                    <td><ModalDelete userID={user.id} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <div className='text-center my-3'>
                    {/* <Link to='AddUser'><Button color="info" outline>Add Users</Button>
                    </Link> */}
                    <button className='btn btn-outline-primary' onClick={handleLink}>Add Users</button>
                </div>
            </div>

        </>
    )
}

export default User;
