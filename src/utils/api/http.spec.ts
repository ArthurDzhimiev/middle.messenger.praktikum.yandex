// @ts-ignore
import chai from "chai";
// @ts-ignore
import sinon from "sinon";
// @ts-ignore
import sinonChai from "sinon-chai";
import { HTTPTransport, METHODS } from "./fetch";
import { JSDOM } from "jsdom";

chai.use(sinonChai);
const dom = new JSDOM('<!DOCTYPE html><div id="app"></div></div>');
(global as any).window = dom.window;

describe("HTTP requests test", () => {
  const testRequestBody = {
    data: {
      id: 1,
    },
  };
  it("GET method work correct", () => {
    const http = new HTTPTransport();
    const requestSpy = sinon.spy(http, "request");
    http.request("/test", METHODS.GET, {});
    chai.expect(requestSpy).to.have.been.calledWith("/test", METHODS.GET, {});
  });
  it("PUT method work correct", () => {
    const http = new HTTPTransport();
    const requestSpy = sinon.spy(http, "request");
    http.request("/test", METHODS.PUT, testRequestBody);
    chai
      .expect(requestSpy)
      .to.have.been.calledWith("/test", METHODS.PUT, testRequestBody);
  });
  it("POST method work correct", () => {
    const http = new HTTPTransport();
    const requestSpy = sinon.spy(http, "request");
    http.request("/test", METHODS.POST, testRequestBody);
    chai
      .expect(requestSpy)
      .to.have.been.calledWith("/test", METHODS.POST, testRequestBody);
  });
  it("DELETE method work correct", () => {
    const http = new HTTPTransport();
    const requestSpy = sinon.spy(http, "request");
    http.request("/test", METHODS.DELETE, testRequestBody);
    chai
      .expect(requestSpy)
      .to.have.been.calledWith("/test", METHODS.DELETE, testRequestBody);
  });
});
