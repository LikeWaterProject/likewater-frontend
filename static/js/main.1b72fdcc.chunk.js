(this.webpackJsonplikewater=this.webpackJsonplikewater||[]).push([[1],{116:function(e,t,n){"use strict";var a=n(0),o=n.n(a),r=n(393),i=n(391);t.a=function(){return o.a.createElement(r.a,{raised:!0,inverted:!0,style:{padding:8,height:292}},o.a.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center"}},o.a.createElement(i.a,{active:!0,inline:"centered"})))}},131:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return l}));var a=n(0),o=function(e){(function(e){return!!e.touches})(e)&&e.touches.length>1&&e.preventDefault&&e.preventDefault&&e.preventDefault()},r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.isPreventDefault,r=void 0===n||n,i=t.delay,c=void 0===i?500:i,l=Object(a.useRef)(),s=Object(a.useRef)(),u=Object(a.useCallback)((function(t,n){var a=n.originalEvent;r&&a.target&&(a.target.addEventListener("touchend",o,{passive:!1}),s.current=a.target),a.touches.length<2&&(l.current=setTimeout((function(){e(t,n)}),c))}),[e,c]),d=Object(a.useCallback)((function(e,t){l.current&&clearTimeout(l.current),r&&s.current&&s.current.removeEventListener("touchend",o)}),[]);return{onTouchStart:u,onTouchEnd:d}},i=n(21),c=function(e){return e.map((function(e){var t=e.eventId,n=e.eventType,a=e.eventDesc,o=e.coordinates,r=e.reportedDt;return Object(i.a)({eventId:t,eventType:n,coordinates:o,eventDesc:a,reportedDt:r},function(e){switch(e){case"aid":return{icon:"first-aid-kit",color:"gainsboro"};case"emergency":return{icon:"lifebuoy",color:"crimson"};case"info":return{icon:"broadcast",color:"mediumseagreen"};case"police":return{icon:"alarm-warning",color:"royalblue"};case"safety":return{icon:"fire",color:"darkorange"};default:return{icon:"pushpin-2",color:"mediumpurple"}}}(n))}))},l=function(e){return Object(a.useMemo)((function(){return c(e)}),[e])}},189:function(e,t,n){e.exports=n.p+"static/media/pushpin-2-fill.466aaf39.svg"},190:function(e,t,n){e.exports=n.p+"static/media/alarm-warning-fill.129f3113.svg"},191:function(e,t,n){e.exports=n.p+"static/media/fire-fill.feb2802d.svg"},192:function(e,t,n){e.exports=n.p+"static/media/first-aid-kit-fill.f96d703e.svg"},193:function(e,t,n){e.exports=n.p+"static/media/broadcast-fill.d068d7ab.svg"},194:function(e,t,n){e.exports=n.p+"static/media/focus-3-line.ec68912f.svg"},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"e",(function(){return r})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"g",(function(){return s})),n.d(t,"i",(function(){return p})),n.d(t,"k",(function(){return v})),n.d(t,"j",(function(){return b})),n.d(t,"l",(function(){return g})),n.d(t,"h",(function(){return h}));var a="fetch_events",o="fetch_event_details",r="update_event_filter",i="update_default_position",c="set_current_position",l="set_marker_position",s="set_use_geolocation",u=n(28),d=n.n(u),m=n(44),f=n(86),p=function(e){return function(){var t=Object(m.a)(d.a.mark((function t(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.post("/submitreport",e);case 2:t.sent,n({type:null});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},v=function(e){return{type:l,payload:e}},b=function(e){return{type:c,payload:e}},g=function(e){return function(){var t=Object(m.a)(d.a.mark((function t(n){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return localStorage.setItem(s,JSON.stringify(e)),t.next=3,navigator.permissions.query({name:"geolocation"});case 3:a=t.sent,a.state,n({type:s,payload:e}),e||n(b(null));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},h=function(){return function(){var e=Object(m.a)(d.a.mark((function e(t,n){var a,o,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=null!==(a=JSON.parse(localStorage.getItem(s)))&&void 0!==a&&a,navigator.permissions.query({name:"geolocation"}).then((function(e){r=e.state,e.onchange=function(e){var a=e.target.state;t({type:s,payload:n().map.shouldUseGeolocation&&"granted"===a})}})),t({type:s,payload:o&&"granted"===r});case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}},228:function(e,t,n){e.exports=n(390)},239:function(e,t,n){},390:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(31),i=n.n(r),c=n(33),l=n(71),s=(n(237),n(238),n(239),n(51)),u=n(404),d=n(20),m=n(400),f=Object(c.b)(null,{setCurrentPosition:d.j})((function(e){var t=e.setCurrentPosition,n=Object(m.a)({enableHighAccuracy:!0,maximumAge:3e4,timeout:3e4});return Object(a.useEffect)((function(){var e=!0;return!n.loading&&n.longitude&&e&&t(n),function(){return e=!1}}),[n]),null})),p=n(16),v=n(403),b=n(22),g=n(131),h=n(189),E=n.n(h),y=n(190),k=n.n(y),O=n(191),j=n.n(O),w=n(192),x=n.n(w),C=n(193),D=n.n(C),I=n(194),P=n.n(I),S=n(392),T=Object(c.b)((function(e){return{shouldUseGeolocation:e.map.shouldUseGeolocation}}),{setUseGeolocation:d.l})((function(e){var t=e.context,n=e.shouldUseGeolocation,a=e.setUseGeolocation;return o.a.createElement("div",null,o.a.createElement(S.a,{icon:"location arrow",color:"black",style:{position:"absolute",top:98,right:3},onClick:function(){t.rotateTo(0)}}),o.a.createElement(S.a.Group,{vertical:!0,style:{position:"absolute",top:142,right:6}},o.a.createElement(S.a,{color:"black",icon:"plus",onClick:function(){t.zoomIn()}}),o.a.createElement(S.a,{color:"black",icon:"minus",onClick:function(){t.zoomOut()}})),o.a.createElement(S.a,{color:n?"blue":"black",icon:"crosshairs",style:{position:"absolute",top:222,right:3},onClick:function(){a(!n)}}))})),_=Object(b.e)({accessToken:"pk.eyJ1IjoicmVrdGRlY2thcmQiLCJhIjoiY2theWJ4OXM0MGhiejJ3cnkzcmk0andiYyJ9.IinlG0vyUvcWhvlAREJXeA",attributionControl:!1}),A=new Image(24,24);A.src=E.a;var U=new Image(24,24);U.src=k.a;var M=new Image(24,24);M.src=j.a;var B=new Image(24,24);B.src=x.a;var F=new Image(24,24);F.src=D.a;var G=new Image(24,24);G.src=P.a;var z,J={defaultZoom:[10],volumetricPainter:{"fill-extrusion-color":"#424d5c","fill-extrusion-height":{type:"identity",property:"height"},"fill-extrusion-base":{type:"identity",property:"min_height"},"fill-extrusion-opacity":.6}},L=[{eventId:"0B479F98-12D1-49C5-9A5A-28E8BAC9E420",eventType:"police",eventDesc:"Beating at 12th and Lexington",userToken:"User98765",reportedDt:1592356915877,confirms:3,dismisses:1,coordinates:{lat:41,lon:-74}},{eventId:"0FF83A5F-EA8F-462C-AD8E-81BB704ED4FC",eventType:"aid",eventDesc:"Water bottles and eye-wash station",userToken:"User1111",reportedDt:1592430145773,confirms:0,dismisses:0,coordinates:{lat:40.6911,lon:-74.00348}},{eventId:"582276B6-65C8-4FAE-B7D6-27CD1F9EB19D",eventType:"info",userToken:"User1111",eventDesc:"Rally Point",reportedDt:1592356992014,confirms:3,dismisses:1,coordinates:{lat:40.695103,lon:-73.984165}},{eventId:"04E9E828-EFF3-4144-A875-39AC87179B66",eventType:"info",userToken:"User123456",eventDesc:"Extra Masks",reportedDt:1592430500012,confirms:3,dismisses:1,coordinates:{lat:40.694794,lon:-73.981783}},{eventId:"F176598B-A4E1-4E14-A3A3-6C0E2AAED664",eventType:"safety",userToken:"User123456",eventDesc:"Looting",reportedDt:1592430500012,confirms:2,dismisses:0,coordinates:{lat:40.693257,lon:-73.983478}}],N=Object(c.b)((function(e){return{map:e.map}}),{setMarkerPosition:d.k})((function(e){e.onMoveEnd;var t=e.toggleControls,n=e.map,r=e.setMarkerPosition,i=Object(p.f)(),c=Object(v.a)(),l=c.width,s=c.height,u=n.currentPosition,d=n.defaultPosition,m=n.markerPosition,f=n.showVolumetricBuildings,h=(n.showBasicMapFeatures,function(e,t){e.map.getCanvas().style.cursor=t}),E=Object(a.useCallback)((function(e){var n=e.map,a=e.feature.properties,o=a.eventId,r=a.coordinates;e.originalEvent.preventDefault();var c=JSON.parse(r),l=c.lon,s=c.lat;n.flyTo({center:[l,s],zoom:16}),t(!0),i.push("/events/".concat(o))}),[i,t]),y=Object(a.useMemo)((function(){return{onMouseEnter:function(e){return h(e,"pointer")},onMouseLeave:function(e){return h(e,"")},onClick:E}}),[E]),k=function(e,n){if(!(e.isMoving()||e.isRotating()||e.isZooming())){var a=n.lngLat,o=a.lat,c=a.lng;t(!0),r([c,o]),e.flyTo({center:[c,o],zoom:16}),i.push("/submit")}},O=Object(g.c)(k,{isPreventDefault:!0,delay:500});return o.a.createElement(_,Object.assign({style:"mapbox://styles/rektdeckard/ckayd52rb0xzg1imcbyek0g4y",containerStyle:{width:l,height:s},center:u?[u.longitude,u.latitude]:d,zoom:J.defaultZoom,onStyleLoad:function(e){e.on("click",(function(e){e.originalEvent.defaultPrevented||(r(null),i.push("/"))}))},onContextMenu:k},O),o.a.createElement(b.b,{id:"police",data:U}),o.a.createElement(b.b,{id:"pin",data:A}),o.a.createElement(b.b,{id:"fire",data:M}),o.a.createElement(b.b,{id:"medical",data:B}),o.a.createElement(b.b,{id:"info",data:F}),o.a.createElement(b.b,{id:"position",data:G}),o.a.createElement(b.d.Consumer,null,(function(e){return o.a.createElement(T,{context:e})})),f&&o.a.createElement(b.c,{id:"3d-buildings",type:"fill-extrusion",sourceId:"composite",sourceLayer:"building",filter:["==","extrude","true"],minZoom:14,paint:J.volumetricPainter}),m&&o.a.createElement(b.c,{id:"map-marker",type:"symbol",layout:{"icon-image":"pin","icon-anchor":"bottom","icon-allow-overlap":!0}},o.a.createElement(b.a,{coordinates:m})),o.a.createElement(b.c,{id:"event-markers",type:"symbol",layout:{"icon-image":"info","icon-allow-overlap":!0}},L.map((function(e){var t=e.eventId,n=e.coordinates,a=n.lon,r=n.lat;return o.a.createElement(b.a,Object.assign({key:t,coordinates:[a,r],properties:e},y))}))),u&&o.a.createElement(b.c,{id:"location-marker",type:"symbol",layout:{"icon-image":"position","icon-allow-overlap":!0}},o.a.createElement(b.a,{coordinates:[u.longitude,u.latitude],properties:u})))})),R=n(393),W=n(406),V=n(405),X=function(e){e.visible;var t=e.toggleControls,n=Object(a.useState)(""),r=Object(s.a)(n,2),i=r[0],c=r[1];return o.a.createElement(u.a,{as:R.a,inverted:!0,raised:!0,direction:"top",animation:"push",textAlign:"center",visible:!0,style:{padding:4}},o.a.createElement(W.a,{inverted:!0,borderless:!0,widths:3},o.a.createElement(W.a.Item,null," "),o.a.createElement(W.a.Item,{fitted:!0},o.a.createElement(V.a,{disabled:!0,value:i,onSearchChange:function(e,t){var n=t.value;return c(n)},onFocus:function(){return t(!1)},onBlur:function(){return t(!0)},open:!1})),o.a.createElement(W.a.Menu,{position:"right"},o.a.createElement(W.a.Item,null,o.a.createElement(S.a,{circular:!0,size:"large",color:"black",icon:"setting",floated:"right"})))))},Z=n(116),Y=o.a.createElement(Z.a,null),q=o.a.lazy((function(){return Promise.all([n.e(0),n.e(5),n.e(7)]).then(n.bind(null,482))})),H=o.a.lazy((function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,486))})),Q=o.a.lazy((function(){return Promise.all([n.e(4),n.e(8)]).then(n.bind(null,483))})),$=Object(p.h)((function(e){var t=e.visible;return o.a.createElement(u.a,{className:"no-overflow unclickable",animation:"push",direction:"bottom",visible:t,style:{boxShadow:"none"}},o.a.createElement("div",{style:{textAlign:"right"}},o.a.createElement(S.a,{className:"clickable",circular:!0,compact:!0,color:"black",size:"huge",icon:"bullhorn",onClick:function(){return window.confirm("Send SOS?")}})),o.a.createElement(p.c,null,o.a.createElement(p.a,{path:"/events/:id"},o.a.createElement(a.Suspense,{fallback:Y},o.a.createElement(H,null))),o.a.createElement(p.a,{exact:!0,path:"/submit"},o.a.createElement(a.Suspense,{fallback:Y},o.a.createElement(Q,null))),o.a.createElement(p.a,{exact:!0,path:"/sos"},o.a.createElement(Z.a,null)),o.a.createElement(p.a,null,o.a.createElement(a.Suspense,{fallback:Y},o.a.createElement(q,null)))))})),K=Object(c.b)((function(e){return{shouldUseGeolocation:e.map.shouldUseGeolocation}}),{initializeGeolocation:d.h})((function(e){var t=e.shouldUseGeolocation,n=e.initializeGeolocation,r=Object(a.useState)(!0),i=Object(s.a)(r,2),c=i[0],l=i[1];Object(a.useEffect)((function(){n()}),[]);var d=function(e){if("boolean"===typeof e)return l(e);l((function(e){return!e}))};return o.a.createElement(o.a.Fragment,null,t&&o.a.createElement(f,null),o.a.createElement(u.a.Pushable,{className:"no-overflow"},o.a.createElement(X,{visible:c,toggleControls:d}),o.a.createElement($,{visible:c}),o.a.createElement(u.a.Pusher,null,o.a.createElement(N,{onMoveEnd:function(e){var t=e.getCenter();t.lng,t.lat},toggleControls:d,onContextMenu:function(e){console.log(e)}}))))})),ee=n(46),te=n(203),ne=n(21),ae={dangerClose:!1,nearbyEvents:[],eventFilter:[]},oe={markerPosition:null,currentPosition:null,defaultPosition:null!==(z=JSON.parse(localStorage.getItem(d.d)))&&void 0!==z?z:[-74,40.73],shouldUseGeolocation:!1,showBasicMapFeatures:!0,showVolumetricBuildings:!0},re=Object(ee.c)({events:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case d.a:return Object(ne.a)(Object(ne.a)({},e),{},{nearbyEvents:a});case d.e:return Object(ne.a)(Object(ne.a)({},e),{},{eventFilter:a});default:return e}},map:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case d.f:return Object(ne.a)(Object(ne.a)({},e),{},{markerPosition:a});case d.c:return Object(ne.a)(Object(ne.a)({},e),{},{currentPosition:a});case d.d:return Object(ne.a)(Object(ne.a)({},e),{},{defaultPosition:a});case d.g:return Object(ne.a)(Object(ne.a)({},e),{},{shouldUseGeolocation:a});default:return e}}}),ie=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ee.d,ce=Object(ee.e)(re,{},ie(Object(ee.a)(te.a)));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(c.a,{store:ce},o.a.createElement(l.a,null,o.a.createElement(K,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,n){"use strict";var a=n(188),o=n.n(a).a.create({baseURL:"https://likewater-internal.azurewebsites.net/api"});t.a=o}},[[228,2,3]]]);
//# sourceMappingURL=main.1b72fdcc.chunk.js.map