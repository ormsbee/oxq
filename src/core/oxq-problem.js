import { LitElement, css, html } from 'lit-element';


class OxqProblemElement extends LitElement {

  constructor() {
    super();
    this.item = null;
    this.title = "";
  }

  static get properties() {
    return {
      item: {
        type: String,
        reflect: true,
      },
      title: {
        type: String,
        reflect: true,
      },
    }
  }

  static get styles() {
    return css`
      button {
        padding: 1em;
        font-family: "Roboto Sans-Serif", sans-serif;
        font-size: 1em;
      }
      #primary-action {
        display: inline-block;
        float: left;
        padding: 2em;
      }
      #secondary-action {
        display: inline-block; float: right;
      }
    `
  }

  render() {
    // Attemped problem
    return html`
      <section>
        <h1>${this.title}</h1>
        <form name=${this.name}>
          <slot></slot>
        </form>
        <div class="primary-actions">
          <button>Submit</button>
          <button>Save</button>
        </div>
        <div class="secondary-actions">
          <button>Show Answer</button>
        </div>
        <div class="staff-actions">
          <button>Submission History</button>
          <button>Adjust Score</button>
        </div>
      </section>
    `;


    return html`
      <section>
        <h1>${this.title}</h1>
        <form name=${this.name}>
          <template>
            <slot></slot>
          </template>
        </form>
      </section>
    `;
  }
}

customElements.define('oxq-problem', OxqProblemElement);

