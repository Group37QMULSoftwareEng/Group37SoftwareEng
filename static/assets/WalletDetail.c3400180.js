import{H as k,G,J as M,K as q,d as s,L as A,O as H,_ as R,a as _,s as j,c as S,F as J,x as K,b as o,e as c,f as i,o as C,m as $,j as v,t as u,n as Q,p as X,k as Y,u as Z,l as ee,P as te}from"./index.2f24064d.js";import{a as ae,w as oe,c as se}from"./wallet.49f100df.js";import{c as le}from"./coin.cb3c48a8.js";import{s as r}from"./function-call.38b758f1.js";import"./request.019d1f39.js";let x;const ne={title:"",width:"",theme:null,message:"",overlay:!0,callback:null,teleport:"body",className:"",allowHtml:!1,lockScroll:!0,transition:void 0,beforeClose:null,overlayClass:"",overlayStyle:void 0,messageAlign:"",cancelButtonText:"",cancelButtonColor:null,cancelButtonDisabled:!1,confirmButtonText:"",confirmButtonColor:null,confirmButtonDisabled:!1,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!0,closeOnClickOverlay:!1};let ce=k({},ne);function ie(){({instance:x}=M({setup(){const{state:m,toggle:d}=q();return()=>s(H,A(m,{"onUpdate:show":d}),null)}}))}function re(l){return G?new Promise((m,d)=>{x||ie(),x.open(k({},ce,l,{callback:f=>{(f==="confirm"?m:d)(f)}}))}):Promise.resolve(void 0)}const de=l=>re(k({showCancelButton:!0},l));const ue=l=>(X("data-v-df1329ba"),l=l(),Y(),l),me={class:"container"},pe={class:"card-header"},_e={class:"wallet-name-avatar"},ve={class:"avatar"},fe={class:"wallet-name-balance"},ge={class:"wallet-name"},he={class:"balance"},ye=["onClick"],be={class:"card-text"},we={class:"menu"},Ce={style:{margin:"16px"}},xe={style:{margin:"16px"}},ke={style:{margin:"16px"}},Be=ue(()=>o("div",{class:"bottom"},null,-1)),De={__name:"WalletDetail",setup(l){const m=Z(),d=ee(),f=te(),V=_(["rgba(21,133,241,0.89)"]),h=_([]),B=_({}),D=_([]),n=_({}),W=e=>{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),r({type:"success",message:"Copied!"})};function L(e){return e[Math.floor(Math.random()*e.length)]}function T(e){if(e.length<=8)return e;var t=e.substring(0,4),p=e.substring(e.length-4),y="...";return t+y+p}const U=async()=>{const e=await le();e.code===200?(h.value=e.data,I()):r({type:"danger",message:"Get coin list failed, please try again!"})},I=async()=>{B.value.user_id=m.state.user.id;const e=await ae(B.value);if(e.code===200){const t=e.data.list.filter(p=>p.id==f.query.id);n.value=t[0],D.value=t}else r({type:"danger",message:"Get user wallet list failed, please try again!"})},N=async()=>{const e=await oe(n.value);e.code===200?r({type:"success",message:"Update wallet success!"}):r({type:"danger",message:e.msg})},O=async()=>{de({title:"Tips?",message:"Confirm to delete?",confirmButtonText:"Confirm",cancelButtonText:"Cancel"}).then(async()=>{const e=await se(n.value.id);e.code===200?(r({type:"success",message:"Delete wallet success!"}),d.push({name:"Wallet"})):r({type:"danger",message:e.msg})}).catch(()=>{})},P=()=>{d.go(-1)};return j(()=>{U()}),(e,t)=>{const p=i("el-avatar"),y=i("CopyDocument"),E=i("el-icon"),F=i("el-card"),b=i("van-field"),z=i("van-cell-group"),w=i("van-button");return C(),S("div",me,[(C(!0),S(J,null,K(D.value,a=>(C(),$(F,{class:"card-item",style:Q({backgroundColor:L(V.value)})},{header:c(()=>[o("div",pe,[o("div",_e,[o("div",ve,[s(p,{size:50},{default:c(()=>[v(u(h.value.find(g=>g.id===a.coin_id).name),1)]),_:2},1024)]),o("div",fe,[o("div",ge,u(a.name),1),o("div",he,u(a.balance)+" "+u(h.value.find(g=>g.id===a.coin_id).name),1)])]),o("div",{class:"wallet-address",onClick:g=>W(a.hash_id)},[v(u(T(a.hash_id))+" ",1),s(E,null,{default:c(()=>[s(y)]),_:1})],8,ye)])]),default:c(()=>[o("p",be,u(a.description),1)]),_:2},1032,["style"]))),256)),o("div",we,[s(z,null,{default:c(()=>[s(b,{modelValue:n.value.name,"onUpdate:modelValue":t[0]||(t[0]=a=>n.value.name=a),label:"Name",placeholder:"Enter wallet name"},null,8,["modelValue"]),s(b,{modelValue:n.value.balance,"onUpdate:modelValue":t[1]||(t[1]=a=>n.value.balance=a),label:"Balance",placeholder:"Enter wallet balance"},null,8,["modelValue"]),s(b,{modelValue:n.value.description,"onUpdate:modelValue":t[2]||(t[2]=a=>n.value.description=a),rows:"2",autosize:"",label:"Description",type:"textarea",maxlength:"50",placeholder:"Enter wallet description","show-word-limit":""},null,8,["modelValue"])]),_:1}),o("div",Ce,[s(w,{round:"",block:"",type:"primary","native-type":"submit",onClick:N},{default:c(()=>[v(" Submit ")]),_:1})]),o("div",xe,[s(w,{round:"",block:"",type:"danger","native-type":"submit",onClick:O},{default:c(()=>[v(" Delete ")]),_:1})]),o("div",ke,[s(w,{round:"",block:"","native-type":"submit",onClick:P},{default:c(()=>[v(" Back ")]),_:1})])]),Be])}}},Ue=R(De,[["__scopeId","data-v-df1329ba"]]);export{Ue as default};