import template from "./button.hbs";
import "./button.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

export class Button extends Block {
  constructor(props: {
    text: string;
    events?: {
      click: () => void;
    };
  }) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
