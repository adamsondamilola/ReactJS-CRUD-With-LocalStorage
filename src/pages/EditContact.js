import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

//define footer the function

const EditContact = () => {

    //const is used for declaring a constant. We can use let instead on const, but it a standard practice to use const because it prevents us from using a identifier more than once. 
    //useState is used for setting default value

    const { id } = useParams()     //get ID from url parameter
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)

    //to get error message
    const [errorFound, setErrorFound] = useState(null)
    const [successFound, setSuccessFound] = useState(null)

    let title = "Edit Contact"

    const getList = () => {
        try {
            let list = localStorage.getItem("contactList")
            if (list !== null) {

                let data = JSON.parse(list) //JSON.parse converts Text to JavaScript object.

                let filteredList = data.filter(item => item.id === parseInt(id)) //filter array to get the selected ID

                data = filteredList[0]

                setName(data.name)
                setPhone(data.phone)
                setEmail(data.email)

            }
        } catch (e) {
            console.log(e)
        }
    }

    //useEffect is just like JavaScript on ready. It excutes when you open a page
    useEffect(() => {
        getList() //check if there is contact list
    }, [])


    //define function for adding contacts
    const editContact = (Name, Phone, Email) => {
        //lets handle some errors

        setErrorFound(null) //reset to null
        setSuccessFound(null) //reset to null


        if (!Name) setErrorFound("Name can not be empty")
        else if (!Phone) setErrorFound("Phone can not be empty")
        else if (!Email) setErrorFound("Email can not be empty")
        else {

            try {
                //check if storage exists
                //Let's use contactList as our storage name

                let list = localStorage.getItem("contactList")
                if (list !== null) {

                    let data = JSON.parse(list) //JSON.parse converts Text to JavaScript object.

                    var objIndex = data.findIndex((x => x.id === parseInt(id)));

                    //Update object's property.
                    data[objIndex].name = Name
                    data[objIndex].phone = Phone
                    data[objIndex].email = Email

                    localStorage.setItem("contactList", JSON.stringify(data)) //JSON.stringify converts JS object to JSON

                    setSuccessFound("Contact Updated!")
                }

            } catch (e) {
                console.log(e) //for handling errors
            }
        }
    }

    return (
        <div class="container">

            <Header />
            <h1>{ title}</h1>
            <div className="col">
                
                {errorFound !== null ? <div className="alert alert-danger"> {errorFound} </div> : null}
                {successFound !== null ? <div className="alert alert-success"> {successFound} </div> : null}

                <label>Enter Name</label>
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />

                <label>Enter Phone</label>
                <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />

                <label>Enter Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />

                <br />
                <button className="btn btn-lg btn-block btn-success" onClick={() => editContact(name, phone, email)}> Update Contact </button>
            </div>

            <Footer />

        </div>
    )
}

export default EditContact