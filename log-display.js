import { LitElement, html, css } from 'https://unpkg.com/lit@3.3.1?module';

export class LogDisplay extends LitElement {

  constructor() {
    super();
    this.title = "";
    this.date = "";
  }

  static properties = {
    title: { type: String },
    date: { type: String },
  };

  static styles = css`
    .log-title{
        background-color: transparent;
        padding-left: 10px;
        font-size: 20px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 5px;
        color: rgb(15, 30, 82);
    }
    .log-date{
        position: absolute;
        margin-top: 80px;
        margin-left: 10px;
        font-size: 15px;
        color: white;
        font-style: italic;
        font-weight: bold;
        padding:5px 10px 5px 10px;
        background-color:rgba(3, 23, 58, 0.5);
    }
    .log-display-img{
        width: 100%;
        min-width: 200px;
    }

    .open-log{
        float: right;
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: 10%;
        RIGHT: 1%;
        transform: translate(-50%, -50%);
        margin-top: 5.5em;
        border-color: transparent;
        background-color:#274C77;
        color:white;
    }
    .open-log:hover{
        background-color: rgb(87, 20, 15);
        transition: .3s;
    }

    .log-display{
        background-color: rgb(169, 182, 200);
        overflow: hidden;
        width: 100%;
        height: 150px;
        display: flow-root;
        margin-top: 1em;
        position: relative;
    }

  `;

  render() { 
    return html`
    <div class="wrapper">
         <div class="log-display">
            <p class="log-title">${this.title}</p>
            <p class="log-date">${this.date}</p>
            <img class="log-display-img" src="main-photo.jpg" alt="Main trip photo" />
            <button class="open-log">></button>
        </div>
    </div>
    `;
  }
}
customElements.define('log-display', LogDisplay);

