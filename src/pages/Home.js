import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';

//define footer the function

const Home = () => {

    const [myContactsList, setMyContactList] = useState([])

    let title = "Home"

    const getList = () => {
        try {
            let list = localStorage.getItem("contactList")
            if (list !== null) {
                setMyContactList(JSON.parse(list))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const deleteContact = async (id) => {

        var x = window.confirm("Click OK to delete contect");
        if (x === true) {

            try {

                let data = myContactsList
                var updated = data.filter(item => item.id !== parseInt(id)) //filter array to remove selected ID

                await localStorage.setItem('contactList', JSON.stringify(updated));

                alert("Contact Deleted!")

                getList() //update list after operation

            }
            catch (e) {
                console.log(e)
            }

        } else {

            alert("Contact not deleted")

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
                        <th>Mobile</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                    {myContactsList.map(items =>
                        <tr key={items.id}>
                            <td>{items.name}</td>
                            <td>{items.phone}</td>
                            <td>{items.email}</td>
                            <td>
                                <Link className="btn btn-sm btn-success mr-3" to={"/View/" + items.id}>View</Link> 
                                <Link className="btn btn-sm btn-primary mr-3" to={"/Edit/" + items.id}>Edit</Link> 
                                <button className="btn btn-sm btn-danger" onClick={() => deleteContact(items.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </table>
            </div>

            <Footer/>

        </div>
    )
}

export default Home