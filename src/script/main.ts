(function () {
  document.querySelector('.msg-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const input: HTMLInputElement = document.querySelector('.form-name');
    localStorage.setItem('name', input.value);
    window.location.replace(new URL('../app.html', import.meta.url));
  });
})();
