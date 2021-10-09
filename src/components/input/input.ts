import template from "./input.hbs";
import "./input.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

export interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  errorText?: string;
  validation?: string;
  value?: string;
  events?: {
    blur: (e: any) => void;
    focus?: (e: any) => void;
    keypress?: (e: any) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps, wrapperClass = "input-wrapper") {
    super("div", props, wrapperClass);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
