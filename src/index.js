import "./index.css";
import Astronauta from "./astronaut.png";
import Rocket from "./rocket.png";

const root = document.querySelector("#root");

const container = document.createElement("div");
container.setAttribute("id", "container");

// These will be images...
const cohete = document.createElement("img");
cohete.src = Rocket;
cohete.setAttribute("id", "cohete");

const astronauta = document.createElement("div");
astronauta.setAttribute("id", "astronauta");

const astronautaImg = document.createElement("img");
astronautaImg.src = Astronauta;

const message = document.createElement("div");
message.setAttribute("id", "message");

message.innerHTML = "<span><b>404<br />Not found</b></span>";

astronauta.appendChild(message);
astronauta.appendChild(astronautaImg);

const display = document.createElement("div");
display.setAttribute("id", "display");
container.appendChild(display);

container.appendChild(cohete);
container.appendChild(astronauta);

root.appendChild(container);

const threshold = 15;

function handleHover(e) {
  const { clientX, clientY, currentTarget } = e;
  const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

  display.innerHTML = `x: ${clientX} y: ${clientY}`;

  const ratioCohete = 30;
  const ratioAstronauta = 15;
  const perspective = 1000;
  const deformation = 5;
  const centerX = clientWidth / 2;
  const centerY = clientHeight / 2;

  let coheteTransform = `perspective(${perspective}px) `;
  let astronautaTransform = `perspective(${perspective}px) `;

  if (clientX < centerX) {
    let distance = centerX - clientX;
    let angle = deformation * (distance / centerX);
    coheteTransform += `translateX(${distance / ratioCohete}px) `;
    coheteTransform += `rotateY(${angle}deg)`;
    astronautaTransform += `translateX(${distance / ratioAstronauta}px) `;
    astronautaTransform += `rotateY(${angle}deg)`;
  } else {
    let distance = clientX - centerX;
    let angle = deformation * (distance / centerX);
    coheteTransform += `translateX(-${distance / ratioCohete}px) `;
    coheteTransform += `rotateY(${angle * -1}deg)`;
    astronautaTransform += `translateX(-${distance / ratioAstronauta}px) `;
    astronautaTransform += `rotateY(${angle * -1}deg)`;
  }

  if (clientY < centerY) {
    let distance = centerY - clientY;
    coheteTransform += `translateY(${distance / (ratioCohete * 4)}px)`;
    astronautaTransform += `translateY(${distance / (ratioAstronauta * 4)}px)`;
  } else {
    let distance = clientY - centerY;
    coheteTransform += `translateY(-${distance / (ratioCohete * 4)}px)`;
    astronautaTransform += `translateY(-${distance / (ratioAstronauta * 4)}px)`;
  }

  cohete.style.transform = coheteTransform;
  astronauta.style.transform = astronautaTransform;
}

function resetStyles(e) {
  card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}
container.addEventListener("mousemove", handleHover);
container.addEventListener("mouseleave", handleHover);
