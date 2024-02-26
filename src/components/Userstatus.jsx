const Userstatus = ({ onClick, name }) => {
  return(
    <div>
      {name} logged in
      <button onClick={onClick} id="logout-button">
          logout
      </button>
    </div>
  )
}

export default Userstatus