const Notification = ({ message }) => {
  const notificationColor = message[1] === "good" ? "green" : "red"
  const notificationId = message[1] === "good" ? "notification" : "notification-error"
  const notificationStyle = {
    color: notificationColor,
    background: "lightgray",
    fontSize: 20,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    BorderColor: notificationColor,
    marginBottom: 10
  }
  if(message[0] === null) {
    return null
  }

  return (
    <div style={notificationStyle} id={notificationId}>
      {message[0]}
    </div>
  )
}

export default Notification