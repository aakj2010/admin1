import { useFormik } from "formik";
import axios from "axios";
import React from "react";
import { env } from './config';
import { useNavigate } from "react-router-dom";

function CreateUser() {
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

            if(values.name === ""){
                errors.name = "Please Enter Name";
            }

            if(values.position === ""){
                errors.position = "Please Enter Position";
            }

            return errors;
        },
        onSubmit: async (values) => {
          await axios.post(`${env.api}/user`,values);
          alert("User Created")
          navigate("/portal/users")
        }
    });
    return (
        <div className="container">
            <h2 className="text-center">Create User</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <label>Name</label>
                        <input className={`form-control ${formik.errors.name ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name="name" />
                            <span style={{color:'red'}}>{formik.errors.name}</span>
                    </div>
                    <div className="col-lg-6">
                        <label>Position</label>
                        <input className={`form-control ${formik.errors.position ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            name="position" />
                            <span style={{color:'red'}}>{formik.errors.position}</span>
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
                        <input className="btn btn-primary mt-2" type={"submit"} value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}
export default CreateUser;