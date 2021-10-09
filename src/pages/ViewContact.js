import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

//define footer the function

const ViewContact = () => {

    //const is used for declaring a constant. We can use let instead on const, but it a standard practice to use const because it prevents us from using a identifier more than once. 
    //useState is used for setting default value

    const { id } = useParams()     //get ID from url parameter
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)


    let title = "View Contact"

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




    return (
        <div class="container">

            <Header />
            <h1>{title}</h1>
            <div className="col">

                <table className="table">
                    <tr>
                        <th>Name</th>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{email}</td>
                    </tr>
                </table>               

            </div>

            <Footer />

        </div>
    )
}

export default ViewContact