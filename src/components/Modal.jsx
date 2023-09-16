import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { Formik,Form, Field } from 'formik'
import {AiOutlineClose} from 'react-icons/ai'
import { db } from '../config/firebase'

const Modal = ({isUpdate,onClose,contact,getContacts}) => {

    const addContact =async(contact)=>{
        try {
            const contactRef = collection(db,"contacts")
            await addDoc(contactRef,contact)
            getContacts()
            
        } catch (error) {
            console.log(error)
        }

    }

    const updateContact =async(contact,id)=>{
        try {
            const contactRef = doc(db,"contacts",id)
            await updateDoc(contactRef,contact)
            getContacts()
            
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <>
    <Formik
    initialValues={ isUpdate?{
                name:contact.name,
                email:contact.email
            }:{
                name: "",
                email: ""
            }
        }
    onSubmit={(values)=>{
        isUpdate? updateContact(values,contact.id):
        addContact(values)
    }}
    >
    <div className="absolute top-0 z-40 h-screen w-screen backdrop-blur-sm ">      
       <Form>
        <section className="relative  w-[370px] mt-16 z-50 flex flex-col gap-4 p-4 bg-white">
            <div className='flex justify-end'>
            <AiOutlineClose
                onClick={()=>{onClose()}}
                className="bg-orange rounded-2xl p-2 text-3xl font-extrabold cursor-pointer"/>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <Field className="w-[100%] border border-black h-9 px-2" type="text" name="name" id="name"/>
            </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Field className="w-[100%] border border-black px-2 h-9" type="email"  name="email" id="email" />
                </div> 
                <div className="flex justify-end">
                    {isUpdate? 
                    <input className="bg-orange cursor-pointer rounded-md py-1 px-2" type="submit" value="Update Contact" />
                    :
                    <input className="bg-orange cursor-pointer rounded-md py-1 px-2" type="submit" value="Add Contact" />
                    }
                </div> 
            </section>
        </Form>
    </div>
    </Formik>
    </>

  )
}

export default Modal