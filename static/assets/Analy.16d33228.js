import{i as y}from"./index.f5263518.js";import{h as r}from"./moment.40bc58bf.js";import{s as p}from"./request.58213615.js";import{_ as f,c as u,b as s,d as l,e as d,t as m,f as v,o as Y,j as _,p as g,k}from"./index.1a21de82.js";function b(a){return p({url:"/analy/user",method:"get",params:a})}function x(a){return p({url:"/analy/transaction",method:"get",params:a})}const M={data(){return{today_new_user:0,today_new_transaction:0,all_user:0,chart1_range:"all",chart1_time:{start:"2000-01-01 00:00:00",end:"2099-12-31 23:59:59"},chart2_range:"all",chart2_time:{start:"2000-01-01 00:00:00",end:"2099-12-31 23:59:59"}}},mounted(){this.getUserLine(),this.getTransactionBar()},watch:{chart1_range(a){switch(a){case"yesterday":this.chart1_time={start:r().subtract(1,"days").format("YYYY-MM-DD 00:00:00"),end:r().subtract(1,"days").format("YYYY-MM-DD 23:59:59")};break;case"week":this.chart1_time={start:r().subtract(6,"days").format("YYYY-MM-DD 00:00:00"),end:r().format("YYYY-MM-DD 23:59:59")};break;case"month":this.chart1_time={start:r().subtract(1,"months").format("YYYY-MM-DD 00:00:00"),end:r().format("YYYY-MM-DD 23:59:59")};break;default:this.chart1_time={start:"2000-01-01 00:00:00",end:"2099-12-31 23:59:59"}}this.getUserLine()},chart2_range(a){switch(a){case"yesterday":this.chart2_time={start:r().subtract(1,"days").format("YYYY-MM-DD 00:00:00"),end:r().subtract(1,"days").format("YYYY-MM-DD 23:59:59")};break;case"week":this.chart2_time={start:r().subtract(6,"days").format("YYYY-MM-DD 00:00:00"),end:r().format("YYYY-MM-DD 23:59:59")};break;case"month":this.chart2_time={start:r().subtract(1,"months").format("YYYY-MM-DD 00:00:00"),end:r().format("YYYY-MM-DD 23:59:59")};break;default:this.chart2_time={start:"2000-01-01 00:00:00",end:"2099-12-31 23:59:59"}}this.getTransactionBar()}},methods:{getUserLine(){let a=document.getElementById("chart1");a.removeAttribute("_echarts_instance_");let e=y(a),n={tooltip:{trigger:"axis"},xAxis:{data:[]},yAxis:{},series:[{name:"new user",type:"line",data:[]}]};e.setOption(n),b(this.chart1_time).then(i=>{i.code===200&&(this.today_new_user=i.data.today_new_user,this.today_new_transaction=i.data.today_new_transaction,this.all_user=i.data.all_user,n.xAxis.data=i.data.list.map(t=>t.k),n.series[0].data=i.data.list.map(t=>t.v)),e.setOption(n)})},getTransactionBar(){let a=document.getElementById("chart2");console.log(a),a.removeAttribute("_echarts_instance_");let e=y(a),n={tooltip:{trigger:"axis"},xAxis:{type:"category",data:[]},yAxis:{type:"value"},series:[{name:"transition",data:[],type:"bar"}]};e.setOption(n),x(this.chart2_time).then(i=>{i.code===200&&(n.xAxis.data=i.data.list.map(t=>t.k),n.series[0].data=i.data.list.map(t=>t.v)),e.setOption(n)})}}},o=a=>(g("data-v-eabfbd9f"),a=a(),k(),a),D={class:"echart-container"},w={class:"echart-item"},A={class:"title"},C=o(()=>s("div",{class:"left"}," New user statistics ",-1)),B={class:"right"},T=o(()=>s("hr",{class:"hr"},null,-1)),I={class:"descr"},L={class:"descr-item"},O=o(()=>s("div",{class:"descr-title"}," Today New User ",-1)),N={class:"descr-value"},U={class:"descr-item"},S=o(()=>s("div",{class:"descr-title"}," Today Transition ",-1)),j={class:"descr-value"},E={class:"descr-item"},V=o(()=>s("div",{class:"descr-title"}," All User ",-1)),W={class:"descr-value"},q=o(()=>s("div",{class:"echart-canvas",id:"chart1"},null,-1)),z={class:"echart-item"},F={class:"title"},G=o(()=>s("div",{class:"left"}," Transaction transfer statistics ",-1)),H={class:"right"},J=o(()=>s("hr",{class:"hr"},null,-1)),K=o(()=>s("div",{class:"echart-canvas",id:"chart2"},null,-1));function P(a,e,n,i,t,Q){const c=v("el-tag");return Y(),u("div",D,[s("div",w,[s("div",A,[C,s("div",B,[l(c,{class:"fix-hover",type:t.chart1_range==="all"?"primary":"info",onClick:e[0]||(e[0]=h=>t.chart1_range="all")},{default:d(()=>[_("All ")]),_:1},8,["type"]),l(c,{class:"fix-hover",type:t.chart1_range==="yesterday"?"primary":"info",onClick:e[1]||(e[1]=h=>t.chart1_range="yesterday")},{default:d(()=>[_("Yesterday ")]),_:1},8,["type"]),l(c,{class:"fix-hover",type:t.chart1_range==="week"?"primary":"info",onClick:e[2]||(e[2]=h=>t.chart1_range="week")},{default:d(()=>[_("Week ")]),_:1},8,["type"]),l(c,{class:"fix-hover",type:t.chart1_range==="month"?"primary":"info",onClick:e[3]||(e[3]=h=>t.chart1_range="month")},{default:d(()=>[_("Month ")]),_:1},8,["type"])])]),T,s("div",I,[s("div",L,[O,s("div",N,m(t.today_new_user),1)]),s("div",U,[S,s("div",j,m(t.today_new_transaction),1)]),s("div",E,[V,s("div",W,m(t.all_user),1)])]),q]),s("div",z,[s("div",F,[G,s("div",H,[l(c,{class:"fix-hover",type:t.chart2_range==="all"?"primary":"info",onClick:e[4]||(e[4]=h=>t.chart2_range="all")},{default:d(()=>[_("All ")]),_:1},8,["type"]),l(c,{class:"fix-hover",type:t.chart2_range==="yesterday"?"primary":"info",onClick:e[5]||(e[5]=h=>t.chart2_range="yesterday")},{default:d(()=>[_(" Yesterday ")]),_:1},8,["type"]),l(c,{class:"fix-hover",type:t.chart2_range==="week"?"primary":"info",onClick:e[6]||(e[6]=h=>t.chart2_range="week")},{default:d(()=>[_("Week ")]),_:1},8,["type"]),l(c,{class:"fix-hover",type:t.chart2_range==="month"?"primary":"info",onClick:e[7]||(e[7]=h=>t.chart2_range="month")},{default:d(()=>[_("Month ")]),_:1},8,["type"])])]),J,K])])}const tt=f(M,[["render",P],["__scopeId","data-v-eabfbd9f"]]);export{tt as default};