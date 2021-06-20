(()=>{"use strict";var t={344:(t,e,n)=>{n.r(e)},187:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomColor=void 0;var o=n(233);e.randomColor=function(){var t=o.randomNumber(0,256),e=o.randomNumber(0,256),n=o.randomNumber(0,256);return"#"+t.toString(16).padStart(2,"0")+e.toString(16).padStart(2,"0")+n.toString(16).padStart(2,"0")}},233:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomNumber=void 0,e.randomNumber=function(t,e){return Math.floor(Math.random()*(e-t))+t}},201:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sure=void 0,e.sure=function(t){if(null==t)throw new Error("value === null || value === undefined");return t}},474:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Canvas=void 0;var i=n(201),s=function(t){function e(e){var n=t.call(this)||this;n.visualConsts=e,n.canvas=document.createElement("canvas");var o=e.tileSize,r=e.chunkSize,s=o.pxWidth*r.tilesWidth,a=o.pxHeight*r.tilesHeight;return n.canvas.width=s,n.canvas.height=a,n.context=i.sure(n.canvas.getContext("2d")),n}return r(e,t),e.prototype.mount=function(e){t.prototype.mount.call(this,e,this.canvas)},e.prototype.unmount=function(){t.prototype.unmount.call(this,this.canvas)},e.prototype.fillTile=function(t,e,n){var o=this.visualConsts.tileSize,r=o.pxWidth*t,i=o.pxHeight*e;this.context.fillStyle=n,this.context.fillRect(r,i,o.pxWidth,o.pxHeight);var s=t+" / "+e;this.context.strokeStyle="#444",this.context.fillStyle="#fff",this.context.font="32px Arial",this.context.fillText(s,r+20,i+60),this.context.strokeText(s,r+20,i+60)},e}(n(923).Mountable);e.Canvas=s},37:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Chunk=void 0;var i=n(907),s=n(474),a=n(923),u=n(187),c=function(t){function e(e,n){var o=t.call(this)||this;o.visualConsts=e,o.chunkSettings=n,o.container=document.createElement("div"),o.container.className="mmo-chunk";var r=i.getGamePxPosition(e,n.position),a=r.gamePxX,u=r.gamePxY;return o.container.style.left=a+"px",o.container.style.top=u+"px",o.canvas=new s.Canvas(e),o.canvas.mount(o.container),o}return r(e,t),e.prototype.mount=function(e){t.prototype.mount.call(this,e,this.container)},e.prototype.unmount=function(){t.prototype.unmount.call(this,this.container)},e.prototype.__fillChunk=function(){for(var t=0;t<6;t++)for(var e=0;e<6;e++)this.__fillTile(t,e,u.randomColor())},e.prototype.__fillTile=function(t,e,n){this.canvas.fillTile(t,e,n)},e}(a.Mountable);e.Chunk=c},200:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.Layer=void 0;var i=n(37),s=n(923),a=n(879),u=n(698),c=function(t){function e(e){var n=t.call(this)||this;return n.chunks=[],n.visualConsts=e,n.layerState={center:{gamePxX:0,gamePxY:0}},n.container=document.createElement("div"),n.container.className="mmo-layer",n.centerOn(n.layerState.center),n}return r(e,t),e.prototype.mount=function(e){t.prototype.mount.call(this,e,this.container)},e.prototype.unmount=function(){t.prototype.unmount.call(this,this.container)},e.prototype.centerOn=function(t){var e=t.gamePxX,n=t.gamePxY;this.layerState.center.gamePxX=e,this.layerState.center.gamePxY=n,this.syncChunks();var o=u.getViewPortGamePxCoords(this.visualConsts,this.layerState).topLeft;this.container.style.left=-o.gamePxX+"px",this.container.style.top=-o.gamePxY+"px"},e.prototype.syncChunks=function(){var t=u.getViewPortGamePxCoords(this.visualConsts,this.layerState),e=a.getChunkPosition(this.visualConsts,t.topLeft),n=a.getChunkPosition(this.visualConsts,t.bottomRight);this.removeChunksOutside(e,n),this.createMissingChunksInside(e,n)},e.prototype.removeChunksOutside=function(t,e){for(var n=this.chunks.length-1;n>=0;n--){var o=this.chunks[n],r=o.chunkSettings.position.chunksX,i=o.chunkSettings.position.chunksY;(r<t.chunksX||r>e.chunksX||i<t.chunksY||i>e.chunksY)&&(console.log(">>> REMOVING CHUNK ["+r+", "+i+"]"),this.chunks.splice(n,1))}},e.prototype.createMissingChunksInside=function(t,e){for(var n=function(n){for(var r=function(t){if(o.chunks.some((function(e){return e.chunkSettings.position.chunksX===n&&e.chunkSettings.position.chunksY===t})))return"continue";console.log(">>> CREATING CHUNK ["+n+", "+t+"]");var e=new i.Chunk(o.visualConsts,{position:{chunksX:n,chunksY:t}});e.mount(o.container),e.__fillChunk(),o.chunks.push(e)},s=t.chunksY;s<=e.chunksY;s++)r(s)},o=this,r=t.chunksX;r<=e.chunksX;r++)n(r)},e}(s.Mountable);e.Layer=c},879:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getChunkPosition=void 0,e.getChunkPosition=function(t,e){var n=t.chunkSize,o=t.tileSize,r=n.tilesWidth*o.pxWidth,i=n.tilesHeight*o.pxHeight,s=e.gamePxX,a=e.gamePxY;return{chunksX:Math.floor(s/r),chunksY:Math.floor(a/i)}}},907:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getGamePxPosition=void 0,e.getGamePxPosition=function(t,e){var n=t.chunkSize,o=t.tileSize,r=e.chunksX,i=e.chunksY;return{gamePxX:r*(n.tilesWidth*o.pxWidth),gamePxY:i*(n.tilesHeight*o.pxHeight)}}},698:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getViewPortGamePxCoords=void 0,e.getViewPortGamePxCoords=function(t,e){var n=e.center,o=t.viewPortSize,r=t.tileSize,i=o.tilesWidth*r.pxWidth,s=o.tilesHeight*r.pxHeight,a={gamePxX:Math.floor(n.gamePxX-i/2),gamePxY:Math.floor(n.gamePxY-s/2)};return{topLeft:a,bottomRight:{gamePxX:a.gamePxX+i,gamePxY:a.gamePxY+s}}}},923:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Mountable=void 0;var n=function(){function t(){}return t.prototype.mount=function(t,e){if(this.parent)throw new Error("Already mounted");t.appendChild(e),this.parent=t,this.current=e},t.prototype.unmount=function(t){this.parent&&this.current&&(this.parent.removeChild(t),this.parent=void 0,this.current=void 0)},t}();e.Mountable=n},751:function(t,e,n){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0}),e.ViewPort=void 0;var i=n(200),s=function(t){function e(e){var n=t.call(this)||this;n.container=document.createElement("div"),n.container.className="mmo-viewport";var o=e.viewPortSize,r=e.tileSize,s=o.tilesWidth*r.pxWidth,a=o.tilesHeight*r.pxHeight;return n.container.style.width=s+"px",n.container.style.height=a+"px",n.layer=new i.Layer(e),n.layer.mount(n.container),n}return r(e,t),e.prototype.mount=function(e){t.prototype.mount.call(this,e,this.container)},e.prototype.unmount=function(){t.prototype.unmount.call(this,this.container)},e.prototype.centerOn=function(t){this.layer.centerOn(t)},e}(n(923).Mountable);e.ViewPort=s}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{n(344);var t=n(751),e=document.createElement("div");document.body.appendChild(e);var o=new t.ViewPort({tileSize:{pxWidth:128,pxHeight:128},viewPortSize:{tilesWidth:6,tilesHeight:6},chunkSize:{tilesWidth:6,tilesHeight:6}});o.mount(e);var r=0,i=0;document.addEventListener("keydown",(function(t){var e=t.code,n=0,s=0;switch(e){case"ArrowUp":s=-20;break;case"ArrowDown":s=20;break;case"ArrowLeft":n=-20;break;case"ArrowRight":n=20;break;default:return}r+=n,i+=s,console.log("CODE: "+e+", x: "+r+", y: "+i),o.centerOn({gamePxX:r,gamePxY:i})})),console.log("Hello world")})()})();
//# sourceMappingURL=index.js.map