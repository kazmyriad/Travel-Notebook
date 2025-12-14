import { LitElement, html, css } from 'https://unpkg.com/lit@3.3.1?module';

export class LogDisplay extends LitElement {

  constructor() {
    super();
    this.id = 0;
    this.title = "";
    this.date = "";
    this.photo= "";
  }

  static properties = {
    id: { type: Number },
    title: { type: String },
    date: { type: String },
    photo: { type: String }
  };

  static styles = css`
    .log-title{
        background-color: transparent;
        padding-left: 20px;
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
        border-radius: 20px 20px 20px 20px;
    }
    .log-display-img{
        width: 100%;
        min-width: 200px;
        
    }

    .open-log{
        float: right;
        color: #bed2e9;
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: 10%;
        right: 1%;
        transform: translate(-50%, -50%);
        margin-top: 5.5em;
        border-color: transparent;
        background-color:#274C77;
        color:white;
        transition: .3s;
    }
    .open-log:hover{
        background-color:rgb(51, 118, 173);
        height: 75%;
        font-size: 2em;
        border-radius: 0;
        margin-top: 80px;
        width: 4rem;
        right: 0;
        cursor: pointer;
        transform: translate(0, -50%);
        transition: all .3s ease-in-out;
    }

    .log-display{
        background-color: #bed2e9;
        overflow: hidden;
        width: 97%;
        height: 150px;
        display: flow-root;
        margin: 1em auto auto auto;
        position: relative;
        border-radius: 20px 0px 20px 20px;
    }

  `;

  render() { 
    return html`
    <div class="wrapper">
         <div class="log-display">
            <p class="log-title">${this.title}</p>
            <p class="log-date">${this.date}</p>
            <img class="log-display-img" alt="Main trip photo" src="${this.photo}"/>
            <button class="open-log" 
            @click=${() => window.location = `./page3.html?id=${this.id}`}> >            </button>
          </div>
    </div>
    `;
  }
}

customElements.define('log-display', LogDisplay);

