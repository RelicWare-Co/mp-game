import "normalize.css";
import "./style.css"
import { Application, Sprite, Assets } from 'pixi.js';
import bunnySpr from "@/assets/bunny.png";
import geckos from '@geckos.io/client'

// Networking
const channel = geckos({ port: 3001 }) // default port is 9208

// TODO: Add a globalThis type definition
// @ts-expect-error - globalThis.channel is not defined
globalThis.channel = channel;
channel.onConnect(error => {
  if (error) {
    console.error(error.message)
    return
  }

  channel.on('chat message', data => {
    console.log(`You got the message ${data}`)
  })

  channel.emit('chat message', 'a short message sent to the server')
})

// Rendering - PixiJS
const app = new Application();

// Wait for the Renderer to be available
await app.init({
  antialias: false,
  hello: true,
  width: 800,
  height: 600,
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.canvas);

// load the texture we need
const texture = await Assets.load(bunnySpr);

// This creates a texture from a 'bunny.png' image
const bunny = new Sprite(texture);

// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

// Rotate around the center
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// Add the bunny to the scene we are building
app.stage.addChild(bunny);

// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
});

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
