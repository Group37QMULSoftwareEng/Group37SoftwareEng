import{_ as l,c as m,d as t,e,F as u,f as o,o as d,j as a}from"./index.2f24064d.js";const p={name:"Home",components:{},data(){return{}},mounted(){},methods:{onClickRight(){this.$router.push({name:"Notification"})}}};function f(h,v,b,g,k,r){const c=o("van-icon"),i=o("van-nav-bar"),s=o("router-view"),n=o("van-tabbar-item"),_=o("van-tabbar");return d(),m(u,null,[t(i,{title:this.$route.name,onClickRight:r.onClickRight},{right:e(()=>[t(c,{name:"bell",size:"22",color:"#979899"})]),_:1},8,["title","onClickRight"]),t(s),t(_,{route:"","safe-area-inset-bottom":""},{default:e(()=>[t(n,{to:"/index",icon:"home-o"},{default:e(()=>[a("Home")]),_:1}),t(n,{to:"/transition",icon:"peer-pay"},{default:e(()=>[a("Transition")]),_:1}),t(n,{to:"/wallet",icon:"paid"},{default:e(()=>[a("Wallet")]),_:1}),t(n,{to:"/user",icon:"user-o"},{default:e(()=>[a("User")]),_:1})]),_:1})],64)}const C=l(p,[["render",f]]);export{C as default};