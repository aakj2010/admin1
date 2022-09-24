import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



function Products() {


    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    let loadData = async () => {
        setLoading(true)
        let products = await axios.get("https://62ff561c9350a1e548dc4cb7.mockapi.io/products");
        console.log(products);
        setProducts(products.data)
        setLoading(false)
    };

    let productDelete = async (id) => {
        try {
            let ask = window.confirm("Are you Sure? Do you want to delete this Data?");
            if (ask) {
                await axios.delete(`https://62ff561c9350a1e548dc4cb7.mockapi.io/products/${id}`)
                loadData()
            }

        } catch (error) {

        }
    }

    return (
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Products</h1>
                <Link to="/portal/create-product" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i>Create Product</Link>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary"> Products</h6>
                </div>
                {
                    isLoading ? (<div class="text-center">
                        <div class="spinner-border" role="status">
                            {/* <span class="visually-hidden">Loading...</span> */}
                        </div>
                    </div>) : <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Actions</th>

                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        products.map((product, index) => {
                                            return <tr>
                                                <td>{index + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>${product.price}</td>
                                                <td>
                                                    <Link to={`/portal/products/${product.id}`} className="btn btn-sm btn-primary mr-2">View</Link>
                                                    <Link to={`/portal/products/edit/${product.id}`} className="btn btn-sm btn-warning mr-2">Edit</Link>
                                                    <button onClick={() => productDelete(product.id)} className="btn btn-sm btn-danger mr-2">Delete</button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default Products;