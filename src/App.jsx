import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {AiOutlineSearch} from 'react-icons/ai'
import {AiFillPlusCircle} from 'react-icons/ai'
import {collection, onSnapshot} from 'firebase/firestore'
import {db} from './config/firebase'
import ContactCard from './components/ContactCard'
import Modal from './components/Modal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [contacts, setContacts] = useState([])
  const [contact, setContact]=useState(null)
  const [isOpen,setOpen]=useState(false)
  const [isUpdate,setUpdate]=useState(false)
  const [isloading,setLoading]=useState(true)

  const onOpen = ()=>{
    setOpen(true)
  }


  const onClose = ()=>{
    setOpen(false)
    setUpdate(false)
  }

  useEffect(()=>{  

    const getContacts = async ()=>{
      try {        
        const contactRef = collection(db,'contacts')

        onSnapshot(contactRef,(snapshot)=>{
          const contactList = snapshot.docs.map((doc)=>{
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactList)
          setLoading(false)
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  },[])

  const addUser=()=>{
    onOpen()
  }

  const searchUser =(e)=>{
    const searchTerm = e.target.value;
    const contactRef = collection(db,'contacts')
    onSnapshot(contactRef,(snapshot)=>{
      const contactList = snapshot.docs.map((doc)=>{
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      const searchRecords = contactList.filter((record)=>{
        return record.name.toLowerCase().includes(searchTerm.toLowerCase())
      }
      )
      setContacts(searchRecords)
    })  
  
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
        {isloading?   <div className='text-2xl font-medium text-center text-white'>
                        Loading....
                      </div>
        :             
        contacts?.length>0? contacts.map((contact)=>(
          <ContactCard key={contact.id} setOpen={setOpen} setUpdate={setUpdate} setContact={setContact} contact={contact}/>
        ))
        : 
        <div className='flex gap-2 text-white text-lg items-center justify-center py-4'>
          <img src="./images/contact.png" alt="person" />
          No Contact Found
        </div>
        }
      </section>
        {isOpen && (<Modal isUpdate={isUpdate} onClose={onClose} contact={contact} />)}
    </div>
    <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App
