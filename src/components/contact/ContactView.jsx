import axios from 'axios'
import React, { useEffect, usecontact, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ContactView = () => {
  let { id } = useParams()
  // console.log(id)
  const [contact, setContact] = useState({})
  const [group, setGroup] = useState('')

  useEffect(() => {
    async function data() {
      let resp = await axios.get(`http://localhost:9000/contacts/${id}`);
      let groupId = resp.data.groupId;
      let groupResp = await axios.get(`http://localhost:9000/groups/${groupId}`)
      console.log(groupResp)
      setGroup(groupResp.data.name)
      // console.log(resp.data)
      setContact(resp.data)
    }
    data()
  }, [])
  
  return (
    <div className='container mt-3'>
      <div className="view">
        <h2 className='text-warning'>View contact</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, veritatis nihil. Expedita esse provident ad quisquam tenetur eos eius, cum odit dolore laboriosam praesentium vel minus neque, doloribus sint! Ad dolor optio alias, quas saepe repellendus earum, nobis eius repudiandae aliquid facilis ducimus odio.</p>
      </div>
      <div className="card row"   style={{ backgroundColor: "lightgrey", padding: 2, marginTop: 60 }}>
        <div className="card-body align-items-center d-flex justify-content-around">
          <div className="col-md-5 align-items-center ">
            <img src={contact.photo} className=' contact-img' />
          </div>
          <div className="col-md-7">
            <ul className='list-group'>
              <li className='list-group-item list-group-item-action mt-2'>
                Name: <span className='fw-bold'> {contact.name}</span>
              </li>
              <li className='list-group-item list-group-item-action mt-2'>
                Mobile No.: <span className='fw-bold'> {contact.mobile}</span>
              </li>
              <li className='list-group-item list-group-item-action mt-2'>
                Email: <span className='fw-bold'> {contact.email}</span>
              </li>
              <li className='list-group-item list-group-item-action mt-2'>
                Company: <span className='fw-bold'> {contact.company}</span>
              </li>
              <li className='list-group-item list-group-item-action mt-2'>
                Group: <span className='fw-bold'> {group}</span>
              </li>
              <li className='list-group-item list-group-item-action mt-2'>
                Title: <span className='fw-bold'> {contact.title}</span>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/contactlist" className=" btn btn-warning col-md-2" > back</Link>
      </div>
    </div>
  )
}

export default ContactView