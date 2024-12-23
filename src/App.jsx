import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';


import Navbar from './Components/Navbar'
import './App.css'




function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState("");
  const [tasks, settasks] = useState([]);
  const [Activetask, setActivetask] = useState([]);
  const [Compeletedtask, setCompeletedtask] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fillter, setfillter] = useState("All")

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
   let  todostrings=localStorage.getItem("todos")
    if(todostrings){

      let tasks = JSON.parse(localStorage.getItem("todos"))
      settasks(tasks)
    }
    
    
  }, [])
  
  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(tasks))
  }

  

  const handleInputChange = (event) => {
     setInputValue(event.target.value); // Updates state with new value
     

  };
  const addtodos=()=>{
    if(inputValue.trim()){
      settasks([...tasks,{text : inputValue,Id : uuidv4(),Status:"Active"}]);
      setInputValue("")
       saveToLS(tasks)
    }


  }
  const toggleStatus=(Id)=>{
    settasks(
      tasks.map((todo)=>
        todo.Id===Id
        ?{...todo, Status:todo.Status==="Active"?"Completed":"Active"}:todo
        
      )
    )
    saveToLS()
  }
  const alltodos=(index)=>{
   console.log(index)

  
  }
  const editHandler=(Id,text)=>{
    setInputValue(text)
    const updateedtodos=tasks.filter((todo)=> todo.Id!==Id);
    settasks(updateedtodos)
    saveToLS()
       }
  const DeleteHandller=(Id)=>{
   const updateedtodos=tasks.filter((todo)=> todo.Id!==Id);
   settasks(updateedtodos)
   saveToLS()

  }

  const fillterdtodos=tasks.filter((todo)=>{
    if(fillter==="All") return true;
    return todo.Status === fillter;
  })
  

  return (
    <>
    <Navbar/>    
    <div className="main">
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?cs=srgb&dl=pexels-stywo-1054218.jpg&fm=jpg')" }}>
        {/* Optional: Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-transparent rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.1)] p-[10px] h-[20vh] pt-[20px]">

          <div className="upperbox">
          <div className="flex    justify-center">
      <div className="text-xl font-extrabold uppercase text-gray-300 drop-shadow-lg tracking-widest text-center gradient-text flex    justify-center  ">
        <h1>Your Daily Goals</h1>
       
        
        
      </div>
    </div>
    <div className="flex items-center space-x-2 mt-4">
  {/* Input */}
  <input
    type="text"
    spellCheck="false"
    placeholder="Create a New Todo..."
    value={inputValue}
    onKeyDown={(e)=>{
      if(e.key === "Enter"){
        addtodos()
      }
    }}
    onChange={handleInputChange}
    className="w-full p-2 text-white font-family: 'Montserrat', sans-serif;
 placeholder-gray-300 bg-white/10 rounded-lg shadow-lg backdrop-blur-md border border-gray-300/20 focus:outline-none focus:ring-2 focus:ring-blue-400 decoration-no"
  />

  {/* Button */}
  <button onClick={addtodos} className="px-4 py-2 text-white bg-gradient-to-r  hover:bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.1)] hover:shadow-gray-900/50">
  ADD
</button>
</div>

            
          </div>
          <div className='Taskbox absolute top-[48vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-transparent rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.1)] p-[10px] h-[50vh]'>
         
         
          {fillterdtodos.map(todo=>{
            return(
              <div key={todo.Id}  className="flex justify-between items-center p-4 mb-4 py-1 rounded-lg backdrop-blur-md border border-gray-300/20 hover:shadow-2xl transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.1)]">


<div className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={todo.Status==="Completed"}
    onChange={()=>{
      toggleStatus(todo.Id)
      
    }}
    className="w-4 h-4 border-gray-500 bg-transparent rounded-lg focus:ring-2 hover:scale-110 transition-transform duration-300 break-words"
  />
<p
        onClick={toggleExpand}
        

        className={`  text-gray-200 font-semibold text-lg ${isExpanded ? 'whitespace-normal' : 'truncate'} w-[57vw] md:w-[15vw] md:break-words cursor-pointer  ${todo.Status === "Active" ? "" : "line-through decoration-[red] decoration-3"} `}
      >
        {todo.text}
      </p>
</div>


<div className="flex gap-3"> 
 
  <button onClick={()=>{editHandler(todo.Id , todo.text)}}  className="p-2 text-sm bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 hover:shadow-gray-900/50 transition-all duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  </button>


  <button onClick={()=>{DeleteHandller(todo.Id)}} className="p-2   text-sm bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:shadow-red-900/50 transition-all duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </button>
</div>
</div>
            )
          })}
       <ul className="absolute bottom-0 right-0 m-[10px] flex gap-3 text-white">
  <li onClick={()=>{setfillter("All")}} className="px-2 py-1 rounded-full bg-transparent shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer 
    hover:scale-110 hover:bg-gradient-to-r from-gray-600 to-gray-800 hover:text-gray-50 transform">
    All
  </li>
  <li onClick={()=>{setfillter("Active")}} className="px-2 py-1 rounded-full bg-transparent shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer 
    hover:scale-110 hover:bg-gradient-to-r from-gray-600 to-gray-800 hover:text-gray-50 transform">
    Active
  </li>
  <li onClick={()=>{setfillter("Completed")}} className="px-2 py-1 rounded-full bg-transparent shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer 
    hover:scale-110 hover:bg-gradient-to-r from-gray-600 to-gray-800 hover:text-gray-50 transform">
    Completed
  </li>
</ul>


  </div>
        </div>

        {/* Vertical Gap and Second Box */}
       
      </div>
    </div>
    </>
  )
}

export default App
