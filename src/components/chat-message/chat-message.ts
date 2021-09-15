import Handlebars from "handlebars/dist/handlebars.runtime";
import template from "./chat-message.hbs";
import "./chat-message.scss";

Handlebars.registerPartial("chatCard", template);
