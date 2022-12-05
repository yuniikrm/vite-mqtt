import { useState, useEffect } from 'react'
import useMqtt from './hooks/useMqtt'
import './App.css'

function App() {
  const { mqttSubscribe, isConnected, payload } = useMqtt();
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (isConnected) {
      mqttSubscribe('vite3-notification-test');
    }
  }, [isConnected]);

  useEffect(() => {
    if (payload.message
      && ['vite3-notification-test'].includes(payload.topic)
    ) {
      const newMessage = JSON.parse(payload.message);
      const notif = [...notificationList, newMessage]
      setNotificationList(notif)
      new Notification(newMessage.content);
    }
  }, [payload]);


  return (
    <div className="App">
      <h1>MQTT React Vite</h1>
      <div className="card">
        <h2>Notifications : </h2>
        <ol>
        {
          notificationList.map((obj) => (
            <li>{obj.content}</li>
          ))
        }
        </ol>
      </div>
    </div>
  )
}

export default App
