import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // console.log("notification", notification);

  // const style = {
  //   border: "solid",
  //   padding: 10,
  //   borderWidth: 1,
  // };
  // return notification && <div style={style}>{notification}</div>;
  return notification && <Alert severity="success">{notification}</Alert>;
};

export default Notification;
