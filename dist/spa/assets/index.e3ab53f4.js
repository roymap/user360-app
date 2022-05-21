import{r as y,w as E,o as A,i as O}from"./index.554559ed.js";var _=Object.defineProperty,p=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable,h=(t,r,e)=>r in t?_(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,k=(t,r)=>{for(var e in r||(r={}))w.call(r,e)&&h(t,e,r[e]);if(p)for(var e of p(r))j.call(r,e)&&h(t,e,r[e]);return t},b="usehead",v="head:count",d="data-head-attrs",H=(t,r,e)=>{const n=e.createElement(t);for(const a of Object.keys(r)){let s=r[a];a==="key"||s===!1||(a==="children"?n.textContent=s:n.setAttribute(a,s))}return n};function S(t,r){if(t instanceof HTMLElement&&r instanceof HTMLElement){const e=r.getAttribute("nonce");if(e&&!t.getAttribute("nonce")){const n=r.cloneNode(!0);return n.setAttribute("nonce",""),n.nonce=e,e===t.nonce&&t.isEqualNode(n)}}return t.isEqualNode(r)}var N=t=>{const r=["key","id","name","property"];for(const e of r){const n=typeof t.getAttribute=="function"?t.hasAttribute(e)?t.getAttribute(e):void 0:t[e];if(n!==void 0)return{name:e,value:n}}},P=()=>{const t=O(b);if(!t)throw new Error("You may forget to apply app.use(head)");return t},C=["title","meta","link","base","style","script","htmlAttrs","bodyAttrs"],D=t=>{const r=[];for(const e of Object.keys(t))if(t[e]!=null){if(e==="title")r.push({tag:e,props:{children:t[e]}});else if(e==="base")r.push({tag:e,props:k({key:"default"},t[e])});else if(C.includes(e)){const n=t[e];Array.isArray(n)?n.forEach(a=>{r.push({tag:e,props:a})}):n&&r.push({tag:e,props:n})}}return r},m=(t,r)=>{const e=t.getAttribute(d);if(e)for(const a of e.split(","))a in r||t.removeAttribute(a);const n=[];for(const a in r){const s=r[a];s!=null&&(s===!1?t.removeAttribute(a):t.setAttribute(a,s),n.push(a))}n.length?t.setAttribute(d,n.join(",")):t.removeAttribute(d)},T=(t=window.document,r,e)=>{var n;const a=t.head;let s=a.querySelector(`meta[name="${v}"]`);const c=s?Number(s.getAttribute("content")):0,i=[];if(s)for(let o=0,l=s.previousElementSibling;o<c;o++,l=(l==null?void 0:l.previousElementSibling)||null)((n=l==null?void 0:l.tagName)==null?void 0:n.toLowerCase())===r&&i.push(l);else s=t.createElement("meta"),s.setAttribute("name",v),s.setAttribute("content","0"),a.append(s);let u=e.map(o=>H(o.tag,o.props,t));u=u.filter(o=>{for(let l=0;l<i.length;l++){const f=i[l];if(S(f,o))return i.splice(l,1),!1}return!0}),i.forEach(o=>{var l;return(l=o.parentNode)==null?void 0:l.removeChild(o)}),u.forEach(o=>{a.insertBefore(o,s)}),s.setAttribute("content",""+(c-i.length+u.length))},q=()=>{let t=[],r=new Set;const e={install(n){n.config.globalProperties.$head=e,n.provide(b,e)},get headTags(){const n=[];return t.forEach(a=>{D(a.value).forEach(c=>{if(c.tag==="meta"||c.tag==="base"||c.tag==="script"){const i=N(c.props);if(i){let u=-1;for(let o=0;o<n.length;o++){const l=n[o],f=l.props[i.name],g=c.props[i.name];if(l.tag===c.tag&&f===g){u=o;break}}u!==-1&&n.splice(u,1)}}n.push(c)})}),n},addHeadObjs(n){t.push(n)},removeHeadObjs(n){t=t.filter(a=>a!==n)},updateDOM(n=window.document){let a,s={},c={};const i={};for(const o of e.headTags){if(o.tag==="title"){a=o.props.children;continue}if(o.tag==="htmlAttrs"){Object.assign(s,o.props);continue}if(o.tag==="bodyAttrs"){Object.assign(c,o.props);continue}i[o.tag]=i[o.tag]||[],i[o.tag].push(o)}a!==void 0&&(n.title=a),m(n.documentElement,s),m(n.body,c);const u=new Set([...Object.keys(i),...r]);for(const o of u)T(n,o,i[o]||[]);r.clear(),Object.keys(i).forEach(o=>r.add(o))}};return e},x=typeof window!="undefined",I=t=>{const r=y(t),e=P();e.addHeadObjs(r),x&&(E(()=>{e.updateDOM()}),A(()=>{e.removeHeadObjs(r),e.updateDOM()}))};export{q as c,I as u};