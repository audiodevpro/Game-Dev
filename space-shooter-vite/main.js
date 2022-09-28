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

//create a projectile class
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

//create enemy class
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

//center player in the middle
const x = canvas.width / 2
const y = canvas.height / 2

//define new player and draw it on the screen
const player = new Player(x, y, 30, 'blue')

const projectiles = []
const enemies = []

//create enemies
function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4

    let x
    let y

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }

    const color = 'green'

    //push enemies toward the center
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    enemies.push(new Enemy(x, y, radius, color, velocity))
  }, 1000)
}

//create an animation function
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  projectiles.forEach((projectile) => {
    projectile.update()
  })

  enemies.forEach((enemy, index) => {
    enemy.update()

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

      //objects touch
      if (dist - enemy.radius - projectile.radius < 1) {
        setTimeout(() => {
          enemies.splice(index, 1)
          projectiles.splice(projectileIndex, 1)
        }, 0)
      }
    })
  })
}

//add a click event for firing projectiles from player
addEventListener('click', (e) => {
  const angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  )
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity)
  )
})

//Call the animation function
animate()
spawnEnemies()
