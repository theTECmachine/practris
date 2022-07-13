  let das
//defining scale of grid tiles 
let scaleX
let scaleY
// tiles for interacting with the grid
class Tile { 
  constructor(column, row){
    this.length = scaleX
    this.height = scaleY
    
    this.column = column * this.length
    this.row = row * this.height
  }
}

//the code that allows you to move
let controls = {
	a : false,
	s : false,
  side: ''
}
  document.addEventListener('keydown',move);
	function move(e) {
		//code that registers if you let go of a key, needed for multi-key inputs
		//code that registers if a key is down
		 if(e.key == 's'){
			  controls.s = true;
		} else if(e.key == 'a'){
        controls.a = true;
		} 
    controls.side = e.key
		

			console.log(controls.side);
      document.addEventListener('keyup', function(e){
        
        if(e.key == 's'){
           controls.s = false;
       } else if(e.key == 'a'){
           controls.a = false;
       }
        if(e.key == controls.side){
         controls.side = ''
         console.log(controls)
       }
 
     })
	}
		

// wait for the HTML to load
document.addEventListener('DOMContentLoaded', init)

// setup config variables and start the program
function init () {
  //for background grid
  gridCanvas = document.getElementById('grid')
  gctx = gridCanvas.getContext('2d')
  //for game-layer
  gameCanvas = document.getElementById('game-layer')
  ctx = gameCanvas.getContext('2d')
  //scaling for grid tiles
   scaleX = gridCanvas.width/10
   scaleY = gridCanvas.height/20
  class Piece {
    constructor(x1, y1, x2, y2, x3, y3){ //define the other blocks coords relative to center, in order to create unique tetrominos
      this.x = 4
      this.y = 0
      this.center = new Tile(this.x, this.y)
      
      //defining block 1, not center
      this.x1 = x1 + this.x
      this.y1 = y1 + this.y
      this.block1 = new Tile(this.x1, this.y1)

      //doing the same again for block 2
      this.x2 = x2 + this.x
      this.y2 = y2 + this.y
      this.block2 = new Tile(this.x2, this.y2)

      //final one
      this.x3 = x3 + this.x
      this.y3 = y3 + this.y
      this.block3 = new Tile(this.x3, this.y3)
      
    }
    move(changeX, changeY){
      clearTile(this.center, ctx)
      clearTile(this.block1, ctx)
      clearTile(this.block2, ctx)
      clearTile(this.block3, ctx)
      this.x += changeX 
      this.y += changeY 
      // console.log(this.x, this.y)
      this.center = new Tile(this.x, this.y)
      this.block1 = new Tile(this.x1 += changeX, this.y1 += changeY)
      this.block2 = new Tile(this.x2 += changeX, this.y2 += changeY)
      this.block3 = new Tile(this.x3 += changeX, this.y3 += changeY)
      fillTile(this.center, ctx)
      fillTile(this.block1, ctx)
      fillTile(this.block2, ctx)
      fillTile(this.block3, ctx)
    }


  }let piece = new Piece(-1, 0, 1, 0, 2, 0)

  

  //customizable DAS and ARR
  let handling = {
    'wait' : 1,
    'DAS' : 115,
    'ARR' : 0,
  }
  handling.current = handling.wait
  //this runs the game
  drawGrid()
  piece.move(0,0)
  
  setInterval(function() {gravityAni(piece);}, 1000)
  
  controlAni(piece, controls, handling)
  

}



function gravityAni(piece){//where the dropping animation happens
  if(piece.center.row < 19 * scaleY){
    piece.move(0,1)
  }
  // console.log(piece.center)
  
}


let dasTimer = false
  
function controlAni(piece, controls, handling){// moving da pieces
 
  if(controls.side == 'a'){
  if(piece.x > 0 && dasTimer == false){
    piece.move(-1, 0)
    dasTimer = true //only run this code once
    console.log('hello!')
    setTimeout(function(){das = true; console.log('das is on')}, handling['DAS'])
  }else if (piece.x > 0 && das == true){
    if(handling['ARR'] != 0){
    let activeARR = setInterval(function(){piece.move(0, -1)}, handling['ARR'])
    console.log('arr is not 0')
    }else{
      console.log('arr is 0')
      piece.move(-piece.x, 0)
    }
  }
}else if (controls.side == 'd'){
  if(piece.x > 0 && dasTimer == false){
    piece.move(1, 0)
    dasTimer = true //only run this code once
    console.log('hello!')
    setTimeout(function(){das = true; console.log('das is on')}, handling['DAS'])
  }else if (piece.x > 0 && das == true){
    if(handling['ARR'] != 0){
    let activeARR = setInterval(function(){piece.move(0, 1)}, handling['ARR'])
    console.log('arr is not 0')
    }else{
      console.log('arr is 0')
      piece.move(10-piece.x, 0)
    }
  } 
}else{
  dasTimer = false
  das = false
  // console.log('key not pressed')
}
  
  setTimeout(function(){controlAni(piece, controls, handling)}, handling.current)
  
}



//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function fillTile(tile, canvas){
  canvas.fillRect(tile.column, tile.row, tile.length, tile.height)
}

function clearTile(tile, canvas){
  canvas.clearRect(tile.column, tile.row, tile.length, tile.height)
 
}

function drawGrid(){ // <-- bruh just read it

  for (let x = 0; x< 10; x++) {
    for (let y = 0; y < 20; y++) {
      
      let tile = new Tile(x, y)
      // console.log(tile.column, tile.row, tile.length, tile.height)
      gctx.strokeRect(tile.column, tile.row, tile.length, tile.height)      

    }
  }
}


