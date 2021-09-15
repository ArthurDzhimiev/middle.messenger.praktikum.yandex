import Handlebars from "handlebars/dist/handlebars.runtime";
import template from "./chat-card.hbs";
import "./chat-card.scss";

Handlebars.registerPartial("chatCard", template);
