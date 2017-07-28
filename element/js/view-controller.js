'use strict'

class UILoginViewController extends HTMLElement{

  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    const doc = document._currentScript || document.currentScript;
    let view = doc.ownerDocument.querySelector('#ui-login-view');
    view = document.importNode(view.content, true);
    shadowRoot.appendChild(view);
  }

  ///STANDARD
  connectedCallback() {
    console.log('connected', this);
    //GET DOM STUFF HERE
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('attributeChanged');
  }

  adoptedCallback(){
    console.log('adoptedCallback');
  }
}

window.customElements.define('ui-login', UILoginViewController);
