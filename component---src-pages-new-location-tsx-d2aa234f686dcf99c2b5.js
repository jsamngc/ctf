(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"6E47":function(e){e.exports=JSON.parse('[{"label":"Airport","value":"airport"},{"label":"Bus Station","value":"busStation"},{"label":"Church","value":"church"},{"label":"Home","value":"home"},{"label":"Hospital","value":"hospital"},{"label":"Hotel","value":"hotel"},{"label":"Other","value":"other"},{"label":"Other GOvernment Facility (non-U.S.)","value":"otherGov"},{"label":"Port","value":"port"},{"label":"Restaurant","value":"restaurant"},{"label":"Stadium","value":"stadium"},{"label":"Train Station","value":"trainStation"},{"label":"UN Facility","value":"unFacility"},{"label":"USG Facility","value":"usgFacility"},{"label":"School","value":"school"}]')},QWZw:function(e){e.exports=JSON.parse('[{"label":"Home","value":"HOME"},{"label":"Mobile","value":"MOBILE"},{"label":"Work","value":"WORK"},{"label":"Other","value":"OTHER"}]')},"WL++":function(e){e.exports=JSON.parse('[{"label":"Home","value":"HOME"},{"label":"Work","value":"WORK"},{"label":"Other","value":"OTHER"}]')},e4wl:function(e,t,a){"use strict";a.r(t);a("dRSK");var n=a("q1tI"),l=a.n(n),r=a("wd/R"),i=a.n(r),o=a("nB9M"),d=a("GUiF"),u=(a("f3/d"),a("a1Th"),a("Btvt"),a("XfO3"),a("HEwt"),a("rGqo"),a("rE2o"),a("ioFf"),a("91GP"),a("INYr"),a("soUV")),s=a("Wbzz"),c=a("NKCw"),m=a("ggNy"),v=a("XZ7F"),p=a("69N/"),b=a("BMxC"),f=(a("Oyvg"),a("pIFo"),a("Vd3H"),a("qiow")),g=a("ENWW"),h=a("91Jw"),y=a("wsxo"),E=a("6E47"),C=function(e){e.target.value=e.target.value.replace(/^[^A-Za-z0-9]+/,"")},L=function(e,t){if(!e)return!0;var a=RegExp(/^([-+]?)([\d]{1,3})([.]?)([\d]*)$/),n=parseFloat(e)>=-t&&parseFloat(e)<=t;return a&&n},O=function(){var e,t,a,r,i=Object(c.d)(),o=i.trigger,u=i.register,s=i.errors,O=i.setValue,A=i.getValues,T=i.formState,I=Object(v.a)(),S=I.isOpen,x=I.onOpen,j=I.onClose,R=T.dirtyFields,k=Object(n.useRef)(null),D=Object(n.useRef)(null),w=Object(n.useRef)(null),N=Object(n.useRef)(null),z=Object(n.useRef)(null),F=Object(c.e)({name:"country"}),q=Object(c.e)({name:"longitude"}),P=Object(c.e)({name:"latitude"}),M=Object(c.e)({name:"streetAddress"}),B=Object(c.e)({name:"city"}),W=Object(n.useMemo)((function(){var e=g.filter((function(e,t){return t%5==0}));return e.push({label:"UNITED STATES OF AMERICA",value:"USA"}),e.push({label:"JAPAN",value:"JPN"}),e.sort((function(e,t){return e.label.localeCompare(t.label)})),e}),[]),Z=l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 3",lg:"span 7"}},l.a.createElement(m.i,{labelText:"State",labelId:"stateLabel",required:!0},l.a.createElement(c.a,{name:"stateCd",rules:{required:"Please select a State"},onFocus:function(){var e;return null===(e=w.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:w,id:"stateCd",name:"stateCd","aria-labelledby":"stateLabel",options:y,size:"full",disabled:!1,validationState:(null==s?void 0:s.stateCd)?m.A.ERROR:void 0,errorMessage:null==s||null===(t=s.stateCd)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){(null==R?void 0:R.stateCd)&&n()},value:r})}}))),H=l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 3",lg:"span 7"}},l.a.createElement(m.i,{labelText:"Province",labelId:"provinceLabel"},l.a.createElement(m.y,{ref:u,id:"province",name:"province",size:"full",disabled:!1,onChange:C,maxLength:50})));return l.a.createElement(d.c,{title:"",showDivider:!0},l.a.createElement(p.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"1 / 9"},gridGap:{base:"16px",md:"24px"},gridTemplateColumns:{base:"1",md:"repeat(12,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 11"}},l.a.createElement(m.i,{labelText:"Location Title",labelId:"lklTitleLabel",required:!0},l.a.createElement(m.y,{id:"lklTitle",name:"lklTitle",size:"full",disabled:!1,onChange:C,validationState:(null==s?void 0:s.lklTitle)?m.A.ERROR:void 0,errorMessage:null==s||null===(e=s.lklTitle)||void 0===e?void 0:e.message,ref:u({required:"Please enter a Location Title",maxLength:{value:50,message:"Location Title cannot exceed 25 characters"}}),maxLength:50}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 1"}},l.a.createElement(m.i,{labelText:"Active",labelId:"activeIndicatorLabel"},l.a.createElement(m.x,{id:"activeIndicator",name:"activeIndicator",disabled:!1,value:"Active",ref:u,onChange:function(e){e.target.checked?O("activeIndicator",!1):O("activeIndicator",!0),x()}}))),l.a.createElement(f.a,{isOpen:S,onCancel:j,isActivate:!A("activeIndicator"),onConfirm:function(){O("activeIndicator",!A("activeIndicator")),j()}})),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 4",lg:"1 / 5"}},l.a.createElement(m.i,{labelText:"Country",labelId:"countryLabel",required:!0},l.a.createElement(c.a,{name:"country",rules:{required:"Please select a Country"},onFocus:function(){var e;return null===(e=k.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:k,id:"country",name:"country","aria-labelledby":"countryLabel",options:W,size:"full",disabled:!1,validationState:(null==s?void 0:s.country)?m.A.ERROR:void 0,errorMessage:null==s||null===(t=s.country)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value),O("post","")},onBlur:function(){(null==R?void 0:R.country)&&n()},value:r,placeholder:"Type to filter countries"})}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"4 / 7",lg:"span 4"}},l.a.createElement(m.i,{labelText:"Post",labelId:"postLabel",required:!0},l.a.createElement(c.a,{name:"post",rules:{required:"Please select a Post"},onFocus:function(){var e;return null===(e=D.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:D,id:"post",name:"post","aria-labelledby":"postLabel",options:h.filter((function(e){return e.country_cd===F})),size:"full",disabled:!F,validationState:(null==s?void 0:s.post)?m.A.ERROR:void 0,errorMessage:null==s||null===(t=s.post)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){(null==R?void 0:R.post)&&n()},value:r,placeholder:""})}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 8"}},l.a.createElement(m.i,{labelText:"Street Address",labelId:"streetAddressLabel"},l.a.createElement(m.y,{id:"streetAddress",name:"streetAddress",size:"full",disabled:!1,onChange:function(e){C(e)},onBlur:function(){return o("city")},maxLength:200,ref:u}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 8"}},l.a.createElement(m.i,{labelText:"Apartment, Suite, Other",labelId:"additionalAddressLabel"},l.a.createElement(m.y,{ref:u,id:"additionalAddress",name:"additionalAddress",size:"full",disabled:!1,onChange:C,maxLength:200}))),l.a.createElement(p.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"1 / 9"},gridGap:{base:"16px",md:"24px"},gridTemplateColumns:{base:"repeat(4,1fr)",md:"repeat(8,1fr)",lg:"repeat(22,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 3",lg:"span 11"}},l.a.createElement(m.i,{labelText:"City",labelId:"cityLabel"},l.a.createElement(m.y,{id:"city",name:"city",size:"full",disabled:!1,validationState:(null==s?void 0:s.city)?m.A.ERROR:void 0,errorMessage:null==s||null===(t=s.city)||void 0===t?void 0:t.message,onChange:function(e){C(e)},maxLength:30,ref:u({required:!(!M||B)&&"City also required with Street Address"})}))),"USA"===F?Z:H,l.a.createElement(b.a,{gridColumn:{base:"1 / 2",md:"span 2",lg:"span 4"}},l.a.createElement(m.i,{labelText:"Postal Code",labelId:"postalCodeLabel"},l.a.createElement(m.y,{ref:u,id:"postalCode",name:"postalCode",size:"full",disabled:!1,onChange:C,maxLength:10})))),l.a.createElement(b.a,{gridColumn:{base:"1 / 3",md:"1 / 4",lg:"1 / 3"}},l.a.createElement(m.i,{labelText:"Longitude",labelId:"longitudeLabel"},l.a.createElement(m.y,{id:"longitude",name:"longitude",size:"full",disabled:!1,validationState:(null==s?void 0:s.longitude)?m.A.ERROR:void 0,errorMessage:null==s||null===(a=s.longitude)||void 0===a?void 0:a.message,onBlur:function(){o("latitude")},ref:u({validate:function(e){return!!L(e,180)||"Invalid input"},required:!(!P||q)&&"Longitude value also required"})}))),l.a.createElement(b.a,{gridColumn:{base:"3 / 5",md:"4 / 7",lg:"span 2"}},l.a.createElement(m.i,{labelText:"Latitude",labelId:"latitudeLabel"},l.a.createElement(m.y,{id:"latitude",name:"latitude",size:"full",disabled:!1,validationState:(null==s?void 0:s.latitude)?m.A.ERROR:void 0,errorMessage:null==s||null===(r=s.latitude)||void 0===r?void 0:r.message,onBlur:function(){o("longitude")},ref:u({validate:function(e){return!!L(e,90)||"Invalid input"},required:!(!q||P)&&"Latitude value also required"})}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 4"}},l.a.createElement(m.i,{labelText:"Location Type",labelId:"locationTypeLabel"},l.a.createElement(c.a,{name:"locationType",onFocus:function(){var e;return null===(e=N.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:N,id:"locationType",name:"locationType","aria-labelledby":"locationTypeLabel",options:E,size:"full",disabled:!1,validationState:(null==s?void 0:s.locationType)?m.A.ERROR:void 0,errorMessage:null==s||null===(t=s.locationType)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){(null==R?void 0:R.locationType)&&n()},value:r,placeholder:""})}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 8"}},l.a.createElement(m.i,{labelText:"Description",labelId:"descriptionLabel"},l.a.createElement(c.a,{name:"locationDesc",rules:{pattern:{value:/^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,message:"Please enter only plain text in the Description field"},maxLength:{value:500,message:"Description cannot exceed 500 characters"}},onFocus:function(){var e;return null===(e=z.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.z,{ref:z,id:"locationDesc",name:"locationDesc","aria-labelledby":"descriptionLabel",size:"full",maxLength:500,disabled:!1,validationState:(null==s?void 0:s.locationDesc)?m.A.ERROR:void 0,errorMessage:null==s||null===(t=s.locationDesc)||void 0===t?void 0:t.message,onChange:function(e){e.target.value=Object(d.d)(e.target.value).replace(/[^A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/g,""),a(e)},onBlur:n,value:r})}}))))},A=(a("Z2Ku"),a("L9s1"),a("yt8O"),a("hhXQ"),a("LYUY")),T=Object(A.a)(l.a.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),I=Object(A.a)(l.a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),S=(a("RW0V"),a("we/t")),x=a("jgTY"),j=a("sK1y");var R=function(e){var t,a=e.labelText,l=e.labelId,r=e.children,i=e.required,o=e.icon,d=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,["labelText","labelId","children","required","icon"]);return n.createElement(S.a,null,n.createElement(x.a,{id:l,fontFamily:"body",fontSize:"label",fontWeight:"normal",pb:0,color:"label",display:"block",lineHeight:"label"},i&&n.createElement(j.a,{color:"required",as:"span"},"* "),o&&n.createElement(b.a,{position:"absolute",as:o,mr:4,color:"label"}),n.createElement(j.a,{m:0,ml:28},a)),n.cloneElement(r,Object.assign({required:i,"aria-labelledby":(l+" "+(null!==(t=r.props["aria-labelledby"])&&void 0!==t?t:"")).trim()},d)))},k=(a("KKXr"),Object(A.a)(l.a.createElement("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}),"Email")),D=Object(A.a)(l.a.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"}),"AddCircle"),w=Object(A.a)(l.a.createElement("path",{d:"M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"HighlightOff"),N=a("WL++"),z=new RegExp(["^(?:",'(?:(?:["A-Za-z0-9!#&\'+\\-/?_`{}~.]*")|',"(?:[A-Za-z0-9!#&'+\\-/?_`{}~]+(?:\\.?[A-Za-z0-9!#&'+\\-/?_`{}~])*))","@","(?:(?:[A-Za-z0-9]{1,63}\\.)|(?:[A-Za-z0-9][A-Za-z0-9\\-]{1,61}[A-Za-z0-9]\\.))+","(?:(?:[A-Za-z0-9]-*)*[A-Za-z](?:-*[A-Za-z0-9])*)",")$"].join("")),F=function(e){var t,a,n,r=e.namePrefix,i=e.addable,o=e.isFirst,d=e.onEmptyEmail,u=e.triggerAllFields,s=e.onAdd,v=e.onRemove,f=Object(c.d)(),g=f.errors,h=f.formState,y=f.register,E=h.dirtyFields,C=r.split("-"),L=C[0],O=C[1],A=C[2],T=C[3],I=function(e){return L+"["+O+"]["+A+"]["+T+"]["+e+"]"},S=I("emailAddress"),x=I("emailType"),j=Object(c.e)({name:S}),F=Object(c.e)({name:x}),P=g&&g.pocList&&g.pocList[+O]?g.pocList[+O]:null,M=P&&P.emailList?P.emailList[+T]:null,B=E&&E.pocList&&E.pocList[+O]?E.pocList[+O]:null,W=B&&B.emailList?B.emailList[+T]:null,Z=void 0===(null==M?void 0:M.emailAddress)&&void 0===(null==M?void 0:M.emailType),H=void 0!==(null==W?void 0:W.emailAddress)&&void 0!==(null==W?void 0:W.emailType),U=Z&&(!d||H)&&i,V=""!==(null==M||null===(t=M.emailType)||void 0===t?void 0:t.message)&&void 0!==(null==M||null===(a=M.emailType)||void 0===a?void 0:a.message);return l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"1 / -1",sm:"1 / 9",md:"1 / 7"}},l.a.createElement(R,{labelText:"Email Address",labelId:"emailAddressLabel",icon:k},l.a.createElement(m.y,{ref:y({required:!(!F||j)&&"Email Address is required",pattern:{value:z,message:"Please enter valid email in the field"}}),id:S,name:S,size:"full",disabled:!1,validationState:(null==M?void 0:M.emailAddress)?m.A.ERROR:void 0,errorMessage:null==M||null===(n=M.emailAddress)||void 0===n?void 0:n.message,onChange:q,maxLength:67,onBlur:function(){u()}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / 13",sm:"9 / 13 ",md:"7 / 13"}},l.a.createElement(p.a,{gridColumn:{base:"1 / -1"},gridGap:{base:"8px",md:"16px"},gridTemplateColumns:{base:"repeat(12,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / 12"}},l.a.createElement(m.i,{labelText:"Type",labelId:"emailTypeLabel"},l.a.createElement(c.a,{name:x,rules:{required:!(!j||F)&&"Email Type is required"},render:function(e){var t,a=e.onChange,n=e.value;return l.a.createElement(m.w,{id:x,name:x,"aria-labelledby":"emailTypeLabel",options:N,size:"full",disabled:!1,validationState:(null==M?void 0:M.emailType)?m.A.ERROR:void 0,errorMessage:null==M||null===(t=M.emailType)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){u()},value:n})}}))),l.a.createElement(b.a,{gridColumn:{base:"12 / 13"},alignSelf:"center",justifySelf:"center"},o?l.a.createElement(b.a,{mt:Z?32:V?0:32,as:D,cursor:U?"pointer":"cursor",color:U?"clickable":"disabledInputText",onClick:function(){U&&s()}}):l.a.createElement(b.a,{mt:Z?32:V?0:32,as:w,cursor:"pointer",color:"clickable",onClick:function(){v()}})))))},q=function(e){e.target.value=e.target.value.replace(/^[\s]+/,"")},P=Object(A.a)(l.a.createElement("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"}),"Phone"),M=a("QWZw"),B=/^([+]?\d{1,2}[.-\s]?)?(\(?\d{3}\)?[\s.-]?){2}\d{4}$/,W=function(e){var t,a,n,r=e.namePrefix,i=e.isFirst,o=e.addable,d=e.onEmptyPhone,u=e.onPhoneNumberChange,s=e.triggerAllFields,v=e.onAdd,f=e.onRemove,g=Object(c.d)(),h=g.errors,y=g.formState,E=g.register,C=y.dirtyFields,L=r.split("-"),O=L[0],A=L[1],T=L[2],I=L[3],S=function(e){return O+"["+A+"]["+T+"]["+I+"]["+e+"]"},x=S("phoneNum"),j=S("phoneTypeCd"),k=Object(c.e)({name:x}),N=Object(c.e)({name:j}),z=h&&h.pocList&&h.pocList[+A]?h.pocList[+A]:null,F=z&&z.phoneList?z.phoneList[+I]:null,q=C&&C.pocList&&C.pocList[+A]?C.pocList[+A]:null,W=q&&q.phoneList?q.phoneList[+I]:null,Z=void 0===(null==F?void 0:F.phoneNum)&&void 0===(null==F?void 0:F.phoneTypeCd),H=(null==W?void 0:W.phoneNum)&&(null==W?void 0:W.phoneTypeCd),U=Z&&(!d||H)&&o,V=void 0!==(null===(t=h[j])||void 0===t?void 0:t.message)&&""!==(null===(a=h[j])||void 0===a?void 0:a.message);return l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"1 / -1",sm:"1 / 9",md:"1 / 7"}},l.a.createElement(R,{labelText:"Phone Number",labelId:"phoneNumberLabel",icon:P},l.a.createElement(m.y,{ref:E({required:!(!N||k)&&"Phone Number is required",pattern:{value:B,message:"Please enter valid phone number in the field"}}),id:x,name:x,size:"full",disabled:!1,validationState:(null==F?void 0:F.phoneNum)?m.A.ERROR:void 0,errorMessage:null==F||null===(n=F.phoneNum)||void 0===n?void 0:n.message,onChange:u,maxLength:30,onBlur:function(){s()}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / 13",sm:"9 / 13 ",md:"7 / 13"}},l.a.createElement(p.a,{gridColumn:{base:"1 / -1"},gridGap:{base:"8px",md:"16px"},gridTemplateColumns:{base:"repeat(12,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / 12"}},l.a.createElement(m.i,{labelText:"Type",labelId:"phoneTypeLabel"},l.a.createElement(c.a,{name:j,rules:{required:!(!k||N)&&"Phone Type is required"},render:function(e){var t,a=e.onChange,n=e.value;return l.a.createElement(m.w,{id:j,name:j,"aria-labelledby":"phoneTypeLabel",options:M,size:"full",disabled:!1,validationState:(null==F?void 0:F.phoneTypeCd)?m.A.ERROR:void 0,errorMessage:null==F||null===(t=F.phoneTypeCd)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){s()},value:n})}}))),l.a.createElement(b.a,{gridColumn:{base:"12 / 13"},alignSelf:"center",justifySelf:"center"},i?l.a.createElement(b.a,{mt:Z?32:V?0:32,as:D,cursor:U?"pointer":"cursor",color:U?"clickable":"disabledInputText",onClick:function(){U&&v()}}):l.a.createElement(b.a,{mt:Z?32:V?0:32,as:w,cursor:"pointer",color:"clickable",onClick:function(){f()}})))))};function Z(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return H(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var U=["phoneDto0","phoneDto1","phoneDto2"],V=["emailDto0","emailDto1","emailDto2"],G=function(e){var t,a,r=e.pocIndex,i=e.initialEmailList,o=e.initialPhoneList,d=e.onRemove,u=Object(c.d)(),s=u.errors,v=u.setError,f=u.clearErrors,g=u.register,h=u.watch,y=u.trigger,E="pocList["+r+"]",C=s.pocList?null===(t=s.pocList[r])||void 0===t?void 0:t.givenName:void 0,L=s.pocList?null===(a=s.pocList[r])||void 0===a?void 0:a.surName:void 0,O=Object(n.useState)([E+"[givenName]",E+"[surName]"]),A=O[0],S=(O[1],Object(n.useState)([E+"[phoneList][0][phoneNum]",E+"[phoneList][0][phoneTypeCd]",E+"[emailList][0][emailAddress]",E+"[emailList][0][emailType]"])),x=S[0],j=S[1],k=Object(n.useState)(o.length>0?o.map((function(e,t){return"phoneDto"+t})):["phoneDto0"]),D=k[0],w=k[1],N=Object(n.useState)(i.length>0?i.map((function(e,t){return"emailDto"+t})):["emailDto0"]),z=N[0],q=N[1],P=function(){return Object.values(h(A)).every((function(e){return void 0===e||""===e}))},M=function(){return Object.values(h(x)).every((function(e){return void 0===e||""===e}))},B=function(e){e.target.value=e.target.value.replace(/^[^A-Za-z0-9]+/,"")},H=function(e){e.target.value.length>0?M()?x.forEach((function(e){return v(e,{type:"manual",message:""})})):y(A):M()?f(x):y(A)},G=function(){y([].concat(Z(x),Z(A)))};return l.a.createElement(b.a,{position:"relative"},0!==r&&l.a.createElement(b.a,{as:T,m:8,right:0,position:"absolute",cursor:"pointer",color:"text",onClick:function(){d()}}),l.a.createElement(p.a,{border:"1px",borderStyle:"solid",borderColor:"lightGray",gridColumn:{base:"1 / -1",md:"1 / 9"},gridGap:{base:"16px",md:"24px"},padding:{base:"16px",md:"24px"},gridTemplateColumns:{base:"repeat(12,1fr)"}},l.a.createElement("input",{ref:g,type:"text",name:E+"[personId]",hidden:!0,defaultValue:"person"+r}),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7"}},l.a.createElement(R,{labelText:"First Name",labelId:"firstNameLabel",icon:I},l.a.createElement(m.y,{ref:g({required:!(M()||!P())&&"First Name is required"}),id:"givenName",name:E+"[givenName]",size:"full",disabled:!1,validationState:C?m.A.ERROR:void 0,errorMessage:null==C?void 0:C.message,onChange:B,onBlur:H,maxLength:33}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"7 / -1"}},l.a.createElement(m.i,{labelText:"Last Name",labelId:"lastNameLabel"},l.a.createElement(m.y,{ref:g({required:!(M()||!P())&&"Last Name is required"}),id:"surName",name:E+"[surName]",size:"full",disabled:!1,validationState:L?m.A.ERROR:void 0,errorMessage:null==L?void 0:L.message,onChange:B,onBlur:H,maxLength:33}))),z.map((function(e,t){var a=e.charAt(e.length-1),n=z.length<3&&0===t;return l.a.createElement(F,{key:E+"-"+e,namePrefix:"pocList-"+r+"-emailList-"+a,isFirst:0===t,addable:n,onEmptyEmail:0===i.length,triggerAllFields:G,onAdd:function(){return e=V.filter((function(e){return!z.includes(e)})),q((function(t){return e.length>0?[].concat(Z(t),[e[0]]):t})),void j((function(t){var a=e[0].charAt(e[0].length-1);return[].concat(Z(t),[E+"[emailList]["+a+"][emailAddress]",E+"[emailList]["+a+"][emailType]"])}));var e},onRemove:function(){var t,a;a=(t=e).charAt(t.length-1),q((function(e){return e.filter((function(e){return e!==t}))})),j((function(e){return e.filter((function(e){return!(e===E+"[emailList]["+a+"][emailType]"||e===E+"[emailList]["+a+"][emailAddress]")}))}))}})})),D.map((function(e,t){var a=e.charAt(e.length-1),n=D.length<3&&0===t;return l.a.createElement(W,{key:E+"-"+e,namePrefix:"pocList-"+r+"-phoneList-"+a,isFirst:0===t,addable:n,onEmptyPhone:0===o.length,onPhoneNumberChange:B,triggerAllFields:G,onAdd:function(){return e=U.filter((function(e){return!D.includes(e)})),w((function(t){return e.length>0?[].concat(Z(t),[e[0]]):t})),void j((function(t){var a=e[0].charAt(e[0].length-1);return[].concat(Z(t),[E+"[phoneList]["+a+"][phoneNum]",E+"[phoneList]["+a+"][phoneTypeCd]"])}));var e},onRemove:function(){var t,a;a=(t=e).charAt(t.length-1),w((function(e){return e.filter((function(e){return e!==t}))})),j((function(e){return e.filter((function(e){return!(e===E+"[phoneList]["+a+"][phoneNum]"||e===E+"[phoneList]["+a+"][phoneTypeCd]")}))}))}})}))))};function K(e){return function(e){if(Array.isArray(e))return J(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return J(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return J(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var $=function(e){var t=e.pocList,a=Object(n.useState)(t?0===t.length?1:t.length:1),r=a[0],i=a[1],o=Object(n.useState)((function(){return t&&t.length>0?t.map((function(e,t){return"poc"+t})):["poc0"]})),u=o[0],s=o[1];return l.a.createElement(d.c,{title:"Point Of Contact",showDivider:!1},l.a.createElement(b.a,{gridColumn:"1 / -1"},l.a.createElement(m.v,null,"Enter a point of contact at this location.")),u.map((function(e){var a=+e.slice(3),n=t&&t[a]&&0===t[a].emailList.length,r=t&&t[a]&&0===t[a].phoneList.length;return l.a.createElement(b.a,{key:e,gridColumn:{base:"1 / -1",md:"1 / 7",lg:"1 / 9"}},l.a.createElement(G,{pocIndex:a,initialEmailList:t&&t[a]&&!n?t[a].emailList:[],initialPhoneList:t&&t[a]&&!r?t[a].phoneList:[],onRemove:function(){s(u.filter((function(t){return t!==e})))}}))})),l.a.createElement(b.a,{gridColumn:"1 / -1"},l.a.createElement(m.o,{onClick:function(){s((function(e){return[].concat(K(e),["poc"+r])})),i(r+1)}},"Add Another Point of Contact")))},_=a("BXVe"),X=a("tqP/"),Y=function e(t,a,n){for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&("object"==typeof t[l]&&e(t[l],a,n),l===a&&(t[""+a]=n))};function Q(e){return function(e){if(Array.isArray(e))return ee(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return ee(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ee(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var te=function(e){var t,a,r,i,f,g,h,y,E,C,L,A,T,I,S,x,j,R,k,D,w,N,z,F,q,P=e.eventId,M=e.savedForm,B=Object(d.e)(),W=B.isEdit,Z=B.isCreate,H=Object(o.b)("ctfForms","events",!0)[1],U=Object(n.useState)("/event"),V=U[0],G=U[1],K=Object(n.useState)(!1),J=K[0],ee=K[1],te=Object(v.a)(),ae=te.isOpen,ne=te.onOpen,le=te.onClose,re=Object(v.a)(),ie=re.isOpen,oe=re.onOpen,de=re.onClose,ue={eventId:P,lklTitle:"",activeIndicator:!0,pocList:[]},se=M?(a=(t=M).activeIndicator,r=t.lookupLklDto,f=(i=null!=r?r:{}).lklTitle,g=i.locationDesc,h=i.postCd,y=i.lklAddressDto,E=i.lklPocListDto,C=(null!=y?y:{}).addressDto,A=(L=null!=C?C:{}).addressTypeCd,T=L.address1,I=L.address2,S=L.city,x=L.countryCd,j=L.postalCode,R=L.stateCd,k=L.province,D=L.latitude,w=L.longitude,N=null==E?void 0:E.map((function(e){var t=e.personDto,a=t.personId,n=t.givenName,l=t.surName,r=t.personEmailDtoList,i=t.personPhoneDtoList,o=r.map((function(e){var t=e.emailDto;return{emailAddress:t.emailAddress,emailType:t.emailTypeCd}}));return{personId:a,givenName:n,surName:l,phoneList:i.map((function(e){var t=e.phoneDto;return{phoneNum:t.phoneNum,phoneTypeCd:t.phoneTypeCd}})),emailList:o}})),{eventId:t.eventId,eventLklId:t.eventLklId,lklTitle:f,activeIndicator:null!=a&&a,country:x,post:h,streetAddress:T,additionalAddress:I,city:S,stateCd:R,province:k,postalCode:j,longitude:w,latitude:D,locationType:A,locationDesc:g,pocList:N}):void 0,ce=Object(c.c)({mode:"onBlur",defaultValues:M?se:ue}),me=ce.handleSubmit,ve=ce.register,pe=Object(n.useCallback)((function(e){var t=function(e,t){var a=e.eventId,n=e.eventLklId,l=e.lklTitle,r=e.activeIndicator,i=e.country,o=e.post,d=e.streetAddress,u=e.additionalAddress,s=e.city,c=e.stateCd,m=e.province,v=e.postalCode,p=e.longitude,b=e.latitude,f=e.locationType,g=e.locationDesc,h=e.pocList,y=void 0!==g?g:"",E=void 0!==f?f:"",C=null==h?void 0:h.filter((function(e){return""!==e.givenName||""!==e.surName})).map((function(e,t){var a=e.emailList.filter((function(e){return""!==e.emailAddress})).map((function(e,t){return{personEmailId:t,emailDto:{emailId:"0",emailAddress:e.emailAddress,emailTypeCd:e.emailType}}})),n=e.phoneList.filter((function(e){return""!==e.phoneNum})).map((function(e){return{personPhoneId:t,phoneDto:{phoneId:"0",phoneNum:e.phoneNum,phoneTypeCd:e.phoneTypeCd}}})),l={personId:e.personId,givenName:e.givenName,surName:e.surName,personEmailDtoList:a,personPhoneDtoList:n};return{lklPocId:t,personDto:l}})),L={eventId:a,eventLklId:null!=n?n:""+Math.floor(Math.random()*Math.floor(1e6)),activeIndicator:"Active"===r,lklTypeCd:E,createdDateTime:new Date,lastUpdatedDateTime:new Date,lookupLklDto:{lookupLklId:0,lklTitle:l,locationDesc:y,postCd:o,countryCd:i,lklAddressDto:{lklAddressId:"",addressDto:{addressId:"",addressTypeCd:E,latitude:b,longitude:p,address1:d,address2:u,city:s,countryCd:i,postalCode:v,province:m,stateCd:c}},lklPocListDto:C}};return t&&(Y(t,"activeIndicator","Active"===r),Y(t,"lklTitle",l),Y(t,"countryCd",i),Y(t,"postCd",o),Y(t,"address1",d),Y(t,"address2",u),Y(t,"city",s),Y(t,"stateCd",c),Y(t,"province",m),Y(t,"postalCode",v),Y(t,"addressTypeCd",E),Y(t,"longitude",p),Y(t,"latitude",b),Y(t,"locationDesc",y),Y(t,"lklPocListDto",C),Y(t,"lastUpdatedDateTime",new Date)),t||L}(e,M),a=Q(Object(o.a)("ctfForms","events",[])),n=a.findIndex((function(e){return e.eventId===P})),l=Object.assign({},a[n]);if(W&&void 0!==M){var r,i=null===(r=l.eventLklDtoList)||void 0===r?void 0:r.findIndex((function(e){return e.eventLklId===M.eventLklId}));if(void 0!==l.eventLklDtoList&&void 0!==i){var d;null===(d=l.eventLklDtoList)||void 0===d||d.splice(i,1,t),a.splice(n,1,l),H(a),oe(),setTimeout((function(){var e={eventId:M.eventId,formSection:"locations"};Object(s.a)("/event",{state:e}),de()}),2e3)}else{var u={eventId:M.eventId,formSection:"locations"};Object(s.a)("/event",{state:u})}}else Z&&(void 0===l.eventLklDtoList?l.eventLklDtoList=[t]:l.eventLklDtoList.push(t),a.splice(n,1,l),H(a),oe(),setTimeout((function(){if(J)window.location.reload();else{var e={eventId:P,formSection:"locations"};Object(s.a)("/event",{state:e})}de()}),2e3))}),[H,M,W,Z,P,oe,de,J]);W?(z="Edit Location",F="Provide as much information as you have for the this location.",q=[{label:"Event",onClick:function(){G("/event"),ne()}},{label:"Edit Location"}]):(z="New Location",F="Provide as much information as you have for the new location.",q=[{label:"Event",onClick:function(){G("/event"),ne()}},{label:"Add Location",onClick:function(){G("/addLocation"),ne()}},{label:"New Location"}]);return l.a.createElement(u.a,{pageTitle:"Location Details",pageHeading:z,pageDescription:F,breadcrumbs:q},l.a.createElement(c.b,ce,l.a.createElement(d.b,{id:"LKLForm",onSubmit:me((function(e){pe(e)}))},l.a.createElement("input",{name:"eventId",type:"hidden",ref:ve}),l.a.createElement(O,null),l.a.createElement($,{pocList:se?se.pocList:void 0}),l.a.createElement(p.a,{as:"nav","aria-label":"page",id:"pageNav",gridColumn:"1 / -1",alignSelf:"center",gridGap:{base:"16px",md:"24px"},marginTop:{md:"72"},size:"full",height:48,gridTemplateColumns:{base:"repeat(12, 1fr)",md:"repeat(14, 1fr)",lg:"repeat(12, 1fr)"}},W?l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"6 / 9",sm:"9 / 11",md:"1 / 2"},gridRow:1,justifySelf:"center",alignSelf:"center"},l.a.createElement(m.p,{type:"button",onClick:function(){G("/event"),ne()}},"Cancel")),l.a.createElement(b.a,{gridColumn:{base:"9 / -1",sm:"11 / -1",md:"2 / 3"},gridRow:1},l.a.createElement(m.a,{type:"submit",size:"full"},"Save"))):l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"10 / 15",lg:"10 / 13"},gridRow:{md:"1"}},l.a.createElement(m.a,{type:"submit",size:"full"},"Create New Location")),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"5 / 10",lg:"7 / 10"},gridRow:{md:"1"}},l.a.createElement(m.a,{size:"full",buttonType:"secondary",type:"submit",onClick:function(){return ee(!0)}},"Create and Add Another")),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 2"},gridRow:{md:"1"},justifySelf:"center",alignSelf:"center"},l.a.createElement(m.p,{type:"button",onClick:function(){G("/addLocation"),ne()}},"Cancel")))),l.a.createElement(_.a,{isOpen:ae,onClose:le,onLeave:function(){var e;if("/event"===V)e={eventId:P,formSection:"locations"};else{var t=Object(o.a)("ctfForms","events");e={savedEvent:t&&t.find((function(e){return e.eventId===P}))}}Object(s.a)(V,{state:e})}}),l.a.createElement(X.a,{isOpen:ie,onClose:de,message:Z?"Creating new location.":"Saving location."}))))};t.default=function(e){var t,a,n,r,u;if(null===(t=e.location)||void 0===t||null===(a=t.state)||void 0===a?void 0:a.eventLklId){var s,c=Object(o.a)("ctfForms","events"),m=c&&c.find((function(t){var a,n;return t.eventId===(null===(a=e.location)||void 0===a||null===(n=a.state)||void 0===n?void 0:n.eventId)}));(u=null==m||null===(s=m.eventLklDtoList)||void 0===s?void 0:s.find((function(t){var a,n;return t.eventLklId===(null===(a=e.location)||void 0===a||null===(n=a.state)||void 0===n?void 0:n.eventLklId)})))&&(u.createdDateTime&&(u.createdDateTime=i()(u.createdDateTime).toDate()),u.lastUpdatedDateTime&&(u.lastUpdatedDateTime=i()(u.lastUpdatedDateTime).toDate()))}var v=void 0===u?"create":"edit";return l.a.createElement(d.a,{formMode:v},l.a.createElement(te,{eventId:null===(n=e.location)||void 0===n||null===(r=n.state)||void 0===r?void 0:r.eventId,savedForm:u}))}},jgTY:function(e,t,a){"use strict";var n=a("8OQS"),l=a.n(n),r=a("pVnL"),i=a.n(r),o=a("qKvR"),d=a("q1tI"),u=a("BMxC"),s=a("we/t"),c=a("mf32"),m=function(e){var t=Object(c.b)().colorMode;return Object(o.d)(u.a,i()({as:"span",ml:1,color:{light:"red.500",dark:"red.300"}[t],"aria-hidden":"true",children:"*"},e))},v=Object(d.forwardRef)((function(e,t){var a=e.children,n=l()(e,["children"]),r=Object(s.b)(n);return Object(o.d)(u.a,i()({ref:t,fontSize:"md",pr:"12px",pb:"4px",opacity:r.isDisabled?"0.4":"1",fontWeight:"medium",textAlign:"left",verticalAlign:"middle",display:"inline-block",as:"label"},n),a,r.isRequired&&Object(o.d)(m,null))}));v.displayName="FormLabel",t.a=v},qiow:function(e,t,a){"use strict";a("91GP");var n=a("q1tI"),l=a.n(n),r=a("Weur"),i=a("BMxC"),o=a("eJLp"),d=a("ggNy"),u={default:{bg:"badge",color:"white",border:"none"},hoverFocus:{borderStyle:"solid",borderWidth:"2",borderColor:"accent"},active:{bg:"#a30014",border:"none"}};t.a=function(e){var t=e.isOpen,a=e.onCancel,n=e.onConfirm,s=e.locationName,c=e.isActivate,m=c?"Activate":"Deactivate";return l.a.createElement(d.q,{isOpen:t,onClose:a,isCentered:!0,size:"sm"},l.a.createElement(d.u,null,l.a.createElement(d.m,null,m," Last Known Location?")),l.a.createElement(d.s,null),l.a.createElement(d.r,null,l.a.createElement(d.v,null,"Are you sure you want to ",m.toLocaleLowerCase()," ",null!=s?s:"this last known location?","?")),l.a.createElement(d.t,null,l.a.createElement(r.a,{align:"center"},l.a.createElement(i.a,{marginRight:"20"},l.a.createElement(d.p,{onClick:a},"Cancel")),void 0===c?l.a.createElement(d.a,{size:"sm",onClick:n},"YES"):c?l.a.createElement(d.a,{size:c?"md":"sm",onClick:n},m):l.a.createElement(o.a,Object.assign({height:"input",width:"buttonMd",textAlign:"center",borderRadius:0,fontFamily:"body",fontSize:"button",fontWeight:"button",px:20,py:12},u.default,{_focus:u.hoverFocus,_hover:u.hoverFocus,_active:u.active,onClick:n}),l.a.createElement(i.a,{flex:"1 1 0",lineHeight:"normal"},m)))))}},"we/t":function(e,t,a){"use strict";a.d(t,"b",(function(){return s}));a("DNiP"),a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V");var n=a("pVnL"),l=a.n(n),r=a("8OQS"),i=a.n(r),o=a("qKvR"),d=a("q1tI"),u=a("BMxC"),s=function(e){var t=m();return t?Object.keys(t).reduce((function(a,n){return a[n]=e[n],t&&null==e[n]&&(a[n]=t[n]),a}),{}):e},c=Object(d.createContext)(),m=function(){return Object(d.useContext)(c)},v=Object(d.forwardRef)((function(e,t){var a=e.isInvalid,n=e.isRequired,r=e.isDisabled,d=e.isReadOnly,s=i()(e,["isInvalid","isRequired","isDisabled","isReadOnly"]),m={isRequired:n,isDisabled:r,isInvalid:a,isReadOnly:d};return Object(o.d)(c.Provider,{value:m},Object(o.d)(u.a,l()({role:"group",ref:t},s)))}));v.displayName="FormControl",t.a=v},wsxo:function(e){e.exports=JSON.parse('[{"label":"California","value":"CA"},{"label":"Florida","value":"FL"},{"label":"Virginia","value":"VA"},{"label":"Texas","value":"TX"}]')}}]);
//# sourceMappingURL=component---src-pages-new-location-tsx-d2aa234f686dcf99c2b5.js.map