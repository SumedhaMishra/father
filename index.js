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

    //function stopConfetti() {
      //  confettiActive = false;
       // confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
//    }

});
