import template from "./checkbox.hbs";
import "./checkbox.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

export interface CheckboxProps {
  name: string;
  text: string;
  id: string;
  checked?: string;
  validation?: string;
  value?: string;
  events?: {
    click?: (e: any) => void;
  };
}

export class Checkbox extends Block {
  constructor(props: CheckboxProps, wrapperClass = "input-wrapper") {
    super("div", props, wrapperClass);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
