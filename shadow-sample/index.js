class ShadowSample extends HTMLElement {
  constructor() {
    super();
    this.items = [];
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
h1 {
  color: red;
}
</style>
<h1>WebComponentsの中です</h1>
<h2>WebComponentsの中です</h2>
`;
  }
}

window.customElements.define('shadow-sample', ShadowSample);
