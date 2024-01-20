const SCREEN_WIDTH = window.innerWidth - 10
const SCREEN_HEIGHT = window.innerHeight - 10

class Window {
  constructor() {
    this.canvas = document.querySelector('#screen')
    this.context = this.canvas.getContext('2d')

    this.position = { x: 0, y: 0 }
    this.speed = { x: 0, y: 0 }
    this.color = { r: 0, g: 0, b: 0 }
    
    this.canvas.width = SCREEN_WIDTH
    this.canvas.height = SCREEN_HEIGHT

    this.picture = new Image()
    this.picture.src = 'https://github.com/rdev32/powerdvd-web/blob/main/assets/logo.png?raw=true'
    
    this.position.x = this.getRandomInt(SCREEN_WIDTH)
    this.position.y = this.getRandomInt(SCREEN_HEIGHT)
    
    this.speed.x = 10
    this.speed.y = 10

    this.pickColor()

    this.fps = 30
    this.interval = 1000 / this.fps
    this.then = Date.now()

    this.render = this.render.bind(this)
  }

  render() {
    requestAnimationFrame(this.render)

    const now = Date.now()
    const delta = now - this.then

    if (delta > this.interval) {
      this.then = now - (delta % this.interval)

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
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

      this.context.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
      this.context.imageSmoothingQuality = 'high'
      this.context.fillRect(this.position.x, this.position.y, this.picture.width, this.picture.height)
      this.context.drawImage(this.picture, this.position.x, this.position.y)
    }
  }

  pickColor() {
    this.color = this.getRandomVal()
  }

  getRandomInt(max, min = 0) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  getRandomVal() {
    const minBrightness = 100

    const getRandomBrightVal = () => {
      return Math.floor(Math.random() * (250 - minBrightness) + minBrightness)
    }
  
    return {
      r: getRandomBrightVal(),
      g: getRandomBrightVal(),
      b: getRandomBrightVal(),
    }
  }
}

window.addEventListener('load', () => {
  document.querySelector('#loader').hidden = true
  const wnd = new Window()
  wnd.render()
})
