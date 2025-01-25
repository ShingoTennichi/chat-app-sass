//! violating SOLID principal
const databaseUrl = 'http://localhost:3000/sign-in';
const btnSignIn = document.getElementById('btn--sign-in');
const email = document.getElementById('email');
const password = document.getElementById('password');

btnSignIn.addEventListener('click', async () => {
  console.log(email.value, password.value);

  const signIn = new SignIn(email.value, password.value);

  if (signIn.validateInput()) {
    const { data } = await signIn.signIn();
    console.log(data);
    if (data.status === 200) {
      window.alert(data.message);
      localStorage.setItem("id", data.body._id);
      console.log(localStorage.getItem('id'));
      window.location = "http://127.0.0.1:5500/frontend/dashboard"
    } else {
      window.alert(data.message);
    }
  }
  else {
    window.alert("Invalid input")
  }

})


class SignIn {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  validateInput() {
    if (!this.email || !this.password) {
      return false;
    }

    return true;
  }

  async signIn() {
    const response = await fetch(databaseUrl, {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    });

    const body = await response.json();

    return body;
  }
}