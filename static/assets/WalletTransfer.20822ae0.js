import{_ as Q,a as w,D as h,v as I,s as X,m as k,e as l,E as m,f as c,o as v,d as n,c as L,x as B,F as N,A as y,j as V,t as g,z as Y,i as D,u as Z,l as $,p as ee,k as ae,b as E}from"./index.2f24064d.js";import{a as le,d as te}from"./wallet.49f100df.js";import{c as ne}from"./coin.cb3c48a8.js";import"./request.019d1f39.js";const F=x=>(ee("data-v-785eb99c"),x=x(),ae(),x),se=F(()=>E("h1",{class:"title"},"WalletTransfer",-1)),oe=F(()=>E("h5",{class:"description"},"Personal wallet transactions",-1)),re={__name:"WalletTransfer",setup(x){const M=Z(),P=$(),_=w([]),r=w(0),i=w([]),u=w(),f=w(),C=h(()=>{var a,s;const e=(a=i.value.find(o=>o.id===u.value))==null?void 0:a.coin_id;return(s=_.value.find(o=>o.id===e))==null?void 0:s.name}),j=h(()=>{var a,s;const e=(a=i.value.find(o=>o.id===f.value))==null?void 0:a.coin_id;return(s=_.value.find(o=>o.id===e))==null?void 0:s.name}),S=h(()=>{var a,s;const e=(a=i.value.find(o=>o.id===u.value))==null?void 0:a.coin_id;return((s=_.value.find(o=>o.id===e))==null?void 0:s.rate)*r.value}),G=h(()=>{var a,s;const e=(a=i.value.find(o=>o.id===f.value))==null?void 0:a.coin_id;return S.value/((s=_.value.find(o=>o.id===e))==null?void 0:s.rate)});I(r,()=>{var e,a;r.value>((e=i.value.find(s=>s.id===u.value))==null?void 0:e.balance)&&(r.value=(a=i.value.find(s=>s.id===u.value))==null?void 0:a.balance)}),I(u,()=>{r.value=0});const A=async()=>{let e=await ne();e.code===200?_.value=e.data:m.error("Get coin list failed, please try again!")},R=async()=>{const e=await le({user_id:M.state.user.id,page:1,page_size:100});e.code===200?i.value=e.data.list:m.error("Get user wallet list failed, please try again!")},q=async()=>{const e={amount:r.value,from_wallet_id:u.value,to_wallet_id:f.value};if(e.amount<=0){m.error("Please enter the correct amount!");return}if(e.from_wallet_id===e.to_wallet_id){m.error("Please select different currencies!");return}(await te(e)).code===200?(r.value=0,f.value="",u.value="",m.success("Transfer successful!")):m.error("Create wallet failed, please try again!")},H=()=>{P.push({name:"Transition"})};return X(()=>{A(),R()}),(e,a)=>{const s=c("el-header"),o=c("el-input"),b=c("el-col"),p=c("el-row"),U=c("el-option"),W=c("el-select"),J=c("el-text"),z=c("van-button"),K=c("el-main"),O=c("el-container");return v(),k(O,null,{default:l(()=>[n(K,null,{default:l(()=>[n(s,null,{default:l(()=>[se,oe]),_:1}),n(p,{type:"flex",justify:"center",class:"el-row-margin"},{default:l(()=>[n(b,{span:22},{default:l(()=>{var t;return[n(o,{controls:!1,modelValue:r.value,"onUpdate:modelValue":a[0]||(a[0]=d=>r.value=d),size:"large",placeholder:"balance:"+((t=i.value.find(d=>d.id===u.value))==null?void 0:t.balance),tabIndex:"-1"},null,8,["modelValue","placeholder"])]}),_:1})]),_:1}),n(p,{type:"flex",justify:"center",class:"el-row-margin"},{default:l(()=>[n(b,{span:22},{default:l(()=>[n(W,{modelValue:u.value,"onUpdate:modelValue":a[1]||(a[1]=t=>u.value=t),size:"large",placeholder:"From Currency",filterable:"",clearable:""},{default:l(()=>[(v(!0),L(N,null,B(i.value,t=>{var d;return v(),k(U,{key:t.id,label:t.name+" - "+((d=_.value.find(T=>T.id===t.coin_id))==null?void 0:d.name)+" - (balance:"+t.balance+")",value:t.id},null,8,["label","value"])}),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),n(p,{type:"flex",justify:"center",class:"el-row-margin"},{default:l(()=>[n(b,{span:22},{default:l(()=>[n(W,{modelValue:f.value,"onUpdate:modelValue":a[2]||(a[2]=t=>f.value=t),size:"large",placeholder:"To Currency",filterable:"",clearable:""},{default:l(()=>[(v(!0),L(N,null,B(i.value,t=>{var d;return v(),k(U,{key:t.id,value:t.id,label:t.name+" - "+((d=_.value.find(T=>T.id===t.coin_id))==null?void 0:d.name)+" - (balance:"+t.balance+")"},null,8,["value","label"])}),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),n(p,{type:"flex",justify:"center",class:"el-row-top"},{default:l(()=>[r.value&&y(C)&&y(j)?(v(),k(J,{key:0,type:"warning"},{default:l(()=>[V(g(r.value)+" "+g(y(C))+" = "+g(y(S))+"(USD) = "+g(y(G))+" "+g(y(j)),1)]),_:1})):Y("",!0)]),_:1}),n(p,{type:"flex",justify:"center",class:"el-row-top"},{default:l(()=>[n(b,{span:22},{default:l(()=>[n(z,{type:"primary",round:"",block:"","native-type":"submit",onClick:D(q,["prevent"])},{default:l(()=>[V(" Transfer ")]),_:1},8,["onClick"])]),_:1})]),_:1}),n(p,{type:"flex",justify:"center",class:"el-row-top"},{default:l(()=>[n(b,{span:22},{default:l(()=>[n(z,{round:"",block:"","native-type":"submit",onClick:D(H,["prevent"])},{default:l(()=>[V(" User Transfer ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1})}}},_e=Q(re,[["__scopeId","data-v-785eb99c"]]);export{_e as default};
