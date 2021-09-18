import EventBus from "./event-bus";
// @ts-ignore
import { nanoid } from "nanoid";

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

export default class Block {
  _element: HTMLElement;
  _meta: {
    tagName: string;
    props: object;
    wrapperClassName?: string;
  } | null = null;
  eventBus: EventBus;
  props: object;
  public id = nanoid(6);

  constructor(tagName = "div", props = {}, wrapperClassName?: string) {
    this._meta = {
      tagName,
      props,
      wrapperClassName,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);
    this.eventBus.emit(EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const tagName = this._meta?.tagName || "";

    this._element = this._createDocumentElement(tagName);
    this._element.className = this._meta?.wrapperClassName || "";
  }

  init() {
    this._createResources();
    this.eventBus.emit(EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    this.componentDidUpdate(oldProps, newProps);
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }

  // @ts-ignore
  componentDidUpdate(oldProps: unknown, newProps: unknown) {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
    this.eventBus.emit(EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();

    this._removeEvents();
    this._element.innerHTML = "";

    this._element.appendChild(fragment);
    this._addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: object) {
    return new Proxy(props, {
      get(target: Record<string, any>, prop: string) {
        if (prop.startsWith("_")) {
          throw new Error("нет доступа");
        } else {
          let value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
      },
      set(target: Record<string, any>, prop: string, val) {
        if (prop.startsWith("_")) {
          throw new Error("нет доступа");
        } else {
          target[prop] = val;
          return true;
        }
      },
      deleteProperty() {
        throw new Error("нет доступа");
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith("_"));
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events || !this._element.firstChild) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element.firstChild!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element.firstChild!.addEventListener(event, listener);
    });
  }
}
