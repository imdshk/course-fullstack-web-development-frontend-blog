const Userstatus = ({ onClick, name }) => {
  return(
    <div>
      {name} logged in
      <button onClick={onClick}>
          logout
      </button>
    </div>
  )
}

export default Userstatus