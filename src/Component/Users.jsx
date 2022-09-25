import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { env } from "./config"

function Users() {

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])
    
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get(`${env.api}/users`);
        console.log(users);
        setUsers(users.data)
        setLoading(false)
    };

    let userDelete = async (id) => {
        try {

            let ask = window.confirm("Are you Sure? Do you want to delete this Data?");
            if (ask) {
                await axios.delete(`${env.api}/user/${id}`)
                loadData()
            }
        } catch (error) {

        }
    }

    return (
        <div class="container-fluid">

            {/* <!-- Page Heading --> */}
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Users</h1>
                <Link to="/portal/create-user" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i>Create User</Link>
            </div>

            {
                isLoading ? (<div class="text-center">
                    <div class="spinner-border" role="status">
                        {/* <span class="visually-hidden">Loading...</span> */}
                    </div>
                </div>) : (<div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Users</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        users.map((user, index) => {
                                            return <tr>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.position}</td>
                                                <td>{user.office}</td>
                                                <td>{user.age}</td>
                                                <td>{user.startDate}</td>
                                                <td>${user.salary}</td>
                                                <td>
                                                    <Link to={`/portal/users/${user._id}`} className="btn btn-sm btn-primary mr-2 mb-1"> View </Link>
                                                    <Link to={`/portal/users/edit/${user._id}`} className="btn btn-sm btn-warning mr-2 mb-1"> Edit </Link>
                                                    <button onClick={() => userDelete(user._id)} className="btn btn-sm btn-danger mr-2"> Delete </button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>)
            }

        </div>
    );
}
export default Users;