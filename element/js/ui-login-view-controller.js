'use strict'

//Firefox requires these to be outside of class
const uiLoginDoc = document._currentScript || document.currentScript;
const uiLoginTemplate = uiLoginDoc.ownerDocument.querySelector('#ui-login-view');

class UILoginViewController extends HTMLElement{

  static get observedAttributes() {
    return ["action", "method", "registration", "password-reset", "csrf", "error"];
  }

  constructor(){
    super();
    this._action = null;
    this._method = null;
    this._registration = null;
    this._passwordReset = null;
    this._error = null;
    this._csrf = null;

    const view = document.importNode(uiLoginTemplate.content, true);
    this.shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(view);
 }

  connectedCallback() {
    //console.log('connected');
    this.$form = this.shadowRoot.querySelector('#form');
    this.$csrf = this.shadowRoot.querySelector('#csrf');
    this.$registration = this.shadowRoot.querySelector('#registration');
    this.$passwordReset = this.shadowRoot.querySelector('#passwordReset');
    this.$error = this.shadowRoot.querySelector('#error');

    this.addEvents();
    this._updateRendering();
  }

  get shadowRoot(){ return this._shadowRoot; }
  set shadowRoot(value){ this._shadowRoot = value; }

  adoptedCallback(){
    //console.log('adoptedCallback');
  }


  attributeChangedCallback(attributeName, oldValue, newValue) {
    //console.log('attributeChanged', name, oldValue, newValue);
    switch(attributeName){
      case "password-reset":
        this['passwordReset'] = newValue;
        break;

      default:
        this[attributeName] = newValue;
    }
    this._updateRendering();
  }

  disconnectedCallback() {
    //console.log('disconnected');
  }

  _updateRendering(){
    if(this.$form){
      this.$form.action = this.action
    }
    if(this.$csrf){
      this.$csrf.value = this.csrf
    }
    if(this.$error){
      this.$error.innerHTML = this.error;
      this.$error.style.visibility = 'visible';
      this.$error.classList.add('attention-animation');
    }
    if(this.$registration){
      this.$registration.href = this.registration;
    }
    if(this.$passwordReset){
      this.$passwordReset.href = this.passwordReset;
    }
    if(this.$registration){
      this.$form.action = this.action
      this.$form.method = this.method;
    }
  }

  get action(){ return this._action; }
  set action(value){
    if(this._action === value) return;
    this._action = value;
    this.setAttribute('action', value);
  }

  get csrf(){ return this._csrf; }
  set csrf(value){
    if(this._csrf === value) return;
    this._csrf = value;
    this.setAttribute('csrf', value);
  }

  get error(){ return this._error; }
  set error(value){
    if(this._error === value) return;
    this._error = value;
    this.setAttribute('error', value);
  }

  get method(){ return this._method; }
  set method(value){
    if(this._method === value) return;
    this._method = value;
    this.setAttribute('method', value);
  }

  get registration(){ return this._registration; }
  set registration(value){
    if(this._registration === value) return;
    this._registration = value;
    this.setAttribute('registration', value);
  }

  get passwordReset(){ return this._passwordReset; }
  set passwordReset(value){
    if(this._passwordReset === value) return;
    this._passwordReset = value;
    this.setAttribute('password-reset', value);
  }

  addEvents(){
    this.$form.addEventListener('submit', this.submit);
  }

  removeEvents(){
    //REMOVE
    //this.$form.addEventListener('submit', this.submit);
  }
}


window.customElements.define('ui-login', UILoginViewController);
