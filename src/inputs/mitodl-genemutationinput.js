import { LitElement, css, html } from 'lit-element';

class MitOdlGeneMutationInputParent extends LitElement {

  constructor() {
    super();
    this.name = "";
    this.title= "";
    this.sex = "";
    this.genes = "";
    this.phenotype = "";
  }

  static get properties() {
    return {
      name: {
        type: String,
        reflect: true,
      },
      title: {
        type: String,
        reflect: true,
      },
      sex: {
        type: String,
        reflect: true,
      },
      genes: {
        type: String,
        reflect: true,
      },
      phenotype: {
        type: String,
        reflect: true,
      }
    }
  }
}

class MitOdlGeneMutationInput extends LitElement {

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

  parentText(parent) {
    let sex = "?";
    if (parent.sex == "F") {
      sex = "♀";
    }
    else if (parent.sex == "M") {
      sex = "♂"
    }
    return html`${parent.title} (${sex})`;
  }

  geneCombinations(parent1, parent2) {
    let genes = [
      parent1.genes[0], parent1.genes[1], parent2.genes[0], parent2.genes[1]
    ];
    let uniqueCombos = new Set();
    for (let g1 of genes) {
      for (let g2 of genes) {
        // Gg and gG are equivalent, so collapse them by normalizing
        let combo = g1 < g2 ? g1 + g2 : g2 + g1;
        uniqueCombos.add(combo);
      }
    }
    return Array.from(uniqueCombos).sort();
  }

  static get styles() {
    return css`


    label { font-weight: bold; }
      th { padding: 0.5em; }
      td {
        border: 1px solid black;
        padding: 1em;
      }
      fieldset {
        margin: 1em;
        padding: 0em 0.5em 1em 0.5em;
      }
      legend {
        border: 1px dashed gray;
        padding: 0.5em;
        margin-bottom: 1.0em;
      }
    `
  }

  render() {
    let parent1 = this.children[0];
    let parent2 = this.children[1];
    let image1 = parent1.children[0];
    let image2 = parent2.children[0];
    let geneCombos = this.geneCombinations(parent1, parent2);

    let options = html`
      <select>
        <option value="">-</option>
        ${geneCombos.map(g => html`<option value=${g}>${g}</option>`)}
      </select>
    `

    return html`
      <fieldset style="display: inline-block; float: left; vertical-align:top;">
        <legend>Complete the table below.</legend>
        <table>
          <tr>
            <th rowspan="2" colspan="2"></th>
            <th scope="col" colspan="2">
              ${image1}<br/>
              ${this.parentText(parent1)}
            </th>
          </tr>
          <tr>
            <th scope="col">${parent1.genes[0]}</th>
            <th scope="col">${parent1.genes[1]}</th>
          </tr>
          <tr>
            <th scope="row" rowspan="2">
              ${image2}<br/>
              ${this.parentText(parent2)}
            </th>
            <th scope="row">${parent2.genes[0]}</th>
            <td>${options}</td>
            <td>${options}</td>
          </tr>
          <tr>
            <th scope="row">${parent2.genes[1]}</th>
            <td>${options}</td>
            <td>${options}</td>
          </tr>
        </table>
      </fieldset>
      <fieldset style="text-align:center; display:inline-block; width:15em;">
        <legend style="text-align:left">
          Enter the ratio of genotypes (reduced to lowest terms).
        </legend>
        <label>${parent1.genes} <input type="text" name="genotype_ratio_1"/></label><br/>
        to<br/>
        <label>${parent2.genes} <input type="text" name="genotype_ratio_2"/></label>
      </fieldset>
      <fieldset style="text-align:center; display:inline-block; width:15em">
        <legend style="text-align:left">
          Enter the ratio of phenotypes (reduced to lowest terms).
        </legend>
        <label>${parent1.phenotype} <input type="text" name="phenotype_ratio_1"/></label><br/>
        to<br/>
        <label>${parent2.phenotype} <input type="text" name="phenotype_ratio_2"/></label>
      </fieldset>
    `;
  }
}

customElements.define('mitodl-genemutationinput', MitOdlGeneMutationInput);
customElements.define('mitodl-genemutationinput-parent', MitOdlGeneMutationInputParent);

export default MitOdlGeneMutationInput;
