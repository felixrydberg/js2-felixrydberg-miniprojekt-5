import { db } from './db';
import { Message } from './message';
import { ref, onValue, set } from 'firebase/database';

(function () {
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
      console.log(messages.messages);
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
      displayMsg(messages.messages[key]);
    }
  };

  //Skapar alla DOM element för chattmeddelandena
  const displayMsg = (message) => {
    const parent: HTMLElement = document.querySelector('.article-msg');

    let year: number = new Date(message.date).getFullYear();
    let months: number = new Date(message.date).getMonth();

    const article: HTMLElement = document.createElement('article');
    const name: HTMLElement = document.createElement('p');
    name.classList.add('msg-name');
    name.innerText = `${message.name}`;

    const content: HTMLElement = document.createElement('p');
    content.classList.add('msg-content');
    content.innerText = `${message.content}`;

    const date: HTMLElement = document.createElement('p');
    date.classList.add('msg-date');
    date.innerText = `${year}/${months}`;

    article.appendChild(name);
    article.appendChild(date);
    article.appendChild(content);

    parent.appendChild(article);
  };

  //Skickar meddelandet från Formen till
  const sendMessage = (messages) => {
    const content: HTMLInputElement = document.querySelector('.form-content');
    const name: HTMLInputElement = document.querySelector('.form-name');
    const type: HTMLInputElement = document.querySelector('.form-type');

    messages.reverse();

    messages.addMessage({
      content: content.value,
      date: Date.now(),
      name: name.value,
      type: type.value,
    });

    for (let i = 0; i < messages.messages.length; i++) {
      if (i >= 25) {
        messages.removeField(0);
      }
    }
    set(ref(db), messages.messages);
  };
})();
