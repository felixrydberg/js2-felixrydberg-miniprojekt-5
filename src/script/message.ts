export class Message {
  private readonly content: string;
  private readonly date: string;
  private readonly name: string;
  private readonly type: string;
  public messages: object[] = [];

  addMessage(message) {
    this.messages.push(message);
  }
  removeField(index) {
    this.messages.splice(index, 1);
  }
  clear() {
    this.messages = [];
  }
  reverse() {
    this.messages.reverse();
  }
  editMessage(index, newmsg) {
    this.messages[index] = newmsg;
  }
}
