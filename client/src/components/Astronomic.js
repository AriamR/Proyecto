import React, {useEffect, useState}from 'react'
import nasa from "../images/nasa.jpg"
import space from "../images/astronaut.jpg"
//import video from "../images/satelite.mp4"
import { Pagination } from './Pagination';

const Astronomic = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [searchData, setSearchData] = useState("");
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(false);
    const [pageSize, setPageSize] =useState(3)
    
    useEffect(()=>{
      fetch("/api").then(
        response => response.json()
      ).then(
        data =>{
          setBackendData(data)
        }
      )
    }, [])
 
/*

const openModal = () =>{
    setShow(true)
}


*/

//function search
  
    const searcher = (e) =>{
      setSearchData(e.target.value)
      console.log(e.target)
    }
    
//method filter

    let result = []
    if(!searchData){
        result = backendData      
    }else{
        result = backendData.filter((data) =>
        data.title.toLowerCase().includes(searchData.toLowerCase())
        )
    }if(pageSize && page) {
        result = result.slice((page - 1) * pageSize, page * pageSize)
    }
    
    const maximum = 100 / pageSize;
//design      
  return (
  
    <div class="container" style={{
        background: `url(${space})`, 
        backgroundRepeat: "no-repeat",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundAttachment:"fixed" 
      }}>
     <div className="conMain">
      <div className="containerMain">
        <div className="container1">
            <img className="logo" src={nasa} width="50" alt=""/>
        </div>
        <div >
            <p className="textparraf">Nasa Images-Astronomic</p>
        </div>
      </div>  
    </div>  
      <p className='text2'>Welcome, Here you will find images of our planet.</p>

        <input type="text" value={searchData} onChange={searcher} placeholder="Search images...." className=""/>
      
       <div class="content">
        {(!result) ? (
          <p>Loading...</p>
        ): 
          result.map((datas,index) => (
            <div className="data">       
                <figure className='figure'>  
                  <img className="image"src= {datas.url}/>
                  <div className='textp'><p className="text">{datas.explanation}</p></div>  
                </figure>    
                <div>  
                  <h3 >{datas.title}</h3>
                  <h4 className="hdurl">{datas.hdurl}</h4>
                </div>
        
            </div>
          
          ))
        }

       
      </div>
      <Pagination page={page} setPage={setPage} maximum={maximum}/>
    
    </div>
  )
}


export default Astronomic;
