import template from "./link-button.hbs";
import "./link-button.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

export class LinkButton extends Block {
  constructor(props: {
    text: string;
    color?: string;
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
