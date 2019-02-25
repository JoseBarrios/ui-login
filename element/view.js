const view = document.createElement("template");
view.innerHTML = `
    <link rel="stylesheet" href="../vendors/fontawesome/css/all.css">

    <style>

        :host {
            --ui-login-font-family: 'Roboto', sans-serif;
            --ui-login-container-bg-color: #fff;
            --ui-login-input-bg-color: #fff;
            --ui-login-input-border-color: darkGray;
            --ui-login-button-bg-color: #87c0fb;
            --ui-login-button-border-color: #87c0fb;
            --ui-login-button-text-color: #fff;
            --ui-login-text-color: #757575;
            --ui-login-text-error-color: #CD5C5C;
        }

        :host([hidden]) {
            display: none;
        }

        .container {
            box-sizing: content-box;
            background-color: var(--ui-login-container-bg-color);
            min-width:300px;
            min-height:300px;
            /* Makes sure we're not covering the border */
            margin-left:1px;
            margin-top:1px;
            width: calc(100% - 2px);
            height:calc(100% - 2px);

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .image-container {
        }

        .form-container {
            margin-top: 1em;
        }

        .login-logo {
            display:none;
            margin:auto;
            margin-bottom:1em;
            height:6em;
        }

        .input-container {
            height:104px;
            width:80%;
            max-width:300px;
            margin-left:auto;
            margin-right:auto;
        }

        .login-email {
            position:relative;
            z-index:1;
            margin:0px;
            font-size:1em;
            padding:1em;
            background-color: var(--ui-login-input-bg-color);
            /* color:var(--ui-login-text-color); */
            border:1px solid #a9a9a9;
            border-radius:5px 5px 0px 0px;
            width: calc(100% - 2em - 2px);
            text-align:center;
        }

        .login-email:focus {
            z-index:10;
        }

        .login-password {
            position:relative;
            z-index:1;
            margin:0px;
            margin-top:-1px;
            font-size:1em;
            padding:1em;
            background-color: var(--ui-login-input-bg-color);
            /* color:var(--ui-login-text-color); */
            border:1px solid #a9a9a9;
            border-radius:0px 0px 5px 5px;
            width: calc(100% - 2em - 2px);
            text-align:center;
        }

        .login-password:focus {
            z-index:10;
        }

        .login-button{
            display:block;
            margin-top:1.25em;
            margin-left:auto;
            margin-right:auto;
            background-color: var(--ui-login-button-bg-color);
            text-transform: uppercase;
            border:1px var(--ui-login-button-border-color) solid;
            color: var(--ui-login-button-text-color);
            line-height:2.5em;
            width:80%;
            max-width:300px;
            border-radius:6px;
            font-size:1.1em;
            cursor:pointer;
        }

        .error-container {
            height:2em;
            line-height:1em;
        }

        #error {
            font-family: var(--ui-login-font-family);
            text-align:center;
            width:100%;
            font-size:0.8em;
            color: var(--ui-login-text-error-color);
            font-weight:800;
        }

        .attention-animation {
            visibility: visible;
            animation: attention 300ms linear both;
            animation-iteration-count: 2;
        }

        @keyframes attention {
            0.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1); }
            11.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.725, 0, 1, 1); }
            22.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10.113, 0, 1, 1); }
            33.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 0, 2, 1); }
            44.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4.08, 0, 2, 1); }
            55.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.84, 0, 2, 1); }
            66.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -12, 0, 3, 1); }
            77.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -10.275, 0, 3, 1); }
            88.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1.887, 0, 3, 1); }
            100.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 1); }
        }

    </style>


    <div class="container">

        <div class="image-container">
            <img id="logo" class="login-logo" alt="logo" src=""/>
        </div>

        <div class="form-container">
            <form id="form" method="POST" action="">
                <div class="input-container">
                    <input id="email" type="email" name="email" class="login-email" placeholder="email@email.com" required autocomplete>
                    <input id="password" type="password" name="password" class="login-password" placeholder="••••••••••••••••" minlength="8" required autocomplete>
                    <input id="csrf" type="hidden" name="_csrf" class="form-control" value="">
                </div>
                <button id="loginButton" type="submit" class="login-button">
                    <span id="loginButtonText">Login</span>
                </button>
            </form>
            <div class="error-container">
                <p id="error"></p>
            </div>
        </div>
    </div>
`;

export default view;

