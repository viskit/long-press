import { register } from "../src/index";
import { LitElement, html, EventPart } from "lit";

register();

class MyComp extends LitElement {


  firstUpdated() {

      register(this.shadowRoot);

  }
  render() {
    return html`
      <div class="wrap" data-delay="3000" @long-press=${(e) => console.log(111, e.target)}>
        EV DDD

        <div
          style="width:50px;height:50px;border:1px solid red"
          @long-press=${(e) => console.log(222, e.target)}
        >
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
    </style>
    <div id="box1">
        <div id="box2">
            <my-comp></my-comp>
        </div>
    </div>
    `;
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
register(box1);
register(box2);

box1.addEventListener("long-press",()=>{
  console.log("box1  long presss");
});

