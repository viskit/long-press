import { register } from "../src/index";
import { LitElement, css, html, EventPart } from "lit";
import { query } from "lit/decorators.js";
// import "long-press-event";
register();

class MyComp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @query(".me")
  me: HTMLElement;

  @query(".wrap")
  wrap: HTMLElement;

  firstUpdated() {

    this.me.addEventListener(
      "long-press",
      (e) => {
        console.log("inner long press");
      },
      true
    );

    this.wrap.addEventListener(
      "long-press",
      (e) => {
        console.log("innerwrap long press");
      },
      true
    );
  }

  render() {
    return html`
      <div class="wrap" data-longpress-delay="3000">
        <div>dddddddd</div>

        <div class="me" style="width:50px;height:50px;border:1px solid red">
          hi
        </div>
      </div>
    `;
  }
}

customElements.define("my-comp", MyComp);
document.body.innerHTML = `
    <style>
    #box1{
        width:200px;
        height:200px;
        border:3px solid #333;
    }

    #box2{
        width:100px;
        height:100px;
        border:3px solid green;
    }

    @keyframes anim {
      0% {
        transform: rotate(-1deg);
      }
      30% {
        transform: rotate(.5deg);
      }
      60% {
        transform: rotate(2deg);
      }
    }

    .anim{
      animation: anim 0.3s infinite;
    }
    </style>
    <div id="box1">
        <div id="box2">
            <my-comp data-longpress-delay="4000"></my-comp>
        </div>
    </div>
    `;
const comp = document.querySelector("my-comp");
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");

comp.addEventListener(
  "long-press",
  (e) => {
    // e.stopPropagation();
    console.log("comp");
  },
  false
);

box2.addEventListener(
  "long-press",
  () => {
    console.log("box2");

    box2.classList.add("anim");
  },
  true
);

box1.addEventListener(
  "long-press",
  () => {
    console.log("box1");
    box1.classList.add("anim");
  },
  false
);
