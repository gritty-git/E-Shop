import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <div className="form-inline my-2 my-lg-0">
            <form style={{ "float": "left", "margin": "0rem 0.4rem" }} onSubmit={submitHandler} >
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
            </form>
            <div style={{ "float": "left", "margin": "0rem 0.4rem" }}>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={submitHandler}>Search</button>
            </div>
        </div>
        // <Form onSubmit={submitHandler} inline>
        //     <Form.Control
        //         type='text'
        //         name='q'
        //         onChange={(e) => setKeyword(e.target.value)}
        //         placeholder='Search Products...'
        //         className='mr-sm-2 ml-sm-5'
        //     ></Form.Control>
        //     <Button type='submit' variant='outline-success' className='p-2'>
        //         Search
        //     </Button>
        // </Form>
    )
}

export default SearchBox