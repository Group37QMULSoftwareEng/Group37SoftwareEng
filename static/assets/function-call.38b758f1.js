import{G as s,H as i,I as a,J as r,K as l,d as c,L as u,M as d}from"./index.2f24064d.js";let o,t;const f=e=>a(e)?e:{message:e};function p(){({instance:t}=r({setup(){const{state:e,toggle:n}=l();return()=>c(d,u(e,{"onUpdate:show":n}),null)}}))}const m=()=>({type:"danger",color:void 0,message:"",onClose:void 0,onClick:void 0,onOpened:void 0,duration:3e3,position:void 0,className:"",lockScroll:!1,background:void 0});let g=m();const v=()=>{t&&t.toggle(!1)};function N(e){if(!!s)return t||p(),e=i({},g,f(e)),t.open(e),clearTimeout(o),e.duration>0&&(o=setTimeout(v,e.duration)),t}export{N as s};
