(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{16:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(15),l=n.n(u),o=n(2),c=n.n(o),i=n(4),s=n(3),p=function(e){var t=e.blog;return r.a.createElement("div",null,t.title," ",t.author)},f=n(5),g=n.n(f),b=function(){return g.a.get("/api/blogs").then((function(e){return e.data}))},m=function(e){"bearer ".concat(e)},v={login:function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},d=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],u=t[1],l=Object(a.useState)(""),o=Object(s.a)(l,2),f=(o[0],o[1],Object(a.useState)(null)),g=Object(s.a)(f,2),d=(g[0],g[1]),O=Object(a.useState)(""),h=Object(s.a)(O,2),j=h[0],w=h[1],E=Object(a.useState)(""),S=Object(s.a)(E,2),k=S[0],y=S[1],x=Object(a.useState)(null),J=Object(s.a)(x,2),B=J[0],I=J[1];Object(a.useEffect)((function(){b().then((function(e){return u(e)}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogger");if(e){var t=JSON.parse(e);I(t),m(t.token)}}),[]);var C=function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("logging with",j,k),e.prev=2,e.next=5,v.login({username:j,password:k});case 5:n=e.sent,window.localStorage.setItem("loggedBlogger",JSON.stringify(n)),m(n.token),I(n),w(""),y(""),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),d("wrong credentials"),setTimeout((function(){d(null)}),5e3);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Keijon pislablogit"),null===B&&r.a.createElement("form",{onSubmit:C},r.a.createElement("div",null,"username",r.a.createElement("input",{type:"text",value:j,name:"Username",onChange:function(e){var t=e.target;return w(t.value)}})),r.a.createElement("div",null,"password",r.a.createElement("input",{type:"password",value:k,name:"Password",onChange:function(e){var t=e.target;return y(t.value)}})),r.a.createElement("button",{type:"submit"},"login")),null!==B&&r.a.createElement("div",null,"placeboholder"),r.a.createElement("h2",null,"blogs"),n.map((function(e){return r.a.createElement(p,{key:e.id,blog:e})})))};l.a.render(r.a.createElement(d,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.4776e483.chunk.js.map