import Feed from './Feed'

const Home = ({posts,fetchError,isLoading}) => {
  // const = useContext(DataContext) 
  return (
    <main className='Home'>   
      {isLoading && <p className='statusMsg'>LOADING DATAS...</p>}
      {!isLoading && fetchError && <p style={{color:"red"}}>{fetchError}</p>}
      {!isLoading && !fetchError &&  posts.length? (<Feed posts={posts}/>):(<p style={{marginTop:"2rem"}}>No posts to diplay</p>)}
      
    </main>

  )
}

export default Home