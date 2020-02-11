/**
 * Prompt.
 *
 */

import { LitElement, html } from 'lit-element';

class OxqPromptElement extends LitElement {

  constructor() {
    super();
  }

  static get properties() {
    return {
    }
  }

  render() {
    return html`<slot></slot>`;
    let problemInfoEl = document.getElementById('oxq.problem_info:addition_1');
    let problemInfo = JSON.parse(problemInfoEl.innerHTML);
    let variantParams = 'variant' in problemInfo ? problemInfo.variant : {};
    let outputHtml = mustache(this.innerHTML, variantParams);
    return html`${outputHtml}`;
  }
}

customElements.define('oxq-prompt', OxqPromptElement);
export default OxqPromptElement;