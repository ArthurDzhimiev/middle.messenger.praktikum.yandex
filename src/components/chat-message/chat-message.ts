import template from "./chat-message.hbs";
import "./chat-message.scss";
import Block from "../../utils/block/block";
import compile from "../../utils/block/compile";

export class ChatMessage extends Block {
  constructor(props: {
    type: string;
    text: string;
    time: string;
  }) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
