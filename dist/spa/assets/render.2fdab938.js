import{z as u,A as c,B as f,C as s,j as v}from"./index.93aafbe4.js";const l=n=>u(c(n)),h=n=>u(n);function m(n,t){const e=n.style;for(const r in t)e[r]=t[r]}function g(n){if(n==null)return;if(typeof n=="string")try{return document.querySelector(n)||void 0}catch{return}const t=f(n)===!0?n.value:n;if(t)return t.$el||t}function S(n,t){if(n==null||n.contains(t)===!0)return!0;for(let e=n.nextElementSibling;e!==null;e=e.nextElementSibling)if(e.contains(t))return!0;return!1}function p(n,t){return n!==void 0&&n()||t}function y(n,t){if(n!==void 0){const e=n();if(e!=null)return e.slice()}return t}function x(n,t){return n!==void 0?t.concat(n()):t}function b(n,t){return n===void 0?t:t!==void 0?t.concat(n()):n()}function C(n,t,e,r,i,a){t.key=r+i;const o=v(n,t,e);return i===!0?s(o,a()):o}export{x as a,m as b,l as c,h as d,b as e,y as f,g,p as h,S as i,C as j};
