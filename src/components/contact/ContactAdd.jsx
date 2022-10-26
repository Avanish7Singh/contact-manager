import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ContactAdd = () => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      company: "",
      email: "",
      title: "",
      mobile: "",
      photo: "",
      groupId: ""
    },
    group: [],
  })

  const updateData = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })

  }

  useEffect(() =>{
      async function groupData() {
        setState({ ...state, loading: true})
        let resp = await axios.get("http://localhost:9000/groups")
        // group[...resp.data]
        console.log(resp.data)
        setState({
          ...state,
           group: resp.data,
           loading: false
        })
      }
      groupData()
  },[])

  let formSubmit= async( event)=>{
    event.preventDefault()
    let resp = await axios.post("http://localhost:9000/contacts", state.contact)
    if(resp){
          navigate("/")
    }
  }

  let { loading, contact, group } = state;
  return (

    <div className='container mt-1'>
      {/* <pre> {JSON.stringify(contact)}</pre> */}
      <div className="row">
        <h3 className='text-success'>Add Contact</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae odio placeat modi incidunt quibusdam ad ut eos debitis dolorum hic vel temporibus repudiandae recusandae, omnis sit doloribus fugit expedita exercitationem, dignissimos enim nostrum magni dolor reiciendis iste. Ullam, officia sequi. Veritatis eum eius quis.</p>
      </div>
      <form onSubmit={formSubmit}>
        <div className="row col-md-5 mt-1">
          <input
            required="true"
            name='name'
            value={contact.name}
            onChange={updateData}
            type="text" placeholder='Name' className='form-control' />
        </div>
        <div className="row col-md-5 mt-1">
          <input
            required="true"
            name='photo'
            value={contact.photo}
            onChange={updateData}
            type="text" placeholder='Photo Url' className='form-control' />
        </div>
        <div className="row col-md-5 mt-1">
          <input
            required="true"
            name='mobile'
            value={contact.mobile}
            onChange={updateData}
            type="text" placeholder='Mobile No' className='form-control' />
        </div>
        <div className="row col-md-5 mt-1">
          <input
            required="true"
            name= 'email'
            value={contact.email}
            onChange={updateData}
            type="text" placeholder='Email' className='form-control' />
        </div>
        <div className="row col-md-5 mt-1">
          <input
            required="true"
            name='company'
            value={contact.company}
            onChange={updateData}
            type="text" placeholder='Company' className='form-control' />
        </div>
        <div className="row col-md-5 mt-1">
          <input
            required= "true"
            name= 'title'
            value= {contact.title}
            onChange= {updateData}
            type="text" placeholder='Title' className='form-control' />
        </div>
        <div className="row col-md-5 mt-1 ">
          <select 
           required=" true"
           name='groupId'
           value= {contact.groupId}
           onChange= {updateData}
          className='form-control'>
            <option value="">Select a group</option>
            {
              group.length > 0 &&
                 group.map( group =>{
                  return(
                    <option key={ group.id} value={group.id}> {group.name}</option>
                  )
                 })
            }
          </select>
        </div>
        <div className="row col-md-5 mt-2 d-flex">
          <button type='submit' className='btn btn-primary col-md-3 mx-2'> Create</button>
          <Link to="/contactlist" className="btn btn-warning col-md-3"> Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default ContactAdd