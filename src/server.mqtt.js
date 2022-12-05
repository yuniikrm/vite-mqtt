import mqtt from 'mqtt'
var client  = mqtt.connect('ws://broker.emqx.io:8083/mqtt',{
    port:8083,
    username:'',
    password:'',
})

client.on('connect', function () {
  client.subscribe('vite3-notification-test', function (err) {
    if (!err) {
      client.publish('vite3-notification-test', JSON.stringify({
        content: 'Hello welcome :)'
      }))
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})