# long-press

long press for ESM & shadow dom.

Inspired by https://github.com/john-doherty/long-press-event  Thanks!

# Install
    npm i @viskit/long-press

# [DEMO](https://codesandbox.io/s/long-press-cxi3c)

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

# License
MIT
