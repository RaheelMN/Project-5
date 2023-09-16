import {HiOutlineUserCircle} from 'react-icons/hi'
import {FiEdit} from 'react-icons/Fi'
import {AiFillDelete} from 'react-icons/ai'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'

const ContactCard = ({setOpen,setUpdate,setContact,getContacts,contact}) => {

  const deleteContact =async(id)=>{
    try {
      await deleteDoc(doc(db,"contacts",id))
      getContacts()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div key={contact.id} className="flex h-[60px] text-1xl font-medium bg-yellow items-center rounded-lg gap-2 p-1">
        <HiOutlineUserCircle className=" text-orange text-5xl"/>
        <div className="w-[220px]">
        <h2>{contact.name}</h2>
        <p className="text-sm">{contact.email}</p>
        </div>
        <FiEdit   onClick={()=>{
                  setOpen(true);
                  setUpdate(true);
                  setContact(contact)}}
         className=" text-3xl cursor-pointer"/>
        <AiFillDelete onClick={()=>{deleteContact(contact.id)}}
           className=" text-purple text-3xl cursor-pointer"/>
    </div>
  )
}

export default ContactCard