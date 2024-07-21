/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import "./Notification.css";

export function Notification() {
  const notification = useSelector(state => state.notification);

  if (!(notification.msg || notification.type)) {
    return null;
  }

  return <div className={`notification notification-${notification.type}`}>{notification.msg}</div>;
}
