(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"0RaA":function(e,a,t){"use strict";t("91GP");var n=t("q1tI"),l=t.n(n),r=t("BMxC"),o=t("XZ7F"),c=t("Weur"),i=t("sK1y"),m=t("KEox"),s=t("+Cyc"),d=t("ggNy"),u=t("7ncI"),E=t("wfq5"),b=t("N2AM"),p=t("LYUY"),f=Object(p.a)(l.a.createElement("path",{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"}),"ExpandLessSharp"),h=Object(p.a)(l.a.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"}),"ExpandMoreSharp"),x=Object(p.a)(l.a.createElement(l.a.Fragment,null,l.a.createElement("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"})),"LocationOnSharp"),g=Object(p.a)(l.a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"PersonSharp"),v=Object(p.a)(l.a.createElement("path",{d:"M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z"}),"EmailSharp"),y=Object(p.a)(l.a.createElement("path",{d:"M21 15.46l-5.27-.61-2.52 2.52c-2.83-1.44-5.15-3.75-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z"}),"PhoneSharp"),w=t("ZMKu"),C=w.b.custom(r.a);a.a=function(e){var a=e.lklData,t=Object(n.useState)(!0),p=t[0],j=t[1],O=Object(n.useState)(!1),S=O[0],L=O[1],k=Object(n.useState)(1),D=k[0],z=k[1],B=Object(o.a)(),M=B.isOpen,P=B.onOpen,N=B.onClose,T=Object(n.useState)(200),W=T[0],H=(T[1],{mr:4,alignSelf:"center",size:"iconPoc",color:"label"}),K={display:"inline-block",py:4,fontWeight:600,fontSize:16,color:"headingLarge"},A=[{label:"Edit Location",value:"Edit",onClick:function(){}},{label:"Remove Location",value:"Delete Location",type:"error",onClick:function(){P()}}],I=a.lookupLklDto,R=I.lklTitle,U=I.locationDesc,q=I.lklAddressDto,V=I.lklPocListDto,G=q.addressDto,_=G.address1,F=G.address2,X=G.city,Z=G.postalCode,J=G.countryCd,Y=_+" "+F+", "+X+", "+Z+", "+J,Q=[];return V.map((function(e){var a={fullName:"",phone:"",email:""},t=e.personDto,n=t.givenName,l=t.surName,r=t.personEmailDtoList,o=t.personPhoneDtoList;a.fullName=n+" "+l,a.phone=o[0].phoneDto.phoneNum,a.email=r[0].emailDto.emailAddress,Q.push(a)})),l.a.createElement(r.a,{mb:{base:"16",md:"24"}},l.a.createElement(d.d,{id:"lklCard",maxWidth:"full"},l.a.createElement(c.a,{w:"full",mt:{base:"-8px",sm:"-16px"}},l.a.createElement(c.a,{flexDir:{base:"column",xl:"row"},flexGrow:1},l.a.createElement(r.a,{flexBasis:{xl:"65%"}},l.a.createElement(d.w,null,R)),l.a.createElement(r.a,{mb:4,flexBasis:{xl:"35%"}},l.a.createElement(d.i,{color:"label"},"U.S. Embassy in ",X,", ",J))),l.a.createElement(r.a,{position:"relative",right:{base:"-12px",sm:"-20px",md:"-12px"}},l.a.createElement(u.a,{options:A,borderedRows:!0,width:"10rem",label:"Additional actions for "+R},l.a.createElement(r.a,{as:b.a,color:"clickable"}))),l.a.createElement(E.a,{isOpen:M,onCancel:N,onConfirm:function(){N()}})),l.a.createElement(c.a,{mt:8,mb:-12},l.a.createElement(r.a,{display:"inline-flex",cursor:"pointer",onClick:function(){L(!S)},color:"clickable"},l.a.createElement(i.a,{my:0,fontSize:16},"Details"),S?l.a.createElement(f,null):l.a.createElement(h,null))),S?l.a.createElement(r.a,{position:"relative",h:W,overflow:"hidden"},l.a.createElement(m.a,{borderColor:"silver",my:16}),l.a.createElement(r.a,{display:{xl:"none"}},l.a.createElement(c.a,{mb:16},l.a.createElement(s.a,Object.assign({},K,{borderWidth:0,borderBottom:p?3:0,borderBottomColor:"accent",borderStyle:"solid",color:"headingSmall",_hover:p?{}:{color:"clickable",borderBottomColor:"clickable",borderBottom:"3px",borderStyle:"solid"},onClick:function(){z(-1),j(!0)},mr:8}),l.a.createElement(i.a,{fontFamily:"headingSmall",margin:0,fontSize:"h4",fontWeight:"h4",lineHeight:"h4"},"Location")),l.a.createElement(r.a,{mx:8}),l.a.createElement(s.a,Object.assign({},K,{borderWidth:0,borderBottom:p?0:3,borderBottomColor:"accent",borderStyle:"solid",color:"headingSmall",_hover:p?{color:"clickable",borderBottomColor:"clickable",borderBottom:"3px",borderStyle:"solid"}:{},onClick:function(){z(1),j(!1)}}),l.a.createElement(i.a,{fontFamily:"headingSmall",margin:0,fontSize:"h4",fontWeight:"h4",lineHeight:"h4"},"Point of Contact"))),l.a.createElement(w.a,{custom:D,initial:!1},l.a.createElement(C,{position:"absolute",key:D,initial:{transform:"translateX("+(D<0?"-100%":"100%")+")"},transition:{type:"tween",duration:.5,ease:"easeInOut"},animate:{transform:"translateX(0%)"},exit:function(e){return{transform:"translateX("+(e<0?"100%":"-100%")+")"}},width:"100%"},p?l.a.createElement(r.a,null,l.a.createElement(c.a,{mb:12},l.a.createElement(r.a,Object.assign({as:x},H)),l.a.createElement(d.i,null,Y)),l.a.createElement(r.a,{py:4},l.a.createElement(d.i,{color:"label"},"Description")),l.a.createElement(r.a,null,l.a.createElement(d.i,null,U))):l.a.createElement(r.a,null,Q.map((function(e,a){return l.a.createElement(c.a,{key:a,flexDir:{base:"column",md:"row"},border:1,borderStyle:"solid",borderColor:"silver",px:8,justifyContent:"space-around"},l.a.createElement(c.a,{py:4},l.a.createElement(r.a,Object.assign({as:g},H)),l.a.createElement(d.i,null,e.fullName)),l.a.createElement(c.a,{py:4},l.a.createElement(r.a,Object.assign({as:v},H)),l.a.createElement(d.i,null,e.email)),l.a.createElement(c.a,{py:4},l.a.createElement(r.a,Object.assign({as:y},H)),l.a.createElement(d.i,null,e.phone)))})))))),l.a.createElement(c.a,{display:{base:"none",xl:"flex"}},l.a.createElement(r.a,{flexBasis:{xl:"63%"}},l.a.createElement(r.a,{pb:16},l.a.createElement(d.n,null,"Location")),l.a.createElement(c.a,{mb:12},l.a.createElement(r.a,Object.assign({as:x},H)),l.a.createElement(d.i,null,Y)),l.a.createElement(r.a,{py:4},l.a.createElement(d.i,{color:"label"},"Description")),l.a.createElement(r.a,null,l.a.createElement(d.i,null,U))),l.a.createElement(m.a,{orientation:"vertical",flexBasis:{xl:"2%"},color:"silver"}),l.a.createElement(r.a,{flexBasis:{xl:"35%"}},l.a.createElement(r.a,{pb:16},l.a.createElement(d.n,null,"Point of Contact")),Q.map((function(e,a){return l.a.createElement(c.a,{key:a,flexDir:"column",border:1,borderStyle:"solid",borderColor:"silver",px:8,justifyContent:"space-around",flexWrap:"wrap"},l.a.createElement(c.a,{py:4},l.a.createElement(r.a,Object.assign({as:g},H)),l.a.createElement(d.i,null,e.fullName)),l.a.createElement(c.a,{py:4},l.a.createElement(r.a,Object.assign({as:v},H)),l.a.createElement(d.i,null,e.email)),l.a.createElement(c.a,{py:4},l.a.createElement(r.a,Object.assign({as:y},H)),l.a.createElement(d.i,null,e.phone)))}))))):null))}},"1waj":function(e,a,t){"use strict";t("HAE/");var n=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=n(t("q1tI")),r=(0,n(t("8/g6")).default)(l.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");a.default=r},"5VNW":function(e,a,t){"use strict";t.r(a);t("Vd3H"),t("91GP");var n=t("q1tI"),l=t.n(n),r=t("Wbzz"),o=t("wd/R"),c=t.n(o),i=t("KEox"),m=t("Weur"),s=t("BMxC"),d=t("eJLp"),u=t("ggNy"),E=t("soUV"),b=t("0RaA"),p=t("xP3E"),f=t("l1im"),h=t("1waj"),x=t.n(h),g=u.c+" HH:mm:ss:SS ZZ";a.default=function(){var e=p[0],a=e.eventLklDtoList.map((function(e){return Object.assign({},e,{createdDateTime:c()(e.createdDateTime,g).toDate(),lastUpdatedDateTime:c()(e.lastUpdatedDateTime,g).toDate()})})),t=Object(n.useState)(1),o=t[0],h=t[1],v=Object(n.useState)(10),y=v[0],w=(v[1],Object(n.useState)(!0)),C=w[0];w[1];a.sort((function(e,a){var t,n,l=null!==(t=e.lastUpdatedDateTime)&&void 0!==t?t:new Date,r=null!==(n=a.lastUpdatedDateTime)&&void 0!==n?n:new Date;return l>r?-1:l<r?1:0}));var j=a.filter((function(e){return!C||e.activeIndicator})),O=Math.ceil(j.length/y);o>O&&h(O);var S=o*y,L=S-y,k=j.length>y?Math.ceil(j.length/y):1,D=1!==k?j.slice(L,S):j;return l.a.createElement(E.a,{pageTitle:"Last Known Location",pageHeading:e.eventTitle},l.a.createElement(i.a,{width:"100%",gridColumn:{base:"1 / -1"},borderColor:"silver"}),l.a.createElement(m.a,{gridColumn:{base:"1 / -1"},direction:"column"},l.a.createElement(m.a,{gridColumn:{base:"1 / -1",md:"1 / 5",lg:"1 / 8",xl:"1 / 9"},direction:"row",wrap:"wrap",justify:"flex-end",mb:8},l.a.createElement(s.a,{flexGrow:1,"aria-label":"Last Known Locations"},l.a.createElement(u.m,null,"Last Known Locations")),l.a.createElement(s.a,{bottom:"16px",zIndex:2,right:"16px",position:"fixed",display:{md:"none"}},l.a.createElement(d.a,{borderColor:"transparent",boxShadow:"0 6px 6px 0 rgba(0, 0, 0, 0.4)",color:"white",height:"40px",width:"40px",rounded:"round",bg:"clickable",cursor:"pointer",_hover:{bg:"secondary"},onClick:function(){return Object(r.a)("/event")}},l.a.createElement(x.a,null))),l.a.createElement(m.a,{display:{base:"none",md:"flex"},alignItems:"center"},l.a.createElement(s.a,{as:x.a,alignSelf:"center",size:"iconPoc",color:"lochmara",mx:8,h:16}),l.a.createElement(u.p,{onClick:function(){Object(r.a)("/addLKL")}},"Add Location"))),l.a.createElement(m.a,{gridColumn:{base:"1 / -1",md:"1 / 5",lg:"1 / 8",xl:"1 / 9"},direction:"row",wrap:"wrap",justify:"flex-end"},l.a.createElement(s.a,{flexGrow:1,mb:20},l.a.createElement(u.w,null,"Manage the last known locations for U.S. citizens involved in this crisis"))),D.map((function(e,a){return l.a.createElement(b.a,{key:a,lklData:e})})),l.a.createElement(m.a,{gridColumn:"1 / -1",justify:"center"},l.a.createElement(u.w,null,"Total Locations: ",a.length),l.a.createElement(f.a,{page:o,count:k,onChange:function(e,a){return h(a)},showLastButton:!0,size:"small"}),l.a.createElement("select",null,l.a.createElement("option",{value:"10"},"10"),l.a.createElement("option",{value:"20"},"20")))))}},KEox:function(e,a,t){"use strict";var n=t("pVnL"),l=t.n(n),r=t("8OQS"),o=t.n(r),c=t("qKvR"),i=t("BMxC"),m=t("q1tI"),s=Object(m.forwardRef)((function(e,a){var t=e.orientation,n=o()(e,["orientation"]),r="vertical"===t?{borderLeft:"0.0625rem solid",height:"auto",mx:2}:{borderBottom:"0.0625rem solid",width:"auto",my:2};return Object(c.d)(i.a,l()({ref:a,as:"hr","aria-orientation":t,border:"0",opacity:"0.6"},r,{borderColor:"inherit"},n))}));a.a=s}}]);
//# sourceMappingURL=component---src-pages-lkl-list-tsx-e66d2fff1bbefcf0f81e.js.map