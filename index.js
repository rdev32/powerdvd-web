const SCREEN_WIDTH = window.innerWidth - 10
const SCREEN_HEIGHT = window.innerHeight - 10

class Environment {
  constructor() {
    this.canvas = document.querySelector('#screen')

    this.context = this.canvas.getContext('2d')
    this.picture = null

    this.position = { x: 0, y: 0 }
    this.speed = { x: 0, y: 0 }
    this.color = { r: 0, g: 0, b: 0 }
  }

  run() {
    this.setup()
    setInterval(() => {
      this.clean()
      this.draw()
    }, 1000 / 10);
  }

  async setup() {
    this.canvas.width = SCREEN_WIDTH
    this.canvas.height = SCREEN_HEIGHT
    this.picture = new Image
    this.picture.src = './assets/logo.png'
    
    this.position.x = this.getRandomInt(SCREEN_WIDTH)
    this.position.y = this.getRandomInt(SCREEN_HEIGHT)
    
    this.speed.x = 10
    this.speed.y = 10

    this.pickColor()
  }

  draw() {
    this.context.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
    this.context.imageSmoothingQuality = 'high'
    this.context.fillRect(this.position.x, this.position.y, this.picture.width, this.picture.height)
    this.context.drawImage(this.picture, this.position.x, this.position.y)

    this.position.x = this.position.x + this.speed.x
    this.position.y = this.position.y + this.speed.y
  
    if (this.position.x + this.picture.width >= this.canvas.width) {
      this.speed.x = -this.speed.x
      this.position.x = this.canvas.width - this.picture.width
      this.pickColor()
    } else if (this.position.x <= 0) {
      this.speed.x = -this.speed.x
      this.position.x = 0
      this.pickColor()
    }
  
    if (this.position.y + this.picture.height >= this.canvas.height) {
      this.speed.y = -this.speed.y
      this.position.y = this.canvas.height - this.picture.height
      this.pickColor()
    } else if (this.position.y <= 0) {
      this.speed.y = -this.speed.y
      this.position.y = 0
      this.pickColor()
    }
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  pickColor() {
    this.color.r = this.getRandomVal()
    this.color.g = this.getRandomVal()
    this.color.b = this.getRandomVal()
  }

  getRandomInt(max, min = 0) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  getRandomVal() {
    const steps = [56, 127, 250]
    const randomStep = steps[Math.floor(Math.random() * steps.length)]
    return randomStep
  }
}

window.addEventListener('load', () => {
  document.querySelector('#loader').hidden = true
  const game = new Environment()
  game.run()
})
