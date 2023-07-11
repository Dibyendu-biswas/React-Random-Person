
import './App.css'
const url = "https://randomuser.me/api/"
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

import { BsFillPersonPlusFill, BsFillHandbagFill, BsFillTelephonePlusFill } from "react-icons/bs"
import { MdEmail } from "react-icons/md"
import { AiFillMedicineBox } from "react-icons/ai"
import { SlLocationPin } from "react-icons/sl"
import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
function App() {

  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("name")
  const [value,setvalue]=useState("random")
  const [loading, setLoading] = useState(true)

  const userProfile = async () => {
    setLoading(true)
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    // const userData = data.results[0];
    // const { name: { first, last }, email, phone, dob: { age }, picture: { large:{image}}, location: { street: { number, name } }, login: { password } } = userData
    // console.log(username)


    const person = data.results[0]
    const { phone, email } = person
    const { large: image } = person.picture
    const { password } = person.login
    const { first, last } = person.name
    const {
      dob: { age },
    } = person
    const {
      street: { number, name },
    } = person.location

    const newData={
      name: `${first} ${last}`,
      email,
      phone,
      street: `${number} ${name}`,
      password,
      age,
      image,
    }
    setUser(newData)
    setLoading(false)
    setTitle("name")
    setvalue(newData.name)
  } 

  useEffect(()=>{
    userProfile()
  },[])

  const handel =(e)=>{
    if(e.target.classList.contains("icon")){
      const newperson=e.target.dataset.label
      setTitle(newperson)
      setvalue(user[newperson])
    }
    
  }
  return (
    <>
      <section>
        <img src={(user && user.image )|| defaultImage} alt="" />
        <div className='container'>
          <div>
            <p >my {title} is</p>
            <h1>{value}</h1>
          </div>
          <div className='social'>
            <button className='icon' data-label="name" onMouseOver={handel}>
              <BsFillPersonPlusFill />
            </button>
            
            <button className='icon' data-label="email" onMouseOver={handel}>
              <MdEmail />
            </button>

            <button className='icon' data-label="age" onMouseOver={handel}>
              <AiFillMedicineBox />
            </button>

            <button className='icon' data-label="street" onMouseOver={handel}>
              <SlLocationPin />
            </button>

            <button className='icon' data-label="phone" onMouseOver={handel}>
              <BsFillTelephonePlusFill />
            </button>

            <button className='icon' data-label="password" onMouseOver={handel}>
              <BsFillHandbagFill />
            </button>
          </div>
          <div>
            <button onClick={userProfile}>
              {
                loading ?"loading.....": "Random User"
              }
            </button>
          </div>
        </div>
      </section>

    </>
  )
}

export default App
