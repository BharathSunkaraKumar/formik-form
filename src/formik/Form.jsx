import React, { useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import './Form.css'
import axios from 'axios'
function Form() {
    const [data, setData] = useState([
    
    ])
    const formDetails = useFormik({
        initialValues: {
            username: '',
            firstname: '',
            lastname: '',
            age: '',
            gender: '',
            email: '',
            password:'',
        },
        validationSchema:Yup.object({
            firstname: Yup.string().required('first name is required').min(2, 'minimum 2 letters'),
            lastname: Yup.string().required('last name required'),
            age: Yup.string().required('age is required').test({
                name: 'genderbasedvalidation',
                message: 'your to young',
                test: (value, a) => {
                    if(a.parent.gender === "male" && value < 21) {
                        return false
                    }
                    if(a.parent.gender === 'female' && value < 18) {
                        return false
                    }
                    return true
                }
            }),
            password: Yup.string().required('password is required').min(8, 'Use 8 characters or more for your password').matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,'Please choose a stronger password. Try a mix of letters, numbers, and symbols.'),
            email: Yup.string().required('email is required').matches(/^[a-z0-9][\w\.]+\@\w+?(\.\w+){1,}$/gi,'email pattern is wrong'),
            username: Yup.string().required('user name required').test({
                name: 'check user asynchronous',
                message: 'already user exist',
                test: (async(value, a )=> {
                    let resp = await axios.get(`http://jsonplaceholder.typicode.com/users?username=${value}`)
                    // console.log(resp)
                    if(resp.data.length !== 0) {
                        return a.createError({message: "This user already exist"})
                    }else{
                        return true
                    }

                })
            }),
        }),
        onSubmit : (values, {resetForm}) => {
            console.log(values)
            setData([...data, values])
            // console.log(data)
        }
    })
  return (
    <div className='wrapper'>
        
        <div className="form-container">
            <form onSubmit={formDetails.handleSubmit}>
                {/* {console.log(formDetails)} */}
            <div className="input-fields">
                <h1 style={{textAlign: 'center', border: '1px solid',color: 'dodgerblue'}}>Formik Form</h1>

                <small>{formDetails.touched.username && formDetails.errors.username}</small>
                <input type="text" className="input-field" name='username' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} placeholder='User Name'/>
                <br/>

                <small>{formDetails.touched.firstname && formDetails.errors.firstname}</small>
                <input type="text" className="input-field" name='firstname' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} placeholder='First Name'/>
                <br/>

                <small>{formDetails.touched.lastname && formDetails.errors.lastname}</small>
                <input type="text" className="input-field" name='lastname' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} placeholder='Last Name'/>
                <br/>

                <div>
                <small>{formDetails.touched.gender && formDetails.errors.gender}</small>
                <input type="radio" className="radio-field" name='gender' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} value='male'/>Male
                <input type="radio" className="radio-field" name='gender' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} value='female'/>Feale
                <br/>
                </div>

                <small>{formDetails.touched.age && formDetails.errors.age}</small>
                <input type="text" className="input-field" name='age' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} placeholder='Age'/>
                <br/>


                <small>{formDetails.touched.email && formDetails.errors.email}</small>
                <input type="text" className="input-field" name='email' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} placeholder='Emial'/>
                <br/>

                <small>{formDetails.touched.password && formDetails.errors.password}</small>
                <input type="text" className="input-field" name='password' onChange={formDetails.handleChange} onBlur={formDetails.handleBlur} placeholder='Password'/>
                <br/>
                <div className="wave-button">
                    <button>
                        <div className="text">submit</div>
                        <div className="wave"></div>
                    </button>
                </div>
            </div>
            </form>
        </div>    
        <div className="card-container">
            
                {
                    data.map((eachItem, i) => {
                        const {firstname, lastname, age, email, gender, password, username} = eachItem;
                        return  <div className='card' key={i}>
                                    <p className="name">{firstname} {lastname}</p>
                                    <b className='user'><span style={{color: 'dodgerblue'}}>UserID</span>: {username}</b>
                                    <p className="email">{email}</p>
                                    <p className="age">Age: {age}</p>
                                    <p className="gender">Gender: {gender}</p>
                                    <p className="psd">Password: ******</p>
                                </div>
                    })
                }
        
        </div>    
    </div>
    
  )
}

export default Form