import{_ as S,a as I,r as B,s as F,m,e as l,E as d,f as o,o as i,d as e,c as N,x as U,F as E,i as f,h as K,j as L,u as M,p as j,k as z,b as A}from"./index.2f24064d.js";import{b as D}from"./wallet.49f100df.js";import{c as G}from"./coin.cb3c48a8.js";import"./request.019d1f39.js";const R=s=>(j("data-v-2be91e5b"),s=s(),z(),s),T=R(()=>A("h1",{class:"title"},"Create Wallet",-1)),q={__name:"CreateWallet",setup(s){const b=M(),_=I([]),t=B({}),y=async()=>{let r=await G();r.code===200?_.value=r.data:d.error("Get coin list failed, please try again!")},p=async()=>{t.user_id=b.state.user.id,(await D(t)).code===200?(t.name="",t.coin_id="",t.description="",d.success("Create wallet successful!")):d.error("Create wallet failed, please try again!")};return F(()=>{y()}),(r,n)=>{const v=o("el-header"),u=o("el-input"),c=o("el-form-item"),w=o("el-option"),C=o("el-select"),V=o("el-button"),x=o("el-form"),g=o("el-col"),h=o("el-row"),W=o("el-main"),k=o("el-container");return i(),m(k,null,{default:l(()=>[e(W,null,{default:l(()=>[e(v,null,{default:l(()=>[T]),_:1}),e(h,{type:"flex",justify:"center"},{default:l(()=>[e(g,{span:8},{default:l(()=>[e(x,{ref:"createWalletFormRef",model:t,class:"login-form","auto-complete":"on","label-position":"left"},{default:l(()=>[e(c,{prop:"name"},{default:l(()=>[e(u,{modelValue:t.name,"onUpdate:modelValue":n[0]||(n[0]=a=>t.name=a),placeholder:"Wallet Name",size:"large",tabIndex:"-1"},null,8,["modelValue"])]),_:1}),e(c,{prop:"name"},{default:l(()=>[e(C,{modelValue:t.coin_id,"onUpdate:modelValue":n[1]||(n[1]=a=>t.coin_id=a),placeholder:"Select Currency",filterable:"",clearable:""},{default:l(()=>[(i(!0),N(E,null,U(_.value,a=>(i(),m(w,{key:a.id,label:a.name+" - "+a.rate+"(USD)",value:a.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(c,{prop:"description"},{default:l(()=>[e(u,{type:"textarea",rows:"5",modelValue:t.description,"onUpdate:modelValue":n[2]||(n[2]=a=>t.description=a),placeholder:"Wallet Description",size:"large",tabIndex:"-1"},null,8,["modelValue"])]),_:1}),e(c,null,{default:l(()=>[e(V,{type:"primary",class:"submit-btn",onClick:f(p,["prevent"]),onKeyup:K(f(p,["prevent"]),["enter"])},{default:l(()=>[L(" Submit ")]),_:1},8,["onClick","onKeyup"])]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})]),_:1})]),_:1})}}},Q=S(q,[["__scopeId","data-v-2be91e5b"]]);export{Q as default};