import { db } from './db';
import { Message } from './message';
import { ref, onValue, set } from 'firebase/database';

(function () {

  //If username = null go back to home page :)
  if(!localStorage.getItem("name")) {
    window.location.href = "../";
  }
  //Clearar localstorage när man går till Home pagen
  document.querySelector("header nav ul li a").addEventListener("click", ()=>{
    localStorage.clear()
  });


  //Startar messages classen och sätt onValue funktionen
  (function () {
    const messages: Message = new Message();
    document.querySelector('.msg-form').addEventListener('submit', (event) => {
      event.preventDefault();
      sendMessage(messages);
    });
    onValue(ref(db), (snapshot) => {
      let result: object = snapshot.val();
      messages.clear();
      for (const key in result) {
        messages.addMessage(result[key]);
      }
      messages.reverse();
      Msg(messages);
    });
  })();

  //Skapar Message objecten och lägger i en Array
  const Msg = (messages) => {
    const parent: HTMLElement = document.querySelector('.article-msg');
    while (parent.firstChild) {
      parent.lastChild.remove();
    }
    for (const key in messages.messages) {
      displayMsg(messages, messages.messages[key], key);
    }
  };

  //Skapar alla DOM element för chattmeddelandena
  const displayMsg = (messages, message, index) => {
    const parent: HTMLElement = document.querySelector('.article-msg');

    const months: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    let year: number = new Date(message.date).getFullYear();
    let month: number = new Date(message.date).getMonth();

    const article: HTMLElement = document.createElement('article');
    article.classList.add(index);

    const name: HTMLElement = document.createElement('p');
    name.classList.add('msg-name');
    name.innerText = `${message.name}`;

    const content: HTMLElement = document.createElement('p');
    content.classList.add('msg-content');
    content.innerText = `${message.content}`;

    const date: HTMLElement = document.createElement('p');
    date.classList.add('msg-date');
    date.innerText = `${year}/${months[month]}`;

    article.appendChild(name);
    article.appendChild(date);
    article.appendChild(content);

    if (localStorage.getItem('name') === message.name) {
      const container = document.createElement('figure');
      container.classList.add('msg-btn-container');

      const editBtn: HTMLElement = document.createElement('button');
      editBtn.innerText = 'Edit';
      editBtn.addEventListener('click', () => {
        editMessage(index, messages, editBtn.parentNode.parentNode);
      });

      container.appendChild(editBtn);

      const removeBtn: HTMLElement = document.createElement('button');
      removeBtn.innerText = 'x';
      removeBtn.addEventListener('click', () => {
        deleteMessage(index, messages);
      });

      container.appendChild(removeBtn);
      article.appendChild(container);
    }

    parent.appendChild(article);
  };

  //Skickar meddelandet från Formen till
  const sendMessage = (messages) => {
    const content: HTMLInputElement = document.querySelector('.form-content');
    const name: string = localStorage.getItem('name');
    const type: HTMLInputElement = document.querySelector('.form-type');

    messages.reverse();

    messages.addMessage({
      content: content.value,
      date: Date.now(),
      name: name,
      type: type.value,
    });

    for (let i = 0; i < messages.messages.length; i++) {
      if (i >= 25) {
        messages.removeField(0);
      }
    }
    set(ref(db), messages.messages);
  };

  const deleteMessage = (index, messages) => {
    messages.removeField(index);
    messages.reverse();
    set(ref(db), messages.messages);
  };

  const editMessage = (index, messages, parent) => {
    const form: HTMLElement = document.createElement('form');

    const input: HTMLInputElement = document.createElement('input');
    input.classList.add('msg-edit');
    input.setAttribute('type', 'text');
    input.setAttribute('requried', 'null');

    const submit: HTMLElement = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Edit');

    form.appendChild(input);
    form.appendChild(submit);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const newmsg = {
        content: input.value,
        date: messages.messages[index].date,
        name: messages.messages[index].name,
        type: messages.messages[index].type,
      };

      messages.editMessage(index, newmsg);

      uploadEdit(messages);
    });

    parent.appendChild(form);
  };

  const uploadEdit = (messages) => {
    messages.reverse();
    console.log(messages.messages);
    set(ref(db), messages.messages);
  };
})();
