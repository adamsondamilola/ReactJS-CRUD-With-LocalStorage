import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

//define footer the function

const AddContact = () => {

    //const is used for declaring a constant. We can use let instead on const, but it a standard practice to use const because it prevents us from using a identifier more than once. 
    //useState is used for setting default value
    const [id, setId] = useState(1)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)

    //to get error message
    const [errorFound, setErrorFound] = useState(null)
    const [successFound, setSuccessFound] = useState(null)

    let title = "Add Contact"

    let history = useHistory() //for redirecting to another page

    //Reset input fields
    const resetForm = () => {
        setName(null)
        setPhone(null)
        setEmail(null)
    }


    //define function for adding contacts
    const addContact = (Name, Phone, Email) => {
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

                    var newList = JSON.parse(list) //JSON.parse converts Text to JavaScript object.

                    //Check if record already exists
                    let check = newList.filter(item => item.phone === Phone || item.email === Email)

                    if (check.length > 0) {

                        setErrorFound("Record Already Exists")

                    }

                    else {

                    //Count number of records/rows to determine the new ID using for loop
                    let counter = 0;
                    for (let i = 0; i < newList.length; i++) {
                        if (newList[i].id != '0') counter++;
                    }

                    let newId = counter + 1 //set new id

                    let newContact = {
                        id: newId,
                        name: Name,
                        phone: Phone,
                        email: Email
                    }

                    
                    newList.push(newContact) //Add new list to old list in local storage

                    localStorage.setItem("contactList", JSON.stringify(newList)) //JSON.stringify converts JS object to JSON

                        history.push('/') 

                    }
                }
                else {

                    //create a new storage

                    let newContact = [{
                        id: id,
                        name: Name,
                        phone: Phone,
                        email: Email
                    }]

                    localStorage.setItem("contactList", JSON.stringify(newContact))
                    setSuccessFound(name + " Contact Added")
                    resetForm();
                }

            } catch (e) {
                console.log(e) //for handling errors
            }
        }
    }

    return (
        <div class="container">

            <Header />            

            <h1>{title}</h1>
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
                <button className="btn btn-lg btn-block btn-success" onClick={() => addContact(name, phone, email) }> Add Contact </button>
            </div>

            <Footer />

        </div>
    )
}

export default AddContact