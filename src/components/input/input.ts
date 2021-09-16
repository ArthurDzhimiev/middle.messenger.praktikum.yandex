import template from "./input.hbs";
import "./input.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

export class Input extends Block {
  constructor(
    props: {
      type: string;
      name: string;
      placeholder: string;
      events?: {
        blur: (e: any) => void;
        focus?: (e: any) => void;
        keypress?: (e: any) => void;
      };
    },
    wrapperClass?: string
  ) {
    super("div", props, wrapperClass);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
