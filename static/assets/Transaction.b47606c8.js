import{_ as H,a as p,v as R,s as j,m as h,e as t,E as m,f as n,o as f,d as e,h as V,c as S,x,F as k,j as d,t as v,C as A}from"./index.1a21de82.js";import{a as q,c as $}from"./transaction.08b91bb4.js";import{c as G}from"./user.3dcdea04.js";import"./request.58213615.js";const J={__name:"Transaction",setup(O){const o=p({pageNo:1,pageSize:10,transaction_id:"",start_date:"",end_date:"",state:""}),_=p([]),C=p([]),g=p([]),D=p(0),s=()=>{o.value.delete_at="all",q(o.value).then(l=>{l.code===200?(C.value=l.data.list,D.value=l.data.total||0):m.error(l.msg)}).catch(l=>{console.log(l)})},U=()=>{G(o.value).then(l=>{l.code===200?g.value=l.data.list:m.error(l.msg)}).catch(l=>{console.log(l)})},z=()=>{o.value={pageNo:1,pageSize:10,transaction_id:"",start_date:"",end_date:"",state:""},_.value=[],s()},Y=l=>{o.value.pageSize=l,s()},B=l=>{o.value.pageNo=l,s()},M=async l=>{await A.confirm("Confirm deletion?","Tips",{confirmButtonText:"Confirm",cancelButtonText:"Cancel",type:"warning"}).catch(u=>u)==="confirm"&&$(l).then(u=>{u.code===200?(s(),m.success("Delete success")):m.error("Delete failed")}).catch(u=>{console.log(u),m.error("Network error")})};return R(_,()=>{_.value?(o.value.start_date=_.value[0],o.value.end_date=_.value[1]):(o.value.start_date="",o.value.end_date="")},{deep:!0}),j(()=>{s(),U()}),(l,c)=>{const u=n("el-option"),b=n("el-select"),i=n("el-col"),L=n("el-date-picker"),y=n("el-button"),T=n("el-row"),N=n("el-header"),r=n("el-table-column"),w=n("el-tag"),E=n("el-table"),F=n("el-main"),I=n("el-pagination"),K=n("el-container");return f(),h(K,{class:"el-container-fix"},{default:t(()=>[e(N,null,{default:t(()=>[e(T,{gutter:20},{default:t(()=>[e(i,{span:3},{default:t(()=>[e(b,{placeholder:"From username",modelValue:o.value.from_user_id,"onUpdate:modelValue":c[0]||(c[0]=a=>o.value.from_user_id=a),clearable:"",filterable:"",onClear:s,onKeydown:V(s,["enter"])},{default:t(()=>[(f(!0),S(k,null,x(g.value,a=>(f(),h(u,{value:a.id,label:a.username},null,8,["value","label"]))),256))]),_:1},8,["modelValue","onKeydown"])]),_:1}),e(i,{span:3},{default:t(()=>[e(b,{placeholder:"To username",modelValue:o.value.to_user_id,"onUpdate:modelValue":c[1]||(c[1]=a=>o.value.to_user_id=a),clearable:"",filterable:"",onClear:s,onKeydown:V(s,["enter"])},{default:t(()=>[(f(!0),S(k,null,x(g.value,a=>(f(),h(u,{value:a.id,label:a.username},null,8,["value","label"]))),256))]),_:1},8,["modelValue","onKeydown"])]),_:1}),e(i,{span:2},{default:t(()=>[e(b,{modelValue:o.value.state,"onUpdate:modelValue":c[2]||(c[2]=a=>o.value.state=a),placeholder:"State"},{default:t(()=>[e(u,{value:0,label:"Uncompleted"}),e(u,{value:1,label:"Completed"})]),_:1},8,["modelValue"])]),_:1}),e(i,{span:6.5},{default:t(()=>[e(L,{modelValue:_.value,"onUpdate:modelValue":c[3]||(c[3]=a=>_.value=a),type:"datetimerange","range-separator":"To","date-format":"YYYY-MM-DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss","start-placeholder":"Start date","end-placeholder":"End date"},null,8,["modelValue"])]),_:1},8,["span"]),e(i,{span:6},{default:t(()=>[e(y,{type:"primary",onClick:s},{default:t(()=>[d(" Search ")]),_:1}),e(y,{type:"info",onClick:z},{default:t(()=>[d(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1}),e(F,null,{default:t(()=>[e(E,{data:C.value,height:"650",ref:"filterTable",border:!0,stripe:"",fit:!0},{default:t(()=>[e(r,{prop:"id",label:"ID",width:"80"}),e(r,{prop:"transaction_id",label:"Transaction ID"}),e(r,{prop:"from_wallet_id",label:"From"}),e(r,{prop:"to_wallet_id",label:"To"}),e(r,{prop:"from_currency_name",width:"200",label:"From Currency"},{default:t(a=>[e(w,null,{default:t(()=>[d(v(a.row.from_currency_name),1)]),_:2},1024),d(" / "+v(a.row.from_currency_rate)+" USD ",1)]),_:1}),e(r,{prop:"to_currency_name",width:"200",label:"To Currency"},{default:t(a=>[e(w,null,{default:t(()=>[d(v(a.row.to_currency_name),1)]),_:2},1024),d(" / "+v(a.row.to_currency_rate)+" USD ",1)]),_:1}),e(r,{prop:"amount",label:"Amount"}),e(r,{prop:"money",label:"toUSD"}),e(r,{prop:"state",label:"State"},{default:t(a=>[e(w,{type:a.row.state===1?"success":"danger","disable-transitions":""},{default:t(()=>[d(v(a.row.state===1?"Completed":"Uncompleted"),1)]),_:2},1032,["type"])]),_:1}),e(r,{prop:"create_at",label:"Transaction Time"}),e(r,{label:"Action",width:"120"},{default:t(a=>[e(y,{size:"small",type:"danger",icon:"Delete",onClick:P=>M(a.row.id)},{default:t(()=>[d("Delete ")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1}),e(T,null,{default:t(()=>[e(I,{onSizeChange:Y,onCurrentChange:B,"current-page":o.value.page,"page-sizes":[10,20,50,100],"page-size":o.value.limit,total:D.value,layout:"total,prev, pager, next,jumper"},null,8,["current-page","page-size","total"])]),_:1})]),_:1})}}},ee=H(J,[["__scopeId","data-v-3b8f6713"]]);export{ee as default};
