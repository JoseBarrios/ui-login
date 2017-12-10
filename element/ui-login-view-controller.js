'use strict'

//Firefox requires these to be outside of class
let uiLoginDoc = document._currentScript || document.currentScript;
let uiLoginTemplate = uiLoginDoc.ownerDocument.querySelector('#ui-login-view');

class UILoginViewController extends HTMLElement{

  static get observedAttributes() {
    return ["logo", "email", "action", "csrf", "error"];
  }

  constructor(){
    super();
		this.event = {};
		this.state = {};
		this.model = {};

		const view = document.importNode(uiLoginTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
 }

  connectedCallback() {
		this.$loginButtonText = this.shadowRoot.querySelector('#loginButtonText');
		this.$error = this.shadowRoot.querySelector('#error');
		this.$form = this.shadowRoot.querySelector('#form');
		this.$email = this.shadowRoot.querySelector('#email');
		this.$password = this.shadowRoot.querySelector('#password');
		this.$logo = this.shadowRoot.querySelector('#logo');
		this.$csrf = this.shadowRoot.querySelector('#csrf');

    this.addEvents();
    this.updateView();
  }

  get shadowRoot(){ return this._shadowRoot; }
  set shadowRoot(value){ this._shadowRoot = value; }

  adoptedCallback(){
		console.log('adoptedCallback');
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    switch(attributeName){
      case "logo":
				if(newValue !== this.logo) { this.logo = newValue; }
        break;
			case "email":
				if(newValue !== this.email) { this.email = newValue; }
        break;
      case "action":
				if(newValue !== this.action) { this.action = newValue; }
        break;
      case "csrf":
				if(newValue !== this.csrf) { this.csrf = newValue; }
        break;
			case "error":
				if(newValue !== this.error) { this.error = newValue; }
        break;
      default:
				console.error('ATTRIBUTE NOT HANDLED', attributeName)
    }
  }

  get logo(){ return this.model.logo; }
  set logo(value){
		if(this.getAttribute('logo') !== value){
			this.setAttribute('logo', value);
			return
		}
		this.model.logo = value;
		this.updateView(this.$logo);
  }

  get email(){ return this.model.email; }
  set email(value){
		if(this.getAttribute('email') !== value){
			this.setAttribute('email', value);
			return
		}
    this.model.email = value;
		this.updateView(this.$email);
  }


  get action(){ return this.model.action; }
  set action(value){
		if(this.getAttribute('action') !== value){
			this.setAttribute('action', value);
			return
		}
    this.model.action = value;
		this.updateView(this.$form);
  }

  get csrf(){ return this.model.csrf; }
  set csrf(value){
		if(this.getAttribute('csrf') !== value){
			this.setAttribute('csrf', value);
			return
		}
    this.model.csrf = value;
		this.updateView(this.$csrf);
  }

  get error(){ return this.model.error; }
  set error(value){
		if(this.getAttribute('error') !== value){
			this.setAttribute('error', value);
			return
		}
    this.model.error = value;
		this.updateView(this.$error);
  }

	_updateLogoView(){
		if(this.$logo && this.logo){
      this.$logo.src = this.logo
			this.$logo.style.display = 'block';
    } else if(this.$logo && (!this.logo || this.logo === "")){
			this.$logo.style.display = 'none';
		}
	}

	_updateFormView(){
		if(this.$form && this.action){
			this.$form.action = this.action
		}
	}

	_updateCSRFView(){
		if(this.$csrf && this.csrf){
      this.$csrf.value = this.csrf
    }
	}

	_updateEmailView(){
		if(this.$email && this.email){
      this.$email.value = this.email;
    }
	}

	_updateErrorView(){
		if(this.$error && this.error){
      this.$error.innerHTML = this.error;
      this.$error.style.visibility = 'visible';
      this.$error.classList.add('attention-animation');
			let animationTimeout = setTimeout(() => {
      	this.$error.classList.remove('attention-animation');
				clearTimeout(animationTimeout);
			}, 600)
    }
		else {
      this.$error.style.visibility = 'hidden';
			this.$error.classList.remove('attention-animation');
		}
	}



  updateView(view){
		switch(view){
			case this.$logo:
				this._updateLogoView();
				break;
			case this.$form:
				this._updateFormView();
				break;
			case this.$csrf:
				this._updateCSRFView();
				break;
			case this.$email:
				this._updateEmailView();
				break;
			case this.$error:
				this._updateErrorView();
				break;
			default:
				//Everything
				this._updateLogoView();
				this._updateFormView();
				this._updateCSRFView();
				this._updateEmailView();
				this._updateErrorView();

				//Set focus on correct item
				if(this.$email.value){ this.$password.focus()}
				else { this.$email.focus() }
		}
  }

  addEvents(){
    this.$form.addEventListener('submit', this.submit.bind(this));
  }

 	submit(e){
		this.$loginButtonText.innerHTML = '';
		this.$loginButtonText.classList.add('fa', 'fa-spinner', 'fa-spin');
	}

	removeEvents(){
    //REMOVE
		this.$form.addEventListener('submit', this.submit.bind(this));
  }
  disconnectedCallback() {
		console.log('disconnected');
  }
}


window.customElements.define('ui-login', UILoginViewController);
