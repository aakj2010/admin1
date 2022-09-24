import React, { useEffect } from 'react'
import { useFormik } from "formik";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'


function EditProduct() {

    const params = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            quantity: "",
            price: ""
        },
        validate: (values) => {
            let errors = {};

            if (values.name === "") {
                errors.name = "Please Enter Product Name";
            }

            if (values.quantity === "") {
                errors.quantity = "Please Enter Quantity";
            }

            if (values.price === "") {
                errors.price = "Please Enter Price";
            }

            return errors;
        },
        onSubmit: async (values) => {
            await axios.put(`https://62ff561c9350a1e548dc4cb7.mockapi.io/products/${params.id}`,values);
           navigate("/portal/products")
        }
    });

    useEffect(() => {
        loadProduct()
    }, [])

    let loadProduct = async () => {
        try {
            let product = await axios.get(`https://62ff561c9350a1e548dc4cb7.mockapi.io/products/${params.id}`);
            formik.setValues({
                name: product.data.name,
                quantity: product.data.quantity,
                price: product.data.price
            })
        } catch (error) {

        }
    }

    return (
        <div className="container">
            <h2 className="text-center">Edit Product</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* <div className="row"> */}

                    <div className="col-lg-6">
                        <label>Product Name</label>
                        <input className={`form-control ${formik.errors.name ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name="name" />
                        <span style={{ color: 'red' }}>{formik.errors.name}</span>
                    </div>

                    {/* <div className="col-lg-6">
                        <label>Brand Name</label>
                        <input className={`form-control ${formik.errors.brandname ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.brandname}
                            onChange={formik.handleChange}
                            name="brandname" />
                        <span style={{ color: 'red' }}>{formik.errors.brandname}</span>
                    </div> */}

                    <div className="col-lg-6">
                        <label>Quantity</label>
                        <input className={`form-control ${formik.errors.quantity ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            name="quantity" />
                        <span style={{ color: 'red' }}>{formik.errors.quantity}</span>
                    </div>

                    <div className="col-lg-6">
                        <label>Price</label>
                        <input className={`form-control ${formik.errors.price ? `input-error` : ``}`}
                            type={"text"}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            name="price" />
                        <span style={{ color: 'red' }}>{formik.errors.price}</span>
                    </div>

                    <div className="col-lg-6">
                        <input className="btn btn-primary mt-2"
                            type={"submit"}
                            value="Submit"
                            disabled={!formik.isValid} />
                    </div>
                {/* </div> */}
            </form>
        </div>
    )

}

export default EditProduct