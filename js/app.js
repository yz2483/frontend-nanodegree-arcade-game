// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 70;
    this.speed = Math.floor(Math.random() *200)+200;
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {       
        this.reset()
    }
}

//reset Enemy's position when it runs out of boundary
Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = 83 * (Math.floor(Math.random() * 3)) + 60;
    this.speed = Math.floor(Math.random() * 200)+200 ;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var score = 0;
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.render = function (dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  
    this.handleInput = function (input) {
        if (input === 'up') {
            this.y -= 82;
        }
        if (input === 'down') {
            if (this.y < 350) {
                this.y += 82;
            }
        }
        if (input === 'left') {
             console.log("lefet x:" + this.x );
            if (this.x > 1) {
                this.x -= 101;
            }           
        }
        if (input === 'right') {           
            if (this.x < 410) {
                this.x += 101;
            }
            if (this.x > 405) {
                this.x -= 101;
            }

        }
        // Keeps the player in bounds and controls what
        // happens when he reaches the water: awards him
        // 100 points, moves him back to start
        if (this.y < 50) {
            this.x = 203;
            this.y = 400;
            score += 100;
            
            console.log("Score: " + score);
        }
    }
};

Player.prototype.update = function(){
	this.x1 = this.x;
	this.x2 = this.x + 75;
	this.y1 = this.y;
	this.y2 = this.y + 75;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(203, 400);


var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-150, 230)
var allEnemies = [enemy1, enemy2, enemy3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

