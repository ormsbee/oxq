import { LitElement, html } from 'lit-element';

class OxqTemplateElement extends LitElement {

  constructor() {
    super();
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
    let problemInfoEl = document.getElementById('oxq.problem_info:addition_1');
    let problemInfo = JSON.parse(problemInfoEl.innerHTML);
    let variantParams = 'variant' in problemInfo ? problemInfo.variant : {};
    let outputHtml = mustache(this.innerHTML, variantParams);
    return html`${outputHtml}`;
  }
}

customElements.define('oxq-template', OxqTemplateElement);
export default OxqTemplateElement;


/** tiny-mustche version 0.4.1 */
// https://github.com/aishikaty/tiny-mustache/blob/master/mustache.js
// Borrowing from here (MIT licensed) until the mustache library implements
// ES module support: https://github.com/janl/mustache.js/issues/698
function mustache(template, self, parent, invert) {
    var render = mustache
    var output = ""
    var i

    function get (ctx, path) {
      path = path.pop ? path : path.split(".")
      ctx = ctx[path.shift()] || ""
      return (0 in path) ? get(ctx, path) : ctx
    }

    self = Array.isArray(self) ? self : (self ? [self] : [])
    self = invert ? (0 in self) ? [] : [1] : self

    for (i = 0; i < self.length; i++) {
      var childCode = ''
      var depth = 0
      var inverted
      var ctx = (typeof self[i] == "object") ? self[i] : {}
      ctx = Object.assign({}, parent, ctx)
      ctx[""] = {"": self[i]}

      template.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,
        function(match, code, y, z, close, invert, name) {
          if (!depth) {
            output += code.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,
              function(match, raw, comment, isRaw, partial, name) {
                return raw ? get(ctx, raw)
                  : isRaw ? get(ctx, name)
                  : partial ? render(get(ctx, name), ctx)
                  : !comment ? new Option(get(ctx, name)).innerHTML
                  : ""
              }
            )
            inverted = invert
          } else {
            childCode += depth && !close || depth > 1 ? match : code
          }
          if (close) {
            if (!--depth) {
              name = get(ctx, name)
              if (/^f/.test(typeof name)) {
                output += name.call(ctx, childCode, function (template) {
                  return render(template, ctx)
                })
              } else {
                output += render(childCode, name, ctx, inverted)
              }
              childCode = ""
            }
          } else {
            ++depth
          }
        }
      )
    }
    return output
  }
  /** end tiny-mustche version 0.4.1 */

