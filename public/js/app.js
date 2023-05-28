console.log("client side code");

let weatherForm = document.querySelector("form");
let search = document.querySelector("input");
let messageOne = document.querySelector("#message-1");
let messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  //   console.log(location);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then(({ error, location, address, forecast }) => {
      if (error) {
        return (messageOne.textContent = error);
      }
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
  });
});
