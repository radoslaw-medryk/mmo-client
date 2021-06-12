(()=>{"use strict";var e,t,n,r,o={553:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.dummyStep=void 0;var i=n(528);t.dummyStep=function(e){return r(this,void 0,void 0,(function(){var t,n;return o(this,(function(r){return t=i.randomIntBetween(-100,100),n=i.randomIntBetween(-100,100),e.changePlayerPosition((function(e){var r=e.x,o=e.y;return{x:r+t,y:o+n}})),[2]}))}))}},440:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.startDummy=void 0;var i=n(553);t.startDummy=function(e){var t,n=!0;return t=function(){return r(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return n?[4,i.dummyStep(e)]:[3,3];case 1:return t.sent(),[4,new Promise((function(e){return setTimeout(e,200)}))];case 2:return t.sent(),[3,0];case 3:return[2]}}))}))}(),function(){return r(this,void 0,void 0,(function(){return o(this,(function(e){switch(e.label){case 0:return n=!1,[4,t];case 1:return e.sent(),[2]}}))}))}}},611:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;var r=n(497),o=n(505),i=function(){function e(e){this.onPlayerPositionChanged=new r.CustomEvent,this.state=e}return e.prototype.changePlayerPosition=function(e){var t=o.getChangeValue(this.state.playerPos,e),n=t.x,r=t.y;n=Math.max(0,n),r=Math.max(0,r),this.state.playerPos.x=n,this.state.playerPos.y=r,this.onPlayerPositionChanged.trigger(this.state.playerPos)},e}();t.Game=i},497:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{s(r.next(e))}catch(e){i(e)}}function u(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}s((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.CustomEvent=void 0;var o=function(){function e(){this.subscribers=[]}return e.prototype.on=function(e){this.subscribers.includes(e)||this.subscribers.push(e)},e.prototype.off=function(e){var t=this.subscribers.findIndex((function(t){return t===e}));t<0||this.subscribers.splice(t,1)},e.prototype.trigger=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n(this,void 0,void 0,(function(){var t;return r(this,(function(n){switch(n.label){case 0:return t=this.subscribers.map((function(t){return t.apply(void 0,e)})),[4,Promise.all(t)];case 1:return n.sent(),[2]}}))}))},e}();t.CustomEvent=o},505:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getChangeValue=void 0,t.getChangeValue=function(e,t){return"function"==typeof t?t(e):t}},528:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.randomIntBetween=void 0,t.randomIntBetween=function(e,t){return Math.floor(Math.random()*(t-e))+e}},735:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Visual=void 0;var n=function(){function e(e){this.game=e,this.subscribeToGame()}return e.prototype.subscribeToGame=function(){this.game.onPlayerPositionChanged.on(this.onPlayerPositionChanged)},e.prototype.onPlayerPositionChanged=function(e){var t=e.x,n=e.y;console.log(">>> NEW POS: x = "+t+", y = "+n+".")},e}();t.Visual=n}},i={};function a(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return o[e].call(n.exports,n,n.exports,a),n.exports}e=a(440),t=a(611),n=a(735),r=new t.Game({playerPos:{x:100,y:100}}),new n.Visual(r),e.startDummy(r)})();
//# sourceMappingURL=index.js.map