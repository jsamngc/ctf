(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"1iKp":function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=(0,l(a("8/g6")).default)(n.default.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");t.default=r},"5VNW":function(e,t,a){"use strict";a.r(t);var l=a("q1tI"),n=a.n(l),r=a("Wbzz"),o=a("wd/R"),c=a.n(o),i=a("KEox"),m=a("Weur"),s=a("BMxC"),d=a("eJLp"),u=a("ggNy"),f=a("soUV"),p=a("XZ7F"),E=a("pVnL"),b=a.n(E),h=n.a.forwardRef((function(e,t){return n.a.createElement(s.a,b()({ref:t,as:"p",fontFamily:"body"},e))}));h.displayName="Text";var v=h,g=a("+Cyc"),x=a("7ncI"),y=a("wfq5"),w=a("ZuSV"),O=a.n(w),C=a("r2we"),j=a.n(C),k=a("O3kt"),L=a.n(k),D=a("y9eO"),S=a.n(D),M=a("MG/1"),z=a.n(M),B=a("mYdW"),T=a.n(B),q=a("1iKp"),P=a.n(q),_=a("ZMKu"),I=_.b.custom(s.a),R=function(e){var t=e.lklData,a=Object(l.useState)(!0),r=a[0],o=a[1],c=Object(l.useState)(!1),d=c[0],f=c[1],E=Object(l.useState)(1),b=E[0],h=E[1],w=Object(p.a)(),C=w.isOpen,k=w.onOpen,D=w.onClose,M=Object(l.useState)(200),B=M[0],q=(M[1],{mr:4,alignSelf:"center",size:"iconPoc",color:"label"}),R={display:"inline-block",py:4,fontWeight:600,fontSize:16,color:"headingLarge"},W=[{label:"Edit Location",value:"Edit",onClick:function(){}},{label:"Remove Location",value:"Delete Location",type:"error",onClick:function(){k()}}],N=t.lookupLklDto,K=N.lklTitle,V=N.locationDesc,U=N.lklAddressDto,H=N.lklPocListDto,Z=U.addressDto,A=Z.address1,F=Z.address2,G=Z.city,X=Z.postalCode,J=Z.countryCd,Y=A+" "+F+", "+G+", "+X+", "+J,Q=[];return H.map((function(e){var t={fullName:"",phone:"",email:""},a=e.personDto,l=a.givenName,n=a.surName,r=a.personEmailDtoList,o=a.personPhoneDtoList;t.fullName=l+" "+n,t.phone=o[0].phoneDto.phoneNum,t.email=r[0].emailDto.emailAddress,Q.push(t)})),n.a.createElement(s.a,{mb:{base:"16",md:"24"}},n.a.createElement(u.d,{id:"lklCard",maxWidth:"full"},n.a.createElement(m.a,{flexDir:{base:"column",xl:"row"},w:"full",mt:{base:"-8px",sm:"-16px"}},n.a.createElement(s.a,{flexBasis:{xl:"65%"}},n.a.createElement(u.u,null,K)),n.a.createElement(s.a,{mb:4,flexBasis:{xl:"35%"}},n.a.createElement(u.h,{color:"label"},"U.S. Embassy in ",G,", ",J))),n.a.createElement(s.a,{position:"absolute",color:"secondary",top:{base:"-8px",sm:"-16px"},right:{base:"-12px",sm:"-20px",md:"-12px"}},n.a.createElement(x.a,{options:W,borderedRows:!0,width:"10rem"},n.a.createElement(s.a,{w:"120px",right:"0",textAlign:"right",color:"clickable"},n.a.createElement(O.a,null))),n.a.createElement(y.a,{isOpen:C,onCancel:D,onConfirm:function(){D()}})),n.a.createElement(m.a,{mt:8,mb:-12},n.a.createElement(s.a,{display:"inline-flex",cursor:"pointer",onClick:function(){f(!d)},color:"clickable"},n.a.createElement(v,{my:0,fontSize:16},"Details"),d?n.a.createElement(T.a,null):n.a.createElement(P.a,null))),d?n.a.createElement(s.a,{position:"relative",h:B,overflow:"hidden"},n.a.createElement(i.a,{borderColor:"silver",my:16}),n.a.createElement(s.a,{display:{xl:"none"}},n.a.createElement(m.a,{mb:16},n.a.createElement(g.a,Object.assign({},R,{borderWidth:0,borderBottom:r?3:0,borderBottomColor:"accent",borderStyle:"solid",color:"headingSmall",_hover:r?{}:{color:"clickable",borderBottomColor:"clickable",borderBottom:"3px",borderStyle:"solid"},onClick:function(){h(-1),o(!0)},mr:8}),n.a.createElement(v,{fontFamily:"headingSmall",margin:0,fontSize:"h4",fontWeight:"h4",lineHeight:"h4"},"Location")),n.a.createElement(s.a,{mx:8}),n.a.createElement(g.a,Object.assign({},R,{borderWidth:0,borderBottom:r?0:3,borderBottomColor:"accent",borderStyle:"solid",color:"headingSmall",_hover:r?{color:"clickable",borderBottomColor:"clickable",borderBottom:"3px",borderStyle:"solid"}:{},onClick:function(){h(1),o(!1)}}),n.a.createElement(v,{fontFamily:"headingSmall",margin:0,fontSize:"h4",fontWeight:"h4",lineHeight:"h4"},"Point of Contact"))),n.a.createElement(_.a,{custom:b,initial:!1},n.a.createElement(I,{position:"absolute",key:b,initial:{transform:"translateX("+(b<0?"-100%":"100%")+")"},transition:{type:"tween",duration:.5,ease:"easeInOut"},animate:{transform:"translateX(0%)"},exit:function(e){return{transform:"translateX("+(e<0?"100%":"-100%")+")"}},width:"100%"},r?n.a.createElement(s.a,null,n.a.createElement(m.a,{mb:12},n.a.createElement(s.a,Object.assign({as:j.a},q)),n.a.createElement(u.h,null,Y)),n.a.createElement(s.a,{py:4},n.a.createElement(u.h,{color:"label"},"Description")),n.a.createElement(s.a,null,n.a.createElement(u.h,null,V))):n.a.createElement(s.a,null,Q.map((function(e,t){return n.a.createElement(m.a,{key:t,flexDir:{base:"column",md:"row"},border:1,borderStyle:"solid",borderColor:"silver",px:8,justifyContent:"space-around"},n.a.createElement(m.a,{py:4},n.a.createElement(s.a,Object.assign({as:L.a},q)),n.a.createElement(u.h,null,e.fullName)),n.a.createElement(m.a,{py:4},n.a.createElement(s.a,Object.assign({as:S.a},q)),n.a.createElement(u.h,null,e.email)),n.a.createElement(m.a,{py:4},n.a.createElement(s.a,Object.assign({as:z.a},q)),n.a.createElement(u.h,null,e.phone)))})))))),n.a.createElement(m.a,{display:{base:"none",xl:"flex"}},n.a.createElement(s.a,{flexBasis:{xl:"63%"}},n.a.createElement(s.a,{pb:16},n.a.createElement(u.m,null,"Location")),n.a.createElement(m.a,{mb:12},n.a.createElement(s.a,Object.assign({as:j.a},q)),n.a.createElement(u.h,null,Y)),n.a.createElement(s.a,{py:4},n.a.createElement(u.h,{color:"label"},"Description")),n.a.createElement(s.a,null,n.a.createElement(u.h,null,V))),n.a.createElement(i.a,{orientation:"vertical",flexBasis:{xl:"2%"},color:"silver"}),n.a.createElement(s.a,{flexBasis:{xl:"35%"}},n.a.createElement(s.a,{pb:16},n.a.createElement(u.m,null,"Point of Contact")),Q.map((function(e,t){return n.a.createElement(m.a,{key:t,flexDir:"column",border:1,borderStyle:"solid",borderColor:"silver",px:8,justifyContent:"space-around",flexWrap:"wrap"},n.a.createElement(m.a,{py:4},n.a.createElement(s.a,Object.assign({as:L.a},q)),n.a.createElement(u.h,null,e.fullName)),n.a.createElement(m.a,{py:4},n.a.createElement(s.a,Object.assign({as:S.a},q)),n.a.createElement(u.h,null,e.email)),n.a.createElement(m.a,{py:4},n.a.createElement(s.a,Object.assign({as:z.a},q)),n.a.createElement(u.h,null,e.phone)))}))))):null))},W=a("xP3E"),N=a("l1im"),K=a("1waj"),V=a.n(K),U=u.c+" HH:mm:ss:SS ZZ";t.default=function(){var e=W[0],t=e.eventLklDtoList.map((function(e){return Object.assign({},e,{createdDateTime:c()(e.createdDateTime,U).toDate(),lastUpdatedDateTime:c()(e.lastUpdatedDateTime,U).toDate()})})),a=Object(l.useState)(1),o=a[0],p=a[1],E=Object(l.useState)(10),b=E[0],h=(E[1],Object(l.useState)(!0)),v=h[0];h[1];t.sort((function(e,t){var a,l,n=null!==(a=e.lastUpdatedDateTime)&&void 0!==a?a:new Date,r=null!==(l=t.lastUpdatedDateTime)&&void 0!==l?l:new Date;return n>r?-1:n<r?1:0}));var g=t.filter((function(e){return!v||e.activeIndicator})),x=Math.ceil(g.length/b);o>x&&p(x);var y=o*b,w=y-b,O=g.length>b?Math.ceil(g.length/b):1,C=1!==O?g.slice(w,y):g;return n.a.createElement(f.a,{pageTitle:"Last Known Location",pageHeading:e.eventTitle},n.a.createElement(i.a,{width:"100%",gridColumn:{base:"1 / -1"},borderColor:"silver"}),n.a.createElement(m.a,{gridColumn:{base:"1 / -1"},direction:"column"},n.a.createElement(m.a,{gridColumn:{base:"1 / -1",md:"1 / 5",lg:"1 / 8",xl:"1 / 9"},direction:"row",wrap:"wrap",justify:"flex-end",mb:8},n.a.createElement(s.a,{flexGrow:1,"aria-label":"Last Known Locations"},n.a.createElement(u.l,null,"Last Known Locations")),n.a.createElement(s.a,{bottom:"16px",zIndex:2,right:"16px",position:"fixed",display:{md:"none"}},n.a.createElement(d.a,{borderColor:"transparent",boxShadow:"0 6px 6px 0 rgba(0, 0, 0, 0.4)",color:"white",height:"40px",width:"40px",rounded:"round",bg:"clickable",cursor:"pointer",_hover:{bg:"secondary"},onClick:function(){return Object(r.b)("/event")}},n.a.createElement(V.a,null))),n.a.createElement(m.a,{display:{base:"none",md:"flex"},alignItems:"center"},n.a.createElement(s.a,{as:V.a,alignSelf:"center",size:"iconPoc",color:"lochmara",mx:8,h:16}),n.a.createElement(u.n,{onClick:function(){Object(r.b)("/")}},"Add Location"))),n.a.createElement(m.a,{gridColumn:{base:"1 / -1",md:"1 / 5",lg:"1 / 8",xl:"1 / 9"},direction:"row",wrap:"wrap",justify:"flex-end"},n.a.createElement(s.a,{flexGrow:1,mb:20},n.a.createElement(u.u,null,"Manage the last known locations for U.S. citizens involved in this crisis"))),C.map((function(e,t){return n.a.createElement(R,{key:t,lklData:e})})),n.a.createElement(m.a,{gridColumn:"1 / -1",justify:"center"},n.a.createElement(u.u,null,"Total Locations: ",t.length),n.a.createElement(N.a,{page:o,count:O,onChange:function(e,t){return p(t)},showLastButton:!0,size:"small"}),n.a.createElement("select",null,n.a.createElement("option",{value:"10"},"10"),n.a.createElement("option",{value:"20"},"20")))))}},KEox:function(e,t,a){"use strict";var l=a("pVnL"),n=a.n(l),r=a("8OQS"),o=a.n(r),c=a("qKvR"),i=a("BMxC"),m=a("q1tI"),s=Object(m.forwardRef)((function(e,t){var a=e.orientation,l=o()(e,["orientation"]),r="vertical"===a?{borderLeft:"0.0625rem solid",height:"auto",mx:2}:{borderBottom:"0.0625rem solid",width:"auto",my:2};return Object(c.d)(i.a,n()({ref:t,as:"hr","aria-orientation":a,border:"0",opacity:"0.6"},r,{borderColor:"inherit"},l))}));t.a=s},"MG/1":function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=(0,l(a("8/g6")).default)(n.default.createElement("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"}),"Phone");t.default=r},O3kt:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=(0,l(a("8/g6")).default)(n.default.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");t.default=r},mYdW:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=(0,l(a("8/g6")).default)(n.default.createElement("path",{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess");t.default=r},r2we:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=(0,l(a("8/g6")).default)(n.default.createElement("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"}),"LocationOn");t.default=r},y9eO:function(e,t,a){"use strict";var l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("q1tI")),r=(0,l(a("8/g6")).default)(n.default.createElement("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}),"Email");t.default=r}}]);
//# sourceMappingURL=component---src-pages-lkl-list-tsx-1b9d402d00b9d56c7334.js.map