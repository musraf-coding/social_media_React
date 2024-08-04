

const Newpost = ({handleSubmit,postName,setPostName,postBody,setPostBody}) => {
  // const = useContext(DataContext)
    return (
    <main className='NewPost'>

    <h2>Add Contact</h2>
    <form className='newPostForm' onSubmit={handleSubmit}>

      <label htmlFor='postName'>Name:</label>
      <input 
          id='postName'
          type='text'
          placeholder='Name'
          value={postName}
          onChange={(e)=>setPostName(e.target.value)}
      />
        <label htmlFor='postBody'>Number:</label>
      <input
          id='postBody'
          type='text'
          placeholder='Number'
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
      />

      <button type='submit'>ADD</button>

    </form>
    </main>

  )
}

export default Newpost