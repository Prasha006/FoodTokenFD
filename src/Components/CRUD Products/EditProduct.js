
import { dataContext } from '../../App'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import "../../styles/form.css"
import { fullLink } from '../link';

//yup validation
const bookVali = Yup.object({
    name: Yup.string().min(1, "please enter a product").required("Please fill Product Field"),
    image: Yup.string().min(10, "Please copy and paste the valid image address").required("Copy and paste the image address"),
    pieces: Yup.number().min(0, "please enter pieces").required("Please fill Pieces Field"),
    rate: Yup.number().min(1, "please enter rate").required("Please fill Rate Field"),
})
function EditProduct() {
    //usecontext method used
    const { data, setData, data2 } = useContext(dataContext)
    //for authentication
    const role_id = localStorage.getItem("role_id")
    const token = localStorage.getItem("token")


    //for loading
    const [load, setLoad] = useState(false)
    //getting particular data from the link using :id to paste the current data in the form 
    //field to edit
    const { id } = useParams()
    const filData = data.filter((res) => {
        return (res.name == id)
    })


    const navigate = useNavigate()
    //formik form
    const formik = useFormik({
        initialValues: {
            name: filData[0].name,
            image: filData[0].image,
            pieces: filData[0].pieces,
            rate: filData[0].rate,
        }, validationSchema: bookVali, onSubmit: async (values) => {
            setLoad(true)
            const productInfo = {
                name: values.name,
                image: values.image,
                pieces: values.pieces,
                rate: values.rate,
            }
            const kkProducts = await fetch(`${fullLink}/kkproducts/products/${filData[0]._id}`, {
                method: "PUT",
                body: JSON.stringify(productInfo),
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json"
                }
            })
            const result = kkProducts.json()
            if (result.message === "success") {
                toast.success("update success")
                setTimeout(() => {
                    navigate("/products")
                }, 2000);
            } else {
                toast.error("update failed")
            }
        }
    })

    return (
        <div >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ color: "white", margin: "15px" }}>Edit Product</h2>
            </div>
            {role_id == 6298 ? (
                <div className='form-box'>

                    <div>
                        <form className='edit-form' onSubmit={formik.handleSubmit}>
                            <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                                name="name" label="name" onChange={formik.handleChange}
                                value={formik.values.name} variant="standard" />
                            <div className='formik-errors'>
                                {formik.touched.name && formik.errors.name ? formik.errors.name : null}

                            </div>
                            <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                                name="image" label="image" onChange={formik.handleChange}
                                value={formik.values.image} variant="standard" />
                            <div className='formik-errors'>
                                {formik.touched.image && formik.errors.image ? formik.errors.image : null}
                            </div>
                            <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                                name="pieces" label="pieces" onChange={formik.handleChange}
                                value={formik.values.pieces} variant="standard" />
                            <div className='formik-errors'>
                                {formik.touched.pieces && formik.errors.pieces ? formik.errors.pieces : null}
                            </div>
                            <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                                name="rate" label="rate" onChange={formik.handleChange}
                                value={formik.values.rate} variant="standard" />
                            <div className='formik-errors'>
                                {formik.touched.rate && formik.errors.rate ? formik.errors.rate : null}
                            </div>
                            <Button
                                sx={{
                                    color: "white", marginRight: "5px", backgroundColor: "rgb(240, 112, 152)", '&:hover': {
                                        backgroundColor: "black", color: "whitesmoke"
                                    }
                                }}
                                type="submit"
                                className="btn btn-primary"
                                disabled={false}
                                variant="contained"
                            > {load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}update
                            </Button>
                        </form>
                    </div>

                </div>) : <h3 style={{ color: "white", textAlign: "center" }}>Only accessible to Admin</h3>}


        </div>
    )
}

export default EditProduct