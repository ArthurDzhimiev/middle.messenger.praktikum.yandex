import template from "./button.hbs";
import "./button.scss";
import Block from "../../utils/block/block";
import compile from "../../utils/block/compile";

export interface ButtonProps {
  text: string;
  type: string;
  events?: {
    click: () => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
