# long-press
long press 

# Install
    npm i @viskit/long-press

# API

```ts
register(root: Document | Element | ShadowRoot = document) : ()=>void;
```

# Note
> Don't register multiple times on one root

# Use

#### exclude shadow root

```ts
import {register} from "@viskit/long-press";
register();
```

#### shadow root
```ts
register(customComp.shadowRoot);
```

#### part
```ts
const part = document.querySelector("#part");
register(part);
```

# License
MIT
