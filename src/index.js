import "./index.css";
import Astronauta from "./astronaut.png";
import Rocket from "./rocket.png";
import Logo from "./logo-white.png";
import MecNyan from "./mecnyan.png";

const root = document.querySelector("#root");

const navBar = document.createElement("div");
navBar.setAttribute("id", "navbar");
const logo = document.createElement("img");
logo.setAttribute("id", "logo");
logo.src = Logo;
logo.alt = "Henry";
navBar.appendChild(logo);

const sorryMessage = document.createElement("span");
sorryMessage.setAttribute("class", "sorry");
sorryMessage.innerHTML = "Sorry, we couldn't find what you've been looking for";

navBar.appendChild(sorryMessage);

const mec = document.createElement("img");
mec.setAttribute("class", "avatar");
mec.src = MecNyan;
const login = document.createElement("div");
login.appendChild(mec);

navBar.appendChild(mec);

root.appendChild(navBar);

const separator = document.createElement("div");
separator.setAttribute("id", "separator");
root.appendChild(separator);

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

message.innerHTML = "<div class='big'>Oops!</div>";
message.innerHTML += "<div>There's nothing here</div>";

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
    container.style.backgroundPositionX = `${-5 + distance / 500}vw`;
  } else {
    let distance = clientX - centerX;
    let angle = deformation * (distance / centerX);
    coheteTransform += `translateX(-${distance / ratioCohete}px) `;
    coheteTransform += `rotateY(${angle * -1}deg)`;
    astronautaTransform += `translateX(-${distance / ratioAstronauta}px) `;
    astronautaTransform += `rotateY(${angle * -1}deg)`;
    container.style.backgroundPositionX = `${-5 - distance / 500}vw`;
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
