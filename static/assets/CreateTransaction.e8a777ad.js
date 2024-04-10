import{_ as G,a as v,r as R,s as O,m as _,e as s,E as n,f as r,o as d,d as o,c as I,x as S,b as p,t as $,i as y,j as h,F as L,z as q,h as H,u as J,C as Q,p as X,k as Y}from"./index.1a21de82.js";import{w as Z}from"./wallet.009374ac.js";import{c as ee}from"./coin.24a09ce5.js";import{t as te}from"./transaction.08b91bb4.js";import{w as ae,a as le,b as se}from"./address.a2675a0d.js";import"./request.58213615.js";const B=c=>(X("data-v-b7d8f54b"),c=c(),Y(),c),oe=B(()=>p("h1",{class:"title"},"Create Transition",-1)),ne=B(()=>p("h5",{class:"description"},"Inter-user transactions",-1)),re={style:{float:"left","margin-right":"10px"}},de={style:{float:"right",color:"#8492a6","font-size":"13px"}},ie={__name:"CreateTransaction",setup(c){const u=J(),m=v([]),x=v([]),e=R({}),V=v([]),z=async()=>{let l=await ee();l.code===200?x.value=l.data:n.error("Get coin list failed, please try again!")},D=async()=>{const l=await Z({user_id:u.state.user.id,page:1,page_size:100});l.code===200?m.value=l.data.list:n.error("Get user wallet list failed, please try again!")},k=async()=>{var a;if(e.user_id=u.state.user.id,e.to_wallet_id===e.from_wallet_id){n.error("Please select different wallet!");return}if(e.amount<=0||e.amount===""){n.error("Please enter the correct amount!");return}if(e.amount>((a=m.value.find(w=>w.hash_id===e.from_wallet_id))==null?void 0:a.balance)){n.error("Insufficient balance!");return}let l=await te(e);l.code===200?(e.to_wallet_id="",e.from_wallet_id="",e.amount="",e.description="",n.success("Create Transaction successful!")):n.error(l.msg)},f=async()=>{const l=await ae({user_id:u.state.user.id});l.code===200&&(V.value=l.data.list)},U=async()=>{const l=await Q.prompt("Please input address remark","Tips",{confirmButtonText:"OK",cancelButtonText:"Cancel"});if(!l.value){n.error("Please input address remark!");return}const a=await le({user_id:u.state.user.id,remark:l.value,address:e.to_wallet_id});console.log(a),a.code===200?(f(),n.success("Save address successful!")):n.error(a.msg)},E=async l=>{const a=await se(l.id);a.code===200?(f(),n.success("Delete address successful!")):n.error(a.msg)};return O(()=>{z(),D(),f()}),(l,a)=>{const w=r("el-header"),g=r("el-input"),C=r("el-tag"),A=r("el-option"),T=r("el-select"),i=r("el-form-item"),F=r("el-button"),K=r("el-form"),M=r("el-col"),N=r("el-row"),P=r("el-main"),W=r("el-container");return d(),_(W,null,{default:s(()=>[o(P,null,{default:s(()=>[o(w,null,{default:s(()=>[oe,ne]),_:1}),o(N,{type:"flex",justify:"center"},{default:s(()=>[o(M,{span:8},{default:s(()=>[o(K,{ref:"transferFormRef",model:e,class:"login-form","auto-complete":"on","label-position":"left"},{default:s(()=>[o(i,{prop:"hash_id"},{default:s(()=>[o(g,{modelValue:e.to_wallet_id,"onUpdate:modelValue":a[0]||(a[0]=t=>e.to_wallet_id=t),placeholder:"Receiver\u2018s wallet address",size:"large",tabIndex:"-1"},null,8,["modelValue"]),o(T,{modelValue:e.to_wallet_id,"onUpdate:modelValue":a[1]||(a[1]=t=>e.to_wallet_id=t),placeholder:"Wallet Address",clearable:"",style:{"margin-right":"5px","margin-top":"10px",width:"150px"}},{default:s(()=>[(d(!0),I(L,null,S(V.value,t=>(d(),_(A,{key:t.id,label:t.address+" - "+t.remark,value:t.address},{default:s(()=>[p("span",re,$(t.address),1),p("span",de,[o(C,{type:"danger",onClick:y(b=>E(t),["stop"])},{default:s(()=>[h("Delete")]),_:2},1032,["onClick"])])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"]),e.to_wallet_id?(d(),_(C,{key:0,style:{"margin-top":"5px"},onClick:U},{default:s(()=>[h(" Save address ")]),_:1})):q("",!0)]),_:1}),o(i,{prop:"name"},{default:s(()=>[o(T,{modelValue:e.from_wallet_id,"onUpdate:modelValue":a[2]||(a[2]=t=>e.from_wallet_id=t),placeholder:"Select wallet",filterable:"",clearable:""},{default:s(()=>[(d(!0),I(L,null,S(m.value,t=>{var b;return d(),_(A,{key:t.id,label:t.name+" - "+((b=x.value.find(j=>j.id===t.coin_id))==null?void 0:b.name)+" - (balance:"+t.balance+")",value:t.hash_id},null,8,["label","value"])}),128))]),_:1},8,["modelValue"])]),_:1}),o(i,{prop:"amount"},{default:s(()=>[o(g,{modelValue:e.amount,"onUpdate:modelValue":a[3]||(a[3]=t=>e.amount=t),placeholder:"Amount",size:"large",tabIndex:"-1"},null,8,["modelValue"])]),_:1}),o(i,{prop:"description"},{default:s(()=>[o(g,{type:"textarea",rows:"5",modelValue:e.description,"onUpdate:modelValue":a[4]||(a[4]=t=>e.description=t),placeholder:"Transaction Description (optional)",size:"large",tabIndex:"-1"},null,8,["modelValue"])]),_:1}),o(i,null,{default:s(()=>[o(F,{type:"primary",class:"submit-btn",onClick:y(k,["prevent"]),onKeyup:H(y(k,["prevent"]),["enter"])},{default:s(()=>[h(" Transfer ")]),_:1},8,["onClick","onKeyup"])]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})]),_:1})]),_:1})}}},we=G(ie,[["__scopeId","data-v-b7d8f54b"]]);export{we as default};
