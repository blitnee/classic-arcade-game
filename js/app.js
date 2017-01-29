var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 50;     // Variable to simulate collision
    this.height = 30;    // Variable to simulate collision
    this.speed = Math.floor(Math.random() * (550 - 150 + 1)) + 150;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x < 500) {    //off canvas enemy end point
        this.x = this.x +(this.speed * dt);
    }
    else {
        this.x = -100   //off canvas enemy origin point
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x =  200;
    this.y = 395;
    this.width = 10;     // Variable to simulate collision
    this.height = 30;    // Variable to simulate collision
    this.score = 0;      // Starts player score at 0
    alert('Move your hero using the arrow keys. Avoid the bugs! Collect 300 points to win the game. Good Luck!');
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
    if (this.y <= 50) {     // Creates finish line, adds 100pts to score
        this.score += 100;
        ctx.clearRect(150, 550, 200, 500);
        ctx.font = "15px Georgia";
        ctx.fillText("Score:" + " " + player.score, 215, 600);
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'left' && this.x > 50) {
        this.x -= 100;
    }
    if (allowedKeys === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (allowedKeys === 'up' && this.y > 50) {
        this.y -= 80;
    }
    if (allowedKeys === 'down' && this.y < 350) {
        this.y += 80;
    }  

    // Alerts player that they have won the game, restarts
    if(this.score === 300) {
        alert("You win! Play again?");
        this.score = 0;
    }
};

/*
 * reset jumps the player back to their starting
 * position. This is used in the 'checkCollisions' and 
 * and 'update' functions.
 */
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 395;
};

/*
 * checkCollions loops through each enemy position,
 * validating if the player position is within 
 * enemy object bounds.
 */
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width 
            && this.x + this.width > allEnemies[i].x
            && this.y < allEnemies[i].y + allEnemies[i].height 
            && this.y + this.height > allEnemies[i].y) {
            this.reset();     // player is moved back to start on collision
            this.score = 0;   // player score is restarted at 0
            // Displays player score
            ctx.clearRect(150, 550, 200, 500);
            ctx.font = "15px Georgia";
            ctx.fillText("Score:" + " " + player.score, 215, 600);}
        }
};

var player = new Player();

/*
 * Eacn Enemy spawns off canvas at -100 to avoid abrupt
 * visuals on screen. Each enemy has a unique y position.
 */
var allEnemies = [
    new Enemy(-100,60),  
    new Enemy(-100,140),
    new Enemy(-100,230)
];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
