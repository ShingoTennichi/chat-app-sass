//! violating SOLID principal
const databaseUrl = 'http://localhost:3000/sign-up';

const btnSingUp = document.getElementById('btn--sign-up');
btnSingUp.addEventListener('click', async () => {

  const fName = document.getElementById('f-name');
  const lName = document.getElementById('l-name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const cPassword = document.getElementById('c-password');

  const signUp = new SignUp(fName.value, lName.value, email.value, password.value, cPassword.value);
  if (signUp.validateInput()) {
    const { data } = await signUp.signUp()
    if (data.status === 200) {
      window.alert(data.message);
      localStorage.setItem("id", data.body._id);
      window.location = "http://127.0.0.1:5500/frontend/dashboard"
    } else {
      window.alert('Sign up failed. Email is already used');
    }
  } else {
    window.alert('fill all branks and make sure password is matching');
  }
});


class SignUp {
  constructor(fName, lName, email, password, cPassword) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.password = password;
    this.cPassword = cPassword;
  }

  async signUp() {
    const response = await fetch(databaseUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName: this.fName,
        lName: this.lName,
        email: this.email,
        password: this.password
      })
    });

    const body = response.json();

    return body;
  }

  validateInput() {
    if (!this.fName || !this.lName || !this.email || !this.validatePassword(this.password, this.cPassword)) {
      return false;
    }
    return true;
  }

  validatePassword(password, cPassword) {
    if (password || cPassword || (password === cPassword)) {
      return true;
    }
    return false;
  }
}
