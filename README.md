# ui-login
An user login web element

![image](https://cdn.filestackcontent.com/E8QW3J87SIiJ7Cp1MjFU)

### Dependencies
```
node 8.9.3-LTS
```

### Usage
```html
<!-- Load polyfills; note that "loader" will load these async -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.20/webcomponents-loader.js"></script>

<!-- Load a custom element definition via HTMLImports -->
<link rel="import" href="/ui-login/element/index.html">

<!-- Use the custom element -->
<ui-login logo="image-url.png" action="url/action" password-reset="url/password-reset" csrf="secret"/>

<!-- Interact with the upgraded element -->
<script>
  window.addEventListener('WebComponentsReady', function() {
    // At this point we are guaranteed that all required polyfills have loaded,
    // all HTML imports have loaded, and all defined custom elements have upgraded
    let element = document.querySelector('ui-login');
    console.assert(element instanceof UILogin);  // 👍
    element.someAPI(); // 👍
  });
</script>

```

### Customize styles:
```css
ui-login {
    --ui-login-font-family: [customize];
    --ui-login-container-bg-color: [customize];
    --ui-login-container-border-color: [customize];
    --ui-login-input-border-color: [customize]; 
    --ui-login-input-text-color: [customize]; 
    --ui-login-input-bg-color: [customize]; 
    --ui-login-button-bg-color: [customize]; 
    --ui-login-button-hover-color: [customize];
    --ui-login-button-text-color: [customize];
    --ui-login-button-text-hover-color: [customize]; 
    --ui-login-button-border-color: [customize];
    --ui-login-button-border-hover-color: [customize];
    --ui-login-text-color: [customize];
    --ui-login-text-error-color: [customize];
    --ui-login-link-color: [customize];
    --ui-login-link-hover-color: [customize];
}   
```


### Tests:
```bash
$ npm install;
$ npm test; #Open browser and navigate to IP
```
