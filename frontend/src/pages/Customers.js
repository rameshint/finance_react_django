/* global bootstrap */
import React, { useState, useEffect } from 'react';
import API from '../utils/auth';
import ModalWrapper from '../components/ModalWrapper';
import $ from 'jquery';
import 'datatables.net-bs5'; // Required to apply Bootstrap style
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.js';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const defaultForm = {
        customer_no: '', name: '', contact_no: '', secondary_contact_no: '',
        address_line1: '', address_line2: '', district: '', pincode: '', adharcard: ''
    };
    const [form, setForm] = useState(defaultForm);
    // State to hold validation errors for each field
    const [fieldErrors, setFieldErrors] = useState({});
    // State to hold general (non-field) errors
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null); //null = add, object = edit

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // true = green, false = red

    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Reset form & show modal
    const openModalForAdd = () => {
        setSelectedCustomer(null);
        setForm(defaultForm);
        setFieldErrors({});
        setSuccessMessage('');
        setGeneralError('');
        setShowModal(true);
    };

    const openModalForEdit = (customer) => {
        setSelectedCustomer(customer);
        setForm({ ...customer }); // prefill form with selected customer's data
        setFieldErrors({});
        setSuccessMessage('');
        setGeneralError('');
        setShowModal(true);
    }

    // Close modal 
    const closeModal = () => {
        setShowModal(false);
    };


    // Fetch customers from database
    const fetchCustomers = async () => {
        try {
            const existingTable = $.fn.DataTable.isDataTable('#customerTable');
            if (existingTable) {
              $('#customerTable').DataTable().destroy();
            }

            const res = await API.get('customers/');
            setCustomers(res.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                const errors = error.response.data;
                if (errors.code === 'token_not_valid') {
                    window.location.href = '/login'
                }
            } else {
                console.error("Error message:", error.message);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };


    // handle submit event and validate and store customer data into database. 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFieldErrors({}); // Clear all previous errors
        setGeneralError('');
        setSuccessMessage('');
        try {
            if (selectedCustomer) {
                // Edit Customer
                const response = await API.put(`customers/${selectedCustomer.id}/`, form);
                setToastMessage('Customer Updated Successfully!');
                setSuccessMessage(true);
                setShowToast(true);
            } else {
                // Add Customer
                const response = await API.post('customers/', form);
                setToastMessage('Customer Added Successfully!');
                setSuccessMessage(true);
                setShowToast(true);
            }
            setForm(defaultForm);
            closeModal();
            fetchCustomers();
        } catch (error) {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);

                if (error.response.status === 400) {
                    const errors = error.response.data;
                    if (typeof errors === 'object' && errors !== null) {
                        setFieldErrors(errors);

                        if (errors.non_field_errors) {
                            setGeneralError(errors.non_field_errors.join(' '));
                        }
                    } else if (typeof errors === 'string') {
                        setGeneralError(errors);
                        setToastMessage(errors);
                        setSuccessMessage(false);
                        setShowToast(true);
                    } else {

                        setToastMessage('An unknown validation error occurred.');
                        setSuccessMessage(false);
                        setShowToast(true);
                    }

                } else {
                    // Handle other HTTP error codes (e.g., 500, 404)
                    setToastMessage(`Server error: ${error.response.status} - ${error.response.statusText || 'Unknown error'}. Please try again later.`);
                    setSuccessMessage(false);
                    setShowToast(true);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error("Error request:", error.request);

                setToastMessage(`Server error: ${error.response.status} - ${error.response.statusText || 'Unknown error'}. Please try again later.`);
                setSuccessMessage(false);
                setShowToast(true);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
                setToastMessage(`An error occurred: ${error.message}`);
                setSuccessMessage(false);
                setShowToast(true);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (customers.length > 0) {
            setTimeout(() => {
                $("#customerTable").DataTable({
                    destroy: true
                })
            }, 0);
        }
    }, [customers]);

    const openDeleteModal = (customer) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await API.delete(`customers/${customerToDelete.id}/`);
            setToastMessage('Customer deleted successfully!');
            setSuccessMessage(true);
            setShowToast(true);
            setShowDeleteModal(false);
            fetchCustomers();
        } catch (error) {
            setToastMessage('Failed to delete customer.');
            setSuccessMessage(false);
            setShowToast(true);
            console.error(error);
        }
    };


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="col-12">
                        <div className="card card-outline">
                            <div className="card-header">
                                <h3 className="card-title">Customers</h3>
                                <button className="btn btn-primary" style={{float:'right'}} onClick={openModalForAdd}>
                                    <i className='bi bi-plus-circle'></i> Add Customer
                                </button>
                            </div>
                            <div className="card-body">
                                
                                <table id="customerTable" className=" table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Customer No</th>
                                            <th>Name</th>
                                            <th>Contact No</th>
                                            <th>Secondary Contact No</th>
                                            <th>Address Line 1</th>
                                            <th>District</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="customerBody">
                                        {customers.map(c => (
                                            <tr key={c.id}>
                                                <td>{c.customer_no}</td>
                                                <td>{c.name}</td>
                                                <td>{c.contact_no}</td>
                                                <td>{c.secondary_contact_no}</td>
                                                <td>{c.address_line1}</td>
                                                <td>{c.district}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-warning' onClick={() => openModalForEdit(c)}>Edit</button>
                                                    &nbsp;<button className="btn btn-sm btn-danger" onClick={() => openDeleteModal(c)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWrapper id="customerModal" title={selectedCustomer ? 'Edit Customer' : 'Add New Customer'} show={showModal} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body row g-3">
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

                        <div className="col-md-2">
                            <label className="form-label">Customer No</label>
                            <input placeholder="Customer ID" required className="form-control" value={form.customer_no} onChange={e => setForm({ ...form, customer_no: e.target.value })} />
                            {fieldErrors.customer_no && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.customer_no.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-10">
                            <label className="form-label">Name</label>
                            <input placeholder="Name" className="form-control" value={form.name} required onChange={e => setForm({ ...form, name: e.target.value })} />
                            {fieldErrors.name && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.name.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Contact No</label>
                            <input placeholder="Contact" required className="form-control" value={form.contact_no} onChange={e => setForm({ ...form, contact_no: e.target.value })} />
                            {fieldErrors.contact_no && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.contact_no.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Secondary Contact No</label>
                            <input className="form-control" value={form.secondary_contact_no} onChange={e => setForm({ ...form, secondary_contact_no: e.target.value })} />
                            {fieldErrors.secondary_contact_no && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.secondary_contact_no.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Address Line 1</label>
                            <input placeholder="Address Line 1" required className="form-control" value={form.address_line1} onChange={e => setForm({ ...form, address_line1: e.target.value })} />
                            {fieldErrors.address_line1 && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.address_line1.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Address Line 2</label>
                            <input placeholder="Address Line 2" className="form-control" value={form.address_line2} onChange={e => setForm({ ...form, address_line2: e.target.value })} />
                            {fieldErrors.address_line2 && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.address_line2.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">District</label>
                            <input placeholder="District" required className="form-control" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} />
                            {fieldErrors.district && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.district.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Pincode</label>
                            <input placeholder="Pincode" className="form-control" value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} />
                            {fieldErrors.pincode && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.pincode.join(' ')}</p>
                            )}
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Aadhar Card</label>
                            <input placeholder="Aadhar Card" className="form-control" value={form.adharcard} onChange={e => setForm({ ...form, adharcard: e.target.value })} />
                            {fieldErrors.adharcard && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>{fieldErrors.adharcard.join(' ')}</p>
                            )}
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-primary' type="submit">{selectedCustomer ? 'Update' : 'Add'}</button>
                    </div>
                </form>
            </ModalWrapper>
            <ModalWrapper
                id="deleteCustomerModal"
                title="Confirm Delete"
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <div className="modal-body">
                    Are you sure you want to delete customer <strong>{customerToDelete?.name}</strong>?
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </ModalWrapper>

            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
                <div
                    className={`toast align-items-center text-white bg-${successMessage ? 'success' : 'danger'} border-0 show`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ display: showToast ? 'block' : 'none' }}
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            aria-label="Close"
                            onClick={() => setShowToast(false)}
                        ></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customers;
