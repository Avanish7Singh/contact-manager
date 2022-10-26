import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ContactEdit = () => {
  const {id} = useParams()
  // console.log(id)
  let navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    contact:{
      name:"",
      photo:"",
      company:"",
      title:"",
      groupId:"",
      email:"",
      mobile:""

    },
    group:[]
  })

  useEffect(() =>{
    let fetch = async() =>{
     let resp = await axios.get(`http://localhost:9000/contacts/${id}`)
     console.log(resp.data)
     setState({
      ...state,
      contact: resp.data
     })
    }
    fetch()
  },[])

  let submitForm = async(event) =>{
   event.preventDefault()
   let resp = await axios.put(`http://localhost:9000/contacts/${id}`, state.contact)
   if(resp){
         navigate("/")
   }
  }
  let editdata = (event) =>{
       setState({
        ...state,
        contact:{
          ...state.contact,
          [event.target.name] : event.target.value
        }
       })
  }
  let { loading, contact, group} = state;
  return (
    <div className='container mt-3'>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      <div className="row">
        <h3 className='text-success'>Edit Contact</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae odio placeat modi incidunt quibusdam ad ut eos debitis dolorum hic vel temporibus repudiandae recusandae, omnis sit doloribus fugit expedita exercitationem, dignissimos enim nostrum magni dolor reiciendis iste. Ullam, officia sequi. Veritatis eum eius quis.</p>
      </div>
      <div className="row d-flex justify-content-start align-items-center">
        <form className='col-md-5' onSubmit={submitForm} >
          <div className="row mt-2">
            <input
            name="name"
            value={contact.name}
            onChange={ editdata}
            type="text" placeholder='Name' className='form-control' />
          </div>
          <div className="row mt-2">
            <input
             name="photo"
             value={contact.photo}
             onChange={ editdata}
            type="text" placeholder='Photo Url' className='form-control' />
          </div>
          <div className="row mt-2">
            <input
             name="mobile"
             value={contact.mobile}
             onChange={ editdata}
            type="text" placeholder='Mobile No' className='form-control' />
          </div>
          <div className="row mt-2">
            <input 
             name="email"
             value={contact.email}
             onChange={ editdata}
            type="text" placeholder='Email' className='form-control' />
          </div>
          <div className="row mt-2">
            <input
             name="company"
             value={contact.company}
             onChange={ editdata}
            type="text" placeholder='Company' className='form-control' />
          </div>
          <div className="row mt-2">
            <input
             name= "title"
             value={contact.title}
             onChange={ editdata}
            type="text" placeholder='Title' className='form-control' />
          </div>
          <div className="row mt-2 ">
         
            <select 
             name="groupId"
             value={contact.groupId}
             onChange={ editdata}
            className='form-control'>
              <option value="">Select a group</option>
            </select>
          </div>
          <div className="row d-flex mt-2">
            <button type='submit' className='btn btn-primary col-md-3 mx-2'> Update</button>
            <Link to="/contactlist" className="btn btn-warning col-md-3"> Cancel</Link>
          </div>
        </form>

        <div className="col-md-6">
          <img src={contact.photo} className='contact-img' />
        </div>
      </div>
    </div>
  )
}

export default ContactEdit