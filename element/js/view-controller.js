'use strict'

const uiLoginDoc = document._currentScript || document.currentScript;
let view = uiLoginDoc.ownerDocument.querySelector('#ui-login-view');

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
 }

  connectedCallback() {
    console.log('connected');
    view = document.importNode(view.content, true);
    this.appendChild(view);

    this.$form = this.querySelector('#form');
    this.$csrf = this.querySelector('#csrf');
    this.$registration = this.querySelector('#registration');
    this.$passwordReset = this.querySelector('#passwordReset');
    this.$error = this.querySelector('#error');

    this.addEvents();
   }

  addEvents(){
     this.$form.addEventListener('submit', this.submit);
  }

  removeEvents(){
    //REMOVE
    //this.$form.addEventListener('submit', this.submit);
  }

  submit(){
    e.preventDefault();
    console.log('SUBMIT')
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('attributeChanged', name, oldValue, newValue);
    switch(attributeName){
        case "password-reset":
          this['passwordReset'] = newValue;
          break;

        default:
          this[attributeName] = newValue;
    }
  }

  adoptedCallback(){
    console.log('adoptedCallback');
  }

  get action(){ return this._action; }
  set action(value){
    if(this._action === value) return;
    this._action = value;
    this.setAttribute('action', value);
    this.$form.action = value;
  }

  get method(){ return this._method; }
  set method(value){
    if(this._method === value) return;
    this._method = value;
    this.setAttribute('method', value);
    this.$form.method = value;
  }

  get registration(){ return this._registration; }
  set registration(value){
    if(this._registration === value) return;
    this._registration = value;
    this.setAttribute('registration', value);
    this.$registration.href = value;
  }

  get passwordReset(){ return this._passwordReset; }
  set passwordReset(value){
    if(this._passwordReset === value) return;
    this._passwordReset = value;
    this.setAttribute('password-reset', value);
    this.$passwordReset.href = value;
  }

  get csrf(){ return this._csrf; }
  set csrf(value){
    if(this._csrf === value) return;
    this._csrf = value;
    this.setAttribute('csrf', value);
    this.$csrf.value = value;
  }

  get error(){ return this._error; }
  set error(value){
    if(this._error === value) return;
    this._error = value;
    this.setAttribute('error', value);
    this.$error.innerHTML = value;
    this.$error.style.visibility = 'visible';
    this.$error.classList.add('error');
  }
}

window.customElements.define('ui-login', UILoginViewController);
