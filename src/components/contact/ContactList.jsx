import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../img/Spinner'

const ContactList = () => {
  const [query, setQuery] = useState({
    text: "",
  })
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filterContacts: [],
    errorMassage: ""
  })
  useEffect(() => {
    async function fetchData() {
      setState({ ...state, loading: true })
      let resp = await axios.get("http://localhost:9000/contacts")
      // console.log(resp.data)
      setState({
        contacts: resp.data,
        loading: false,
        filterContacts: resp.data
      })
    }
    fetchData()
  }, [])
  let { loading, filterContacts, contacts, errorMassage } = state;
  // console.log(contacts)

  let clickDelete = async (id) => {

    let resp = await axios.delete(`http://localhost:9000/contacts/${id}`)
    if (resp) {
      setState({ ...state, loading: true })
      let resp = await axios.get("http://localhost:9000/contacts")
      // console.log(resp.data)
      setState({
        contacts: resp.data,
        loading: false,
        filterContacts: resp.data
      })
    }
  }
  let searchQuery = (event) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value
    })
    let newContact = state.contacts.filter((element) => {
      return (
        element.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })
    setState({
      ...state,
      filterContacts: newContact
    })
  }
  return (
    <>
      {/* <pre>{query.text}</pre> */}
      <div className="contact-detail">
        <div className='container mt-4'>
          <div className="row">
            <div className="col">
              <p className='d-flex'>
                <h2>ContactList</h2>
                <Link to='/contactadd'>
                  <button className='btn btn-primary mx-2'>
                    <i class="fa-solid fa-circle-plus mx-2"></i>
                    Add
                    {/* <i className='' /> */}
                  </button>
                </Link>
              </p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis nihil cumque repellat corporis vel harum exercitationem, non expedita, praesentium voluptatum alias inventore minus reiciendis voluptatem! Dolorem eligendi illum saepe nobis tempore sapiente. Exercitationem minus enim laboriosam alias recusandae fugiat non asperiores at voluptas, dolorem esse doloribus soluta fugit. Ipsa quae aliquid veritatis nisi molestiae.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form className='row' style={{ alignItems: "center" }}>
                <div className="col">
                  <input
                    name="text"
                    value={query.text}
                    onChange={searchQuery}
                    type="text" className='form-control' placeholder='Search...' />
                </div>
                <div className="col">
                  <button type="submit" className='btn btn-primary'>Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-list mt-3">
        {
          loading ? <Spinner /> :
            <div className="container">
              <div className='row'>
                {
                  filterContacts.length > 0 &&
                  filterContacts.map((item) => {
                    return (

                      <div className="col-md-6 mt-5">
                        <div className="card ">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-between">
                              <div className="col-md-4">
                                <img src={item.photo} className='contact-img' />
                              </div>
                              <div className="col-md-7">
                                <ul className='list-group'>
                                  <li className='list-group-item list-group-item-action mt-2'>
                                    Name: <span className='fw-bold'> {item.name}</span>

                                  </li>
                                  <li className='list-group-item list-group-item-action mt-2'>
                                    Mobile No.: <span className='fw-bold'> {item.mobile}</span>

                                  </li>
                                  <li className='list-group-item list-group-item-action mt-2'>
                                    Email: <span className='fw-bold'> {item.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/contactview/${item.id}`} className='btn btn-warning my-1'>
                                  <i className='fa fa-eye ' />
                                </Link>
                                <Link to={`/contactEdit/${item.id}`} className='btn btn-primary my-1'>
                                  <i className='fa fa-pen ' />
                                </Link>
                                <button className='btn btn-danger my-1' onClick={() => clickDelete(item.id)}>
                                  <i className='fa fa-trash ' />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                    )
                  })
                }

              </div>
            </div>
        }

      </div>
    </>
  )
}

export default ContactList