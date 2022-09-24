import React, { useEffect } from 'react'
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { env } from './config';


function EditUser() {

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            position: "",
            office: "",
            age: "",
            startDate: "",
            salary: ""
        },
        validate: (values) => {
            let errors = {};

            if (values.name === "") {
                errors.name = "Please Enter name";
            }

            if (values.position === "") {
                errors.position = "Please Enter Position";
            }

            return errors;
        },
        onSubmit: async (values) => {
            await axios.put(`${env.api}/user/${params.id}`,values);
            navigate("/portal/users")
        }
    });

    useEffect(() => {
        loadUser()
    }, [])

    let loadUser = async () => {
        try {
           let user = await axios.get(`${env.api}/user/${params.id}`)
           formik.setValues( {
            name: user.data.name,
            position: user.data.position,
            office: user.data.office,
            age: user.data.age,
            startDate: user.data.startDate,
            salary: user.data.salary
        })
        } catch (error) {
            
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">Edit User</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <label>name</label>
                        <input className={`form-control ${formik.errors.name ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name="name" />
                        <span style={{ color: 'red' }}>{formik.errors.name}</span>
                    </div>
                    <div className="col-lg-6">
                        <label>Position</label>
                        <input className={`form-control ${formik.errors.position ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            name="position" />
                        <span style={{ color: 'red' }}>{formik.errors.position}</span>
                    </div>
                    <div className="col-lg-6">
                        <label>Office</label>
                        <input className="form-control"
                            type={"text"}
                            value={formik.values.office}
                            onChange={formik.handleChange}
                            name="office" />
                    </div>
                    <div className="col-lg-6">
                        <label>Age</label>
                        <input className="form-control"
                            type={"text"}
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            name="age" />
                    </div>
                    <div className="col-lg-6">
                        <label>StartDate</label>
                        <input className="form-control"
                            type={"date"}
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            name="startDate" />
                    </div>
                    <div className="col-lg-6">
                        <label>Salary</label>
                        <input className="form-control"
                            type={"text"}
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            name="salary" />
                    </div>
                    <div className="col-lg-6">
                        <input className="btn btn-primary mt-2"
                            type={"submit"}
                            value="Submit"
                            disabled={!formik.isValid} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditUser