import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {AiOutlineSearch} from 'react-icons/ai'
import {AiFillPlusCircle} from 'react-icons/ai'
import {collection,getDocs} from 'firebase/firestore'
import {db} from './config/firebase'
import ContactCard from './components/ContactCard'
import Modal from './components/Modal'


function App() {
  const [contacts, setContacts] = useState([])
  const [contact, setContact]=useState(null)
  const [isOpen,setOpen]=useState(false)
  const [isUpdate,setUpdate]=useState(false)

  const getContacts = async ()=>{

    const dbconn = collection(db,'contacts')
    try {        
      const contactSnapshot = await getDocs(dbconn) 
      const contactList = contactSnapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      setContacts(contactList)

    } catch (error) {
      console.log(error)
    }
  }

  const onOpen = ()=>{
    setOpen(true)
  }


  const onClose = ()=>{
    setOpen(false)
    setUpdate(false)
  }

  useEffect(()=>{  
    getContacts()
  },[])

  const addUser=()=>{
    onOpen()
  }

  const searchUser =(e)=>{
    const searchTerm = e.target.value;
    console.log(searchTerm)
  }

  return (
    <>
    <div className="mt-1 mx-auto max-w-[370px] max-h-[870px]">
      <Navbar/>
      <section className="flex relative items-center gap-1 my-3">

        <AiOutlineSearch 
        className="absolute text-3xl text-white ml-1"/>

        <input onChange={searchUser} type="text" name="search" 
        className="bg-transparent p-3 rounded-md flex-grow h-10 border pl-9 text-white" />

        <AiFillPlusCircle
        onClick={()=>addUser()}
         className=" text-5xl text-white cursor-pointer"/>
      </section>

      <section className=" flex flex-col gap-y-2">
        {contacts?.length>0? contacts.map((contact)=>(
          <ContactCard key={contact.id} setOpen={setOpen} setUpdate={setUpdate} setContact={setContact} getContacts={getContacts} contact={contact}/>
        )): 
        <div>
         Loading....
        </div>
        }
      </section>
        {
          isOpen && (<Modal isUpdate={isUpdate} onClose={onClose} contact={contact} getContacts={getContacts} />)
        }
    </div>
    </>
  )
}

export default App
