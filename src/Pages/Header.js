import { Link } from "react-router-dom"

function Header(){
    return(
        <>
        <div className='navbar'>
            <div style={{width : '90%',margin : 'auto',display : 'flex'}}>
              <Link to="/"><div className='navbar-menu tosel'>TOSEL교재몰</div></Link>
              <Link to="/book"><div className='navbar-menu'>책관리</div></Link>
              <Link to="/product"><div className='navbar-menu'>상품관리</div></Link>
              <Link to="/settlement"><div className='navbar-menu'>정산관리</div></Link>
              <Link to="/bookorder"><div className='navbar-menu'>발주관리</div></Link>
              {/* <Link to="/information"><div className='navbar-menu'>정보관리</div></Link> */}
            </div>
        </div>
        </>
    )
}

export default Header