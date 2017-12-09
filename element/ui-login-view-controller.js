'use strict'

//Firefox requires these to be outside of class
let uiLoginDoc = document._currentScript || document.currentScript;
let uiLoginTemplate = uiLoginDoc.ownerDocument.querySelector('#ui-login-view');

class UILoginViewController extends HTMLElement{

  static get observedAttributes() {
    return ["logo", "action", "password-reset", "csrf", "error"];
  }

  constructor(){
    super();
    this._logo = null;
    this._action = null;
    this._method = null;
    this._passwordReset = null;
    this._error = null;
    this._csrf = null;

		const view = document.importNode(uiLoginTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
 }

  connectedCallback() {
		this.$passwordReset = this.shadowRoot.querySelector('#passwordReset');
		this.$error = this.shadowRoot.querySelector('#error');
		this.$form = this.shadowRoot.querySelector('#form');
		this.$logo = this.shadowRoot.querySelector('#logo');
		this.$csrf = this.shadowRoot.querySelector('#csrf');

    this.addEvents();
    this._updateRendering();
  }

  get shadowRoot(){ return this._shadowRoot; }
  set shadowRoot(value){ this._shadowRoot = value; }

  adoptedCallback(){
		console.log('adoptedCallback');
  }


  attributeChangedCallback(attributeName, oldValue, newValue) {
    switch(attributeName){
      case "logo":
				if(newValue !== oldValue) {
					this.logo = newValue;
					this.setAttribute('logo', newValue);
				}
        break;
      case "action":
        this.action = newValue;
        break;
      case "csrf":
        this.csrf = newValue;
        break;
      case "password-reset":
        this.passwordReset = newValue;
        break;
			case "error":
				this.error = newValue;
        break;
      default:
				console.error('ATTRIBUTE NOT HANDLED', attributeName)
    }
    this._updateRendering();
  }

  disconnectedCallback() {
		console.log('disconnected');
  }

  _updateRendering(){

		//LOGO
		if(this.$logo && this.logo){
      this.$logo.src = this.logo
			this.$logo.style.display = 'block';
    } else if(this.$logo && (!this.logo || this.logo === "")){
			this.$logo.style.display = 'none';
		}


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
    if(this.$passwordReset){
      this.$passwordReset.href = this.passwordReset;
    }
  }

  get logo(){ return this._logo; }
  set logo(value){
		this._logo = value;
		this._updateRendering();
  }


  get action(){ return this._action; }
  set action(value){
    if(this._action === value) return;
    this._action = value;
		this._updateRendering();
  }

  get csrf(){ return this._csrf; }
  set csrf(value){
    if(this._csrf === value) return;
    this._csrf = value;
		this._updateRendering();
  }

  get error(){ return this._error; }
  set error(value){
    if(this._error === value) return;
    this._error = value;
		this._updateRendering();
  }

  get passwordReset(){ return this._passwordReset; }
  set passwordReset(value){
    if(this._passwordReset === value) return;
    this._passwordReset = value;
		this._updateRendering();
  }

  addEvents(){
    this.$form.addEventListener('submit', this.submit);
  }

  removeEvents(){
    //REMOVE
		this.$form.addEventListener('submit', this.submit);
  }
}


window.customElements.define('ui-login', UILoginViewController);
