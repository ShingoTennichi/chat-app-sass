const linkSignIn = document.getElementById('link__sign-in');
const linkSignOut = document.getElementById('link__sign-out');

console.log(linkSignIn);
console.log(linkSignOut);

console.log(localStorage.getItem('id'));
if(localStorage.getItem('id')) {
  linkSignIn.classList.add('nav__items--item--invisible')
  linkSignOut.classList.remove('nav__items--item--invisible')
} else {
  linkSignIn.classList.remove('nav__items--item--invisible')
  linkSignOut.classList.add('nav__items--item--invisible')
}