import{a as F}from"./user.3dcdea04.js";import{_ as V}from"./bg.79b7f3df.js";import{_ as z}from"./logo.0d68fd68.js";import{_ as k,c,w as R,d as o,e as m,m as x,z as U,F as E,f as n,g as A,o as u,b as l,j as g,p as S,k as Z}from"./index.1a21de82.js";import{s as i}from"./function-call.e575ea11.js";import"./request.58213615.js";const q={name:"Login",setup(){return{validatePassword:e=>{if(e.length<8)return"Password should be at least 8 characters long";if(!/[A-Z]/.test(e)||!/[a-z]/.test(e))return"Password should contain at least one uppercase letter and one lowercase letter";if(!/[^\w\s]/.test(e))return"Password should contain one special character (@ or !)"},validateEmail:e=>{if(e){if(e.length<8)return"Email should be at least 8 characters long";if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e))return"Please enter a valid email address"}else return"Please enter your email"},validatePhone:e=>{if(e){if(e.length<8)return"Phone should be at least 8 characters long"}else return"Please enter your phone"}}},data(){return{loading:!1,registerForm:{username:"",password:""}}},methods:{handleRegister(){if(this.loading=!0,this.registerForm.password!==this.registerForm.repeatpassword){this.loading=!1,i({type:"danger",message:"The password entered twice is inconsistent!"});return}if(this.registerForm.password.length<8){this.loading=!1,i({type:"danger",message:"The password can not be less than 8 digits!"});return}if(!/[A-Z]/.test(this.registerForm.password)||!/[a-z]/.test(this.registerForm.password)){this.loading=!1,i({type:"danger",message:"The password must contain at least one uppercase letter and one lowercase letter!"});return}if(!/[^\w\s]/.test(this.registerForm.password)){this.loading=!1,i({type:"danger",message:"The password must contain at least one lowercase letter and one special character (@ or !)!"});return}F(this.registerForm).then(a=>{console.log(a),this.loading=!1,a.code===200?i({type:"success",message:"Register successful!"}):i({type:"danger",message:a.msg})}).catch(a=>{})}}},p=a=>(S("data-v-b2fc013a"),a=a(),Z(),a),N=p(()=>l("video",{src:V,class:"bg-video",muted:"",loop:"",autoplay:""},null,-1)),T={"element-loading-text":"loading...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.6)",class:"login-container"},B=p(()=>l("div",{class:"title-container"},[l("img",{class:"logo-img",src:z}),l("h5",null,"Unlocking the Future of Digital Wealth")],-1)),I=p(()=>l("div",{class:"title-container"},[l("h3",{class:"title"},"Sign up")],-1)),C={style:{margin:"16px"}},D={class:"register"};function L(a,t,h,e,s,_){const d=n("van-field"),f=n("van-cell-group"),w=n("van-button"),v=n("router-link"),P=n("van-form"),b=n("van-loading"),y=A("loading");return u(),c(E,null,[N,R((u(),c("div",T,[o(P,{onSubmit:_.handleRegister,class:"m-login-form"},{default:m(()=>[B,I,o(f,{inset:""},{default:m(()=>[o(d,{modelValue:s.registerForm.username,"onUpdate:modelValue":t[0]||(t[0]=r=>s.registerForm.username=r),label:"Username",size:"large",placeholder:"Username",autocomplete:"false",rules:[{required:!0,message:"Please input username"}]},null,8,["modelValue"]),o(d,{modelValue:s.registerForm.password,"onUpdate:modelValue":t[1]||(t[1]=r=>s.registerForm.password=r),type:"password",label:"Password",size:"large",placeholder:"Password",autocomplete:"false",rules:[{required:!0,validator:e.validatePassword,message:"Please input password"}]},null,8,["modelValue","rules"]),o(d,{modelValue:s.registerForm.repeatpassword,"onUpdate:modelValue":t[2]||(t[2]=r=>s.registerForm.repeatpassword=r),type:"password",label:"Repeat",size:"large",placeholder:"Repeat Password",autocomplete:"false",rules:[{required:!0,validator:e.validatePassword,message:"Please Repeat Password"}]},null,8,["modelValue","rules"]),o(d,{modelValue:s.registerForm.email,"onUpdate:modelValue":t[3]||(t[3]=r=>s.registerForm.email=r),type:"email",label:"Email",size:"large",placeholder:"Email",autocomplete:"false",rules:[{required:!0,validator:e.validateEmail,message:"Please input email"}]},null,8,["modelValue","rules"]),o(d,{modelValue:s.registerForm.phone,"onUpdate:modelValue":t[4]||(t[4]=r=>s.registerForm.phone=r),type:"tel",label:"Phone",size:"large",placeholder:"Phone",autocomplete:"false",rules:[{required:!0,validator:e.validatePhone,message:"Please input phone"}]},null,8,["modelValue","rules"])]),_:1}),l("div",C,[o(w,{round:"",block:"",type:"primary","native-type":"submit"},{default:m(()=>[g(" Register ")]),_:1})]),l("div",D,[o(v,{to:"/login"},{default:m(()=>[g("Log in")]),_:1})])]),_:1},8,["onSubmit"])])),[[y,s.loading]]),s.loading?(u(),x(b,{key:0,type:"spinner"})):U("",!0)],64)}const M=k(q,[["render",L],["__scopeId","data-v-b2fc013a"]]);export{M as default};