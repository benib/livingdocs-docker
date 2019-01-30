### Attention, this is deprecated

We have improved docker support in the editor built in and on the server it's currently easier to copy files than using this tool.

```
npm install @livingdocs/docker --save-dev
```

To copy all required Docker related files to your working directory, run
```
li-docker install
```

To build an image
```
li-docker build
```

To deploy an image to rancher
```
li-docker deploy --stack mystack --environment staging --server_image livingdocs/server:latest --editor_image livingdocs/editor:latest
```
