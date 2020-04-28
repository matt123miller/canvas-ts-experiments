# Messing with TypeScript

I want to play around with TypeScript (TS) and finally get over the initial configuration and toy example hurdles.
I'm also interested in playing with HTML Canvas because I like the feedback loop of drawing stuff to screen through code.

So why not combine both things!

This was originally based on the ideas in [this blog post](https://codeburst.io/canvas-animations-in-typescript-97ba0163cb19) which showed me some examples on creating and moving objects on a canvas. But at this point I've gone off on my own.

A lot of the theory involved with the hexagons is based on the excellent articles from [red blob games](https://www.redblobgames.com/grids/hexagons/).

## Requirements

NodeJS for build tooling

## Installation

`npm install`

## Scripts

 Title | Command | Description 
 --- | --- | ---
 Build | `npm run build` | Runs webpack, outputting a built project 
 Dev | `npm run dev` | Runs the `watch` and `server` npm scripts concurrently 
 Watch | `npm run watch` | Runs webpack, watching files for changes. 
 Server | `npm run server` | Runs `live-server` which is a handy local dev server 

## TODO

I'm using the [TODO extension](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) for VSCode. 

You can view the file [here](./TODO).