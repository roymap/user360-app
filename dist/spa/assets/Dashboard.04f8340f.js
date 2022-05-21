import{Q as M}from"./QTooltip.7660989e.js";import{c as b,f as $,Q as c}from"./QIcon.17728b5e.js";import{Q as k}from"./QPage.ca6a0534.js";import{u as D}from"./index.e3ab53f4.js";import{Q as w}from"./QBtn.64a2f992.js";import{m as Q,n as S,d as g,ag as C,ah as L,_ as y,e as a,f as d,j as o,h as s,k as e,l as h,Y as l,F as i,g as m,ai as q,a as z}from"./index.554559ed.js";import{Q as B}from"./QCard.11797528.js";import"./position-engine.af2acb50.js";import"./scroll.6769d2e8.js";import"./use-dark.4190d64b.js";var f=b({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(t,{slots:n}){const r=Q(()=>`q-card__section q-card__section--${t.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>S(t.tag,{class:r.value},$(n.default))}});const N=g({name:"DashboardStat",props:{title:{type:String,required:!0},link:{type:String},stat:{type:Object,required:!0}},data(){return{diffLastMonth:0}},setup(t){return console.log("dashboard.setup",t),{}},mounted(){let n=new Date().getDate()/r(new Date().getFullYear(),new Date().getMonth())*(this.stat.lastMonth||0);this.diffLastMonth=Math.floor(this.stat.thisMonth/n*100)-100;function r(u,_){return new Date(_,u,0).getDate()}},methods:{money:C,number:L}}),V={class:"header"},P={class:"row"},j={class:"col number"},A={key:0},F={key:1},I=e("div",{class:"col text"},"this month",-1),O={class:"row"},T={class:"col number"},Y=e("div",{class:"col text"},"from last month",-1);function x(t,n,r,u,_,v){return a(),d(B,{bordered:"",flat:"",class:"stat"},{default:o(()=>[s(f,null,{default:o(()=>[e("div",V,[h(l(t.title)+" ",1),t.link?(a(),d(w,{key:0,flat:"",size:"sm",round:"",color:"primary",to:t.link,class:"float-right"},{default:o(()=>[s(c,{name:"link"})]),_:1},8,["to"])):i("",!0)])]),_:1}),s(f,null,{default:o(()=>[e("div",P,[e("div",j,[t.stat.isMoney?(a(),m("span",A,l(t.money(t.stat.thisMonth)),1)):i("",!0),t.stat.isMoney?i("",!0):(a(),m("span",F,l(t.number(t.stat.thisMonth)),1))]),I]),e("div",O,[e("div",T,[e("span",{class:q(t.diffLastMonth<0?"text-red":"text-green")},l(t.diffLastMonth)+"% ",3),t.diffLastMonth>=0?(a(),d(c,{key:0,name:"trending_up",color:"green"})):i("",!0),t.diffLastMonth<0?(a(),d(c,{key:1,name:"trending_down",color:"red"})):i("",!0)]),Y])]),_:1})]),_:1})}var E=y(N,[["render",x]]);const H=g({name:"DashboardPage",components:{DashboardStat:E},setup(){return D({title:"DirectAds | Dashboard"}),{}}}),R=h(" Dashboard "),G=h(" A summary of statistics and important numbers"),J=e("br",null,null,-1),K=h(" for you to quickly review "),U={class:"row q-gutter-md"},W={class:"col"},X={class:"col"},Z={class:"col"};function tt(t,n,r,u,_,v){const p=z("dashboard-stat");return a(),d(k,{class:"dashboard-page"},{default:o(()=>[e("h1",null,[R,s(c,{size:"xs",color:"grey",name:"help_outline"},{default:o(()=>[s(M,{class:"border bg-grey-1 text-grey-10"},{default:o(()=>[G,J,K]),_:1})]),_:1})]),e("div",U,[e("div",W,[s(p,{title:"Revenue",link:"/app/orders",stat:{thisMonth:14233.42,lastMonth:14002,isMoney:!0}},null,8,["stat"])]),e("div",X,[s(p,{title:"Orders",link:"/app/orders",stat:{thisMonth:1833,lastMonth:3102}})]),e("div",Z,[s(p,{title:"Products",link:"/app/products",stat:{thisMonth:233,lastMonth:230}})])])]),_:1})}var ht=y(H,[["render",tt]]);export{ht as default};