(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"6E47":function(e){e.exports=JSON.parse('[{"label":"Airport","value":"airport"},{"label":"Bus Station","value":"busStation"},{"label":"Church","value":"church"},{"label":"Home","value":"home"},{"label":"Hospital","value":"hospital"},{"label":"Hotel","value":"hotel"},{"label":"Other","value":"other"},{"label":"Other GOvernment Facility (non-U.S.)","value":"otherGov"},{"label":"Port","value":"port"},{"label":"Restaurant","value":"restaurant"},{"label":"Stadium","value":"stadium"},{"label":"Train Station","value":"trainStation"},{"label":"UN Facility","value":"unFacility"},{"label":"USG Facility","value":"usgFacility"},{"label":"School","value":"school"}]')},QWZw:function(e){e.exports=JSON.parse('[{"label":"Home","value":"HOME"},{"label":"Mobile","value":"MOBILE"},{"label":"Work","value":"WORK"},{"label":"Other","value":"OTHER"}]')},"WL++":function(e){e.exports=JSON.parse('[{"label":"Home","value":"HOME"},{"label":"Work","value":"WORK"},{"label":"Other","value":"OTHER"}]')},e4wl:function(e,t,a){"use strict";a.r(t);a("dRSK");var n=a("q1tI"),l=a.n(n),r=a("wd/R"),i=a.n(r),o=a("nB9M"),d=a("GUiF"),u=(a("INYr"),a("soUV")),c=a("Wbzz"),s=a("NKCw"),m=a("ggNy"),v=a("XZ7F"),p=a("69N/"),b=a("BMxC"),f=(a("f3/d"),a("a1Th"),a("Btvt"),a("XfO3"),a("HEwt"),a("rGqo"),a("rE2o"),a("ioFf"),a("Oyvg"),a("pIFo"),a("Vd3H"),a("qiow")),g=a("ENWW"),h=a("91Jw"),E=a("wsxo"),y=a("6E47");function C(e){return function(e){if(Array.isArray(e))return L(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return L(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var O=function(e){e.target.value=e.target.value.replace(/^[^A-Za-z0-9]+/,"")},A=function(e,t){if(!e)return!0;var a=RegExp(/^([-+]?)([\d]{1,3})([.]?)([\d]*)$/),n=parseFloat(e)>=-t&&parseFloat(e)<=t;return a&&n},T=function(){var e,t,a,r,i=Object(s.d)(),o=i.trigger,u=i.register,c=i.errors,L=i.setValue,T=i.getValues,I=i.formState,j=Object(d.e)(),x=(j.isEdit,j.isView),R=Object(v.a)(),S=R.isOpen,k=R.onOpen,w=R.onClose,D=I.dirtyFields,N=Object(n.useRef)(null),z=Object(n.useRef)(null),F=Object(n.useRef)(null),q=Object(n.useRef)(null),P=Object(n.useRef)(null),M=Object(s.e)({name:"country"}),B=Object(s.e)({name:"longitude"}),V=Object(s.e)({name:"latitude"}),H=Object(s.e)({name:"streetAddress"}),W=Object(s.e)({name:"city"}),Z=Object(n.useMemo)((function(){var e=g.filter((function(e,t){return t%5==0}));return e.push({label:"UNITED STATES OF AMERICA",value:"USA"}),e.push({label:"JAPAN",value:"JPN"}),e.sort((function(e,t){return e.label.localeCompare(t.label)})),e}),[]),U=([{label:" ",value:void 0}].concat(C(y.sort((function(e,t){return e.label.localeCompare(t.label)})))),x),G=l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 3",lg:"span 7"}},l.a.createElement(m.i,{labelText:"State",labelId:"stateLabel",required:!0},l.a.createElement(s.a,{name:"stateCd",rules:{required:"Please select a State"},onFocus:function(){var e;return null===(e=F.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:F,id:"stateCd",name:"stateCd","aria-labelledby":"stateLabel",options:E,size:"full",disabled:U,validationState:(null==c?void 0:c.stateCd)?m.A.ERROR:void 0,errorMessage:null==c||null===(t=c.stateCd)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){(null==D?void 0:D.stateCd)&&n()},value:r})}}))),K=l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 3",lg:"span 7"}},l.a.createElement(m.i,{labelText:"Province",labelId:"provinceLabel"},l.a.createElement(m.y,{ref:u,id:"province",name:"province",size:"full",disabled:U,onChange:O,maxLength:50})));return l.a.createElement(d.c,{title:"",showDivider:!0},l.a.createElement(p.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"1 / 9"},gridGap:{base:"16px",md:"24px"},gridTemplateColumns:{base:"1",md:"repeat(12,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 11"}},l.a.createElement(m.i,{labelText:"Location Title",labelId:"lklTitleLabel",required:!0},l.a.createElement(m.y,{id:"lklTitle",name:"lklTitle",size:"full",disabled:U,onChange:O,validationState:(null==c?void 0:c.lklTitle)?m.A.ERROR:void 0,errorMessage:null==c||null===(e=c.lklTitle)||void 0===e?void 0:e.message,ref:u({required:"Please enter a Location Title",maxLength:{value:50,message:"Location Title cannot exceed 25 characters"}}),maxLength:50}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 1"}},l.a.createElement(m.i,{labelText:"Active",labelId:"activeIndicatorLabel"},l.a.createElement(m.x,{id:"activeIndicator",name:"activeIndicator",disabled:U,value:"Active",ref:u,onChange:function(e){e.target.checked?L("activeIndicator",!1):L("activeIndicator",!0),k()}}))),l.a.createElement(f.a,{isOpen:S,onCancel:w,isActivate:!T("activeIndicator"),onConfirm:function(){L("activeIndicator",!T("activeIndicator")),w()}})),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 4",lg:"1 / 5"}},l.a.createElement(m.i,{labelText:"Country",labelId:"countryLabel",required:!0},l.a.createElement(s.a,{name:"country",rules:{required:"Please select a Country"},onFocus:function(){var e;return null===(e=N.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:N,id:"country",name:"country","aria-labelledby":"countryLabel",options:Z,size:"full",disabled:U,validationState:(null==c?void 0:c.country)?m.A.ERROR:void 0,errorMessage:null==c||null===(t=c.country)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value),L("post","")},onBlur:function(){(null==D?void 0:D.country)&&n()},value:r,placeholder:"Type to filter countries"})}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"4 / 7",lg:"span 4"}},l.a.createElement(m.i,{labelText:"Post",labelId:"postLabel",required:!0},l.a.createElement(s.a,{name:"post",rules:{required:"Please select a Post"},onFocus:function(){var e;return null===(e=z.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:z,id:"post",name:"post","aria-labelledby":"postLabel",options:h.filter((function(e){return e.country_cd===M})),size:"full",disabled:!!U||!M,validationState:(null==c?void 0:c.post)?m.A.ERROR:void 0,errorMessage:null==c||null===(t=c.post)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){(null==D?void 0:D.post)&&n()},value:r,placeholder:""})}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 8"}},l.a.createElement(m.i,{labelText:"Street Address",labelId:"streetAddressLabel"},l.a.createElement(m.y,{id:"streetAddress",name:"streetAddress",size:"full",disabled:U,onChange:function(e){O(e)},onBlur:function(){return o("city")},maxLength:200,ref:u}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 8"}},l.a.createElement(m.i,{labelText:"Apartment, Suite, Other",labelId:"additionalAddressLabel"},l.a.createElement(m.y,{ref:u,id:"additionalAddress",name:"additionalAddress",size:"full",disabled:U,onChange:O,maxLength:200}))),l.a.createElement(p.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"1 / 9"},gridGap:{base:"16px",md:"24px"},gridTemplateColumns:{base:"repeat(4,1fr)",md:"repeat(8,1fr)",lg:"repeat(22,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"span 3",lg:"span 11"}},l.a.createElement(m.i,{labelText:"City",labelId:"cityLabel"},l.a.createElement(m.y,{id:"city",name:"city",size:"full",disabled:U,validationState:(null==c?void 0:c.city)?m.A.ERROR:void 0,errorMessage:null==c||null===(t=c.city)||void 0===t?void 0:t.message,onChange:function(e){O(e)},maxLength:30,ref:u({required:!(!H||W)&&"City also required with Street Address"})}))),"USA"===M?G:K,l.a.createElement(b.a,{gridColumn:{base:"1 / 2",md:"span 2",lg:"span 4"}},l.a.createElement(m.i,{labelText:"Postal Code",labelId:"postalCodeLabel"},l.a.createElement(m.y,{ref:u,id:"postalCode",name:"postalCode",size:"full",disabled:U,onChange:O,maxLength:10})))),l.a.createElement(b.a,{gridColumn:{base:"1 / 3",md:"1 / 4",lg:"1 / 3"}},l.a.createElement(m.i,{labelText:"Longitude",labelId:"longitudeLabel"},l.a.createElement(m.y,{id:"longitude",name:"longitude",size:"full",disabled:U,validationState:(null==c?void 0:c.longitude)?m.A.ERROR:void 0,errorMessage:null==c||null===(a=c.longitude)||void 0===a?void 0:a.message,onBlur:function(){o("latitude")},ref:u({validate:function(e){return!!A(e,180)||"Invalid input"},required:!(!V||B)&&"Longitude value also required"})}))),l.a.createElement(b.a,{gridColumn:{base:"3 / 5",md:"4 / 7",lg:"span 2"}},l.a.createElement(m.i,{labelText:"Latitude",labelId:"latitudeLabel"},l.a.createElement(m.y,{id:"latitude",name:"latitude",size:"full",disabled:U,validationState:(null==c?void 0:c.latitude)?m.A.ERROR:void 0,errorMessage:null==c||null===(r=c.latitude)||void 0===r?void 0:r.message,onBlur:function(){o("longitude")},ref:u({validate:function(e){return!!A(e,90)||"Invalid input"},required:!(!B||V)&&"Latitude value also required"})}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 4"}},l.a.createElement(m.i,{labelText:"Location Type",labelId:"locationTypeLabel"},l.a.createElement(s.a,{name:"locationType",onFocus:function(){var e;return null===(e=q.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.w,{ref:q,id:"locationType",name:"locationType","aria-labelledby":"locationTypeLabel",options:y,size:"full",disabled:U,validationState:(null==c?void 0:c.locationType)?m.A.ERROR:void 0,errorMessage:null==c||null===(t=c.locationType)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){(null==D?void 0:D.locationType)&&n()},value:r,placeholder:""})}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7",lg:"span 8"}},l.a.createElement(m.i,{labelText:"Description",labelId:"descriptionLabel"},l.a.createElement(s.a,{name:"locationDesc",rules:{pattern:{value:/^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,message:"Please enter only plain text in the Description field"},maxLength:{value:500,message:"Description cannot exceed 500 characters"}},onFocus:function(){var e;return null===(e=P.current)||void 0===e?void 0:e.focus()},render:function(e){var t,a=e.onChange,n=e.onBlur,r=e.value;return l.a.createElement(m.z,{ref:P,id:"locationDesc",name:"locationDesc","aria-labelledby":"descriptionLabel",size:"full",maxLength:500,disabled:U,validationState:(null==c?void 0:c.locationDesc)?m.A.ERROR:void 0,errorMessage:null==c||null===(t=c.locationDesc)||void 0===t?void 0:t.message,onChange:function(e){e.target.value=Object(d.d)(e.target.value).replace(/[^A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/g,""),a(e)},onBlur:n,value:r})}}))))},I=(a("Z2Ku"),a("L9s1"),a("yt8O"),a("hhXQ"),a("LYUY")),j=Object(I.a)(l.a.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),x=Object(I.a)(l.a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),R=(a("RW0V"),a("91GP"),a("we/t")),S=a("jgTY"),k=a("sK1y");var w=function(e){var t,a=e.labelText,l=e.labelId,r=e.children,i=e.required,o=e.icon,d=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,["labelText","labelId","children","required","icon"]);return n.createElement(R.a,null,n.createElement(S.a,{id:l,fontFamily:"body",fontSize:"label",fontWeight:"normal",pb:0,color:"label",display:"block",lineHeight:"label"},i&&n.createElement(k.a,{color:"required",as:"span"},"* "),o&&n.createElement(b.a,{position:"absolute",as:o,mr:4,color:"label"}),n.createElement(k.a,{m:0,ml:28},a)),n.cloneElement(r,Object.assign({required:i,"aria-labelledby":(l+" "+(null!==(t=r.props["aria-labelledby"])&&void 0!==t?t:"")).trim()},d)))},D=(a("KKXr"),Object(I.a)(l.a.createElement("path",{d:"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}),"Email")),N=Object(I.a)(l.a.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"}),"AddCircle"),z=Object(I.a)(l.a.createElement("path",{d:"M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"HighlightOff"),F=a("WL++"),q=new RegExp(["^(?:",'(?:(?:"[A-Za-z0-9!#&\'+\\-/?_`{}~.]*")|',"(?:[A-Za-z0-9!#&'+\\-/?_`{}~]+(?:\\.?[A-Za-z0-9!#&'+\\-/?_`{}~])*))","@","(?:(?:[A-Za-z0-9]{1,63}\\.)|(?:[A-Za-z0-9][A-Za-z0-9\\-]{1,61}[A-Za-z0-9]\\.))+","(?:(?:[A-Za-z0-9]-*)*[A-Za-z](?:-*[A-Za-z0-9])*)",")$"].join("")),P=function(e){var t,a,n,r=e.namePrefix,i=e.addable,o=e.isFirst,u=e.onEmptyEmail,c=e.triggerAllFields,v=e.onAdd,f=e.onRemove,g=Object(d.e)().isView,h=Object(s.d)(),E=h.errors,y=h.formState,C=h.register,L=y.dirtyFields,O=r.split("-"),A=O[0],T=O[1],I=O[2],j=O[3],x=function(e){return A+"["+T+"]["+I+"]["+j+"]["+e+"]"},R=x("emailAddress"),S=x("emailType"),k=Object(s.e)({name:R}),P=Object(s.e)({name:S}),M=E&&E.pocList&&E.pocList[+T]?E.pocList[+T]:null,B=M&&M.emailList?M.emailList[+j]:null,V=L&&L.pocList&&L.pocList[+T]?L.pocList[+T]:null,H=V&&V.emailList?V.emailList[+j]:null,W=void 0===(null==B?void 0:B.emailAddress)&&void 0===(null==B?void 0:B.emailType),Z=void 0!==(null==H?void 0:H.emailAddress)&&void 0!==(null==H?void 0:H.emailType),U=W&&(!u||Z)&&i&&!g,G=""!==(null==B||null===(t=B.emailType)||void 0===t?void 0:t.message)&&void 0!==(null==B||null===(a=B.emailType)||void 0===a?void 0:a.message);return l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"1 / -1",sm:"1 / 9",md:"1 / 7"}},l.a.createElement(w,{labelText:"Email Address",labelId:"emailAddressLabel",icon:D},l.a.createElement(m.y,{ref:C({required:!(!P||k)&&"Email Address is required",pattern:{value:q,message:"Please enter valid email in the field"}}),id:R,name:R,size:"full",disabled:g,validationState:(null==B?void 0:B.emailAddress)?m.A.ERROR:void 0,errorMessage:null==B||null===(n=B.emailAddress)||void 0===n?void 0:n.message,maxLength:67,onBlur:function(){c()}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / 13",sm:"9 / 13 ",md:"7 / 13"}},l.a.createElement(p.a,{gridColumn:{base:"1 / -1"},gridGap:{base:"8px",md:"16px"},gridTemplateColumns:{base:"repeat(12,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / 12"}},l.a.createElement(m.i,{labelText:"Type",labelId:"emailTypeLabel"},l.a.createElement(s.a,{name:S,rules:{required:!(!k||P)&&"Email Type is required"},render:function(e){var t,a=e.onChange,n=e.value;return l.a.createElement(m.w,{id:S,name:S,"aria-labelledby":"emailTypeLabel",options:F,size:"full",disabled:g,validationState:(null==B?void 0:B.emailType)?m.A.ERROR:void 0,errorMessage:null==B||null===(t=B.emailType)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){c()},value:n})}}))),l.a.createElement(b.a,{gridColumn:{base:"12 / 13"},alignSelf:"center",justifySelf:"center"},o?l.a.createElement(b.a,{mt:W?32:G?0:32,as:N,cursor:U?"pointer":"cursor",color:U?"clickable":"disabledInputText",onClick:function(){U&&v()}}):l.a.createElement(b.a,{mt:W?32:G?0:32,as:z,cursor:g?"cursor":"pointer",color:g?"disabledInputText":"clickable",onClick:function(){g||f()}})))))},M=Object(I.a)(l.a.createElement("path",{d:"M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"}),"Phone"),B=a("QWZw"),V=/^([+]?\d{1,2}[.-\s]?)?(\(?\d{3}\)?[\s.-]?){2}\d{4}$/,H=function(e){var t,a,n,r=e.namePrefix,i=e.isFirst,o=e.addable,u=e.onEmptyPhone,c=e.onPhoneNumberChange,v=e.triggerAllFields,f=e.onAdd,g=e.onRemove,h=Object(d.e)().isView,E=Object(s.d)(),y=E.errors,C=E.formState,L=E.register,O=C.dirtyFields,A=r.split("-"),T=A[0],I=A[1],j=A[2],x=A[3],R=function(e){return T+"["+I+"]["+j+"]["+x+"]["+e+"]"},S=R("phoneNum"),k=R("phoneTypeCd"),D=Object(s.e)({name:S}),F=Object(s.e)({name:k}),q=y&&y.pocList&&y.pocList[+I]?y.pocList[+I]:null,P=q&&q.phoneList?q.phoneList[+x]:null,H=O&&O.pocList&&O.pocList[+I]?O.pocList[+I]:null,W=H&&H.phoneList?H.phoneList[+x]:null,Z=void 0===(null==P?void 0:P.phoneNum)&&void 0===(null==P?void 0:P.phoneTypeCd),U=(null==W?void 0:W.phoneNum)&&(null==W?void 0:W.phoneTypeCd),G=Z&&(!u||U)&&o&&!h,K=void 0!==(null===(t=y[k])||void 0===t?void 0:t.message)&&""!==(null===(a=y[k])||void 0===a?void 0:a.message);return l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"1 / -1",sm:"1 / 9",md:"1 / 7"}},l.a.createElement(w,{labelText:"Phone Number",labelId:"phoneNumberLabel",icon:M},l.a.createElement(m.y,{ref:L({required:!(!F||D)&&"Phone Number is required",pattern:{value:V,message:"Please enter valid phone number in the field"}}),id:S,name:S,size:"full",disabled:h,validationState:(null==P?void 0:P.phoneNum)?m.A.ERROR:void 0,errorMessage:null==P||null===(n=P.phoneNum)||void 0===n?void 0:n.message,onChange:c,maxLength:30,onBlur:function(){v()}}))),l.a.createElement(b.a,{gridColumn:{base:"1 / 13",sm:"9 / 13 ",md:"7 / 13"}},l.a.createElement(p.a,{gridColumn:{base:"1 / -1"},gridGap:{base:"8px",md:"16px"},gridTemplateColumns:{base:"repeat(12,1fr)"}},l.a.createElement(b.a,{gridColumn:{base:"1 / 12"}},l.a.createElement(m.i,{labelText:"Type",labelId:"phoneTypeLabel"},l.a.createElement(s.a,{name:k,rules:{required:!(!D||F)&&"Phone Type is required"},render:function(e){var t,a=e.onChange,n=e.value;return l.a.createElement(m.w,{id:k,name:k,"aria-labelledby":"phoneTypeLabel",options:B,size:"full",disabled:h,validationState:(null==P?void 0:P.phoneTypeCd)?m.A.ERROR:void 0,errorMessage:null==P||null===(t=P.phoneTypeCd)||void 0===t?void 0:t.message,onChange:function(e){var t;a(null===(t=e.selectedItem)||void 0===t?void 0:t.value)},onBlur:function(){v()},value:n})}}))),l.a.createElement(b.a,{gridColumn:{base:"12 / 13"},alignSelf:"center",justifySelf:"center"},i?l.a.createElement(b.a,{mt:Z?32:K?0:32,as:N,cursor:G?"pointer":"cursor",color:G?"clickable":"disabledInputText",onClick:function(){G&&f()}}):l.a.createElement(b.a,{mt:Z?32:K?0:32,as:z,cursor:h?"cursor":"pointer",color:h?"disabledInputText":"clickable",onClick:function(){h||g()}})))))};function W(e){return function(e){if(Array.isArray(e))return Z(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return Z(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Z(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var U=["phoneDto0","phoneDto1","phoneDto2"],G=["emailDto0","emailDto1","emailDto2"],K=function(e){var t,a,r=e.pocIndex,i=e.initialEmailList,o=e.initialPhoneList,u=e.onRemove,c=Object(d.e)().isView,v=Object(s.d)(),f=v.errors,g=v.setError,h=v.clearErrors,E=v.register,y=v.watch,C=v.trigger,L=c,O="pocList["+r+"]",A=f.pocList?null===(t=f.pocList[r])||void 0===t?void 0:t.givenName:void 0,T=f.pocList?null===(a=f.pocList[r])||void 0===a?void 0:a.surName:void 0,I=Object(n.useState)([O+"[givenName]",O+"[surName]"]),R=I[0],S=(I[1],Object(n.useState)([O+"[phoneList][0][phoneNum]",O+"[phoneList][0][phoneTypeCd]",O+"[emailList][0][emailAddress]",O+"[emailList][0][emailType]"])),k=S[0],D=S[1],N=Object(n.useState)(o.length>0?o.map((function(e,t){return"phoneDto"+t})):["phoneDto0"]),z=N[0],F=N[1],q=Object(n.useState)(i.length>0?i.map((function(e,t){return"emailDto"+t})):["emailDto0"]),M=q[0],B=q[1],V=function(){return Object.values(y(R)).every((function(e){return void 0===e||""===e}))},Z=function(){return Object.values(y(k)).every((function(e){return void 0===e||""===e}))},K=function(e){e.target.value=e.target.value.replace(/^[^A-Za-z0-9]+/,"")},J=function(e){e.target.value.length>0?Z()?k.forEach((function(e){return g(e,{type:"manual",message:""})})):C(R):Z()?h(k):C(R)},$=function(){C([].concat(W(k),W(R)))};return l.a.createElement(b.a,{position:"relative"},0!==r&&l.a.createElement(b.a,{as:j,m:8,right:0,position:"absolute",cursor:c?"cursor":"pointer",color:c?"disabledInputText":"text",onClick:function(){c||u()}}),l.a.createElement(p.a,{border:"1px",borderStyle:"solid",borderColor:"lightGray",gridColumn:{base:"1 / -1",md:"1 / 9"},gridGap:{base:"16px",md:"24px"},padding:{base:"16px",md:"24px"},gridTemplateColumns:{base:"repeat(12,1fr)"}},l.a.createElement("input",{ref:E,type:"text",name:O+"[personId]",hidden:!0,defaultValue:"person"+r}),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 7"}},l.a.createElement(w,{labelText:"First Name",labelId:"firstNameLabel",icon:x},l.a.createElement(m.y,{ref:E({required:!(Z()||!V())&&"First Name is required"}),id:"givenName",name:O+"[givenName]",size:"full",disabled:L,validationState:A?m.A.ERROR:void 0,errorMessage:null==A?void 0:A.message,onChange:K,onBlur:J,maxLength:33}))),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"7 / -1"}},l.a.createElement(m.i,{labelText:"Last Name",labelId:"lastNameLabel"},l.a.createElement(m.y,{ref:E({required:!(Z()||!V())&&"Last Name is required"}),id:"surName",name:O+"[surName]",size:"full",disabled:L,validationState:T?m.A.ERROR:void 0,errorMessage:null==T?void 0:T.message,onChange:K,onBlur:J,maxLength:33}))),M.map((function(e,t){var a=e.charAt(e.length-1),n=M.length<3&&0===t;return l.a.createElement(P,{key:O+"-"+e,namePrefix:"pocList-"+r+"-emailList-"+a,isFirst:0===t,addable:n,onEmptyEmail:0===i.length,triggerAllFields:$,onAdd:function(){return e=G.filter((function(e){return!M.includes(e)})),B((function(t){return e.length>0?[].concat(W(t),[e[0]]):t})),void D((function(t){var a=e[0].charAt(e[0].length-1);return[].concat(W(t),[O+"[emailList]["+a+"][emailAddress]",O+"[emailList]["+a+"][emailType]"])}));var e},onRemove:function(){var t,a;a=(t=e).charAt(t.length-1),B((function(e){return e.filter((function(e){return e!==t}))})),D((function(e){return e.filter((function(e){return!(e===O+"[emailList]["+a+"][emailType]"||e===O+"[emailList]["+a+"][emailAddress]")}))}))}})})),z.map((function(e,t){var a=e.charAt(e.length-1),n=z.length<3&&0===t;return l.a.createElement(H,{key:O+"-"+e,namePrefix:"pocList-"+r+"-phoneList-"+a,isFirst:0===t,addable:n,onEmptyPhone:0===o.length,onPhoneNumberChange:K,triggerAllFields:$,onAdd:function(){return e=U.filter((function(e){return!z.includes(e)})),F((function(t){return e.length>0?[].concat(W(t),[e[0]]):t})),void D((function(t){var a=e[0].charAt(e[0].length-1);return[].concat(W(t),[O+"[phoneList]["+a+"][phoneNum]",O+"[phoneList]["+a+"][phoneTypeCd]"])}));var e},onRemove:function(){var t,a;a=(t=e).charAt(t.length-1),F((function(e){return e.filter((function(e){return e!==t}))})),D((function(e){return e.filter((function(e){return!(e===O+"[phoneList]["+a+"][phoneNum]"||e===O+"[phoneList]["+a+"][phoneTypeCd]")}))}))}})}))))};function J(e){return function(e){if(Array.isArray(e))return $(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return $(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return $(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var _=function(e){var t=e.pocList,a=Object(d.e)().isView,r=Object(n.useState)(t?0===t.length?1:t.length:1),i=r[0],o=r[1],u=Object(n.useState)((function(){return t&&t.length>0?t.map((function(e,t){return"poc"+t})):["poc0"]})),c=u[0],s=u[1];return l.a.createElement(d.c,{title:"Point Of Contact",showDivider:!1},l.a.createElement(b.a,{gridColumn:"1 / -1"},l.a.createElement(m.v,null,"Enter a point of contact at this location.")),c.map((function(e){var a=e.charAt(e.length-1),n=t&&t[+a]&&0===t[+a].emailList.length,r=t&&t[+a]&&0===t[+a].phoneList.length;return l.a.createElement(b.a,{key:e,gridColumn:{base:"1 / -1",md:"1 / 7",lg:"1 / 9"}},l.a.createElement(K,{pocIndex:+a,initialEmailList:t&&t[+a]&&!n?t[+a].emailList:[],initialPhoneList:t&&t[+a]&&!r?t[+a].phoneList:[],onRemove:function(){s(c.filter((function(t){return t!==e})))}}))})),!a&&l.a.createElement(b.a,{gridColumn:"1 / -1"},l.a.createElement(m.o,{onClick:function(){s((function(e){return[].concat(J(e),["poc"+i])})),o(i+1)}},"Add Another Point of Contact")))},X=a("BXVe"),Y=function e(t,a,n){for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&("object"==typeof t[l]&&e(t[l],a,n),l===a&&(t[""+a]=n))},Q=function(e){var t,a,r,i,f,g,h,E,y,C,L,O,A,I,j,x,R,S,k,w,D,N,z,F,q=e.eventId,P=e.savedForm,M=Object(d.e)(),B=M.isEdit,V=M.isView,H=Object(o.b)("ctfForms","events")[1],W=Object(v.a)(),Z=W.isOpen,U=W.onOpen,G=W.onClose,K=P?(r=(a=null!=(t=P)?t:{}).activeIndicator,i=a.lookupLklDto,g=(f=null!=i?i:{}).lklTitle,h=f.locationDesc,E=f.postCd,y=f.lklAddressDto,C=f.lklPocListDto,L=(null!=y?y:{}).addressDto,A=(O=null!=L?L:{}).addressTypeCd,I=O.address1,j=O.address2,x=O.city,R=O.countryCd,S=O.postalCode,k=O.stateCd,w=O.province,D=O.latitude,{lklTitle:g,activeIndicator:r,country:R,post:E,streetAddress:I,additionalAddress:j,city:x,stateCd:k,province:w,postalCode:S,longitude:O.longitude,latitude:D,locationType:A,locationDesc:h,pocList:null==C?void 0:C.map((function(e){var t=e.personDto,a=t.personId,n=t.givenName,l=t.surName,r=t.personEmailDtoList,i=t.personPhoneDtoList,o=r.map((function(e){return{emailAddress:e.emailDto.emailAddress,emailType:"HOME"}}));return{personId:a,givenName:n,surName:l,phoneList:i.map((function(e){var t=e.phoneDto;return{phoneNum:t.phoneNum,phoneTypeCd:t.phoneTypeCd}})),emailList:o}}))}):void 0,J=Object(s.c)({mode:"onBlur",defaultValues:P?K:{lklTitle:"",activeIndicator:!0,pocList:[]}}),$=J.handleSubmit,Q=Object(n.useCallback)((function(e,t){void 0===t&&(t=!1);var a=function(e,t){var a=e.lklTitle,n=e.activeIndicator,l=e.country,r=e.post,i=e.streetAddress,o=e.additionalAddress,d=e.city,u=e.stateCd,c=e.province,s=e.postalCode,m=e.longitude,v=e.latitude,p=e.locationType,b=e.locationDesc,f=e.pocList,g=null==f?void 0:f.filter((function(e){return""!==e.givenName||""!==e.surName})).map((function(e,t){var a=e.emailList.filter((function(e){return""!==e.emailAddress})).map((function(e,t){return{personEmailId:t,emailDto:{emailId:"0",emailAddress:e.emailAddress}}})),n=e.phoneList.filter((function(e){return""!==e.phoneNum})).map((function(e){return{personPhoneId:t,phoneDto:{phoneId:"0",phoneNum:e.phoneNum,phoneTypeCd:e.phoneTypeCd}}})),l={personId:e.personId,givenName:e.givenName,surName:e.surName,personEmailDtoList:a,personPhoneDtoList:n};return{lklPocId:t,personDto:l}})),h={eventId:"",eventLklId:"",activeIndicator:"Active"===n,lklTypeCd:p,createdDateTime:new Date,lastUpdatedDateTime:new Date,lookupLklDto:{lookupLklId:0,lklTitle:a,locationDesc:b,postCd:r,countryCd:l,lklAddressDto:{lklAddressId:"",addressDto:{addressId:"",addressTypeCd:p,latitude:v,longitude:m,address1:i,address2:o,city:d,countryCd:l,postalCode:s,province:c,stateCd:u}},lklPocListDto:g}};return t&&(Y(t,"activeIndicator","Active"===n),Y(t,"lklTitle",a),Y(t,"countryCd",l),Y(t,"postCd",r),Y(t,"address1",i),Y(t,"address2",o),Y(t,"city",d),Y(t,"stateCd",u),Y(t,"province",c),Y(t,"postalCode",s),Y(t,"addressTypeCd",p),Y(t,"longitude",m),Y(t,"latitude",v),Y(t,"locationDesc",b),Y(t,"lklPocListDto",g),Y(t,"lastUpdatedDateTime",new Date)),t||h}(e,P);if(B&&void 0!==P){var n,l,r=Object(o.a)("ctfForms","events"),i=r&&r.find((function(e){return e.eventId===P.eventId})),d=r&&r.findIndex((function(e){return e.eventId===P.eventId})),u=null==i||null===(n=i.eventLklDtoList)||void 0===n?void 0:n.findIndex((function(e){return e.eventId===(null==P?void 0:P.eventId)&&e.eventLklId===P.eventLklId}));if(i&&"number"==typeof u)null===(l=i.eventLklDtoList)||void 0===l||l.splice(u,1,a),r.splice(d,1,i);H(r);var s={eventId:P.eventId,formSection:"locations"};Object(c.a)("/event",{state:s})}}),[H,P,B]);B||V?(N=V?"View Location":"Edit Location",z="Provide as much information as you have for the this location.",F=[{label:"Event",onClick:U},{label:"Edit Location"}]):(N="New Location",z="Provide as much information as you have for the new location.",F=[{label:"Event",onClick:U},{label:"Add Location",onClick:U},{label:"New Location"}]);var ee={eventId:q,formSection:"locations"};return l.a.createElement(u.a,{pageTitle:"Location Details",pageHeading:N,pageDescription:z,breadcrumbs:F},l.a.createElement(s.b,J,l.a.createElement(d.b,{id:"LKLForm",onSubmit:$((function(e){Q(e,!1)}))},l.a.createElement(T,null),l.a.createElement(_,{pocList:K?K.pocList:void 0}),l.a.createElement(p.a,{as:"nav","aria-label":"page",id:"pageNav",gridColumn:"1 / -1",alignSelf:"center",gridGap:{base:"16px",md:"24px"},marginTop:{md:"72"},size:"full",height:48,gridTemplateColumns:{base:"repeat(12, 1fr)",md:"repeat(14, 1fr)",lg:"repeat(12, 1fr)"}},V||B?l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"6 / 9",sm:"9 / 11",md:"1 / 2"},gridRow:1,justifySelf:"center",alignSelf:"center"},l.a.createElement(m.p,{type:"button",onClick:function(){B||V?V?Object(c.a)("/event",{state:ee}):U():Object(c.a)("/addLocation",{state:ee})}},"Cancel")),l.a.createElement(b.a,{gridColumn:{base:"9 / -1",sm:"11 / -1",md:"2 / 3"},gridRow:1},B?l.a.createElement(m.a,{type:"submit",size:"full"},"Save"):l.a.createElement(m.a,{type:"button",size:"full",onClick:function(){var e={eventId:q,eventLklId:null==P?void 0:P.eventLklId,isEdit:!0};Object(c.a)("/newLocation",{state:e})}},"Edit"))):l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"10 / 15",lg:"10 / 13"},gridRow:{md:"1"}},l.a.createElement(m.a,{type:"submit",size:"full",onClick:function(){Object(c.a)("/addLocation")}},"Create New Location")),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"5 / 10",lg:"7 / 10"},gridRow:{md:"1"}},l.a.createElement(m.a,{size:"full",buttonType:"secondary",type:"button",onClick:function(){return Object(c.a)("/newLocation")}},"Create and Add Another")),l.a.createElement(b.a,{gridColumn:{base:"1 / -1",md:"1 / 2"},gridRow:{md:"1"},justifySelf:"center",alignSelf:"center"},l.a.createElement(m.p,{type:"button",onClick:U},"Cancel")))),l.a.createElement(X.a,{isOpen:Z,onClose:G,onLeave:function(){B||V?Object(c.a)("/event",{state:ee}):Object(c.a)("/addLocation",{state:ee})}}))))};t.default=function(e){var t,a,n,r,u,c,s;if(null===(t=e.location)||void 0===t||null===(a=t.state)||void 0===a?void 0:a.eventLklId){var m,v=Object(o.a)("ctfForms","events"),p=v&&v.find((function(t){var a,n;return t.eventId===(null===(a=e.location)||void 0===a||null===(n=a.state)||void 0===n?void 0:n.eventId)}));(s=null==p||null===(m=p.eventLklDtoList)||void 0===m?void 0:m.find((function(t){var a,n;return t.eventLklId===(null===(a=e.location)||void 0===a||null===(n=a.state)||void 0===n?void 0:n.eventLklId)})))&&(s.createdDateTime&&(s.createdDateTime=i()(s.createdDateTime).toDate()),s.lastUpdatedDateTime&&(s.lastUpdatedDateTime=i()(s.lastUpdatedDateTime).toDate()))}var b=void 0===s?"create":(null===(n=e.location)||void 0===n||null===(r=n.state)||void 0===r?void 0:r.isEdit)?"edit":"view";return l.a.createElement(d.a,{formMode:b},l.a.createElement(Q,{eventId:null===(u=e.location)||void 0===u||null===(c=u.state)||void 0===c?void 0:c.eventId,savedForm:s}))}},jgTY:function(e,t,a){"use strict";var n=a("8OQS"),l=a.n(n),r=a("pVnL"),i=a.n(r),o=a("qKvR"),d=a("q1tI"),u=a("BMxC"),c=a("we/t"),s=a("mf32"),m=function(e){var t=Object(s.b)().colorMode;return Object(o.d)(u.a,i()({as:"span",ml:1,color:{light:"red.500",dark:"red.300"}[t],"aria-hidden":"true",children:"*"},e))},v=Object(d.forwardRef)((function(e,t){var a=e.children,n=l()(e,["children"]),r=Object(c.b)(n);return Object(o.d)(u.a,i()({ref:t,fontSize:"md",pr:"12px",pb:"4px",opacity:r.isDisabled?"0.4":"1",fontWeight:"medium",textAlign:"left",verticalAlign:"middle",display:"inline-block",as:"label"},n),a,r.isRequired&&Object(o.d)(m,null))}));v.displayName="FormLabel",t.a=v},qiow:function(e,t,a){"use strict";a("91GP");var n=a("q1tI"),l=a.n(n),r=a("Weur"),i=a("BMxC"),o=a("eJLp"),d=a("ggNy"),u={default:{bg:"badge",color:"white",border:"none"},hoverFocus:{borderStyle:"solid",borderWidth:"2",borderColor:"accent"},active:{bg:"#a30014",border:"none"}};t.a=function(e){var t=e.isOpen,a=e.onCancel,n=e.onConfirm,c=e.locationName,s=e.isActivate,m=s?"Activate":"Deactivate";return l.a.createElement(d.q,{isOpen:t,onClose:a,isCentered:!0,size:"sm"},l.a.createElement(d.u,null,l.a.createElement(d.m,null,m," Last Known Location?")),l.a.createElement(d.s,null),l.a.createElement(d.r,null,l.a.createElement(d.v,null,"Are you sure you want to ",m.toLocaleLowerCase()," ",null!=c?c:"this last known location?","?")),l.a.createElement(d.t,null,l.a.createElement(r.a,{align:"center"},l.a.createElement(i.a,{marginRight:"20"},l.a.createElement(d.p,{onClick:a},"Cancel")),void 0===s?l.a.createElement(d.a,{size:"sm",onClick:n},"YES"):s?l.a.createElement(d.a,{size:s?"md":"sm",onClick:n},m):l.a.createElement(o.a,Object.assign({height:"input",width:"buttonMd",textAlign:"center",borderRadius:0,fontFamily:"body",fontSize:"button",fontWeight:"button",px:20,py:12},u.default,{_focus:u.hoverFocus,_hover:u.hoverFocus,_active:u.active,onClick:n}),l.a.createElement(i.a,{flex:"1 1 0",lineHeight:"normal"},m)))))}},"we/t":function(e,t,a){"use strict";a.d(t,"b",(function(){return c}));a("DNiP"),a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V");var n=a("pVnL"),l=a.n(n),r=a("8OQS"),i=a.n(r),o=a("qKvR"),d=a("q1tI"),u=a("BMxC"),c=function(e){var t=m();return t?Object.keys(t).reduce((function(a,n){return a[n]=e[n],t&&null==e[n]&&(a[n]=t[n]),a}),{}):e},s=Object(d.createContext)(),m=function(){return Object(d.useContext)(s)},v=Object(d.forwardRef)((function(e,t){var a=e.isInvalid,n=e.isRequired,r=e.isDisabled,d=e.isReadOnly,c=i()(e,["isInvalid","isRequired","isDisabled","isReadOnly"]),m={isRequired:n,isDisabled:r,isInvalid:a,isReadOnly:d};return Object(o.d)(s.Provider,{value:m},Object(o.d)(u.a,l()({role:"group",ref:t},c)))}));v.displayName="FormControl",t.a=v},wsxo:function(e){e.exports=JSON.parse('[{"label":"California","value":"CA"},{"label":"Florida","value":"FL"},{"label":"Virginia","value":"VA"},{"label":"Texas","value":"TX"}]')}}]);
//# sourceMappingURL=component---src-pages-new-location-tsx-ae5dc0ad03c020c9a649.js.map