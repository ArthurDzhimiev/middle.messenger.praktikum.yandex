import "./chat-card.scss";
import template from "./chat-card.hbs";
import Block from "../../utils/block";
import compile from "../../utils/compile";
export class ChatCard extends Block {
  constructor(props: {
    status: string;
    userName: string;
    message: string;
    time: string;
    size?: string;
  }) {
    super("div", props);
  }

  render() {
    return compile(template, {...this.props});
  }
}
