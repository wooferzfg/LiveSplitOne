/*! For license information please see 426.js.LICENSE.txt */
"use strict";(self.webpackChunklivesplit=self.webpackChunklivesplit||[]).push([[426,540],{5287:(e,t)=>{var n=Symbol.for("react.element"),o=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),l=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),p=Symbol.iterator,y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m=Object.assign,g={};function v(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||y}function h(){}function b(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||y}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=v.prototype;var _=b.prototype=new h;_.constructor=b,m(_,v.prototype),_.isPureReactComponent=!0;var E=Array.isArray,T=Object.prototype.hasOwnProperty,C={current:null},I={key:!0,ref:!0,__self:!0,__source:!0};function $(e,t,o){var r,a={},s=null,i=null;if(null!=t)for(r in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(s=""+t.key),t)T.call(t,r)&&!I.hasOwnProperty(r)&&(a[r]=t[r]);var l=arguments.length-2;if(1===l)a.children=o;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];a.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps)void 0===a[r]&&(a[r]=l[r]);return{$$typeof:n,type:e,key:s,ref:i,props:a,_owner:C.current}}function k(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var w=/\/+/g;function S(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function L(e,t,r,a,s){var i=typeof e;"undefined"!==i&&"boolean"!==i||(e=null);var l=!1;if(null===e)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case o:l=!0}}if(l)return s=s(l=e),e=""===a?"."+S(l,0):a,E(s)?(r="",null!=e&&(r=e.replace(w,"$&/")+"/"),L(s,t,r,"",(function(e){return e}))):null!=s&&(k(s)&&(s=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(s,r+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(w,"$&/")+"/")+e)),t.push(s)),1;if(l=0,a=""===a?".":a+":",E(e))for(var c=0;c<e.length;c++){var u=a+S(i=e[c],c);l+=L(i,t,r,u,s)}else if(u=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof u)for(e=u.call(e),c=0;!(i=e.next()).done;)l+=L(i=i.value,t,r,u=a+S(i,c++),s);else if("object"===i)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function R(e,t,n){if(null==e)return e;var o=[],r=0;return L(e,o,"","",(function(e){return t.call(n,e,r++)})),o}function P(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var N={current:null},O={transition:null},x={ReactCurrentDispatcher:N,ReactCurrentBatchConfig:O,ReactCurrentOwner:C};function A(){throw Error("act(...) is not supported in production builds of React.")}t.Children={map:R,forEach:function(e,t,n){R(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return R(e,(function(){t++})),t},toArray:function(e){return R(e,(function(e){return e}))||[]},only:function(e){if(!k(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=v,t.Fragment=r,t.Profiler=s,t.PureComponent=b,t.StrictMode=a,t.Suspense=u,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=x,t.act=A,t.cloneElement=function(e,t,o){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=m({},e.props),a=e.key,s=e.ref,i=e._owner;if(null!=t){if(void 0!==t.ref&&(s=t.ref,i=C.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)T.call(t,c)&&!I.hasOwnProperty(c)&&(r[c]=void 0===t[c]&&void 0!==l?l[c]:t[c])}var c=arguments.length-2;if(1===c)r.children=o;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:n,type:e.type,key:a,ref:s,props:r,_owner:i}},t.createContext=function(e){return(e={$$typeof:l,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=$,t.createFactory=function(e){var t=$.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=k,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:P}},t.memo=function(e,t){return{$$typeof:d,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=O.transition;O.transition={};try{e()}finally{O.transition=t}},t.unstable_act=A,t.useCallback=function(e,t){return N.current.useCallback(e,t)},t.useContext=function(e){return N.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return N.current.useDeferredValue(e)},t.useEffect=function(e,t){return N.current.useEffect(e,t)},t.useId=function(){return N.current.useId()},t.useImperativeHandle=function(e,t,n){return N.current.useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return N.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return N.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return N.current.useMemo(e,t)},t.useReducer=function(e,t,n){return N.current.useReducer(e,t,n)},t.useRef=function(e){return N.current.useRef(e)},t.useState=function(e){return N.current.useState(e)},t.useSyncExternalStore=function(e,t,n){return N.current.useSyncExternalStore(e,t,n)},t.useTransition=function(){return N.current.useTransition()},t.version="18.3.1"},6540:(e,t,n)=>{e.exports=n(5287)},426:(e,t,n)=>{n.r(t),n.d(t,{Bounce:()=>D,Flip:()=>z,Icons:()=>x,Slide:()=>B,ToastContainer:()=>V,Zoom:()=>j,collapseToast:()=>d,cssTransition:()=>f,toast:()=>P,useToast:()=>C,useToastContainer:()=>T});var o=n(6540);function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n)}else for(n in e)e[n]&&(o&&(o+=" "),o+=n);return o}const a=function(){for(var e,t,n=0,o="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o},s=e=>"number"==typeof e&&!isNaN(e),i=e=>"string"==typeof e,l=e=>"function"==typeof e,c=e=>i(e)||l(e)?e:null,u=e=>(0,o.isValidElement)(e)||i(e)||l(e)||s(e);function d(e,t,n){void 0===n&&(n=300);const{scrollHeight:o,style:r}=e;requestAnimationFrame((()=>{r.minHeight="initial",r.height=o+"px",r.transition=`all ${n}ms`,requestAnimationFrame((()=>{r.height="0",r.padding="0",r.margin="0",setTimeout(t,n)}))}))}function f(e){let{enter:t,exit:n,appendPosition:r=!1,collapse:a=!0,collapseDuration:s=300}=e;return function(e){let{children:i,position:l,preventExitTransition:c,done:u,nodeRef:f,isIn:p,playToast:y}=e;const m=r?`${t}--${l}`:t,g=r?`${n}--${l}`:n,v=(0,o.useRef)(0);return(0,o.useLayoutEffect)((()=>{const e=f.current,t=m.split(" "),n=o=>{o.target===f.current&&(y(),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===v.current&&"animationcancel"!==o.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n)}),[]),(0,o.useEffect)((()=>{const e=f.current,t=()=>{e.removeEventListener("animationend",t),a?d(e,u,s):u()};p||(c?t():(v.current=1,e.className+=` ${g}`,e.addEventListener("animationend",t)))}),[p]),o.createElement(o.Fragment,null,i)}}function p(e,t){return null!=e?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const y=new Map;let m=[];const g=new Set,v=e=>g.forEach((t=>t(e))),h=()=>y.size>0;function b(e,t){var n;if(t)return!(null==(n=y.get(t))||!n.isToastActive(e));let o=!1;return y.forEach((t=>{t.isToastActive(e)&&(o=!0)})),o}function _(e,t){u(e)&&(h()||m.push({content:e,options:t}),y.forEach((n=>{n.buildToast(e,t)})))}function E(e,t){y.forEach((n=>{null!=t&&null!=t&&t.containerId?(null==t?void 0:t.containerId)===n.id&&n.toggle(e,null==t?void 0:t.id):n.toggle(e,null==t?void 0:t.id)}))}function T(e){const{subscribe:t,getSnapshot:n,setProps:r}=(0,o.useRef)(function(e){const t=e.containerId||1;return{subscribe(n){const r=function(e,t,n){let r=1,a=0,d=[],f=[],y=[],m=t;const g=new Map,v=new Set,h=()=>{y=Array.from(g.values()),v.forEach((e=>e()))},b=e=>{f=null==e?[]:f.filter((t=>t!==e)),h()},_=e=>{const{toastId:t,onOpen:r,updateId:a,children:s}=e.props,i=null==a;e.staleId&&g.delete(e.staleId),g.set(t,e),f=[...f,e.props.toastId].filter((t=>t!==e.staleId)),h(),n(p(e,i?"added":"updated")),i&&l(r)&&r((0,o.isValidElement)(s)&&s.props)};return{id:e,props:m,observe:e=>(v.add(e),()=>v.delete(e)),toggle:(e,t)=>{g.forEach((n=>{null!=t&&t!==n.props.toastId||l(n.toggle)&&n.toggle(e)}))},removeToast:b,toasts:g,clearQueue:()=>{a-=d.length,d=[]},buildToast:(t,f)=>{if((t=>{let{containerId:n,toastId:o,updateId:r}=t;const a=n?n!==e:1!==e,s=g.has(o)&&null==r;return a||s})(f))return;const{toastId:y,updateId:v,data:E,staleId:T,delay:C}=f,I=()=>{b(y)},$=null==v;$&&a++;const k={...m,style:m.toastStyle,key:r++,...Object.fromEntries(Object.entries(f).filter((e=>{let[t,n]=e;return null!=n}))),toastId:y,updateId:v,data:E,closeToast:I,isIn:!1,className:c(f.className||m.toastClassName),bodyClassName:c(f.bodyClassName||m.bodyClassName),progressClassName:c(f.progressClassName||m.progressClassName),autoClose:!f.isLoading&&(w=f.autoClose,S=m.autoClose,!1===w||s(w)&&w>0?w:S),deleteToast(){const e=g.get(y),{onClose:t,children:r}=e.props;l(t)&&t((0,o.isValidElement)(r)&&r.props),n(p(e,"removed")),g.delete(y),a--,a<0&&(a=0),d.length>0?_(d.shift()):h()}};var w,S;k.closeButton=m.closeButton,!1===f.closeButton||u(f.closeButton)?k.closeButton=f.closeButton:!0===f.closeButton&&(k.closeButton=!u(m.closeButton)||m.closeButton);let L=t;(0,o.isValidElement)(t)&&!i(t.type)?L=(0,o.cloneElement)(t,{closeToast:I,toastProps:k,data:E}):l(t)&&(L=t({closeToast:I,toastProps:k,data:E}));const R={content:L,props:k,staleId:T};m.limit&&m.limit>0&&a>m.limit&&$?d.push(R):s(C)?setTimeout((()=>{_(R)}),C):_(R)},setProps(e){m=e},setToggle:(e,t)=>{g.get(e).toggle=t},isToastActive:e=>f.some((t=>t===e)),getSnapshot:()=>m.newestOnTop?y.reverse():y}}(t,e,v);y.set(t,r);const a=r.observe(n);return m.forEach((e=>_(e.content,e.options))),m=[],()=>{a(),y.delete(t)}},setProps(e){var n;null==(n=y.get(t))||n.setProps(e)},getSnapshot(){var e;return null==(e=y.get(t))?void 0:e.getSnapshot()}}}(e)).current;r(e);const a=(0,o.useSyncExternalStore)(t,n,n);return{getToastToRender:function(e){if(!a)return[];const t=new Map;return a.forEach((e=>{const{position:n}=e.props;t.has(n)||t.set(n,[]),t.get(n).push(e)})),Array.from(t,(t=>e(t[0],t[1])))},isToastActive:b,count:null==a?void 0:a.length}}function C(e){const[t,n]=(0,o.useState)(!1),[r,a]=(0,o.useState)(!1),s=(0,o.useRef)(null),i=(0,o.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:l,pauseOnHover:c,closeToast:u,onClick:d,closeOnClick:f}=e;var p,m;function g(){n(!0)}function v(){n(!1)}function h(n){const o=s.current;i.canDrag&&o&&(i.didMove=!0,t&&v(),i.delta="x"===e.draggableDirection?n.clientX-i.start:n.clientY-i.start,i.start!==n.clientX&&(i.canCloseOnClick=!1),o.style.transform=`translate3d(${"x"===e.draggableDirection?`${i.delta}px, var(--y)`:`0, calc(${i.delta}px + var(--y))`},0)`,o.style.opacity=""+(1-Math.abs(i.delta/i.removalDistance)))}function b(){document.removeEventListener("pointermove",h),document.removeEventListener("pointerup",b);const t=s.current;if(i.canDrag&&i.didMove&&t){if(i.canDrag=!1,Math.abs(i.delta)>i.removalDistance)return a(!0),e.closeToast(),void e.collapseAll();t.style.transition="transform 0.2s, opacity 0.2s",t.style.removeProperty("transform"),t.style.removeProperty("opacity")}}null==(m=y.get((p={id:e.toastId,containerId:e.containerId,fn:n}).containerId||1))||m.setToggle(p.id,p.fn),(0,o.useEffect)((()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||v(),window.addEventListener("focus",g),window.addEventListener("blur",v),()=>{window.removeEventListener("focus",g),window.removeEventListener("blur",v)}}),[e.pauseOnFocusLoss]);const _={onPointerDown:function(t){if(!0===e.draggable||e.draggable===t.pointerType){i.didMove=!1,document.addEventListener("pointermove",h),document.addEventListener("pointerup",b);const n=s.current;i.canCloseOnClick=!0,i.canDrag=!0,n.style.transition="none","x"===e.draggableDirection?(i.start=t.clientX,i.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(i.start=t.clientY,i.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent)/100)}},onPointerUp:function(t){const{top:n,bottom:o,left:r,right:a}=s.current.getBoundingClientRect();"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&t.clientX>=r&&t.clientX<=a&&t.clientY>=n&&t.clientY<=o?v():g()}};return l&&c&&(_.onMouseEnter=v,e.stacked||(_.onMouseLeave=g)),f&&(_.onClick=e=>{d&&d(e),i.canCloseOnClick&&u()}),{playToast:g,pauseToast:v,isRunning:t,preventExitTransition:r,toastRef:s,eventHandlers:_}}function I(e){let{delay:t,isRunning:n,closeToast:r,type:s="default",hide:i,className:c,style:u,controlledProgress:d,progress:f,rtl:p,isIn:y,theme:m}=e;const g=i||d&&0===f,v={...u,animationDuration:`${t}ms`,animationPlayState:n?"running":"paused"};d&&(v.transform=`scaleX(${f})`);const h=a("Toastify__progress-bar",d?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${m}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":p}),b=l(c)?c({rtl:p,type:s,defaultClassName:h}):a(h,c),_={[d&&f>=1?"onTransitionEnd":"onAnimationEnd"]:d&&f<1?null:()=>{y&&r()}};return o.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":g},o.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${m} Toastify__progress-bar--${s}`}),o.createElement("div",{role:"progressbar","aria-hidden":g?"true":"false","aria-label":"notification timer",className:b,style:v,..._}))}let $=1;const k=()=>""+$++;function w(e){return e&&(i(e.toastId)||s(e.toastId))?e.toastId:k()}function S(e,t){return _(e,t),t.toastId}function L(e,t){return{...t,type:t&&t.type||e,toastId:w(t)}}function R(e){return(t,n)=>S(t,L(e,n))}function P(e,t){return S(e,L("default",t))}P.loading=(e,t)=>S(e,L("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),P.promise=function(e,t,n){let o,{pending:r,error:a,success:s}=t;r&&(o=i(r)?P.loading(r,n):P.loading(r.render,{...n,...r}));const c={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},u=(e,t,r)=>{if(null==t)return void P.dismiss(o);const a={type:e,...c,...n,data:r},s=i(t)?{render:t}:t;return o?P.update(o,{...a,...s}):P(s.render,{...a,...s}),r},d=l(e)?e():e;return d.then((e=>u("success",s,e))).catch((e=>u("error",a,e))),d},P.success=R("success"),P.info=R("info"),P.error=R("error"),P.warning=R("warning"),P.warn=P.warning,P.dark=(e,t)=>S(e,L("default",{theme:"dark",...t})),P.dismiss=function(e){!function(e){var t;if(h()){if(null==e||i(t=e)||s(t))y.forEach((t=>{t.removeToast(e)}));else if(e&&("containerId"in e||"id"in e)){const t=y.get(e.containerId);t?t.removeToast(e.id):y.forEach((t=>{t.removeToast(e.id)}))}}else m=m.filter((t=>null!=e&&t.options.toastId!==e))}(e)},P.clearWaitingQueue=function(e){void 0===e&&(e={}),y.forEach((t=>{!t.props.limit||e.containerId&&t.id!==e.containerId||t.clearQueue()}))},P.isActive=b,P.update=function(e,t){void 0===t&&(t={});const n=((e,t)=>{var n;let{containerId:o}=t;return null==(n=y.get(o||1))?void 0:n.toasts.get(e)})(e,t);if(n){const{props:o,content:r}=n,a={delay:100,...o,...t,toastId:t.toastId||e,updateId:k()};a.toastId!==e&&(a.staleId=e);const s=a.render||r;delete a.render,S(s,a)}},P.done=e=>{P.update(e,{progress:1})},P.onChange=function(e){return g.add(e),()=>{g.delete(e)}},P.play=e=>E(!0,e),P.pause=e=>E(!1,e);const N="undefined"!=typeof window?o.useLayoutEffect:o.useEffect,O=e=>{let{theme:t,type:n,isLoading:r,...a}=e;return o.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${n})`,...a})},x={info:function(e){return o.createElement(O,{...e},o.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return o.createElement(O,{...e},o.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return o.createElement(O,{...e},o.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return o.createElement(O,{...e},o.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return o.createElement("div",{className:"Toastify__spinner"})}},A=e=>{const{isRunning:t,preventExitTransition:n,toastRef:r,eventHandlers:s,playToast:i}=C(e),{closeButton:c,children:u,autoClose:d,onClick:f,type:p,hideProgressBar:y,closeToast:m,transition:g,position:v,className:h,style:b,bodyClassName:_,bodyStyle:E,progressClassName:T,progressStyle:$,updateId:k,role:w,progress:S,rtl:L,toastId:R,deleteToast:P,isIn:N,isLoading:O,closeOnClick:A,theme:M}=e,D=a("Toastify__toast",`Toastify__toast-theme--${M}`,`Toastify__toast--${p}`,{"Toastify__toast--rtl":L},{"Toastify__toast--close-on-click":A}),B=l(h)?h({rtl:L,position:v,type:p,defaultClassName:D}):a(D,h),j=function(e){let{theme:t,type:n,isLoading:r,icon:a}=e,s=null;const i={theme:t,type:n};return!1===a||(l(a)?s=a({...i,isLoading:r}):(0,o.isValidElement)(a)?s=(0,o.cloneElement)(a,i):r?s=x.spinner():(e=>e in x)(n)&&(s=x[n](i))),s}(e),z=!!S||!d,F={closeToast:m,type:p,theme:M};let V=null;return!1===c||(V=l(c)?c(F):(0,o.isValidElement)(c)?(0,o.cloneElement)(c,F):function(e){let{closeToast:t,theme:n,ariaLabel:r="close"}=e;return o.createElement("button",{className:`Toastify__close-button Toastify__close-button--${n}`,type:"button",onClick:e=>{e.stopPropagation(),t(e)},"aria-label":r},o.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},o.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(F)),o.createElement(g,{isIn:N,done:P,position:v,preventExitTransition:n,nodeRef:r,playToast:i},o.createElement("div",{id:R,onClick:f,"data-in":N,className:B,...s,style:b,ref:r},o.createElement("div",{...N&&{role:w},className:l(_)?_({type:p}):a("Toastify__toast-body",_),style:E},null!=j&&o.createElement("div",{className:a("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!O})},j),o.createElement("div",null,u)),V,o.createElement(I,{...k&&!z?{key:`pb-${k}`}:{},rtl:L,theme:M,delay:d,isRunning:t,isIn:N,closeToast:m,hide:y,type:p,style:$,className:T,controlledProgress:z,progress:S||0})))},M=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},D=f(M("bounce",!0)),B=f(M("slide",!0)),j=f(M("zoom")),z=f(M("flip")),F={position:"top-right",transition:D,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function V(e){let t={...F,...e};const n=e.stacked,[r,s]=(0,o.useState)(!0),i=(0,o.useRef)(null),{getToastToRender:u,isToastActive:d,count:f}=T(t),{className:p,style:y,rtl:m,containerId:g}=t;function v(e){const t=a("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":m});return l(p)?p({position:e,rtl:m,defaultClassName:t}):a(t,c(p))}function h(){n&&(s(!0),P.play())}return N((()=>{if(n){var e;const n=i.current.querySelectorAll('[data-in="true"]'),o=12,a=null==(e=t.position)?void 0:e.includes("top");let s=0,l=0;Array.from(n).reverse().forEach(((e,t)=>{const n=e;n.classList.add("Toastify__toast--stacked"),t>0&&(n.dataset.collapsed=`${r}`),n.dataset.pos||(n.dataset.pos=a?"top":"bot");const i=s*(r?.2:1)+(r?0:o*t);n.style.setProperty("--y",`${a?i:-1*i}px`),n.style.setProperty("--g",`${o}`),n.style.setProperty("--s",""+(1-(r?l:0))),s+=n.offsetHeight,l+=.025}))}}),[r,f,n]),o.createElement("div",{ref:i,className:"Toastify",id:g,onMouseEnter:()=>{n&&(s(!1),P.pause())},onMouseLeave:h},u(((e,t)=>{const r=t.length?{...y}:{...y,pointerEvents:"none"};return o.createElement("div",{className:v(e),style:r,key:`container-${e}`},t.map((e=>{let{content:t,props:r}=e;return o.createElement(A,{...r,stacked:n,collapseAll:h,isIn:d(r.toastId,r.containerId),style:r.style,key:`toast-${r.key}`},t)})))})))}}}]);