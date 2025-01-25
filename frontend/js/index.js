const getStarted = document.getElementById("get-started");

getStarted.addEventListener("click", (e) => {
  window.location.href = "./sign-up"
})

if(localStorage.getItem('id')) {
  console.log(localStorage.getItem('id'));
  window.location = "http://127.0.0.1:5500/frontend/dashboard"
}


// todo: animation(intersectionObserver)

// todo: lazy loading

// todo: create elements by api response