(function() {
    const hasRegisterElement = "registerElement" in document;
    const hasImport = "import" in document.createElement("link");
    const hasTemplate = "content" in document.createElement("template");
    const supportsWebElements = hasRegisterElement && hasImport && hasTemplate;

    if (!supportsWebElements){
        var e = document.createElement("script");
        e.src = "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.3/webcomponents-lite.js";
        document.body.appendChild(e);
    }
})();
