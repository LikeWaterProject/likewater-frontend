(this.webpackJsonplikewater=this.webpackJsonplikewater||[]).push([[6],{432:function(e,t,n){"use strict";n.r(t);var a=n(43),l=n.n(a),o=n(81),c=n(80),r=n(0),i=n.n(r),s=n(50),u=n(410),v=n(375),d=n(409),m=n(434),p=n(82),f=n(180),E=n(85);t.default=Object(s.b)((function(e){return{map:e.map}}),{})((function(e){var t=e.map;console.log(t);var n=t.currentPosition,a=Object(r.useState)(),s=Object(c.a)(a,2),b=s[0],g=s[1];return console.log(b),Object(r.useEffect)((function(){(function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.post("/vieweventdetails",{eventId:"D0B83D0C-0C96-46F5-8313-40FA9C6AA1D6"},{crossDomain:!0});case 3:t=e.sent,console.log(t),g(Object(f.a)([t.data])[0]),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}})()()}),[]),console.log(n,null===b||void 0===b?void 0:b.coordinates),n&&console.log("".concat(Object(u.getDistance)(null===b||void 0===b?void 0:b.coordinates,{lon:n[0],lat:n[1]}),"m")),i.a.createElement(v.a,{raised:!0,inverted:!0,style:{padding:16}},b?i.a.createElement(i.a.Fragment,null,i.a.createElement(d.a,{inverted:!0,as:"h3"},null===b||void 0===b?void 0:b.eventType),i.a.createElement(m.a,null,i.a.createElement(m.a.Image,null," ",i.a.createElement("i",{className:"ri-".concat(null===b||void 0===b?void 0:b.icon,"-fill ri-xl"),style:{color:null===b||void 0===b?void 0:b.color}})),i.a.createElement(m.a.Content,null,i.a.createElement(m.a.Meta,null,null===b||void 0===b?void 0:b.eventDesc),i.a.createElement(m.a.Description,null,n&&"".concat(Object(u.getDistance)(null===b||void 0===b?void 0:b.coordinates,{lon:n[0],lat:n[1]}),"m")),i.a.createElement(m.a.Extra,null,new Date(parseInt(null===b||void 0===b?void 0:b.reportedDt)).toISOString())))):i.a.createElement(E.a,null))}))}}]);
//# sourceMappingURL=6.50d1a2a8.chunk.js.map