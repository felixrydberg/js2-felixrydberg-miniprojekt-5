document.querySelector('.msg-href').addEventListener('click', (event) => {
  const input: HTMLInputElement = document.querySelector('.form-name');
  if (input.value !== '') {
    localStorage.setItem('name', input.value);
  } else {
    event.preventDefault();
    alert('Please enter a name!');
  }
});
