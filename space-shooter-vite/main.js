const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//make canvas take up fullscreen
canvas.width = innerWidth
canvas.height = innerHeight

//create player class and draw method
class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
}

//center player in the middle
const x = canvas.width / 2
const y = canvas.height / 2

//define new player and draw it on the screen
const player = new Player(x, y, 30, 'blue')
player.draw()
