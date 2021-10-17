import "./chat-card.scss";
import template from "./chat-card.hbs";
import Block from "../../utils/block/block";
import compile from "../../utils/block/compile";

export class ChatCard extends Block {
  constructor(props: {
    status: string;
    userName: string;
    message: string;
    time: string;
    size?: string;
    events: any
  }) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
