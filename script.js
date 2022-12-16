const spieler = document.querySelector(".player");
spieler.style.top = "200px";

const targetDiv = document.getElementById("welcomediv");
const btn = document.getElementById("welcometoggle");

const spielfeld = document.querySelector(".playground");
let backgroundPosition = 0;
let timer = new Timer(40);

btn.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  } else {
    targetDiv.style.display = "block";
  }
};
//definition ob der spieler nach oben oder nach unten fliegt.
function steuerung() {
  if (keyboard(38) && parseInt(spieler.style.top) > 0) {
    spieler.style.top = parseInt(spieler.style.top) - 15 + "px";
  }
}
//
function block_erstellen() {
  if (timer.ready()) {
    let zufall = Math.random() * (350 - 50) + 50;
    const h = document.createElement("div");
    h.classList.add("stein");
    h.style.top = "0px";
    h.style.left = "1450px";
    h.style.height = zufall + "px";
    spielfeld.appendChild(h);
    const b = document.createElement("div");
    b.classList.add("stein");
    b.style.bottom = "0px";
    b.style.left = "1450px";
    b.style.height = 400 - zufall + "px";
    spielfeld.appendChild(b);
  }
}

function block_bewegen() {
  let steine = document.querySelectorAll(".stein");
  for (let stein of steine) {
    stein.style.left = parseInt(stein.style.left) - 6 + "px";
    if (parseInt(stein.style.left) < 100) {
      stein.parentNode.removeChild(stein);
      score = score + 0.5;
      punkteAnzeige.textContent = score;
    }
  }
}
let punkteAnzeige = document.querySelector(".punkte");
let score = 0;
function schwerkraft() {
  if (parseInt(spieler.style.top) < 700) {
    spieler.style.top = parseInt(spieler.style.top) + 4 + "px";
  }
}
function background_scrolling() {
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;
}
function kollision() {
  if (anyCollision(spieler, document.querySelectorAll(".stein"))) {
    confirm("Game over!");
    return true;
  }
}
function loop() {
  steuerung();
  block_erstellen();
  block_bewegen();
  schwerkraft();
  background_scrolling();
  if (kollision()) {
    return;
  }
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
