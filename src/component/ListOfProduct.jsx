import React, { useEffect, useState } from 'react';
import { listOfProduct ,deleteProduct } from '../services/ProductServices';
import { useNavigate } from 'react-router-dom';

import Footer from './Footer';
import HeadersUser from './HeadersUser';

const ListOfProduct = () => {
    const [product, setProduct] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getAllProduct();
        
    }, []);

    function getAllProduct() {
        listOfProduct().then(res => {
            setProduct(res.data);

        }).catch(error => {
            console.error(error);

        });
    }

    function addNewProduct() {
        navigate("/add-product");
    }

    function updateProduct(id) {
        navigate(`/edit-product/${id}`);
    }

    function removeProduct(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
        if (!confirmDelete) {
            return; // If the user cancels, exit the function
        }

        deleteProduct(id).then(() => {
            getAllProduct();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div><HeadersUser />
            <div className='container'>
                <br />
                
                    <button className='btn btn-primary mb-2' onClick={addNewProduct}>Add Product</button>
            
                <table className='table table-striped table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map(result => (
                            <tr key={result.product_id}>
                                <td>{result.product_id}</td>
                                <td>{result.product_name}</td>
                                <td>{result.description}</td>
                                <td>{result.price}</td>
                                <td>
                                   
                                        <>
                                            <button className='btn btn-info mr-3' onClick={() => updateProduct(result.product_id)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => removeProduct(result.product_id)} style={{ marginLeft: '10px' }}>Delete</button>
                                        </>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default ListOfProduct;
