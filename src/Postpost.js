
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom'


const Postpost = ({posts,handleDelete}) => {
  // const  =useContext(DataContext)

  const {id} =useParams();
  const post = posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
 
    <article className='post'>
      {post &&
        <>
        <h2>{post.name}</h2>
        <p className='postBody'>
          {post.body}
        </p>
        <button  className="deleteButton"onClick={()=>handleDelete(post.id)}>Delete Contact</button>
        <button className="editButton"><Link to={`/edit/${post.id}`}>Edit Contact</Link></button>
        </>
      }
      {!post &&

      <>
      <h2>Page not found</h2>
      <p>kindly visit our home page</p>
      </>

      }
    </article>
    
    </main>
   

  )
}

export default Postpost