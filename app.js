
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

    let keyPressed = e.key.toLowerCase()
		 if(keyPressed == 's'){
			  controls.s = true;
		} else if(keyPressed == 'a'){
        controls.a = true;
		} 
    controls.side = keyPressed
		

      document.addEventListener('keyup', function(e){
        
        // console.log(controls)
        if(keyPressed == 's'){
           controls.s = false;
       } else if(keyPressed == 'a'){
           controls.a = false;
       }
        if(keyPressed == controls.side){
         controls.side = ''
         
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
      

      //defining the other 3 blocks
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
      //put all blocks in an array for the change method
      this.blocks = [this.center, this.block1, this.block2, this.block3]
      this.blocksPosX = [this.x, this.x1, this.x2, this.x3]
      this.blocksPosY = [this.y, this.y1, this.y2, this.y3]
      
    }
   
    move(changeX, changeY){
      this.x += changeX
      this.y += changeY
      let touchingEdge
      // erase prev blocks 
      //for statements must be separated, to erase, draw, and check if any blocks are already on the edge separately
      for(let i = 0; i < this.blocks.length; i++){
      if(this.blocksPosX[i] + changeX < 0 || this.blocksPosX[i] + changeX > 9){
        console.log(this.blocksPosX[i] + changeX)
        console.log('touchingEdge')
        touchingEdge = true
        return 
      
      }
    }
      for(let i = 0; i < this.blocks.length; i++){
        
        
      
        if(touchingEdge != true){
        clearTile(this.blocks[i], ctx)
        
        }
      }
  
        for(let i = 0; i < this.blocks.length; i++){// erase prev blocks
        
          this.blocks[i] = new Tile(this.blocksPosX[i] += changeX, this.blocksPosY[i] += changeY)
        
    
        // drawing new ones
          fillTile(this.blocks[i], ctx)
          // console.log(this.blocks[i])
        
      }
 
      

    

    }
    rotate(direction){
      if(direction == 'right'){
        for(let i = 0; i < this.blocks.length; i++){// erase prev blocks
          let diffX = this.blocks[0]
        }
      }else if(direction == 'left'){

      }
    }


  }let piece = new Piece(-1, 0, 1, 0, 2, 0)

  

  //customizable DAS and ARR
  let handling = {
    'DAS' : 115,
    'ARR' : 0,
  }
  //this runs the game
  drawGrid()
  piece.move(0,0)
  
  setInterval(function() {gravityAni(piece);}, 1000)
  
  controlAni(piece, controls, handling)
  

}

//_______________________________________________________________________________________________________
//_______________________________________________________________________________________________________
//_______________________________________________________________________________________________________
//_______________________________________________________________________________________________________

function gravityAni(piece){//where the dropping animation happens
  if(piece.center.row < 19 * scaleY){
    piece.move(0,1)
  }
  // console.log(piece.center)
  
}


let dasTimer = false
let arr = false 
function controlAni(piece, controls, handling){// moving da pieces
 
  // this huge chunk controls side movement
  if(controls.side == 'a'){
  if(dasTimer == false){
    piece.move(-1, 0)
    dasTimer = true //only run this code once
    setTimeout(function(){das = true; console.log('das is on')}, handling['DAS'])
  }else if (das == true && arr == false){
    if(handling['ARR'] != 0 ){
      function arrMove(){
        if (das == true){
          arr = true
          piece.move(-1, 0)
          setTimeout(arrMove, handling['ARR'])
        }
      }
      arrMove()
    
    }else if (arr == false){
      // this shit hard coded - it will not work for diff pieces, need to
      piece.move(1 -piece.x, 0)
      console.log(piece.x)
    }
  }
}else if (controls.side == 'd'){
  if(piece.x < 10  && dasTimer == false){
    piece.move(1, 0)
    dasTimer = true //only run this code once
    setTimeout(function(){das = true; console.log('das is on')}, handling['DAS'])
  }else if (piece.x > 0 && das == true && arr == false){
    if(handling['ARR'] != 0){
      function arrMove(){
        if(piece.x < 9 && das == true){
          arr = true
          piece.move(1, 0)
          setTimeout(arrMove, handling['ARR'])
        }
        
      }
      arrMove()

    }else if(arr == false){
      piece.move(10-piece.x, 0)
    }
  } 
}else{
  dasTimer = false
  das = false
  
  // console.log('key not pressed')
}
  
  setTimeout(function(){controlAni(piece, controls, handling)}, 1)
  
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


