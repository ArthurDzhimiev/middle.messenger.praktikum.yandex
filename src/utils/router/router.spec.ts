import { assert } from "chai";
import { Router } from "./router";
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><div id="app"></div></div>');
(global as any).window = dom.window;

describe("Router test", () => {
  it("Router must be exists", function () {
    const router = new Router("#app");
    assert.exists(router);
  });
  it("routes must be empty", function () {
    const router = new Router("#app");
    assert.lengthOf(router.routes, 0);
  });
  it("Router register pages", function () {
    const router = new Router("#app");
    router
      .use("/sign-up", `<div>Sign-up page</div>`)
      .use("/sign-in", `<div>Sign-in page</div>`);
    assert.lengthOf(router.routes, 2);
  });
});
