var G=Object.defineProperty;var H=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var j=(e,r,t)=>r in e?G(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,W=(e,r)=>{for(var t in r||(r={}))J.call(r,t)&&j(e,t,r[t]);if(H)for(var t of H(r))X.call(r,t)&&j(e,t,r[t]);return e};import{c as L,h as Y,a as Z}from"./render.2fdab938.js";import{i as ee,l as N,h,j as g,p as V,k as $,m as te,n as B,q as T,o as P,s as A,t as q,r as b,u as K,v as F,x,y as oe}from"./index.93aafbe4.js";import{g as ne,a as ie,b as le,c as R}from"./scroll.3fc42066.js";var ve=L({name:"QPageContainer",setup(e,{slots:r}){const{proxy:{$q:t}}=$(),o=ee(N,()=>{console.error("QPageContainer needs to be child of QLayout")});V(te,!0);const a=h(()=>{const s={};return o.header.space===!0&&(s.paddingTop=`${o.header.size}px`),o.right.space===!0&&(s[`padding${t.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(s.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(s[`padding${t.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),s});return()=>g("div",{class:"q-page-container",style:a.value},Y(r.default))}});const{passive:M}=q,re=["both","horizontal","vertical"];var ae=L({name:"QScrollObserver",props:{axis:{type:String,validator:e=>re.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:r}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,a,s;B(()=>e.scrollTarget,()=>{l(),f()});function u(){o!==null&&o();const v=Math.max(0,ie(a)),y=le(a),d={top:v-t.position.top,left:y-t.position.left};if(e.axis==="vertical"&&d.top===0||e.axis==="horizontal"&&d.left===0)return;const w=Math.abs(d.top)>=Math.abs(d.left)?d.top<0?"up":"down":d.left<0?"left":"right";t.position={top:v,left:y},t.directionChanged=t.direction!==w,t.delta=d,t.directionChanged===!0&&(t.direction=w,t.inflectionPoint=t.position),r("scroll",W({},t))}function f(){a=ne(s,e.scrollTarget),a.addEventListener("scroll",i,M),i(!0)}function l(){a!==void 0&&(a.removeEventListener("scroll",i,M),a=void 0)}function i(v){if(v===!0||e.debounce===0||e.debounce==="0")u();else if(o===null){const[y,d]=e.debounce?[setTimeout(u,e.debounce),clearTimeout]:[requestAnimationFrame(u),cancelAnimationFrame];o=()=>{d(y),o=null}}}const m=$();return T(()=>{s=m.proxy.$el.parentNode,f()}),P(()=>{o!==null&&o(),l()}),Object.assign(m.proxy,{trigger:i,getPosition:()=>t}),A}});function se(){const e=b(!K.value);return e.value===!1&&T(()=>{e.value=!0}),e}const U=typeof ResizeObserver!="undefined",k=U===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var D=L({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:r}){let t=null,o,a={width:-1,height:-1};function s(l){l===!0||e.debounce===0||e.debounce==="0"?u():t===null&&(t=setTimeout(u,e.debounce))}function u(){if(clearTimeout(t),t=null,o){const{offsetWidth:l,offsetHeight:i}=o;(l!==a.width||i!==a.height)&&(a={width:l,height:i},r("resize",a))}}const f=$();if(Object.assign(f.proxy,{trigger:s}),U===!0){let l;return T(()=>{F(()=>{o=f.proxy.$el.parentNode,o&&(l=new ResizeObserver(s),l.observe(o),u())})}),P(()=>{clearTimeout(t),l!==void 0&&(l.disconnect!==void 0?l.disconnect():o&&l.unobserve(o))}),A}else{let m=function(){clearTimeout(t),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",s,q.passive),i=void 0)},v=function(){m(),o&&o.contentDocument&&(i=o.contentDocument.defaultView,i.addEventListener("resize",s,q.passive),u())};const l=se();let i;return T(()=>{F(()=>{o=f.proxy.$el,o&&v()})}),P(m),()=>{if(l.value===!0)return g("object",{style:k.style,tabindex:-1,type:"text/html",data:k.url,"aria-hidden":"true",onLoad:v})}}}}),he=L({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:r,emit:t}){const{proxy:{$q:o}}=$(),a=b(null),s=b(o.screen.height),u=b(e.container===!0?0:o.screen.width),f=b({position:0,direction:"down",inflectionPoint:0}),l=b(0),i=b(K.value===!0?0:R()),m=h(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),v=h(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),y=h(()=>i.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${i.value}px`}:null),d=h(()=>i.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${i.value}px`,width:`calc(100% + ${i.value}px)`}:null);function w(n){if(e.container===!0||document.qScrollPrevented!==!0){const c={position:n.position.top,direction:n.direction,directionChanged:n.directionChanged,inflectionPoint:n.inflectionPoint.top,delta:n.delta.top};f.value=c,e.onScroll!==void 0&&t("scroll",c)}}function I(n){const{height:c,width:p}=n;let z=!1;s.value!==c&&(z=!0,s.value=c,e.onScrollHeight!==void 0&&t("scroll-height",c),E()),u.value!==p&&(z=!0,u.value=p),z===!0&&e.onResize!==void 0&&t("resize",n)}function _({height:n}){l.value!==n&&(l.value=n,E())}function E(){if(e.container===!0){const n=s.value>l.value?R():0;i.value!==n&&(i.value=n)}}let S;const O={instances:{},view:h(()=>e.view),isContainer:h(()=>e.container),rootRef:a,height:s,containerHeight:l,scrollbarWidth:i,totalWidth:h(()=>u.value+i.value),rows:h(()=>{const n=e.view.toLowerCase().split(" ");return{top:n[0].split(""),middle:n[1].split(""),bottom:n[2].split("")}}),header:x({size:0,offset:0,space:!1}),right:x({size:300,offset:0,space:!1}),footer:x({size:0,offset:0,space:!1}),left:x({size:300,offset:0,space:!1}),scroll:f,animate(){S!==void 0?clearTimeout(S):document.body.classList.add("q-body--layout-animate"),S=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),S=void 0},155)},update(n,c,p){O[n][c]=p}};if(V(N,O),R()>0){let p=function(){n=null,c.classList.remove("hide-scrollbar")},z=function(){if(n===null){if(c.scrollHeight>o.screen.height)return;c.classList.add("hide-scrollbar")}else clearTimeout(n);n=setTimeout(p,300)},C=function(Q){n!==null&&Q==="remove"&&(clearTimeout(n),p()),window[`${Q}EventListener`]("resize",z)},n=null;const c=document.body;B(()=>e.container!==!0?"add":"remove",C),e.container!==!0&&C("add"),oe(()=>{C("remove")})}return()=>{const n=Z(r.default,[g(ae,{onScroll:w}),g(D,{onResize:I})]),c=g("div",{class:m.value,style:v.value,ref:e.container===!0?void 0:a},n);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:a},[g(D,{onResize:_}),g("div",{class:"absolute-full",style:y.value},[g("div",{class:"scroll",style:d.value},[c])])]):c}}});export{ve as Q,he as a,D as b};
