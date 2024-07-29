import React, { useEffect, useState } from 'react';
import { UpdateProduct, createProduct, getProduct } from '../services/ProductServices';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AddProduct = () => {
    const [product_name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState({
        product_name: '',
        description: '',
        price: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getProduct(id)
                .then((response) => {
                    console.log('Product data received:', response.data);
                    setProductName(response.data.product_name);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [id]);

    function saveOrUpdateProduct(e) {
        e.preventDefault();

        if (validateForm()) {
            const product = { product_name, description, price: price.toString().trim() }; // Ensure price is treated as a string before calling trim()
            console.log('Product data:', product);
    
            const action = id ? UpdateProduct(id, product) : createProduct(product);
    
            action.then((response) => {
                console.log('Response data:', response.data);
                setSuccessMessage(id ? 'Product updated successfully' : 'Product added successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate("/product");
                }, 3000);
            }).catch(error => {
                console.error('Error saving product:', error);
            });
        } else {
            console.log('Form validation failed. Please correct the errors.');
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...error };

        if (!product_name.trim()) {
            errorsCopy.product_name = 'Product name is required';
            valid = false;
        } else {
            errorsCopy.product_name = '';
        }

        if (!description.trim()) {
            errorsCopy.description = 'Description is required';
            valid = false;
        } else {
            errorsCopy.description = '';
        }

        setError(errorsCopy);
        return valid;
    }

    const title = id ? 'Update Product' : 'Add Product';

    return (
        <div>
            <Header />
            <div className='container'>
                <br /><br />
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                        <h3 className='text-center'>{title}</h3>
                        <div className='card-body'>
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <form onSubmit={saveOrUpdateProduct}>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>
                                        Product Name {product_name ? null : <span style={{ color: 'red' }}>*</span>}
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Enter product name'
                                        name='product_name'
                                        value={product_name}
                                        className={`form-control ${error.product_name ? 'is-invalid' : ''}`}
                                        onChange={(event) => setProductName(event.target.value)}
                                    />
                                    {error.product_name && <div className='invalid-feedback'>{error.product_name}</div>}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>
                                        Product Description {description ? null : <span style={{ color: 'red' }}>*</span>}
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Enter product description'
                                        name='description'
                                        value={description}
                                        className={`form-control ${error.description ? 'is-invalid' : ''}`}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    {error.description && <div className='invalid-feedback'>{error.description}</div>}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>
                                        Product Price {price ? null : <span style={{ color: 'red' }}>*</span>}
                                    </label>
                                    <input
                                        type='number'
                                        placeholder='Enter product price'
                                        name='price'
                                        value={price}
                                        className={`form-control ${error.price ? 'is-invalid' : ''}`}
                                        onChange={(event) => setPrice(event.target.value)}
                                    />
                                    {error.price && <div className='invalid-feedback'>{error.price}</div>}
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    {id ? 'Update Product' : 'Add Product'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddProduct;
