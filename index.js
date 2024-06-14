document.addEventListener('DOMContentLoaded', () => {
    const flipButton = document.getElementById('flipButton');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    let confettiActive = false;

    flipButton.addEventListener('click', () => {
        if (image1.style.transform === 'rotateY(180deg)') {
            image1.style.transform = 'rotateY(0deg)';
            image2.style.transform = 'rotateY(180deg)';
        } else {
            image1.style.transform = 'rotateY(180deg)';
            image2.style.transform = 'rotateY(0deg)';
        }
        startConfetti();
        setTimeout(stopConfetti, 3000);
    });

    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const confettiPieces = Array.from({ length: 100 }).map(createConfettiPiece);

    function createConfettiPiece() {
        return {
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
            angle: Math.random() * 2 * Math.PI,
            spin: (Math.random() - 0.5) * 0.2
        };
    }

    function drawConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach(piece => {
            confettiCtx.save();
            confettiCtx.fillStyle = piece.color;
            confettiCtx.translate(piece.x, piece.y);
            confettiCtx.rotate(piece.angle);
            confettiCtx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            confettiCtx.restore();

            piece.y += piece.speed;
            piece.angle += piece.spin;

            if (piece.y > confettiCanvas.height) {
                piece.y = -piece.size;
                piece.x = Math.random() * confettiCanvas.width;
            }
        });
    }

    function startConfetti() {
        confettiActive = true;
        (function animateConfetti() {
            if (!confettiActive) return;
            drawConfetti();
            requestAnimationFrame(animateConfetti);
        })();
    }

    function stopConfetti() {
        confettiActive = false;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
    class App {
  static canvas = document.querySelector('canvas');
  static ctx = App.canvas.getContext('2d');
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector('#bg1-img'), speed: -0.5 }),
      new Background({ img: document.querySelector('#bg2-img'), speed: -1 }),
      new Background({ img: document.querySelector('#bg3-img'), speed: -1.5 }),
      new Background({ img: document.querySelector('#bg4-img'), speed: -2 }),
      new Background({ img: document.querySelector('#bg5-img'), speed: -3 }),
    ];
  }

  init() {
    App.canvasWidth = innerWidth;
    App.canvasHeight = innerHeight;
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    this.backgrounds.forEach((background) => {
      background.draw();
    });
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
    
    let cursor = document.querySelector('.pig');
        document.querySelector('main').addEventListener('mousemove', (e) => {
      let x = e.pageX;
      let y = e.pageY;
      
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    })
  }
}

class Background {
  constructor(config) {
    this.img = config.img;
    this.height = App.height;
    this.width = App.height * (this.img.width / this.img.height);
    this.leftPos = { x: 0, y: 0 };
    this.rightPos = { x: this.width - 4, y: 0 };
    this.speed = config.speed;
  }
  update() {
    if (this.leftPos.x + this.width < 0) {
      this.leftPos.x = this.rightPos.x + this.width - 4;
    }
    if (this.rightPos.x + this.width < 0) {
      this.rightPos.x = this.leftPos.x + this.width - 4;
    }

    this.leftPos.x += this.speed;
    this.rightPos.x += this.speed;
  }
  draw() {
    App.ctx.drawImage(this.img, this.leftPos.x, this.leftPos.y, this.width, this.height);
    App.ctx.drawImage(this.img, this.rightPos.x, this.rightPos.y, this.width, this.height);
  }
}

const app = new App();
window.addEventListener('load', () => {
  app.init();
  app.render();
});

});
