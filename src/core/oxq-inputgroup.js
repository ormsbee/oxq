/**
 * Prompt.
 *
 */

import { LitElement, html } from 'lit-element';

class OxqInputGroupElement extends LitElement {

  constructor() {
    super();
    this.name = "";
    }

  static get properties() {
    return {
      name: {
        type: String,
        reflect: true,
      },
    }
  }

  render() {
    return html`
        <slot></slot>
    `;
  }
}

customElements.define('oxq-inputgroup', OxqInputGroupElement);
export default OxqInputGroupElement;