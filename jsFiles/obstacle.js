class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.img = './images/zidane.png'
    }

    drawObstacle(){
        const obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
      }
    }

    class Messi {
      constructor(x, y, width, height) {
          this.x = x;
          this.y = y;
          this.width = 50;
          this.height = 70;
          this.img = './images/cartoon messi.png'
      }
  
      drawMessi(){
          const messiImg = new Image();
          messiImg.src = this.img;
          ctx.drawImage(messiImg, this.x, this.y, this.width, this.height);
        }
      }
  

