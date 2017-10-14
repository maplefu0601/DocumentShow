export default class Message {
  constructor(message) {
    this.message = message;
  }

  render() {
    return `Hey ${this.message}. Start using ES6 today!`;
  }
}
