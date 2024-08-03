import { FaLaptop,FaTabletAlt,FaMobileAlt } from "react-icons/fa"

const Header = ({tittle,width}) => {
  // const {} =useContext(DataContext)
  return (
    <header className='Header'>
    <h1>{tittle}</h1>
    {width < 768 ? <FaMobileAlt />
    :width <992 ? <FaTabletAlt /> :
     <FaLaptop />
    }
    </header>
  )
}


export default Header