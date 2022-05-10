let socket
new Vue({
  el: '#app',
  beforeMount () {
    socket = io("https://1016-182-253-160-237.ngrok.io", {
      auth: {
        username: 'admin',
        password: '123'
      }
    })
    socket.on('connect', (sc) => {
      console.log("socket connected");
    })
    socket.emit('join')
  },
  methods: {
    start() {
      socket.emit('admin-start')
    }
  }
});