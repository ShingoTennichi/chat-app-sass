const socket = io("ws://localhost:3001", {
  auth: {
    user: "userToken"
  }
});

const key = "message";

socket.on(key, text => {
  console.log(text);
  const message = document.createElement('li');
  message.classList.add("chat__message", "chat__message--me");
  message.innerHTML = text[1];
  document.getElementById("chat").appendChild(message);

});

document.querySelector('button').onclick = () => {
  const text = document.querySelector('input').value;

  socket.emit(key, text);
}