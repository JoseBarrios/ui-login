'use strict'

const uiLoginDoc = document._currentScript || document.currentScript;
let view = uiLoginDoc.ownerDocument.querySelector('#ui-login-view');

class UILoginViewController extends HTMLElement{

  constructor(){
    super();
  }

  ///STANDARD
  connectedCallback() {
    console.log('connected');
    //GET DOM STUFF HERE
    //let shadowRoot = this.attachShadow({mode: 'open'});
    //shadowRoot.appendChild(view);

    view = document.importNode(view.content, true);
    this.appendChild(view);
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
