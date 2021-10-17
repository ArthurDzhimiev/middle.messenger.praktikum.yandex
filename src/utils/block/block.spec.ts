import { assert } from "chai";
import { JSDOM } from "jsdom";
import Block from "./block";

const dom = new JSDOM('<!DOCTYPE html><div id="app"></div></div>');
(global as any).window = dom.window;
(global as any).document = dom.window.document;

describe("Component", () => {
  it("Component props and meta is correct", () => {
    const props = {
      id: 1,
    };
    const block = new Block("div", props, "testClass");
    assert.equal(block._meta?.tagName, "div", "Block tagName correct");
    assert.equal(block._meta?.props, props, "Block props correct");
    assert.equal(
      block._meta?.wrapperClassName,
      "testClass",
      "Block wrapperClassName correct"
    );
  });
  it("Component props update correctly", () => {
    const initialProps = {
      id: 1,
    };
    const newProps = {
      id: 100,
    };
    const block = new Block("div", initialProps, "testClass");
    block.setProps(newProps);
    assert.equal(block?.props.id, 100, "Block props update");
  });
});
