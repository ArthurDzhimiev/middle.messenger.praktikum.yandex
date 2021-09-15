import Block from "./block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (!root) {
    throw new Error("Root not found");
  }
  root.innerHTML = "";
  root.appendChild(block.getContent());
  return root;
}
