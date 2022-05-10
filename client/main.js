let socket
new Vue({
  el: '#app',
  data: {
    title: 'App',
    username: 'badna',
    isStart: true,
    isFinish: false,
    isWaiting: false,
    isCountdown: false,
    quiz: [
      "Dari pernyataan-pernyataan berikut, manakah yang salah mengenai content pillar?",
      "RUMAHSAYUR adalah brand quick commerce terbaru yang menjual berbagai bahan masakan. Agar lebih banyak orang yang tau tentang RUMAHSAYUR, tim marketing RUMAHSAYUR menentukan content pillar untuk aktivitas marketing di social media selama bulan Maret 2022 dengan proporsi sebagai berikut: 1. Hero 40%, 2. Hub 30%, 3. Hygiene 30%. Pak Budi sebagai Owner RUMAHSAYUR menginginkan konten Hub lagi walaupun konten Hub sudah mencapai 30%, karena Pak Budi menginginkan comments dan likes yang banyak. Apa dampak dari permintaan Pak Budi?",
      "JAJANLAGI adalah suatu app yang memberikan kemudahan mencari informasi restoran sesuai dengan kriteria kita. App JAJANLAGI mulai dikenal sama netizen, tapi masih kurang adanya interaksi yang menandakan mereka belum berhasil membentuk relationship yang kuat dengan audience-nya. Oleh karena itu, mereka memiliki tujuan untuk meningkatkan engagement dari audience yang sudah ada di social media. Content pillar apakah yang harus menjadi prioritas JAJANLAGI supaya objektifnya tercapai?",
    ],
    quizIndex: 0,
    counter: 3,
    interval: null,
  },
  beforeMount () {
    
    socket = io("https://1016-182-253-160-237.ngrok.io", {
      auth: {
        username: 'admin',
        password: '123'
      }
    })
    console.log(socket);
    socket.on('connect', (sc) => {
      console.log("socket connected");
    })
    socket.on('start', () => {
      this.revealQuiz()
    })
    socket.emit('join')
  },
  methods: {
    selectHandler(data) {
      const params = new URLSearchParams(window.location.search)
      console.log(params.get('username'));
      this.username = params.get('username')
      const obj = {
        username: this.username,
        answer: data
      }
      socket.emit('send-answer', obj)
      this.quizIndex++
      if (this.quizIndex === this.quiz.length) {
        this.isFinish = true
      } else {
        this.isWaiting = true
      }
    },
    startHandler() {
      this.isStart = false
      this.isWaiting = true
    },
    revealQuiz() {
      this.counter = 3
      this.isCountdown = true
      this.isWaiting = false
      this.interval = setInterval(() => {
        if (this.counter === 1) {
          this.isCountdown = false
          clearInterval(this.interval)
        } else {
          this.counter--;
        }
      }, 1000)
    }
  }
});