var socket;

const W = 600
const H = 600


const cells = []

const mazeW = 32
const mazeH = 32

const stack = []

const pixelSize = 16

let posx=0
let posy=0

let posx2=31
let posy2=31

let puntos = 0
let puntos2 = 0

let current


// ----------------------------------------
function setup() {
  socket = io.connect("http://localhost:3000")
  const canvas = createCanvas(W, H)
  canvas.parent('#canvasHolder')

  for (let y = 0; y < mazeH; y++) {
    const row = []
    for (let x = 0; x < mazeW; x++) {
      row.push(new Cell(x, y))
    }
    cells.push(row)
  }

  const rx = Math.round(Math.random() * mazeW)
  const ry = Math.round(Math.random() * mazeH)

  const first = cells[ry][rx]
  first.visited = true
  stack.push(first)
  setTimeout(ganador,300000)
  var data = {
    id:socket.id
  }
  socket.emit('start',data)
}


function ganador(){
  if(puntos<puntos2)
    alert('El ganador es Azul con '+puntos2+' puntos')
  else if(puntos>puntos2)
    alert('El ganador es Anaranjado con '+puntos+' puntos')
  else 
    alert('hay un empate')
  location.reload()
  setTimeout(create,300000)
  
  

}


// ----------------------------------------
function draw() {
  background(500);



  while (stack.length > 0) {
    current = stack[stack.length - 1]

    let valid = false
    let checks = 0

    while (!valid && checks < 10) {
      checks++
      let direction = Math.round(Math.random() * 4)

      switch (direction) {
        // WEST
        case 0:
        if (current.x > 0) {
          let next = cells[current.y][current.x - 1]

          if (!next.visited) {
            current.west = false
            next.east = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;

        // NORTH
        case 1:
        if (current.y > 0) {
          let next = cells[current.y - 1][current.x]

          if (!next.visited) {
            current.north = false
            next.south = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;

        case 2: // EAST
        if (current.x < (mazeW - 1)) {
          let next = cells[current.y][current.x + 1]

          if (!next.visited) {
            current.east = false
            next.west = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;

        case 3: // SOUTH
        if (current.y < (mazeH - 1)) {
          let next = cells[current.y + 1][current.x]

          if (!next.visited) {
            current.south = false
            next.north = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;
      }
    }

    if (!valid) {
      stack.pop()
    }
  }

  for (let y = 0; y < mazeH; y++) {
    for (let x = 0; x < mazeW; x++) {
      cells[y][x].draw(pixelSize)
    }
  }

  for (let x = 0; x < 32; x++) {
    for (let y = 0; y < 32; y++) {

      noStroke()
      fill('#EA171E')
      if(cells[y][x].puntos == true){
        ellipse(
          cells[y][x].x * pixelSize + (pixelSize / 2),
          cells[y][x].y * pixelSize + (pixelSize / 2),
          pixelSize / 2,
          pixelSize / 2
        )
      }
  	}
  }
  noStroke()
  fill('#EA7317')  
  rect(posx*pixelSize, posy*pixelSize, 15, 15)

  fill('#171EEA')  
  rect((posx2)*pixelSize, (posy2)*pixelSize, 15, 15)
  
  noStroke()
      fill('#EA7317');
      textSize(40)
      text("Anaranjado  "+puntos,10,580)
      fill('#171EEA');
      textSize(40)
      text("Azul  "+puntos2,400,580)

  if((puntos+puntos2)==1024)
    if(puntos<puntos2)
      alert('El ganador es Azul con '+puntos2+' puntos')
    else if(puntos>puntos2)
      alert('El ganador es Anaranjado con '+puntos+' puntos')
    else {
          ('hay un empate')
      location.reload()
    }
}




function keyPressed(){

  if (keyCode==ENTER){
    if(puntos<puntos2)
      alert('El ganador es Azul con '+puntos2+' puntos')
    else if(puntos>puntos2)
      alert('El ganador es Anaranjado con '+puntos+' puntos')
    else 
      alert('hay un empate')
      location.reload()
  }

    if (keyCode==RIGHT_ARROW && posx<31){
      
        if(cells[posy][posx].east==false){
            posx+=1 
            if(cells[posy][posx].puntos==true){
              cells[posy][posx].puntos = false
              puntos+=1
               
            }                      
        }        
      
    }
    if (keyCode==LEFT_ARROW && posx>0){
          if(cells[posy][posx].west==false){
            posx-=1;
            if(cells[posy][posx].puntos==true){
              cells[posy][posx].puntos = false
              puntos+=1
            }
            
          }

    }
    if (keyCode==UP_ARROW && posy>0){
      if(cells[posy][posx].north==false){  
        posy-=1;
        if(cells[posy][posx].puntos==true){
          cells[posy][posx].puntos = false
          puntos+=1
        }  
      }
    }
    if (keyCode==DOWN_ARROW && posy<31){
      if(cells[posy][posx].south==false){
        posy+=1;
        if(cells[posy][posx].puntos==true){
          cells[posy][posx].puntos = false
          puntos+=1
        }
      }
    }
 

}

function keyTyped(){
  if(key=='a' && posx2>0){
    if(cells[posy2][posx2].west==false){
      posx2-=1;
      if(cells[posy2][posx2].puntos==true){
        cells[posy2][posx2].puntos = false
        puntos2+=1
      }
      
    }
  }else 
  if (key=='d' && posx2<31){
      
    if(cells[posy2][posx2].east==false){
        posx2+=1 
        if(cells[posy2][posx2].puntos==true){
          cells[posy2][posx2].puntos = false
          puntos2+=1
           
        }                      
    }        
  
  }else
  if (key=='w' && posy2>0){
    if(cells[posy2][posx2].north==false){  
      posy2-=1;
      if(cells[posy2][posx2].puntos==true){
        cells[posy2][posx2].puntos = false
        puntos2+=1
      }  
    }
  }else
  if (key=='s' && posy2<31){
    if(cells[posy2][posx2].south==false){
      posy2+=1;
      if(cells[posy2][posx2].puntos==true){
        cells[posy2][posx2].puntos = false
        puntos2+=1
      }
    }
  }



}

