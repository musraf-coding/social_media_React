import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Newpost from "./Newpost";
import Postpost from "./Postpost";
import Nav from "./Nav";
import {  Route, Routes} from "react-router-dom";
import Editpost from "./Editpost";

import useWindowssize from "./hooks/useWindowssize";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "./hooks/useaxiosfetch";
import api from './api/posts';
import { useState,useEffect } from "react";







function App() {
  const [posts,setPosts] =useState([]);
  const [searchRes,setsearchRes]= useState([])
  const [search,setSearch]=useState("");

  const [postName,setPostName] =useState("");
  const [postBody,setPostBody] =useState("");

  const [editName,seteditName] =useState("");
  const [editBody,seteditBody] =useState("");
  const {width}=useWindowssize();

  const navigate =useNavigate();
  const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts')

useEffect(()=>{
  setPosts(data);
},[data])

  // useEffect(()=>{
  //   const fetchPosts = async()=>{
  //     try{
  //     const response = await api.get('/posts');
  //     setPosts(response.data)
  //     }
  //     catch(err){
  //       if(err.response){
  //         console.log(err.response.data)
  //         console.log(err.response.status)
  //         console.log(err.response.Headers)
  //       }
  //       else{
  //         console.log(err.message)
  //       }
  //     }
  //   }
  //   fetchPosts();
  // },[]);


  useEffect(()=> {
      const filterRes = posts.filter(
        (post)=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())||
      ((post.name).toLowerCase()).includes(search.toLowerCase())
    );

    setsearchRes(filterRes.reverse());
  },[posts,search])
  

  

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const id = posts.length ? posts[posts.length-1].id + 1:1;
    const newpost ={id,name:postName,body:postBody};
      try{
          const response = await api.post("/posts",newpost);
          const allposts =[...posts, response.data];
          setPosts(allposts);
          setPostName("")
          setPostBody("")
          navigate("/")
      }
      catch(err){
        if(err.message){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.Headers)
        }
        else{
          console.log(err.message)
        }
      }

  }
const handleEdit= async(id)=>{

  const updatedpost ={id,name:editName,body:editBody};
  try{
    const response = await api.put(`posts/${id}`,updatedpost)
    setPosts(posts.map((post)=>post.id===id?{...response.data}:post))
    seteditName("")
    seteditBody("")
    navigate("/")
    
  }
  catch(err){
console.log(err.message)
  }

}


  const handleDelete = async(id)=>{
     
      try{
       await  api.delete(`posts/${id}`)
       const delitem =  posts.filter(post=> post.id!==id)
        setPosts(delitem)
        navigate("/")
      }
      catch(err){
        console.log(err.nessage)
      }

      
  }
  
 
  
  return (
    <div className="App">
      
     
                  <Header tittle="Musraf Contact List" width={width}/>
                  <Nav search={search}
                  setSearch={setSearch}/>
                    <Routes>
                                  <Route path="/" element={<Home posts= {searchRes}
                                  fetchError={fetchError}
                                  isLoading={isLoading}/>}/>
                            <Route path="/post">
                                  <Route index element={ <Newpost 
                                 handleSubmit={handleSubmit}
                                 postName={postName} 
                                 setPostName={setPostName}
                                 postBody={postBody}
                                 setPostBody={setPostBody}/>}/>
                                    <Route path=":id" element={ <Postpost posts={posts}
                                    handleDelete={handleDelete}/>}/>
                              </Route>
                              <Route path="/about" element={ <About />}/>
                              
                              <Route path="*" element={<Missing /> }/>
                              <Route path="/edit/:id" element={<Editpost 
                              editBody={editBody}
                              editName={editName}
                              seteditBody={seteditBody}
                              seteditName={seteditName}
                              handleEdit={handleEdit}
                              posts={posts}/>}/>
                    </Routes>

                
                  <Footer/>    
      
    </div>
  );
}


export default App;
