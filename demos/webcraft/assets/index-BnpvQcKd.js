var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var ee=x.prototype=new b;ee.constructor=x,_(ee,y.prototype),ee.isPureReactComponent=!0;var te=Array.isArray;function ne(){}var S={H:null,A:null,T:null,S:null},re=Object.prototype.hasOwnProperty;function C(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ie(e,t){return C(e.type,t,e.props)}function ae(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function oe(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var se=/\/+/g;function ce(e,t){return typeof e==`object`&&e&&e.key!=null?oe(``+e.key):t.toString(36)}function le(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ne,ne):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ue(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ue(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ce(e,0):a,te(o)?(i=``,c!=null&&(i=c.replace(se,`$&/`)+`/`),ue(o,r,i,``,function(e){return e})):o!=null&&(ae(o)&&(o=ie(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(se,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(te(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ce(a,u),c+=ue(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ce(a,u++),c+=ue(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ue(le(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function de(e,t,n){if(e==null)return e;var r=[],i=0;return ue(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function fe(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var pe=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function me(e){var t=S.T,n={};n.types=t===null?null:t.types,S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ne,pe)}catch(e){pe(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),S.T=t}}function he(e){var t=S.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else me(he.bind(null,e))}var ge={map:de,forEach:function(e,t,n){de(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return de(e,function(){t++}),t},toArray:function(e){return de(e,function(e){return e})||[]},only:function(e){if(!ae(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ge,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.addTransitionType=he,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!re.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return C(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)re.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return C(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ae,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:fe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=me,e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return S.H.useEffect(e,t)},e.useEffectEvent=function(e){return S.H.useEffectEvent(e)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,ee||(ee=!0,ie());else{var t=n(l);t!==null&&se(x,t.startTime-e)}}}var ee=!1,te=-1,ne=5,S=-1;function re(){return g?!0:!(e.unstable_now()-S<ne)}function C(){if(g=!1,ee){var t=e.unstable_now();S=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(te),te=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&re());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&se(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ie():ee=!1}}}var ie;if(typeof y==`function`)ie=function(){y(C)};else if(typeof MessageChannel<`u`){var ae=new MessageChannel,oe=ae.port2;ae.port1.onmessage=C,ie=function(){oe.postMessage(null)}}else ie=function(){_(C,0)};function se(t,n){te=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ne=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(te),te=-1):h=!0,se(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,ie()))),r},e.unstable_shouldYield=re,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,ee=null;function te(e,t,n){return e===n||e===t&&(x=e,!0)}function ne(e,t,n){return e===n?(ee=e,!1):e===t&&(ee!==null&&(x=e),!0)}function S(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function re(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var C=Object.assign,ie=Symbol.for(`react.element`),ae=Symbol.for(`react.transitional.element`),oe=Symbol.for(`react.portal`),se=Symbol.for(`react.fragment`),ce=Symbol.for(`react.strict_mode`),le=Symbol.for(`react.profiler`),ue=Symbol.for(`react.consumer`),de=Symbol.for(`react.context`),fe=Symbol.for(`react.forward_ref`),pe=Symbol.for(`react.suspense`),me=Symbol.for(`react.suspense_list`),he=Symbol.for(`react.memo`),ge=Symbol.for(`react.lazy`),_e=Symbol.for(`react.activity`),ve=Symbol.for(`react.legacy_hidden`),ye=Symbol.for(`react.memo_cache_sentinel`),be=Symbol.for(`react.view_transition`),xe=Symbol.for(`react.recoverable`),Se=Symbol.iterator;function Ce(e){return typeof e!=`object`||!e?null:(e=Se&&e[Se]||e[`@@iterator`],typeof e==`function`?e:null)}var we=Symbol.for(`react.client.reference`);function Te(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===we?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case se:return`Fragment`;case le:return`Profiler`;case ce:return`StrictMode`;case pe:return`Suspense`;case me:return`SuspenseList`;case _e:return`Activity`;case be:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case oe:return`Portal`;case de:return e.displayName||`Context`;case ue:return(e._context.displayName||`Context`)+`.Consumer`;case fe:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case he:return t=e.displayName||null,t===null?Te(e.type)||`Memo`:t;case ge:t=e._payload,e=e._init;try{return Te(e(t))}catch{}}return null}var Ee=Array.isArray,w=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,T=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,De={pending:!1,data:null,method:null,action:null},Oe=[],ke=-1;function Ae(e){return{current:e}}function je(e){0>ke||(e.current=Oe[ke],Oe[ke]=null,ke--)}function E(e,t){ke++,Oe[ke]=e.current,e.current=t}var Me=Ae(null),Ne=Ae(null),Pe=Ae(null),Fe=Ae(null);function Ie(e,t){switch(E(Pe,t),E(Ne,e),E(Me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}je(Me),E(Me,e)}function Le(){je(Me),je(Ne),je(Pe)}function Re(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,E(Fe,e)),t=Me.current;var n=dp(t,e.type);t!==n&&(E(Ne,e),E(Me,n))}function ze(e){Ne.current===e&&(je(Me),je(Ne)),Fe.current===e&&(je(Fe),sh._currentValue=De)}var Be,Ve;function He(e){if(Be===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Be=t&&t[1]||``,Ve=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Be+e+Ve}var Ue=!1;function We(e,t){if(!e||Ue)return``;Ue=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ue=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?He(n):``}function Ge(e,t){switch(e.tag){case 26:case 27:case 5:return He(e.type);case 16:return He(`Lazy`);case 13:return e.child!==t&&t!==null?He(`Suspense Fallback`):He(`Suspense`);case 19:return He(`SuspenseList`);case 0:case 15:return We(e.type,!1);case 11:return We(e.type.render,!1);case 1:return We(e.type,!0);case 31:return He(`Activity`);case 30:return He(`ViewTransition`);default:return``}}function Ke(e){try{var t=``,n=null;do t+=Ge(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var qe=Object.prototype.hasOwnProperty,Je=t.unstable_scheduleCallback,Ye=t.unstable_cancelCallback,Xe=t.unstable_shouldYield,Ze=t.unstable_requestPaint,Qe=t.unstable_now,$e=t.unstable_getCurrentPriorityLevel,et=t.unstable_ImmediatePriority,tt=t.unstable_UserBlockingPriority,nt=t.unstable_NormalPriority,rt=t.unstable_LowPriority,it=t.unstable_IdlePriority,at=t.log,ot=t.unstable_setDisableYieldValue,st=null,ct=null;function lt(e){if(typeof at==`function`&&ot(e),ct&&typeof ct.setStrictMode==`function`)try{ct.setStrictMode(st,e)}catch{}}var ut=Math.clz32?Math.clz32:ft,D=Math.log,dt=Math.LN2;function ft(e){return e>>>=0,e===0?32:31-(D(e)/dt|0)|0}var pt=256,mt=262144,ht=4194304;function gt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _t(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=gt(n))):i=gt(o):i=gt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=gt(n))):i=gt(o)):i=gt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function vt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function yt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-ut(n),i=1<<r;t|=e[r],n&=~i}return t}function bt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function xt(){var e=ht;return ht<<=1,!(ht&62914560)&&(ht=4194304),e}function St(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ct(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-ut(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&Tt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function Tt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ut(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Et(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ut(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Dt(e,t){var n=t&-t;return n=n&42?1:Ot(n),(n&(e.suspendedLanes|t))===0?n:0}function Ot(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function kt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function At(){var e=T.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function jt(e,t){var n=T.p;try{return T.p=e,t()}finally{T.p=n}}var Mt=Math.random().toString(36).slice(2),O=`__reactFiber$`+Mt,Nt=`__reactProps$`+Mt,Pt=`__reactContainer$`+Mt,Ft=`__reactEvents$`+Mt,It=`__reactListeners$`+Mt,Lt=`__reactHandles$`+Mt,Rt=`__reactResources$`+Mt,zt=`__reactMarker$`+Mt,Bt=`__reactLoad$`+Mt;function Vt(e){delete e[O],delete e[Nt],delete e[It],delete e[Lt]}function Ht(e){var t;if(t=e[O])return t;for(var n=e.parentNode;n;){if(t=n[Pt]||n[O]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[O])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Ut(e){if(e=e[O]||e[Pt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Gt(e){var t=e[Rt];return t||=e[Rt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function k(e){e[zt]=!0}function Kt(e){e[Bt]=void 0}var A=new Set,qt={};function Jt(e,t){Yt(e,t),Yt(e+`Capture`,t)}function Yt(e,t){for(qt[e]=t,e=0;e<t.length;e++)A.add(t[e])}var Xt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Zt={},Qt={};function $t(e){return qe.call(Qt,e)?!0:qe.call(Zt,e)?!1:Xt.test(e)?Qt[e]=!0:(Zt[e]=!0,!1)}var j=!1;function en(){var e=j;return j=!1,e}function tn(e,t,n){if($t(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function nn(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function rn(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function an(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function on(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function sn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function cn(e){if(!e._valueTracker){var t=on(e)?`checked`:`value`;e._valueTracker=sn(e,t,``+e[t])}}function ln(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=on(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var un=/[\n"\\]/g;function dn(e){return e.replace(un,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function fn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+an(t)):e.value!==``+an(t)&&(e.value=``+an(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):mn(e,an(n)):o===`number`&&e.value==t?mn(e,an(e.value)):mn(e,an(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+an(s):e.removeAttribute(`name`)}function pn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){cn(e);return}n=n==null?``:``+an(n),t=t==null?n:``+an(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),cn(e)}function mn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function hn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+an(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function gn(e,t,n){t!=null&&(t=``+an(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+an(n)}function _n(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(Ee(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=an(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),cn(e)}function vn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var yn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function bn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||yn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function xn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,j=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(bn(e,a,r),j=!0)}else for(var o in t)t.hasOwnProperty(o)&&bn(e,o,t[o])}function Sn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Cn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),wn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Tn(e){return wn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function En(){}var Dn=null;function On(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var kn=null,An=null;function jn(e){var t=Ut(e);if(t&&(e=t.stateNode)){var n=e[Nt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(fn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+dn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Nt]||null;if(!a)throw Error(i(90));fn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&ln(r)}break a;case`textarea`:gn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&hn(e,!!n.multiple,t,!1)}}}var Mn=!1;function Nn(e,t,n){if(Mn)return e(t,n);Mn=!0;try{return e(t)}finally{if(Mn=!1,(kn!==null||An!==null)&&(zd(),kn&&(t=kn,e=An,An=kn=null,jn(t),e)))for(t=0;t<e.length;t++)jn(e[t])}}function Pn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Nt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Fn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,In=!1;if(Fn)try{var Ln={};Object.defineProperty(Ln,"passive",{get:function(){In=!0}}),window.addEventListener(`test`,Ln,Ln),window.removeEventListener(`test`,Ln,Ln)}catch{In=!1}var Rn=null,zn=null,Bn=null;function Vn(){if(Bn)return Bn;var e,t=zn,n=t.length,r,i=`value`in Rn?Rn.value:Rn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Bn=i.slice(e,1<r?1-r:void 0)}function Hn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Un(){return!0}function Wn(){return!1}function Gn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Un:Wn,this.isPropagationStopped=Wn,this}return C(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Un)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Un)},persist:function(){},isPersistent:Un}),t}var Kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qn=Gn(Kn),Jn=C({},Kn,{view:0,detail:0}),Yn=Gn(Jn),Xn,Zn,Qn,$n=C({},Jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ur,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Qn&&(Qn&&e.type===`mousemove`?(Xn=e.screenX-Qn.screenX,Zn=e.screenY-Qn.screenY):Zn=Xn=0,Qn=e),Xn)},movementY:function(e){return`movementY`in e?e.movementY:Zn}}),er=Gn($n),tr=Gn(C({},$n,{dataTransfer:0})),nr=Gn(C({},Jn,{relatedTarget:0})),rr=Gn(C({},Kn,{animationName:0,elapsedTime:0,pseudoElement:0})),ir=Gn(C({},Kn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),ar=Gn(C({},Kn,{data:0})),or={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},sr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},cr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function lr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=cr[e])?!!t[e]:!1}function ur(){return lr}var dr=Gn(C({},Jn,{key:function(e){if(e.key){var t=or[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Hn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?sr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ur,charCode:function(e){return e.type===`keypress`?Hn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Hn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),fr=Gn(C({},$n,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),pr=Gn(C({},Kn,{submitter:0})),mr=Gn(C({},Jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ur})),hr=Gn(C({},Kn,{propertyName:0,elapsedTime:0,pseudoElement:0})),gr=Gn(C({},$n,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),_r=Gn(C({},Kn,{newState:0,oldState:0,source:0})),vr=[9,13,27,32],yr=Fn&&`CompositionEvent`in window,br=null;Fn&&`documentMode`in document&&(br=document.documentMode);var xr=Fn&&`TextEvent`in window&&!br,Sr=Fn&&(!yr||br&&8<br&&11>=br),Cr=` `,wr=!1;function Tr(e,t){switch(e){case`keyup`:return vr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Er(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Dr=!1;function Or(e,t){switch(e){case`compositionend`:return Er(t);case`keypress`:return t.which===32?(wr=!0,Cr):null;case`textInput`:return e=t.data,e===Cr&&wr?null:e;default:return null}}function kr(e,t){if(Dr)return e===`compositionend`||!yr&&Tr(e,t)?(e=Vn(),Bn=zn=Rn=null,Dr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Sr&&t.locale!==`ko`?null:t.data;default:return null}}var Ar={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Ar[e.type]:t===`textarea`}function Mr(e,t,n,r){kn?An?An.push(r):An=[r]:kn=r,t=Jf(t,`onChange`),0<t.length&&(n=new qn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Nr=null,Pr=null;function Fr(e){Vf(e,0)}function Ir(e){if(ln(Wt(e)))return e}function Lr(e,t){if(e===`change`)return t}var Rr=!1;if(Fn){var zr;if(Fn){var Br=`oninput`in document;if(!Br){var Vr=document.createElement(`div`);Vr.setAttribute(`oninput`,`return;`),Br=typeof Vr.oninput==`function`}zr=Br}else zr=!1;Rr=zr&&(!document.documentMode||9<document.documentMode)}function Hr(){Nr&&(Nr.detachEvent(`onpropertychange`,Ur),Pr=Nr=null)}function Ur(e){if(e.propertyName===`value`&&Ir(Pr)){var t=[];Mr(t,Pr,e,On(e)),Nn(Fr,t)}}function Wr(e,t,n){e===`focusin`?(Hr(),Nr=t,Pr=n,Nr.attachEvent(`onpropertychange`,Ur)):e===`focusout`&&Hr()}function Gr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Ir(Pr)}function Kr(e,t){if(e===`click`)return Ir(t)}function qr(e,t){if(e===`input`||e===`change`)return Ir(t)}function Jr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Yr=typeof Object.is==`function`?Object.is:Jr;function Xr(e,t){if(Yr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!qe.call(t,i)||!Yr(e[i],t[i]))return!1}return!0}function Zr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Qr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $r(e,t){var n=Qr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Qr(n)}}function ei(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ei(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ti(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Zr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Zr(e.document)}return t}function ni(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var ri=Fn&&`documentMode`in document&&11>=document.documentMode,ii=null,ai=null,oi=null,si=!1;function ci(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;si||ii==null||ii!==Zr(r)||(r=ii,`selectionStart`in r&&ni(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),oi&&Xr(oi,r)||(oi=r,r=Jf(ai,`onSelect`),0<r.length&&(t=new qn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=ii)))}function li(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ui={animationend:li(`Animation`,`AnimationEnd`),animationiteration:li(`Animation`,`AnimationIteration`),animationstart:li(`Animation`,`AnimationStart`),transitionrun:li(`Transition`,`TransitionRun`),transitionstart:li(`Transition`,`TransitionStart`),transitioncancel:li(`Transition`,`TransitionCancel`),transitionend:li(`Transition`,`TransitionEnd`)},di={},fi={};Fn&&(fi=document.createElement(`div`).style,`AnimationEvent`in window||(delete ui.animationend.animation,delete ui.animationiteration.animation,delete ui.animationstart.animation),`TransitionEvent`in window||delete ui.transitionend.transition);function pi(e){if(di[e])return di[e];if(!ui[e])return e;var t=ui[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in fi)return di[e]=t[n];return e}var mi=pi(`animationend`),hi=pi(`animationiteration`),gi=pi(`animationstart`),_i=pi(`transitionrun`),vi=pi(`transitionstart`),yi=pi(`transitioncancel`),bi=pi(`transitionend`),xi=new Map,Si=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Si.push(`scrollEnd`);function Ci(e,t){xi.set(e,t),Jt(t,[e])}var wi=0;function Ti(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=wi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function Ei(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function Di(e,t){return e=Ei(e),t=Ei(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Oi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ki=[],Ai=0,ji=0;function Mi(){for(var e=Ai,t=ji=Ai=0;t<e;){var n=ki[t];ki[t++]=null;var r=ki[t];ki[t++]=null;var i=ki[t];ki[t++]=null;var a=ki[t];if(ki[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ii(n,i,a)}}function Ni(e,t,n,r){ki[Ai++]=e,ki[Ai++]=t,ki[Ai++]=n,ki[Ai++]=r,ji|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Pi(e,t,n,r){return Ni(e,t,n,r),Li(e)}function Fi(e,t){return Ni(e,null,null,t),Li(e)}function Ii(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-ut(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Li(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ri={};function zi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bi(e,t,n,r){return new zi(e,t,n,r)}function Vi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hi(e,t){var n=e.alternate;return n===null?(n=Bi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ui(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Wi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Vi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case _e:return e=Bi(31,n,t,a),e.elementType=_e,e.lanes=o,e;case se:return Gi(n.children,a,o,t);case ce:s=8,a|=24;break;case le:return e=Bi(12,n,t,a|2),e.elementType=le,e.lanes=o,e;case pe:return e=Bi(13,n,t,a),e.elementType=pe,e.lanes=o,e;case me:return e=Bi(19,n,t,a),e.elementType=me,e.lanes=o,e;case ve:case be:return e=a|32,e=Bi(30,n,t,e),e.elementType=be,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case de:s=10;break a;case ue:s=9;break a;case fe:s=11;break a;case he:s=14;break a;case ge:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Bi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Gi(e,t,n,r){return e=Bi(7,e,r,t),e.lanes=n,e}function Ki(e,t,n){return e=Bi(6,e,null,t),e.lanes=n,e}function qi(e){var t=Bi(18,null,null,0);return t.stateNode=e,t}function Ji(e,t,n){return t=Bi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Yi=new WeakMap;function Xi(e,t){if(typeof e==`object`&&e){var n=Yi.get(e);return n===void 0?(t={value:e,source:t,stack:Ke(t)},Yi.set(e,t),t):n}return{value:e,source:t,stack:Ke(t)}}var Zi=[],Qi=0,$i=null,ea=0,ta=[],na=0,ra=null,ia=1,aa=``;function oa(e,t){Zi[Qi++]=ea,Zi[Qi++]=$i,$i=e,ea=t}function sa(e,t,n){ta[na++]=ia,ta[na++]=aa,ta[na++]=ra,ra=e;var r=ia;e=aa;var i=32-ut(r)-1;r&=~(1<<i),n+=1;var a=32-ut(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ia=1<<32-ut(t)+i|n<<i|r,aa=a+e}else ia=1<<a|n<<i|r,aa=e}function ca(e){e.return!==null&&(oa(e,1),sa(e,1,0))}function la(e){for(;e===$i;)$i=Zi[--Qi],Zi[Qi]=null,ea=Zi[--Qi],Zi[Qi]=null;for(;e===ra;)ra=ta[--na],ta[na]=null,aa=ta[--na],ta[na]=null,ia=ta[--na],ta[na]=null}function ua(e,t){ta[na++]=ia,ta[na++]=aa,ta[na++]=ra,ia=t.id,aa=t.overflow,ra=e}var da=null,M=null,N=!1,fa=null,pa=!1,ma=Error(i(519));function ha(e){throw xa(Xi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ma}function ga(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[O]=e,t[Nt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),pn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),_n(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=En),t=!0):t=!1,t||ha(e,!0)}function _a(e){for(da=e.return;da;)switch(da.tag){case 5:case 31:case 13:pa=!1;return;case 27:case 3:pa=!0;return;default:da=da.return}}function va(e){if(e!==da)return!1;if(!N)return _a(e),N=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&M&&ha(e),_a(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));M=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));M=dm(e)}else t===27?(t=M,Sp(e.type)?(e=um,um=null,M=e):M=t):M=da?lm(e.stateNode.nextSibling):null;return!0}function ya(){M=da=null,N=!1}function ba(){var e=fa;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),fa=null),e}function xa(e){fa===null?fa=[e]:fa.push(e)}var Sa=Ae(null),Ca=null,wa=null;function Ta(e,t,n){E(Sa,t._currentValue),t._currentValue=n}function Ea(e){e._currentValue=Sa.current,je(Sa)}function Da(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Oa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Da(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Da(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Da(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ka(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Yr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Fe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Oa(t,e,n,r),t.flags|=262144,e!==null}function Aa(e){for(e=e.firstContext;e!==null;){if(!Yr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ja(e){Ca=e,wa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ma(e){return Pa(Ca,e)}function Na(e,t){return Ca===null&&ja(e),Pa(e,t)}function Pa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},wa===null){if(e===null)throw Error(i(308));wa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else wa=wa.next=t;return n}var Fa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ia=t.unstable_scheduleCallback,La=t.unstable_NormalPriority,P={$$typeof:de,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ra(){return{controller:new Fa,data:new Map,refCount:0}}function za(e){e.refCount--,e.refCount===0&&Ia(La,function(){e.controller.abort()})}function Ba(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Va=null;function Ha(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Ua=null,Wa=0,Ga=0,Ka=null;function qa(e,t){if(Ua===null){var n=Ua=[];Wa=0,Ga=Pf(),Ka={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Wa++,t.then(Ja,Ja),t}function Ja(){if(--Wa===0&&(Va=null,Ua!==null)){Ka!==null&&(Ka.status=`fulfilled`);var e=Ua;Ua=null,Ga=0,Ka=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ya(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Xa=w.S;w.S=function(e,t){if(gd=Qe(),typeof t==`object`&&t&&typeof t.then==`function`&&qa(e,t),Va!==null)for(var n=bf;n!==null;)Ba(n,Va),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Ba(r,n),r=r.next;if(Ga!==0){r=Va,r===null&&(r=Va=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Xa!==null&&Xa(e,t)};var Za=Ae(null);function Qa(){var e=Za.current;return e===null?G.pooledCache:e}function $a(e,t){t===null?E(Za,Za.current):E(Za,t.pool)}function eo(){var e=Qa();return e===null?null:{parent:P._currentValue,pool:e}}var to=Error(i(460)),no=Error(i(474)),ro=Error(i(542)),io={then:function(){}};function ao(e){return e=e.status,e===`fulfilled`||e===`rejected`}function oo(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(En,En),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,uo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(En,En);else{if(e=G,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,uo(e),e}throw co=t,to}}function so(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(co=e,to):e}}var co=null;function lo(){if(co===null)throw Error(i(459));var e=co;return co=null,e}function uo(e){if(e===to||e===ro)throw Error(i(483))}var fo=null,po=0;function mo(e){var t=po;return po+=1,fo===null&&(fo=[]),oo(fo,e,t)}function ho(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function go(e,t){throw t.$$typeof===ie?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function _o(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Hi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ki(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===se?(e=d(e,t,n.props.children,r,n.key),ho(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ge&&so(i)===t.type)?(t=a(t,n.props),ho(t,n),t.return=e,t):(t=Wi(n.type,n.key,n.props,null,e.mode,r),ho(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ji(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Gi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ki(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case ae:return n=Wi(t.type,t.key,t.props,null,e.mode,n),ho(n,t),n.return=e,n;case oe:return t=Ji(t,e.mode,n),t.return=e,t;case ge:return t=so(t),f(e,t,n)}if(Ee(t)||Ce(t))return t=Gi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,mo(t),n);if(t.$$typeof===de)return f(e,Na(e,t),n);go(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case ae:return n.key===i?l(e,t,n,r):null;case oe:return n.key===i?u(e,t,n,r):null;case ge:return n=so(n),p(e,t,n,r)}if(Ee(n)||Ce(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,mo(n),r);if(n.$$typeof===de)return p(e,t,Na(e,n),r);go(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case ae:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case oe:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ge:return r=so(r),m(e,t,n,r,i)}if(Ee(r)||Ce(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,mo(r),i);if(r.$$typeof===de)return m(e,t,n,Na(t,r),i);go(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),N&&oa(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return N&&oa(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),N&&oa(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),N&&oa(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return N&&oa(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),N&&oa(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===se&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case ae:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===se){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),ho(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ge&&so(l)===r.type){n(e,r.sibling),c=a(r,o.props),ho(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===se?(c=Gi(o.props.children,e.mode,c,o.key),ho(c,o),c.return=e,e=c):(c=Wi(o.type,o.key,o.props,null,e.mode,c),ho(c,o),c.return=e,e=c)}return s(e);case oe:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ji(o,e.mode,c),c.return=e,e=c}return s(e);case ge:return o=so(o),_(e,r,o,c)}if(Ee(o))return h(e,r,o,c);if(Ce(o)){if(l=Ce(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,mo(o),c);if(o.$$typeof===de)return _(e,r,Na(e,o),c);go(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ki(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{po=0;var i=_(e,t,n,r);return fo=null,i}catch(t){if(t===to||t===ro)throw t;var a=Bi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var vo=_o(!0),yo=_o(!1),bo=!1;function xo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function So(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Co(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function wo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Li(e),Ii(e,null,n),t}return Ni(e,r,t,n),Li(e)}function To(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Et(e,n)}}function Eo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Do=!1;function Oo(){if(Do){var e=Ka;if(e!==null)throw e}}function ko(e,t,n,r){Do=!1;var i=e.updateQueue;bo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(q&f)===f:(r&f)===f){f!==0&&f===Ga&&(Do=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=C({},d,f);break a;case 2:bo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function Ao(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function jo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ao(n[e],t)}var Mo=Ae(null),No=Ae(0);function Po(e,t){e=od,E(No,e),E(Mo,t),od=e|t.baseLanes}function Fo(){E(No,od),E(Mo,Mo.current)}function Io(){od=No.current,je(Mo),je(No)}var Lo=Ae(null),Ro=null;function zo(e){var t=e.alternate;E(Wo,Wo.current&1),E(Lo,e),Ro===null&&(t===null||Mo.current!==null||t.memoizedState!==null)&&(Ro=e)}function Bo(e){E(Wo,Wo.current),E(Lo,e),Ro===null&&(Ro=e)}function Vo(e){e.tag===22?(E(Wo,Wo.current),E(Lo,e),Ro===null&&(Ro=e)):Ho()}function Ho(){E(Wo,Wo.current),E(Lo,Lo.current)}function Uo(e){je(Lo),Ro===e&&(Ro=null),je(Wo)}var Wo=Ae(0);function Go(e,t){E(Lo,Lo.current),E(Wo,t)}function Ko(e){je(Wo),je(Lo),Ro===e&&(Ro=null)}function qo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Jo=0,F=null,I=null,L=null,Yo=!1,Xo=!1,Zo=!1,Qo=0,$o=0,es=null,ts=0;function R(){throw Error(i(321))}function ns(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Yr(e[n],t[n]))return!1;return!0}function rs(e,t,n,r,i,a){return Jo=a,F=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,w.H=e===null||e.memoizedState===null?yc:bc,Zo=!1,a=n(r,i),Zo=!1,Xo&&(a=as(t,n,r,i)),is(e),a}function is(e){w.H=vc;var t=I!==null&&I.next!==null;if(Jo=0,L=I=F=null,Yo=!1,$o=0,es=null,t)throw Error(i(300));e===null||B||(e=e.dependencies,e!==null&&Aa(e)&&(B=!0))}function as(e,t,n,r){F=e;var a=0;do{if(Xo&&(es=null),$o=0,Xo=!1,25<=a)throw Error(i(301));if(a+=1,L=I=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}w.H=xc,o=t(n,r)}while(Xo);return o}function os(){var e=w.H,t=e.useState()[0];return t=typeof t.then==`function`?fs(t):t,e=e.useState()[0],(I===null?null:I.memoizedState)!==e&&(F.flags|=1024),t}function ss(){var e=Qo!==0;return Qo=0,e}function cs(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ls(e){if(Yo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Yo=!1}Jo=0,L=I=F=null,Xo=!1,$o=Qo=0,es=null}function us(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return L===null?F.memoizedState=L=e:L=L.next=e,L}function z(){if(I===null){var e=F.alternate;e=e===null?null:e.memoizedState}else e=I.next;var t=L===null?F.memoizedState:L.next;if(t!==null)L=t,I=e;else{if(e===null)throw F.alternate===null?Error(i(467)):Error(i(310));I=e,e={memoizedState:I.memoizedState,baseState:I.baseState,baseQueue:I.baseQueue,queue:I.queue,next:null},L===null?F.memoizedState=L=e:L=L.next=e}return L}function ds(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function fs(e){var t=$o;return $o+=1,es===null&&(es=[]),e=oo(es,e,t),t=F,(L===null?t.memoizedState:L.next)===null&&(t=t.alternate,w.H=t===null||t.memoizedState===null?yc:bc),e}function ps(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return fs(e);if(e.$$typeof===xe)return;if(e.$$typeof===de)return Ma(e)}throw Error(i(438,String(e)))}function ms(e){var t=null,n=F.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=F.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ds(),F.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ye;return t.index++,n}function hs(e,t){return typeof t==`function`?t(e):t}function gs(e){return _s(z(),I,e)}function _s(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Jo&f)===f:(q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ga&&(d=!0);else if((Jo&p)===p){u=u.next,p===Ga&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,F.lanes|=p,sd|=p;f=u.action,Zo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,F.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Yr(o,e.memoizedState)&&(B=!0,d&&(n=Ka,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function vs(e){var t=z(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Yr(o,t.memoizedState)||(B=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ys(e,t,n){var r=F,a=z(),o=N;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Yr((I||a).memoizedState,n);if(s&&(a.memoizedState=n,B=!0),a=a.queue,Ws(Ss.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||L!==null&&!!(L.memoizedState.tag&1),zs(e?9:8,{destroy:void 0},xs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,G===null)throw Error(i(349));o||Jo&127||bs(r,t,n)}return n}function bs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=F.updateQueue,t===null?(t=ds(),F.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function xs(e,t,n,r){t.value=n,t.getSnapshot=r,Cs(t)&&ws(e)}function Ss(e,t,n){return n(function(){Cs(t)&&ws(e)})}function Cs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Yr(e,n)}catch{return!0}}function ws(e){var t=Fi(e,2);t!==null&&Pd(t,e,2)}function Ts(e){var t=us();if(typeof e==`function`){var n=e;if(e=n(),Zo){lt(!0);try{n()}finally{lt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:e},t}function Es(e,t,n,r){return e.baseState=n,_s(e,I,typeof r==`function`?r:hs)}function Ds(e,t,n,r,a){if(hc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};w.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Os(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Os(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=w.T,o={};o.types=a===null?null:a.types,w.T=o;try{var s=n(i,r),c=w.S;c!==null&&c(o,s),ks(e,t,s)}catch(n){js(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),w.T=a}}else try{a=n(i,r),ks(e,t,a)}catch(n){js(e,t,n)}}function ks(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){As(e,t,n)},function(n){return js(e,t,n)}):As(e,t,n)}function As(e,t,n){t.status=`fulfilled`,t.value=n,Ms(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Os(e,n)))}function js(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ms(t),t=t.next;while(t!==r)}e.action=null}function Ms(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ns(e,t){return t}function Ps(e,t){if(N){var n=G.formState;if(n!==null){a:{var r=F;if(N){if(M){b:{for(var i=M,a=pa;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){M=lm(i.nextSibling),r=i.data===`F!`;break a}}ha(r)}r=!1}r&&(t=n[0])}}return n=us(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ns,lastRenderedState:t},n.queue=r,n=fc.bind(null,F,r),r.dispatch=n,r=Ts(!1),a=mc.bind(null,F,!1,r.queue),r=us(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ds.bind(null,F,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Fs(e){return Is(z(),I,e)}function Is(e,t,n){if(t=_s(e,t,Ns)[0],e=gs(hs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=fs(t)}catch(e){throw e===to?ro:e}else r=t;t=z();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(F.flags|=2048,zs(9,{destroy:void 0},Ls.bind(null,i,n),null)),[r,a,e]}function Ls(e,t){e.action=t}function Rs(e){var t=z(),n=I;if(n!==null)return Is(t,n,e);z(),t=t.memoizedState,n=z();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function zs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=F.updateQueue,t===null&&(t=ds(),F.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Bs(){return z().memoizedState}function Vs(e,t,n,r){var i=us();F.flags|=e,i.memoizedState=zs(1|t,{destroy:void 0},n,r===void 0?null:r)}function Hs(e,t,n,r){var i=z();r=r===void 0?null:r;var a=i.memoizedState.inst;I!==null&&r!==null&&ns(r,I.memoizedState.deps)?i.memoizedState=zs(t,a,n,r):(F.flags|=e,i.memoizedState=zs(1|t,a,n,r))}function Us(e,t){Vs(8390656,8,e,t)}function Ws(e,t){Hs(2048,8,e,t)}function Gs(e){F.flags|=4;var t=F.updateQueue;if(t===null)t=ds(),F.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ks(e){var t=z().memoizedState;return Gs({ref:t,nextImpl:e}),function(){if(W&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function qs(e,t){return Hs(4,2,e,t)}function Js(e,t){return Hs(4,4,e,t)}function Ys(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xs(e,t,n){n=n==null?null:n.concat([e]),Hs(4,4,Ys.bind(null,t,e),n)}function Zs(){}function Qs(e,t){var n=z();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&ns(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function $s(e,t){var n=z();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&ns(t,r[1]))return r[0];if(r=e(),Zo){lt(!0);try{e()}finally{lt(!1)}}return n.memoizedState=[r,t],r}function ec(e,t,n){return n===void 0||Jo&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),F.lanes|=e,sd|=e,n)}function tc(e,t,n,r){return Yr(n,t)?n:Mo.current===null?!(Jo&106)||Jo&1073741824&&!(q&261930)?(B=!0,e.memoizedState=n):(e=Md(),F.lanes|=e,sd|=e,t):(e=ec(e,n,r),Yr(e,t)||(B=!0),e)}function nc(e,t,n,r,i){var a=T.p;T.p=a!==0&&8>a?a:8;var o=w.T,s={};s.types=o===null?null:o.types,w.T=s,mc(e,!1,t,n);try{var c=i(),l=w.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?pc(e,t,Ya(c,r),jd(e)):pc(e,t,r,jd(e))}catch(n){pc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{T.p=a,o!==null&&s.types!==null&&(o.types=s.types),w.T=o}}function rc(){}function ic(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ac(e).queue;nc(e,a,t,De,n===null?rc:function(){return oc(e),n(r)})}function ac(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:De,baseState:De,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:De},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:hs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function oc(e){var t=ac(e);t.next===null&&(t=e.alternate.memoizedState),pc(e,t.next.queue,{},jd())}function sc(){return Ma(sh)}function cc(){return z().memoizedState}function lc(){return z().memoizedState}function uc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=Co(n);var r=wo(t,e,n);r!==null&&(Pd(r,t,n),To(r,t,n)),t={cache:Ra()},e.payload=t;return}t=t.return}}function dc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},hc(e)?gc(t,n):(n=Pi(e,t,n,r),n!==null&&(Pd(n,e,r),_c(n,t,r)))}function fc(e,t,n){pc(e,t,n,jd())}function pc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(hc(e))gc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Yr(s,o))return Ni(e,t,i,0),G===null&&Mi(),!1}catch{}if(n=Pi(e,t,i,r),n!==null)return Pd(n,e,r),_c(n,t,r),!0}return!1}function mc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},hc(e)){if(t)throw Error(i(479))}else t=Pi(e,n,r,2),t!==null&&Pd(t,e,2)}function hc(e){var t=e.alternate;return e===F||t!==null&&t===F}function gc(e,t){Xo=Yo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function _c(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Et(e,n)}}var vc={readContext:Ma,use:ps,useCallback:R,useContext:R,useEffect:R,useImperativeHandle:R,useLayoutEffect:R,useInsertionEffect:R,useMemo:R,useReducer:R,useRef:R,useState:R,useDebugValue:R,useDeferredValue:R,useTransition:R,useSyncExternalStore:R,useId:R,useHostTransitionStatus:R,useFormState:R,useActionState:R,useOptimistic:R,useMemoCache:R,useCacheRefresh:R,useEffectEvent:R},yc={readContext:Ma,use:ps,useCallback:function(e,t){return us().memoizedState=[e,t===void 0?null:t],e},useContext:Ma,useEffect:Us,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Vs(4194308,4,Ys.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Vs(4194308,4,e,t)},useInsertionEffect:function(e,t){Vs(4,2,e,t)},useMemo:function(e,t){var n=us();t=t===void 0?null:t;var r=e();if(Zo){lt(!0);try{e()}finally{lt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=us();if(n!==void 0){var i=n(t);if(Zo){lt(!0);try{n(t)}finally{lt(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=dc.bind(null,F,e),[r.memoizedState,e]},useRef:function(e){var t=us();return e={current:e},t.memoizedState=e},useState:function(e){e=Ts(e);var t=e.queue,n=fc.bind(null,F,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Zs,useDeferredValue:function(e,t){return ec(us(),e,t)},useTransition:function(){var e=Ts(!1);return e=nc.bind(null,F,e.queue,!0,!1),us().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=F,a=us();if(N){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),G===null)throw Error(i(349));q&127||bs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Us(Ss.bind(null,r,o,e),[e]),r.flags|=2048,zs(9,{destroy:void 0},xs.bind(null,r,o,n,t),null),n},useId:function(){var e=us(),t=G.identifierPrefix;if(N){var n=aa,r=ia;n=(r&~(1<<32-ut(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Qo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=ts++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:sc,useFormState:Ps,useActionState:Ps,useOptimistic:function(e){var t=us();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=mc.bind(null,F,!0,n),n.dispatch=t,[e,t]},useMemoCache:ms,useCacheRefresh:function(){return us().memoizedState=uc.bind(null,F)},useEffectEvent:function(e){var t=us(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},bc={readContext:Ma,use:ps,useCallback:Qs,useContext:Ma,useEffect:Ws,useImperativeHandle:Xs,useInsertionEffect:qs,useLayoutEffect:Js,useMemo:$s,useReducer:gs,useRef:Bs,useState:function(){return gs(hs)},useDebugValue:Zs,useDeferredValue:function(e,t){return tc(z(),I.memoizedState,e,t)},useTransition:function(){var e=gs(hs)[0],t=z().memoizedState;return[typeof e==`boolean`?e:fs(e),t]},useSyncExternalStore:ys,useId:cc,useHostTransitionStatus:sc,useFormState:Fs,useActionState:Fs,useOptimistic:function(e,t){return Es(z(),I,e,t)},useMemoCache:ms,useCacheRefresh:lc,useEffectEvent:Ks},xc={readContext:Ma,use:ps,useCallback:Qs,useContext:Ma,useEffect:Ws,useImperativeHandle:Xs,useInsertionEffect:qs,useLayoutEffect:Js,useMemo:$s,useReducer:vs,useRef:Bs,useState:function(){return vs(hs)},useDebugValue:Zs,useDeferredValue:function(e,t){var n=z();return I===null?ec(n,e,t):tc(n,I.memoizedState,e,t)},useTransition:function(){var e=vs(hs)[0],t=z().memoizedState;return[typeof e==`boolean`?e:fs(e),t]},useSyncExternalStore:ys,useId:cc,useHostTransitionStatus:sc,useFormState:Rs,useActionState:Rs,useOptimistic:function(e,t){var n=z();return I===null?(n.baseState=e,[e,n.queue.dispatch]):Es(n,I,e,t)},useMemoCache:ms,useCacheRefresh:lc,useEffectEvent:Ks};function Sc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:C({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Cc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=Co(r);i.payload=t,n!=null&&(i.callback=n),t=wo(e,i,r),t!==null&&(Pd(t,e,r),To(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=Co(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=wo(e,i,r),t!==null&&(Pd(t,e,r),To(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=Co(n);r.tag=2,t!=null&&(r.callback=t),t=wo(e,r,n),t!==null&&(Pd(t,e,n),To(t,e,n))}};function wc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Xr(n,r)||!Xr(i,a):!0}function Tc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Cc.enqueueReplaceState(t,t.state,null)}function Ec(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=C({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Dc(e){Oi(e)}function Oc(e){console.error(e)}function kc(e){Oi(e)}function Ac(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function jc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Mc(e,t,n){return n=Co(n),n.tag=3,n.payload={element:null},n.callback=function(){Ac(e,t)},n}function Nc(e){return e=Co(e),e.tag=3,e}function Pc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){jc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){jc(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Fc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ka(t,n,a,!0),n=Lo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ro===null?Kd():n.alternate===null&&Y===0&&(Y=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===io?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===io?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(N)return t=Lo.current,t===null?(r!==ma&&(t=Error(i(423),{cause:r}),xa(Xi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Xi(r,n),a=Mc(e.stateNode,r,a),Eo(e,a),Y!==4&&(Y=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ma&&(e=Error(i(422),{cause:r}),xa(Xi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Xi(o,n),fd===null?fd=[o]:fd.push(o),Y!==4&&(Y=2),t===null)return!0;r=Xi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Mc(n.stateNode,r,e),Eo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Nc(a),Pc(a,e,n,r),Eo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ic=Error(i(461)),B=!1;function Lc(e,t,n,r){t.child=e===null?yo(t,null,n,r):vo(t,e.child,n,r)}function Rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ja(t),r=rs(e,t,n,o,a,i),s=ss(),e!==null&&!B?(cs(e,t,i),fl(e,t,i)):(N&&s&&ca(t),t.flags|=1,Lc(e,t,r,i),t.child)}function zc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Vi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Bc(e,t,a,r,i)):(e=Wi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!pl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Xr:n,n(o,r)&&e.ref===t.ref)return fl(e,t,i)}return t.flags|=1,e=Hi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Bc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Xr(a,r)&&e.ref===t.ref){if(B=!1,t.pendingProps=r=a,pl(e,i))e.flags&131072&&(B=!0);else return t.lanes=e.lanes,fl(e,t,i)}}return Jc(e,t,n,r,i)}function Vc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Uc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&$a(t,a===null?null:a.cachePool),a===null?Fo():Po(t,a),Vo(t);else return r=t.lanes=536870912,Uc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&$a(t,null),Fo(),Ho()):($a(t,a.cachePool),Po(t,a),Ho(),t.memoizedState=null);return Lc(e,t,i,n),t.child}function Hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Uc(e,t,n,r,i){var a=Qa();return a=a===null?null:{parent:P._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&$a(t,null),Fo(),Vo(t),e!==null&&ka(e,t,r,!0),t.childLanes=i,null}function Wc(e,t){return t=rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Gc(e,t,n){return vo(t,e.child,null,n),e=Wc(t,t.pendingProps),e.flags|=2,Uo(t),t.memoizedState=null,e}function Kc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(N){if(r.mode===`hidden`)return e=Wc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Hc(null,e);if(Bo(t),(e=M)?(e=am(e,pa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ra===null?null:{id:ia,overflow:aa},retryLane:536870912,hydrationErrors:null},n=qi(e),n.return=t,t.child=n,da=t,M=null)):e=null,e===null)throw ha(t);return t.lanes=536870912,null}return Wc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Bo(t),a){if(t.flags&256)t.flags&=-257,t=Gc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(B||ka(e,t,n,!1),a=(n&e.childLanes)!==0,B||a){if(Mo.current===null){if(r=G,r!==null&&(s=Dt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Fi(e,s),Pd(r,e,s),Ic;Kd()}t=Gc(e,t,n)}else e=o.treeContext,M=lm(s.nextSibling),da=t,N=!0,fa=null,pa=!1,e!==null&&ua(t,e),t=Wc(t,r),t.flags|=134221824;return t}return e=Hi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function qc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Jc(e,t,n,r,i){return ja(t),n=rs(e,t,n,r,void 0,i),r=ss(),e!==null&&!B?(cs(e,t,i),fl(e,t,i)):(N&&r&&ca(t),t.flags|=1,Lc(e,t,n,i),t.child)}function Yc(e,t,n,r,i,a){return ja(t),t.updateQueue=null,n=as(t,r,n,i),is(e),r=ss(),e!==null&&!B?(cs(e,t,a),fl(e,t,a)):(N&&r&&ca(t),t.flags|=1,Lc(e,t,n,a),t.child)}function Xc(e,t,n,r,i){if(ja(t),t.stateNode===null){var a=Ri,o=n.contextType;typeof o==`object`&&o&&(a=Ma(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Cc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},xo(t),o=n.contextType,a.context=typeof o==`object`&&o?Ma(o):Ri,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Sc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Cc.enqueueReplaceState(a,a.state,null),ko(t,r,a,i),Oo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ec(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ri,typeof u==`object`&&u&&(o=Ma(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Tc(t,a,r,o),bo=!1;var f=t.memoizedState;a.state=f,ko(t,r,a,i),Oo(),l=t.memoizedState,s||f!==l||bo?(typeof d==`function`&&(Sc(t,n,d,r),l=t.memoizedState),(c=bo||wc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,So(e,t),o=t.memoizedProps,u=Ec(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ri,typeof l==`object`&&l&&(c=Ma(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Tc(t,a,r,c),bo=!1,f=t.memoizedState,a.state=f,ko(t,r,a,i),Oo();var p=t.memoizedState;o!==d||f!==p||bo||e!==null&&e.dependencies!==null&&Aa(e.dependencies)?(typeof s==`function`&&(Sc(t,n,s,r),p=t.memoizedState),(u=bo||wc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Aa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,qc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=vo(t,e.child,null,i),t.child=vo(t,null,n,i)):Lc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=fl(e,t,i),e}function Zc(e,t,n,r){return ya(),t.flags|=256,Lc(e,t,n,r),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $c(e){return{baseLanes:e,cachePool:eo()}}function el(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function tl(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Wo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(N){if(i?zo(t):Ho(),(e=M)?(e=am(e,pa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ra===null?null:{id:ia,overflow:aa},retryLane:536870912,hydrationErrors:null},n=qi(e),n.return=t,t.child=n,da=t,M=null)):e=null,e===null)throw ha(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Ho(),i=t.mode,a=rl({mode:`hidden`,children:a},i),r=Gi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=$c(n),r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(null,r)):(zo(t),nl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return al(e,t,a,o,r,c,s,n)}return i?(Ho(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Hi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Gi(i,a,n,null),i.flags|=2):i=Hi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Hc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=$c(n):(a=i.cachePool,a===null?a=eo():(s=P._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=el(e,o,n),t.memoizedState=Qc,Hc(e.child,r)):(zo(t),n=e.child,e=n.sibling,n=Hi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=rl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function rl(e,t){return e=Bi(22,e,null,t),e.lanes=0,e}function il(e,t,n){return vo(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function al(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(zo(t),t.flags&=-257,il(e,t,c)):t.memoizedState===null?(Ho(),o=a.fallback,s=t.mode,a=rl({mode:`visible`,children:a.children},s),o=Gi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,vo(t,e.child,null,c),a=t.child,a.memoizedState=$c(c),a.childLanes=el(e,r,c),t.memoizedState=Qc,Hc(null,a)):(Ho(),t.child=e.child,t.flags|=128,null);if(zo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,xa({value:a,source:null,stack:null})),il(e,t,c)}if(B||ka(e,t,c,!1),r=(c&e.childLanes)!==0,B||r){if(Mo.current!==null)return il(e,t,c);if(r=G,r!==null&&(a=Dt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Fi(e,a),Pd(r,e,a),Ic;return om(o)||Kd(),il(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,M=lm(o.nextSibling),da=t,N=!0,fa=null,pa=!1,e!==null&&ua(t,e),t=nl(t,a.children),t.flags|=134221824,t)}function ol(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Da(e.return,t,n)}function sl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&qo(n)===null&&(t=e),e=e.sibling}return t}function cl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function ll(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ul(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Wo.current;if(t.flags&128)return Go(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Go(t,o),i===`backwards`&&e!==null?(ll(e),Lc(e,t,r,n),ll(e)):Lc(e,t,r,n),r=N?ea:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ol(e,n,t);else if(e.tag===19)ol(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,ll(t)),cl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&qo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}cl(t,!0,n,null,a,r);break;case`together`:cl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=sl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),cl(t,!1,i,n,a,r)}return t.child}function dl(e,t,n){var r=t.pendingProps;return Ta(t,t.type,r.value),Lc(e,t,r.children,n),t.child}function fl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ka(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Hi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Hi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function pl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Aa(e)))}function ml(e,t,n){switch(t.tag){case 3:Ie(t,t.stateNode.containerInfo),Ta(t,P,e.memoizedState.cache),ya();break;case 27:case 5:Re(t);break;case 4:Ie(t,t.stateNode.containerInfo);break;case 10:Ta(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Bo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return zo(t),t.flags|=128,null;r=ka(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?tl(e,t,n):(zo(t),e=fl(e,t,n),e===null?null:e.sibling)}zo(t);break;case 19:if(t.flags&128)return ul(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ka(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ul(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Go(t,Wo.current),r)break;return null;case 22:return t.lanes=0,Vc(e,t,n,t.pendingProps);case 24:Ta(t,P,e.memoizedState.cache)}return fl(e,t,n)}function hl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)B=!0;else{if(!pl(e,n)&&!(t.flags&128))return B=!1,ml(e,t,n);B=!!(e.flags&131072)}}else B=!1,N&&t.flags&1048576&&sa(t,ea,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=so(t.elementType),t.type=e,typeof e==`function`)Vi(e)?(r=Ec(e,r),t.tag=1,t=Xc(null,t,e,r,n)):(t.tag=0,t=Jc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===fe){t.tag=11,t=Rc(null,t,e,r,n);break a}if(a===he){t.tag=14,t=zc(null,t,e,r,n);break a}if(a===de){t.tag=10,t.type=e,t=dl(null,t,n);break a}}throw t=Te(e)||e,Error(i(306,t,``))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ec(r,t.pendingProps),Xc(e,t,r,a,n);case 3:a:{if(Ie(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,So(e,t),ko(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ta(t,P,r),r!==o.cache&&Oa(t,[P],n,!0),Oo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Zc(e,t,r,n);break a}if(r!==a){a=Xi(Error(i(424)),t),xa(a),t=Zc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(M=lm(e.firstChild),da=t,N=!0,fa=null,pa=!0,n=yo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ya(),r===a){t=fl(e,t,n);break a}Lc(e,t,r,n)}t=t.child}return t;case 26:return qc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:N||(t.stateNode=fp(t.type,t.pendingProps,Pe.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Re(t),e===null&&N&&(r=t.stateNode=hm(t.type,t.pendingProps,Pe.current),da=t,pa=!0,a=M,Sp(t.type)?(um=a,M=lm(r.firstChild)):M=a),Lc(e,t,t.pendingProps.children,n),qc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&N&&((a=r=M)&&(r=rm(r,t.type,t.pendingProps,pa),r===null?a=!1:(t.stateNode=r,da=t,M=lm(r.firstChild),pa=!1,a=!0)),a||ha(t)),Re(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=rs(e,t,os,null,null,n),sh._currentValue=a),qc(e,t),Lc(e,t,r,n),t.child;case 6:return e===null&&N&&((e=n=M)&&(n=im(n,t.pendingProps,pa),n===null?e=!1:(t.stateNode=n,da=t,M=null,e=!0)),e||ha(t)),null;case 13:return tl(e,t,n);case 4:return Ie(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=vo(t,null,r,n):Lc(e,t,r,n),t.child;case 11:return Rc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,qc(e,t),Lc(e,t,r,n),t.child;case 8:return Lc(e,t,t.pendingProps.children,n),t.child;case 12:return Lc(e,t,t.pendingProps.children,n),t.child;case 10:return dl(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,ja(t),a=Ma(a),r=r(a),t.flags|=1,Lc(e,t,r,n),t.child;case 14:return zc(e,t,t.type,t.pendingProps,n);case 15:return Bc(e,t,t.type,t.pendingProps,n);case 19:return ul(e,t,n);case 31:return Kc(e,t,n);case 22:return Vc(e,t,n,t.pendingProps);case 24:return ja(t),r=Ma(P),e===null?(a=Qa(),a===null&&(a=G,o=Ra(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},xo(t),Ta(t,P,a)):((e.lanes&n)!==0&&(So(e,t),ko(t,null,null,n),Oo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ta(t,P,r),r!==a.cache&&Oa(t,[P],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ta(t,P,r))),Lc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:N&&ca(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:qc(e,t),Lc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function gl(e){e.flags|=4}function _l(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw co=io,no}}else e.flags&=-16777217}function vl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw co=io,no}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:xt(),e.lanes|=t,dd|=t)}function bl(e,t){if(!N)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function V(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xl(e,t,n){var r=t.pendingProps;switch(la(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return V(t),null;case 1:return V(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ea(P),Le(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(va(t)?gl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ba())),V(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(gl(t),o===null?(V(t),_l(t,a,null,r,n)):(V(t),vl(t,o))):o?o===e.memoizedState?(V(t),t.flags&=-16777217):(gl(t),V(t),vl(t,o)):(e=e.memoizedProps,e!==r&&gl(t),V(t),_l(t,a,e,r,n)),null;case 27:if(ze(t),n=Pe.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}e=Me.current,va(t)?ga(t,e):(e=hm(a,r,n),t.stateNode=e,gl(t))}return V(t),t.subtreeFlags&=-33554433,null;case 5:if(ze(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return V(t),t.subtreeFlags&=-33554433,null}if(o=Me.current,va(t))ga(t,o);else{var s=lp(Pe.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[O]=t,o[Nt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&gl(t)}}return V(t),t.subtreeFlags&=-33554433,_l(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&gl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Pe.current,va(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=da,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[O]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ha(t,!0)}else e=lp(e).createTextNode(r),e[O]=t,t.stateNode=e}return V(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=va(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[O]=t}else ya(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),e=!1}else n=ba(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Uo(t),t):(Uo(t),null);if(t.flags&128)throw Error(i(558))}return V(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=va(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[O]=t}else ya(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;V(t),a=!1}else a=ba(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Uo(t),t):(Uo(t),null)}return Uo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),yl(t,t.updateQueue),V(t),null);case 4:return Le(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,V(t),null;case 10:return Ea(t.type),V(t),null;case 19:if(Ko(t),r=t.memoizedState,r===null)return V(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)bl(r,!1);else{if(Y!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=qo(e),o!==null){for(t.flags|=128,bl(r,!1),e=o.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ui(n,e),n=n.sibling;return Go(t,Wo.current&1|2),N&&oa(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Qe()>_d&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=qo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),bl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!N)return V(t),null}else 2*Qe()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,bl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Qe(),e.sibling=null,o=Wo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||N?Go(t,o):(n=o,E(Lo,t),E(Wo,n),Ro===null&&(Ro=t)),N&&oa(t,r.treeForkCount),e}return V(t),null;case 22:case 23:return Uo(t),Io(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(V(t),t.subtreeFlags&6&&(t.flags|=8192)):V(t),n=t.updateQueue,n!==null&&yl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&je(Za),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ea(P),V(t),null;case 25:return null;case 30:return t.flags|=33554432,V(t),null}throw Error(i(156,t.tag))}function Sl(e,t){switch(la(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ea(P),Le(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ze(t),null;case 31:if(t.memoizedState!==null){if(Uo(t),t.alternate===null)throw Error(i(340));ya()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Uo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ya()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ko(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Le(),null;case 10:return Ea(t.type),null;case 22:case 23:return Uo(t),Io(),e!==null&&je(Za),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ea(P),null;case 25:return null;default:return null}}function Cl(e,t){switch(la(t),t.tag){case 3:Ea(P),Le();break;case 26:case 27:case 5:ze(t);break;case 4:Le();break;case 31:t.memoizedState!==null&&Uo(t);break;case 13:Uo(t);break;case 19:Ko(t);break;case 10:Ea(t.type);break;case 22:case 23:Uo(t),Io(),e!==null&&je(Za);break;case 24:Ea(P)}}function wl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Tl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function El(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{jo(t,n)}catch(t){Z(e,e.return,t)}}}function Dl(e,t,n){n.props=Ec(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Ol(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=Ti(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function kl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Al(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function jl(e){for(var t=e.return;t!==null&&(Pl(t)&&em(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Ml(e){for(var t=e.return;t!==null&&(Pl(t)&&tm(e.stateNode,t.stateNode),!Nl(t));)t=t.return}function Nl(e){return e.tag===5||e.tag===3||e.tag===27}function Pl(e){return e&&e.tag===7&&e.stateNode!==null}function Fl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Il(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Nt]=t}catch(t){Z(e,e.return,t)}}function Ll(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Rl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ll(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=En)),Al(e,r),j=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Al(e,r),j=!0;else if(i!==4&&(i===27&&(Al(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Bl(e,t,n,r),e=e.sibling;e!==null;)Bl(e,t,n,r),e=e.sibling}function Vl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[O]=e,t[Nt]=n}catch(t){Z(e,e.return,t)}}var Hl=!1,Ul=null;function Wl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Hl=!0)}var Gl=null;function Kl(){var e=Gl;return Gl=null,e}var ql=0;function Jl(e,t,n,r,i){return ql=0,Yl(e.child,t,n,r,i)}function Yl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Hl=!0,Tp(o,ql===0?t:t+`_`+ql,n),ql++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Yl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Xl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Xl(e.child,t),e=e.sibling}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=Di(t.default,t.share),t!==`none`&&(Jl(e,n,t,null,!1)||Xl(e.child,!1))}e=e.sibling}}function Ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=Ti(r,n),a=Di(r.default,n.paired?r.share:r.enter);a===`none`?Zl(e):Jl(e,i,a,null,!1)?(Zl(e),n.paired||t||Nd(e,r.onEnter)):Xl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e,t),e=e.sibling;else Zl(e)}function $l(e){if(Ul!==null&&Ul.size!==0){var t=Ul;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=Di(n.default,n.share);if(a!==`none`&&(Jl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Xl(e.child,!1)),t.delete(r),t.size===0)break}}}$l(e)}e=e.sibling}}}function eu(e){if(e.tag===30){var t=e.memoizedProps,n=Ti(t,e.stateNode),r=Ul===null?void 0:Ul.get(n),i=Di(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Jl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ul.delete(n),Nd(e,t.onShare)):Xl(e.child,!1)),Ul!==null&&$l(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)eu(e),e=e.sibling;else Ul!==null&&$l(e)}function tu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Ti(t,e.stateNode);t=Di(t.default,t.update),e.flags&=-5,t!==`none`&&Jl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&tu(e);e=e.sibling}}function nu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xl(e.child,!1))}nu(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,Xl(e.child,!1),nu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ru(e),e=e.sibling;else nu(e)}function iu(e){for(e=e.child;e!==null;)e.tag===30?Xl(e.child,!1):e.subtreeFlags&33554432&&iu(e),e=e.sibling}function au(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&ql<a.length){var l=a[ql],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,ql===0?n:n+`_`+ql,i),s&&e.flags&4||(Gl===null&&(Gl=[]),Gl.push(c,ql===0?r:r+`_`+ql,t.memoizedProps)),ql++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:au(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function ou(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=Ti(n,r),a=Di(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;ql=0,i=au(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&ou(e,t);e=e.sibling}}var su=!1,H=!1,cu=!1,lu=!1,uu=typeof WeakSet==`function`?WeakSet:Set,du=null,fu=!1,pu=!1,mu=!1,hu=!1;function gu(e,t,n){if(e=e.containerInfo,sp=gh,e=ti(e),ni(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,du=t,t=n?9270:1024;du!==null;){if(e=du,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&eu(r[a]);if(e.alternate===null&&e.flags&2)n&&Wl(e),_u(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&eu(r),_u(n);continue}if(r!==null&&r.memoizedState!==null){n&&Wl(e),_u(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,du=r):(n&&tu(e),_u(n))}}Ul=null}function _u(e){for(;du!==null;){var t=du,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Ec(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=Ti(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=Di(a.default,a.update),a!==`none`&&Jl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,du=r;break}du=t.return}}function vu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Lu(e,n),r&4&&wl(5,n);break;case 1:if(Lu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ec(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&El(n),r&512&&Ol(n,n.return);break;case 3:if(Lu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{jo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Vl(n);case 26:case 5:Lu(e,n),t===null&&r&4&&Fl(n),r&512&&Ol(n,n.return);break;case 12:Lu(e,n);break;case 31:Lu(e,n),r&4&&Eu(e,n);break;case 13:Lu(e,n),r&4&&Du(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||su,!r){var a=t!==null&&t.memoizedState!==null||H;t=su,i=H,su=r,(H=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),zu(e,n,r)):Lu(e,n),su=t,H=i}break;case 30:Lu(e,n),r&512&&Ol(n,n.return);break;case 7:r&512&&Ol(n,n.return);default:Lu(e,n)}}function yu(e,t){for(e=e.child;e!==null;)bu(e,t),e=e.sibling}function bu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}xu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,j=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&yu(e,t);break;default:yu(e,t)}}function xu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:bu(n,r);break a;case 22:n.memoizedState===null&&xu(n,r);break a;default:xu(n,r)}}e=e.sibling}}function Su(e){var t=e.alternate;t!==null&&(e.alternate=null,Su(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Vt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var U=null,Cu=!1;function wu(e,t,n){for(n=n.child;n!==null;)Tu(e,t,n),n=n.sibling}function Tu(e,t,n){if(ct&&typeof ct.onCommitFiberUnmount==`function`)try{ct.onCommitFiberUnmount(st,n)}catch{}switch(n.tag){case 26:H||kl(n,t),wu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!H&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:H||kl(n,t),Ml(n);var r=U,i=Cu;Sp(n.type)&&(U=n.stateNode,Cu=!1),wu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),U=r,Cu=i;break;case 5:H||kl(n,t),Ml(n);case 6:if(n.tag===6&&Ml(n),r=U,i=Cu,U=null,wu(e,t,n),U=r,Cu=i,U!==null){if(Cu)try{(U.nodeType===9?U.body:U.nodeName===`HTML`?U.ownerDocument.body:U).removeChild(n.stateNode),j=!0}catch(e){Z(n,t,e)}else try{U.removeChild(n.stateNode),j=!0}catch(e){Z(n,t,e)}}break;case 18:U!==null&&(Cu?(e=U,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(U,n.stateNode));break;case 4:r=U,i=Cu,U=n.stateNode.containerInfo,Cu=!0,wu(e,t,n),U=r,Cu=i;break;case 0:case 11:case 14:case 15:Tl(2,n,t),H||Tl(4,n,t),wu(e,t,n);break;case 1:H||(kl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Dl(n,t,r)),wu(e,t,n);break;case 21:wu(e,t,n);break;case 22:H=(r=H)||n.memoizedState!==null,wu(e,t,n),H=r;break;case 30:kl(n,t),wu(e,t,n);break;case 7:H||kl(n,t),wu(e,t,n);break;default:wu(e,t,n)}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Du(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Ou(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new uu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new uu),t;default:throw Error(i(435,e.tag))}}function ku(e,t){var n=Ou(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Au(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){U=l.stateNode,Cu=!1;break a}break;case 5:U=l.stateNode,Cu=!1;break a;case 3:case 4:U=l.stateNode.containerInfo,Cu=!0;break a}l=l.return}if(U===null)throw Error(i(160));Tu(s,c,o),U=null,Cu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Mu(t,e,n),t=t.sibling}var ju=null;function Mu(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Au(t,e,n),Nu(e),a&4&&(Tl(3,e,e.return),wl(3,e),Tl(5,e,e.return));break;case 1:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&64&&su&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ju,Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(su)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[zt]||r[O]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[O]=e,k(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[O]=e,k(r),t=r}e.stateNode=t}}else su||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Il(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||H||t.parentNode.removeChild(t)):a.count--,n===null?su||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Au(t,e,n),Nu(e),a&512&&(H||r===null||kl(r,r.return)),r!==null&&a&4&&Il(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=cu,cu=!1,Au(t,e,n),cu=o,Nu(e),a&512&&(H||r===null||kl(r,r.return)),e.flags&32){t=e.stateNode;try{vn(t,``),j=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Il(e,t,r===null?t:r.memoizedProps)),a&1024&&(lu=!0);break;case 6:if(Au(t,e,n),Nu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,j=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(j=!1,Wm=null,o=ju,ju=bm(t.containerInfo),Au(t,e,n),ju=o,Nu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}lu&&(lu=!1,Pu(e)),j=!1;break;case 4:a=cu,cu=su,r=en(),o=ju,ju=bm(e.stateNode.containerInfo),Au(t,e,n),Nu(e),ju=o,j&&pu&&(mu=!0),j=r,cu=a;break;case 12:Au(t,e,n),Nu(e);break;case 31:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 13:Au(t,e,n),Nu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Qe()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=su,l=H,u=cu;su=c||o,cu=u||o,H=l||s,Au(t,e,n),H=l,cu=u,su=c,Nu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||su||H||(t=s||H,n=su,r=H,su=o||su,H=t,Ru(e,2),su=n,H=r),!o&&cu||yu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,ku(e,n))));break;case 19:Au(t,e,n),Nu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,ku(e,t)));break;case 30:a&512&&(H||r===null||kl(r,r.return)),a=en(),o=pu,s=(n&335544064)===n,c=e.memoizedProps,pu=s&&Di(c.default,c.update)!==`none`,Au(t,e,n),Nu(e),s&&r!==null&&j&&(e.flags|=4),pu=o,j=a;break;case 21:break;case 7:a&512&&(H||r===null||kl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Au(t,e,n),Nu(e)}}function Nu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ll(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Pl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Nl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Bl(e,Rl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(vn(l,``),n.flags&=-33),Bl(e,Rl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;zl(e,Rl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Pu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Pu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Fu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Iu(t,e),t=t.sibling;else ou(t,!1)}function Iu(e,t){var n=e.alternate;if(n===null)Ql(e,!1);else switch(e.tag){case 3:if(hu=fu=!1,Kl(),Fu(t,e),!fu&&!mu){if(e=Gl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),hu=!0}Gl=null;break;case 5:Fu(t,e);break;case 4:r=fu,fu=!1,Fu(t,e),fu&&(mu=!0),fu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Fu(t,e):Ql(e,!1));break;case 30:r=fu,i=Kl(),fu=!1,Fu(t,e),fu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=Ti(a,o),o=Ti(n.memoizedProps,o);var s=Di(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,ql=0,t=au(e,n,t,o,s,a,!0),ql!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Gl=i):i!==null&&(i.push.apply(i,Gl),Gl=i),fu=e.flags&32?!0:r;break;default:Fu(t,e)}}function Lu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)vu(e,t.alternate,t),t=t.sibling}function Ru(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Tl(4,n,n.return),Ru(n,r);break;case 1:kl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Dl(n,n.return,i),Ru(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:kl(n,n.return),n.tag!==5&&n.tag!==27||Ml(n),Ru(n,r);break;case 6:Ml(n);break;case 26:kl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||H||i.parentNode.removeChild(i),Ru(n,r);break;case 22:n.memoizedState===null&&Ru(n,r);break;case 30:kl(n,n.return),Ru(n,r);break;case 7:kl(n,n.return);default:Ru(n,r)}e=e.sibling}}function zu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:zu(i,a,n),wl(4,a);break;case 1:if(zu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Ao(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&El(a),Ol(a,a.return);break;case 27:n&2&&Vl(a);case 5:a.tag!==5&&a.tag!==27||jl(a),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 6:jl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||su||Km(bm(c.ownerDocument),a.type,c),zu(i,a,n),s&&r===null&&o&4&&Fl(a),Ol(a,a.return);break;case 12:zu(i,a,n);break;case 31:zu(i,a,n),s&&o&4&&Eu(i,a);break;case 13:zu(i,a,n),s&&o&4&&Du(i,a);break;case 22:a.memoizedState===null&&zu(i,a,n),Ol(a,a.return);break;case 30:zu(i,a,n),Ol(a,a.return);break;case 7:Ol(a,a.return);default:zu(i,a,n)}t=t.sibling}}function Bu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&za(n))}function Vu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&za(e))}function Hu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Uu(e,t,n,r),t=t.sibling;else i&&iu(t)}function Uu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ru(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Hu(e,t,n,r),a&2048&&wl(9,t);break;case 1:Hu(e,t,n,r);break;case 3:Hu(e,t,n,r),i&&hu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&za(a)));break;case 12:if(a&2048){Hu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Hu(e,t,n,r);break;case 31:Hu(e,t,n,r);break;case 13:Hu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&ru(t),o._visibility&2?Hu(e,t,n,r):(o._visibility|=2,Wu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&ru(s),o._visibility&2?Hu(e,t,n,r):Gu(e,t)),a&2048&&Bu(s,t);break;case 24:Hu(e,t,n,r),a&2048&&Vu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Xl(a.child,!0),Xl(t.child,!0))),Hu(e,t,n,r);break;default:Hu(e,t,n,r)}}function Wu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Wu(a,o,s,c,i),wl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Wu(a,o,s,c,i)):u._visibility&2?Wu(a,o,s,c,i):Gu(a,o),i&&l&2048&&Bu(o.alternate,o);break;case 24:Wu(a,o,s,c,i),i&&l&2048&&Vu(o.alternate,o);break;default:Wu(a,o,s,c,i)}t=t.sibling}}function Gu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Gu(n,r),i&2048&&Bu(r.alternate,r);break;case 24:Gu(n,r),i&2048&&Vu(r.alternate,r);break;default:Gu(n,r)}t=t.sibling}}var Ku=8192;function qu(e,t,n){if(e.subtreeFlags&Ku)for(e=e.child;e!==null;)Ju(e,t,n),e=e.sibling}function Ju(e,t,n){switch(e.tag){case 26:qu(e,t,n),e.flags&Ku&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ju,e.memoizedState,e.memoizedProps));break;case 5:qu(e,t,n),e.flags&Ku&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ju;ju=bm(e.stateNode.containerInfo),qu(e,t,n),ju=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Ku,Ku=16777216,qu(e,t,n),Ku=r):qu(e,t,n));break;case 30:if((e.flags&Ku)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ul===null&&(Ul=new Map),Ul.set(r,i)}qu(e,t,n);break;default:qu(e,t,n)}}function Yu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Zu(e),e=e.sibling}function Zu(e){switch(e.tag){case 0:case 11:case 15:Xu(e),e.flags&2048&&Tl(9,e,e.return);break;case 3:Xu(e);break;case 12:Xu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Qu(e)):Xu(e);break;default:Xu(e)}}function Qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];du=r,$u(r,e)}Yu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Tl(8,t,t.return),Qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Qu(t));break;default:Qu(t)}e=e.sibling}}function $u(e,t){for(;du!==null;){var n=du;switch(n.tag){case 0:case 11:case 15:Tl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:za(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,du=r;else a:for(n=e;du!==null;){r=du;var i=r.sibling,a=r.return;if(Su(r),r===n){du=null;break a}if(i!==null){i.return=a,du=i;break a}du=a}}}var ed={getCacheForType:function(e){var t=Ma(P),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ma(P).controller.signal}},td=typeof WeakMap==`function`?WeakMap:Map,W=0,G=null,K=null,q=0,J=0,nd=null,rd=!1,id=!1,ad=!1,od=0,Y=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return W&2&&q!==0?q&-q:w.T===null?At():Pf()}function Md(){if(ud===0){if(!(q&536870912)||N){var e=mt;mt<<=1,!(mt&3932160)&&(mt=262144),ud=e}else ud=536870912}return e=Lo.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(Ti(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===G&&(J===2||J===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,q,ud,!1)),Ct(e,n),W&2&&e===G||(e===G&&(!(W&2)&&(cd|=n),Y===4&&Rd(e,q,ud,!1)),Ef(e))}function Fd(e,t,n){if(W&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||vt(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){id&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(ad&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!rd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-Qe(),10<a)){if(Rd(r,t,ud,!rd),_t(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,rd,o,`Throttled`,-0,0),a);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,rd,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:En},Ul=null,Ju(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Qe():(a&4194048)===a?gd-Qe():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Yr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=yt(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-ut(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&Tt(e,n,t)}function zd(){return W&6?!0:(Df(0,!1),!1)}function Bd(){if(K!==null){if(J===0)var e=K.return;else e=K,wa=Ca=null,ls(e),fo=null,po=0,e=K;for(;e!==null;)Cl(e.alternate,e),e=e.return;K=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),G=e,K=n=Hi(e.current,null),q=t,J=0,nd=null,rd=!1,id=vt(e,t),ad=!1,dd=ud=ld=cd=sd=Y=0,pd=fd=null,md=!1,od=yt(e,t),Mi(),n}function Hd(e,t){F=null,w.H=vc,t===to||t===ro?(t=lo(),J=3):t===no?(t=lo(),J=4):J=t===Ic?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,nd=t,K===null&&(Y=1,Ac(e,Xi(t,e.current)))}function Ud(){var e=Lo.current;return e===null?!0:(q&4194048)===q?Ro===null:(q&62914560)===q||q&536870912?e===Ro:!1}function Wd(){var e=w.H;return w.H=vc,e===null?vc:e}function Gd(){var e=w.A;return w.A=ed,e}function Kd(){Y=4,rd||(q&4194048)!==q&&Lo.current!==null||(id=!0),!(sd&134217727)&&!(cd&134217727)||G===null||Rd(G,q,ud,!1)}function qd(e,t,n){var r=W;W|=2;var i=Wd(),a=Gd();(G!==e||q!==t)&&(vd=null,Vd(e,t)),t=!1;var o=Y;a:do try{if(J!==0&&K!==null){var s=K,c=nd;switch(J){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Lo.current===null&&(t=!0);var l=J;if(J=0,nd=null,$d(e,s,c,l),n&&id){o=0;break a}break;default:l=J,J=0,nd=null,$d(e,s,c,l)}}Jd(),o=Y;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,wa=Ca=null,W=r,w.H=i,w.A=a,K===null&&(G=null,q=0,Mi()),o}function Jd(){for(;K!==null;)Zd(K)}function Yd(e,t){var n=W;W|=2;var r=Wd(),a=Gd();G!==e||q!==t?(vd=null,_d=Qe()+500,Vd(e,t)):id=vt(e,t);a:do try{if(J!==0&&K!==null){t=K;var o=nd;b:switch(J){case 1:J=0,nd=null,$d(e,t,o,1);break;case 2:case 9:if(ao(o)){J=0,nd=null,Qd(t);break}t=function(){J!==2&&J!==9||G!==e||(J=7),Ef(e)},o.then(t,t);break a;case 3:J=7;break a;case 4:J=5;break a;case 7:ao(o)?(J=0,nd=null,Qd(t)):(J=0,nd=null,$d(e,t,o,7));break;case 5:var s=null;switch(K.tag){case 26:s=K.memoizedState;case 5:case 27:var c=K;if(s?Ym(s):c.stateNode.complete){J=0,nd=null;var l=c.sibling;if(l!==null)K=l;else{var u=c.return;u===null?K=null:(K=u,ef(u))}break b}}J=0,nd=null,$d(e,t,o,5);break;case 6:J=0,nd=null,$d(e,t,o,6);break;case 8:Bd(),Y=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return wa=Ca=null,w.H=r,w.A=a,W=n,K===null?(G=null,q=0,Mi(),Y):0}function Xd(){for(;K!==null&&!Xe();)Zd(K)}function Zd(e){var t=hl(e.alternate,e,od);e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yc(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Yc(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:ls(t);var r=t;r===da&&(N?(_a(r),r.tag===5&&r.stateNode!=null&&(M=r.stateNode)):(_a(r),N=!0));default:Cl(n,t),t=K=Ui(t,od),t=hl(n,t,od)}e.memoizedProps=e.pendingProps,t===null?ef(e):K=t}function $d(e,t,n,r){wa=Ca=null,ls(t),fo=null,po=0;var i=t.return;try{if(Fc(e,i,t,n,q)){Y=1,Ac(e,Xi(n,e.current)),K=null;return}}catch(t){if(i!==null)throw K=i,t;Y=1,Ac(e,Xi(n,e.current)),K=null;return}t.flags&32768?(N||r===1?e=!0:id||q&536870912?e=!1:(rd=e=!0,(r===2||r===9||r===3||r===6)&&(r=Lo.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,rd);return}e=t.return;var n=xl(t.alternate,t,od);if(n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Y===0&&(Y=5)}function tf(e,t){do{var n=Sl(e.alternate,e);if(n!==null){n.flags&=32767,K=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){K=e;return}K=e=n}while(e!==null);Y=6,K=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(W&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===G&&(K=G=null,q=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=ji,wt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ha(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(nt,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Hl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=w.T,w.T=null,i=T.p,T.p=2,a=W,W|=4;try{gu(e,t,n)}finally{W=a,T.p=i,w.T=r}}X=1,Hl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Iu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=w.T,w.T=null;var i=T.p;T.p=2;var a=W;W|=4;try{pu=mu=!1,Mu(t,e,n),n=cp;var o=ti(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&ei(s.ownerDocument.documentElement,s)){if(c!==null&&ni(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=$r(s,h),v=$r(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{W=a,T.p=i,w.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=w.T,w.T=null;var r=T.p;T.p=2;var i=W;W|=4;try{vu(e,t.alternate,t)}finally{W=i,T.p=r,w.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,Ze();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),kt(r),n=n.stateNode,ct&&typeof ct.onCommitFiberRoot==`function`)try{ct.onCommitFiberRoot(st,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=w.T,a=T.p,T.p=2,w.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{w.T=n,T.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,za(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=kt(Sd),r=w.T,a=T.p;try{T.p=32>n?32:n,w.T=null,n=wd,wd=null;var o=bd,s=Sd;if(X=0,xd=bd=null,Sd=0,W&6)throw Error(i(331));var c=W;if(W|=4,Zu(o.current),Uu(o,o.current,s,n),W=c,Df(0,!1),ct&&typeof ct.onPostCommitFiberRoot==`function`)try{ct.onPostCommitFiberRoot(st,o)}catch{}return!0}finally{T.p=a,w.T=r,uf(e,t)}}function pf(e,t,n){t=Xi(n,t),t=Mc(e.stateNode,t,2),e=wo(e,t,2),e!==null&&(Ct(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Xi(n,e),n=Nc(2),r=wo(t,n,2),r!==null&&(Pc(n,r,t,e),Ct(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new td;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ad=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,G===e&&(q&n)===n&&(Y===4||Y===3&&(q&62914560)===q&&300>Qe()-hd?W&2?ld|=n:Vd(e,0):ld|=n,dd===q&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=xt()),e=Fi(e,t),e!==null&&(Ct(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Je(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-ut(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=q,a=_t(r,r===G?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||vt(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Qe(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-ut(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=bt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=G,n=q,n=_t(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(J===2||J===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ye(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||vt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ye(r),kt(n)){case 2:case 8:n=tt;break;case 32:n=nt;break;case 268435456:n=it;break;default:n=nt}return r=jf.bind(null,e),n=Je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ye(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=q;return r=_t(e,e===G?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Qe()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){W&6?Je(et,Of):kf()})}function Pf(){if(Tf===0){var e=Ga;e===0&&(e=pt,pt<<=1,!(pt&261888)&&(pt=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Tn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Nt]||null).action),o=r.submitter;o&&(t=(t=o[Nt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new qn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);ic(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),ic(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<Si.length;Lf++){var Rf=Si[Lf];Ci(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}Ci(mi,`onAnimationEnd`),Ci(hi,`onAnimationIteration`),Ci(gi,`onAnimationStart`),Ci(`dblclick`,`onDoubleClick`),Ci(`focusin`,`onFocus`),Ci(`focusout`,`onBlur`),Ci(_i,`onTransitionRun`),Ci(vi,`onTransitionStart`),Ci(yi,`onTransitionCancel`),Ci(bi,`onTransitionEnd`),Yt(`onMouseEnter`,[`mouseout`,`mouseover`]),Yt(`onMouseLeave`,[`mouseout`,`mouseover`]),Yt(`onPointerEnter`,[`pointerout`,`pointerover`]),Yt(`onPointerLeave`,[`pointerout`,`pointerover`]),Jt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Jt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Jt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Jt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Jt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Jt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Oi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Oi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Ft];n===void 0&&(n=t[Ft]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,A.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!In||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ht(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}Nn(function(){var r=a,i=On(n),s=[];a:{var c=xi.get(e);if(c!==void 0){var l=qn,u=e;switch(e){case`keypress`:if(Hn(n)===0)break a;case`keydown`:case`keyup`:l=dr;break;case`focusin`:u=`focus`,l=nr;break;case`focusout`:u=`blur`,l=nr;break;case`beforeblur`:case`afterblur`:l=nr;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=er;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=tr;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=mr;break;case mi:case hi:case gi:l=rr;break;case bi:l=hr;break;case`scroll`:case`scrollend`:l=Yn;break;case`wheel`:l=gr;break;case`copy`:case`cut`:case`paste`:l=ir;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=fr;break;case`submit`:l=pr;break;case`toggle`:case`beforetoggle`:l=_r}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Pn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==Dn&&(u=n.relatedTarget||n.fromElement)&&(Ht(u)||u[Pt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ht(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=er,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=fr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Wt(c),h=l==null?u:Wt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ht(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?re(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Lr;else if(jr(c)){if(Rr)_=qr;else{_=Gr;var v=Wr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Sn(r.elementType)&&(_=Lr):_=Kr;if(_&&=_(e,r)){Mr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Wt(r):window,e){case`focusin`:(jr(v)||v.contentEditable===`true`)&&(ii=v,ai=r,oi=null);break;case`focusout`:oi=ai=ii=null;break;case`mousedown`:si=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:si=!1,ci(s,n,i);break;case`selectionchange`:if(ri)break;case`keydown`:case`keyup`:ci(s,n,i)}var y;if(yr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else Dr?Tr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(Sr&&n.locale!==`ko`&&(Dr||b!==`onCompositionStart`?b===`onCompositionEnd`&&Dr&&(y=Vn()):(Rn=i,zn=`value`in Rn?Rn.value:Rn.textContent,Dr=!0)),v=Jf(r,b),0<v.length&&(b=new ar(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=Er(n),y!==null&&(b.data=y)))),(y=xr?Or(e,n):kr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new ar(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Pn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=Pn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Pn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=Pn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||vn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&vn(e,``+r);else return;break;case`className`:nn(e,`class`,r);break;case`tabIndex`:nn(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:nn(e,n,r);break;case`style`:xn(e,r,o);return;case`data`:if(t!==`object`){nn(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Tn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Tn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=En);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Tn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),tn(e,`popover`,r);break;case`xlinkActuate`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:rn(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:rn(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:rn(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:rn(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:tn(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=Cn.get(n)||n,tn(e,n,r);else return}j=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:xn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)vn(e,r);else if(typeof r==`number`||typeof r==`bigint`)vn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=En);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!qt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Nt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}j=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):tn(e,n,r)}return}j=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}pn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&hn(e,!!r,n,!0):hn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}_n(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Sn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(j=!0),o=m;break;case`name`:m!==f&&(j=!0),a=m;break;case`checked`:m!==f&&(j=!0),u=m;break;case`defaultChecked`:m!==f&&(j=!0),d=m;break;case`value`:m!==f&&(j=!0),s=m;break;case`defaultValue`:m!==f&&(j=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}fn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(j=!0),p=o;break;case`defaultValue`:o!==l&&(j=!0),c=o;break;case`multiple`:o!==l&&(j=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?hn(e,!!n,n?[]:``,!1):hn(e,!!n,t,!0)):hn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(j=!0),p=a;break;case`defaultValue`:a!==o&&(j=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}gn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(j=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Sn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[O]=r,n[Nt]=t,np(n,e,t),k(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[zt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:C({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Ht(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=re(n,a,S),t===null?t=!1:(h(t,!0,te,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=re(r,a,S),t===null?t=!1:(h(t,!0,ne,a,r),a=x,ee=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Vt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[zt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===En&&(e.onclick=null),Vt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Vt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=T.d;T.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Ut(e);t!==null&&t.tag===5&&t.type===`form`?oc(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=dn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),k(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+dn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+dn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+dn(n.imageSizes)+`"]`)):i+=`[href="`+dn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=C({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Bt]=!0,o.onload=o.onerror=function(){Kt(o)}),k(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+dn(r)+`"][href="`+dn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=C({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),k(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Gt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=C({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);k(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Gt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=C({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),k(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Gt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=C({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),k(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=Pe.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Gt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Gt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Gt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+dn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return C({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Bt]){r.loading=1;return}}else t=e.createElement(`link`),t[Bt]=!0,t.onload=t.onerror=Kt.bind(null,t),np(t,`link`,n),k(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+dn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+dn(n.href)+`"]`);if(r)return t.instance=r,k(r),r;var a=C({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),k(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,k(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),k(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,k(a),a):(r=n,(a=vm.get(o))&&(r=C({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),k(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[zt]||a[O]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,k(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),k(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:de,Provider:null,Consumer:null,_currentValue:De,_currentValue2:De,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=St(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=St(0),this.hiddenUpdates=St(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Bi(3,null,null,t),e.current=a,a.stateNode=e,t=Ra(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},xo(a),e}function uh(e){return e?(e=Ri,e):Ri}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=Co(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=wo(e,r,t),n!==null&&(Pd(n,e,t),To(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Fi(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=Ot(t);var n=Fi(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=2,yh(e,t,n,r)}finally{T.p=a,w.T=i}}function vh(e,t,n,r){var i=w.T;w.T=null;var a=T.p;try{T.p=8,yh(e,t,n,r)}finally{T.p=a,w.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Ut(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=gt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-ut(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(W&6)&&(_d=Qe()+500,Df(0,!1))}}break;case 31:case 13:s=Fi(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=On(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Ht(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch($e()){case et:return 2;case tt:return 8;case nt:case rt:return 32;case it:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ut(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Ht(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,jt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,jt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Dn=r,n.target.dispatchEvent(r),Dn=null}else return t=Ut(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Ut(n);a!==null&&(e.splice(t,3),t-=3,ic(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Nt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Nt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Pt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=At();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));T.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:w,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{st=Jh.inject(qh),ct=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Dc,s=Oc,c=kc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Pt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=c(g(),1),y=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),b=o(((e,t)=>{t.exports=y()}))(),x=[{category:`INTERACTIVE COMPONENT`,title:`Details you can feel.`,description:`A little depth changes everything.`,number:`01`,color:`#627f75`},{category:`THOUGHTFUL MOTION`,title:`Made to move.`,description:`Every action deserves a response.`,number:`02`,color:`#a45e48`},{category:`YOUR NEXT STARTING POINT`,title:`Build something yours.`,description:`Explore the idea. Make it your own.`,number:`03`,color:`#526c98`}];function ee(){let e=(0,_.useId)(),t=(0,_.useId)(),[n,r]=(0,_.useState)(0),[i,a]=(0,_.useState)(!0),[o,s]=(0,_.useState)(18),[c,l]=(0,_.useState)([]),u=x[n],d=c.includes(n);function f(){l(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n])}return(0,b.jsxs)(`section`,{className:`tc-hero`,"aria-labelledby":e,children:[(0,b.jsxs)(`div`,{className:`tc-copy`,children:[(0,b.jsxs)(`p`,{className:`tc-eyebrow`,children:[(0,b.jsx)(`span`,{"aria-hidden":`true`}),`WEBCRAFT ATLAS — INTERFACE OBJECTS`]}),(0,b.jsxs)(`h1`,{id:e,children:[`Digital tools.`,(0,b.jsx)(`br`,{}),(0,b.jsx)(`span`,{children:`Physical feeling.`})]}),(0,b.jsx)(`p`,{className:`tc-intro`,children:`Discover components with character. Press the buttons, explore the materials, and take a better starting point into your next website.`}),(0,b.jsxs)(`div`,{className:`tc-actions`,children:[(0,b.jsxs)(`a`,{className:`tc-key tc-key-accent`,href:`#/components`,children:[`Explore components `,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsxs)(`a`,{className:`tc-text-link`,href:`#/guides/use-a-component`,children:[`How it works `,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`→`})]})]}),(0,b.jsxs)(`div`,{className:`tc-materials`,children:[(0,b.jsx)(`span`,{className:`tc-material-plastic`,"aria-hidden":`true`}),(0,b.jsx)(`span`,{className:`tc-material-metal`,"aria-hidden":`true`}),(0,b.jsx)(`span`,{className:`tc-material-glass`,"aria-hidden":`true`}),(0,b.jsxs)(`p`,{children:[`Material matters.`,(0,b.jsx)(`br`,{}),`So does every interaction.`]})]})]}),(0,b.jsx)(`div`,{className:`tc-desk`,children:(0,b.jsxs)(`div`,{className:`tc-console`,children:[(0,b.jsx)(`i`,{className:`tc-screw tc-screw-left`,"aria-hidden":`true`}),(0,b.jsx)(`i`,{className:`tc-screw tc-screw-right`,"aria-hidden":`true`}),(0,b.jsxs)(`div`,{className:`tc-console-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`tc-wordmark`,children:`ATLAS`}),(0,b.jsx)(`span`,{className:`tc-model`,children:`INTERACTION CONSOLE / 003`})]}),(0,b.jsxs)(`span`,{className:`tc-power`,children:[(0,b.jsx)(`i`,{"aria-hidden":`true`}),` READY`]})]}),(0,b.jsxs)(`div`,{className:`tc-bay ${i?`tc-glass-on`:``}`,style:{"--tc-lift":`${o}px`,"--tc-specimen":u.color},children:[(0,b.jsx)(`div`,{className:`tc-bay-grid`,"aria-hidden":`true`}),(0,b.jsx)(`div`,{className:`tc-card-shadow`,"aria-hidden":`true`}),(0,b.jsx)(`div`,{className:`tc-card-position`,children:(0,b.jsxs)(`article`,{className:`tc-card`,children:[(0,b.jsxs)(`div`,{className:`tc-card-art`,"aria-hidden":`true`,children:[(0,b.jsx)(`div`,{className:`tc-ring`}),(0,b.jsx)(`div`,{className:`tc-tile`}),(0,b.jsx)(`span`,{children:u.number})]}),(0,b.jsxs)(`div`,{className:`tc-card-content`,children:[(0,b.jsx)(`p`,{className:`tc-card-category`,children:u.category}),(0,b.jsx)(`h2`,{children:u.title}),(0,b.jsx)(`p`,{className:`tc-card-description`,children:u.description}),(0,b.jsx)(`button`,{className:`tc-card-save`,type:`button`,"aria-pressed":d,onClick:f,children:d?`Saved ✓`:`Keep this idea +`})]})]},n)}),(0,b.jsxs)(`span`,{className:`tc-bay-label`,"aria-hidden":`true`,children:[`MATERIAL STUDY — `,u.number]})]}),(0,b.jsxs)(`div`,{className:`tc-display`,role:`status`,children:[(0,b.jsx)(`span`,{className:`tc-display-label`,children:`PREVIEW STATUS`}),(0,b.jsxs)(`strong`,{children:[u.number,` / 03`,(0,b.jsx)(`span`,{children:d?`IDEA SAVED`:`TRY THE CONTROLS`})]})]}),(0,b.jsxs)(`div`,{className:`tc-controls`,children:[(0,b.jsxs)(`div`,{className:`tc-control`,children:[(0,b.jsx)(`span`,{className:`tc-control-label`,children:`SURFACE`}),(0,b.jsxs)(`button`,{className:`tc-switch`,type:`button`,role:`switch`,"aria-checked":i,"aria-label":`Frosted glass surface`,onClick:()=>a(e=>!e),children:[(0,b.jsx)(`span`,{className:`tc-switch-track`,"aria-hidden":`true`,children:(0,b.jsx)(`span`,{})}),(0,b.jsxs)(`span`,{children:[`Glass `,i?`on`:`off`]})]})]}),(0,b.jsxs)(`div`,{className:`tc-control`,children:[(0,b.jsx)(`label`,{className:`tc-control-label`,htmlFor:t,children:`ELEVATION`}),(0,b.jsxs)(`div`,{className:`tc-slider-row`,children:[(0,b.jsx)(`input`,{id:t,type:`range`,min:`0`,max:`32`,value:o,onChange:e=>s(Number(e.target.value))}),(0,b.jsx)(`output`,{htmlFor:t,children:o})]})]})]}),(0,b.jsxs)(`div`,{className:`tc-key-row`,children:[(0,b.jsxs)(`button`,{className:`tc-key`,type:`button`,"aria-label":`Previous specimen`,onClick:()=>r(e=>(e-1+x.length)%x.length),children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`←`}),` Previous`]}),(0,b.jsxs)(`button`,{className:`tc-key tc-key-accent`,type:`button`,onClick:()=>r(e=>(e+1)%x.length),children:[`Next specimen `,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`→`})]})]}),(0,b.jsxs)(`div`,{className:`tc-console-bottom`,children:[(0,b.jsx)(`span`,{children:`DESIGNED TO BE EXPLORED`}),(0,b.jsx)(`div`,{className:`tc-speaker`,"aria-hidden":`true`,children:Array.from({length:6},(e,t)=>(0,b.jsx)(`i`,{},t))})]})]})})]})}var te=[{id:`overview`,label:`Overview`,symbol:`◫`,heading:`A clearer view of the work.`,description:`Bring current projects, useful notes, and next steps into one place.`},{id:`projects`,label:`Projects`,symbol:`◇`,heading:`Ideas becoming something useful.`,description:`Your project collection would appear here, with progress and priorities.`},{id:`notes`,label:`Notes`,symbol:`≡`,heading:`Keep the useful details close.`,description:`Capture decisions, questions, and small discoveries as the work develops.`},{id:`settings`,label:`Settings`,symbol:`⚙`,heading:`Make the workspace your own.`,description:`Workspace preferences would appear here. This demonstration changes no account settings.`}];function ne(){let[e,t]=(0,_.useState)(!1),[n,r]=(0,_.useState)(`overview`),i=(0,_.useId)(),a=te.find(e=>e.id===n);return(0,b.jsxs)(`section`,{className:`dashboard-sidebar-example`,"data-collapsed":e,"aria-label":`Dashboard navigation demonstration`,children:[(0,b.jsxs)(`aside`,{className:`ds-sidebar`,children:[(0,b.jsxs)(`div`,{className:`ds-brand`,children:[(0,b.jsx)(`span`,{className:`ds-brand-symbol`,"aria-hidden":`true`,children:`f.`}),(0,b.jsx)(`span`,{className:`ds-expanded-label`,children:`Fieldnote`})]}),(0,b.jsxs)(`button`,{type:`button`,className:`ds-collapse`,"aria-label":e?`Expand sidebar labels`:`Collapse sidebar labels`,"aria-pressed":e,onClick:()=>t(e=>!e),children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:e?`→`:`←`}),(0,b.jsx)(`span`,{className:`ds-expanded-label`,children:`Compact mode`})]}),(0,b.jsx)(`nav`,{className:`ds-navigation`,"aria-label":`Example workspace`,children:te.map(t=>(0,b.jsxs)(`button`,{type:`button`,className:`ds-nav-button`,"aria-label":t.label,"aria-pressed":n===t.id,"aria-controls":`${i}-content`,title:e?t.label:void 0,onClick:()=>r(t.id),children:[(0,b.jsx)(`span`,{className:`ds-nav-symbol`,"aria-hidden":`true`,children:t.symbol}),(0,b.jsx)(`span`,{className:`ds-expanded-label`,children:t.label})]},t.id))}),(0,b.jsxs)(`div`,{className:`ds-profile`,children:[(0,b.jsx)(`span`,{className:`ds-avatar`,"aria-hidden":`true`,children:`FL`}),(0,b.jsxs)(`div`,{className:`ds-expanded-label`,children:[(0,b.jsx)(`strong`,{children:`Fictional workspace`}),(0,b.jsx)(`span`,{children:`Local demonstration`})]})]})]}),(0,b.jsxs)(`div`,{id:`${i}-content`,className:`ds-content`,role:`region`,"aria-label":a.label,children:[(0,b.jsxs)(`span`,{className:`ds-eyebrow`,children:[`WORKSPACE / `,a.label]}),(0,b.jsx)(`h3`,{children:a.heading}),(0,b.jsx)(`p`,{children:a.description}),(0,b.jsxs)(`div`,{className:`ds-content-illustration`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsxs)(`p`,{className:`ds-selection-status`,role:`status`,children:[a.label,` selected.`]}),(0,b.jsx)(`span`,{className:`ds-demo-note`,children:`Buttons switch local preview content. In a real application, use links for separate page destinations.`})]})]})}var S=`import { useId, useState } from "react";\r
import "./DashboardSidebar.css";\r
\r
const pages = [\r
  {\r
    id: "overview",\r
    label: "Overview",\r
    symbol: "◫",\r
    heading: "A clearer view of the work.",\r
    description:\r
      "Bring current projects, useful notes, and next steps into one place.",\r
  },\r
  {\r
    id: "projects",\r
    label: "Projects",\r
    symbol: "◇",\r
    heading: "Ideas becoming something useful.",\r
    description:\r
      "Your project collection would appear here, with progress and priorities.",\r
  },\r
  {\r
    id: "notes",\r
    label: "Notes",\r
    symbol: "≡",\r
    heading: "Keep the useful details close.",\r
    description:\r
      "Capture decisions, questions, and small discoveries as the work develops.",\r
  },\r
  {\r
    id: "settings",\r
    label: "Settings",\r
    symbol: "⚙",\r
    heading: "Make the workspace your own.",\r
    description:\r
      "Workspace preferences would appear here. This demonstration changes no account settings.",\r
  },\r
];\r
\r
export default function DashboardSidebar() {\r
  const [collapsed, setCollapsed] = useState(false);\r
  const [activePage, setActivePage] = useState("overview");\r
\r
  const id = useId();\r
  const page = pages.find((item) => item.id === activePage);\r
\r
  return (\r
    <section\r
      className="dashboard-sidebar-example"\r
      data-collapsed={collapsed}\r
      aria-label="Dashboard navigation demonstration"\r
    >\r
      <aside className="ds-sidebar">\r
        <div className="ds-brand">\r
          <span className="ds-brand-symbol" aria-hidden="true">\r
            f.\r
          </span>\r
\r
          <span className="ds-expanded-label">Fieldnote</span>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className="ds-collapse"\r
          aria-label={\r
            collapsed ? "Expand sidebar labels" : "Collapse sidebar labels"\r
          }\r
          aria-pressed={collapsed}\r
          onClick={() => setCollapsed((current) => !current)}\r
        >\r
          <span aria-hidden="true">{collapsed ? "→" : "←"}</span>\r
          <span className="ds-expanded-label">Compact mode</span>\r
        </button>\r
\r
        <nav className="ds-navigation" aria-label="Example workspace">\r
          {pages.map((item) => (\r
            <button\r
              key={item.id}\r
              type="button"\r
              className="ds-nav-button"\r
              aria-label={item.label}\r
              aria-pressed={activePage === item.id}\r
              aria-controls={\`\${id}-content\`}\r
              title={collapsed ? item.label : undefined}\r
              onClick={() => setActivePage(item.id)}\r
            >\r
              <span className="ds-nav-symbol" aria-hidden="true">\r
                {item.symbol}\r
              </span>\r
\r
              <span className="ds-expanded-label">{item.label}</span>\r
            </button>\r
          ))}\r
        </nav>\r
\r
        <div className="ds-profile">\r
          <span className="ds-avatar" aria-hidden="true">\r
            FL\r
          </span>\r
\r
          <div className="ds-expanded-label">\r
            <strong>Fictional workspace</strong>\r
            <span>Local demonstration</span>\r
          </div>\r
        </div>\r
      </aside>\r
\r
      <div\r
        id={\`\${id}-content\`}\r
        className="ds-content"\r
        role="region"\r
        aria-label={page.label}\r
      >\r
        <span className="ds-eyebrow">WORKSPACE / {page.label}</span>\r
\r
        <h3>{page.heading}</h3>\r
        <p>{page.description}</p>\r
\r
        <div className="ds-content-illustration" aria-hidden="true">\r
          <span />\r
          <span />\r
          <span />\r
        </div>\r
\r
        <p className="ds-selection-status" role="status">\r
          {page.label} selected.\r
        </p>\r
\r
        <span className="ds-demo-note">\r
          Buttons switch local preview content. In a real application,\r
          use links for separate page destinations.\r
        </span>\r
      </div>\r
    </section>\r
  );\r
}\r
`,re=`/* -------------------------------------------------------\r
   Scoped dashboard sidebar\r
------------------------------------------------------- */\r
\r
.dashboard-sidebar-example {\r
  container-name: dashboard-sidebar;\r
  container-type: inline-size;\r
\r
  display: flex;\r
  width: 100%;\r
  min-width: 0;\r
  min-height: 430px;\r
  overflow: hidden;\r
\r
  border: 1px solid #42485b;\r
  border-radius: 14px;\r
\r
  background: #171b27;\r
  color: #edf0fa;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: dark;\r
}\r
\r
.dashboard-sidebar-example,\r
.dashboard-sidebar-example * {\r
  box-sizing: border-box;\r
}\r
\r
/* Sidebar */\r
\r
.ds-sidebar {\r
  display: flex;\r
  flex-direction: column;\r
  flex: 0 0 210px;\r
  gap: 20px;\r
\r
  min-width: 0;\r
  padding: 18px 12px;\r
\r
  border-right: 1px solid #42485b;\r
  background: #202637;\r
}\r
\r
.ds-brand {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  padding-inline: 6px;\r
\r
  color: #edf0fa;\r
  font-size: 17px;\r
  font-weight: 600;\r
  letter-spacing: -0.5px;\r
}\r
\r
.ds-brand-symbol {\r
  display: grid;\r
  place-items: center;\r
  flex-shrink: 0;\r
\r
  width: 32px;\r
  height: 32px;\r
  border-radius: 8px;\r
\r
  background: #c7c4f4;\r
  color: #24243d;\r
\r
  font-family: Georgia, serif;\r
  font-size: 23px;\r
}\r
\r
.dashboard-sidebar-example .ds-collapse,\r
.dashboard-sidebar-example .ds-nav-button {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
\r
  width: 100%;\r
  min-height: 44px;\r
  padding: 10px 12px;\r
\r
  border: 1px solid transparent;\r
  border-radius: 8px;\r
\r
  background: transparent;\r
  color: #c2c9df;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  text-align: left;\r
  cursor: pointer;\r
}\r
\r
.dashboard-sidebar-example .ds-collapse {\r
  border-color: #48506a;\r
  font-size: 11px;\r
}\r
\r
.ds-navigation {\r
  display: grid;\r
  gap: 6px;\r
}\r
\r
.dashboard-sidebar-example .ds-nav-button:hover,\r
.dashboard-sidebar-example .ds-collapse:hover {\r
  background: #303850;\r
}\r
\r
.dashboard-sidebar-example .ds-nav-button[aria-pressed="true"] {\r
  border-color: #66658d;\r
  background: #3b3b5a;\r
  color: #f2edff;\r
}\r
\r
.ds-nav-symbol {\r
  display: inline-grid;\r
  place-items: center;\r
  flex-shrink: 0;\r
\r
  width: 20px;\r
  font-size: 20px;\r
  line-height: 1;\r
}\r
\r
.dashboard-sidebar-example button:focus-visible {\r
  outline: 3px solid #c7c4f4;\r
  outline-offset: 3px;\r
}\r
\r
/* Profile */\r
\r
.ds-profile {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  margin-top: auto;\r
  padding: 16px 6px 0;\r
\r
  border-top: 1px solid #42485b;\r
}\r
\r
.ds-avatar {\r
  display: grid;\r
  place-items: center;\r
  flex-shrink: 0;\r
\r
  width: 32px;\r
  height: 32px;\r
  border: 1px solid #66708c;\r
  border-radius: 50%;\r
\r
  color: #c2c9df;\r
  font-family: monospace;\r
  font-size: 10px;\r
}\r
\r
.ds-profile > div {\r
  display: grid;\r
  gap: 4px;\r
}\r
\r
.ds-profile strong {\r
  font-size: 10px;\r
  font-weight: 500;\r
}\r
\r
.ds-profile div > span {\r
  color: #aab4ce;\r
  font-size: 9px;\r
}\r
\r
/* Preview content */\r
\r
.ds-content {\r
  flex: 1;\r
  min-width: 0;\r
  padding: 30px 24px;\r
}\r
\r
.ds-eyebrow {\r
  color: #b6b2e7;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.8;\r
  letter-spacing: 1px;\r
}\r
\r
.dashboard-sidebar-example .ds-content h3 {\r
  margin: 18px 0;\r
  color: #edf0fa;\r
  font-size: 27px;\r
  font-weight: 500;\r
  line-height: 1.2;\r
  letter-spacing: -0.6px;\r
}\r
\r
.ds-content > p {\r
  color: #b3bdd4;\r
  font-size: 13px;\r
  line-height: 1.8;\r
}\r
\r
.ds-content-illustration {\r
  display: grid;\r
  gap: 12px;\r
  margin: 28px 0;\r
  padding: 20px;\r
\r
  border: 1px solid #42485b;\r
  border-radius: 12px;\r
  background: #202637;\r
}\r
\r
.ds-content-illustration span {\r
  height: 12px;\r
  border-radius: 4px;\r
  background: #39445d;\r
}\r
\r
.ds-content-illustration span:first-child {\r
  width: 45%;\r
  height: 22px;\r
  background: #66658d;\r
}\r
\r
.ds-content-illustration span:last-child {\r
  width: 70%;\r
}\r
\r
.ds-content .ds-selection-status {\r
  color: #c7c4f4;\r
  font-size: 11px;\r
}\r
\r
.ds-demo-note {\r
  display: block;\r
  color: #aab4ce;\r
  font-size: 10px;\r
  line-height: 1.8;\r
}\r
\r
/* User-selected compact mode */\r
\r
.dashboard-sidebar-example[data-collapsed="true"] .ds-sidebar {\r
  flex-basis: 72px;\r
}\r
\r
.dashboard-sidebar-example[data-collapsed="true"] .ds-expanded-label {\r
  display: none;\r
}\r
\r
.dashboard-sidebar-example[data-collapsed="true"] .ds-collapse,\r
.dashboard-sidebar-example[data-collapsed="true"] .ds-nav-button {\r
  justify-content: center;\r
  padding-inline: 8px;\r
}\r
\r
.dashboard-sidebar-example[data-collapsed="true"] .ds-brand,\r
.dashboard-sidebar-example[data-collapsed="true"] .ds-profile {\r
  justify-content: center;\r
  padding-inline: 0;\r
}\r
\r
/* Stack on narrow previews rather than crowding the content. */\r
\r
@container dashboard-sidebar (max-width: 480px) {\r
  .ds-sidebar {\r
    flex-basis: 150px;\r
  }\r
\r
  .ds-content {\r
    padding: 24px 16px;\r
  }\r
\r
  .dashboard-sidebar-example .ds-content h3 {\r
    font-size: 23px;\r
  }\r
}\r
\r
@container dashboard-sidebar (max-width: 340px) {\r
  .ds-sidebar {\r
    flex-basis: 120px;\r
    padding-inline: 8px;\r
  }\r
\r
  .ds-brand {\r
    gap: 6px;\r
    font-size: 13px;\r
  }\r
\r
  .dashboard-sidebar-example .ds-nav-button {\r
    gap: 6px;\r
    padding-inline: 6px;\r
    font-size: 11px;\r
  }\r
\r
  .ds-profile {\r
    flex-wrap: wrap;\r
  }\r
}\r
`,C={idle:`Ready to prepare your preview.`,loading:`Preparing the sample preview…`,success:`Preview prepared successfully.`,error:`The simulated request failed. You can try again.`,cancelled:`Preparation cancelled.`};function ie(){let[e,t]=(0,_.useState)(`idle`),[n,r]=(0,_.useState)(!1),i=(0,_.useRef)(null),a=(0,_.useRef)(!1),o=(0,_.useId)(),s=e===`loading`;(0,_.useEffect)(()=>()=>{window.clearTimeout(i.current),a.current=!1},[]);function c(){if(a.current)return;a.current=!0,t(`loading`);let e=n;i.current=window.setTimeout(()=>{a.current=!1,i.current=null,t(e?`error`:`success`)},2200)}function l(){window.clearTimeout(i.current),i.current=null,a.current=!1,t(`cancelled`)}function u(){window.clearTimeout(i.current),i.current=null,a.current=!1,t(`idle`),r(!1)}return(0,b.jsxs)(`section`,{className:`loading-states-example`,"aria-labelledby":`${o}-title`,children:[(0,b.jsxs)(`header`,{className:`lse-heading`,children:[(0,b.jsx)(`span`,{className:`lse-eyebrow`,children:`FEEDBACK AT EVERY STEP`}),(0,b.jsx)(`h3`,{id:`${o}-title`,children:`Make the waiting understandable.`}),(0,b.jsx)(`p`,{children:`Try a short simulated task, including cancellation and failure.`})]}),(0,b.jsxs)(`label`,{className:`lse-failure-control`,children:[(0,b.jsx)(`input`,{type:`checkbox`,checked:n,disabled:s,onChange:e=>r(e.target.checked)}),`Simulate a failed request`]}),(0,b.jsxs)(`div`,{className:`lse-actions`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`lse-primary`,disabled:s,onClick:c,children:[s&&(0,b.jsx)(`span`,{className:`lse-spinner`,"aria-hidden":`true`}),s?`Preparing…`:e===`error`?`Try again`:`Prepare preview`]}),(0,b.jsx)(`button`,{type:`button`,className:`lse-secondary`,"aria-disabled":!s,onClick:()=>{a.current&&l()},children:`Cancel`})]}),(0,b.jsx)(`p`,{className:`lse-status`,"data-status":e,role:`status`,children:C[e]}),(0,b.jsx)(`div`,{className:`lse-preview`,"aria-busy":s,"aria-label":`Prepared preview result`,children:s?(0,b.jsxs)(`div`,{className:`lse-skeleton`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}):e===`success`?(0,b.jsxs)(`div`,{className:`lse-result`,children:[(0,b.jsx)(`span`,{className:`lse-result-icon`,"aria-hidden":`true`,children:`✓`}),(0,b.jsx)(`strong`,{children:`Your starting point is ready.`}),(0,b.jsx)(`p`,{children:`A clear message. A useful next step.`})]}):(0,b.jsx)(`p`,{className:`lse-placeholder`,children:e===`error`?`No result was created. Adjust the failure setting and retry.`:`Your sample result will appear here.`})}),(0,b.jsxs)(`div`,{className:`lse-bottom`,children:[(0,b.jsx)(`span`,{children:`No network request is made.`}),(0,b.jsx)(`button`,{type:`button`,className:`lse-reset`,onClick:u,children:`Reset demo`})]})]})}var ae=`import { useEffect, useId, useRef, useState } from "react";\r
import "./LoadingStates.css";\r
\r
const messages = {\r
  idle: "Ready to prepare your preview.",\r
  loading: "Preparing the sample preview…",\r
  success: "Preview prepared successfully.",\r
  error: "The simulated request failed. You can try again.",\r
  cancelled: "Preparation cancelled.",\r
};\r
\r
export default function LoadingStates() {\r
  const [status, setStatus] = useState("idle");\r
  const [simulateFailure, setSimulateFailure] = useState(false);\r
\r
  const timerRef = useRef(null);\r
  const busyRef = useRef(false);\r
  const id = useId();\r
\r
  const loading = status === "loading";\r
\r
  useEffect(() => {\r
    return () => {\r
      window.clearTimeout(timerRef.current);\r
      busyRef.current = false;\r
    };\r
  }, []);\r
\r
  function preparePreview() {\r
    // Prevent duplicate requests before React renders the disabled button.\r
    if (busyRef.current) return;\r
\r
    busyRef.current = true;\r
    setStatus("loading");\r
\r
    const shouldFail = simulateFailure;\r
\r
    timerRef.current = window.setTimeout(() => {\r
      busyRef.current = false;\r
      timerRef.current = null;\r
      setStatus(shouldFail ? "error" : "success");\r
    }, 2200);\r
  }\r
\r
  function cancelPreparation() {\r
    window.clearTimeout(timerRef.current);\r
    timerRef.current = null;\r
    busyRef.current = false;\r
    setStatus("cancelled");\r
  }\r
\r
  function resetDemo() {\r
    window.clearTimeout(timerRef.current);\r
    timerRef.current = null;\r
    busyRef.current = false;\r
\r
    setStatus("idle");\r
    setSimulateFailure(false);\r
  }\r
\r
  return (\r
    <section\r
      className="loading-states-example"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <header className="lse-heading">\r
        <span className="lse-eyebrow">FEEDBACK AT EVERY STEP</span>\r
        <h3 id={\`\${id}-title\`}>Make the waiting understandable.</h3>\r
        <p>\r
          Try a short simulated task, including cancellation and failure.\r
        </p>\r
      </header>\r
\r
      <label className="lse-failure-control">\r
        <input\r
          type="checkbox"\r
          checked={simulateFailure}\r
          disabled={loading}\r
          onChange={(event) =>\r
            setSimulateFailure(event.target.checked)\r
          }\r
        />\r
\r
        Simulate a failed request\r
      </label>\r
\r
      <div className="lse-actions">\r
        <button\r
          type="button"\r
          className="lse-primary"\r
          disabled={loading}\r
          onClick={preparePreview}\r
        >\r
          {loading && (\r
            <span className="lse-spinner" aria-hidden="true" />\r
          )}\r
\r
          {loading\r
            ? "Preparing…"\r
            : status === "error"\r
              ? "Try again"\r
              : "Prepare preview"}\r
        </button>\r
\r
        {/*\r
          Remains mounted so focus does not disappear when a task finishes.\r
          aria-disabled keeps it focusable; its handler prevents invalid use.\r
        */}\r
        <button\r
          type="button"\r
          className="lse-secondary"\r
          aria-disabled={!loading}\r
          onClick={() => {\r
            if (busyRef.current) cancelPreparation();\r
          }}\r
        >\r
          Cancel\r
        </button>\r
      </div>\r
\r
      <p className="lse-status" data-status={status} role="status">\r
        {messages[status]}\r
      </p>\r
\r
      <div\r
        className="lse-preview"\r
        aria-busy={loading}\r
        aria-label="Prepared preview result"\r
      >\r
        {loading ? (\r
          <div className="lse-skeleton" aria-hidden="true">\r
            <span />\r
            <span />\r
            <span />\r
          </div>\r
        ) : status === "success" ? (\r
          <div className="lse-result">\r
            <span className="lse-result-icon" aria-hidden="true">\r
              ✓\r
            </span>\r
\r
            <strong>Your starting point is ready.</strong>\r
            <p>A clear message. A useful next step.</p>\r
          </div>\r
        ) : (\r
          <p className="lse-placeholder">\r
            {status === "error"\r
              ? "No result was created. Adjust the failure setting and retry."\r
              : "Your sample result will appear here."}\r
          </p>\r
        )}\r
      </div>\r
\r
      <div className="lse-bottom">\r
        <span>No network request is made.</span>\r
\r
        <button\r
          type="button"\r
          className="lse-reset"\r
          onClick={resetDemo}\r
        >\r
          Reset demo\r
        </button>\r
      </div>\r
    </section>\r
  );\r
}\r
`,oe=`/* -------------------------------------------------------\r
   Scoped loading-state demonstration\r
------------------------------------------------------- */\r
\r
.loading-states-example {\r
  width: 100%;\r
  max-width: 540px;\r
  min-width: 0;\r
  margin-inline: auto;\r
  padding: 24px;\r
\r
  border: 1px solid #cbd7cf;\r
  border-radius: 16px;\r
\r
  background: #f5f8f2;\r
  color: #304234;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.loading-states-example,\r
.loading-states-example * {\r
  box-sizing: border-box;\r
}\r
\r
.lse-eyebrow {\r
  color: #58705a;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.7;\r
  letter-spacing: 1.2px;\r
}\r
\r
.loading-states-example .lse-heading h3 {\r
  margin: 14px 0;\r
  color: #304234;\r
  font-size: 25px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.6px;\r
}\r
\r
.lse-heading p {\r
  margin: 0 0 22px;\r
  color: #58705a;\r
  font-size: 13px;\r
  line-height: 1.8;\r
}\r
\r
.lse-failure-control {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  min-height: 44px;\r
  color: #48614c;\r
  font-size: 12px;\r
  line-height: 1.6;\r
}\r
\r
.lse-failure-control input {\r
  flex-shrink: 0;\r
  width: 18px;\r
  height: 18px;\r
  margin: 0;\r
  accent-color: #3d6245;\r
}\r
\r
.lse-actions {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
  margin-top: 18px;\r
}\r
\r
.loading-states-example .lse-primary,\r
.loading-states-example .lse-secondary {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 10px;\r
\r
  min-height: 46px;\r
  padding: 12px 16px;\r
  border-radius: 8px;\r
\r
  font: inherit;\r
  font-size: 13px;\r
  cursor: pointer;\r
}\r
\r
.loading-states-example .lse-primary {\r
  border: 1px solid #3d6245;\r
  background: #3d6245;\r
  color: #ffffff;\r
}\r
\r
.loading-states-example .lse-primary:disabled {\r
  background: #536e58;\r
  cursor: wait;\r
}\r
\r
.loading-states-example .lse-secondary {\r
  border: 1px solid #a4b7a6;\r
  background: transparent;\r
  color: #3d6245;\r
}\r
\r
.lse-secondary[aria-disabled="true"] {\r
  opacity: 0.55;\r
  cursor: default;\r
}\r
\r
.loading-states-example button:focus-visible,\r
.loading-states-example input:focus-visible {\r
  outline: 3px solid #527f5c;\r
  outline-offset: 4px;\r
}\r
\r
.lse-spinner {\r
  width: 16px;\r
  height: 16px;\r
\r
  border: 2px solid #ffffff60;\r
  border-top-color: #ffffff;\r
  border-radius: 50%;\r
\r
  animation: lse-spin 800ms linear infinite;\r
}\r
\r
.lse-status {\r
  min-height: 24px;\r
  margin: 20px 0;\r
  color: #48614c;\r
  font-size: 12px;\r
  line-height: 1.8;\r
}\r
\r
.lse-status[data-status="error"] {\r
  color: #972d39;\r
}\r
\r
.lse-preview {\r
  display: grid;\r
  align-items: center;\r
  min-height: 170px;\r
  padding: 22px;\r
\r
  border: 1px solid #cbd7cf;\r
  border-radius: 12px;\r
  background: #ffffff;\r
}\r
\r
.lse-placeholder {\r
  margin: 0;\r
  color: #58705a;\r
  font-size: 12px;\r
  line-height: 1.8;\r
  text-align: center;\r
}\r
\r
.lse-skeleton {\r
  display: grid;\r
  gap: 14px;\r
}\r
\r
.lse-skeleton span {\r
  display: block;\r
  height: 12px;\r
  border-radius: 5px;\r
  background: #e0e8dc;\r
}\r
\r
.lse-skeleton span:first-child {\r
  width: 45%;\r
  height: 24px;\r
}\r
\r
.lse-skeleton span:last-child {\r
  width: 70%;\r
}\r
\r
.lse-result {\r
  display: grid;\r
  justify-items: start;\r
  gap: 12px;\r
}\r
\r
.lse-result-icon {\r
  display: grid;\r
  place-items: center;\r
  width: 32px;\r
  height: 32px;\r
\r
  border-radius: 50%;\r
  background: #e2efdf;\r
  color: #3d6245;\r
}\r
\r
.lse-result strong {\r
  font-size: 16px;\r
  font-weight: 500;\r
}\r
\r
.lse-result p {\r
  margin: 0;\r
  color: #58705a;\r
  font-size: 12px;\r
}\r
\r
.lse-bottom {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
  margin-top: 18px;\r
}\r
\r
.lse-bottom > span {\r
  color: #58705a;\r
  font-size: 10px;\r
}\r
\r
.loading-states-example .lse-reset {\r
  min-height: 44px;\r
  padding: 8px;\r
\r
  border: 0;\r
  background: transparent;\r
  color: #48614c;\r
\r
  font: inherit;\r
  font-size: 11px;\r
  text-decoration: underline;\r
  text-underline-offset: 3px;\r
  cursor: pointer;\r
}\r
\r
@keyframes lse-spin {\r
  to {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .lse-spinner {\r
    animation: none;\r
  }\r
}\r
`,se=[{id:`P-001`,name:`Portfolio introduction`,category:`Website`,status:`In progress`,progress:65},{id:`P-002`,name:`Workshop announcement`,category:`Campaign`,status:`Review`,progress:90},{id:`P-003`,name:`Learning resource page`,category:`Website`,status:`Planning`,progress:20},{id:`P-004`,name:`Studio identity`,category:`Design`,status:`Complete`,progress:100},{id:`P-005`,name:`Community event`,category:`Campaign`,status:`In progress`,progress:45}],ce=[{key:`name`,label:`Project`},{key:`category`,label:`Category`},{key:`status`,label:`Status`},{key:`progress`,label:`Progress`}];function le(){let[e,t]=(0,_.useState)(``),[n,r]=(0,_.useState)({key:`name`,direction:`ascending`}),i=(0,_.useId)();function a(e){r(t=>({key:e,direction:t.key===e&&t.direction===`ascending`?`descending`:`ascending`}))}let o=se.filter(t=>[t.id,t.name,t.category,t.status].join(` `).toLowerCase().includes(e.trim().toLowerCase())).sort((e,t)=>{let r=n.key===`progress`?e.progress-t.progress:e[n.key].localeCompare(t[n.key]);return n.direction===`ascending`?r:-r}),s=ce.find(e=>e.key===n.key)?.label;return(0,b.jsxs)(`section`,{className:`project-table-example`,"aria-labelledby":`${i}-title`,children:[(0,b.jsxs)(`header`,{className:`pte-heading`,children:[(0,b.jsx)(`span`,{className:`pte-eyebrow`,children:`A CLEARER VIEW OF THE WORK`}),(0,b.jsx)(`h3`,{id:`${i}-title`,children:`Small projects, moving forward.`}),(0,b.jsx)(`p`,{children:`Search the fictional project list or sort a column.`})]}),(0,b.jsxs)(`label`,{className:`pte-search`,children:[(0,b.jsx)(`span`,{children:`Find a project`}),(0,b.jsx)(`input`,{type:`search`,placeholder:`Try “website” or “review”`,value:e,onChange:e=>t(e.target.value)})]}),(0,b.jsxs)(`p`,{className:`pte-results`,role:`status`,"aria-atomic":`true`,children:[o.length,` of `,se.length,` projects.`,` `,`Sorted by `,s?.toLowerCase(),`, `,n.direction,`.`]}),(0,b.jsx)(`div`,{className:`pte-scroll`,role:`region`,"aria-label":`Scrollable project table`,tabIndex:0,children:(0,b.jsxs)(`table`,{className:`pte-table`,children:[(0,b.jsx)(`caption`,{className:`pte-sr-only`,children:`Fictional projects with category, status, and progress. Activate a column heading to change sorting.`}),(0,b.jsx)(`thead`,{children:(0,b.jsx)(`tr`,{children:ce.map(e=>(0,b.jsx)(`th`,{scope:`col`,"aria-sort":n.key===e.key?n.direction:void 0,children:(0,b.jsxs)(`button`,{type:`button`,onClick:()=>a(e.key),children:[e.label,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:n.key===e.key?n.direction===`ascending`?`↑`:`↓`:`↕`})]})},e.key))})}),(0,b.jsxs)(`tbody`,{children:[o.map(e=>(0,b.jsxs)(`tr`,{children:[(0,b.jsxs)(`th`,{scope:`row`,children:[(0,b.jsx)(`span`,{className:`pte-project-name`,children:e.name}),(0,b.jsx)(`span`,{className:`pte-project-id`,children:e.id})]}),(0,b.jsx)(`td`,{children:e.category}),(0,b.jsx)(`td`,{children:(0,b.jsx)(`span`,{className:`pte-status`,"data-status":e.status,children:e.status})}),(0,b.jsx)(`td`,{children:(0,b.jsxs)(`span`,{className:`pte-progress-cell`,children:[(0,b.jsxs)(`progress`,{value:e.progress,max:100,"aria-label":`${e.name} progress`,children:[e.progress,`%`]}),(0,b.jsxs)(`span`,{"aria-hidden":`true`,children:[e.progress,`%`]})]})})]},e.id)),o.length===0&&(0,b.jsx)(`tr`,{children:(0,b.jsx)(`td`,{colSpan:ce.length,className:`pte-empty`,children:`No matching projects. Try another search.`})})]})]})}),(0,b.jsx)(`p`,{className:`pte-note`,children:`Demonstration data only. Sorting and searching do not change the original records.`})]})}var ue=`import { useId, useState } from "react";\r
import "./ProjectTable.css";\r
\r
const projects = [\r
  {\r
    id: "P-001",\r
    name: "Portfolio introduction",\r
    category: "Website",\r
    status: "In progress",\r
    progress: 65,\r
  },\r
  {\r
    id: "P-002",\r
    name: "Workshop announcement",\r
    category: "Campaign",\r
    status: "Review",\r
    progress: 90,\r
  },\r
  {\r
    id: "P-003",\r
    name: "Learning resource page",\r
    category: "Website",\r
    status: "Planning",\r
    progress: 20,\r
  },\r
  {\r
    id: "P-004",\r
    name: "Studio identity",\r
    category: "Design",\r
    status: "Complete",\r
    progress: 100,\r
  },\r
  {\r
    id: "P-005",\r
    name: "Community event",\r
    category: "Campaign",\r
    status: "In progress",\r
    progress: 45,\r
  },\r
];\r
\r
const columns = [\r
  { key: "name", label: "Project" },\r
  { key: "category", label: "Category" },\r
  { key: "status", label: "Status" },\r
  { key: "progress", label: "Progress" },\r
];\r
\r
export default function ProjectTable() {\r
  const [query, setQuery] = useState("");\r
  const [sort, setSort] = useState({\r
    key: "name",\r
    direction: "ascending",\r
  });\r
\r
  const id = useId();\r
\r
  function sortBy(key) {\r
    setSort((current) => ({\r
      key,\r
      direction:\r
        current.key === key && current.direction === "ascending"\r
          ? "descending"\r
          : "ascending",\r
    }));\r
  }\r
\r
  const results = projects\r
    .filter((project) =>\r
      [\r
        project.id,\r
        project.name,\r
        project.category,\r
        project.status,\r
      ]\r
        .join(" ")\r
        .toLowerCase()\r
        .includes(query.trim().toLowerCase())\r
    )\r
    .sort((first, second) => {\r
      const comparison =\r
        sort.key === "progress"\r
          ? first.progress - second.progress\r
          : first[sort.key].localeCompare(second[sort.key]);\r
\r
      return sort.direction === "ascending"\r
        ? comparison\r
        : -comparison;\r
    });\r
\r
  const sortLabel = columns.find(\r
    (column) => column.key === sort.key\r
  )?.label;\r
\r
  return (\r
    <section\r
      className="project-table-example"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <header className="pte-heading">\r
        <span className="pte-eyebrow">A CLEARER VIEW OF THE WORK</span>\r
        <h3 id={\`\${id}-title\`}>Small projects, moving forward.</h3>\r
        <p>Search the fictional project list or sort a column.</p>\r
      </header>\r
\r
      <label className="pte-search">\r
        <span>Find a project</span>\r
\r
        <input\r
          type="search"\r
          placeholder="Try “website” or “review”"\r
          value={query}\r
          onChange={(event) => setQuery(event.target.value)}\r
        />\r
      </label>\r
\r
      <p className="pte-results" role="status" aria-atomic="true">\r
        {results.length} of {projects.length} projects.\r
        {" "}Sorted by {sortLabel?.toLowerCase()}, {sort.direction}.\r
      </p>\r
\r
      <div\r
        className="pte-scroll"\r
        role="region"\r
        aria-label="Scrollable project table"\r
        tabIndex={0}\r
      >\r
        <table className="pte-table">\r
          <caption className="pte-sr-only">\r
            Fictional projects with category, status, and progress.\r
            Activate a column heading to change sorting.\r
          </caption>\r
\r
          <thead>\r
            <tr>\r
              {columns.map((column) => (\r
                <th\r
                  key={column.key}\r
                  scope="col"\r
                  aria-sort={\r
                    sort.key === column.key\r
                      ? sort.direction\r
                      : undefined\r
                  }\r
                >\r
                  <button\r
                    type="button"\r
                    onClick={() => sortBy(column.key)}\r
                  >\r
                    {column.label}\r
\r
                    <span aria-hidden="true">\r
                      {sort.key === column.key\r
                        ? sort.direction === "ascending"\r
                          ? "↑"\r
                          : "↓"\r
                        : "↕"}\r
                    </span>\r
                  </button>\r
                </th>\r
              ))}\r
            </tr>\r
          </thead>\r
\r
          <tbody>\r
            {results.map((project) => (\r
              <tr key={project.id}>\r
                <th scope="row">\r
                  <span className="pte-project-name">\r
                    {project.name}\r
                  </span>\r
\r
                  <span className="pte-project-id">\r
                    {project.id}\r
                  </span>\r
                </th>\r
\r
                <td>{project.category}</td>\r
\r
                <td>\r
                  <span\r
                    className="pte-status"\r
                    data-status={project.status}\r
                  >\r
                    {project.status}\r
                  </span>\r
                </td>\r
\r
                <td>\r
                  <span className="pte-progress-cell">\r
                    <progress\r
                      value={project.progress}\r
                      max={100}\r
                      aria-label={\`\${project.name} progress\`}\r
                    >\r
                      {project.progress}%\r
                    </progress>\r
\r
                    <span aria-hidden="true">\r
                      {project.progress}%\r
                    </span>\r
                  </span>\r
                </td>\r
              </tr>\r
            ))}\r
\r
            {results.length === 0 && (\r
              <tr>\r
                <td colSpan={columns.length} className="pte-empty">\r
                  No matching projects. Try another search.\r
                </td>\r
              </tr>\r
            )}\r
          </tbody>\r
        </table>\r
      </div>\r
\r
      <p className="pte-note">\r
        Demonstration data only. Sorting and searching do not change\r
        the original records.\r
      </p>\r
    </section>\r
  );\r
}\r
`,de=`/* -------------------------------------------------------\r
   Scoped searchable project table\r
------------------------------------------------------- */\r
\r
.project-table-example {\r
  width: 100%;\r
  min-width: 0;\r
  padding: 24px;\r
\r
  border: 1px solid #cdd6dd;\r
  border-radius: 16px;\r
\r
  background: #f5f8fa;\r
  color: #293e4c;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.project-table-example,\r
.project-table-example * {\r
  box-sizing: border-box;\r
}\r
\r
.pte-eyebrow {\r
  color: #526c7b;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.7;\r
  letter-spacing: 1.2px;\r
}\r
\r
.project-table-example .pte-heading h3 {\r
  margin: 14px 0;\r
  color: #293e4c;\r
  font-size: 25px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.6px;\r
}\r
\r
.pte-heading p {\r
  margin: 0 0 24px;\r
  color: #526c7b;\r
  font-size: 13px;\r
  line-height: 1.8;\r
}\r
\r
.pte-search {\r
  display: grid;\r
  gap: 10px;\r
  max-width: 380px;\r
\r
  color: #354f60;\r
  font-size: 12px;\r
}\r
\r
.pte-search input {\r
  width: 100%;\r
  min-width: 0;\r
  min-height: 46px;\r
  padding: 11px 12px;\r
\r
  border: 1px solid #a6b8c4;\r
  border-radius: 8px;\r
\r
  background: #ffffff;\r
  color: #293e4c;\r
\r
  font: inherit;\r
  font-size: 16px;\r
}\r
\r
.pte-search input::placeholder {\r
  color: #617783;\r
}\r
\r
.pte-results {\r
  margin: 18px 0;\r
  color: #526c7b;\r
  font-size: 11px;\r
  line-height: 1.7;\r
}\r
\r
/* Keep the table structure intact on narrow screens. */\r
\r
.pte-scroll {\r
  width: 100%;\r
  overflow-x: auto;\r
\r
  border: 1px solid #cdd6dd;\r
  border-radius: 10px;\r
\r
  background: #ffffff;\r
}\r
\r
.pte-table {\r
  width: 100%;\r
  min-width: 610px;\r
  border-collapse: collapse;\r
  text-align: left;\r
}\r
\r
.pte-table thead {\r
  background: #e9eff3;\r
}\r
\r
.pte-table thead th {\r
  padding: 8px;\r
}\r
\r
.project-table-example .pte-table thead button {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 14px;\r
\r
  width: 100%;\r
  min-height: 44px;\r
  padding: 10px;\r
\r
  border: 1px solid transparent;\r
  border-radius: 5px;\r
\r
  background: transparent;\r
  color: #354f60;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  font-weight: 600;\r
  text-align: left;\r
  cursor: pointer;\r
}\r
\r
.project-table-example .pte-table thead button:hover {\r
  background: #dbe5ec;\r
}\r
\r
.pte-table tbody th,\r
.pte-table tbody td {\r
  padding: 18px;\r
  border-top: 1px solid #dce4e9;\r
\r
  color: #354f60;\r
  font-size: 12px;\r
  line-height: 1.6;\r
}\r
\r
.pte-table tbody th {\r
  font-weight: 500;\r
}\r
\r
.pte-project-name {\r
  display: block;\r
  color: #293e4c;\r
}\r
\r
.pte-project-id {\r
  display: block;\r
  margin-top: 5px;\r
\r
  color: #617783;\r
  font-family: monospace;\r
  font-size: 10px;\r
}\r
\r
.pte-table tbody tr:hover {\r
  background: #f4f7f9;\r
}\r
\r
/* Status remains readable without relying on colour. */\r
\r
.pte-status {\r
  display: inline-block;\r
  padding: 5px 8px;\r
  border: 1px solid #c3cdd5;\r
  border-radius: 20px;\r
\r
  background: #edf1f5;\r
  color: #485e6e;\r
\r
  font-size: 10px;\r
  white-space: nowrap;\r
}\r
\r
.pte-status[data-status="Complete"] {\r
  border-color: #b5cfba;\r
  background: #e6f1e8;\r
  color: #315d3b;\r
}\r
\r
.pte-status[data-status="Review"] {\r
  border-color: #d6c49e;\r
  background: #f6eedb;\r
  color: #705522;\r
}\r
\r
.pte-status[data-status="In progress"] {\r
  border-color: #b7c9df;\r
  background: #e8eff9;\r
  color: #35577d;\r
}\r
\r
.pte-progress-cell {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
.pte-progress-cell progress {\r
  width: 70px;\r
  height: 7px;\r
  overflow: hidden;\r
\r
  border: 0;\r
  border-radius: 10px;\r
\r
  background: #dbe5ec;\r
  accent-color: #527a8b;\r
}\r
\r
.pte-progress-cell progress::-webkit-progress-bar {\r
  border-radius: 10px;\r
  background: #dbe5ec;\r
}\r
\r
.pte-progress-cell progress::-webkit-progress-value {\r
  border-radius: 10px;\r
  background: #527a8b;\r
}\r
\r
.pte-progress-cell progress::-moz-progress-bar {\r
  border-radius: 10px;\r
  background: #527a8b;\r
}\r
\r
.pte-progress-cell > span {\r
  min-width: 32px;\r
  font-family: monospace;\r
  font-size: 10px;\r
}\r
\r
.pte-table .pte-empty {\r
  padding: 30px;\r
  text-align: center;\r
}\r
\r
.pte-note {\r
  margin: 18px 0 0;\r
  color: #526c7b;\r
  font-size: 10px;\r
  line-height: 1.8;\r
}\r
\r
.project-table-example input:focus-visible,\r
.project-table-example button:focus-visible,\r
.pte-scroll:focus-visible {\r
  outline: 3px solid #487286;\r
  outline-offset: 3px;\r
}\r
\r
.pte-sr-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  overflow: hidden;\r
  clip-path: inset(50%);\r
  white-space: nowrap;\r
}\r
`,fe=[{id:`purpose`,label:`Purpose`,number:`01`,title:`Begin with the reason.`,description:`Describe what the page should help someone understand or do.`,points:[`Identify the primary audience.`,`Choose one main action.`,`Write a clear introductory message.`]},{id:`structure`,label:`Structure`,number:`02`,title:`Give the content a useful order.`,description:`Arrange information so each section answers the next question.`,points:[`Introduce the offer.`,`Provide relevant examples.`,`Make the next step easy to find.`]},{id:`details`,label:`Details`,number:`03`,title:`Make the small choices count.`,description:`Check the details that help the interface feel clear and consistent.`,points:[`Keep spacing intentional.`,`Make keyboard focus visible.`,`Check narrow screens and longer text.`]}];function pe(){let[e,t]=(0,_.useState)(0),n=(0,_.useRef)([]),r=(0,_.useId)();function i(e){t(e),n.current[e]?.focus()}function a(e,t){let n;switch(e.key){case`ArrowRight`:n=(t+1)%fe.length;break;case`ArrowLeft`:n=(t-1+fe.length)%fe.length;break;case`Home`:n=0;break;case`End`:n=fe.length-1;break;default:return}e.preventDefault(),i(n)}return(0,b.jsxs)(`section`,{className:`project-tabs`,"aria-labelledby":`${r}-heading`,children:[(0,b.jsxs)(`header`,{className:`pt-heading`,children:[(0,b.jsx)(`span`,{className:`pt-eyebrow`,children:`THREE WAYS TO LOOK CLOSER`}),(0,b.jsx)(`h3`,{id:`${r}-heading`,children:`A thoughtful page, piece by piece.`})]}),(0,b.jsx)(`div`,{className:`pt-tab-list`,role:`tablist`,"aria-label":`Website planning stages`,"aria-orientation":`horizontal`,children:fe.map((i,o)=>(0,b.jsxs)(`button`,{ref:e=>{n.current[o]=e},type:`button`,role:`tab`,id:`${r}-tab-${i.id}`,"aria-controls":`${r}-panel-${i.id}`,"aria-selected":e===o,tabIndex:e===o?0:-1,onClick:()=>t(o),onKeyDown:e=>a(e,o),children:[(0,b.jsx)(`span`,{className:`pt-tab-number`,"aria-hidden":`true`,children:i.number}),i.label]},i.id))}),fe.map((t,n)=>(0,b.jsxs)(`div`,{className:`pt-panel`,role:`tabpanel`,id:`${r}-panel-${t.id}`,"aria-labelledby":`${r}-tab-${t.id}`,tabIndex:0,hidden:e!==n,children:[(0,b.jsx)(`span`,{className:`pt-panel-number`,"aria-hidden":`true`,children:t.number}),(0,b.jsx)(`h4`,{children:t.title}),(0,b.jsx)(`p`,{children:t.description}),(0,b.jsx)(`ul`,{children:t.points.map(e=>(0,b.jsx)(`li`,{children:e},e))})]},t.id)),(0,b.jsx)(`p`,{className:`pt-note`,children:`Use Left and Right Arrow within the tabs. Home selects the first tab; End selects the last.`})]})}var me=`import { useId, useRef, useState } from "react";\r
import "./ProjectTabs.css";\r
\r
const panels = [\r
  {\r
    id: "purpose",\r
    label: "Purpose",\r
    number: "01",\r
    title: "Begin with the reason.",\r
    description:\r
      "Describe what the page should help someone understand or do.",\r
    points: [\r
      "Identify the primary audience.",\r
      "Choose one main action.",\r
      "Write a clear introductory message.",\r
    ],\r
  },\r
  {\r
    id: "structure",\r
    label: "Structure",\r
    number: "02",\r
    title: "Give the content a useful order.",\r
    description:\r
      "Arrange information so each section answers the next question.",\r
    points: [\r
      "Introduce the offer.",\r
      "Provide relevant examples.",\r
      "Make the next step easy to find.",\r
    ],\r
  },\r
  {\r
    id: "details",\r
    label: "Details",\r
    number: "03",\r
    title: "Make the small choices count.",\r
    description:\r
      "Check the details that help the interface feel clear and consistent.",\r
    points: [\r
      "Keep spacing intentional.",\r
      "Make keyboard focus visible.",\r
      "Check narrow screens and longer text.",\r
    ],\r
  },\r
];\r
\r
export default function ProjectTabs() {\r
  const [activeIndex, setActiveIndex] = useState(0);\r
\r
  const buttonRefs = useRef([]);\r
  const id = useId();\r
\r
  function activateTab(index) {\r
    setActiveIndex(index);\r
    buttonRefs.current[index]?.focus();\r
  }\r
\r
  function handleKeyDown(event, index) {\r
    let nextIndex;\r
\r
    switch (event.key) {\r
      case "ArrowRight":\r
        nextIndex = (index + 1) % panels.length;\r
        break;\r
\r
      case "ArrowLeft":\r
        nextIndex = (index - 1 + panels.length) % panels.length;\r
        break;\r
\r
      case "Home":\r
        nextIndex = 0;\r
        break;\r
\r
      case "End":\r
        nextIndex = panels.length - 1;\r
        break;\r
\r
      default:\r
        return;\r
    }\r
\r
    event.preventDefault();\r
    activateTab(nextIndex);\r
  }\r
\r
  return (\r
    <section className="project-tabs" aria-labelledby={\`\${id}-heading\`}>\r
      <header className="pt-heading">\r
        <span className="pt-eyebrow">THREE WAYS TO LOOK CLOSER</span>\r
        <h3 id={\`\${id}-heading\`}>A thoughtful page, piece by piece.</h3>\r
      </header>\r
\r
      <div\r
        className="pt-tab-list"\r
        role="tablist"\r
        aria-label="Website planning stages"\r
        aria-orientation="horizontal"\r
      >\r
        {panels.map((panel, index) => (\r
          <button\r
            key={panel.id}\r
            ref={(element) => {\r
              buttonRefs.current[index] = element;\r
            }}\r
            type="button"\r
            role="tab"\r
            id={\`\${id}-tab-\${panel.id}\`}\r
            aria-controls={\`\${id}-panel-\${panel.id}\`}\r
            aria-selected={activeIndex === index}\r
            tabIndex={activeIndex === index ? 0 : -1}\r
            onClick={() => setActiveIndex(index)}\r
            onKeyDown={(event) => handleKeyDown(event, index)}\r
          >\r
            <span className="pt-tab-number" aria-hidden="true">\r
              {panel.number}\r
            </span>\r
\r
            {panel.label}\r
          </button>\r
        ))}\r
      </div>\r
\r
      {panels.map((panel, index) => (\r
        <div\r
          key={panel.id}\r
          className="pt-panel"\r
          role="tabpanel"\r
          id={\`\${id}-panel-\${panel.id}\`}\r
          aria-labelledby={\`\${id}-tab-\${panel.id}\`}\r
          tabIndex={0}\r
          hidden={activeIndex !== index}\r
        >\r
          <span className="pt-panel-number" aria-hidden="true">\r
            {panel.number}\r
          </span>\r
\r
          <h4>{panel.title}</h4>\r
          <p>{panel.description}</p>\r
\r
          <ul>\r
            {panel.points.map((point) => (\r
              <li key={point}>{point}</li>\r
            ))}\r
          </ul>\r
        </div>\r
      ))}\r
\r
      <p className="pt-note">\r
        Use Left and Right Arrow within the tabs. Home selects the\r
        first tab; End selects the last.\r
      </p>\r
    </section>\r
  );\r
}\r
`,he=`/* -------------------------------------------------------\r
   Scoped tabbed panel\r
------------------------------------------------------- */\r
\r
.project-tabs {\r
  width: 100%;\r
  max-width: 620px;\r
  min-width: 0;\r
  margin-inline: auto;\r
  padding: 24px;\r
\r
  border: 1px solid #d6cfe1;\r
  border-radius: 16px;\r
\r
  background: #f8f5fc;\r
  color: #392d49;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.project-tabs,\r
.project-tabs * {\r
  box-sizing: border-box;\r
}\r
\r
.pt-eyebrow {\r
  color: #6c587e;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.7;\r
  letter-spacing: 1.2px;\r
}\r
\r
.project-tabs .pt-heading h3 {\r
  margin: 14px 0 24px;\r
  color: #392d49;\r
  font-size: 25px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.6px;\r
}\r
\r
.pt-tab-list {\r
  display: flex;\r
  gap: 6px;\r
  padding: 5px;\r
  overflow-x: auto;\r
\r
  border: 1px solid #d6cfe1;\r
  border-radius: 10px;\r
  background: #eee8f5;\r
}\r
\r
.project-tabs .pt-tab-list button {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex: 1 0 auto;\r
  gap: 8px;\r
\r
  min-height: 46px;\r
  padding: 10px 12px;\r
\r
  border: 1px solid transparent;\r
  border-radius: 7px;\r
\r
  background: transparent;\r
  color: #665174;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  white-space: nowrap;\r
  cursor: pointer;\r
}\r
\r
.project-tabs .pt-tab-list button[aria-selected="true"] {\r
  border-color: #78608f;\r
  background: #63467e;\r
  color: #ffffff;\r
}\r
\r
.pt-tab-number {\r
  font-family: monospace;\r
  font-size: 9px;\r
}\r
\r
.project-tabs .pt-tab-list button:focus-visible {\r
  outline: 3px solid #8b5cad;\r
  outline-offset: -3px;\r
}\r
\r
.pt-panel {\r
  margin-top: 20px;\r
  padding: 24px;\r
\r
  border: 1px solid #d6cfe1;\r
  border-radius: 12px;\r
  background: #fffdfd;\r
}\r
\r
/* Keep inactive panels out of layout and keyboard navigation. */\r
\r
.pt-panel[hidden] {\r
  display: none;\r
}\r
\r
.pt-panel:focus-visible {\r
  outline: 3px solid #8b5cad;\r
  outline-offset: 4px;\r
}\r
\r
.pt-panel-number {\r
  color: #785a91;\r
  font-family: monospace;\r
  font-size: 12px;\r
}\r
\r
.project-tabs .pt-panel h4 {\r
  margin: 18px 0 12px;\r
  color: #392d49;\r
  font-size: 23px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.5px;\r
}\r
\r
.pt-panel > p {\r
  margin: 0;\r
  color: #6c587e;\r
  font-size: 13px;\r
  line-height: 1.8;\r
}\r
\r
.pt-panel ul {\r
  display: grid;\r
  gap: 12px;\r
  margin: 22px 0 0;\r
  padding-left: 18px;\r
\r
  color: #594568;\r
  font-size: 12px;\r
  line-height: 1.7;\r
}\r
\r
.pt-panel li::marker {\r
  color: #785a91;\r
}\r
\r
.pt-note {\r
  margin: 18px 0 0;\r
  color: #6c587e;\r
  font-size: 10px;\r
  line-height: 1.8;\r
}\r
`;function ge(){let[e,t]=(0,_.useState)(!0),[n,r]=(0,_.useState)(!1),i=(0,_.useRef)(null),a=(0,_.useId)();function o(){let e=i.current;e&&(e.style.removeProperty(`--pc-rotate-x`),e.style.removeProperty(`--pc-rotate-y`),e.style.removeProperty(`--pc-light-x`),e.style.removeProperty(`--pc-light-y`))}(0,_.useEffect)(()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`);function t(){r(e.matches)}return t(),e.addEventListener(`change`,t),()=>{e.removeEventListener(`change`,t)}},[]),(0,_.useEffect)(()=>{(!e||n)&&o()},[e,n]);function s(t){if(!e||n||t.pointerType===`touch`)return;let r=t.currentTarget.getBoundingClientRect(),a=i.current;if(!a||!r.width||!r.height)return;let o=Math.min(1,Math.max(0,(t.clientX-r.left)/r.width)),s=Math.min(1,Math.max(0,(t.clientY-r.top)/r.height));a.style.setProperty(`--pc-rotate-x`,`${(.5-s)*12}deg`),a.style.setProperty(`--pc-rotate-y`,`${(o-.5)*12}deg`),a.style.setProperty(`--pc-light-x`,`${o*100}%`),a.style.setProperty(`--pc-light-y`,`${s*100}%`)}return(0,b.jsxs)(`section`,{className:`perspective-example`,"aria-labelledby":`${a}-title`,children:[(0,b.jsx)(`div`,{className:`pc-stage`,onPointerMove:s,onPointerLeave:o,onPointerCancel:o,children:(0,b.jsxs)(`article`,{ref:i,className:`pc-card`,"data-motion":e&&!n?`enabled`:`disabled`,children:[(0,b.jsxs)(`div`,{className:`pc-topline`,children:[(0,b.jsx)(`span`,{children:`AN EXERCISE IN PERSPECTIVE`}),(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsxs)(`div`,{className:`pc-artwork`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{className:`pc-orbit pc-orbit-one`}),(0,b.jsx)(`span`,{className:`pc-orbit pc-orbit-two`}),(0,b.jsx)(`span`,{className:`pc-centre`})]}),(0,b.jsxs)(`div`,{className:`pc-copy`,children:[(0,b.jsx)(`span`,{className:`pc-eyebrow`,children:`A SMALL SHIFT`}),(0,b.jsx)(`h3`,{id:`${a}-title`,children:`See the idea from another angle.`}),(0,b.jsx)(`p`,{children:`A little depth can bring attention to a thoughtful detail.`})]}),(0,b.jsxs)(`div`,{className:`pc-bottomline`,children:[(0,b.jsx)(`span`,{children:`FORM / LIGHT / SPACE`}),(0,b.jsx)(`span`,{children:`01`})]})]})}),(0,b.jsxs)(`label`,{className:`pc-toggle`,children:[(0,b.jsx)(`input`,{type:`checkbox`,checked:e,onChange:e=>t(e.target.checked)}),`Enable pointer tilt`]}),(0,b.jsx)(`p`,{className:`pc-note`,children:n?`Your reduced-motion preference keeps the card still.`:e?`Move a mouse or pen pointer over the card. Touch keeps it still.`:`Tilt is off. All content remains visible.`})]})}var _e=`import { useEffect, useId, useRef, useState } from "react";\r
import "./PerspectiveCard.css";\r
\r
export default function PerspectiveCard() {\r
  const [enabled, setEnabled] = useState(true);\r
  const [reducedMotion, setReducedMotion] = useState(false);\r
\r
  const cardRef = useRef(null);\r
  const id = useId();\r
\r
  function resetPosition() {\r
    const card = cardRef.current;\r
\r
    if (!card) return;\r
\r
    card.style.removeProperty("--pc-rotate-x");\r
    card.style.removeProperty("--pc-rotate-y");\r
    card.style.removeProperty("--pc-light-x");\r
    card.style.removeProperty("--pc-light-y");\r
  }\r
\r
  useEffect(() => {\r
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");\r
\r
    function updatePreference() {\r
      setReducedMotion(media.matches);\r
    }\r
\r
    updatePreference();\r
    media.addEventListener("change", updatePreference);\r
\r
    return () => {\r
      media.removeEventListener("change", updatePreference);\r
    };\r
  }, []);\r
\r
  useEffect(() => {\r
    if (!enabled || reducedMotion) {\r
      resetPosition();\r
    }\r
  }, [enabled, reducedMotion]);\r
\r
  function moveCard(event) {\r
    if (\r
      !enabled ||\r
      reducedMotion ||\r
      event.pointerType === "touch"\r
    ) {\r
      return;\r
    }\r
\r
    const surface = event.currentTarget;\r
    const bounds = surface.getBoundingClientRect();\r
    const card = cardRef.current;\r
\r
    if (!card || !bounds.width || !bounds.height) return;\r
\r
    const x = Math.min(\r
      1,\r
      Math.max(0, (event.clientX - bounds.left) / bounds.width)\r
    );\r
\r
    const y = Math.min(\r
      1,\r
      Math.max(0, (event.clientY - bounds.top) / bounds.height)\r
    );\r
\r
    card.style.setProperty("--pc-rotate-x", \`\${(0.5 - y) * 12}deg\`);\r
    card.style.setProperty("--pc-rotate-y", \`\${(x - 0.5) * 12}deg\`);\r
    card.style.setProperty("--pc-light-x", \`\${x * 100}%\`);\r
    card.style.setProperty("--pc-light-y", \`\${y * 100}%\`);\r
  }\r
\r
  return (\r
    <section\r
      className="perspective-example"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <div\r
        className="pc-stage"\r
        onPointerMove={moveCard}\r
        onPointerLeave={resetPosition}\r
        onPointerCancel={resetPosition}\r
      >\r
        <article\r
          ref={cardRef}\r
          className="pc-card"\r
          data-motion={enabled && !reducedMotion ? "enabled" : "disabled"}\r
        >\r
          <div className="pc-topline">\r
            <span>AN EXERCISE IN PERSPECTIVE</span>\r
            <span aria-hidden="true">↗</span>\r
          </div>\r
\r
          <div className="pc-artwork" aria-hidden="true">\r
            <span className="pc-orbit pc-orbit-one" />\r
            <span className="pc-orbit pc-orbit-two" />\r
            <span className="pc-centre" />\r
          </div>\r
\r
          <div className="pc-copy">\r
            <span className="pc-eyebrow">A SMALL SHIFT</span>\r
            <h3 id={\`\${id}-title\`}>See the idea from another angle.</h3>\r
            <p>\r
              A little depth can bring attention to a thoughtful detail.\r
            </p>\r
          </div>\r
\r
          <div className="pc-bottomline">\r
            <span>FORM / LIGHT / SPACE</span>\r
            <span>01</span>\r
          </div>\r
        </article>\r
      </div>\r
\r
      <label className="pc-toggle">\r
        <input\r
          type="checkbox"\r
          checked={enabled}\r
          onChange={(event) => setEnabled(event.target.checked)}\r
        />\r
\r
        Enable pointer tilt\r
      </label>\r
\r
      <p className="pc-note">\r
        {reducedMotion\r
          ? "Your reduced-motion preference keeps the card still."\r
          : enabled\r
            ? "Move a mouse or pen pointer over the card. Touch keeps it still."\r
            : "Tilt is off. All content remains visible."}\r
      </p>\r
    </section>\r
  );\r
}\r
`,ve=`/* -------------------------------------------------------\r
   Scoped 3D perspective-card example\r
------------------------------------------------------- */\r
\r
.perspective-example {\r
  width: 100%;\r
  max-width: 440px;\r
  min-width: 0;\r
  margin-inline: auto;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.perspective-example,\r
.perspective-example * {\r
  box-sizing: border-box;\r
}\r
\r
.pc-stage {\r
  padding: 22px;\r
  perspective: 1000px;\r
}\r
\r
.pc-card {\r
  position: relative;\r
  overflow: hidden;\r
  padding: 25px;\r
\r
  border: 1px solid #718a9c;\r
  border-radius: 20px;\r
\r
  background:\r
    radial-gradient(\r
      280px at var(--pc-light-x, 50%) var(--pc-light-y, 30%),\r
      #34566c,\r
      #172b3b\r
    );\r
  color: #edf5fa;\r
\r
  transform:\r
    rotateX(var(--pc-rotate-x, 0deg))\r
    rotateY(var(--pc-rotate-y, 0deg));\r
\r
  box-shadow:\r
    0 20px 35px rgb(0 0 0 / 18%),\r
    inset 0 1px 0 rgb(255 255 255 / 12%);\r
\r
  transition: transform 160ms ease-out;\r
}\r
\r
.pc-card[data-motion="disabled"] {\r
  transform: none;\r
  background: linear-gradient(145deg, #2a485b, #172b3b);\r
}\r
\r
.pc-topline,\r
.pc-bottomline {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 14px;\r
\r
  color: #b9d0df;\r
  font-family: monospace;\r
  font-size: 8px;\r
  line-height: 1.7;\r
  letter-spacing: 1.2px;\r
}\r
\r
.pc-topline > span:last-child {\r
  color: #d4e8bd;\r
  font-size: 20px;\r
}\r
\r
.pc-artwork {\r
  position: relative;\r
  width: 150px;\r
  max-width: 100%;\r
  height: 130px;\r
  margin: 32px auto;\r
}\r
\r
.pc-orbit {\r
  position: absolute;\r
  top: 15px;\r
  left: 50%;\r
\r
  width: 100px;\r
  height: 100px;\r
  border: 1px solid #a8c59a;\r
  border-radius: 50%;\r
}\r
\r
.pc-orbit-one {\r
  transform: translateX(-65%) rotateY(45deg);\r
}\r
\r
.pc-orbit-two {\r
  transform: translateX(-35%) rotateY(-45deg);\r
}\r
\r
.pc-centre {\r
  position: absolute;\r
  top: 51px;\r
  left: 50%;\r
\r
  width: 27px;\r
  height: 27px;\r
\r
  transform: translateX(-50%) rotate(45deg);\r
\r
  border: 1px solid #d4e8bd;\r
  border-radius: 5px;\r
  background: #a8c59a;\r
\r
  box-shadow: 0 0 28px rgb(168 197 154 / 20%);\r
}\r
\r
.pc-eyebrow {\r
  color: #d4e8bd;\r
  font-family: monospace;\r
  font-size: 9px;\r
  letter-spacing: 1.4px;\r
}\r
\r
.perspective-example .pc-copy h3 {\r
  margin: 14px 0;\r
  color: #edf5fa;\r
  font-size: 28px;\r
  font-weight: 500;\r
  line-height: 1.2;\r
  letter-spacing: -0.8px;\r
}\r
\r
.pc-copy p {\r
  margin: 0;\r
  color: #bfd2df;\r
  font-size: 12px;\r
  line-height: 1.8;\r
}\r
\r
.pc-bottomline {\r
  margin-top: 28px;\r
  padding-top: 16px;\r
  border-top: 1px solid #587285;\r
}\r
\r
.pc-toggle {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 10px;\r
\r
  min-height: 44px;\r
  margin: 6px 14px 0;\r
  padding: 10px 14px;\r
\r
  border: 1px solid #587285;\r
  border-radius: 8px;\r
  background: #172b3b;\r
  color: #edf5fa;\r
\r
  font-size: 12px;\r
  cursor: pointer;\r
}\r
\r
.pc-toggle input {\r
  width: 18px;\r
  height: 18px;\r
  margin: 0;\r
  accent-color: #b9d39f;\r
}\r
\r
.pc-toggle input:focus-visible {\r
  outline: 3px solid #d4e8bd;\r
  outline-offset: 4px;\r
}\r
\r
.pc-note {\r
  margin: 12px 18px 0;\r
  padding: 10px 12px;\r
\r
  border-radius: 8px;\r
  background: #172b3b;\r
  color: #bfd2df;\r
\r
  font-size: 10px;\r
  line-height: 1.7;\r
  text-align: center;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .pc-card {\r
    transform: none;\r
    transition: none;\r
    background: linear-gradient(145deg, #2a485b, #172b3b);\r
  }\r
}\r
`;function ye(){let[e,t]=(0,_.useState)(0);return(0,b.jsxs)(`div`,{className:`pgb-example`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`pgb-button`,onClick:()=>t(e=>e+1),children:[(0,b.jsx)(`span`,{children:`Make a little progress`}),(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(`p`,{className:`pgb-feedback`,role:`status`,children:e===0?`One small interaction. A clear response.`:`${e} step${e===1?``:`s`} forward`})]})}var be=`import { useState } from "react";\r
import "./ProgressButton.css";\r
\r
export default function ProgressButton() {\r
  const [steps, setSteps] = useState(0);\r
\r
  return (\r
    <div className="pgb-example">\r
      <button\r
        type="button"\r
        className="pgb-button"\r
        onClick={() => setSteps((current) => current + 1)}\r
      >\r
        <span>Make a little progress</span>\r
        <span aria-hidden="true">↗</span>\r
      </button>\r
\r
      <p className="pgb-feedback" role="status">\r
        {steps === 0\r
          ? "One small interaction. A clear response."\r
          : \`\${steps} step\${steps === 1 ? "" : "s"} forward\`}\r
      </p>\r
    </div>\r
  );\r
}`,xe=`.pgb-example {\r
  display: grid;\r
  justify-items: center;\r
  gap: 14px;\r
\r
  width: 100%;\r
  min-width: 0;\r
  padding: 20px;\r
\r
  border: 1px solid #414052;\r
  border-radius: 12px;\r
\r
  background: #191923;\r
  color: #f4f1fc;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.pgb-example,\r
.pgb-example * {\r
  box-sizing: border-box;\r
}\r
\r
.pgb-example .pgb-button {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 20px;\r
\r
  max-width: 100%;\r
  min-height: 46px;\r
  padding: 14px 18px;\r
\r
  border: 1px solid #a98bdd;\r
  border-radius: 9px;\r
\r
  background: #7051be;\r
  color: #ffffff;\r
\r
  font: inherit;\r
  font-size: 14px;\r
  line-height: 1.5;\r
  overflow-wrap: anywhere;\r
\r
  cursor: pointer;\r
  transition: transform 180ms, background 180ms;\r
}\r
\r
.pgb-button > span:last-child {\r
  flex-shrink: 0;\r
}\r
\r
.pgb-example .pgb-button:hover {\r
  transform: translateY(-2px);\r
  background: #8061cf;\r
}\r
\r
.pgb-example .pgb-button:focus-visible {\r
  outline: 3px solid #c6afff;\r
  outline-offset: 4px;\r
}\r
\r
.pgb-feedback {\r
  margin: 0;\r
  color: #c0b7d0;\r
  font-size: 11px;\r
  line-height: 1.7;\r
  text-align: center;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .pgb-example .pgb-button {\r
    transition: none;\r
  }\r
\r
  .pgb-example .pgb-button:hover {\r
    transform: none;\r
  }\r
}`;function Se(){function e(e){if(e.pointerType===`touch`)return;let t=e.currentTarget,n=t.getBoundingClientRect();t.style.setProperty(`--dc-x`,`${e.clientX-n.left}px`),t.style.setProperty(`--dc-y`,`${e.clientY-n.top}px`)}function t(e){e.currentTarget.style.removeProperty(`--dc-x`),e.currentTarget.style.removeProperty(`--dc-y`)}return(0,b.jsxs)(`article`,{className:`dc-example`,onPointerMove:e,onPointerLeave:t,onPointerCancel:t,children:[(0,b.jsx)(`span`,{className:`dc-symbol`,"aria-hidden":`true`,children:`✳`}),(0,b.jsx)(`span`,{className:`dc-label`,children:`A SMALL DISCOVERY`}),(0,b.jsx)(`h3`,{children:`Ideas take shape when you explore.`}),(0,b.jsx)(`p`,{children:`A little light follows your pointer. The idea stays visible.`})]})}var Ce=`import "./DiscoveryCard.css";\r
\r
export default function DiscoveryCard() {\r
  function moveLight(event) {\r
    if (event.pointerType === "touch") return;\r
\r
    const card = event.currentTarget;\r
    const bounds = card.getBoundingClientRect();\r
\r
    card.style.setProperty(\r
      "--dc-x",\r
      \`\${event.clientX - bounds.left}px\`\r
    );\r
\r
    card.style.setProperty(\r
      "--dc-y",\r
      \`\${event.clientY - bounds.top}px\`\r
    );\r
  }\r
\r
  function resetLight(event) {\r
    event.currentTarget.style.removeProperty("--dc-x");\r
    event.currentTarget.style.removeProperty("--dc-y");\r
  }\r
\r
  return (\r
    <article\r
      className="dc-example"\r
      onPointerMove={moveLight}\r
      onPointerLeave={resetLight}\r
      onPointerCancel={resetLight}\r
    >\r
      <span className="dc-symbol" aria-hidden="true">\r
        ✳\r
      </span>\r
\r
      <span className="dc-label">A SMALL DISCOVERY</span>\r
\r
      <h3>Ideas take shape when you explore.</h3>\r
\r
      <p>\r
        A little light follows your pointer. The idea stays visible.\r
      </p>\r
    </article>\r
  );\r
}`,we=`.dc-example {\r
  width: 100%;\r
  max-width: 360px;\r
  min-width: 0;\r
  padding: 26px;\r
\r
  border: 1px solid #776194;\r
  border-radius: 14px;\r
\r
  background:\r
    radial-gradient(\r
      240px at var(--dc-x, 50%) var(--dc-y, 20%),\r
      #49366a,\r
      #171922\r
    );\r
  color: #f4eefc;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.dc-example,\r
.dc-example * {\r
  box-sizing: border-box;\r
}\r
\r
.dc-symbol {\r
  display: block;\r
  margin-bottom: 18px;\r
  color: #c4a7ee;\r
  font-size: 30px;\r
  line-height: 1.2;\r
}\r
\r
.dc-label {\r
  color: #d0bee9;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.6;\r
  letter-spacing: 1.4px;\r
}\r
\r
.dc-example h3 {\r
  margin: 14px 0;\r
  color: #f4eefc;\r
  font-size: 24px;\r
  font-weight: 400;\r
  line-height: 1.3;\r
  letter-spacing: -0.6px;\r
}\r
\r
.dc-example p {\r
  margin: 0;\r
  color: #c5b9d4;\r
  font-size: 12px;\r
  line-height: 1.8;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .dc-example {\r
    background: #242031;\r
  }\r
}`,Te=[{question:`What is a component?`,answer:`A reusable piece of an interface with its own appearance and behaviour.`},{question:`Can I customise it?`,answer:`Yes. Start with the text, colours, and spacing, then adapt the behaviour to your project.`},{question:`Does it work on mobile?`,answer:`This example uses flexible widths and native disclosure controls.`}];function Ee(){return(0,b.jsx)(`div`,{className:`ca-example`,children:Te.map(({question:e,answer:t})=>(0,b.jsxs)(`details`,{children:[(0,b.jsxs)(`summary`,{children:[(0,b.jsx)(`span`,{children:e}),(0,b.jsx)(`span`,{className:`ca-symbol`,"aria-hidden":`true`,children:`+`})]}),(0,b.jsx)(`p`,{children:t})]},e))})}var w=`import "./ClearAccordion.css";\r
\r
const questions = [\r
  {\r
    question: "What is a component?",\r
    answer:\r
      "A reusable piece of an interface with its own appearance and behaviour.",\r
  },\r
  {\r
    question: "Can I customise it?",\r
    answer:\r
      "Yes. Start with the text, colours, and spacing, then adapt the behaviour to your project.",\r
  },\r
  {\r
    question: "Does it work on mobile?",\r
    answer:\r
      "This example uses flexible widths and native disclosure controls.",\r
  },\r
];\r
\r
export default function ClearAccordion() {\r
  return (\r
    <div className="ca-example">\r
      {questions.map(({ question, answer }) => (\r
        <details key={question}>\r
          <summary>\r
            <span>{question}</span>\r
\r
            <span className="ca-symbol" aria-hidden="true">\r
              +\r
            </span>\r
          </summary>\r
\r
          <p>{answer}</p>\r
        </details>\r
      ))}\r
    </div>\r
  );\r
}`,T=`.ca-example {\r
  width: 100%;\r
  max-width: 450px;\r
  min-width: 0;\r
  padding: 0 18px;\r
\r
  border: 1px solid #414655;\r
  border-radius: 12px;\r
\r
  background: #191d27;\r
  color: #f1f0eb;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.ca-example,\r
.ca-example * {\r
  box-sizing: border-box;\r
}\r
\r
.ca-example details + details {\r
  border-top: 1px solid #414655;\r
}\r
\r
.ca-example summary {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
\r
  min-height: 48px;\r
  padding: 18px 0;\r
\r
  list-style: none;\r
  font-size: 13px;\r
  line-height: 1.6;\r
\r
  cursor: pointer;\r
}\r
\r
.ca-example summary::-webkit-details-marker {\r
  display: none;\r
}\r
\r
.ca-example summary:focus-visible {\r
  outline: 3px solid #b8a3f5;\r
  outline-offset: 3px;\r
}\r
\r
.ca-symbol {\r
  flex-shrink: 0;\r
  color: #c7b3ff;\r
  font-size: 22px;\r
  line-height: 1;\r
}\r
\r
.ca-example details[open] .ca-symbol {\r
  transform: rotate(45deg);\r
}\r
\r
.ca-example p {\r
  margin: 0 0 20px;\r
  color: #b9c0d0;\r
  font-size: 12px;\r
  line-height: 1.8;\r
}`,De=[{id:`overview`,label:`Overview`},{id:`work`,label:`Our work`},{id:`contact`,label:`Contact`}];function Oe(){let[e,t]=(0,_.useState)(!1),[n,r]=(0,_.useState)(`overview`),i=(0,_.useId)(),a=(0,_.useRef)(null),o=(0,_.useRef)(null),s=De.find(e=>e.id===n)?.label||`Overview`;(0,_.useEffect)(()=>{let e=o.current;if(!e)return;let n=new ResizeObserver(([e])=>{e.contentRect.width>520&&t(!1)});return n.observe(e),()=>n.disconnect()},[]);function c(e){r(e),t(!1)}function l(n){n.key===`Escape`&&e&&(t(!1),a.current?.focus())}return(0,b.jsxs)(`div`,{ref:o,className:`workshop-navigation-demo`,onKeyDown:l,children:[(0,b.jsxs)(`nav`,{className:`wn-bar`,"aria-label":`Example studio navigation`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`wn-brand`,"aria-label":`Studio North overview`,onClick:()=>c(`overview`),children:[(0,b.jsx)(`span`,{className:`wn-brand-mark`,"aria-hidden":`true`,children:`n.`}),(0,b.jsx)(`span`,{children:`Studio North`})]}),(0,b.jsx)(`div`,{className:`wn-desktop-links`,children:De.map(e=>(0,b.jsx)(`button`,{type:`button`,"aria-pressed":n===e.id,onClick:()=>c(e.id),children:e.label},e.id))}),(0,b.jsxs)(`button`,{ref:a,type:`button`,className:`wn-menu-toggle`,"aria-expanded":e,"aria-controls":i,onClick:()=>t(e=>!e),children:[e?`Close`:`Menu`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:e?`×`:`+`})]}),(0,b.jsx)(`div`,{id:i,className:`wn-mobile-links`,hidden:!e,children:De.map((e,t)=>(0,b.jsxs)(`button`,{type:`button`,"aria-pressed":n===e.id,onClick:()=>c(e.id),children:[(0,b.jsxs)(`span`,{className:`wn-link-number`,children:[`0`,t+1]}),e.label,(0,b.jsx)(`span`,{className:`wn-link-arrow`,"aria-hidden":`true`,children:`↗`})]},e.id))})]}),(0,b.jsxs)(`div`,{className:`wn-page-preview`,children:[(0,b.jsx)(`span`,{className:`wn-caption`,children:`NAVIGATION EXPERIMENT`}),(0,b.jsx)(`h3`,{children:s}),(0,b.jsxs)(`p`,{role:`status`,"aria-live":`polite`,children:[n===`overview`&&`A small studio. A clear sense of direction.`,n===`work`&&`Selected projects would appear in this section.`,n===`contact`&&`Contact information would appear in this section.`]}),(0,b.jsx)(`span`,{className:`wn-demo-note`,children:`Demonstration: menu buttons switch this preview.`})]})]})}var ke=`import { useEffect, useId, useRef, useState } from "react";\r
import "./WorkshopNavigation.css";\r
\r
const links = [\r
  { id: "overview", label: "Overview" },\r
  { id: "work", label: "Our work" },\r
  { id: "contact", label: "Contact" },\r
];\r
\r
export default function WorkshopNavigation() {\r
  const [menuOpen, setMenuOpen] = useState(false);\r
  const [activePage, setActivePage] = useState("overview");\r
\r
  const menuId = useId();\r
  const toggleRef = useRef(null);\r
  const rootRef = useRef(null);\r
\r
  const activeLabel =\r
    links.find((link) => link.id === activePage)?.label || "Overview";\r
\r
  useEffect(() => {\r
    const navigation = rootRef.current;\r
\r
    if (!navigation) return;\r
\r
    // Observe this example's width, rather than the browser width.\r
    // This lets the mobile menu work inside a narrow gallery card.\r
    const observer = new ResizeObserver(([entry]) => {\r
      if (entry.contentRect.width > 520) {\r
        setMenuOpen(false);\r
      }\r
    });\r
\r
    observer.observe(navigation);\r
\r
    return () => observer.disconnect();\r
  }, []);\r
\r
  function selectPage(id) {\r
    setActivePage(id);\r
    setMenuOpen(false);\r
  }\r
\r
  function handleKeyDown(event) {\r
    if (event.key === "Escape" && menuOpen) {\r
      setMenuOpen(false);\r
      toggleRef.current?.focus();\r
    }\r
  }\r
\r
  return (\r
    <div\r
      ref={rootRef}\r
      className="workshop-navigation-demo"\r
      onKeyDown={handleKeyDown}\r
    >\r
      <nav className="wn-bar" aria-label="Example studio navigation">\r
        <button\r
          type="button"\r
          className="wn-brand"\r
          aria-label="Studio North overview"\r
          onClick={() => selectPage("overview")}\r
        >\r
          <span className="wn-brand-mark" aria-hidden="true">\r
            n.\r
          </span>\r
\r
          <span>Studio North</span>\r
        </button>\r
\r
        <div className="wn-desktop-links">\r
          {links.map((link) => (\r
            <button\r
              key={link.id}\r
              type="button"\r
              aria-pressed={activePage === link.id}\r
              onClick={() => selectPage(link.id)}\r
            >\r
              {link.label}\r
            </button>\r
          ))}\r
        </div>\r
\r
        <button\r
          ref={toggleRef}\r
          type="button"\r
          className="wn-menu-toggle"\r
          aria-expanded={menuOpen}\r
          aria-controls={menuId}\r
          onClick={() => setMenuOpen((current) => !current)}\r
        >\r
          {menuOpen ? "Close" : "Menu"}\r
\r
          <span aria-hidden="true">\r
            {menuOpen ? "×" : "+"}\r
          </span>\r
        </button>\r
\r
        <div\r
          id={menuId}\r
          className="wn-mobile-links"\r
          hidden={!menuOpen}\r
        >\r
          {links.map((link, index) => (\r
            <button\r
              key={link.id}\r
              type="button"\r
              aria-pressed={activePage === link.id}\r
              onClick={() => selectPage(link.id)}\r
            >\r
              <span className="wn-link-number">\r
                0{index + 1}\r
              </span>\r
\r
              {link.label}\r
\r
              <span className="wn-link-arrow" aria-hidden="true">\r
                ↗\r
              </span>\r
            </button>\r
          ))}\r
        </div>\r
      </nav>\r
\r
      <div className="wn-page-preview">\r
        <span className="wn-caption">NAVIGATION EXPERIMENT</span>\r
\r
        <h3>{activeLabel}</h3>\r
\r
        <p role="status" aria-live="polite">\r
          {activePage === "overview" &&\r
            "A small studio. A clear sense of direction."}\r
\r
          {activePage === "work" &&\r
            "Selected projects would appear in this section."}\r
\r
          {activePage === "contact" &&\r
            "Contact information would appear in this section."}\r
        </p>\r
\r
        <span className="wn-demo-note">\r
          Demonstration: menu buttons switch this preview.\r
        </span>\r
      </div>\r
    </div>\r
  );\r
}`,Ae=`/* Scoped styles keep this example separate from the library interface. */\r
\r
.workshop-navigation-demo {\r
  container-name: workshop-nav;\r
  container-type: inline-size;\r
\r
  width: 100%;\r
  min-width: 0;\r
  overflow: hidden;\r
\r
  border: 1px solid #d7dcd4;\r
  border-radius: 14px;\r
\r
  background: #f5f6ef;\r
  color: #20382d;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.workshop-navigation-demo,\r
.workshop-navigation-demo * {\r
  box-sizing: border-box;\r
}\r
\r
.workshop-navigation-demo button {\r
  min-height: 44px;\r
  margin: 0;\r
  border: 0;\r
  border-radius: 6px;\r
\r
  background: transparent;\r
  color: #20382d;\r
\r
  font: inherit;\r
  cursor: pointer;\r
}\r
\r
.workshop-navigation-demo button:focus-visible {\r
  outline: 3px solid #436650;\r
  outline-offset: 3px;\r
}\r
\r
.wn-bar {\r
  display: flex;\r
  align-items: center;\r
  flex-wrap: wrap;\r
  justify-content: space-between;\r
  gap: 12px;\r
\r
  padding: 14px 18px;\r
  border-bottom: 1px solid #d7dcd4;\r
}\r
\r
.workshop-navigation-demo .wn-brand {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  padding: 0 4px;\r
\r
  font-size: 14px;\r
  font-weight: 700;\r
  letter-spacing: -0.4px;\r
}\r
\r
.wn-brand-mark {\r
  display: grid;\r
  place-items: center;\r
\r
  width: 32px;\r
  height: 32px;\r
  border-radius: 8px;\r
\r
  background: #20382d;\r
  color: #f5f6ef;\r
\r
  font-family: Georgia, serif;\r
  font-size: 22px;\r
}\r
\r
.wn-desktop-links {\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
.wn-desktop-links button {\r
  padding: 10px 12px;\r
  font-size: 12px;\r
}\r
\r
.wn-desktop-links button:hover,\r
.wn-desktop-links button[aria-pressed="true"] {\r
  background: #e2e8dd;\r
}\r
\r
.workshop-navigation-demo .wn-menu-toggle {\r
  display: none;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
\r
  padding: 10px 12px;\r
  border: 1px solid #c4cec2;\r
\r
  font-size: 12px;\r
}\r
\r
.wn-menu-toggle span {\r
  font-size: 20px;\r
  line-height: 1;\r
}\r
\r
.wn-mobile-links {\r
  display: none;\r
  width: 100%;\r
}\r
\r
.wn-mobile-links button {\r
  display: flex;\r
  align-items: center;\r
  gap: 14px;\r
\r
  width: 100%;\r
  padding: 12px 8px;\r
  border-top: 1px solid #d7dcd4;\r
  border-radius: 0;\r
\r
  text-align: left;\r
  font-size: 13px;\r
}\r
\r
.wn-mobile-links button:hover,\r
.wn-mobile-links button[aria-pressed="true"] {\r
  background: #e2e8dd;\r
}\r
\r
.wn-link-number {\r
  color: #5a6e5d;\r
  font-family: monospace;\r
  font-size: 10px;\r
}\r
\r
.wn-link-arrow {\r
  margin-left: auto;\r
}\r
\r
.wn-page-preview {\r
  padding: 30px 24px;\r
}\r
\r
.wn-caption {\r
  color: #526653;\r
  font-family: monospace;\r
  font-size: 9px;\r
  letter-spacing: 1.5px;\r
}\r
\r
.workshop-navigation-demo .wn-page-preview h3 {\r
  margin: 14px 0 10px;\r
\r
  color: #20382d;\r
  font-size: 28px;\r
  font-weight: 500;\r
  line-height: 1.2;\r
  letter-spacing: -0.8px;\r
}\r
\r
.wn-page-preview p {\r
  min-height: 42px;\r
  margin: 0;\r
\r
  color: #526653;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
.wn-demo-note {\r
  display: block;\r
  margin-top: 28px;\r
\r
  color: #526653;\r
  font-size: 10px;\r
  line-height: 1.6;\r
}\r
\r
/* Respond to the example container, including gallery previews. */\r
\r
@container workshop-nav (max-width: 520px) {\r
  .wn-desktop-links {\r
    display: none;\r
  }\r
\r
  .workshop-navigation-demo .wn-menu-toggle {\r
    display: inline-flex;\r
  }\r
\r
  .wn-mobile-links:not([hidden]) {\r
    display: grid;\r
  }\r
}\r
\r
@container workshop-nav (max-width: 280px) {\r
  .wn-bar {\r
    gap: 8px;\r
    padding: 10px;\r
  }\r
\r
  .workshop-navigation-demo .wn-brand {\r
    gap: 7px;\r
    font-size: 12px;\r
  }\r
\r
  .workshop-navigation-demo .wn-menu-toggle {\r
    gap: 8px;\r
    padding-inline: 8px;\r
  }\r
\r
  .wn-page-preview {\r
    padding: 24px 16px;\r
  }\r
}`;function je(){let[e,t]=(0,_.useState)(!1),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(`Portfolio`),[o,s]=(0,_.useState)(``),c=(0,_.useRef)(null),l=(0,_.useRef)(null),u=(0,_.useRef)(null),d=(0,_.useId)();(0,_.useEffect)(()=>{if(!e)return;let t=c.current,n=document.body.style.overflow;return t.open||t.showModal(),document.body.style.overflow=`hidden`,u.current?.focus(),()=>{t.open&&t.close(),document.body.style.overflow=n,l.current?.focus()}},[e]);function f(){s(``),t(!0)}function p(){t(!1)}function m(e){e.preventDefault();let t=n.trim();t?(s(`“${t}” is ready to explore as a ${i.toLowerCase()} project.`),r(``),a(`Portfolio`),p()):(u.current?.setCustomValidity(`Enter a project name.`),u.current?.reportValidity())}function h(e){if(e.target!==e.currentTarget)return;let t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&p()}return(0,b.jsxs)(`div`,{className:`project-dialog-example`,children:[(0,b.jsxs)(`div`,{className:`pd-launch-card`,children:[(0,b.jsx)(`span`,{className:`pd-symbol`,"aria-hidden":`true`,children:`+`}),(0,b.jsx)(`span`,{className:`pd-eyebrow`,children:`A LITTLE ROOM FOR AN IDEA`}),(0,b.jsx)(`h3`,{children:`What would you like to build?`}),(0,b.jsx)(`p`,{children:`Give your next project a name and a direction.`}),(0,b.jsxs)(`button`,{ref:l,type:`button`,className:`pd-primary`,"aria-haspopup":`dialog`,onClick:f,children:[`Start a project`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(`p`,{className:`pd-confirmation`,role:`status`,children:o}),(0,b.jsx)(`span`,{className:`pd-demo-note`,children:`Interactive demo. Nothing is sent or saved.`})]}),(0,b.jsxs)(`dialog`,{ref:c,className:`pd-dialog`,"aria-labelledby":`${d}-title`,"aria-describedby":`${d}-description`,onCancel:e=>{e.preventDefault(),p()},onClose:()=>t(!1),onClick:h,children:[(0,b.jsxs)(`div`,{className:`pd-dialog-heading`,children:[(0,b.jsx)(`span`,{className:`pd-eyebrow`,children:`START SOMETHING SMALL`}),(0,b.jsx)(`button`,{type:`button`,className:`pd-close`,"aria-label":`Close project dialog`,onClick:p,children:(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})})]}),(0,b.jsx)(`h2`,{id:`${d}-title`,children:`Every project starts somewhere.`}),(0,b.jsx)(`p`,{id:`${d}-description`,className:`pd-description`,children:`Try the form below. This demonstration only updates the preview.`}),(0,b.jsxs)(`form`,{onSubmit:m,children:[(0,b.jsxs)(`label`,{className:`pd-field`,htmlFor:`${d}-name`,children:[(0,b.jsx)(`span`,{children:`Project name`}),(0,b.jsx)(`input`,{ref:u,id:`${d}-name`,name:`projectName`,type:`text`,required:!0,maxLength:60,autoComplete:`off`,placeholder:`For example, My creative portfolio`,value:n,onChange:e=>{e.currentTarget.setCustomValidity(``),r(e.target.value)}})]}),(0,b.jsxs)(`label`,{className:`pd-field`,htmlFor:`${d}-type`,children:[(0,b.jsx)(`span`,{children:`Project type`}),(0,b.jsxs)(`select`,{id:`${d}-type`,name:`projectType`,value:i,onChange:e=>a(e.target.value),children:[(0,b.jsx)(`option`,{children:`Portfolio`}),(0,b.jsx)(`option`,{children:`Business website`}),(0,b.jsx)(`option`,{children:`Learning platform`}),(0,b.jsx)(`option`,{children:`Personal experiment`})]})]}),(0,b.jsxs)(`div`,{className:`pd-actions`,children:[(0,b.jsx)(`button`,{type:`button`,className:`pd-secondary`,onClick:p,children:`Cancel`}),(0,b.jsxs)(`button`,{type:`submit`,className:`pd-primary`,children:[`Try this idea`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]})]})]})]})}var E=`import { useEffect, useId, useRef, useState } from "react";\r
import "./ProjectDialog.css";\r
\r
export default function ProjectDialog() {\r
  const [open, setOpen] = useState(false);\r
  const [projectName, setProjectName] = useState("");\r
  const [projectType, setProjectType] = useState("Portfolio");\r
  const [confirmation, setConfirmation] = useState("");\r
\r
  const dialogRef = useRef(null);\r
  const triggerRef = useRef(null);\r
  const nameRef = useRef(null);\r
\r
  const id = useId();\r
\r
  useEffect(() => {\r
    if (!open) return;\r
\r
    const dialog = dialogRef.current;\r
    const previousOverflow = document.body.style.overflow;\r
\r
    if (!dialog.open) {\r
      dialog.showModal();\r
    }\r
\r
    document.body.style.overflow = "hidden";\r
    nameRef.current?.focus();\r
\r
    return () => {\r
      if (dialog.open) {\r
        dialog.close();\r
      }\r
\r
      document.body.style.overflow = previousOverflow;\r
      triggerRef.current?.focus();\r
    };\r
  }, [open]);\r
\r
  function openDialog() {\r
    setConfirmation("");\r
    setOpen(true);\r
  }\r
\r
  function closeDialog() {\r
    setOpen(false);\r
  }\r
\r
  function handleSubmit(event) {\r
    event.preventDefault();\r
\r
    const cleanName = projectName.trim();\r
\r
    if (!cleanName) {\r
      nameRef.current?.setCustomValidity("Enter a project name.");\r
      nameRef.current?.reportValidity();\r
      return;\r
    }\r
\r
    setConfirmation(\r
      \`“\${cleanName}” is ready to explore as a \${projectType.toLowerCase()} project.\`\r
    );\r
\r
    setProjectName("");\r
    setProjectType("Portfolio");\r
    closeDialog();\r
  }\r
\r
  function handleBackdropClick(event) {\r
    if (event.target !== event.currentTarget) return;\r
\r
    const bounds = event.currentTarget.getBoundingClientRect();\r
\r
    const outside =\r
      event.clientX < bounds.left ||\r
      event.clientX > bounds.right ||\r
      event.clientY < bounds.top ||\r
      event.clientY > bounds.bottom;\r
\r
    if (outside) closeDialog();\r
  }\r
\r
  return (\r
    <div className="project-dialog-example">\r
      <div className="pd-launch-card">\r
        <span className="pd-symbol" aria-hidden="true">\r
          +\r
        </span>\r
\r
        <span className="pd-eyebrow">A LITTLE ROOM FOR AN IDEA</span>\r
\r
        <h3>What would you like to build?</h3>\r
\r
        <p>Give your next project a name and a direction.</p>\r
\r
        <button\r
          ref={triggerRef}\r
          type="button"\r
          className="pd-primary"\r
          aria-haspopup="dialog"\r
          onClick={openDialog}\r
        >\r
          Start a project\r
          <span aria-hidden="true">↗</span>\r
        </button>\r
\r
        <p className="pd-confirmation" role="status">\r
          {confirmation}\r
        </p>\r
\r
        <span className="pd-demo-note">\r
          Interactive demo. Nothing is sent or saved.\r
        </span>\r
      </div>\r
\r
      <dialog\r
        ref={dialogRef}\r
        className="pd-dialog"\r
        aria-labelledby={\`\${id}-title\`}\r
        aria-describedby={\`\${id}-description\`}\r
        onCancel={(event) => {\r
          event.preventDefault();\r
          closeDialog();\r
        }}\r
        onClose={() => setOpen(false)}\r
        onClick={handleBackdropClick}\r
      >\r
        <div className="pd-dialog-heading">\r
          <span className="pd-eyebrow">START SOMETHING SMALL</span>\r
\r
          <button\r
            type="button"\r
            className="pd-close"\r
            aria-label="Close project dialog"\r
            onClick={closeDialog}\r
          >\r
            <span aria-hidden="true">×</span>\r
          </button>\r
        </div>\r
\r
        <h2 id={\`\${id}-title\`}>Every project starts somewhere.</h2>\r
\r
        <p id={\`\${id}-description\`} className="pd-description">\r
          Try the form below. This demonstration only updates the preview.\r
        </p>\r
\r
        <form onSubmit={handleSubmit}>\r
          <label className="pd-field" htmlFor={\`\${id}-name\`}>\r
            <span>Project name</span>\r
\r
            <input\r
              ref={nameRef}\r
              id={\`\${id}-name\`}\r
              name="projectName"\r
              type="text"\r
              required\r
              maxLength={60}\r
              autoComplete="off"\r
              placeholder="For example, My creative portfolio"\r
              value={projectName}\r
              onChange={(event) => {\r
                event.currentTarget.setCustomValidity("");\r
                setProjectName(event.target.value);\r
              }}\r
            />\r
          </label>\r
\r
          <label className="pd-field" htmlFor={\`\${id}-type\`}>\r
            <span>Project type</span>\r
\r
            <select\r
              id={\`\${id}-type\`}\r
              name="projectType"\r
              value={projectType}\r
              onChange={(event) => setProjectType(event.target.value)}\r
            >\r
              <option>Portfolio</option>\r
              <option>Business website</option>\r
              <option>Learning platform</option>\r
              <option>Personal experiment</option>\r
            </select>\r
          </label>\r
\r
          <div className="pd-actions">\r
            <button\r
              type="button"\r
              className="pd-secondary"\r
              onClick={closeDialog}\r
            >\r
              Cancel\r
            </button>\r
\r
            <button type="submit" className="pd-primary">\r
              Try this idea\r
              <span aria-hidden="true">↗</span>\r
            </button>\r
          </div>\r
        </form>\r
      </dialog>\r
    </div>\r
  );\r
}`,Me=`/* -------------------------------------------------------\r
   Scoped project-dialog example\r
------------------------------------------------------- */\r
\r
.project-dialog-example {\r
  width: 100%;\r
  min-width: 0;\r
  color: #edeff9;\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.project-dialog-example,\r
.project-dialog-example * {\r
  box-sizing: border-box;\r
}\r
\r
.project-dialog-example button,\r
.project-dialog-example input,\r
.project-dialog-example select {\r
  font: inherit;\r
}\r
\r
.project-dialog-example button {\r
  min-height: 44px;\r
  cursor: pointer;\r
}\r
\r
.project-dialog-example button:focus-visible,\r
.project-dialog-example input:focus-visible,\r
.project-dialog-example select:focus-visible {\r
  outline: 3px solid #b6c2ff;\r
  outline-offset: 4px;\r
}\r
\r
/* Launch card */\r
\r
.pd-launch-card {\r
  width: 100%;\r
  max-width: 420px;\r
  margin-inline: auto;\r
  padding: 26px;\r
\r
  border: 1px solid #414961;\r
  border-radius: 16px;\r
\r
  background: #202638;\r
}\r
\r
.pd-symbol {\r
  display: grid;\r
  place-items: center;\r
\r
  width: 40px;\r
  height: 40px;\r
  margin-bottom: 24px;\r
\r
  border: 1px solid #616e98;\r
  border-radius: 12px;\r
\r
  background: #2c3551;\r
  color: #c5ceff;\r
\r
  font-size: 30px;\r
  line-height: 1;\r
}\r
\r
.pd-eyebrow {\r
  color: #bac5ee;\r
  font-family: monospace;\r
  font-size: 9px;\r
  letter-spacing: 1.4px;\r
}\r
\r
.project-dialog-example .pd-launch-card h3 {\r
  margin: 14px 0 12px;\r
\r
  color: #edeff9;\r
  font-size: 23px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.5px;\r
}\r
\r
.pd-launch-card > p {\r
  color: #bac3dc;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
/* Buttons */\r
\r
.project-dialog-example .pd-primary,\r
.project-dialog-example .pd-secondary {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 18px;\r
\r
  padding: 12px 16px;\r
  border-radius: 9px;\r
\r
  font-size: 13px;\r
  line-height: 1.4;\r
}\r
\r
.project-dialog-example .pd-primary {\r
  border: 1px solid #c7d0ff;\r
  background: #c7d0ff;\r
  color: #202638;\r
}\r
\r
.project-dialog-example .pd-primary:hover {\r
  background: #d9dfff;\r
}\r
\r
.project-dialog-example .pd-secondary {\r
  border: 1px solid #58617c;\r
  background: transparent;\r
  color: #edeff9;\r
}\r
\r
.project-dialog-example .pd-secondary:hover {\r
  background: #303951;\r
}\r
\r
.pd-launch-card > .pd-primary {\r
  margin-top: 12px;\r
}\r
\r
.pd-confirmation {\r
  min-height: 22px;\r
  margin: 18px 0 10px;\r
}\r
\r
.pd-demo-note {\r
  display: block;\r
  color: #bac3dc;\r
  font-size: 10px;\r
  line-height: 1.6;\r
}\r
\r
/* Modal */\r
\r
.pd-dialog {\r
  width: min(480px, calc(100vw - 32px));\r
  max-width: none;\r
  max-height: calc(100dvh - 48px);\r
\r
  margin: auto;\r
  padding: 28px;\r
  overflow-y: auto;\r
  overscroll-behavior: contain;\r
\r
  border: 1px solid #58617c;\r
  border-radius: 18px;\r
\r
  background: #202638;\r
  color: #edeff9;\r
\r
  box-shadow: 0 28px 100px rgb(0 0 0 / 45%);\r
  color-scheme: dark;\r
}\r
\r
.pd-dialog::backdrop {\r
  background: rgb(8 12 22 / 75%);\r
}\r
\r
.pd-dialog-heading {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
}\r
\r
.project-dialog-example .pd-close {\r
  display: grid;\r
  place-items: center;\r
  flex-shrink: 0;\r
\r
  width: 44px;\r
  height: 44px;\r
  padding: 0;\r
\r
  border: 1px solid #58617c;\r
  border-radius: 8px;\r
\r
  background: transparent;\r
  color: #edeff9;\r
\r
  font-size: 25px;\r
}\r
\r
.project-dialog-example .pd-close:hover {\r
  background: #303951;\r
}\r
\r
.project-dialog-example .pd-dialog h2 {\r
  margin: 22px 0 12px;\r
\r
  color: #edeff9;\r
  font-size: 28px;\r
  font-weight: 500;\r
  line-height: 1.2;\r
  letter-spacing: -0.7px;\r
}\r
\r
.pd-description {\r
  margin-bottom: 26px;\r
  color: #bac3dc;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
/* Form */\r
\r
.pd-field {\r
  display: grid;\r
  gap: 10px;\r
  margin-top: 20px;\r
\r
  color: #edeff9;\r
  font-size: 13px;\r
}\r
\r
.pd-field input,\r
.pd-field select {\r
  width: 100%;\r
  min-width: 0;\r
  min-height: 46px;\r
  padding: 11px 12px;\r
\r
  border: 1px solid #58617c;\r
  border-radius: 8px;\r
\r
  background: #171c2b;\r
  color: #edeff9;\r
\r
  font-size: 14px;\r
}\r
\r
.pd-field input::placeholder {\r
  color: #9da9c8;\r
}\r
\r
.pd-actions {\r
  display: flex;\r
  justify-content: flex-end;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
\r
  margin-top: 30px;\r
  padding-top: 22px;\r
\r
  border-top: 1px solid #414961;\r
}\r
\r
@media (max-width: 480px) {\r
  .pd-dialog {\r
    padding: 22px;\r
  }\r
\r
  .project-dialog-example .pd-dialog h2 {\r
    font-size: 25px;\r
  }\r
\r
  .pd-actions > button {\r
    flex: 1;\r
  }\r
}`,Ne=[{id:`purpose`,label:`Give the page a purpose`,complete:!0},{id:`content`,label:`Make the content clear`,complete:!1},{id:`keyboard`,label:`Check keyboard navigation`,complete:!1}];function Pe(){let[e,t]=(0,_.useState)(!1),[n,r]=(0,_.useState)(Ne),i=(0,_.useId)(),a=n.filter(e=>e.complete).length;function o(e){r(t=>t.map(t=>t.id===e?{...t,complete:!t.complete}:t))}function s(){r(Ne.map(e=>({...e})))}return(0,b.jsxs)(`section`,{className:`idea-bento`,"aria-labelledby":`${i}-heading`,children:[(0,b.jsxs)(`header`,{className:`ib-header`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`ib-eyebrow`,children:`THE SHAPE OF A GOOD IDEA`}),(0,b.jsx)(`h3`,{id:`${i}-heading`,children:`Room for what matters.`})]}),(0,b.jsx)(`button`,{type:`button`,className:`ib-layout-toggle`,"aria-pressed":e,onClick:()=>t(e=>!e),children:`Compact layout`})]}),(0,b.jsxs)(`div`,{className:`ib-grid ${e?`ib-grid-compact`:``}`,children:[(0,b.jsxs)(`article`,{className:`ib-card ib-introduction`,children:[(0,b.jsx)(`span`,{className:`ib-card-label`,children:`01 / DIRECTION`}),(0,b.jsxs)(`div`,{className:`ib-orbit`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsx)(`h4`,{children:`Start with one clear intention.`}),(0,b.jsx)(`p`,{children:`A useful page gives every element a reason to be there. Begin with the action your visitor needs to take.`}),(0,b.jsx)(`span`,{className:`ib-pill`,children:`Clarity before decoration`})]}),(0,b.jsxs)(`article`,{className:`ib-card ib-checklist`,children:[(0,b.jsxs)(`div`,{className:`ib-card-heading`,children:[(0,b.jsx)(`span`,{className:`ib-card-label`,children:`02 / SMALL STEPS`}),(0,b.jsx)(`button`,{type:`button`,className:`ib-reset`,onClick:s,children:`Reset`})]}),(0,b.jsx)(`h4`,{children:`A little progress adds up.`}),(0,b.jsx)(`ul`,{className:`ib-tasks`,children:n.map(e=>(0,b.jsx)(`li`,{children:(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`input`,{type:`checkbox`,checked:e.complete,onChange:()=>o(e.id)}),(0,b.jsx)(`span`,{children:e.label})]})},e.id))}),(0,b.jsxs)(`label`,{className:`ib-progress-label`,htmlFor:`${i}-progress`,children:[`Checklist progress`,(0,b.jsxs)(`span`,{children:[a,`/`,n.length]})]}),(0,b.jsxs)(`progress`,{id:`${i}-progress`,className:`ib-progress`,max:n.length,value:a,children:[a,` of `,n.length]}),(0,b.jsx)(`p`,{className:`ib-progress-message`,role:`status`,children:a===n.length?`A thoughtful start. Keep building.`:`${a} of ${n.length} steps complete.`})]}),(0,b.jsxs)(`article`,{className:`ib-card ib-note`,children:[(0,b.jsx)(`span`,{className:`ib-card-label`,children:`03 / PERSPECTIVE`}),(0,b.jsx)(`span`,{className:`ib-note-symbol`,"aria-hidden":`true`,children:`↗`}),(0,b.jsx)(`h4`,{children:`Leave space to discover.`}),(0,b.jsx)(`p`,{children:`Give content room to breathe. Let the important details lead the eye.`})]}),(0,b.jsxs)(`article`,{className:`ib-card ib-foundation`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`ib-card-label`,children:`04 / FOUNDATION`}),(0,b.jsx)(`h4`,{children:`Different pieces. One shared rhythm.`}),(0,b.jsx)(`p`,{children:`Consistent spacing, readable text, and a clear hierarchy connect the whole.`})]}),(0,b.jsxs)(`div`,{className:`ib-rhythm`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]})]})]}),(0,b.jsx)(`p`,{className:`ib-demo-note`,children:`Interactive demonstration. Checklist changes stay in this preview and reset when it is remounted.`})]})}var Fe=`import { useId, useState } from "react";\r
import "./IdeaBento.css";\r
\r
const initialTasks = [\r
  { id: "purpose", label: "Give the page a purpose", complete: true },\r
  { id: "content", label: "Make the content clear", complete: false },\r
  { id: "keyboard", label: "Check keyboard navigation", complete: false },\r
];\r
\r
export default function IdeaBento() {\r
  const [compact, setCompact] = useState(false);\r
  const [tasks, setTasks] = useState(initialTasks);\r
\r
  const id = useId();\r
  const completed = tasks.filter((task) => task.complete).length;\r
\r
  function toggleTask(taskId) {\r
    setTasks((current) =>\r
      current.map((task) =>\r
        task.id === taskId\r
          ? { ...task, complete: !task.complete }\r
          : task\r
      )\r
    );\r
  }\r
\r
  function resetChecklist() {\r
    setTasks(initialTasks.map((task) => ({ ...task })));\r
  }\r
\r
  return (\r
    <section\r
      className="idea-bento"\r
      aria-labelledby={\`\${id}-heading\`}\r
    >\r
      <header className="ib-header">\r
        <div>\r
          <span className="ib-eyebrow">THE SHAPE OF A GOOD IDEA</span>\r
          <h3 id={\`\${id}-heading\`}>Room for what matters.</h3>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className="ib-layout-toggle"\r
          aria-pressed={compact}\r
          onClick={() => setCompact((current) => !current)}\r
        >\r
          Compact layout\r
        </button>\r
      </header>\r
\r
      <div className={\`ib-grid \${compact ? "ib-grid-compact" : ""}\`}>\r
        <article className="ib-card ib-introduction">\r
          <span className="ib-card-label">01 / DIRECTION</span>\r
\r
          <div className="ib-orbit" aria-hidden="true">\r
            <span />\r
            <span />\r
            <span />\r
          </div>\r
\r
          <h4>Start with one clear intention.</h4>\r
\r
          <p>\r
            A useful page gives every element a reason to be there.\r
            Begin with the action your visitor needs to take.\r
          </p>\r
\r
          <span className="ib-pill">Clarity before decoration</span>\r
        </article>\r
\r
        <article className="ib-card ib-checklist">\r
          <div className="ib-card-heading">\r
            <span className="ib-card-label">02 / SMALL STEPS</span>\r
\r
            <button\r
              type="button"\r
              className="ib-reset"\r
              onClick={resetChecklist}\r
            >\r
              Reset\r
            </button>\r
          </div>\r
\r
          <h4>A little progress adds up.</h4>\r
\r
          <ul className="ib-tasks">\r
            {tasks.map((task) => (\r
              <li key={task.id}>\r
                <label>\r
                  <input\r
                    type="checkbox"\r
                    checked={task.complete}\r
                    onChange={() => toggleTask(task.id)}\r
                  />\r
\r
                  <span>{task.label}</span>\r
                </label>\r
              </li>\r
            ))}\r
          </ul>\r
\r
          <label\r
            className="ib-progress-label"\r
            htmlFor={\`\${id}-progress\`}\r
          >\r
            Checklist progress\r
            <span>\r
              {completed}/{tasks.length}\r
            </span>\r
          </label>\r
\r
          <progress\r
            id={\`\${id}-progress\`}\r
            className="ib-progress"\r
            max={tasks.length}\r
            value={completed}\r
          >\r
            {completed} of {tasks.length}\r
          </progress>\r
\r
          <p className="ib-progress-message" role="status">\r
            {completed === tasks.length\r
              ? "A thoughtful start. Keep building."\r
              : \`\${completed} of \${tasks.length} steps complete.\`}\r
          </p>\r
        </article>\r
\r
        <article className="ib-card ib-note">\r
          <span className="ib-card-label">03 / PERSPECTIVE</span>\r
\r
          <span className="ib-note-symbol" aria-hidden="true">\r
            ↗\r
          </span>\r
\r
          <h4>Leave space to discover.</h4>\r
\r
          <p>\r
            Give content room to breathe. Let the important details\r
            lead the eye.\r
          </p>\r
        </article>\r
\r
        <article className="ib-card ib-foundation">\r
          <div>\r
            <span className="ib-card-label">04 / FOUNDATION</span>\r
            <h4>Different pieces. One shared rhythm.</h4>\r
            <p>\r
              Consistent spacing, readable text, and a clear hierarchy\r
              connect the whole.\r
            </p>\r
          </div>\r
\r
          <div className="ib-rhythm" aria-hidden="true">\r
            <span />\r
            <span />\r
            <span />\r
            <span />\r
            <span />\r
          </div>\r
        </article>\r
      </div>\r
\r
      <p className="ib-demo-note">\r
        Interactive demonstration. Checklist changes stay in this\r
        preview and reset when it is remounted.\r
      </p>\r
    </section>\r
  );\r
}`,Ie=`/* -------------------------------------------------------\r
   Scoped bento feature-grid example\r
------------------------------------------------------- */\r
\r
.idea-bento {\r
  container-name: idea-bento;\r
  container-type: inline-size;\r
\r
  width: 100%;\r
  min-width: 0;\r
  padding: 20px;\r
\r
  border: 1px solid #d8d4ca;\r
  border-radius: 16px;\r
\r
  background: #f2efe7;\r
  color: #292d26;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
}\r
\r
.idea-bento,\r
.idea-bento * {\r
  box-sizing: border-box;\r
}\r
\r
.ib-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 16px;\r
\r
  margin-bottom: 20px;\r
}\r
\r
.ib-eyebrow,\r
.ib-card-label {\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.6;\r
  letter-spacing: 1.2px;\r
}\r
\r
.ib-eyebrow {\r
  color: #606856;\r
}\r
\r
.idea-bento .ib-header h3 {\r
  margin: 8px 0 0;\r
  color: #292d26;\r
  font-size: 25px;\r
  font-weight: 500;\r
  line-height: 1.2;\r
  letter-spacing: -0.8px;\r
}\r
\r
.idea-bento .ib-layout-toggle,\r
.idea-bento .ib-reset {\r
  min-height: 44px;\r
  border: 1px solid #c6c7b8;\r
  border-radius: 8px;\r
\r
  background: transparent;\r
  color: #363e2e;\r
\r
  font: inherit;\r
  font-size: 11px;\r
  cursor: pointer;\r
}\r
\r
.idea-bento .ib-layout-toggle {\r
  padding: 10px 12px;\r
}\r
\r
.idea-bento .ib-layout-toggle[aria-pressed="true"] {\r
  border-color: #3c503a;\r
  background: #3c503a;\r
  color: #ffffff;\r
}\r
\r
.idea-bento button:focus-visible,\r
.idea-bento input:focus-visible {\r
  outline: 3px solid #436b3a;\r
  outline-offset: 4px;\r
}\r
\r
/* Grid */\r
\r
.ib-grid {\r
  display: grid;\r
  grid-template-columns: repeat(3, minmax(0, 1fr));\r
  gap: 14px;\r
}\r
\r
.ib-card {\r
  min-width: 0;\r
  padding: 24px;\r
  border: 1px solid transparent;\r
  border-radius: 14px;\r
}\r
\r
.idea-bento .ib-card h4 {\r
  margin: 18px 0 12px;\r
  color: inherit;\r
  font-size: 22px;\r
  font-weight: 500;\r
  line-height: 1.25;\r
  letter-spacing: -0.6px;\r
}\r
\r
.ib-card p {\r
  margin: 0;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
.ib-card-label {\r
  opacity: 0.85;\r
}\r
\r
/* Introduction */\r
\r
.ib-introduction {\r
  grid-column: span 2;\r
\r
  background: #344736;\r
  color: #f0f3e8;\r
}\r
\r
.ib-introduction p {\r
  max-width: 440px;\r
  color: #d2ddca;\r
}\r
\r
.ib-orbit {\r
  position: relative;\r
  width: 96px;\r
  height: 80px;\r
  margin-top: 28px;\r
}\r
\r
.ib-orbit span {\r
  position: absolute;\r
  width: 62px;\r
  height: 62px;\r
  border: 1px solid #bdd0ac;\r
  border-radius: 50%;\r
}\r
\r
.ib-orbit span:nth-child(1) {\r
  top: 0;\r
  left: 0;\r
}\r
\r
.ib-orbit span:nth-child(2) {\r
  top: 0;\r
  left: 28px;\r
}\r
\r
.ib-orbit span:nth-child(3) {\r
  top: 20px;\r
  left: 14px;\r
}\r
\r
.ib-pill {\r
  display: inline-block;\r
  margin-top: 24px;\r
  padding: 7px 10px;\r
\r
  border: 1px solid #74866a;\r
  border-radius: 30px;\r
\r
  color: #e0e9d8;\r
  font-size: 10px;\r
}\r
\r
/* Checklist */\r
\r
.ib-checklist {\r
  background: #e4e8d7;\r
  color: #303a28;\r
}\r
\r
.ib-card-heading {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
}\r
\r
.idea-bento .ib-reset {\r
  padding: 6px 10px;\r
}\r
\r
.ib-tasks {\r
  display: grid;\r
  gap: 4px;\r
  margin: 20px 0;\r
  padding: 0;\r
  list-style: none;\r
}\r
\r
.ib-tasks label {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  min-height: 44px;\r
\r
  font-size: 12px;\r
  line-height: 1.5;\r
  cursor: pointer;\r
}\r
\r
.ib-tasks input {\r
  flex-shrink: 0;\r
  width: 18px;\r
  height: 18px;\r
  margin: 0;\r
  accent-color: #3c503a;\r
}\r
\r
.ib-tasks input:checked + span {\r
  text-decoration: line-through;\r
  text-decoration-thickness: 1px;\r
}\r
\r
.ib-progress-label {\r
  display: flex;\r
  justify-content: space-between;\r
  gap: 12px;\r
\r
  margin-bottom: 8px;\r
  font-size: 10px;\r
}\r
\r
.ib-progress {\r
  display: block;\r
  width: 100%;\r
  height: 8px;\r
\r
  overflow: hidden;\r
  border: 0;\r
  border-radius: 10px;\r
\r
  background: #c9d2ba;\r
  accent-color: #3c503a;\r
}\r
\r
.ib-progress::-webkit-progress-bar {\r
  border-radius: 10px;\r
  background: #c9d2ba;\r
}\r
\r
.ib-progress::-webkit-progress-value {\r
  border-radius: 10px;\r
  background: #3c503a;\r
}\r
\r
.ib-progress::-moz-progress-bar {\r
  border-radius: 10px;\r
  background: #3c503a;\r
}\r
\r
.ib-checklist .ib-progress-message {\r
  margin-top: 12px;\r
  font-size: 10px;\r
}\r
\r
/* Perspective */\r
\r
.ib-note {\r
  background: #e9c9ac;\r
  color: #4d3426;\r
}\r
\r
.ib-note-symbol {\r
  display: block;\r
  margin-top: 20px;\r
  font-size: 40px;\r
  line-height: 1;\r
}\r
\r
/* Foundation */\r
\r
.ib-foundation {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 24px;\r
  grid-column: span 2;\r
\r
  border-color: #d7d1c3;\r
  background: #fffdf6;\r
  color: #373b31;\r
}\r
\r
.ib-foundation p {\r
  color: #606856;\r
}\r
\r
.ib-rhythm {\r
  display: flex;\r
  align-items: flex-end;\r
  gap: 6px;\r
  flex-shrink: 0;\r
\r
  height: 90px;\r
}\r
\r
.ib-rhythm span {\r
  width: 12px;\r
  border-radius: 4px;\r
  background: #85946d;\r
}\r
\r
.ib-rhythm span:nth-child(1),\r
.ib-rhythm span:nth-child(5) {\r
  height: 30%;\r
}\r
\r
.ib-rhythm span:nth-child(2),\r
.ib-rhythm span:nth-child(4) {\r
  height: 65%;\r
}\r
\r
.ib-rhythm span:nth-child(3) {\r
  height: 100%;\r
}\r
\r
.ib-demo-note {\r
  margin: 16px 0 0;\r
  color: #606856;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
/* Optional equal-width layout */\r
\r
.ib-grid-compact {\r
  grid-template-columns: repeat(2, minmax(0, 1fr));\r
}\r
\r
.ib-grid-compact .ib-card {\r
  grid-column: auto;\r
}\r
\r
.ib-grid-compact .ib-foundation {\r
  flex-direction: column;\r
  align-items: flex-start;\r
}\r
\r
/* Container-based responsiveness */\r
\r
@container idea-bento (max-width: 680px) {\r
  .ib-grid {\r
    grid-template-columns: repeat(2, minmax(0, 1fr));\r
  }\r
\r
  .ib-introduction,\r
  .ib-foundation {\r
    grid-column: 1 / -1;\r
  }\r
\r
  .ib-grid-compact .ib-card {\r
    grid-column: auto;\r
  }\r
\r
  .ib-card {\r
    padding: 20px;\r
  }\r
}\r
\r
@container idea-bento (max-width: 420px) {\r
  .ib-grid,\r
  .ib-grid-compact {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .ib-grid .ib-card {\r
    grid-column: auto;\r
  }\r
\r
  .ib-foundation {\r
    flex-direction: column;\r
    align-items: flex-start;\r
  }\r
\r
  .idea-bento .ib-header h3 {\r
    font-size: 23px;\r
  }\r
}`,Le={name:``,email:``,message:``};function Re(e){let t={};return e.name.trim()||(t.name=`Enter your name.`),e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email.trim())||(t.email=`Enter an email address such as name@example.com.`):t.email=`Enter your email address.`,e.message.trim().length<10&&(t.message=`Write at least 10 characters.`),t}function ze(){let[e,t]=(0,_.useState)(Le),[n,r]=(0,_.useState)({}),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(``),c=(0,_.useRef)(null),l=(0,_.useId)();function u(n){let{name:a,value:o}=n.target,c={...e,[a]:o};t(c),s(``),i&&r(Re(c))}function d(n){n.preventDefault();let i=Re(e);r(i),a(!0),s(``);let o=Object.keys(i)[0];o?c.current?.elements.namedItem(o)?.focus():(s(`Your message passed the form checks. This is a demonstration; nothing was sent.`),t({...Le}),r({}),a(!1))}function f(){t({...Le}),r({}),a(!1),s(``)}let p=Object.keys(n).length;return(0,b.jsxs)(`section`,{className:`contact-form-example`,"aria-labelledby":`${l}-title`,children:[(0,b.jsxs)(`header`,{className:`cf-heading`,children:[(0,b.jsx)(`span`,{className:`cf-eyebrow`,children:`START A CONVERSATION`}),(0,b.jsx)(`h3`,{id:`${l}-title`,children:`A good idea deserves a first hello.`}),(0,b.jsx)(`p`,{children:`Try this form using sample details. Its validation runs locally in your browser.`})]}),(0,b.jsxs)(`form`,{ref:c,noValidate:!0,onSubmit:d,children:[p>0&&(0,b.jsxs)(`div`,{className:`cf-error-summary`,role:`alert`,children:[(0,b.jsxs)(`strong`,{children:[`Check `,p,` field`,p===1?``:`s`,`.`]}),(0,b.jsx)(`ul`,{children:Object.entries(n).map(([e,t])=>(0,b.jsx)(`li`,{children:(0,b.jsx)(`button`,{type:`button`,onClick:()=>c.current?.elements.namedItem(e)?.focus(),children:t})},e))})]}),(0,b.jsxs)(`div`,{className:`cf-field`,children:[(0,b.jsxs)(`label`,{htmlFor:`${l}-name`,children:[`Name `,(0,b.jsx)(`span`,{className:`cf-required`,children:`(required)`})]}),(0,b.jsx)(`input`,{id:`${l}-name`,name:`name`,type:`text`,autoComplete:`name`,maxLength:80,required:!0,value:e.name,"aria-invalid":!!n.name,"aria-describedby":n.name?`${l}-name-error`:void 0,onChange:u}),n.name&&(0,b.jsx)(`p`,{id:`${l}-name-error`,className:`cf-field-error`,children:n.name})]}),(0,b.jsxs)(`div`,{className:`cf-field`,children:[(0,b.jsxs)(`label`,{htmlFor:`${l}-email`,children:[`Email `,(0,b.jsx)(`span`,{className:`cf-required`,children:`(required)`})]}),(0,b.jsx)(`input`,{id:`${l}-email`,name:`email`,type:`email`,autoComplete:`email`,maxLength:254,required:!0,value:e.email,"aria-invalid":!!n.email,"aria-describedby":n.email?`${l}-email-error`:void 0,onChange:u}),n.email&&(0,b.jsx)(`p`,{id:`${l}-email-error`,className:`cf-field-error`,children:n.email})]}),(0,b.jsxs)(`div`,{className:`cf-field`,children:[(0,b.jsxs)(`div`,{className:`cf-label-row`,children:[(0,b.jsxs)(`label`,{htmlFor:`${l}-message`,children:[`Message `,(0,b.jsx)(`span`,{className:`cf-required`,children:`(required)`})]}),(0,b.jsxs)(`span`,{className:`cf-counter`,children:[e.message.length,`/500`]})]}),(0,b.jsx)(`textarea`,{id:`${l}-message`,name:`message`,rows:4,minLength:10,maxLength:500,required:!0,value:e.message,"aria-invalid":!!n.message,"aria-describedby":[`${l}-message-hint`,n.message?`${l}-message-error`:``].filter(Boolean).join(` `),onChange:u}),(0,b.jsx)(`p`,{id:`${l}-message-hint`,className:`cf-hint`,children:`Between 10 and 500 characters. Use fictional details for testing.`}),n.message&&(0,b.jsx)(`p`,{id:`${l}-message-error`,className:`cf-field-error`,children:n.message})]}),(0,b.jsxs)(`div`,{className:`cf-actions`,children:[(0,b.jsx)(`button`,{type:`button`,className:`cf-reset`,onClick:f,children:`Clear`}),(0,b.jsxs)(`button`,{type:`submit`,className:`cf-submit`,children:[`Check message`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]}),(0,b.jsx)(`p`,{className:`cf-confirmation`,role:`status`,children:o})]}),(0,b.jsx)(`p`,{className:`cf-demo-note`,children:`Demo only. No network request, email delivery, or persistent storage.`})]})}var Be=`import { useId, useRef, useState } from "react";\r
import "./ContactForm.css";\r
\r
const initialValues = {\r
  name: "",\r
  email: "",\r
  message: "",\r
};\r
\r
function validate(values) {\r
  const errors = {};\r
\r
  if (!values.name.trim()) {\r
    errors.name = "Enter your name.";\r
  }\r
\r
  if (!values.email.trim()) {\r
    errors.email = "Enter your email address.";\r
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email.trim())) {\r
    errors.email = "Enter an email address such as name@example.com.";\r
  }\r
\r
  if (values.message.trim().length < 10) {\r
    errors.message = "Write at least 10 characters.";\r
  }\r
\r
  return errors;\r
}\r
\r
export default function ContactForm() {\r
  const [values, setValues] = useState(initialValues);\r
  const [errors, setErrors] = useState({});\r
  const [submitted, setSubmitted] = useState(false);\r
  const [confirmation, setConfirmation] = useState("");\r
\r
  const formRef = useRef(null);\r
  const id = useId();\r
\r
  function updateField(event) {\r
    const { name, value } = event.target;\r
\r
    const nextValues = {\r
      ...values,\r
      [name]: value,\r
    };\r
\r
    setValues(nextValues);\r
    setConfirmation("");\r
\r
    // Once submission has been attempted, update errors as the user edits.\r
    if (submitted) {\r
      setErrors(validate(nextValues));\r
    }\r
  }\r
\r
  function handleSubmit(event) {\r
    event.preventDefault();\r
\r
    const nextErrors = validate(values);\r
\r
    setErrors(nextErrors);\r
    setSubmitted(true);\r
    setConfirmation("");\r
\r
    const firstInvalidField = Object.keys(nextErrors)[0];\r
\r
    if (firstInvalidField) {\r
      formRef.current?.elements\r
        .namedItem(firstInvalidField)\r
        ?.focus();\r
\r
      return;\r
    }\r
\r
    setConfirmation(\r
      "Your message passed the form checks. This is a demonstration; nothing was sent."\r
    );\r
\r
    setValues({ ...initialValues });\r
    setErrors({});\r
    setSubmitted(false);\r
  }\r
\r
  function resetForm() {\r
    setValues({ ...initialValues });\r
    setErrors({});\r
    setSubmitted(false);\r
    setConfirmation("");\r
  }\r
\r
  const errorCount = Object.keys(errors).length;\r
\r
  return (\r
    <section\r
      className="contact-form-example"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <header className="cf-heading">\r
        <span className="cf-eyebrow">START A CONVERSATION</span>\r
\r
        <h3 id={\`\${id}-title\`}>A good idea deserves a first hello.</h3>\r
\r
        <p>\r
          Try this form using sample details. Its validation runs\r
          locally in your browser.\r
        </p>\r
      </header>\r
\r
      <form ref={formRef} noValidate onSubmit={handleSubmit}>\r
        {errorCount > 0 && (\r
          <div className="cf-error-summary" role="alert">\r
            <strong>\r
              Check {errorCount} field{errorCount === 1 ? "" : "s"}.\r
            </strong>\r
\r
            <ul>\r
              {Object.entries(errors).map(([field, message]) => (\r
                <li key={field}>\r
                  <button\r
                    type="button"\r
                    onClick={() =>\r
                      formRef.current?.elements\r
                        .namedItem(field)\r
                        ?.focus()\r
                    }\r
                  >\r
                    {message}\r
                  </button>\r
                </li>\r
              ))}\r
            </ul>\r
          </div>\r
        )}\r
\r
        <div className="cf-field">\r
          <label htmlFor={\`\${id}-name\`}>\r
            Name <span className="cf-required">(required)</span>\r
          </label>\r
\r
          <input\r
            id={\`\${id}-name\`}\r
            name="name"\r
            type="text"\r
            autoComplete="name"\r
            maxLength={80}\r
            required\r
            value={values.name}\r
            aria-invalid={Boolean(errors.name)}\r
            aria-describedby={errors.name ? \`\${id}-name-error\` : undefined}\r
            onChange={updateField}\r
          />\r
\r
          {errors.name && (\r
            <p id={\`\${id}-name-error\`} className="cf-field-error">\r
              {errors.name}\r
            </p>\r
          )}\r
        </div>\r
\r
        <div className="cf-field">\r
          <label htmlFor={\`\${id}-email\`}>\r
            Email <span className="cf-required">(required)</span>\r
          </label>\r
\r
          <input\r
            id={\`\${id}-email\`}\r
            name="email"\r
            type="email"\r
            autoComplete="email"\r
            maxLength={254}\r
            required\r
            value={values.email}\r
            aria-invalid={Boolean(errors.email)}\r
            aria-describedby={errors.email ? \`\${id}-email-error\` : undefined}\r
            onChange={updateField}\r
          />\r
\r
          {errors.email && (\r
            <p id={\`\${id}-email-error\`} className="cf-field-error">\r
              {errors.email}\r
            </p>\r
          )}\r
        </div>\r
\r
        <div className="cf-field">\r
          <div className="cf-label-row">\r
            <label htmlFor={\`\${id}-message\`}>\r
              Message <span className="cf-required">(required)</span>\r
            </label>\r
\r
            <span className="cf-counter">\r
              {values.message.length}/500\r
            </span>\r
          </div>\r
\r
          <textarea\r
            id={\`\${id}-message\`}\r
            name="message"\r
            rows={4}\r
            minLength={10}\r
            maxLength={500}\r
            required\r
            value={values.message}\r
            aria-invalid={Boolean(errors.message)}\r
            aria-describedby={[\r
              \`\${id}-message-hint\`,\r
              errors.message ? \`\${id}-message-error\` : "",\r
            ]\r
              .filter(Boolean)\r
              .join(" ")}\r
            onChange={updateField}\r
          />\r
\r
          <p id={\`\${id}-message-hint\`} className="cf-hint">\r
            Between 10 and 500 characters. Use fictional details for testing.\r
          </p>\r
\r
          {errors.message && (\r
            <p id={\`\${id}-message-error\`} className="cf-field-error">\r
              {errors.message}\r
            </p>\r
          )}\r
        </div>\r
\r
        <div className="cf-actions">\r
          <button type="button" className="cf-reset" onClick={resetForm}>\r
            Clear\r
          </button>\r
\r
          <button type="submit" className="cf-submit">\r
            Check message\r
            <span aria-hidden="true">↗</span>\r
          </button>\r
        </div>\r
\r
        <p className="cf-confirmation" role="status">\r
          {confirmation}\r
        </p>\r
      </form>\r
\r
      <p className="cf-demo-note">\r
        Demo only. No network request, email delivery, or persistent storage.\r
      </p>\r
    </section>\r
  );\r
}`,Ve=`/* -------------------------------------------------------\r
   Scoped contact-form example\r
------------------------------------------------------- */\r
\r
.contact-form-example {\r
  width: 100%;\r
  max-width: 560px;\r
  min-width: 0;\r
  margin-inline: auto;\r
  padding: 26px;\r
\r
  border: 1px solid #d8d6df;\r
  border-radius: 16px;\r
\r
  background: #faf8ff;\r
  color: #302b41;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.contact-form-example,\r
.contact-form-example * {\r
  box-sizing: border-box;\r
}\r
\r
.cf-eyebrow {\r
  color: #655280;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.6;\r
  letter-spacing: 1.4px;\r
}\r
\r
.contact-form-example .cf-heading h3 {\r
  margin: 14px 0;\r
  color: #302b41;\r
  font-size: 25px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.6px;\r
}\r
\r
.cf-heading p {\r
  margin: 0 0 24px;\r
  color: #655e73;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
/* Fields */\r
\r
.cf-field {\r
  display: grid;\r
  gap: 9px;\r
  margin-top: 20px;\r
}\r
\r
.cf-field label {\r
  color: #302b41;\r
  font-size: 13px;\r
  font-weight: 600;\r
}\r
\r
.cf-required {\r
  color: #655e73;\r
  font-size: 11px;\r
  font-weight: 400;\r
}\r
\r
.cf-field input,\r
.cf-field textarea {\r
  width: 100%;\r
  min-width: 0;\r
  min-height: 46px;\r
  padding: 12px;\r
\r
  border: 1px solid #ada5bc;\r
  border-radius: 8px;\r
\r
  background: #ffffff;\r
  color: #302b41;\r
\r
  font: inherit;\r
  font-size: 16px;\r
  line-height: 1.5;\r
}\r
\r
.cf-field textarea {\r
  min-height: 125px;\r
  resize: vertical;\r
}\r
\r
.cf-field input[aria-invalid="true"],\r
.cf-field textarea[aria-invalid="true"] {\r
  border: 2px solid #a12536;\r
}\r
\r
.contact-form-example input:focus-visible,\r
.contact-form-example textarea:focus-visible,\r
.contact-form-example button:focus-visible {\r
  outline: 3px solid #73519d;\r
  outline-offset: 4px;\r
}\r
\r
.cf-label-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
}\r
\r
.cf-counter {\r
  color: #655e73;\r
  font-family: monospace;\r
  font-size: 11px;\r
}\r
\r
.cf-field .cf-hint {\r
  margin: 0;\r
  color: #655e73;\r
  font-size: 11px;\r
  line-height: 1.6;\r
}\r
\r
.cf-field .cf-field-error {\r
  margin: 0;\r
  color: #a12536;\r
  font-size: 12px;\r
  line-height: 1.6;\r
}\r
\r
/* Error summary */\r
\r
.cf-error-summary {\r
  margin-bottom: 24px;\r
  padding: 16px;\r
\r
  border: 1px solid #b93f4d;\r
  border-radius: 10px;\r
\r
  background: #fff0f1;\r
  color: #852333;\r
\r
  font-size: 13px;\r
}\r
\r
.cf-error-summary ul {\r
  margin: 10px 0 0;\r
  padding-left: 18px;\r
}\r
\r
.contact-form-example .cf-error-summary button {\r
  min-height: 44px;\r
  padding: 8px 0;\r
\r
  border: 0;\r
  border-radius: 2px;\r
\r
  background: transparent;\r
  color: #852333;\r
\r
  font: inherit;\r
  text-align: left;\r
  text-decoration: underline;\r
  text-underline-offset: 3px;\r
\r
  cursor: pointer;\r
}\r
\r
/* Actions */\r
\r
.cf-actions {\r
  display: flex;\r
  justify-content: flex-end;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
  margin-top: 24px;\r
}\r
\r
.contact-form-example .cf-submit,\r
.contact-form-example .cf-reset {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 20px;\r
\r
  min-height: 46px;\r
  padding: 12px 16px;\r
  border-radius: 8px;\r
\r
  font: inherit;\r
  font-size: 13px;\r
  cursor: pointer;\r
}\r
\r
.contact-form-example .cf-submit {\r
  border: 1px solid #644384;\r
  background: #644384;\r
  color: #ffffff;\r
}\r
\r
.contact-form-example .cf-submit:hover {\r
  background: #755196;\r
}\r
\r
.contact-form-example .cf-reset {\r
  border: 1px solid #ada5bc;\r
  background: transparent;\r
  color: #4d405e;\r
}\r
\r
.contact-form-example .cf-reset:hover {\r
  background: #eee8f6;\r
}\r
\r
.cf-confirmation {\r
  min-height: 24px;\r
  margin: 20px 0 0;\r
  color: #285a3a;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
.cf-demo-note {\r
  margin: 20px 0 0;\r
  padding-top: 16px;\r
  border-top: 1px solid #d8d6df;\r
\r
  color: #655e73;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
@media (max-width: 480px) {\r
  .contact-form-example {\r
    padding: 20px;\r
  }\r
\r
  .cf-actions > button {\r
    flex: 1;\r
  }\r
}`;function He({toast:e,onDismiss:t,onUndo:n}){let[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(!1),s=(0,_.useRef)(e.duration);return(0,_.useEffect)(()=>{if(e.duration===0||r||a)return;let n=Date.now(),i=window.setTimeout(()=>{t(e.id)},s.current);return()=>{window.clearTimeout(i),s.current=Math.max(0,s.current-(Date.now()-n))}},[e.id,e.duration,r,a,t]),(0,b.jsxs)(`li`,{className:`tw-toast tw-toast-${e.type}`,onPointerEnter:()=>i(!0),onPointerLeave:()=>i(!1),onFocusCapture:()=>o(!0),onBlurCapture:e=>{e.currentTarget.contains(e.relatedTarget)||o(!1)},children:[(0,b.jsx)(`span`,{className:`tw-toast-symbol`,"aria-hidden":`true`,children:{success:`✓`,info:`i`,undo:`↶`}[e.type]}),(0,b.jsxs)(`div`,{className:`tw-toast-copy`,children:[(0,b.jsx)(`strong`,{children:e.title}),(0,b.jsx)(`p`,{children:e.message}),e.type===`undo`&&(0,b.jsx)(`button`,{type:`button`,className:`tw-undo`,onClick:()=>n(e.id),children:`Undo archive`})]}),(0,b.jsx)(`button`,{type:`button`,className:`tw-dismiss`,"aria-label":`Dismiss: ${e.title}`,onClick:()=>t(e.id),children:(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})})]})}function Ue(){let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)(!1),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(``),c=(0,_.useRef)(0),l=(0,_.useRef)(null);(0,_.useEffect)(()=>()=>window.clearTimeout(l.current),[]);function u(e){window.clearTimeout(l.current),s(``),l.current=window.setTimeout(()=>{s(e)},50)}function d(e){let r={id:++c.current,type:e,...{success:{title:`Changes saved`,message:`Your demonstration settings are ready.`},info:{title:`A small reminder`,message:`Preview your work at more than one screen size.`},undo:{title:`Draft archived`,message:`You can restore it using Undo archive.`}}[e],duration:e===`undo`||!n?0:8e3};t(e=>{let t=[...e,r];if(t.length<=3)return t;let n=t.findIndex(e=>e.type!==`undo`);return t.filter((e,t)=>t!==n)}),u(`${r.title}. ${r.message}`)}function f(e){t(t=>t.filter(t=>t.id!==e))}function p(){i||(a(!0),d(`undo`))}function m(e){a(!1),f(e),u(`Draft restored.`)}function h(){t([]),a(!1),u(`Notification demonstration reset.`)}return(0,b.jsxs)(`section`,{className:`toast-workshop`,children:[(0,b.jsxs)(`header`,{className:`tw-heading`,children:[(0,b.jsx)(`span`,{className:`tw-eyebrow`,children:`SMALL MESSAGES / CLEAR FEEDBACK`}),(0,b.jsx)(`h3`,{children:`A little reassurance goes a long way.`}),(0,b.jsx)(`p`,{children:`Trigger a notification, dismiss it, or try an action you can undo.`})]}),(0,b.jsxs)(`div`,{className:`tw-controls`,children:[(0,b.jsx)(`button`,{type:`button`,onClick:()=>d(`success`),children:`Show success`}),(0,b.jsx)(`button`,{type:`button`,onClick:()=>d(`info`),children:`Show reminder`})]}),(0,b.jsxs)(`label`,{className:`tw-auto-close`,children:[(0,b.jsx)(`input`,{type:`checkbox`,checked:n,onChange:e=>r(e.target.checked)}),(0,b.jsx)(`span`,{children:`Close new informational messages after 8 seconds`})]}),(0,b.jsxs)(`div`,{className:`tw-draft`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`tw-eyebrow`,children:`SAMPLE DRAFT`}),(0,b.jsx)(`strong`,{children:`My next website idea`}),(0,b.jsx)(`span`,{className:`tw-draft-state`,children:i?`Archived`:`Active draft`})]}),(0,b.jsx)(`button`,{type:`button`,"aria-disabled":i,onClick:p,children:i?`Archived`:`Archive`})]}),(0,b.jsxs)(`div`,{className:`tw-preview-heading`,children:[(0,b.jsx)(`span`,{children:`NOTIFICATION AREA`}),(0,b.jsx)(`button`,{type:`button`,onClick:h,children:`Reset demo`})]}),(0,b.jsxs)(`div`,{className:`tw-notification-area`,children:[e.length===0&&(0,b.jsx)(`p`,{className:`tw-empty`,children:`Your next message will appear here.`}),(0,b.jsx)(`ol`,{className:`tw-stack`,"aria-label":`Notifications`,children:e.map(e=>(0,b.jsx)(He,{toast:e,onDismiss:f,onUndo:m},e.id))})]}),(0,b.jsx)(`p`,{className:`tw-screen-reader-only`,role:`status`,"aria-atomic":`true`,children:o}),(0,b.jsx)(`p`,{className:`tw-demo-note`,children:`Demo only. Nothing is saved or archived outside this preview. Notifications remain inside the example instead of covering the page.`})]})}var We=`import { useEffect, useRef, useState } from "react";\r
import "./ToastWorkshop.css";\r
\r
/*\r
 * Each toast owns its timer.\r
 * Its countdown pauses while hovered or while focus is inside it.\r
 */\r
function ToastItem({ toast, onDismiss, onUndo }) {\r
  const [hovered, setHovered] = useState(false);\r
  const [focused, setFocused] = useState(false);\r
\r
  const remainingRef = useRef(toast.duration);\r
\r
  useEffect(() => {\r
    if (toast.duration === 0 || hovered || focused) return;\r
\r
    const startedAt = Date.now();\r
\r
    const timer = window.setTimeout(() => {\r
      onDismiss(toast.id);\r
    }, remainingRef.current);\r
\r
    return () => {\r
      window.clearTimeout(timer);\r
\r
      remainingRef.current = Math.max(\r
        0,\r
        remainingRef.current - (Date.now() - startedAt)\r
      );\r
    };\r
  }, [toast.id, toast.duration, hovered, focused, onDismiss]);\r
\r
  const symbols = {\r
    success: "✓",\r
    info: "i",\r
    undo: "↶",\r
  };\r
\r
  return (\r
    <li\r
      className={\`tw-toast tw-toast-\${toast.type}\`}\r
      onPointerEnter={() => setHovered(true)}\r
      onPointerLeave={() => setHovered(false)}\r
      onFocusCapture={() => setFocused(true)}\r
      onBlurCapture={(event) => {\r
        if (!event.currentTarget.contains(event.relatedTarget)) {\r
          setFocused(false);\r
        }\r
      }}\r
    >\r
      <span className="tw-toast-symbol" aria-hidden="true">\r
        {symbols[toast.type]}\r
      </span>\r
\r
      <div className="tw-toast-copy">\r
        <strong>{toast.title}</strong>\r
        <p>{toast.message}</p>\r
\r
        {toast.type === "undo" && (\r
          <button\r
            type="button"\r
            className="tw-undo"\r
            onClick={() => onUndo(toast.id)}\r
          >\r
            Undo archive\r
          </button>\r
        )}\r
      </div>\r
\r
      <button\r
        type="button"\r
        className="tw-dismiss"\r
        aria-label={\`Dismiss: \${toast.title}\`}\r
        onClick={() => onDismiss(toast.id)}\r
      >\r
        <span aria-hidden="true">×</span>\r
      </button>\r
    </li>\r
  );\r
}\r
\r
export default function ToastWorkshop() {\r
  const [toasts, setToasts] = useState([]);\r
  const [autoClose, setAutoClose] = useState(false);\r
  const [archived, setArchived] = useState(false);\r
  const [announcement, setAnnouncement] = useState("");\r
\r
  const nextId = useRef(0);\r
  const announcementTimer = useRef(null);\r
\r
  useEffect(() => {\r
    return () => window.clearTimeout(announcementTimer.current);\r
  }, []);\r
\r
  function announce(message) {\r
    window.clearTimeout(announcementTimer.current);\r
\r
    // Clear first so repeated messages can be announced again.\r
    setAnnouncement("");\r
\r
    announcementTimer.current = window.setTimeout(() => {\r
      setAnnouncement(message);\r
    }, 50);\r
  }\r
\r
  function addToast(type) {\r
    const content = {\r
      success: {\r
        title: "Changes saved",\r
        message: "Your demonstration settings are ready.",\r
      },\r
      info: {\r
        title: "A small reminder",\r
        message: "Preview your work at more than one screen size.",\r
      },\r
      undo: {\r
        title: "Draft archived",\r
        message: "You can restore it using Undo archive.",\r
      },\r
    };\r
\r
    const toast = {\r
      id: ++nextId.current,\r
      type,\r
      ...content[type],\r
\r
      // Actionable notifications stay available until dismissed.\r
      duration: type === "undo" || !autoClose ? 0 : 8000,\r
    };\r
\r
    // Keep three notifications while preserving the undo action.\r
    setToasts((current) => {\r
      const next = [...current, toast];\r
\r
      if (next.length <= 3) return next;\r
\r
      const removableIndex = next.findIndex(\r
        (item) => item.type !== "undo"\r
      );\r
\r
      return next.filter((_, index) => index !== removableIndex);\r
    });\r
\r
    announce(\`\${toast.title}. \${toast.message}\`);\r
  }\r
\r
  function dismissToast(id) {\r
    setToasts((current) => current.filter((toast) => toast.id !== id));\r
  }\r
\r
  function archiveDraft() {\r
    if (archived) return;\r
\r
    setArchived(true);\r
    addToast("undo");\r
  }\r
\r
  function undoArchive(id) {\r
    setArchived(false);\r
    dismissToast(id);\r
    announce("Draft restored.");\r
  }\r
\r
  function resetDemo() {\r
    setToasts([]);\r
    setArchived(false);\r
    announce("Notification demonstration reset.");\r
  }\r
\r
  return (\r
    <section className="toast-workshop">\r
      <header className="tw-heading">\r
        <span className="tw-eyebrow">SMALL MESSAGES / CLEAR FEEDBACK</span>\r
        <h3>A little reassurance goes a long way.</h3>\r
\r
        <p>\r
          Trigger a notification, dismiss it, or try an action you can undo.\r
        </p>\r
      </header>\r
\r
      <div className="tw-controls">\r
        <button type="button" onClick={() => addToast("success")}>\r
          Show success\r
        </button>\r
\r
        <button type="button" onClick={() => addToast("info")}>\r
          Show reminder\r
        </button>\r
      </div>\r
\r
      <label className="tw-auto-close">\r
        <input\r
          type="checkbox"\r
          checked={autoClose}\r
          onChange={(event) => setAutoClose(event.target.checked)}\r
        />\r
\r
        <span>Close new informational messages after 8 seconds</span>\r
      </label>\r
\r
      <div className="tw-draft">\r
        <div>\r
          <span className="tw-eyebrow">SAMPLE DRAFT</span>\r
          <strong>My next website idea</strong>\r
          <span className="tw-draft-state">\r
            {archived ? "Archived" : "Active draft"}\r
          </span>\r
        </div>\r
\r
        <button\r
          type="button"\r
          aria-disabled={archived}\r
          onClick={archiveDraft}\r
        >\r
          {archived ? "Archived" : "Archive"}\r
        </button>\r
      </div>\r
\r
      <div className="tw-preview-heading">\r
        <span>NOTIFICATION AREA</span>\r
\r
        <button type="button" onClick={resetDemo}>\r
          Reset demo\r
        </button>\r
      </div>\r
\r
      <div className="tw-notification-area">\r
        {toasts.length === 0 && (\r
          <p className="tw-empty">Your next message will appear here.</p>\r
        )}\r
\r
        <ol className="tw-stack" aria-label="Notifications">\r
          {toasts.map((toast) => (\r
            <ToastItem\r
              key={toast.id}\r
              toast={toast}\r
              onDismiss={dismissToast}\r
              onUndo={undoArchive}\r
            />\r
          ))}\r
        </ol>\r
      </div>\r
\r
      <p className="tw-screen-reader-only" role="status" aria-atomic="true">\r
        {announcement}\r
      </p>\r
\r
      <p className="tw-demo-note">\r
        Demo only. Nothing is saved or archived outside this preview.\r
        Notifications remain inside the example instead of covering the page.\r
      </p>\r
    </section>\r
  );\r
}\r
`,Ge=`/* -------------------------------------------------------\r
   Scoped toast demonstration\r
------------------------------------------------------- */\r
\r
.toast-workshop {\r
  width: 100%;\r
  max-width: 560px;\r
  min-width: 0;\r
  margin-inline: auto;\r
  padding: 24px;\r
\r
  border: 1px solid #c8d6d7;\r
  border-radius: 16px;\r
\r
  background: #f0f7f6;\r
  color: #233b3c;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.toast-workshop,\r
.toast-workshop * {\r
  box-sizing: border-box;\r
}\r
\r
.tw-eyebrow {\r
  color: #486567;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.6;\r
  letter-spacing: 1.2px;\r
}\r
\r
.toast-workshop .tw-heading h3 {\r
  margin: 14px 0;\r
  color: #233b3c;\r
  font-size: 24px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
  letter-spacing: -0.6px;\r
}\r
\r
.tw-heading p {\r
  margin: 0 0 24px;\r
  color: #486567;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
/* Controls */\r
\r
.toast-workshop button {\r
  min-height: 44px;\r
  padding: 10px 13px;\r
\r
  border: 1px solid #9fb9b9;\r
  border-radius: 8px;\r
\r
  background: #ffffff;\r
  color: #233b3c;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  cursor: pointer;\r
}\r
\r
.toast-workshop button:hover {\r
  background: #e0edeb;\r
}\r
\r
.toast-workshop button:focus-visible,\r
.toast-workshop input:focus-visible {\r
  outline: 3px solid #346b70;\r
  outline-offset: 4px;\r
}\r
\r
.tw-controls {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
}\r
\r
.tw-auto-close {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  min-height: 44px;\r
  margin-top: 18px;\r
\r
  color: #486567;\r
  font-size: 11px;\r
  line-height: 1.6;\r
  cursor: pointer;\r
}\r
\r
.tw-auto-close input {\r
  flex-shrink: 0;\r
  width: 18px;\r
  height: 18px;\r
  margin: 0;\r
  accent-color: #346b70;\r
}\r
\r
/* Sample draft */\r
\r
.tw-draft {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 16px;\r
\r
  margin-top: 24px;\r
  padding: 16px;\r
\r
  border: 1px solid #c8d6d7;\r
  border-radius: 10px;\r
  background: #ffffff;\r
}\r
\r
.tw-draft > div {\r
  display: grid;\r
  gap: 6px;\r
}\r
\r
.tw-draft strong {\r
  font-size: 13px;\r
  font-weight: 600;\r
}\r
\r
.tw-draft-state {\r
  color: #486567;\r
  font-size: 11px;\r
}\r
\r
.tw-draft button[aria-disabled="true"] {\r
  color: #596c6d;\r
  cursor: default;\r
}\r
\r
/* Notification area */\r
\r
.tw-preview-heading {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
\r
  margin-top: 26px;\r
}\r
\r
.tw-preview-heading > span {\r
  color: #486567;\r
  font-family: monospace;\r
  font-size: 9px;\r
  letter-spacing: 1px;\r
}\r
\r
.toast-workshop .tw-preview-heading button {\r
  border-color: transparent;\r
  background: transparent;\r
  font-size: 11px;\r
  text-decoration: underline;\r
  text-underline-offset: 3px;\r
}\r
\r
.tw-notification-area {\r
  min-height: 130px;\r
  margin-top: 12px;\r
  padding: 12px;\r
\r
  border: 1px dashed #9fb9b9;\r
  border-radius: 12px;\r
}\r
\r
.tw-empty {\r
  margin: 30px 0;\r
  color: #486567;\r
  font-size: 12px;\r
  text-align: center;\r
}\r
\r
.tw-stack {\r
  display: grid;\r
  gap: 10px;\r
  margin: 0;\r
  padding: 0;\r
  list-style: none;\r
}\r
\r
.tw-toast {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 10px;\r
\r
  padding: 14px;\r
\r
  border: 1px solid #b8cdcb;\r
  border-radius: 10px;\r
\r
  background: #ffffff;\r
  color: #233b3c;\r
}\r
\r
.tw-toast-symbol {\r
  display: grid;\r
  place-items: center;\r
  flex-shrink: 0;\r
\r
  width: 26px;\r
  height: 26px;\r
  border-radius: 50%;\r
\r
  background: #e2f0e9;\r
  color: #285b42;\r
\r
  font-family: Georgia, serif;\r
  font-size: 16px;\r
}\r
\r
.tw-toast-info .tw-toast-symbol {\r
  background: #e5edf9;\r
  color: #31567d;\r
}\r
\r
.tw-toast-undo .tw-toast-symbol {\r
  background: #f6ecd7;\r
  color: #73551e;\r
}\r
\r
.tw-toast-copy {\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.tw-toast-copy strong {\r
  display: block;\r
  font-size: 12px;\r
  font-weight: 600;\r
}\r
\r
.tw-toast-copy p {\r
  margin: 5px 0 0;\r
  color: #486567;\r
  font-size: 11px;\r
  line-height: 1.6;\r
}\r
\r
.toast-workshop .tw-dismiss {\r
  display: grid;\r
  place-items: center;\r
  flex-shrink: 0;\r
\r
  width: 44px;\r
  height: 44px;\r
  padding: 0;\r
\r
  border-color: transparent;\r
  background: transparent;\r
\r
  font-size: 22px;\r
  line-height: 1;\r
}\r
\r
.toast-workshop .tw-undo {\r
  margin-top: 8px;\r
  padding: 8px 0;\r
  border-color: transparent;\r
  background: transparent;\r
\r
  color: #285b42;\r
  font-size: 11px;\r
  font-weight: 600;\r
  text-decoration: underline;\r
  text-underline-offset: 3px;\r
}\r
\r
.tw-demo-note {\r
  margin: 20px 0 0;\r
  color: #486567;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
.tw-screen-reader-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  overflow: hidden;\r
  clip-path: inset(50%);\r
  white-space: nowrap;\r
}\r
\r
@media (max-width: 480px) {\r
  .toast-workshop {\r
    padding: 20px;\r
  }\r
\r
  .tw-toast {\r
    gap: 8px;\r
    padding: 10px;\r
  }\r
\r
  .tw-toast-symbol {\r
    width: 22px;\r
    height: 22px;\r
  }\r
\r
  .tw-controls > button {\r
    flex: 1;\r
  }\r
}`,Ke=[{id:`start`,name:`Start`,description:`A small space for your first ideas.`,monthly:12,yearly:120,features:[`One active workspace`,`Essential project tools`,`Personal notes`]},{id:`build`,name:`Build`,description:`More room for work taking shape.`,monthly:24,yearly:240,features:[`Five active workspaces`,`Reusable project templates`,`Shared review notes`]},{id:`grow`,name:`Grow`,description:`A shared space for a small team.`,monthly:48,yearly:480,features:[`Unlimited workspaces`,`Team project templates`,`Shared review notes`]}],qe=e=>new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,maximumFractionDigits:0}).format(e);function Je(){let[e,t]=(0,_.useState)(`monthly`),[n,r]=(0,_.useState)(null),i=(0,_.useId)(),a=Ke.find(e=>e.id===n);return(0,b.jsxs)(`section`,{className:`plan-selector`,"aria-labelledby":`${i}-title`,children:[(0,b.jsxs)(`header`,{className:`ps-heading`,children:[(0,b.jsx)(`span`,{className:`ps-eyebrow`,children:`ROOM TO MAKE PROGRESS`}),(0,b.jsx)(`h3`,{id:`${i}-title`,children:`Choose your starting point.`}),(0,b.jsx)(`p`,{children:`A fictional pricing example with clear billing totals. No purchase takes place.`})]}),(0,b.jsxs)(`fieldset`,{className:`ps-billing`,children:[(0,b.jsx)(`legend`,{children:`Billing period`}),(0,b.jsx)(`div`,{className:`ps-billing-options`,children:[{value:`monthly`,label:`Monthly`},{value:`yearly`,label:`Yearly`}].map(n=>(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`input`,{type:`radio`,name:`${i}-billing`,value:n.value,checked:e===n.value,onChange:()=>{t(n.value),r(null)}}),(0,b.jsx)(`span`,{children:n.label})]},n.value))}),(0,b.jsx)(`p`,{className:`ps-billing-note`,children:e===`yearly`?`Yearly prices show the full annual payment.`:`Monthly prices show the payment for one month.`})]}),(0,b.jsx)(`div`,{className:`ps-grid`,children:Ke.map(t=>{let a=e===`yearly`?t.yearly:t.monthly,o=t.monthly*12-t.yearly,s=n===t.id;return(0,b.jsxs)(`article`,{className:`ps-card ${s?`ps-selected`:``}`,"aria-labelledby":`${i}-${t.id}-title`,children:[(0,b.jsxs)(`div`,{className:`ps-card-heading`,children:[(0,b.jsx)(`h4`,{id:`${i}-${t.id}-title`,children:t.name}),t.id===`build`&&(0,b.jsx)(`span`,{className:`ps-badge`,children:`Extra room`})]}),(0,b.jsx)(`p`,{className:`ps-description`,children:t.description}),(0,b.jsxs)(`p`,{className:`ps-price`,children:[(0,b.jsx)(`strong`,{children:qe(a)}),(0,b.jsxs)(`span`,{children:[`/ `,e===`yearly`?`year`:`month`]})]}),(0,b.jsx)(`p`,{className:`ps-payment-detail`,children:e===`yearly`?`${qe(t.yearly)} billed annually`:`${qe(t.monthly)} billed monthly`}),(0,b.jsx)(`p`,{className:`ps-saving`,children:e===`yearly`?`Save ${qe(o)} versus 12 monthly payments.`:`Switch to yearly to compare the annual cost.`}),(0,b.jsx)(`ul`,{className:`ps-features`,children:t.features.map(e=>(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`✓`}),e]},e))}),(0,b.jsxs)(`button`,{type:`button`,className:`ps-select`,"aria-pressed":s,onClick:()=>r(t.id),children:[s?`${t.name} selected`:`Choose ${t.name}`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:s?`✓`:`↗`})]})]},t.id)})}),(0,b.jsxs)(`div`,{className:`ps-selection-area`,children:[(0,b.jsx)(`p`,{className:`ps-selection-message`,role:`status`,children:a?`${a.name} selected: ${qe(e===`yearly`?a.yearly:a.monthly)} billed ${e===`yearly`?`annually`:`monthly`}. Demonstration only.`:`Choose a plan to preview your selection.`}),(0,b.jsx)(`button`,{type:`button`,className:`ps-clear`,onClick:()=>r(null),disabled:!n,children:`Clear selection`})]}),(0,b.jsx)(`p`,{className:`ps-demo-note`,children:`Fictional plans and USD prices. No checkout, account creation, or payment processing is connected.`})]})}var Ye=`import { useId, useState } from "react";\r
import "./PlanSelector.css";\r
\r
const plans = [\r
  {\r
    id: "start",\r
    name: "Start",\r
    description: "A small space for your first ideas.",\r
    monthly: 12,\r
    yearly: 120,\r
    features: [\r
      "One active workspace",\r
      "Essential project tools",\r
      "Personal notes",\r
    ],\r
  },\r
  {\r
    id: "build",\r
    name: "Build",\r
    description: "More room for work taking shape.",\r
    monthly: 24,\r
    yearly: 240,\r
    features: [\r
      "Five active workspaces",\r
      "Reusable project templates",\r
      "Shared review notes",\r
    ],\r
  },\r
  {\r
    id: "grow",\r
    name: "Grow",\r
    description: "A shared space for a small team.",\r
    monthly: 48,\r
    yearly: 480,\r
    features: [\r
      "Unlimited workspaces",\r
      "Team project templates",\r
      "Shared review notes",\r
    ],\r
  },\r
];\r
\r
const formatPrice = (amount) =>\r
  new Intl.NumberFormat("en-US", {\r
    style: "currency",\r
    currency: "USD",\r
    maximumFractionDigits: 0,\r
  }).format(amount);\r
\r
export default function PlanSelector() {\r
  const [billing, setBilling] = useState("monthly");\r
  const [selectedPlan, setSelectedPlan] = useState(null);\r
\r
  const id = useId();\r
  const selected = plans.find((plan) => plan.id === selectedPlan);\r
\r
  return (\r
    <section\r
      className="plan-selector"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <header className="ps-heading">\r
        <span className="ps-eyebrow">ROOM TO MAKE PROGRESS</span>\r
\r
        <h3 id={\`\${id}-title\`}>Choose your starting point.</h3>\r
\r
        <p>\r
          A fictional pricing example with clear billing totals.\r
          No purchase takes place.\r
        </p>\r
      </header>\r
\r
      <fieldset className="ps-billing">\r
        <legend>Billing period</legend>\r
\r
        <div className="ps-billing-options">\r
          {[\r
            { value: "monthly", label: "Monthly" },\r
            { value: "yearly", label: "Yearly" },\r
          ].map((option) => (\r
            <label key={option.value}>\r
              <input\r
                type="radio"\r
                name={\`\${id}-billing\`}\r
                value={option.value}\r
                checked={billing === option.value}\r
                onChange={() => {\r
                  setBilling(option.value);\r
                  setSelectedPlan(null);\r
                }}\r
              />\r
\r
              <span>{option.label}</span>\r
            </label>\r
          ))}\r
        </div>\r
\r
        <p className="ps-billing-note">\r
          {billing === "yearly"\r
            ? "Yearly prices show the full annual payment."\r
            : "Monthly prices show the payment for one month."}\r
        </p>\r
      </fieldset>\r
\r
      <div className="ps-grid">\r
        {plans.map((plan) => {\r
          const price =\r
            billing === "yearly" ? plan.yearly : plan.monthly;\r
\r
          const yearlySaving = plan.monthly * 12 - plan.yearly;\r
          const isSelected = selectedPlan === plan.id;\r
\r
          return (\r
            <article\r
              key={plan.id}\r
              className={\`ps-card \${isSelected ? "ps-selected" : ""}\`}\r
              aria-labelledby={\`\${id}-\${plan.id}-title\`}\r
            >\r
              <div className="ps-card-heading">\r
                <h4 id={\`\${id}-\${plan.id}-title\`}>{plan.name}</h4>\r
\r
                {plan.id === "build" && (\r
                  <span className="ps-badge">Extra room</span>\r
                )}\r
              </div>\r
\r
              <p className="ps-description">{plan.description}</p>\r
\r
              <p className="ps-price">\r
                <strong>{formatPrice(price)}</strong>\r
                <span>\r
                  / {billing === "yearly" ? "year" : "month"}\r
                </span>\r
              </p>\r
\r
              <p className="ps-payment-detail">\r
                {billing === "yearly"\r
                  ? \`\${formatPrice(plan.yearly)} billed annually\`\r
                  : \`\${formatPrice(plan.monthly)} billed monthly\`}\r
              </p>\r
\r
              <p className="ps-saving">\r
                {billing === "yearly"\r
                  ? \`Save \${formatPrice(yearlySaving)} versus 12 monthly payments.\`\r
                  : "Switch to yearly to compare the annual cost."}\r
              </p>\r
\r
              <ul className="ps-features">\r
                {plan.features.map((feature) => (\r
                  <li key={feature}>\r
                    <span aria-hidden="true">✓</span>\r
                    {feature}\r
                  </li>\r
                ))}\r
              </ul>\r
\r
              <button\r
                type="button"\r
                className="ps-select"\r
                aria-pressed={isSelected}\r
                onClick={() => setSelectedPlan(plan.id)}\r
              >\r
                {isSelected ? \`\${plan.name} selected\` : \`Choose \${plan.name}\`}\r
\r
                <span aria-hidden="true">\r
                  {isSelected ? "✓" : "↗"}\r
                </span>\r
              </button>\r
            </article>\r
          );\r
        })}\r
      </div>\r
\r
      <div className="ps-selection-area">\r
        <p className="ps-selection-message" role="status">\r
          {selected\r
            ? \`\${selected.name} selected: \${formatPrice(\r
                billing === "yearly"\r
                  ? selected.yearly\r
                  : selected.monthly\r
              )} billed \${billing === "yearly" ? "annually" : "monthly"}. Demonstration only.\`\r
            : "Choose a plan to preview your selection."}\r
        </p>\r
\r
        <button\r
          type="button"\r
          className="ps-clear"\r
          onClick={() => setSelectedPlan(null)}\r
          disabled={!selectedPlan}\r
        >\r
          Clear selection\r
        </button>\r
      </div>\r
\r
      <p className="ps-demo-note">\r
        Fictional plans and USD prices. No checkout, account creation,\r
        or payment processing is connected.\r
      </p>\r
    </section>\r
  );\r
}`,Xe=`/* -------------------------------------------------------\r
   Scoped pricing-section example\r
------------------------------------------------------- */\r
\r
.plan-selector {\r
  container-name: plan-selector;\r
  container-type: inline-size;\r
\r
  width: 100%;\r
  min-width: 0;\r
  padding: 24px;\r
\r
  border: 1px solid #d8d1c4;\r
  border-radius: 16px;\r
\r
  background: #f7f3ea;\r
  color: #3c352b;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.plan-selector,\r
.plan-selector * {\r
  box-sizing: border-box;\r
}\r
\r
.ps-eyebrow {\r
  color: #71634e;\r
  font-family: monospace;\r
  font-size: 9px;\r
  letter-spacing: 1.3px;\r
  line-height: 1.6;\r
}\r
\r
.plan-selector .ps-heading h3 {\r
  margin: 14px 0;\r
  color: #3c352b;\r
  font-size: 28px;\r
  font-weight: 500;\r
  line-height: 1.25;\r
  letter-spacing: -0.8px;\r
}\r
\r
.ps-heading > p {\r
  max-width: 480px;\r
  margin: 0;\r
  color: #71634e;\r
  font-size: 13px;\r
  line-height: 1.7;\r
}\r
\r
/* Billing controls */\r
\r
.ps-billing {\r
  min-width: 0;\r
  margin: 24px 0;\r
  padding: 0;\r
  border: 0;\r
}\r
\r
.ps-billing legend {\r
  margin-bottom: 10px;\r
  color: #3c352b;\r
  font-size: 12px;\r
  font-weight: 600;\r
}\r
\r
.ps-billing-options {\r
  display: inline-flex;\r
  gap: 5px;\r
  padding: 5px;\r
\r
  border: 1px solid #c9bdab;\r
  border-radius: 10px;\r
  background: #eee7db;\r
}\r
\r
.ps-billing-options label {\r
  position: relative;\r
  display: block;\r
  cursor: pointer;\r
}\r
\r
.ps-billing-options input {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  margin: 0;\r
  opacity: 0;\r
}\r
\r
.ps-billing-options label > span {\r
  display: grid;\r
  place-items: center;\r
\r
  min-width: 88px;\r
  min-height: 44px;\r
  padding: 10px 16px;\r
\r
  border-radius: 7px;\r
  color: #65563f;\r
  font-size: 12px;\r
}\r
\r
.ps-billing-options input:checked + span {\r
  background: #4f4537;\r
  color: #ffffff;\r
}\r
\r
.ps-billing-options input:focus-visible + span {\r
  outline: 3px solid #84642f;\r
  outline-offset: 3px;\r
}\r
\r
.ps-billing-note {\r
  margin: 12px 0 0;\r
  color: #71634e;\r
  font-size: 11px;\r
  line-height: 1.6;\r
}\r
\r
/* Plan cards */\r
\r
.ps-grid {\r
  display: grid;\r
  grid-template-columns: repeat(3, minmax(0, 1fr));\r
  gap: 14px;\r
}\r
\r
.ps-card {\r
  display: flex;\r
  flex-direction: column;\r
  min-width: 0;\r
  padding: 22px;\r
\r
  border: 2px solid #ded6c8;\r
  border-radius: 14px;\r
\r
  background: #fffdf7;\r
}\r
\r
.ps-card.ps-selected {\r
  border-color: #84642f;\r
  background: #fff8e9;\r
}\r
\r
.ps-card-heading {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
}\r
\r
.plan-selector .ps-card h4 {\r
  margin: 0;\r
  color: #3c352b;\r
  font-size: 20px;\r
  font-weight: 600;\r
  line-height: 1.3;\r
}\r
\r
.ps-badge {\r
  padding: 5px 8px;\r
  border: 1px solid #d8c39e;\r
  border-radius: 20px;\r
\r
  background: #f3e6cb;\r
  color: #644b22;\r
\r
  font-size: 9px;\r
  line-height: 1.4;\r
}\r
\r
.ps-description {\r
  min-height: 44px;\r
  margin: 14px 0 0;\r
\r
  color: #71634e;\r
  font-size: 12px;\r
  line-height: 1.7;\r
}\r
\r
.ps-price {\r
  display: flex;\r
  align-items: baseline;\r
  flex-wrap: wrap;\r
  gap: 7px;\r
\r
  margin: 26px 0 6px;\r
}\r
\r
.ps-price strong {\r
  color: #3c352b;\r
  font-size: 38px;\r
  font-weight: 500;\r
  line-height: 1.1;\r
  letter-spacing: -1.5px;\r
}\r
\r
.ps-price > span {\r
  color: #71634e;\r
  font-size: 12px;\r
}\r
\r
.ps-payment-detail {\r
  margin: 0;\r
  color: #4f4537;\r
  font-size: 11px;\r
}\r
\r
.ps-saving {\r
  min-height: 38px;\r
  margin: 12px 0 20px;\r
\r
  color: #71634e;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
.ps-features {\r
  display: grid;\r
  gap: 13px;\r
  margin: 0 0 28px;\r
  padding: 20px 0 0;\r
\r
  border-top: 1px solid #ded6c8;\r
  list-style: none;\r
}\r
\r
.ps-features li {\r
  display: flex;\r
  align-items: baseline;\r
  gap: 10px;\r
\r
  color: #4f4537;\r
  font-size: 12px;\r
  line-height: 1.6;\r
}\r
\r
.ps-features li > span {\r
  flex-shrink: 0;\r
  color: #52613b;\r
}\r
\r
.plan-selector .ps-select,\r
.plan-selector .ps-clear {\r
  min-height: 44px;\r
  padding: 12px 14px;\r
  border-radius: 8px;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  cursor: pointer;\r
}\r
\r
.plan-selector .ps-select {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 12px;\r
\r
  width: 100%;\r
  margin-top: auto;\r
\r
  border: 1px solid #4f4537;\r
  background: #4f4537;\r
  color: #ffffff;\r
}\r
\r
.plan-selector .ps-select:hover {\r
  background: #665744;\r
}\r
\r
.plan-selector .ps-select[aria-pressed="true"] {\r
  border-color: #73521f;\r
  background: #73521f;\r
}\r
\r
.plan-selector button:focus-visible {\r
  outline: 3px solid #84642f;\r
  outline-offset: 4px;\r
}\r
\r
/* Selection feedback */\r
\r
.ps-selection-area {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 16px;\r
\r
  margin-top: 22px;\r
  padding-top: 18px;\r
\r
  border-top: 1px solid #d8d1c4;\r
}\r
\r
.ps-selection-message {\r
  flex: 1;\r
  min-width: 160px;\r
  margin: 0;\r
\r
  color: #4f4537;\r
  font-size: 12px;\r
  line-height: 1.7;\r
}\r
\r
.plan-selector .ps-clear {\r
  border: 1px solid #c9bdab;\r
  background: transparent;\r
  color: #4f4537;\r
}\r
\r
.plan-selector .ps-clear:hover:not(:disabled) {\r
  background: #eee7db;\r
}\r
\r
.plan-selector .ps-clear:disabled {\r
  opacity: 0.55;\r
  cursor: default;\r
}\r
\r
.ps-demo-note {\r
  margin: 20px 0 0;\r
  color: #71634e;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
@container plan-selector (max-width: 650px) {\r
  .ps-grid {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .ps-description,\r
  .ps-saving {\r
    min-height: 0;\r
  }\r
\r
  .ps-card {\r
    padding: 20px;\r
  }\r
}`,Ze=[{id:`clarity`,quote:`The moment we simplified the page, the important message finally had room to stand out.`,name:`Maya`,role:`Fictional studio founder`,initials:`MA`,theme:`sage`},{id:`process`,quote:`Working in small steps made the whole project easier to understand, discuss, and improve.`,name:`Daniel`,role:`Fictional project coordinator`,initials:`DA`,theme:`clay`},{id:`confidence`,quote:`Trying the interface myself helped me explain what worked and what needed another look.`,name:`Amina`,role:`Fictional learning designer`,initials:`AM`,theme:`lavender`}];function Qe(){let[e,t]=(0,_.useState)(0),[n,r]=(0,_.useState)(``),i=(0,_.useId)(),a=Ze[e];function o(n){let i=(n+Ze.length)%Ze.length;i!==e&&(t(i),r(`Quote ${i+1} of ${Ze.length}, from ${Ze[i].name}.`))}return(0,b.jsxs)(`section`,{className:`quote-carousel`,"aria-roledescription":`carousel`,"aria-labelledby":`${i}-title`,children:[(0,b.jsxs)(`header`,{className:`qc-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`qc-eyebrow`,children:`A DIFFERENT PERSPECTIVE`}),(0,b.jsx)(`h3`,{id:`${i}-title`,children:`Good work starts a conversation.`})]}),(0,b.jsxs)(`span`,{className:`qc-counter`,"aria-hidden":`true`,children:[String(e+1).padStart(2,`0`),(0,b.jsx)(`span`,{children:` / `}),String(Ze.length).padStart(2,`0`)]})]}),(0,b.jsx)(`div`,{id:`${i}-slide`,className:`qc-slide qc-theme-${a.theme}`,role:`group`,"aria-roledescription":`slide`,"aria-label":`${e+1} of ${Ze.length}`,children:(0,b.jsxs)(`figure`,{className:`qc-figure`,children:[(0,b.jsx)(`span`,{className:`qc-quote-mark`,"aria-hidden":`true`,children:`“`}),(0,b.jsx)(`blockquote`,{children:(0,b.jsx)(`p`,{children:a.quote})}),(0,b.jsxs)(`figcaption`,{children:[(0,b.jsx)(`span`,{className:`qc-avatar`,"aria-hidden":`true`,children:a.initials}),(0,b.jsxs)(`span`,{className:`qc-person`,children:[(0,b.jsx)(`strong`,{children:a.name}),(0,b.jsx)(`span`,{children:a.role})]})]})]})}),(0,b.jsxs)(`div`,{className:`qc-controls`,children:[(0,b.jsx)(`button`,{type:`button`,className:`qc-arrow`,"aria-label":`Previous quote`,"aria-controls":`${i}-slide`,onClick:()=>o(e-1),children:(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`←`})}),(0,b.jsx)(`div`,{className:`qc-pagination`,role:`group`,"aria-label":`Choose a quote`,children:Ze.map((t,n)=>(0,b.jsx)(`button`,{type:`button`,className:`qc-page`,"aria-label":`Show quote ${n+1} from ${t.name}`,"aria-pressed":e===n,"aria-controls":`${i}-slide`,onClick:()=>o(n),children:(0,b.jsx)(`span`,{"aria-hidden":`true`})},t.id))}),(0,b.jsx)(`button`,{type:`button`,className:`qc-arrow`,"aria-label":`Next quote`,"aria-controls":`${i}-slide`,onClick:()=>o(e+1),children:(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`→`})})]}),(0,b.jsx)(`p`,{className:`qc-screen-reader-only`,role:`status`,"aria-atomic":`true`,children:n}),(0,b.jsx)(`p`,{className:`qc-demo-note`,children:`Fictional quotes and identities for demonstration. Slides change only when you choose; there is no automatic rotation.`})]})}var $e=`import { useId, useState } from "react";\r
import "./QuoteCarousel.css";\r
\r
const quotes = [\r
  {\r
    id: "clarity",\r
    quote:\r
      "The moment we simplified the page, the important message finally had room to stand out.",\r
    name: "Maya",\r
    role: "Fictional studio founder",\r
    initials: "MA",\r
    theme: "sage",\r
  },\r
  {\r
    id: "process",\r
    quote:\r
      "Working in small steps made the whole project easier to understand, discuss, and improve.",\r
    name: "Daniel",\r
    role: "Fictional project coordinator",\r
    initials: "DA",\r
    theme: "clay",\r
  },\r
  {\r
    id: "confidence",\r
    quote:\r
      "Trying the interface myself helped me explain what worked and what needed another look.",\r
    name: "Amina",\r
    role: "Fictional learning designer",\r
    initials: "AM",\r
    theme: "lavender",\r
  },\r
];\r
\r
export default function QuoteCarousel() {\r
  const [activeIndex, setActiveIndex] = useState(0);\r
  const [announcement, setAnnouncement] = useState("");\r
\r
  const id = useId();\r
  const activeQuote = quotes[activeIndex];\r
\r
  function selectSlide(index) {\r
    const nextIndex = (index + quotes.length) % quotes.length;\r
\r
    if (nextIndex === activeIndex) return;\r
\r
    setActiveIndex(nextIndex);\r
\r
    setAnnouncement(\r
      \`Quote \${nextIndex + 1} of \${quotes.length}, from \${quotes[nextIndex].name}.\`\r
    );\r
  }\r
\r
  return (\r
    <section\r
      className="quote-carousel"\r
      aria-roledescription="carousel"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <header className="qc-heading">\r
        <div>\r
          <span className="qc-eyebrow">A DIFFERENT PERSPECTIVE</span>\r
          <h3 id={\`\${id}-title\`}>Good work starts a conversation.</h3>\r
        </div>\r
\r
        <span className="qc-counter" aria-hidden="true">\r
          {String(activeIndex + 1).padStart(2, "0")}\r
          <span> / </span>\r
          {String(quotes.length).padStart(2, "0")}\r
        </span>\r
      </header>\r
\r
      <div\r
        id={\`\${id}-slide\`}\r
        className={\`qc-slide qc-theme-\${activeQuote.theme}\`}\r
        role="group"\r
        aria-roledescription="slide"\r
        aria-label={\`\${activeIndex + 1} of \${quotes.length}\`}\r
      >\r
        <figure className="qc-figure">\r
          <span className="qc-quote-mark" aria-hidden="true">\r
            “\r
          </span>\r
\r
          <blockquote>\r
            <p>{activeQuote.quote}</p>\r
          </blockquote>\r
\r
          <figcaption>\r
            <span className="qc-avatar" aria-hidden="true">\r
              {activeQuote.initials}\r
            </span>\r
\r
            <span className="qc-person">\r
              <strong>{activeQuote.name}</strong>\r
              <span>{activeQuote.role}</span>\r
            </span>\r
          </figcaption>\r
        </figure>\r
      </div>\r
\r
      <div className="qc-controls">\r
        <button\r
          type="button"\r
          className="qc-arrow"\r
          aria-label="Previous quote"\r
          aria-controls={\`\${id}-slide\`}\r
          onClick={() => selectSlide(activeIndex - 1)}\r
        >\r
          <span aria-hidden="true">←</span>\r
        </button>\r
\r
        <div className="qc-pagination" role="group" aria-label="Choose a quote">\r
          {quotes.map((quote, index) => (\r
            <button\r
              key={quote.id}\r
              type="button"\r
              className="qc-page"\r
              aria-label={\`Show quote \${index + 1} from \${quote.name}\`}\r
              aria-pressed={activeIndex === index}\r
              aria-controls={\`\${id}-slide\`}\r
              onClick={() => selectSlide(index)}\r
            >\r
              <span aria-hidden="true" />\r
            </button>\r
          ))}\r
        </div>\r
\r
        <button\r
          type="button"\r
          className="qc-arrow"\r
          aria-label="Next quote"\r
          aria-controls={\`\${id}-slide\`}\r
          onClick={() => selectSlide(activeIndex + 1)}\r
        >\r
          <span aria-hidden="true">→</span>\r
        </button>\r
      </div>\r
\r
      <p className="qc-screen-reader-only" role="status" aria-atomic="true">\r
        {announcement}\r
      </p>\r
\r
      <p className="qc-demo-note">\r
        Fictional quotes and identities for demonstration. Slides change\r
        only when you choose; there is no automatic rotation.\r
      </p>\r
    </section>\r
  );\r
}`,et=`﻿.quote-carousel {
  container-type: inline-size;
  width: 100%;
  min-width: 0;
  max-width: 640px;
  padding: 24px;
  border: 1px solid #d8d1c4;
  border-radius: 16px;
  background: #f7f3ea;
  color: #3c352b;
  font-family: Arial, Helvetica, sans-serif;
  color-scheme: light;
}

.quote-carousel,
.quote-carousel * {
  box-sizing: border-box;
}

.quote-carousel .qc-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.qc-eyebrow {
  color: #71634e;
  font: 10px/1.6 monospace;
  letter-spacing: 1.3px;
}

.quote-carousel .qc-heading h3 {
  margin: 12px 0 0;
  color: #3c352b;
  font-size: 26px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.6px;
}

.qc-counter {
  flex-shrink: 0;
  color: #71634e;
  font: 12px/1.6 monospace;
  white-space: nowrap;
}

.qc-slide {
  --qc-accent: #385743;
  min-width: 0;
  padding: 28px;
  border-radius: 12px;
  background: #e3ebdf;
  color: #29382c;
}

.qc-theme-clay {
  --qc-accent: #754a36;
  background: #f0dfd3;
  color: #4f3428;
}

.qc-theme-lavender {
  --qc-accent: #604777;
  background: #e9e1f0;
  color: #463450;
}

.qc-figure {
  margin: 0;
}

.qc-quote-mark {
  display: block;
  height: 48px;
  color: var(--qc-accent);
  font: 64px/1 Georgia, serif;
}

.quote-carousel blockquote {
  margin: 12px 0 28px;
  padding: 0;
  border: 0;
}

.quote-carousel blockquote p {
  margin: 0;
  color: inherit;
  font: 22px/1.5 Georgia, serif;
  overflow-wrap: anywhere;
}

.qc-figure figcaption {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qc-avatar {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid currentColor;
  border-radius: 50%;
  color: var(--qc-accent);
  font: 12px monospace;
}

.qc-person {
  display: grid;
  gap: 4px;
  min-width: 0;
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.qc-person strong {
  font-size: 14px;
}

.qc-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
}

.quote-carousel .qc-arrow,
.quote-carousel .qc-page {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  color: #3c352b;
  font: inherit;
  cursor: pointer;
}

.quote-carousel .qc-arrow {
  border: 1px solid #a99e8c;
  border-radius: 50%;
  background: transparent;
  font-size: 20px;
}

.quote-carousel .qc-arrow:hover {
  background: #e8e0d1;
}

.qc-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.quote-carousel .qc-page {
  border: 0;
  border-radius: 8px;
  background: transparent;
}

.qc-page span {
  width: 8px;
  height: 8px;
  border: 1px solid #71634e;
  border-radius: 50%;
}

.qc-page[aria-pressed="true"] span {
  background: #3c352b;
  border-color: #3c352b;
}

.qc-page:hover span {
  background: #71634e;
}

.quote-carousel button:focus-visible {
  outline: 3px solid #604777;
  outline-offset: 3px;
}

.qc-screen-reader-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.quote-carousel .qc-demo-note {
  margin: 20px 0 0;
  color: #71634e;
  font-size: 11px;
  line-height: 1.7;
}

@container (max-width: 360px) {
  .quote-carousel .qc-heading {
    flex-direction: column;
    gap: 12px;
  }

  .quote-carousel .qc-heading h3 {
    font-size: 22px;
  }

  .qc-slide {
    padding: 18px;
  }

  .quote-carousel blockquote p {
    font-size: 19px;
  }

  .quote-carousel .qc-page {
    width: 32px;
    min-height: 44px;
  }
}\r
`,tt=[{id:`clarity`,label:`Clarity`,headline:`Give your next idea a clearer direction.`,description:`Bring your message, structure, and visual choices together in one thoughtful place.`,accent:`#c2e6ae`},{id:`craft`,label:`Craft`,headline:`Make the small details feel considered.`,description:`Shape a useful experience through clear words, careful spacing, and purposeful interactions.`,accent:`#f1c3a0`},{id:`discovery`,label:`Discovery`,headline:`Leave a little room for something new.`,description:`Explore possibilities, test a different approach, and turn a small experiment into progress.`,accent:`#d1bdf4`}];function nt(){let[e,t]=(0,_.useState)(`clarity`),[n,r]=(0,_.useState)(``),i=(0,_.useId)(),a=tt.find(t=>t.id===e);function o(e){t(e),r(``)}return(0,b.jsxs)(`section`,{className:`direction-hero`,style:{"--dh-accent":a.accent},"aria-labelledby":`${i}-title`,children:[(0,b.jsxs)(`div`,{className:`dh-topline`,children:[(0,b.jsxs)(`span`,{className:`dh-brand`,children:[(0,b.jsx)(`span`,{className:`dh-brand-symbol`,"aria-hidden":`true`,children:`↗`}),`Common Ground`]}),(0,b.jsx)(`span`,{className:`dh-edition`,children:`AN INTERFACE EXPERIMENT`})]}),(0,b.jsxs)(`div`,{className:`dh-layout`,children:[(0,b.jsxs)(`div`,{className:`dh-content`,children:[(0,b.jsx)(`span`,{className:`dh-eyebrow`,children:`SMALL IDEAS / THOUGHTFUL BEGINNINGS`}),(0,b.jsxs)(`div`,{className:`dh-copy`,children:[(0,b.jsx)(`h3`,{id:`${i}-title`,children:a.headline}),(0,b.jsx)(`p`,{children:a.description})]},a.id),(0,b.jsx)(`div`,{className:`dh-actions`,children:(0,b.jsxs)(`button`,{type:`button`,className:`dh-primary`,onClick:()=>r(`${a.label} selected as your starting direction. This is a local demonstration.`),children:[`Start with `,a.label.toLowerCase(),(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})}),(0,b.jsxs)(`fieldset`,{className:`dh-directions`,children:[(0,b.jsx)(`legend`,{children:`Explore a direction`}),(0,b.jsx)(`div`,{className:`dh-direction-options`,children:tt.map(t=>(0,b.jsxs)(`label`,{children:[(0,b.jsx)(`input`,{type:`radio`,name:`${i}-direction`,value:t.id,checked:e===t.id,onChange:()=>o(t.id)}),(0,b.jsx)(`span`,{children:t.label})]},t.id))})]})]}),(0,b.jsxs)(`div`,{className:`dh-artwork`,"aria-hidden":`true`,children:[(0,b.jsx)(`div`,{className:`dh-art-grid`}),(0,b.jsxs)(`div`,{className:`dh-art-panel dh-art-panel-back`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsxs)(`div`,{className:`dh-art-panel dh-art-panel-front`,children:[(0,b.jsx)(`span`,{className:`dh-art-label`,children:`A WORK IN PROGRESS`}),(0,b.jsxs)(`div`,{className:`dh-art-orbit`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsxs)(`span`,{className:`dh-art-word`,children:[a.label,`.`]})]}),(0,b.jsxs)(`div`,{className:`dh-art-note`,children:[(0,b.jsx)(`span`,{children:`+`}),`One thoughtful step at a time.`]}),(0,b.jsx)(`span`,{className:`dh-art-coordinate`,children:`IDEA → FORM → EXPERIENCE`})]})]}),(0,b.jsx)(`p`,{className:`dh-feedback`,role:`status`,children:n}),(0,b.jsxs)(`div`,{className:`dh-bottomline`,children:[(0,b.jsx)(`span`,{children:`Words. Structure. Interaction.`}),(0,b.jsx)(`span`,{children:`Fictional studio / demonstration only`})]})]})}var rt=`import { useId, useState } from "react";\r
import "./DirectionHero.css";\r
\r
const directions = [\r
  {\r
    id: "clarity",\r
    label: "Clarity",\r
    headline: "Give your next idea a clearer direction.",\r
    description:\r
      "Bring your message, structure, and visual choices together in one thoughtful place.",\r
    accent: "#c2e6ae",\r
  },\r
  {\r
    id: "craft",\r
    label: "Craft",\r
    headline: "Make the small details feel considered.",\r
    description:\r
      "Shape a useful experience through clear words, careful spacing, and purposeful interactions.",\r
    accent: "#f1c3a0",\r
  },\r
  {\r
    id: "discovery",\r
    label: "Discovery",\r
    headline: "Leave a little room for something new.",\r
    description:\r
      "Explore possibilities, test a different approach, and turn a small experiment into progress.",\r
    accent: "#d1bdf4",\r
  },\r
];\r
\r
export default function DirectionHero() {\r
  const [activeDirection, setActiveDirection] = useState("clarity");\r
  const [message, setMessage] = useState("");\r
\r
  const id = useId();\r
\r
  const direction = directions.find(\r
    (item) => item.id === activeDirection\r
  );\r
\r
  function selectDirection(nextDirection) {\r
    setActiveDirection(nextDirection);\r
    setMessage("");\r
  }\r
\r
  return (\r
    <section\r
      className="direction-hero"\r
      style={{ "--dh-accent": direction.accent }}\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <div className="dh-topline">\r
        <span className="dh-brand">\r
          <span className="dh-brand-symbol" aria-hidden="true">\r
            ↗\r
          </span>\r
          Common Ground\r
        </span>\r
\r
        <span className="dh-edition">AN INTERFACE EXPERIMENT</span>\r
      </div>\r
\r
      <div className="dh-layout">\r
        <div className="dh-content">\r
          <span className="dh-eyebrow">SMALL IDEAS / THOUGHTFUL BEGINNINGS</span>\r
\r
          <div className="dh-copy" key={direction.id}>\r
            <h3 id={\`\${id}-title\`}>{direction.headline}</h3>\r
            <p>{direction.description}</p>\r
          </div>\r
\r
          <div className="dh-actions">\r
            <button\r
              type="button"\r
              className="dh-primary"\r
              onClick={() =>\r
                setMessage(\r
                  \`\${direction.label} selected as your starting direction. This is a local demonstration.\`\r
                )\r
              }\r
            >\r
              Start with {direction.label.toLowerCase()}\r
              <span aria-hidden="true">↗</span>\r
            </button>\r
          </div>\r
\r
          <fieldset className="dh-directions">\r
            <legend>Explore a direction</legend>\r
\r
            <div className="dh-direction-options">\r
              {directions.map((item) => (\r
                <label key={item.id}>\r
                  <input\r
                    type="radio"\r
                    name={\`\${id}-direction\`}\r
                    value={item.id}\r
                    checked={activeDirection === item.id}\r
                    onChange={() => selectDirection(item.id)}\r
                  />\r
\r
                  <span>{item.label}</span>\r
                </label>\r
              ))}\r
            </div>\r
          </fieldset>\r
        </div>\r
\r
        <div className="dh-artwork" aria-hidden="true">\r
          <div className="dh-art-grid" />\r
\r
          <div className="dh-art-panel dh-art-panel-back">\r
            <span />\r
            <span />\r
            <span />\r
          </div>\r
\r
          <div className="dh-art-panel dh-art-panel-front">\r
            <span className="dh-art-label">A WORK IN PROGRESS</span>\r
\r
            <div className="dh-art-orbit">\r
              <span />\r
              <span />\r
            </div>\r
\r
            <span className="dh-art-word">{direction.label}.</span>\r
          </div>\r
\r
          <div className="dh-art-note">\r
            <span>+</span>\r
            One thoughtful step at a time.\r
          </div>\r
\r
          <span className="dh-art-coordinate">IDEA → FORM → EXPERIENCE</span>\r
        </div>\r
      </div>\r
\r
      <p className="dh-feedback" role="status">\r
        {message}\r
      </p>\r
\r
      <div className="dh-bottomline">\r
        <span>Words. Structure. Interaction.</span>\r
        <span>Fictional studio / demonstration only</span>\r
      </div>\r
    </section>\r
  );\r
}`,it=`/* -------------------------------------------------------\r
   Scoped animated hero\r
------------------------------------------------------- */\r
\r
.direction-hero {\r
  container-name: direction-hero;\r
  container-type: inline-size;\r
\r
  width: 100%;\r
  min-width: 0;\r
  padding: 26px;\r
  overflow: hidden;\r
\r
  border: 1px solid #39463e;\r
  border-radius: 16px;\r
\r
  background: #14201b;\r
  color: #f0f3e8;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: dark;\r
}\r
\r
.direction-hero,\r
.direction-hero * {\r
  box-sizing: border-box;\r
}\r
\r
.dh-topline,\r
.dh-bottomline {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 14px;\r
}\r
\r
.dh-topline {\r
  padding-bottom: 20px;\r
  border-bottom: 1px solid #39463e;\r
}\r
\r
.dh-brand {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  color: #f0f3e8;\r
  font-size: 14px;\r
  font-weight: 600;\r
  letter-spacing: -0.3px;\r
}\r
\r
.dh-brand-symbol {\r
  display: grid;\r
  place-items: center;\r
\r
  width: 28px;\r
  height: 28px;\r
  border: 1px solid #738572;\r
  border-radius: 7px;\r
\r
  color: var(--dh-accent);\r
  font-size: 18px;\r
}\r
\r
.dh-edition,\r
.dh-eyebrow {\r
  color: #b5c4b4;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.6;\r
  letter-spacing: 1.3px;\r
}\r
\r
/* Main composition */\r
\r
.dh-layout {\r
  display: grid;\r
  grid-template-columns: 1.1fr 1fr;\r
  align-items: center;\r
  gap: 36px;\r
\r
  padding-top: 44px;\r
}\r
\r
.dh-content {\r
  min-width: 0;\r
}\r
\r
.dh-copy {\r
  animation: dh-reveal 400ms ease-out both;\r
}\r
\r
.direction-hero .dh-copy h3 {\r
  margin: 20px 0;\r
  color: #f0f3e8;\r
\r
  font-size: clamp(32px, 5.5cqi, 56px);\r
  font-weight: 500;\r
  line-height: 1.08;\r
  letter-spacing: -1.8px;\r
}\r
\r
.dh-copy p {\r
  max-width: 440px;\r
  margin: 0;\r
\r
  color: #b5c4b4;\r
  font-size: 14px;\r
  line-height: 1.8;\r
}\r
\r
.dh-actions {\r
  margin-top: 26px;\r
}\r
\r
.direction-hero .dh-primary {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 18px;\r
\r
  max-width: 100%;\r
  min-height: 46px;\r
  padding: 13px 16px;\r
\r
  border: 1px solid transparent;\r
  border-radius: 8px;\r
\r
  background: var(--dh-accent);\r
  color: #14201b;\r
\r
  font: inherit;\r
  font-size: 13px;\r
  line-height: 1.5;\r
  cursor: pointer;\r
}\r
\r
.direction-hero .dh-primary:hover {\r
  text-decoration: underline;\r
  text-underline-offset: 4px;\r
}\r
\r
.direction-hero .dh-primary:focus-visible {\r
  outline: 3px solid var(--dh-accent);\r
  outline-offset: 5px;\r
}\r
\r
/* Direction selector */\r
\r
.dh-directions {\r
  min-width: 0;\r
  margin: 28px 0 0;\r
  padding: 0;\r
  border: 0;\r
}\r
\r
.dh-directions legend {\r
  margin-bottom: 10px;\r
  color: #b5c4b4;\r
  font-size: 11px;\r
}\r
\r
.dh-direction-options {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 8px;\r
}\r
\r
.dh-direction-options label {\r
  position: relative;\r
  cursor: pointer;\r
}\r
\r
.dh-direction-options input {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  margin: 0;\r
  opacity: 0;\r
}\r
\r
.dh-direction-options label > span {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
\r
  min-height: 44px;\r
  padding: 10px 13px;\r
\r
  border: 1px solid #53634f;\r
  border-radius: 7px;\r
\r
  color: #d4dece;\r
  font-size: 11px;\r
}\r
\r
.dh-direction-options input:checked + span {\r
  border-color: var(--dh-accent);\r
  background: #26372b;\r
  color: var(--dh-accent);\r
}\r
\r
.dh-direction-options input:focus-visible + span {\r
  outline: 3px solid var(--dh-accent);\r
  outline-offset: 4px;\r
}\r
\r
/* Original CSS artwork */\r
\r
.dh-artwork {\r
  position: relative;\r
  min-width: 0;\r
  height: 350px;\r
}\r
\r
.dh-art-grid {\r
  position: absolute;\r
  inset: 12px 0;\r
\r
  border: 1px solid #39463e;\r
  border-radius: 10px;\r
\r
  background-image:\r
    linear-gradient(#ffffff08 1px, transparent 1px),\r
    linear-gradient(90deg, #ffffff08 1px, transparent 1px);\r
  background-size: 22px 22px;\r
}\r
\r
.dh-art-panel {\r
  position: absolute;\r
  width: 76%;\r
  height: 225px;\r
  padding: 22px;\r
  border-radius: 12px;\r
}\r
\r
.dh-art-panel-back {\r
  top: 35px;\r
  left: 4%;\r
\r
  display: grid;\r
  align-content: center;\r
  gap: 12px;\r
\r
  transform: rotate(-9deg);\r
\r
  border: 1px solid #63785e;\r
  background: #293d2d;\r
}\r
\r
.dh-art-panel-back > span {\r
  height: 12px;\r
  border-radius: 4px;\r
  background: #597252;\r
}\r
\r
.dh-art-panel-back > span:nth-child(2) {\r
  width: 75%;\r
}\r
\r
.dh-art-panel-back > span:nth-child(3) {\r
  width: 50%;\r
}\r
\r
.dh-art-panel-front {\r
  top: 65px;\r
  right: 2%;\r
\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: space-between;\r
\r
  transform: rotate(5deg);\r
\r
  border: 1px solid var(--dh-accent);\r
  background: #1b2b22;\r
\r
  box-shadow: 0 18px 40px #00000030;\r
}\r
\r
.dh-art-label {\r
  color: #b5c4b4;\r
  font-family: monospace;\r
  font-size: 8px;\r
  letter-spacing: 1px;\r
}\r
\r
.dh-art-orbit {\r
  position: relative;\r
  width: 80px;\r
  height: 65px;\r
}\r
\r
.dh-art-orbit > span {\r
  position: absolute;\r
  width: 60px;\r
  height: 60px;\r
\r
  border: 1px solid var(--dh-accent);\r
  border-radius: 50%;\r
}\r
\r
.dh-art-orbit > span:last-child {\r
  left: 24px;\r
}\r
\r
.dh-art-word {\r
  color: var(--dh-accent);\r
  font-size: clamp(25px, 4cqi, 40px);\r
  line-height: 1.2;\r
  letter-spacing: -1px;\r
}\r
\r
.dh-art-note {\r
  position: absolute;\r
  bottom: 32px;\r
  left: 0;\r
\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
\r
  max-width: 95%;\r
  padding: 12px 16px;\r
\r
  transform: rotate(-3deg);\r
\r
  border: 1px solid #63785e;\r
  border-radius: 8px;\r
  background: #26372b;\r
  color: #d4dece;\r
\r
  font-size: 10px;\r
}\r
\r
.dh-art-note > span {\r
  color: var(--dh-accent);\r
  font-size: 24px;\r
}\r
\r
.dh-art-coordinate {\r
  position: absolute;\r
  right: 10px;\r
  bottom: 0;\r
\r
  color: #b5c4b4;\r
  font-family: monospace;\r
  font-size: 8px;\r
  letter-spacing: 1px;\r
}\r
\r
/* Feedback and footer */\r
\r
.dh-feedback {\r
  min-height: 24px;\r
  margin: 24px 0;\r
  color: var(--dh-accent);\r
  font-size: 12px;\r
  line-height: 1.7;\r
}\r
\r
.dh-bottomline {\r
  padding-top: 18px;\r
  border-top: 1px solid #39463e;\r
\r
  color: #b5c4b4;\r
  font-size: 10px;\r
  line-height: 1.6;\r
}\r
\r
@keyframes dh-reveal {\r
  from {\r
    opacity: 0;\r
    transform: translateY(8px);\r
  }\r
\r
  to {\r
    opacity: 1;\r
    transform: translateY(0);\r
  }\r
}\r
\r
@container direction-hero (max-width: 620px) {\r
  .dh-layout {\r
    grid-template-columns: 1fr;\r
    gap: 22px;\r
    padding-top: 30px;\r
  }\r
\r
  .dh-artwork {\r
    width: 100%;\r
    max-width: 380px;\r
    margin-inline: auto;\r
  }\r
\r
  .direction-hero .dh-copy h3 {\r
    font-size: 38px;\r
  }\r
}\r
\r
@container direction-hero (max-width: 300px) {\r
  .direction-hero .dh-copy h3 {\r
    font-size: 32px;\r
  }\r
\r
  .dh-artwork {\r
    height: 330px;\r
  }\r
\r
  .dh-art-panel {\r
    padding: 16px;\r
  }\r
\r
  .dh-edition {\r
    font-size: 8px;\r
  }\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .dh-copy {\r
    animation: none;\r
  }\r
}`,at=[{title:`Explore`,links:[{label:`Overview`,message:`Overview selected.`},{label:`Selected work`,message:`Selected work chosen.`},{label:`Our approach`,message:`Our approach selected.`}]},{title:`Connect`,links:[{label:`Project enquiries`,message:`Project enquiries selected.`},{label:`Collaborations`,message:`Collaborations selected.`},{label:`Studio notes`,message:`Studio notes selected.`}]}];function ot(){let[e,t]=(0,_.useState)(``),[n,r]=(0,_.useState)(!1),i=(0,_.useRef)(null),a=(0,_.useId)(),o=`hello@example.com`;(0,_.useEffect)(()=>()=>window.clearTimeout(i.current),[]);function s(e){window.clearTimeout(i.current),t(e),i.current=window.setTimeout(()=>{t(``)},4e3)}async function c(){try{await navigator.clipboard.writeText(o),r(!1),s(`Sample email address copied.`)}catch{r(!0),s(`Automatic copy is unavailable. Select the address below.`)}}return(0,b.jsxs)(`section`,{className:`studio-footer-example`,"aria-labelledby":`${a}-title`,children:[(0,b.jsxs)(`div`,{className:`sf-invitation`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`sf-eyebrow`,children:`THE NEXT CONVERSATION`}),(0,b.jsxs)(`h3`,{id:`${a}-title`,children:[`Something in mind?`,(0,b.jsx)(`br`,{}),`Let’s give it a starting point.`]})]}),(0,b.jsxs)(`button`,{type:`button`,className:`sf-contact-button`,onClick:c,children:[`Copy sample email`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]}),(0,b.jsxs)(`div`,{className:`sf-main`,children:[(0,b.jsxs)(`div`,{className:`sf-identity`,children:[(0,b.jsxs)(`span`,{className:`sf-brand`,children:[(0,b.jsx)(`span`,{className:`sf-brand-mark`,"aria-hidden":`true`,children:`+`}),`Field & Form`]}),(0,b.jsx)(`p`,{children:`A fictional creative practice exploring clear messages, useful interfaces, and thoughtful details.`}),(0,b.jsx)(`span`,{className:`sf-location`,children:`Ideas can start anywhere.`})]}),at.map(e=>(0,b.jsxs)(`nav`,{className:`sf-link-group`,"aria-label":`Example footer: ${e.title}`,children:[(0,b.jsx)(`h4`,{children:e.title}),(0,b.jsx)(`ul`,{children:e.links.map(e=>(0,b.jsx)(`li`,{children:(0,b.jsxs)(`button`,{type:`button`,onClick:()=>s(`${e.message} Demonstration only.`),children:[e.label,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})},e.label))})]},e.title))]}),(0,b.jsxs)(`div`,{className:`sf-feedback-area`,children:[(0,b.jsx)(`p`,{className:`sf-feedback`,role:`status`,children:e}),n&&(0,b.jsxs)(`label`,{className:`sf-copy-fallback`,children:[(0,b.jsx)(`span`,{children:`Sample contact address`}),(0,b.jsx)(`input`,{type:`text`,readOnly:!0,value:o,onFocus:e=>e.currentTarget.select()})]})]}),(0,b.jsxs)(`div`,{className:`sf-bottom`,children:[(0,b.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` Field & Form — fictional studio`]}),(0,b.jsx)(`span`,{className:`sf-bottom-note`,children:`Clear words. Considered details.`})]}),(0,b.jsx)(`p`,{className:`sf-demo-note`,children:`Demonstration footer. Navigation controls show local feedback. Replace them with real links when adapting this section.`})]})}var st=`import { useEffect, useId, useRef, useState } from "react";\r
import "./StudioFooter.css";\r
\r
const groups = [\r
  {\r
    title: "Explore",\r
    links: [\r
      { label: "Overview", message: "Overview selected." },\r
      { label: "Selected work", message: "Selected work chosen." },\r
      { label: "Our approach", message: "Our approach selected." },\r
    ],\r
  },\r
  {\r
    title: "Connect",\r
    links: [\r
      { label: "Project enquiries", message: "Project enquiries selected." },\r
      { label: "Collaborations", message: "Collaborations selected." },\r
      { label: "Studio notes", message: "Studio notes selected." },\r
    ],\r
  },\r
];\r
\r
export default function StudioFooter() {\r
  const [message, setMessage] = useState("");\r
  const [copyFailed, setCopyFailed] = useState(false);\r
\r
  const timerRef = useRef(null);\r
  const id = useId();\r
\r
  // Reserved example domain: this is not a real contact address.\r
  const email = "hello@example.com";\r
\r
  useEffect(() => {\r
    return () => window.clearTimeout(timerRef.current);\r
  }, []);\r
\r
  function showMessage(text) {\r
    window.clearTimeout(timerRef.current);\r
    setMessage(text);\r
\r
    timerRef.current = window.setTimeout(() => {\r
      setMessage("");\r
    }, 4000);\r
  }\r
\r
  async function copyEmail() {\r
    try {\r
      await navigator.clipboard.writeText(email);\r
      setCopyFailed(false);\r
      showMessage("Sample email address copied.");\r
    } catch {\r
      setCopyFailed(true);\r
      showMessage("Automatic copy is unavailable. Select the address below.");\r
    }\r
  }\r
\r
  return (\r
    <section\r
      className="studio-footer-example"\r
      aria-labelledby={\`\${id}-title\`}\r
    >\r
      <div className="sf-invitation">\r
        <div>\r
          <span className="sf-eyebrow">THE NEXT CONVERSATION</span>\r
\r
          <h3 id={\`\${id}-title\`}>\r
            Something in mind?\r
            <br />\r
            Let’s give it a starting point.\r
          </h3>\r
        </div>\r
\r
        <button\r
          type="button"\r
          className="sf-contact-button"\r
          onClick={copyEmail}\r
        >\r
          Copy sample email\r
          <span aria-hidden="true">↗</span>\r
        </button>\r
      </div>\r
\r
      <div className="sf-main">\r
        <div className="sf-identity">\r
          <span className="sf-brand">\r
            <span className="sf-brand-mark" aria-hidden="true">\r
              +\r
            </span>\r
            Field & Form\r
          </span>\r
\r
          <p>\r
            A fictional creative practice exploring clear messages,\r
            useful interfaces, and thoughtful details.\r
          </p>\r
\r
          <span className="sf-location">Ideas can start anywhere.</span>\r
        </div>\r
\r
        {groups.map((group) => (\r
          <nav\r
            key={group.title}\r
            className="sf-link-group"\r
            aria-label={\`Example footer: \${group.title}\`}\r
          >\r
            <h4>{group.title}</h4>\r
\r
            <ul>\r
              {group.links.map((link) => (\r
                <li key={link.label}>\r
                  <button\r
                    type="button"\r
                    onClick={() =>\r
                      showMessage(\`\${link.message} Demonstration only.\`)\r
                    }\r
                  >\r
                    {link.label}\r
                    <span aria-hidden="true">↗</span>\r
                  </button>\r
                </li>\r
              ))}\r
            </ul>\r
          </nav>\r
        ))}\r
      </div>\r
\r
      <div className="sf-feedback-area">\r
        <p className="sf-feedback" role="status">\r
          {message}\r
        </p>\r
\r
        {copyFailed && (\r
          <label className="sf-copy-fallback">\r
            <span>Sample contact address</span>\r
\r
            <input\r
              type="text"\r
              readOnly\r
              value={email}\r
              onFocus={(event) => event.currentTarget.select()}\r
            />\r
          </label>\r
        )}\r
      </div>\r
\r
      <div className="sf-bottom">\r
        <span>© {new Date().getFullYear()} Field & Form — fictional studio</span>\r
\r
        <span className="sf-bottom-note">\r
          Clear words. Considered details.\r
        </span>\r
      </div>\r
\r
      <p className="sf-demo-note">\r
        Demonstration footer. Navigation controls show local feedback.\r
        Replace them with real links when adapting this section.\r
      </p>\r
    </section>\r
  );\r
}`,ct=`/* -------------------------------------------------------\r
   Scoped studio-footer example\r
------------------------------------------------------- */\r
\r
.studio-footer-example {\r
  container-name: studio-footer;\r
  container-type: inline-size;\r
\r
  width: 100%;\r
  min-width: 0;\r
  padding: 28px;\r
\r
  border: 1px solid #4e4940;\r
  border-radius: 16px;\r
\r
  background: #28251f;\r
  color: #f2ecdf;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: dark;\r
}\r
\r
.studio-footer-example,\r
.studio-footer-example * {\r
  box-sizing: border-box;\r
}\r
\r
.sf-eyebrow {\r
  color: #c5bba7;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.6;\r
  letter-spacing: 1.4px;\r
}\r
\r
/* Invitation */\r
\r
.sf-invitation {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 28px;\r
\r
  padding-bottom: 30px;\r
  border-bottom: 1px solid #4e4940;\r
}\r
\r
.studio-footer-example .sf-invitation h3 {\r
  margin: 14px 0 0;\r
\r
  color: #f2ecdf;\r
  font-size: clamp(26px, 4.5cqi, 42px);\r
  font-weight: 500;\r
  line-height: 1.15;\r
  letter-spacing: -1px;\r
}\r
\r
.studio-footer-example .sf-contact-button {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 20px;\r
  flex-shrink: 0;\r
\r
  min-height: 46px;\r
  padding: 13px 16px;\r
\r
  border: 1px solid #ead3a4;\r
  border-radius: 8px;\r
\r
  background: #ead3a4;\r
  color: #332a1b;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  cursor: pointer;\r
}\r
\r
.studio-footer-example .sf-contact-button:hover {\r
  background: #f3dfb9;\r
}\r
\r
.studio-footer-example button:focus-visible,\r
.studio-footer-example input:focus-visible {\r
  outline: 3px solid #ead3a4;\r
  outline-offset: 4px;\r
}\r
\r
/* Main footer content */\r
\r
.sf-main {\r
  display: grid;\r
  grid-template-columns: 1.4fr 1fr 1fr;\r
  gap: 32px;\r
  padding-top: 30px;\r
}\r
\r
.sf-identity {\r
  min-width: 0;\r
}\r
\r
.sf-brand {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  color: #f2ecdf;\r
  font-size: 17px;\r
  font-weight: 600;\r
  letter-spacing: -0.5px;\r
}\r
\r
.sf-brand-mark {\r
  display: grid;\r
  place-items: center;\r
\r
  width: 30px;\r
  height: 30px;\r
  border: 1px solid #887a60;\r
  border-radius: 7px;\r
\r
  color: #ead3a4;\r
  font-size: 23px;\r
  font-weight: 400;\r
}\r
\r
.sf-identity p {\r
  max-width: 290px;\r
  margin: 16px 0;\r
\r
  color: #c5bba7;\r
  font-size: 12px;\r
  line-height: 1.8;\r
}\r
\r
.sf-location {\r
  color: #c5bba7;\r
  font-family: monospace;\r
  font-size: 9px;\r
}\r
\r
.studio-footer-example .sf-link-group h4 {\r
  margin: 5px 0 14px;\r
\r
  color: #ead3a4;\r
  font-size: 11px;\r
  font-weight: 600;\r
}\r
\r
.sf-link-group ul {\r
  display: grid;\r
  gap: 2px;\r
  margin: 0;\r
  padding: 0;\r
  list-style: none;\r
}\r
\r
.studio-footer-example .sf-link-group button {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 12px;\r
\r
  width: 100%;\r
  min-height: 44px;\r
  padding: 10px 0;\r
\r
  border: 0;\r
  border-radius: 3px;\r
\r
  background: transparent;\r
  color: #d8cfbd;\r
\r
  font: inherit;\r
  font-size: 12px;\r
  text-align: left;\r
  cursor: pointer;\r
}\r
\r
.studio-footer-example .sf-link-group button:hover {\r
  color: #ffffff;\r
  text-decoration: underline;\r
  text-underline-offset: 4px;\r
}\r
\r
.sf-link-group button > span {\r
  color: #b7a889;\r
}\r
\r
/* Feedback and copy fallback */\r
\r
.sf-feedback-area {\r
  padding-top: 12px;\r
}\r
\r
.sf-feedback {\r
  min-height: 24px;\r
  margin: 12px 0;\r
\r
  color: #ead3a4;\r
  font-size: 12px;\r
  line-height: 1.7;\r
}\r
\r
.sf-copy-fallback {\r
  display: grid;\r
  gap: 9px;\r
  max-width: 340px;\r
  margin-bottom: 22px;\r
\r
  color: #c5bba7;\r
  font-size: 11px;\r
}\r
\r
.sf-copy-fallback input {\r
  width: 100%;\r
  min-width: 0;\r
  min-height: 44px;\r
  padding: 10px 12px;\r
\r
  border: 1px solid #887a60;\r
  border-radius: 8px;\r
\r
  background: #201e19;\r
  color: #f2ecdf;\r
\r
  font: inherit;\r
  font-size: 14px;\r
}\r
\r
/* Bottom line */\r
\r
.sf-bottom {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
\r
  padding-top: 20px;\r
  border-top: 1px solid #4e4940;\r
\r
  color: #c5bba7;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
.sf-bottom-note {\r
  font-family: monospace;\r
  font-size: 9px;\r
}\r
\r
.sf-demo-note {\r
  margin: 18px 0 0;\r
  color: #b7ad99;\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
@container studio-footer (max-width: 600px) {\r
  .sf-invitation {\r
    align-items: flex-start;\r
    flex-direction: column;\r
    gap: 22px;\r
  }\r
\r
  .sf-main {\r
    grid-template-columns: repeat(2, minmax(0, 1fr));\r
    gap: 24px;\r
  }\r
\r
  .sf-identity {\r
    grid-column: 1 / -1;\r
  }\r
}\r
\r
@container studio-footer (max-width: 300px) {\r
  .sf-main {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .sf-identity {\r
    grid-column: auto;\r
  }\r
\r
  .studio-footer-example .sf-invitation h3 {\r
    font-size: 28px;\r
  }\r
}`,lt=[{number:`01`,title:`Find the message`,description:`Turn scattered ideas into a clear explanation of what you do and why it matters.`},{number:`02`,title:`Shape the experience`,description:`Organise your content into a page that feels useful, readable, and easy to explore.`},{number:`03`,title:`Make the details count`,description:`Bring words, spacing, and interactions together with a consistent visual direction.`}];function ut(){let[e,t]=(0,_.useState)(!1),[n,r]=(0,_.useState)(``),i=(0,_.useRef)(null),a=(0,_.useRef)(null),o=(0,_.useRef)(null),s=(0,_.useId)();function c(e){t(!1),e.current?.scrollIntoView({behavior:`instant`,block:`start`}),e.current?.focus({preventScroll:!0})}function l(e){e.preventDefault();let t=e.currentTarget,n=new FormData(t),i=String(n.get(`name`)||``).trim(),a=String(n.get(`message`)||``).trim();!i||!a?r(`Enter a name and a message containing visible text.`):(r(`Thank you, ${i}. Your sample enquiry is complete. Nothing was sent.`),t.reset())}return(0,b.jsxs)(`div`,{className:`studio-landing`,children:[(0,b.jsxs)(`header`,{className:`sl-header`,children:[(0,b.jsxs)(`span`,{className:`sl-brand`,children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`}),`Plainlight`]}),(0,b.jsx)(`button`,{ref:o,className:`sl-menu-button`,type:`button`,"aria-expanded":e,"aria-controls":`${s}-navigation`,onClick:()=>t(e=>!e),children:e?`Close menu`:`Menu`}),(0,b.jsxs)(`nav`,{id:`${s}-navigation`,className:`sl-navigation ${e?`sl-navigation-open`:``}`,"aria-label":`Sample landing page`,onKeyDown:n=>{n.key===`Escape`&&e&&(t(!1),o.current?.focus())},children:[(0,b.jsx)(`button`,{type:`button`,onClick:()=>c(i),children:`Our approach`}),(0,b.jsx)(`button`,{type:`button`,onClick:()=>c(a),children:`Start a conversation ↗`})]})]}),(0,b.jsxs)(`section`,{className:`sl-hero`,"aria-labelledby":`${s}-hero-title`,children:[(0,b.jsxs)(`div`,{className:`sl-hero-copy`,children:[(0,b.jsx)(`span`,{className:`sl-eyebrow`,children:`A FICTIONAL COMMUNICATION STUDIO`}),(0,b.jsxs)(`h3`,{id:`${s}-hero-title`,children:[`Good ideas deserve`,(0,b.jsx)(`span`,{children:` a clearer beginning.`})]}),(0,b.jsx)(`p`,{children:`We help small teams turn what they know into messages people can understand and experiences they can use.`}),(0,b.jsxs)(`button`,{type:`button`,className:`sl-primary`,onClick:()=>c(a),children:[`Tell us what you have in mind`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]}),(0,b.jsxs)(`div`,{className:`sl-artwork`,"aria-hidden":`true`,children:[(0,b.jsxs)(`div`,{className:`sl-art-card sl-art-back`,children:[(0,b.jsx)(`span`,{children:`START WITH A QUESTION`}),(0,b.jsx)(`strong`,{children:`What matters?`})]}),(0,b.jsxs)(`div`,{className:`sl-art-card sl-art-front`,children:[(0,b.jsx)(`span`,{children:`BUILD TOWARDS AN ANSWER`}),(0,b.jsxs)(`div`,{className:`sl-art-shapes`,children:[(0,b.jsx)(`i`,{}),(0,b.jsx)(`i`,{}),(0,b.jsx)(`i`,{})]}),(0,b.jsx)(`strong`,{children:`Make it clear.`})]}),(0,b.jsx)(`span`,{className:`sl-art-caption`,children:`MESSAGE → STRUCTURE → EXPERIENCE`})]})]}),(0,b.jsxs)(`section`,{ref:i,tabIndex:-1,className:`sl-section`,"aria-labelledby":`${s}-services-title`,children:[(0,b.jsx)(`span`,{className:`sl-eyebrow`,children:`HOW WE APPROACH THE WORK`}),(0,b.jsx)(`h3`,{id:`${s}-services-title`,children:`One useful step at a time.`}),(0,b.jsx)(`div`,{className:`sl-service-grid`,children:lt.map(e=>(0,b.jsxs)(`article`,{className:`sl-service`,children:[(0,b.jsx)(`span`,{className:`sl-eyebrow`,children:e.number}),(0,b.jsx)(`h4`,{children:e.title}),(0,b.jsx)(`p`,{children:e.description})]},e.number))})]}),(0,b.jsxs)(`section`,{className:`sl-section sl-faq-section`,"aria-labelledby":`${s}-faq-title`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`sl-eyebrow`,children:`A FEW USEFUL ANSWERS`}),(0,b.jsx)(`h3`,{id:`${s}-faq-title`,children:`Before the first conversation.`})]}),(0,b.jsxs)(`div`,{className:`sl-faq`,children:[(0,b.jsxs)(`details`,{children:[(0,b.jsx)(`summary`,{children:`What should I prepare?`}),(0,b.jsx)(`p`,{children:`A short description of your idea, your audience, and what you want the website to help them do.`})]}),(0,b.jsxs)(`details`,{children:[(0,b.jsx)(`summary`,{children:`Can a project start small?`}),(0,b.jsx)(`p`,{children:`This fictional studio’s approach begins with a focused scope, then develops the next useful piece.`})]}),(0,b.jsxs)(`details`,{children:[(0,b.jsx)(`summary`,{children:`Is this a real service website?`}),(0,b.jsx)(`p`,{children:`No. This is an original template demonstration created for the Webcraft Atlas collection.`})]})]})]}),(0,b.jsxs)(`section`,{ref:a,tabIndex:-1,className:`sl-section sl-contact-section`,"aria-labelledby":`${s}-contact-title`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`sl-eyebrow`,children:`YOUR NEXT STARTING POINT`}),(0,b.jsx)(`h3`,{id:`${s}-contact-title`,children:`Let’s put the idea into words.`}),(0,b.jsx)(`p`,{className:`sl-contact-note`,children:`Use fictional details to try the form. No enquiry will be sent.`})]}),(0,b.jsxs)(`form`,{className:`sl-form`,onSubmit:l,children:[(0,b.jsxs)(`label`,{children:[`Your name`,(0,b.jsx)(`input`,{name:`name`,type:`text`,required:!0,maxLength:80,autoComplete:`name`,onChange:()=>r(``)})]}),(0,b.jsxs)(`label`,{children:[`What would you like to make?`,(0,b.jsx)(`textarea`,{name:`message`,required:!0,minLength:10,maxLength:500,rows:4,onChange:()=>r(``)})]}),(0,b.jsxs)(`button`,{type:`submit`,className:`sl-primary`,children:[`Try the enquiry`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(`p`,{className:`sl-confirmation`,role:`status`,children:n})]})]}),(0,b.jsxs)(`footer`,{className:`sl-footer`,children:[(0,b.jsx)(`span`,{className:`sl-brand`,children:`Plainlight`}),(0,b.jsx)(`span`,{children:`Original fictional template · No connected services`})]})]})}var D=[{id:`progress-button`,name:`Progress button`,category:`Buttons`,description:`A tactile action with a small, useful response.`,Component:ye,files:{"ProgressButton.jsx":be,"ProgressButton.css":xe},usage:`<ProgressButton />`,guidance:`Use a clear action label and announce feedback when an action completes. This example counts clicks locally; it does not submit or save data. Its hover movement respects reduced-motion preferences.`},{id:`discovery-card`,name:`Discovery card`,category:`Cards`,description:`A pointer-following light on a quiet surface.`,Component:Se,files:{"DiscoveryCard.jsx":Ce,"DiscoveryCard.css":we},usage:`<DiscoveryCard />`,guidance:`The light is decorative. Essential content stays visible without hovering. Touch interaction does not move the glow, and reduced-motion preferences replace the effect with a static background.`},{id:`clear-accordion`,name:`Clear accordion`,category:`Content`,description:`Simple answers, opened at your own pace.`,Component:Ee,files:{"ClearAccordion.jsx":w,"ClearAccordion.css":T},usage:`<ClearAccordion />`,guidance:`Use optional disclosure for supporting explanations. Native details and summary elements provide keyboard interaction without extra JavaScript. This version allows multiple answers to remain open.`},{id:`workshop-navigation`,name:`Workshop navigation`,category:`Navigation`,description:`A compact studio menu that responds to its available space.`,Component:Oe,files:{"WorkshopNavigation.jsx":ke,"WorkshopNavigation.css":Ae},usage:`<WorkshopNavigation />`,guidance:`This demonstration uses buttons to switch preview content. For real page navigation, replace those controls with links to your destinations. The mobile menu uses a labelled toggle, supports Escape, and responds to its container width.`},{id:`project-dialog`,name:`Project dialog`,category:`Overlays`,description:`A focused space for one small decision.`,Component:je,files:{"ProjectDialog.jsx":E,"ProjectDialog.css":Me},usage:`<ProjectDialog />`,guidance:`Use a modal when a task needs temporary focus. This example uses the native dialog element to contain keyboard focus and make the background inactive. Escape, Cancel, the close button, and backdrop clicks dismiss it. Closing restores focus to the launch button. Form submission only changes the preview; no data is transmitted or saved.`},{id:`idea-bento`,name:`Idea bento`,category:`Layouts`,description:`A responsive feature grid with room to explore.`,Component:Pe,scrollPreview:!0,files:{"IdeaBento.jsx":Fe,"IdeaBento.css":Ie},usage:`<IdeaBento />`,guidance:`Use a bento layout when related information benefits from different visual weights. This example keeps the reading order consistent while adapting to its container. The layout toggle changes card proportions, and native checkboxes update a labelled progress indicator. Checklist changes are local to the mounted example.`},{id:`contact-form`,name:`Clear contact form`,category:`Forms`,description:`Helpful validation with a clear path to correction.`,Component:ze,scrollPreview:!0,files:{"ContactForm.jsx":Be,"ContactForm.css":Ve},usage:`<ContactForm />`,guidance:`Keep labels visible and explain errors beside the relevant fields. This demonstration focuses the first invalid field and provides an error summary. Email validation checks a basic format, not whether an address exists. A real submission requires a backend, server-side validation, and delivery handling.`},{id:`toast-workshop`,name:`Toast workshop`,category:`Feedback`,description:`Small notifications with dismissal and an undo action.`,Component:Ue,scrollPreview:!0,files:{"ToastWorkshop.jsx":We,"ToastWorkshop.css":Ge},usage:`<ToastWorkshop />`,guidance:`Use toasts for brief, noncritical feedback. This example announces new messages without moving focus. Automatic dismissal is optional, pauses during hover or focus, and never applies to the undo notification. Important information and essential actions should also remain available in the main interface.`},{id:`plan-selector`,name:`Clear plan selector`,category:`Pricing`,description:`Compare fictional plans with transparent billing totals.`,Component:Je,scrollPreview:!0,files:{"PlanSelector.jsx":Ye,"PlanSelector.css":Xe},usage:`<PlanSelector />`,guidance:`Show the actual billing amount beside each price. This example uses native radio controls for billing periods and pressed buttons for plan selection. Yearly savings compare the annual total against twelve monthly payments. Plans and prices are fictional, and selecting a plan does not initiate a purchase.`},{id:`quote-carousel`,name:`Conversation carousel`,category:`Content`,description:`A reader-controlled carousel for short perspectives.`,Component:Qe,scrollPreview:!0,files:{"QuoteCarousel.jsx":$e,"QuoteCarousel.css":et},usage:`<QuoteCarousel />`,guidance:`Keep carousel navigation visible and let readers control the pace. This example has no automatic rotation, renders only the active slide, and announces slide changes without moving keyboard focus. Quotes and identities are fictional demonstration content; replace them with authorised, accurately attributed material in a real project.`},{id:`direction-hero`,name:`Direction hero`,category:`Heroes`,description:`A responsive introduction with three creative directions.`,Component:nt,scrollPreview:!0,files:{"DirectionHero.jsx":rt,"DirectionHero.css":it},usage:`<DirectionHero />`,guidance:`Give a hero one clear message and a purposeful action. This example lets visitors select a direction using native radio controls. Its headline transition respects reduced-motion preferences, and its decorative artwork is hidden from assistive technology. The studio identity is fictional sample content; the action updates local feedback only.`},{id:`studio-footer`,name:`Studio footer`,category:`Footers`,description:`A closing section with grouped navigation and a contact action.`,Component:ot,scrollPreview:!0,files:{"StudioFooter.jsx":st,"StudioFooter.css":ct},usage:`<StudioFooter />`,guidance:`Use a footer to provide useful onward routes and clear contact information. This example is wrapped in a section because it is displayed inside a component library. When adapting it as a page footer, use an appropriate footer element and replace demonstration buttons with actual links. The sample email uses the reserved example.com domain.`},{id:`studio-landing`,name:`Plainlight landing page`,category:`Templates`,description:`A complete fictional studio page, from introduction to enquiry.`,scrollPreview:!0,Component:ut,files:{"StudioLanding.jsx":`import { useId, useRef, useState } from "react";\r
import "./StudioLanding.css";\r
\r
const services = [\r
  {\r
    number: "01",\r
    title: "Find the message",\r
    description:\r
      "Turn scattered ideas into a clear explanation of what you do and why it matters.",\r
  },\r
  {\r
    number: "02",\r
    title: "Shape the experience",\r
    description:\r
      "Organise your content into a page that feels useful, readable, and easy to explore.",\r
  },\r
  {\r
    number: "03",\r
    title: "Make the details count",\r
    description:\r
      "Bring words, spacing, and interactions together with a consistent visual direction.",\r
  },\r
];\r
\r
export default function StudioLanding() {\r
  const [menuOpen, setMenuOpen] = useState(false);\r
  const [confirmation, setConfirmation] = useState("");\r
\r
  const servicesRef = useRef(null);\r
  const contactRef = useRef(null);\r
  const menuButtonRef = useRef(null);\r
\r
  const id = useId();\r
\r
  function visitSection(ref) {\r
    setMenuOpen(false);\r
\r
    ref.current?.scrollIntoView({\r
      behavior: "instant",\r
      block: "start",\r
    });\r
\r
    ref.current?.focus({ preventScroll: true });\r
  }\r
\r
  function handleSubmit(event) {\r
    event.preventDefault();\r
\r
    const form = event.currentTarget;\r
    const data = new FormData(form);\r
    const name = String(data.get("name") || "").trim();\r
    const message = String(data.get("message") || "").trim();\r
\r
    if (!name || !message) {\r
      setConfirmation("Enter a name and a message containing visible text.");\r
      return;\r
    }\r
\r
    setConfirmation(\r
      \`Thank you, \${name}. Your sample enquiry is complete. Nothing was sent.\`\r
    );\r
\r
    form.reset();\r
  }\r
\r
  return (\r
    <div className="studio-landing">\r
      <header className="sl-header">\r
        <span className="sl-brand">\r
          <span aria-hidden="true">↗</span>\r
          Plainlight\r
        </span>\r
\r
        <button\r
          ref={menuButtonRef}\r
          className="sl-menu-button"\r
          type="button"\r
          aria-expanded={menuOpen}\r
          aria-controls={\`\${id}-navigation\`}\r
          onClick={() => setMenuOpen((current) => !current)}\r
        >\r
          {menuOpen ? "Close menu" : "Menu"}\r
        </button>\r
\r
        <nav\r
          id={\`\${id}-navigation\`}\r
          className={\`sl-navigation \${menuOpen ? "sl-navigation-open" : ""}\`}\r
          aria-label="Sample landing page"\r
          onKeyDown={(event) => {\r
            if (event.key === "Escape" && menuOpen) {\r
              setMenuOpen(false);\r
              menuButtonRef.current?.focus();\r
            }\r
          }}\r
        >\r
          <button\r
            type="button"\r
            onClick={() => visitSection(servicesRef)}\r
          >\r
            Our approach\r
          </button>\r
\r
          <button\r
            type="button"\r
            onClick={() => visitSection(contactRef)}\r
          >\r
            Start a conversation ↗\r
          </button>\r
        </nav>\r
      </header>\r
\r
      <section className="sl-hero" aria-labelledby={\`\${id}-hero-title\`}>\r
        <div className="sl-hero-copy">\r
          <span className="sl-eyebrow">A FICTIONAL COMMUNICATION STUDIO</span>\r
\r
          <h3 id={\`\${id}-hero-title\`}>\r
            Good ideas deserve\r
            <span> a clearer beginning.</span>\r
          </h3>\r
\r
          <p>\r
            We help small teams turn what they know into messages\r
            people can understand and experiences they can use.\r
          </p>\r
\r
          <button\r
            type="button"\r
            className="sl-primary"\r
            onClick={() => visitSection(contactRef)}\r
          >\r
            Tell us what you have in mind\r
            <span aria-hidden="true">↗</span>\r
          </button>\r
        </div>\r
\r
        <div className="sl-artwork" aria-hidden="true">\r
          <div className="sl-art-card sl-art-back">\r
            <span>START WITH A QUESTION</span>\r
            <strong>What matters?</strong>\r
          </div>\r
\r
          <div className="sl-art-card sl-art-front">\r
            <span>BUILD TOWARDS AN ANSWER</span>\r
            <div className="sl-art-shapes">\r
              <i />\r
              <i />\r
              <i />\r
            </div>\r
            <strong>Make it clear.</strong>\r
          </div>\r
\r
          <span className="sl-art-caption">\r
            MESSAGE → STRUCTURE → EXPERIENCE\r
          </span>\r
        </div>\r
      </section>\r
\r
      <section\r
        ref={servicesRef}\r
        tabIndex={-1}\r
        className="sl-section"\r
        aria-labelledby={\`\${id}-services-title\`}\r
      >\r
        <span className="sl-eyebrow">HOW WE APPROACH THE WORK</span>\r
        <h3 id={\`\${id}-services-title\`}>One useful step at a time.</h3>\r
\r
        <div className="sl-service-grid">\r
          {services.map((service) => (\r
            <article key={service.number} className="sl-service">\r
              <span className="sl-eyebrow">{service.number}</span>\r
              <h4>{service.title}</h4>\r
              <p>{service.description}</p>\r
            </article>\r
          ))}\r
        </div>\r
      </section>\r
\r
      <section\r
        className="sl-section sl-faq-section"\r
        aria-labelledby={\`\${id}-faq-title\`}\r
      >\r
        <div>\r
          <span className="sl-eyebrow">A FEW USEFUL ANSWERS</span>\r
          <h3 id={\`\${id}-faq-title\`}>Before the first conversation.</h3>\r
        </div>\r
\r
        <div className="sl-faq">\r
          <details>\r
            <summary>What should I prepare?</summary>\r
            <p>\r
              A short description of your idea, your audience, and\r
              what you want the website to help them do.\r
            </p>\r
          </details>\r
\r
          <details>\r
            <summary>Can a project start small?</summary>\r
            <p>\r
              This fictional studio’s approach begins with a focused\r
              scope, then develops the next useful piece.\r
            </p>\r
          </details>\r
\r
          <details>\r
            <summary>Is this a real service website?</summary>\r
            <p>\r
              No. This is an original template demonstration created\r
              for the Webcraft Atlas collection.\r
            </p>\r
          </details>\r
        </div>\r
      </section>\r
\r
      <section\r
        ref={contactRef}\r
        tabIndex={-1}\r
        className="sl-section sl-contact-section"\r
        aria-labelledby={\`\${id}-contact-title\`}\r
      >\r
        <div>\r
          <span className="sl-eyebrow">YOUR NEXT STARTING POINT</span>\r
          <h3 id={\`\${id}-contact-title\`}>Let’s put the idea into words.</h3>\r
          <p className="sl-contact-note">\r
            Use fictional details to try the form. No enquiry will be sent.\r
          </p>\r
        </div>\r
\r
        <form className="sl-form" onSubmit={handleSubmit}>\r
          <label>\r
            Your name\r
            <input\r
              name="name"\r
              type="text"\r
              required\r
              maxLength={80}\r
              autoComplete="name"\r
              onChange={() => setConfirmation("")}\r
            />\r
          </label>\r
\r
          <label>\r
            What would you like to make?\r
            <textarea\r
              name="message"\r
              required\r
              minLength={10}\r
              maxLength={500}\r
              rows={4}\r
              onChange={() => setConfirmation("")}\r
            />\r
          </label>\r
\r
          <button type="submit" className="sl-primary">\r
            Try the enquiry\r
            <span aria-hidden="true">↗</span>\r
          </button>\r
\r
          <p className="sl-confirmation" role="status">\r
            {confirmation}\r
          </p>\r
        </form>\r
      </section>\r
\r
      <footer className="sl-footer">\r
        <span className="sl-brand">Plainlight</span>\r
        <span>Original fictional template · No connected services</span>\r
      </footer>\r
    </div>\r
  );\r
}\r
`,"StudioLanding.css":`/* Complete landing-page template with scoped styles. */\r
\r
.studio-landing {\r
  container-name: studio-landing;\r
  container-type: inline-size;\r
\r
  width: 100%;\r
  min-width: 0;\r
  overflow: hidden;\r
\r
  border: 1px solid #d8d1c2;\r
  border-radius: 14px;\r
\r
  background: #f7f4eb;\r
  color: #28382e;\r
\r
  font-family: Arial, Helvetica, sans-serif;\r
  color-scheme: light;\r
}\r
\r
.studio-landing,\r
.studio-landing * {\r
  box-sizing: border-box;\r
}\r
\r
.studio-landing button,\r
.studio-landing input,\r
.studio-landing textarea {\r
  font: inherit;\r
}\r
\r
.studio-landing button {\r
  min-height: 44px;\r
  border-radius: 8px;\r
  cursor: pointer;\r
}\r
\r
.studio-landing button:focus-visible,\r
.studio-landing input:focus-visible,\r
.studio-landing textarea:focus-visible,\r
.studio-landing summary:focus-visible {\r
  outline: 3px solid #496c45;\r
  outline-offset: 4px;\r
}\r
\r
.sl-section:focus {\r
  outline: none;\r
}\r
\r
/* Navigation */\r
\r
.sl-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 18px;\r
\r
  padding: 20px 28px;\r
  border-bottom: 1px solid #d8d1c2;\r
}\r
\r
.sl-brand {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 10px;\r
\r
  font-size: 20px;\r
  font-weight: 600;\r
  letter-spacing: -0.7px;\r
}\r
\r
.sl-brand > span {\r
  color: #587246;\r
}\r
\r
.sl-navigation {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
}\r
\r
.studio-landing .sl-navigation button {\r
  padding: 10px 12px;\r
  border: 1px solid transparent;\r
  background: transparent;\r
  color: #3b513e;\r
  font-size: 12px;\r
}\r
\r
.studio-landing .sl-navigation button:hover {\r
  border-color: #a9b49b;\r
}\r
\r
.studio-landing .sl-menu-button {\r
  display: none;\r
  padding: 10px 12px;\r
  border: 1px solid #a9b49b;\r
  background: transparent;\r
  color: #28382e;\r
  font-size: 12px;\r
}\r
\r
/* Hero */\r
\r
.sl-hero {\r
  display: grid;\r
  grid-template-columns: 1.1fr 1fr;\r
  align-items: center;\r
  gap: 32px;\r
  padding: 58px 34px;\r
}\r
\r
.sl-hero-copy {\r
  min-width: 0;\r
}\r
\r
.sl-eyebrow {\r
  color: #5b6b53;\r
  font-family: monospace;\r
  font-size: 9px;\r
  line-height: 1.7;\r
  letter-spacing: 1.2px;\r
}\r
\r
.studio-landing .sl-hero h3 {\r
  margin: 20px 0;\r
  color: #28382e;\r
  font-size: clamp(34px, 5.8cqi, 64px);\r
  font-weight: 500;\r
  line-height: 1.05;\r
  letter-spacing: -1.8px;\r
}\r
\r
.sl-hero h3 > span {\r
  color: #687d4e;\r
}\r
\r
.sl-hero-copy > p,\r
.sl-service p,\r
.sl-faq p,\r
.sl-contact-note {\r
  color: #5b6655;\r
  font-size: 14px;\r
  line-height: 1.8;\r
}\r
\r
.studio-landing .sl-primary {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 18px;\r
\r
  max-width: 100%;\r
  padding: 13px 17px;\r
\r
  border: 1px solid #324b35;\r
  background: #324b35;\r
  color: #ffffff;\r
\r
  font-size: 12px;\r
  line-height: 1.6;\r
}\r
\r
.studio-landing .sl-primary:hover {\r
  background: #456147;\r
}\r
\r
.sl-hero .sl-primary {\r
  margin-top: 14px;\r
}\r
\r
/* Decorative artwork */\r
\r
.sl-artwork {\r
  position: relative;\r
  height: 330px;\r
}\r
\r
.sl-art-card {\r
  position: absolute;\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: space-between;\r
\r
  width: 78%;\r
  height: 230px;\r
  padding: 24px;\r
\r
  border: 1px solid #b1bba2;\r
  border-radius: 12px;\r
}\r
\r
.sl-art-card > span {\r
  font-family: monospace;\r
  font-size: 8px;\r
  letter-spacing: 1px;\r
}\r
\r
.sl-art-card strong {\r
  font-size: 24px;\r
  font-weight: 500;\r
  letter-spacing: -0.7px;\r
}\r
\r
.sl-art-back {\r
  top: 20px;\r
  left: 0;\r
  transform: rotate(-8deg);\r
  background: #dbe3c9;\r
  color: #394c31;\r
}\r
\r
.sl-art-front {\r
  top: 70px;\r
  right: 0;\r
  transform: rotate(5deg);\r
  background: #f0d9b7;\r
  color: #56422a;\r
}\r
\r
.sl-art-shapes {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
\r
.sl-art-shapes i {\r
  width: 36px;\r
  height: 36px;\r
  border: 1px solid #8d7655;\r
}\r
\r
.sl-art-shapes i:first-child {\r
  border-radius: 50%;\r
}\r
\r
.sl-art-shapes i:last-child {\r
  transform: rotate(45deg);\r
}\r
\r
.sl-art-caption {\r
  position: absolute;\r
  right: 0;\r
  bottom: 0;\r
\r
  color: #5b6b53;\r
  font-family: monospace;\r
  font-size: 8px;\r
  letter-spacing: 1px;\r
}\r
\r
/* Page sections */\r
\r
.sl-section {\r
  padding: 38px 34px;\r
  border-top: 1px solid #d8d1c2;\r
  scroll-margin-top: 20px;\r
}\r
\r
.studio-landing .sl-section h3 {\r
  margin: 12px 0 26px;\r
  color: #28382e;\r
  font-size: 30px;\r
  font-weight: 500;\r
  line-height: 1.2;\r
  letter-spacing: -0.8px;\r
}\r
\r
.sl-service-grid {\r
  display: grid;\r
  grid-template-columns: repeat(3, minmax(0, 1fr));\r
  gap: 22px;\r
}\r
\r
.sl-service {\r
  min-width: 0;\r
  padding-top: 18px;\r
  border-top: 1px solid #bfc7b3;\r
}\r
\r
.studio-landing .sl-service h4 {\r
  margin: 18px 0 12px;\r
  color: #28382e;\r
  font-size: 20px;\r
  font-weight: 500;\r
  line-height: 1.3;\r
}\r
\r
.sl-service p {\r
  margin-bottom: 0;\r
  font-size: 13px;\r
}\r
\r
.sl-faq-section,\r
.sl-contact-section {\r
  display: grid;\r
  grid-template-columns: 1fr 1.2fr;\r
  gap: 32px;\r
}\r
\r
.sl-faq details {\r
  border-bottom: 1px solid #c9cebf;\r
}\r
\r
.sl-faq summary {\r
  min-height: 48px;\r
  padding: 16px 4px;\r
  color: #354a36;\r
  font-size: 13px;\r
  cursor: pointer;\r
}\r
\r
.sl-faq p {\r
  margin: 0 0 20px;\r
  font-size: 12px;\r
}\r
\r
/* Contact form */\r
\r
.sl-form {\r
  display: grid;\r
  align-content: start;\r
  gap: 18px;\r
}\r
\r
.sl-form label {\r
  display: grid;\r
  gap: 10px;\r
  color: #354a36;\r
  font-size: 12px;\r
}\r
\r
.sl-form input,\r
.sl-form textarea {\r
  width: 100%;\r
  min-width: 0;\r
  min-height: 46px;\r
  padding: 12px;\r
\r
  border: 1px solid #a9b49b;\r
  border-radius: 8px;\r
  background: #fffdf6;\r
  color: #28382e;\r
\r
  font-size: 16px;\r
  line-height: 1.5;\r
}\r
\r
.sl-form textarea {\r
  resize: vertical;\r
}\r
\r
.sl-form .sl-primary {\r
  justify-self: start;\r
}\r
\r
.sl-confirmation {\r
  min-height: 24px;\r
  margin: 0;\r
  color: #365e36;\r
  font-size: 12px;\r
  line-height: 1.8;\r
}\r
\r
/* Footer */\r
\r
.sl-footer {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  flex-wrap: wrap;\r
  gap: 18px;\r
\r
  padding: 24px 34px;\r
  border-top: 1px solid #d8d1c2;\r
\r
  background: #e9eddf;\r
  color: #40543b;\r
}\r
\r
.sl-footer > span:last-child {\r
  font-size: 10px;\r
  line-height: 1.7;\r
}\r
\r
/* Adapt to preview containers as well as full pages. */\r
\r
@container studio-landing (max-width: 650px) {\r
  .sl-header {\r
    padding: 18px 22px;\r
  }\r
\r
  .studio-landing .sl-menu-button {\r
    display: block;\r
  }\r
\r
  .sl-navigation {\r
    display: none;\r
    width: 100%;\r
  }\r
\r
  .sl-navigation-open {\r
    display: flex;\r
  }\r
\r
  .sl-hero,\r
  .sl-faq-section,\r
  .sl-contact-section {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .sl-hero {\r
    padding: 36px 24px;\r
  }\r
\r
  .sl-artwork {\r
    width: 100%;\r
    max-width: 360px;\r
    margin-inline: auto;\r
  }\r
\r
  .sl-section {\r
    padding: 30px 24px;\r
  }\r
\r
  .sl-service-grid {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .sl-footer {\r
    padding-inline: 24px;\r
  }\r
}\r
`},usage:`<StudioLanding />`,guidance:`This complete page demonstration uses scoped styles and container-based layouts. Navigation buttons scroll to sections and move focus to them. The form uses browser validation and local confirmation; it does not send enquiries. Replace fictional branding and content before adapting it to a real project.`},{id:`perspective-card`,name:`Perspective card`,category:`Cards`,description:`A decorative 3D tilt with a readable static alternative.`,scrollPreview:!0,Component:ge,files:{"PerspectiveCard.jsx":_e,"PerspectiveCard.css":ve},usage:`<PerspectiveCard />`,guidance:`Use perspective effects sparingly to support visual emphasis. This card keeps all content visible without movement, provides an effect toggle, and respects reduced-motion preferences. Pointer tilt is decorative and does not perform an action. Touch interaction keeps the card still.`},{id:`project-tabs`,name:`Project tabs`,category:`Content`,description:`Three related panels with predictable keyboard navigation.`,scrollPreview:!0,Component:pe,files:{"ProjectTabs.jsx":me,"ProjectTabs.css":he},usage:`<ProjectTabs />`,guidance:`Use tabs for related content that benefits from sharing one space. This example activates panels immediately because their content is already local. Left and Right Arrow move between tabs; Home and End select the first and last. Tab moves from the selected tab into its panel. For panels that require slow network loading, consider activation only after Enter or Space.`},{id:`project-table`,name:`Project table`,category:`Data`,description:`Search fictional projects and sort their progress.`,scrollPreview:!0,Component:le,files:{"ProjectTable.jsx":ue,"ProjectTable.css":de},usage:`<ProjectTable />`,guidance:`Use native table elements for structured comparisons. This example labels row and column headings, exposes the active sorting direction through aria-sort, and provides a keyboard-focusable horizontal scroll area. Text columns sort alphabetically; progress sorts numerically. All project records are fictional and remain local.`},{id:`loading-states`,name:`Loading states`,category:`Feedback`,description:`Clear waiting, cancellation, success, and retry feedback.`,scrollPreview:!0,Component:ie,files:{"LoadingStates.jsx":ae,"LoadingStates.css":oe},usage:`<LoadingStates />`,guidance:`Explain what is happening while an action runs and prevent duplicate requests. This example simulates a short task, supports cancellation, and announces its result outside the busy region. The spinner respects reduced-motion preferences. A real network operation needs request cancellation and error handling appropriate to its API.`},{id:`dashboard-sidebar`,name:`Dashboard sidebar`,category:`Navigation`,description:`A collapsible workspace menu with local page previews.`,scrollPreview:!0,Component:ne,files:{"DashboardSidebar.jsx":S,"DashboardSidebar.css":re},usage:`<DashboardSidebar />`,guidance:`Keep navigation labels available to assistive technology when collapsing a sidebar. This example uses pressed buttons to switch local content and preserves their accessible names in compact mode. For navigation between separate routes, use links and mark the current destination with aria-current.`}],dt=`webcraft-recent-examples`,ft=`webcraft:recent-updated`,pt=[],mt=!0;function ht(e){if(!Array.isArray(e))return[];let t=new Set(D.map(e=>e.id));return[...new Set(e)].filter(e=>typeof e==`string`&&t.has(e)).slice(0,6)}function gt(){if(mt)try{let e=localStorage.getItem(dt);pt=e?ht(JSON.parse(e)):[]}catch{mt=!1}return[...pt]}function _t(e){if(pt=ht(e),mt)try{localStorage.setItem(dt,JSON.stringify(pt))}catch{mt=!1}window.dispatchEvent(new Event(ft))}function vt(e){if(!D.some(t=>t.id===e))return;let t=gt();t[0]!==e&&_t([e,...t.filter(t=>t!==e)])}function yt(){let[e,t]=(0,_.useState)(gt);(0,_.useEffect)(()=>{function e(){t(gt())}function n(t){(t.key===dt||t.key===null)&&e()}return window.addEventListener(ft,e),window.addEventListener(`storage`,n),e(),()=>{window.removeEventListener(ft,e),window.removeEventListener(`storage`,n)}},[]);let n=e.map(e=>D.find(t=>t.id===e)).filter(Boolean);return n.length===0?null:(0,b.jsxs)(`section`,{className:`container recent-examples`,"aria-label":`Recently viewed examples`,children:[(0,b.jsxs)(`div`,{className:`recent-examples-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`PICK UP THE THREAD`}),(0,b.jsx)(`h2`,{children:`Back for another look?`})]}),(0,b.jsx)(`button`,{type:`button`,onClick:()=>_t([]),children:`Clear recent history`})]}),(0,b.jsx)(`div`,{className:`recent-examples-grid`,children:n.map(e=>(0,b.jsxs)(`a`,{className:`recent-example-link`,href:`#/components/${e.id}`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:e.category}),(0,b.jsxs)(`strong`,{children:[e.name,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]},e.id))}),(0,b.jsx)(`p`,{className:`recent-examples-note`,children:`Recent views are kept in this browser. Clearing them does not remove your saved favourites.`})]})}var bt=class extends _.Component{constructor(e){super(e),this.state={hasError:!1,attempt:0}}static getDerivedStateFromError(){return{hasError:!0}}retry=()=>{this.setState(e=>({hasError:!1,attempt:e.attempt+1}))};render(){return this.state.hasError?(0,b.jsxs)(`div`,{className:`preview-error`,role:`alert`,children:[(0,b.jsx)(`span`,{className:`preview-error-symbol`,"aria-hidden":`true`,children:`!`}),(0,b.jsx)(`strong`,{children:`This example could not be displayed.`}),(0,b.jsxs)(`p`,{children:[`Try restarting `,this.props.name||`the preview`,`. Other parts of the library are still available.`]}),(0,b.jsx)(`button`,{type:`button`,onClick:this.retry,children:`Restart preview`})]}):(0,b.jsx)(_.Fragment,{children:this.props.children},this.state.attempt)}};function xt({name:e,children:t}){let[n,r]=(0,_.useState)(`fluid`),[i,a]=(0,_.useState)(768),[o,s]=(0,_.useState)(`grid`),[c,l]=(0,_.useState)(0),[u,d]=(0,_.useState)(!1),[f,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(``),g=(0,_.useRef)(null);(0,_.useEffect)(()=>{p(!!(document.fullscreenEnabled&&g.current?.requestFullscreen));function e(){d(document.fullscreenElement===g.current)}return document.addEventListener(`fullscreenchange`,e),()=>{document.removeEventListener(`fullscreenchange`,e)}},[]);let v=n===`fluid`?`100%`:n===`custom`?`${i}px`:`${n}px`;async function y(){h(``);try{document.fullscreenElement===g.current?await document.exitFullscreen():await g.current?.requestFullscreen()}catch{h(`Fullscreen is unavailable here. You can still use the width controls.`)}}return(0,b.jsxs)(`div`,{ref:g,className:`preview-workspace`,role:`region`,"aria-label":`${e} preview workspace`,children:[(0,b.jsxs)(`div`,{className:`workspace-controls`,children:[(0,b.jsxs)(`label`,{children:[`Container width`,(0,b.jsxs)(`select`,{value:n,onChange:e=>r(e.target.value),children:[(0,b.jsx)(`option`,{value:`fluid`,children:`Fluid`}),(0,b.jsx)(`option`,{value:`375`,children:`Phone · 375px`}),(0,b.jsx)(`option`,{value:`768`,children:`Tablet · 768px`}),(0,b.jsx)(`option`,{value:`1024`,children:`Desktop · 1024px`}),(0,b.jsx)(`option`,{value:`custom`,children:`Custom`})]})]}),(0,b.jsxs)(`label`,{children:[`Canvas`,(0,b.jsxs)(`select`,{value:o,onChange:e=>s(e.target.value),children:[(0,b.jsx)(`option`,{value:`grid`,children:`Grid`}),(0,b.jsx)(`option`,{value:`light`,children:`Light`}),(0,b.jsx)(`option`,{value:`dark`,children:`Dark`})]})]}),(0,b.jsxs)(`div`,{className:`workspace-actions`,children:[(0,b.jsx)(`button`,{type:`button`,onClick:()=>l(e=>e+1),children:`Restart`}),(0,b.jsx)(`button`,{type:`button`,disabled:!f,onClick:y,"aria-label":u?`Exit fullscreen preview`:`Open fullscreen preview`,children:u?`Exit fullscreen`:`Fullscreen`})]})]}),n===`custom`&&(0,b.jsxs)(`label`,{className:`workspace-width-slider`,children:[(0,b.jsx)(`span`,{children:`Custom container width`}),(0,b.jsx)(`input`,{type:`range`,min:`280`,max:`1440`,step:`1`,value:i,onChange:e=>a(Number(e.target.value))}),(0,b.jsxs)(`output`,{children:[i,`px`]})]}),(0,b.jsx)(`div`,{className:`workspace-stage detail-stage-${o}`,children:(0,b.jsx)(`div`,{className:`detail-example-container`,style:{width:v},children:(0,b.jsx)(bt,{name:e,children:t},c)})}),(0,b.jsxs)(`div`,{className:`workspace-footer`,children:[(0,b.jsxs)(`p`,{children:[n===`fluid`?`Fluid container`:`Requested width: ${v}`,`. Width is capped by the available space.`]}),(0,b.jsx)(`p`,{children:u?`Press Escape to leave fullscreen.`:`These controls resize a container, not a separate browser viewport.`})]}),(0,b.jsx)(`p`,{className:`workspace-message`,role:`status`,children:m})]})}function St({path:e}){let[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),a=(0,_.useRef)(null),o=(0,_.useRef)(null);(0,_.useEffect)(()=>()=>window.clearTimeout(a.current),[]),(0,_.useEffect)(()=>{r&&(o.current?.focus(),o.current?.select())},[r]);async function s(){window.clearTimeout(a.current);let t=new URL(window.location.href);t.hash=e;try{await navigator.clipboard.writeText(t.href),i(``),n(`Page link copied.`)}catch{i(t.href),n(`Select and copy the link below.`)}a.current=window.setTimeout(()=>{n(``)},4e3)}return(0,b.jsxs)(`div`,{className:`copy-page-link`,children:[(0,b.jsxs)(`button`,{type:`button`,onClick:s,children:[`Copy page link`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(`span`,{className:`copy-page-link-status`,role:`status`,children:t}),r&&(0,b.jsxs)(`label`,{className:`copy-page-link-fallback`,children:[(0,b.jsx)(`span`,{children:`Page address`}),(0,b.jsx)(`input`,{ref:o,type:`text`,readOnly:!0,value:r,onFocus:e=>e.currentTarget.select()})]})]})}function Ct({route:e}){let t=(0,_.useId)(),n=D.find(t=>t.id===e.compareLeft)||D[0],r=D.find(t=>t.id===e.compareRight&&t.id!==n?.id)||D.find(e=>e.id!==n?.id)||n,i=n?.id||``,a=r?.id||``;function o(e,t){return`/compare?${new URLSearchParams({left:e,right:t}).toString()}`}function s(e,t){let n=`#${o(e,t)}`;window.location.hash!==n&&(window.location.hash=n)}function c(e){s(e,e===a?i:a)}function l(e){s(e===i?a:i,e)}function u(){s(a,i)}let d=[{position:`Left`,selectedId:i,onChange:c},{position:`Right`,selectedId:a,onChange:l}];return(0,b.jsxs)(`section`,{className:`container section compare-route material-compare`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`EXPLORE THE DIFFERENCES`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`Two ideas. A closer look.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Compare behaviour, spacing, and responsive layouts. Each preview has independent controls.`}),(0,b.jsx)(St,{path:o(i,a)}),(0,b.jsxs)(`div`,{className:`compare-page-toolbar`,children:[(0,b.jsx)(`p`,{children:`Selecting an example already on the other side swaps the pair.`}),(0,b.jsxs)(`button`,{type:`button`,onClick:u,children:[`Swap examples`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:` ⇄`})]})]}),(0,b.jsx)(`div`,{className:`compare-page-grid`,children:d.map(e=>{let n=D.find(t=>t.id===e.selectedId);if(!n)return null;let r=n.Component,i=`${t}-${e.position.toLowerCase()}`;return(0,b.jsxs)(`section`,{className:`compare-page-column`,"aria-label":`${e.position} comparison example`,children:[(0,b.jsxs)(`div`,{className:`compare-page-selection`,children:[(0,b.jsxs)(`label`,{htmlFor:i,children:[e.position,` example`]}),(0,b.jsx)(`select`,{id:i,value:e.selectedId,onChange:t=>e.onChange(t.target.value),children:D.map(e=>(0,b.jsxs)(`option`,{value:e.id,children:[e.name,` — `,e.category]},e.id))})]}),(0,b.jsxs)(`div`,{className:`compare-page-description`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:n.category}),(0,b.jsx)(`h2`,{children:n.name}),(0,b.jsx)(`p`,{children:n.description}),(0,b.jsx)(`a`,{className:`text-link`,href:`#/components/${n.id}`,children:`Source and documentation →`})]}),(0,b.jsx)(xt,{name:n.name,children:(0,b.jsx)(r,{})},n.id)]},e.position)})})]})}function wt({name:e,children:t}){let[n,r]=(0,_.useState)(!1),i=(0,_.useRef)(null);return(0,_.useEffect)(()=>{if(n)return;if(!(`IntersectionObserver`in window)){r(!0);return}let e=i.current;if(!e)return;let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(r(!0),t.disconnect())},{rootMargin:`180px`,threshold:0});return t.observe(e),()=>t.disconnect()},[n]),n?t:(0,b.jsxs)(`div`,{ref:i,className:`deferred-preview-placeholder`,children:[(0,b.jsxs)(`div`,{className:`deferred-preview-shapes`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsx)(`span`,{children:e}),(0,b.jsx)(`small`,{children:`Preview loads as you approach it.`})]})}var Tt=new TextEncoder,Et=Uint32Array.from({length:256},(e,t)=>{let n=t;for(let e=0;e<8;e+=1)n=n&1?3988292384^n>>>1:n>>>1;return n>>>0});function Dt(e){let t=4294967295;for(let n of e)t=Et[(t^n)&255]^t>>>8;return(t^4294967295)>>>0}function Ot(e){let t=new Uint8Array(e);return{bytes:t,view:new DataView(t.buffer)}}function kt(e,t){let n=Object.entries(e);if(!n.length||n.length>65535)throw Error(`The archive needs between 1 and 65,535 files.`);let r=[],i=[],a=0,o=0;for(let[e,t]of n){if(!e||e===`.`||e===`..`||/[\\/\u0000-\u001f]/.test(e))throw Error(`A source file has an unsupported name.`);let n=Tt.encode(e),s=Tt.encode(t);if(n.length>65535)throw Error(`A source filename is too long.`);let c=Dt(s),l=Ot(30);l.view.setUint32(0,67324752,!0),l.view.setUint16(4,20,!0),l.view.setUint16(6,2048,!0),l.view.setUint16(8,0,!0),l.view.setUint16(12,33,!0),l.view.setUint32(14,c,!0),l.view.setUint32(18,s.length,!0),l.view.setUint32(22,s.length,!0),l.view.setUint16(26,n.length,!0),r.push(l.bytes,n,s);let u=Ot(46);if(u.view.setUint32(0,33639248,!0),u.view.setUint16(4,20,!0),u.view.setUint16(6,20,!0),u.view.setUint16(8,2048,!0),u.view.setUint16(10,0,!0),u.view.setUint16(14,33,!0),u.view.setUint32(16,c,!0),u.view.setUint32(20,s.length,!0),u.view.setUint32(24,s.length,!0),u.view.setUint16(28,n.length,!0),u.view.setUint32(42,a,!0),i.push(u.bytes,n),o+=u.bytes.length+n.length,a+=l.bytes.length+n.length+s.length,a+o>4294967295)throw Error(`This source bundle is too large.`)}let s=Ot(22);s.view.setUint32(0,101010256,!0),s.view.setUint16(8,n.length,!0),s.view.setUint16(10,n.length,!0),s.view.setUint32(12,o,!0),s.view.setUint32(16,a,!0);let c=new Blob([...r,...i,s.bytes],{type:`application/zip`}),l=URL.createObjectURL(c),u=document.createElement(`a`);u.href=l,u.download=t,document.body.appendChild(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(l),1e3)}var At=/(?<comment>\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`)|(?<keyword>\b(?:import|from|export|default|function|return|const|let|var|if|else|try|catch|finally|throw|new|class|extends|static|async|await|typeof|instanceof|true|false|null|undefined)\b)|(?<tag><\/?[A-Za-z][\w.-]*)|(?<number>\b\d+(?:\.\d+)?\b)/g,jt=/(?<comment>\/\*[\s\S]*?\*\/)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<keyword>@[\w-]+)|(?<color>#[\da-fA-F]{3,8}\b)|(?<property>--[\w-]+|[\w-]+(?=\s*:))|(?<number>-?(?:\d*\.)?\d+(?:px|rem|em|vh|vw|dvh|cqi|ms|s|%)?)/g;function Mt(e,t){let n=new RegExp(t===`css`?jt.source:At.source,`g`),r=[],i=0;for(let t of e.matchAll(n)){let n=t.index;n>i&&r.push({start:i,text:e.slice(i,n),type:null});let a=Object.keys(t.groups||{}).find(e=>t.groups[e]!==void 0);r.push({start:n,text:t[0],type:a}),i=n+t[0].length}return i<e.length&&r.push({start:i,text:e.slice(i),type:null}),r}function O({source:e,fileName:t=``}){let n=t.toLowerCase().endsWith(`.css`)?`css`:`jsx`,r=(0,_.useMemo)(()=>Mt(e,n),[e,n]);return(0,b.jsx)(`code`,{className:`source-highlight`,children:r.map(e=>e.type?(0,b.jsx)(`span`,{className:`source-token-${e.type}`,children:e.text},e.start):e.text)})}function Nt({components:e,categories:t,selectedCategory:n,onSelectCategory:r}){let[i,a]=(0,_.useState)(!1),o=(0,_.useId)();function s(e){r(e)}return(0,b.jsxs)(`aside`,{className:`collection-sidebar`,"aria-label":`Collection categories`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`collection-sidebar-toggle`,"aria-expanded":i,"aria-controls":o,onClick:()=>a(e=>!e),children:[(0,b.jsxs)(`span`,{children:[`Categories · `,n]}),(0,b.jsx)(`span`,{"aria-hidden":`true`,children:i?`−`:`+`})]}),(0,b.jsxs)(`div`,{id:o,className:`collection-sidebar-panel ${i?`collection-sidebar-panel-open`:``}`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`EXPLORE BY PURPOSE`}),(0,b.jsx)(`div`,{className:`collection-sidebar-categories`,children:t.map(t=>{let r=t===`All`?e.length:e.filter(e=>e.category===t).length;return(0,b.jsxs)(`button`,{type:`button`,"aria-pressed":n===t,onClick:()=>s(t),children:[(0,b.jsx)(`span`,{children:t===`All`?`All examples`:t}),(0,b.jsx)(`span`,{className:`collection-category-count`,children:r})]},t)})}),(0,b.jsxs)(`div`,{className:`collection-sidebar-note`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:`NEED A STARTING POINT?`}),(0,b.jsx)(`p`,{children:`Explore the guides for practical explanations of layout, purpose, and interaction.`}),(0,b.jsx)(`a`,{href:`#/guides`,children:`Read the field notes →`})]})]})]})}var Pt=`webcraft-theme`,Ft=[`system`,`light`,`dark`];function It(){try{let e=localStorage.getItem(Pt);return Ft.includes(e)?e:`system`}catch{return`system`}}function Lt(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches}function Rt(){let[e,t]=(0,_.useState)(It),[n,r]=(0,_.useState)(Lt),i=e===`system`?n?`dark`:`light`:e;(0,_.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`);function t(e){r(e.matches)}return r(e.matches),e.addEventListener(`change`,t),()=>{e.removeEventListener(`change`,t)}},[]),(0,_.useEffect)(()=>{document.documentElement.dataset.theme=i,document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,i===`dark`?`#0e1116`:`#f5f3ee`)},[i]),(0,_.useEffect)(()=>{function e(e){(e.key===Pt||e.key===null)&&t(It())}return window.addEventListener(`storage`,e),()=>{window.removeEventListener(`storage`,e)}},[]);function a(e){if(Ft.includes(e)){t(e);try{localStorage.setItem(Pt,e)}catch{}}}return{theme:e,resolvedTheme:i,chooseTheme:a}}var zt=[{id:`use-a-component`,title:`Use your first component`,summary:`Preview an example, download its source, and bring it into your React project.`,readingTime:`4 min`,related:[`progress-button`,`clear-accordion`,`project-tabs`],sections:[{title:`Explore before you copy`,paragraphs:[`Open Components and choose an example. Try its controls, check the usage notes, and resize the preview container. Decide whether its behaviour fits the task you are building.`,`Save the example if you want to return later. Use Compare examples when you want to inspect two approaches side by side.`]},{title:`Download the source files`,paragraphs:[`Open the Code view and select Download source ZIP. Extract the archive to find the JSX file, its CSS file, and a README with setup notes.`,`These bundles contain components rather than complete applications. Add them to an existing React project. Each example’s source view shows its actual preview implementation.`]},{title:`Keep the component and its styles together`,paragraphs:[`For the Progress button example, create a components folder inside your project’s src folder. Place ProgressButton.jsx and ProgressButton.css together in that folder.`,`Keep the CSS import in ProgressButton.jsx. Its relative path expects the CSS file to be beside the component.`],code:`import "./ProgressButton.css";`,fileName:`ProgressButton.jsx`},{title:`Import it into your page`,paragraphs:[`Import the component into the page where you want to display it. The example below assumes your App.jsx file is inside src and the downloaded files are inside src/components.`,`If your folder structure is different, adjust the import path. Render the component inside your existing page rather than replacing the whole page unless that is your intention.`],code:`import ProgressButton from "./components/ProgressButton";

  export default function App() {
    return (
      <main>
        <h1>My component experiment</h1>
        <ProgressButton />
      </main>
    );
  }`,fileName:`App.jsx`},{title:`Adapt and check`,paragraphs:[`Change the wording, colours, and spacing to match your project. Read the usage notes before changing behaviour, especially for forms, dialogs, tabs, and notifications.`,`Demonstration interactions do not automatically become connected services. A sample contact form still needs delivery handling, and a pricing selector still needs a real purchase flow.`],checklist:[`Are the JSX and CSS imports resolving correctly?`,`Does the component work with a keyboard?`,`Does it fit narrow screens and longer content?`,`Are demonstration names and messages appropriate for your project?`,`Does your production build complete successfully?`]}]},{id:`start-with-purpose`,title:`Start with the visitor’s purpose`,summary:`Choose components by understanding what someone needs to do.`,readingTime:`3 min`,related:[`direction-hero`,`workshop-navigation`,`studio-footer`],sections:[{title:`Write down the main task`,paragraphs:[`Before choosing colours or animations, describe the page’s main task in one sentence. For a portfolio, that might be: help a potential client explore relevant work and contact the creator.`,`Use that sentence to decide what belongs near the beginning of the page. A visitor should be able to understand the offer and find a useful next action.`]},{title:`Give each section a job`,paragraphs:[`A hero introduces the purpose. A project grid provides evidence. A contact section supports the next conversation. When two sections repeat the same message, consider combining or simplifying them.`,`Write real headings and realistic sample content before polishing the layout. Content length affects card heights, navigation, and the balance of the page.`]},{title:`Make actions understandable`,paragraphs:[`Use labels that describe the destination or result. “View projects” gives more information than “Discover more”. Keep the main action visually clear without making every control compete for attention.`,`Use links to move to another location and buttons to perform actions such as opening a dialog or changing a filter.`],checklist:[`Can a new visitor explain what the page offers?`,`Does each section contribute to the main task?`,`Do action labels describe what happens next?`,`Can the visitor find contact or onward navigation?`]}]},{id:`responsive-layouts`,title:`Build layouts that adapt`,summary:`Use flexible structures and test the space your content actually needs.`,readingTime:`3 min`,related:[`idea-bento`,`workshop-navigation`,`plan-selector`],sections:[{title:`Begin with flexible widths`,paragraphs:[`Let content use the available space while setting sensible maximum widths. A reading column benefits from a narrower measure, while a component gallery can use a wider layout.`,`Avoid fixed widths that force a phone screen to scroll sideways. Grid and flex layouts can rearrange content as space changes.`]},{title:`Respond to the component’s space`,paragraphs:[`A component can appear in a wide page, a narrow sidebar, or a preview card. Container queries let its internal layout respond to that available space.`,`Viewport media queries remain useful for page-level changes such as switching the site header to mobile navigation. Choose the approach that matches the layout relationship.`]},{title:`Test more than a few presets`,paragraphs:[`Resize gradually between narrow and wide layouts. Look for crowded labels, clipped content, awkward gaps, and controls that become difficult to use.`,`The library’s current width controls resize a container. They do not simulate a separate browser viewport, so also test the actual browser at different widths.`],checklist:[`Does the page avoid unintended horizontal scrolling?`,`Can long headings and labels wrap?`,`Does content remain usable when text is enlarged?`,`Do layouts work between the preview presets?`]}]},{id:`accessible-interactions`,title:`Make interactions easier to use`,summary:`Build clear controls, helpful feedback, and predictable keyboard behaviour.`,readingTime:`4 min`,related:[`project-dialog`,`contact-form`,`toast-workshop`],sections:[{title:`Start with native elements`,paragraphs:[`Use a button for an action, an anchor for navigation, and a labelled input for data entry. Native elements provide useful browser behaviour that otherwise needs to be recreated.`,`Keep labels visible. Placeholder text can provide an example, but it disappears during typing and should not replace the field’s label.`]},{title:`Keep focus visible and predictable`,paragraphs:[`Try using the interface with Tab, Shift + Tab, Enter, Space, and Escape where appropriate. The focused control should be easy to identify.`,`When a modal opens, keyboard focus should move inside it. Closing it should return focus to a sensible control, usually the button that opened it.`]},{title:`Explain changes and errors`,paragraphs:[`Put form errors beside the relevant fields and explain how to correct them. Preserve entered values so people do not have to repeat their work.`,`Use brief status announcements for changes such as a successful copy action. Avoid moving focus for routine feedback or announcing every small visual update.`]},{title:`Respect different ways of browsing`,paragraphs:[`Keep essential information available without hover. Provide controls for moving content and avoid requiring decorative animation to understand the interface.`,`Check keyboard use, zoom, contrast, and reduced-motion settings. These checks are useful starting points; they do not replace a complete accessibility evaluation.`],checklist:[`Can essential actions be completed with a keyboard?`,`Is focus visible on every interactive control?`,`Do inputs have labels and useful error messages?`,`Does important content remain available without animation?`]}]}],Bt=[{id:`compare`,name:`Compare examples`,description:`Try two components side by side`,category:`Pages`,path:`/compare`},{id:`templates`,name:`Templates`,description:`Explore complete React page examples`,category:`Pages`,path:`/templates`},{id:`home`,name:`Home`,description:`Return to the workshop`,category:`Pages`,path:`/`},{id:`components`,name:`Components`,description:`Explore the full collection`,category:`Pages`,path:`/components`},{id:`sections`,name:`Sections`,description:`Explore larger page building blocks`,category:`Pages`,path:`/sections`},{id:`saved`,name:`Saved collection`,description:`Return to your favourite components`,category:`Pages`,path:`/saved`},{id:`guides`,name:`Guides`,description:`Learn the interface foundations`,category:`Pages`,path:`/guides`},{id:`about`,name:`About`,description:`Meet the project`,category:`Pages`,path:`/about`}];function Vt({components:e}){let t=(0,_.useRef)(null),n=(0,_.useRef)(null),r=(0,_.useRef)(null),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(``),[c,l]=(0,_.useState)(0),u=(0,_.useId)(),d=`${u}-title`,f=`${u}-results`,p=[...Bt,...zt.map(e=>({id:`guide-${e.id}`,name:e.title,description:e.summary,category:`Guides`,path:`/guides/${e.id}`})),...e.map(e=>({id:`component-${e.id}`,name:e.name,description:e.description,category:e.category,path:`/components/${e.id}`}))],m=o.trim().toLowerCase().split(/\s+/).filter(Boolean),h=p.filter(e=>{let t=[e.name,e.description,e.category].join(` `).toLowerCase();return m.every(e=>t.includes(e))}),g=Math.min(c,Math.max(h.length-1,0)),v=h[g];function y(){a(!1)}function x(e){e&&(window.location.hash=e.path,y())}function ee(e){e.nativeEvent.isComposing||(e.key===`ArrowDown`&&(e.preventDefault(),h.length&&l(e=>(e+1)%h.length)),e.key===`ArrowUp`&&(e.preventDefault(),h.length&&l(e=>(Math.min(e,h.length-1)-1+h.length)%h.length)),e.key===`Enter`&&(e.preventDefault(),x(v)))}return(0,_.useEffect)(()=>{function e(e){!e.ctrlKey&&!e.metaKey||e.altKey||e.key.toLowerCase()!==`k`||Array.from(document.querySelectorAll(`dialog[open]`)).some(e=>e!==t.current)||(e.preventDefault(),a(e=>!e))}return window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`keydown`,e)}},[]),(0,_.useEffect)(()=>{let e=t.current;if(!i){e.open&&e.close();return}let a=document.activeElement,o=document.body.style.overflow;return s(``),l(0),e.open||e.showModal(),document.body.style.overflow=`hidden`,n.current?.focus(),()=>{e.open&&e.close(),document.body.style.overflow=o,a instanceof HTMLElement&&a.isConnected&&a!==document.body?a.focus():r.current?.focus()}},[i]),(0,_.useEffect)(()=>{i&&v&&document.getElementById(`${u}-${v.id}`)?.scrollIntoView({block:`nearest`})},[i,v?.id,u]),(0,_.useEffect)(()=>{function e(){a(!1)}return window.addEventListener(`hashchange`,e),()=>{window.removeEventListener(`hashchange`,e)}},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`button`,{ref:r,className:`command-trigger`,"aria-haspopup":`dialog`,onClick:()=>a(!0),children:[(0,b.jsx)(`span`,{className:`command-trigger-icon`,"aria-hidden":`true`,children:`⌕`}),(0,b.jsx)(`span`,{children:`Quick search`}),(0,b.jsx)(`kbd`,{children:`Ctrl / ⌘ K`})]}),(0,b.jsxs)(`dialog`,{ref:t,className:`command-dialog material-search`,"aria-labelledby":d,onCancel:e=>{e.preventDefault(),y()},onClose:()=>a(!1),onClick:e=>{if(e.target!==e.currentTarget)return;let t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&y()},children:[(0,b.jsx)(`h2`,{id:d,className:`sr-only`,children:`Search Webcraft Atlas`}),(0,b.jsxs)(`div`,{className:`command-search-row`,children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`⌕`}),(0,b.jsx)(`label`,{htmlFor:`${u}-input`,className:`sr-only`,children:`Search pages and components`}),(0,b.jsx)(`input`,{id:`${u}-input`,ref:n,role:`combobox`,"aria-autocomplete":`list`,"aria-expanded":i,"aria-controls":f,"aria-activedescendant":v?`${u}-${v.id}`:void 0,autoComplete:`off`,spellCheck:!1,placeholder:`Where would you like to go?`,value:o,onChange:e=>{s(e.target.value),l(0)},onKeyDown:ee}),(0,b.jsx)(`button`,{className:`command-close`,"aria-label":`Close search`,onClick:y,children:(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})})]}),(0,b.jsxs)(`div`,{className:`command-results-heading`,children:[(0,b.jsx)(`span`,{children:`EXPLORE THE WORKSHOP`}),(0,b.jsxs)(`span`,{role:`status`,"aria-live":`polite`,"aria-atomic":`true`,children:[h.length,` result`,h.length===1?``:`s`]})]}),(0,b.jsx)(`ul`,{id:f,className:`command-results`,role:`listbox`,"aria-label":`Search results`,children:h.map((e,t)=>(0,b.jsxs)(`li`,{id:`${u}-${e.id}`,className:`command-option`,role:`option`,"aria-selected":t===g,onPointerMove:()=>l(t),onMouseDown:e=>{e.preventDefault()},onClick:()=>x(e),children:[(0,b.jsx)(`span`,{className:`command-option-symbol`,"aria-hidden":`true`,children:e.category===`Pages`?`↗`:`◇`}),(0,b.jsxs)(`div`,{className:`command-option-copy`,children:[(0,b.jsx)(`span`,{className:`command-option-name`,children:e.name}),(0,b.jsx)(`span`,{className:`command-option-description`,children:e.description})]}),(0,b.jsx)(`span`,{className:`command-option-category`,children:e.category})]},e.id))}),h.length===0&&(0,b.jsxs)(`div`,{className:`command-empty`,children:[(0,b.jsx)(`p`,{children:`No matching pages or components.`}),(0,b.jsx)(`span`,{children:`Try “button”, “card”, or “guides”.`})]}),(0,b.jsxs)(`div`,{className:`command-footer`,"aria-hidden":`true`,children:[(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`kbd`,{children:`↑`}),` `,(0,b.jsx)(`kbd`,{children:`↓`}),` navigate`]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`kbd`,{children:`Enter`}),` open`]}),(0,b.jsxs)(`span`,{children:[(0,b.jsx)(`kbd`,{children:`Esc`}),` close`]})]})]})]})}var Ht={label:`Make a little progress`,color:`#7051be`,size:`medium`,radius:10},Ut={small:{padding:`10px 14px`,fontSize:13},medium:{padding:`14px 20px`,fontSize:15},large:{padding:`18px 26px`,fontSize:17}};function Wt(e){let t=e.slice(1).match(/.{2}/g).map(e=>{let t=parseInt(e,16)/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}),n=t[0]*.2126+t[1]*.7152+t[2]*.0722;return 1.05/(n+.05)>=(n+.05)/.05?`#ffffff`:`#000000`}function Gt(){let[e,t]=(0,_.useState)(Ht),[n,r]=(0,_.useState)(0),[i,a]=(0,_.useState)(``),o=(0,_.useRef)(null),s=(0,_.useId)();(0,_.useEffect)(()=>()=>window.clearTimeout(o.current),[]);function c(e,n){t(t=>({...t,[e]:n})),a(``),window.clearTimeout(o.current)}function l(){t({...Ht}),r(0),a(``),window.clearTimeout(o.current)}let u=Ut[e.size],d=e.label.trim()||Ht.label,f=Wt(e.color),p={backgroundColor:e.color,color:f,padding:u.padding,fontSize:u.fontSize,borderRadius:e.radius},m=`import { useState } from "react";

export default function CustomProgressButton() {
  const [steps, setSteps] = useState(0);
  const label = ${JSON.stringify(d)};

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gap: 14,
      }}
    >
      <button
        type="button"
        className="custom-progress-button"
        onClick={() => setSteps((value) => value + 1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          maxWidth: "100%",
          minHeight: 44,
          border: "1px solid transparent",
          backgroundColor: "${e.color}",
          color: "${f}",
          padding: "${u.padding}",
          fontFamily: "inherit",
          fontSize: ${u.fontSize},
          lineHeight: 1.4,
          borderRadius: ${e.radius},
          cursor: "pointer",
          overflowWrap: "anywhere",
        }}
      >
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </button>

      <p
        aria-live="polite"
        style={{ margin: 0, fontSize: 12, textAlign: "center" }}
      >
        {steps === 0
          ? "One small interaction. A clear response."
          : steps + " step" + (steps === 1 ? "" : "s") + " forward"}
      </p>

      <style>{\`
        .custom-progress-button:focus-visible {
          outline: 3px solid currentColor;
          outline-offset: 4px;
        }
      \`}</style>
    </div>
  );
}`;async function h(){window.clearTimeout(o.current);try{await navigator.clipboard.writeText(m),a(`Copied React component.`)}catch{a(`Copy unavailable. Select the code below and copy it manually.`)}o.current=window.setTimeout(()=>{a(``)},3500)}return(0,b.jsxs)(`section`,{className:`playground material-playground`,"aria-labelledby":`${s}-heading`,children:[(0,b.jsxs)(`div`,{className:`playground-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`MAKE IT YOURS`}),(0,b.jsx)(`h2`,{id:`${s}-heading`,children:`A small change. Your own direction.`}),(0,b.jsx)(`p`,{children:`Adjust the button and copy the matching component.`})]}),(0,b.jsx)(`button`,{type:`button`,onClick:l,children:`Reset all`})]}),(0,b.jsxs)(`div`,{className:`playground-layout`,children:[(0,b.jsxs)(`div`,{className:`playground-controls`,children:[(0,b.jsxs)(`label`,{className:`playground-field`,htmlFor:`${s}-label`,children:[(0,b.jsx)(`span`,{children:`Button label`}),(0,b.jsx)(`input`,{id:`${s}-label`,type:`text`,maxLength:60,value:e.label,placeholder:Ht.label,onChange:e=>c(`label`,e.target.value)})]}),(0,b.jsxs)(`div`,{className:`playground-field`,children:[(0,b.jsx)(`label`,{htmlFor:`${s}-color`,children:`Background colour`}),(0,b.jsxs)(`div`,{className:`playground-color-row`,children:[(0,b.jsx)(`input`,{id:`${s}-color`,type:`color`,value:e.color,onChange:e=>c(`color`,e.target.value)}),(0,b.jsx)(`code`,{children:e.color.toUpperCase()})]})]}),(0,b.jsxs)(`label`,{className:`playground-field`,htmlFor:`${s}-size`,children:[(0,b.jsx)(`span`,{children:`Size`}),(0,b.jsxs)(`select`,{id:`${s}-size`,value:e.size,onChange:e=>c(`size`,e.target.value),children:[(0,b.jsx)(`option`,{value:`small`,children:`Small`}),(0,b.jsx)(`option`,{value:`medium`,children:`Medium`}),(0,b.jsx)(`option`,{value:`large`,children:`Large`})]})]}),(0,b.jsxs)(`div`,{className:`playground-field`,children:[(0,b.jsxs)(`label`,{className:`playground-range-label`,htmlFor:`${s}-radius`,children:[(0,b.jsx)(`span`,{children:`Corner radius`}),(0,b.jsxs)(`output`,{htmlFor:`${s}-radius`,children:[e.radius,`px`]})]}),(0,b.jsx)(`input`,{id:`${s}-radius`,type:`range`,min:`0`,max:`32`,step:`1`,value:e.radius,onChange:e=>c(`radius`,Number(e.target.value))})]}),(0,b.jsx)(`p`,{className:`playground-hint`,children:`Text colour automatically switches between black and white to maintain contrast against your chosen background.`})]}),(0,b.jsxs)(`div`,{className:`playground-preview`,children:[(0,b.jsx)(`span`,{className:`playground-preview-label`,children:`LIVE EXPERIMENT`}),(0,b.jsxs)(`div`,{className:`playground-button-demo`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`playground-live-button`,style:p,onClick:()=>r(e=>e+1),children:[(0,b.jsx)(`span`,{children:d}),(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(`p`,{"aria-live":`polite`,children:n===0?`One small interaction. A clear response.`:`${n} step${n===1?``:`s`} forward`})]})]})]}),(0,b.jsxs)(`div`,{className:`playground-code-heading`,children:[(0,b.jsx)(`span`,{className:`mono`,children:`CustomProgressButton.jsx`}),(0,b.jsx)(`button`,{type:`button`,onClick:h,children:`Copy React code`})]}),(0,b.jsx)(`pre`,{className:`playground-code`,"aria-label":`Customised React code`,children:(0,b.jsx)(O,{source:m,fileName:`CustomProgressButton.jsx`})}),(0,b.jsx)(`p`,{className:`playground-copy-status`,role:`status`,children:i})]})}function k(){let e=window.location.hash.slice(1)||`/`,t=new URL(e,window.location.origin),n=[`featured`,`name-ascending`,`name-descending`],r=t.searchParams.get(`sort`),i=Number(t.searchParams.get(`page`)||1);return{page:Number.isSafeInteger(i)&&i>0?i:1,path:t.pathname,category:t.searchParams.get(`category`)||`All`,query:t.searchParams.get(`q`)||``,sort:n.includes(r)?r:`featured`,savedOnly:t.searchParams.get(`saved`)===`1`,compareLeft:t.searchParams.get(`left`)||``,compareRight:t.searchParams.get(`right`)||``}}function Kt(){let[e,t]=(0,_.useState)(k);return(0,_.useEffect)(()=>{function e(){t(k())}return window.addEventListener(`hashchange`,e),()=>{window.removeEventListener(`hashchange`,e)}},[]),e}function A({to:e,children:t,...n}){return(0,b.jsx)(`a`,{href:`#${e}`,...n,children:t})}function qt({path:e,theme:t,resolvedTheme:n,chooseTheme:r}){let[i,a]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{a(!1)},[e]),(0,_.useEffect)(()=>{function e(e){e.key===`Escape`&&a(!1)}return window.addEventListener(`keydown`,e),()=>{window.removeEventListener(`keydown`,e)}},[]),(0,b.jsxs)(`header`,{className:`site-header material-header`,children:[(0,b.jsxs)(A,{to:`/`,className:`brand`,children:[(0,b.jsxs)(`span`,{className:`brand-mark`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsxs)(`span`,{children:[`webcraft `,(0,b.jsx)(`span`,{className:`muted`,children:`/ atlas`})]})]}),(0,b.jsx)(`button`,{className:`menu-toggle`,"aria-expanded":i,"aria-controls":`main-navigation`,onClick:()=>a(e=>!e),children:i?`Close`:`Menu`}),(0,b.jsx)(`nav`,{id:`main-navigation`,className:`navigation ${i?`is-open`:``}`,"aria-label":`Main navigation`,children:[`Components`,`Sections`,`Templates`,`Saved`,`Guides`,`About`].map(t=>{let n=`/${t.toLowerCase()}`;return(0,b.jsx)(A,{to:n,"aria-current":e.startsWith(n)?`page`:void 0,children:t},t)})}),(0,b.jsx)(Vt,{components:D}),(0,b.jsxs)(`label`,{className:`theme-picker`,title:`Current appearance: ${n}`,children:[(0,b.jsx)(`span`,{className:`sr-only`,children:`Website colour theme`}),(0,b.jsx)(`span`,{className:`theme-picker-symbol`,"aria-hidden":`true`,children:n===`dark`?`◐`:`☼`}),(0,b.jsxs)(`select`,{value:t,onChange:e=>r(e.target.value),children:[(0,b.jsx)(`option`,{value:`system`,children:`System`}),(0,b.jsx)(`option`,{value:`light`,children:`Light`}),(0,b.jsx)(`option`,{value:`dark`,children:`Dark`})]})]})]})}function Jt(){let e=new Set(D.map(e=>e.category)).size,t=D.filter(e=>e.category===`Templates`).length;return(0,b.jsxs)(`footer`,{className:`atlas-footer material-footer`,children:[(0,b.jsxs)(`div`,{className:`container atlas-footer-content`,children:[(0,b.jsxs)(`div`,{className:`atlas-footer-introduction`,children:[(0,b.jsxs)(A,{to:`/`,className:`brand`,children:[(0,b.jsxs)(`span`,{className:`brand-mark`,"aria-hidden":`true`,children:[(0,b.jsx)(`span`,{}),(0,b.jsx)(`span`,{})]}),(0,b.jsxs)(`span`,{children:[`webcraft `,(0,b.jsx)(`span`,{className:`muted`,children:`/ atlas`})]})]}),(0,b.jsx)(`p`,{children:`An evolving workshop for thoughtful interfaces. Explore a piece, understand its behaviour, and give it a purpose of your own.`}),(0,b.jsx)(`span`,{className:`atlas-footer-credit`,children:`Directed by Abdulhakeem Oladapo Raji. Developed with AI assistance.`})]}),[{title:`Explore`,links:[{label:`Components`,to:`/components`},{label:`Page sections`,to:`/sections`},{label:`Complete templates`,to:`/templates`},{label:`Compare examples`,to:`/compare`}]},{title:`Your workspace`,links:[{label:`Saved collection`,to:`/saved`},{label:`Use your first component`,to:`/guides/use-a-component`},{label:`All guides`,to:`/guides`},{label:`About the project`,to:`/about`}]}].map(e=>(0,b.jsxs)(`nav`,{className:`atlas-footer-navigation`,"aria-label":`Footer: ${e.title}`,children:[(0,b.jsx)(`h2`,{children:e.title}),(0,b.jsx)(`ul`,{children:e.links.map(e=>(0,b.jsx)(`li`,{children:(0,b.jsx)(A,{to:e.to,children:e.label})},e.to))})]},e.title))]}),(0,b.jsxs)(`div`,{className:`container atlas-footer-summary`,children:[(0,b.jsxs)(`span`,{children:[D.length,` examples`]}),(0,b.jsxs)(`span`,{children:[e,` categories`]}),(0,b.jsxs)(`span`,{children:[t,` complete template`,t===1?``:`s`]}),(0,b.jsxs)(`span`,{children:[zt.length,` practical guides`]})]}),(0,b.jsxs)(`div`,{className:`container atlas-footer-bottom`,children:[(0,b.jsxs)(`span`,{children:[`Webcraft Atlas · `,new Date().getFullYear()]}),(0,b.jsx)(`span`,{children:`React + CSS · Learn by exploring`})]})]})}function Yt(){let[e,t]=(0,_.useState)(`All`),n=[...new Set(D.map(e=>e.category))],r=[`direction-hero`,`discovery-card`,`workshop-navigation`,`idea-bento`,`project-dialog`,`contact-form`].map(e=>D.find(t=>t.id===e)).filter(Boolean),i=e===`All`?r:D.filter(t=>t.category===e);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`section`,{className:`container home-collection`,"aria-labelledby":`home-collection-title`,children:[(0,b.jsxs)(`div`,{className:`section-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`THE COLLECTION / ALWAYS TAKING SHAPE`}),(0,b.jsx)(`h2`,{id:`home-collection-title`,children:`Find a piece worth exploring.`})]}),(0,b.jsxs)(A,{to:`/components`,className:`text-link`,children:[`All `,D.length,` examples →`]})]}),(0,b.jsxs)(`div`,{className:`home-category-controls`,"aria-label":`Filter homepage examples`,children:[(0,b.jsxs)(`button`,{type:`button`,"aria-pressed":e===`All`,onClick:()=>t(`All`),children:[`Featured`,(0,b.jsx)(`span`,{children:r.length})]}),n.map(n=>{let r=D.filter(e=>e.category===n).length;return(0,b.jsxs)(`button`,{type:`button`,"aria-pressed":e===n,onClick:()=>t(n),children:[n,(0,b.jsx)(`span`,{children:r})]},n)})]}),(0,b.jsxs)(`p`,{className:`results-count`,role:`status`,children:[i.length,` example`,i.length===1?``:`s`,e===`All`?` in the featured selection`:` in ${e.toLowerCase()}`]}),(0,b.jsx)(`div`,{className:`home-feature-grid`,children:i.map(e=>{let t=e.Component;return(0,b.jsxs)(`article`,{className:`home-feature-card`,children:[(0,b.jsx)(`div`,{className:`home-feature-preview ${e.scrollPreview?`home-feature-preview-tall`:``}`,tabIndex:e.scrollPreview?0:void 0,role:e.scrollPreview?`region`:void 0,"aria-label":e.scrollPreview?`${e.name} scrollable preview`:void 0,children:(0,b.jsx)(wt,{name:e.name,children:(0,b.jsx)(bt,{name:e.name,children:(0,b.jsx)(t,{})})})}),(0,b.jsxs)(`div`,{className:`home-feature-information`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:e.category}),(0,b.jsx)(`h3`,{children:(0,b.jsxs)(A,{to:`/components/${e.id}`,children:[e.name,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})}),(0,b.jsx)(`p`,{children:e.description})]})]},e.id)})})]}),(0,b.jsx)(`section`,{className:`container home-learning`,"aria-labelledby":`home-learning-title`,children:(0,b.jsxs)(`div`,{className:`home-learning-panel`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`A LITTLE UNDERSTANDING GOES FURTHER`}),(0,b.jsx)(`h2`,{id:`home-learning-title`,children:`Learn the thinking behind the interface.`}),(0,b.jsx)(`p`,{children:`Start with purpose, build for different screens, and make interactions easier to use.`})]}),(0,b.jsxs)(A,{to:`/guides`,className:`button button-primary`,children:[`Read the field notes`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]})})]})}function Xt(){let{favourites:e}=an(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(!1),a=(0,_.useRef)(null),o=(0,_.useRef)(!1);(0,_.useEffect)(()=>(o.current=!0,()=>{o.current=!1}),[]);let s=new Set(D.map(e=>e.id)),c=e.filter(e=>s.has(e));function l(){let e={application:`webcraft-atlas`,version:1,exportedAt:new Date().toISOString(),favourites:c},t=new Blob([JSON.stringify(e,null,2)],{type:`application/json;charset=utf-8`}),r=URL.createObjectURL(t),i=document.createElement(`a`);i.href=r,i.download=`webcraft-atlas-favourites.json`,document.body.appendChild(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(r),1e3),n(`Backup download requested.`)}async function u(e){let t=e.target.files?.[0];if(e.target.value=``,t){i(!0),n(``);try{if(t.size>262144)throw Error(`Choose a backup smaller than 256 KB.`);let e=await t.text();if(!o.current)return;let r;try{r=JSON.parse(e)}catch{throw Error(`This file does not contain valid JSON.`)}if(!(typeof r==`object`&&r&&!Array.isArray(r)&&r.application===`webcraft-atlas`&&r.version===1&&Array.isArray(r.favourites)&&r.favourites.every(e=>typeof e==`string`)))throw Error(`Choose a Webcraft Atlas favourites backup using version 1.`);let i=[...new Set(r.favourites)],a=i.filter(e=>s.has(e)),c=i.length-a.length,l=nn(),u=a.filter(e=>!l.includes(e)).length;rn([...l,...a]),n(`Import complete. ${u} new favourite${u===1?``:`s`} added.${c?` ${c} unavailable example${c===1?` was`:`s were`} skipped.`:``}`)}catch(e){o.current&&n(e instanceof Error?e.message:`The backup could not be imported.`)}finally{o.current&&i(!1)}}}return(0,b.jsxs)(`section`,{className:`saved-backup`,"aria-label":`Back up your saved collection`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`TAKE YOUR COLLECTION WITH YOU`}),(0,b.jsx)(`h2`,{children:`A small backup for your starting points.`}),(0,b.jsx)(`p`,{children:`Export your saved example IDs, then import them into another browser. Importing adds to your existing favourites.`})]}),(0,b.jsxs)(`div`,{className:`saved-backup-actions`,children:[(0,b.jsx)(`button`,{type:`button`,disabled:c.length===0||r,onClick:l,children:`Export favourites`}),(0,b.jsx)(`button`,{type:`button`,disabled:r,onClick:()=>a.current?.click(),children:r?`Reading backup…`:`Import backup`}),(0,b.jsx)(`input`,{ref:a,type:`file`,accept:`.json,application/json`,"aria-label":`Choose a favourites backup`,hidden:!0,onChange:u})]}),(0,b.jsx)(`p`,{className:`saved-backup-status`,role:`status`,children:t}),(0,b.jsx)(`p`,{className:`saved-backup-note`,children:`The backup contains example IDs and an export date. It does not include component source code or upload anything to a server.`})]})}function Zt(){let{favourites:e,toggleFavourite:t}=an(),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(`saved`),[o,s]=(0,_.useState)(``),c=(0,_.useRef)(null);(0,_.useEffect)(()=>()=>window.clearTimeout(c.current),[]);let l=e.map(e=>D.find(t=>t.id===e)).filter(Boolean),u=l.filter(e=>`${e.name} ${e.description} ${e.category}`.toLowerCase().includes(n.trim().toLowerCase())).sort((t,n)=>i===`name`?t.name.localeCompare(n.name):e.indexOf(t.id)-e.indexOf(n.id));function d(e){t(e.id),window.clearTimeout(c.current),s(`${e.name} removed from your saved collection.`),c.current=window.setTimeout(()=>{s(``)},3500)}return(0,b.jsxs)(`section`,{className:`container section saved-route material-saved`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`YOUR OWN STARTING POINTS`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`Keep a few good ideas close.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Your saved examples, ready for another look.`}),l.length>0?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(`div`,{className:`saved-page-tools`,children:[(0,b.jsxs)(`label`,{className:`search-field`,children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`⌕`}),(0,b.jsx)(`span`,{className:`sr-only`,children:`Search saved components`}),(0,b.jsx)(`input`,{type:`search`,placeholder:`Search your collection…`,value:n,onChange:e=>r(e.target.value)})]}),(0,b.jsxs)(`label`,{className:`sort-control`,children:[`Sort by`,(0,b.jsxs)(`select`,{value:i,onChange:e=>a(e.target.value),children:[(0,b.jsx)(`option`,{value:`saved`,children:`Order saved`}),(0,b.jsx)(`option`,{value:`name`,children:`Name: A–Z`})]})]})]}),(0,b.jsxs)(`p`,{className:`results-count`,role:`status`,children:[u.length,` of `,l.length,` saved example`,l.length===1?``:`s`]}),(0,b.jsx)(`div`,{className:`saved-page-grid`,children:u.map(e=>(0,b.jsxs)(`article`,{className:`saved-page-card`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:e.category}),(0,b.jsx)(`h2`,{children:(0,b.jsxs)(A,{to:`/components/${e.id}`,children:[e.name,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})}),(0,b.jsx)(`p`,{children:e.description}),(0,b.jsxs)(`div`,{className:`saved-card-actions`,children:[(0,b.jsx)(A,{to:`/components/${e.id}`,className:`text-link`,children:`Open example →`}),(0,b.jsx)(`button`,{type:`button`,"aria-label":`Remove ${e.name} from saved collection`,onClick:()=>d(e),children:`Remove`})]})]},e.id))}),u.length===0&&(0,b.jsxs)(`div`,{className:`empty-state`,children:[(0,b.jsx)(`h2`,{children:`No saved examples match that search.`}),(0,b.jsx)(`button`,{type:`button`,onClick:()=>r(``),children:`Clear search`})]})]}):(0,b.jsxs)(`div`,{className:`empty-state saved-page-empty`,children:[(0,b.jsx)(`span`,{className:`empty-state-symbol`,"aria-hidden":`true`,children:`☆`}),(0,b.jsx)(`h2`,{children:`Your collection starts with a star.`}),(0,b.jsx)(`p`,{children:`Open Components and use the star beside an example to save it here.`}),(0,b.jsxs)(A,{to:`/components`,className:`button button-primary`,children:[`Explore components`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]}),(0,b.jsx)(`p`,{className:`saved-page-notice`,role:`status`,children:o}),(0,b.jsx)(`p`,{className:`collection-storage-note`,children:`Saved examples belong to this browser profile. They are not an online account backup.`}),(0,b.jsx)(Xt,{})]})}function Qt(){return(0,b.jsxs)(`div`,{className:`home-v2 home-tactile`,children:[(0,b.jsx)(ee,{}),(0,b.jsxs)(`section`,{className:`container home-collection-summary`,"aria-label":`Collection overview`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:D.length}),(0,b.jsx)(`span`,{children:`working examples`})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:new Set(D.map(e=>e.category)).size}),(0,b.jsx)(`span`,{children:`categories to explore`})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:`React + CSS`}),(0,b.jsx)(`span`,{children:`source included with every example`})]})]}),(0,b.jsx)(Yt,{}),(0,b.jsx)(yt,{}),(0,b.jsxs)(`section`,{className:`container section`,children:[(0,b.jsxs)(`div`,{className:`section-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`THE APPROACH`}),(0,b.jsx)(`h2`,{children:`More than a pretty preview.`})]}),(0,b.jsxs)(`p`,{children:[`Understand the choices behind the interface,`,(0,b.jsx)(`br`,{}),`then make your own.`]})]}),(0,b.jsx)(`div`,{className:`three-column`,children:[{number:`01`,title:`Try it out`,text:`Working examples invite you to click, expand, and explore.`},{number:`02`,title:`Look a little closer`,text:`Read the source and the reasoning behind the behaviour.`},{number:`03`,title:`Make it yours`,text:`Change the details. Give each piece a purpose in your project.`}].map(e=>(0,b.jsxs)(`article`,{className:`step`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:e.number}),(0,b.jsx)(`h3`,{children:e.title}),(0,b.jsx)(`p`,{children:e.text})]},e.number))})]})]})}var $t=`webcraft-favourites`,j=`webcraft:favourites-changed`,en=[],tn=!0;function nn(){if(!tn)return[...en];try{let e=localStorage.getItem($t),t=e?JSON.parse(e):[];en=Array.isArray(t)?[...new Set(t.filter(e=>typeof e==`string`))]:[]}catch{tn=!1}return[...en]}function rn(e){if(en=[...new Set(e)],tn)try{localStorage.setItem($t,JSON.stringify(en))}catch{tn=!1}window.dispatchEvent(new Event(j))}function an(){let[e,t]=(0,_.useState)(nn);(0,_.useEffect)(()=>{function e(){t(nn())}function n(t){(t.key===$t||t.key===null)&&e()}return window.addEventListener(j,e),window.addEventListener(`storage`,n),e(),()=>{window.removeEventListener(j,e),window.removeEventListener(`storage`,n)}},[]);function n(e){let t=nn();rn(t.includes(e)?t.filter(t=>t!==e):[...t,e])}return{favourites:e,toggleFavourite:n}}function on({route:e}){let t=[`All`,...new Set(D.map(e=>e.category))],n=t.includes(e.category)?e.category:`All`,r=e.query,{favourites:i,toggleFavourite:a}=an(),o=e.savedOnly,s=e.sort;function c(e,t,{nextSort:n=s,nextSavedOnly:r=o,nextPage:i=1,replace:a=!1}={}){let c=new URLSearchParams;e!==`All`&&c.set(`category`,e),t&&c.set(`q`,t),n!==`featured`&&c.set(`sort`,n),r&&c.set(`saved`,`1`),i>1&&c.set(`page`,String(i));let l=c.toString(),u=`#/components${l?`?${l}`:``}`;window.location.hash!==u&&(a?(window.history.replaceState(null,``,u),window.dispatchEvent(new Event(`hashchange`))):window.location.hash=u)}function l(){c(`All`,``,{nextSort:`featured`,nextSavedOnly:!1})}let u=D.filter(e=>{let t=n===`All`||e.category===n,a=[e.name,e.description,e.category].join(` `).toLowerCase().includes(r.toLowerCase().trim()),s=!o||i.includes(e.id);return t&&a&&s}).sort((e,t)=>s===`name-ascending`?e.name.localeCompare(t.name):s===`name-descending`?t.name.localeCompare(e.name):D.indexOf(e)-D.indexOf(t)),d=Math.max(1,Math.ceil(u.length/6)),f=Math.min(e.page,d),p=(f-1)*6,m=u.slice(p,p+6),h=u.length===0?0:p+1,g=p+m.length;function _(e){e<1||e>d||c(n,r,{nextPage:e})}let v=n!==`All`||r.length>0||o||s!==`featured`;return(0,b.jsxs)(`section`,{className:`container section gallery-route material-gallery`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`COLLECTION / VOLUME 01`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`Find your next building block.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Explore the examples, save what interests you, and return when you are ready to build.`}),(0,b.jsxs)(`div`,{className:`collection-layout`,children:[(0,b.jsx)(Nt,{components:D,categories:t,selectedCategory:n,onSelectCategory:e=>c(e,r)}),(0,b.jsxs)(`div`,{className:`collection-main`,children:[(0,b.jsxs)(`div`,{className:`collection-tools`,children:[(0,b.jsxs)(`div`,{className:`collection-heading-actions`,children:[(0,b.jsx)(`span`,{className:`collection-current-category`,children:n===`All`?`All examples`:n}),(0,b.jsx)(A,{to:`/compare`,className:`collection-compare-link`,children:`Compare examples ⇄`})]}),(0,b.jsxs)(`label`,{className:`search-field`,children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`⌕`}),(0,b.jsx)(`span`,{className:`sr-only`,children:`Search components`}),(0,b.jsx)(`input`,{type:`search`,placeholder:`Find a component…`,value:r,onChange:e=>c(n,e.target.value,{replace:!0})})]})]}),(0,b.jsxs)(`div`,{className:`collection-secondary-tools`,children:[(0,b.jsxs)(`button`,{className:`saved-filter`,"aria-pressed":o,onClick:()=>c(n,r,{nextSavedOnly:!o}),children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:o?`★`:`☆`}),`Saved`,(0,b.jsx)(`span`,{className:`saved-count`,children:i.length})]}),(0,b.jsxs)(`label`,{className:`sort-control`,children:[`Sort by`,(0,b.jsxs)(`select`,{value:s,onChange:e=>c(n,r,{nextSort:e.target.value}),children:[(0,b.jsx)(`option`,{value:`featured`,children:`Featured`}),(0,b.jsx)(`option`,{value:`name-ascending`,children:`Name: A–Z`}),(0,b.jsx)(`option`,{value:`name-descending`,children:`Name: Z–A`})]})]})]}),v&&(0,b.jsxs)(`div`,{className:`active-filters`,"aria-label":`Active filters`,children:[n!==`All`&&(0,b.jsxs)(`button`,{className:`filter-chip`,"aria-label":`Remove ${n} category filter`,onClick:()=>c(`All`,r),children:[n,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]}),r&&(0,b.jsxs)(`button`,{className:`filter-chip`,"aria-label":`Clear search`,onClick:()=>c(n,``),children:[`Search: `,r,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]}),o&&(0,b.jsxs)(`button`,{className:`filter-chip`,"aria-label":`Remove saved-only filter`,onClick:()=>c(n,r,{nextSavedOnly:!1}),children:[`Saved only`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]}),s!==`featured`&&(0,b.jsxs)(`button`,{type:`button`,className:`filter-chip`,"aria-label":`Reset sorting to featured`,onClick:()=>c(n,r,{nextSort:`featured`}),children:[s===`name-ascending`?`Name: A–Z`:`Name: Z–A`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]}),(0,b.jsx)(`button`,{className:`clear-filters`,onClick:l,children:`Clear all`})]}),(0,b.jsxs)(`p`,{className:`results-count`,"aria-live":`polite`,"aria-atomic":`true`,children:[u.length===0?`No matching examples`:`Showing ${h}–${g} of ${u.length} examples`,o?` in your saved collection`:``]}),(0,b.jsx)(`div`,{className:`component-grid`,children:m.map(e=>{let t=e.Component,n=D.indexOf(e)+1,r=i.includes(e.id);return(0,b.jsxs)(`article`,{className:`component-card`,children:[(0,b.jsx)(`div`,{className:`component-canvas ${e.scrollPreview?`component-canvas-scroll`:``}`,tabIndex:e.scrollPreview?0:void 0,role:e.scrollPreview?`region`:void 0,"aria-label":e.scrollPreview?`${e.name} scrollable preview`:void 0,children:(0,b.jsx)(wt,{name:e.name,children:(0,b.jsx)(bt,{name:e.name,children:(0,b.jsx)(t,{})})})}),(0,b.jsxs)(`div`,{className:`component-information`,children:[(0,b.jsxs)(`div`,{className:`component-meta-row`,children:[(0,b.jsxs)(`span`,{className:`eyebrow`,children:[e.category,` / `,String(n).padStart(2,`0`)]}),(0,b.jsx)(`button`,{className:`save-component`,"aria-pressed":r,"aria-label":r?`Remove ${e.name} from favourites`:`Save ${e.name} to favourites`,onClick:()=>a(e.id),children:(0,b.jsx)(`span`,{"aria-hidden":`true`,children:r?`★`:`☆`})})]}),(0,b.jsx)(`h2`,{children:(0,b.jsxs)(A,{to:`/components/${e.id}`,children:[e.name,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})}),(0,b.jsx)(`p`,{children:e.description})]})]},e.id)})}),d>1&&(0,b.jsxs)(`nav`,{className:`gallery-pagination`,"aria-label":`Collection pages`,children:[(0,b.jsx)(`button`,{type:`button`,disabled:f===1,onClick:()=>_(f-1),children:`← Previous`}),(0,b.jsx)(`div`,{className:`gallery-page-numbers`,children:Array.from({length:d},(e,t)=>t+1).map(e=>(0,b.jsx)(`button`,{type:`button`,"aria-label":`Page ${e}`,"aria-current":f===e?`page`:void 0,onClick:()=>_(e),children:e},e))}),(0,b.jsx)(`button`,{type:`button`,disabled:f===d,onClick:()=>_(f+1),children:`Next →`})]}),u.length===0&&(0,b.jsxs)(`div`,{className:`empty-state`,children:[(0,b.jsx)(`span`,{className:`empty-state-symbol`,"aria-hidden":`true`,children:o?`☆`:`⌕`}),(0,b.jsx)(`h2`,{children:o&&i.length===0?`Your collection starts here.`:`No matching experiments.`}),(0,b.jsx)(`p`,{children:o&&i.length===0?`Use the star beside an example to save it for later.`:`Try another search or clear your filters.`}),(0,b.jsx)(`button`,{onClick:l,children:`Explore all components`})]}),(0,b.jsx)(`p`,{className:`collection-storage-note`,children:`Saved examples stay in this browser. Clearing browser data will remove them.`})]})]})]})}function sn({id:e}){let t=D.find(t=>t.id===e),{favourites:n,toggleFavourite:r}=an(),[i,a]=(0,_.useState)(``),o=(0,_.useRef)(null);(0,_.useEffect)(()=>()=>window.clearTimeout(o.current),[]);let[s,c]=(0,_.useState)(`Preview`),[l,u]=(0,_.useState)(0),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(!0),h=(0,_.useRef)(null);if((0,_.useEffect)(()=>()=>window.clearTimeout(h.current),[]),(0,_.useEffect)(()=>{vt(e)},[e]),!t)return(0,b.jsx)(pn,{});let g=n.includes(t.id);function v(){r(t.id),window.clearTimeout(o.current),a(g?`${t.name} removed from your saved collection.`:`${t.name} added to your saved collection.`),o.current=window.setTimeout(()=>{a(``)},3500)}let y=t.Component,x=D.findIndex(e=>e.id===t.id),ee=D[x-1],te=D[x+1],ne=Object.entries(t.files),S=Math.min(l,ne.length-1),[re,C]=ne[S],ie=C.split(`
`).length,ae=D.filter(e=>e.id!==t.id).sort((e,n)=>{let r=+(e.category===t.category);return+(n.category===t.category)-r}).slice(0,3);function oe(e){window.clearTimeout(h.current),f(e),h.current=window.setTimeout(()=>{f(``)},3500)}async function se(e,t){try{await navigator.clipboard.writeText(e),oe(t)}catch{oe(`Automatic copying is unavailable. Select the text and copy it manually.`)}}function ce(){let e=new Blob([C],{type:`text/plain;charset=utf-8`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=re,document.body.appendChild(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),1e3)}function le(){let e=ne.find(([e])=>e.endsWith(`.jsx`))?.[0];if(!e){oe(`This example does not have a JSX entry file.`);return}let n=e.replace(/\.jsx$/,``),r=[`# ${t.name}`,``,t.description,``,`## Requirements`,``,`An existing React project.`,`No additional component package is required for this example.`,``,`## Setup`,``,`1. Extract this archive.`,`2. Place its JSX and CSS files together in your React project.`,`3. Keep the CSS import inside the JSX file.`,`4. Import and render the component in your page.`,``,"```jsx",`import ${n} from "./${n}";`,``,t.usage,"```",``,`Adjust the import path to match your folder structure.`,``,`## Usage notes`,``,t.guidance,``,`## About this bundle`,``,`These files are the source used by this library example.`,`The surrounding library interface and playground are not included.`,`This is a component bundle, not a complete React project.`,``].join(`
`);try{kt({...t.files,"README.md":r},`${t.id}-source.zip`),oe(`Source ZIP download requested.`)}catch(e){oe(e instanceof Error?e.message:`The source bundle could not be downloaded.`)}}function ue(e){u(e),f(``),window.clearTimeout(h.current)}return(0,b.jsxs)(`section`,{className:`container section component-route material-detail`,children:[(0,b.jsx)(A,{to:`/components`,className:`text-link`,children:`← Back to collection`}),(0,b.jsxs)(`p`,{className:`eyebrow detail-label`,children:[t.category,` / REACT EXAMPLE`]}),(0,b.jsx)(`h1`,{className:`page-title`,children:t.name}),(0,b.jsx)(`p`,{className:`intro`,children:t.description}),(0,b.jsxs)(`div`,{className:`detail-page-actions`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`detail-save-button`,"aria-pressed":g,onClick:v,children:[(0,b.jsx)(`span`,{"aria-hidden":`true`,children:g?`★`:`☆`}),g?`Saved to collection`:`Save example`]}),(0,b.jsx)(St,{path:`/components/${t.id}`}),(0,b.jsx)(A,{to:`/saved`,className:`detail-saved-link`,children:`View saved collection →`}),(0,b.jsx)(A,{to:`/compare?${new URLSearchParams({left:t.id,right:D.find(e=>e.id!==t.id)?.id||t.id}).toString()}`,className:`detail-saved-link`,children:`Compare this example ⇄`})]}),(0,b.jsx)(`p`,{className:`detail-save-message`,role:`status`,children:i}),(0,b.jsxs)(`div`,{className:`detail-facts`,"aria-label":`Example information`,children:[(0,b.jsxs)(`span`,{children:[ne.length,` source files`]}),(0,b.jsx)(`span`,{children:`React + CSS`}),(0,b.jsx)(`span`,{children:`No additional component package`})]}),(0,b.jsxs)(`div`,{className:`detail-view-bar`,children:[(0,b.jsx)(`div`,{className:`filter-group`,"aria-label":`Example view`,children:[`Preview`,`Code`].map(e=>(0,b.jsx)(`button`,{type:`button`,"aria-pressed":s===e,onClick:()=>c(e),children:e},e))}),(0,b.jsx)(`span`,{className:`detail-view-caption`,children:s===`Preview`?`Try the interaction`:`Inspect the implementation`})]}),s===`Preview`?(0,b.jsx)(xt,{name:t.name,children:(0,b.jsx)(y,{})}):(0,b.jsxs)(`div`,{className:`detail-source-panel`,children:[(0,b.jsx)(`div`,{className:`detail-file-list`,"aria-label":`Choose a source file`,children:ne.map(([e],t)=>(0,b.jsx)(`button`,{type:`button`,"aria-pressed":S===t,onClick:()=>ue(t),children:e},e))}),(0,b.jsxs)(`div`,{className:`detail-source-tools`,children:[(0,b.jsxs)(`label`,{className:`detail-line-toggle`,children:[(0,b.jsx)(`input`,{type:`checkbox`,checked:p,onChange:e=>m(e.target.checked)}),`Line numbers`]}),(0,b.jsxs)(`div`,{className:`detail-source-actions`,children:[(0,b.jsx)(`button`,{type:`button`,onClick:()=>se(C,`${re} copied.`),children:`Copy file`}),(0,b.jsx)(`button`,{type:`button`,onClick:ce,children:`Download file`}),(0,b.jsx)(`button`,{type:`button`,className:`detail-download-bundle`,onClick:le,children:`Download source ZIP`})]})]}),(0,b.jsxs)(`div`,{className:`detail-code-layout`,children:[p&&(0,b.jsx)(`div`,{className:`detail-line-numbers`,"aria-hidden":`true`,children:Array.from({length:ie},(e,t)=>t+1).join(`
`)}),(0,b.jsx)(`pre`,{className:`detail-source-code`,"aria-label":`${re} source`,tabIndex:0,children:(0,b.jsx)(O,{source:C,fileName:re})})]}),(0,b.jsxs)(`div`,{className:`detail-source-footer`,children:[(0,b.jsx)(`span`,{children:re}),(0,b.jsxs)(`span`,{children:[ie,` line`,ie===1?``:`s`]})]})]}),(0,b.jsx)(`p`,{className:`copy-status`,role:`status`,children:d}),t.id===`progress-button`&&(0,b.jsx)(bt,{name:`the button playground`,children:(0,b.jsx)(Gt,{})}),(0,b.jsxs)(`div`,{className:`documentation-grid`,children:[(0,b.jsxs)(`article`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`USE IT WITH INTENTION`}),(0,b.jsx)(`h2`,{children:`Understand the behaviour.`}),(0,b.jsx)(`p`,{children:t.guidance}),(0,b.jsx)(`h3`,{children:`Usage`}),(0,b.jsx)(`pre`,{className:`usage-code`,children:(0,b.jsx)(`code`,{children:t.usage})}),(0,b.jsx)(`button`,{type:`button`,className:`detail-copy-usage`,onClick:()=>se(t.usage,`Usage example copied.`),children:`Copy usage`})]}),(0,b.jsxs)(`article`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`BRING IT INTO YOUR PROJECT`}),(0,b.jsx)(`h2`,{children:`From preview to page.`}),(0,b.jsxs)(`ol`,{className:`detail-setup-steps`,children:[(0,b.jsx)(`li`,{children:`Save the JSX and CSS files together in a folder inside your React project.`}),(0,b.jsx)(`li`,{children:`Keep the CSS import at the top of the JSX file.`}),(0,b.jsx)(`li`,{children:`Import the component into your page and render the usage example.`}),(0,b.jsx)(`li`,{children:`Adapt the content and styles, then check keyboard use and smaller screens.`})]}),(0,b.jsx)(`p`,{className:`small-text`,children:`The source files shown here are the implementation used by the live preview. The library supplies the surrounding canvas and preview controls.`}),(0,b.jsx)(A,{to:`/guides/use-a-component`,className:`detail-setup-guide-link`,children:`New to using components? Follow the setup guide →`})]})]}),(0,b.jsxs)(`nav`,{className:`component-pagination`,"aria-label":`Component sequence`,children:[(0,b.jsx)(`div`,{children:ee&&(0,b.jsxs)(A,{to:`/components/${ee.id}`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:`← PREVIOUS EXAMPLE`}),(0,b.jsx)(`strong`,{children:ee.name})]})}),(0,b.jsx)(`div`,{children:te&&(0,b.jsxs)(A,{to:`/components/${te.id}`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:`NEXT EXAMPLE →`}),(0,b.jsx)(`strong`,{children:te.name})]})})]}),(0,b.jsxs)(`section`,{className:`detail-related`,"aria-label":`More components to explore`,children:[(0,b.jsxs)(`div`,{className:`section-heading`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`KEEP EXPLORING`}),(0,b.jsx)(`h2`,{children:`Another piece of the picture.`})]}),(0,b.jsx)(A,{to:`/components`,className:`text-link`,children:`View the collection →`})]}),(0,b.jsx)(`div`,{className:`detail-related-grid`,children:ae.map(e=>(0,b.jsxs)(A,{to:`/components/${e.id}`,className:`detail-related-card`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:e.category}),(0,b.jsxs)(`h3`,{children:[e.name,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(`p`,{children:e.description})]},e.id))})]})]})}function cn(){return(0,b.jsxs)(`section`,{className:`container section guides-route material-guides`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`FIELD NOTES / PRACTICAL FOUNDATIONS`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`Understand the small things.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Short guides connecting the examples to the decisions behind them.`}),(0,b.jsx)(`div`,{className:`guide-directory`,children:zt.map((e,t)=>(0,b.jsxs)(`article`,{className:`guide-directory-card`,children:[(0,b.jsxs)(`div`,{className:`guide-card-meta`,children:[(0,b.jsxs)(`span`,{className:`eyebrow`,children:[`FIELD NOTE `,String(t+1).padStart(2,`0`)]}),(0,b.jsxs)(`span`,{children:[e.readingTime,` read`]})]}),(0,b.jsx)(`h2`,{children:(0,b.jsx)(A,{to:`/guides/${e.id}`,children:e.title})}),(0,b.jsx)(`p`,{children:e.summary}),(0,b.jsx)(A,{to:`/guides/${e.id}`,className:`text-link guide-read-link`,children:`Read guide →`})]},e.id))})]})}function ln({id:e}){let t=zt.find(t=>t.id===e);if(!t)return(0,b.jsx)(pn,{});let n=t.related.map(e=>D.find(t=>t.id===e)).filter(Boolean),r=zt[(zt.indexOf(t)+1)%zt.length];return(0,b.jsxs)(`article`,{className:`container section guide-article material-guide`,children:[(0,b.jsx)(A,{to:`/guides`,className:`text-link`,children:`← All field notes`}),(0,b.jsxs)(`header`,{className:`guide-article-header`,children:[(0,b.jsxs)(`p`,{className:`eyebrow`,children:[`PRACTICAL GUIDE / `,t.readingTime,` READ`]}),(0,b.jsx)(`h1`,{className:`page-title`,children:t.title}),(0,b.jsx)(`p`,{className:`intro`,children:t.summary}),(0,b.jsx)(St,{path:`/guides/${t.id}`})]}),(0,b.jsx)(`div`,{className:`guide-article-body`,children:t.sections.map(e=>(0,b.jsxs)(`section`,{className:`guide-article-section`,children:[(0,b.jsx)(`h2`,{children:e.title}),e.paragraphs.map(e=>(0,b.jsx)(`p`,{children:e},e)),e.code&&(0,b.jsxs)(`div`,{className:`guide-code-example`,children:[(0,b.jsx)(`div`,{className:`guide-code-filename`,children:e.fileName||`Example`}),(0,b.jsx)(`pre`,{className:`guide-code-content`,"aria-label":`${e.fileName||`Example`} code`,tabIndex:0,children:(0,b.jsx)(O,{source:e.code,fileName:e.fileName||`Example.jsx`})})]}),e.checklist&&(0,b.jsxs)(`div`,{className:`guide-checklist`,children:[(0,b.jsx)(`h3`,{children:`Try it on your project`}),(0,b.jsx)(`ul`,{children:e.checklist.map(e=>(0,b.jsx)(`li`,{children:e},e))})]})]},e.title))}),(0,b.jsxs)(`section`,{className:`guide-related`,"aria-label":`Examples connected to this guide`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`PUT IT INTO PRACTICE`}),(0,b.jsx)(`h2`,{children:`Explore the idea in an example.`}),(0,b.jsx)(`div`,{className:`guide-example-links`,children:n.map(e=>(0,b.jsxs)(A,{to:`/components/${e.id}`,children:[(0,b.jsx)(`span`,{children:e.name}),(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]},e.id))})]}),(0,b.jsxs)(`div`,{className:`guide-next`,children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:`ANOTHER FIELD NOTE`}),(0,b.jsxs)(A,{to:`/guides/${r.id}`,children:[r.title,` →`]})]})]})}function un(){let e=D.filter(e=>e.category===`Templates`);return(0,b.jsxs)(`section`,{className:`container section templates-route material-directory`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`THE PIECES, BROUGHT TOGETHER`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`Start with a complete picture.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Explore complete page examples with working interactions and reusable React source.`}),(0,b.jsxs)(`p`,{className:`results-count`,children:[e.length,` template`,e.length===1?``:`s`,` available`]}),(0,b.jsx)(`div`,{className:`template-directory`,children:e.map(e=>{let t=e.Component;return(0,b.jsxs)(`article`,{className:`template-directory-card`,children:[(0,b.jsx)(`div`,{className:`template-directory-preview`,role:`region`,"aria-label":`${e.name} scrollable preview`,tabIndex:0,children:(0,b.jsx)(wt,{name:e.name,children:(0,b.jsx)(bt,{name:e.name,children:(0,b.jsx)(t,{})})})}),(0,b.jsxs)(`div`,{className:`template-directory-information`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{className:`eyebrow`,children:`COMPLETE PAGE / REACT + CSS`}),(0,b.jsx)(`h2`,{children:e.name}),(0,b.jsx)(`p`,{children:e.description})]}),(0,b.jsxs)(A,{to:`/components/${e.id}`,className:`button button-primary`,children:[`Explore template`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]})]},e.id)})}),e.length===0&&(0,b.jsxs)(`div`,{className:`empty-state`,children:[(0,b.jsx)(`h2`,{children:`The next complete picture is taking shape.`}),(0,b.jsx)(A,{to:`/components`,className:`button button-primary`,children:`Explore individual components →`})]})]})}function dn(){let e=[`direction-hero`,`workshop-navigation`,`idea-bento`,`plan-selector`,`quote-carousel`,`contact-form`,`studio-footer`].map(e=>D.find(t=>t.id===e)).filter(Boolean);return(0,b.jsxs)(`section`,{className:`container section sections-route material-directory`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`PAGE-SIZED POSSIBILITIES`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`Pieces become places.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Explore larger building blocks for introductions, navigation, content, contact, and the end of a page.`}),(0,b.jsx)(A,{to:`/templates`,className:`sections-template-link`,children:`Looking for a complete page? Explore templates →`}),(0,b.jsx)(`div`,{className:`section-directory`,children:e.map((e,t)=>(0,b.jsxs)(`article`,{className:`section-directory-card`,children:[(0,b.jsxs)(`span`,{className:`eyebrow`,children:[String(t+1).padStart(2,`0`),` / `,e.category]}),(0,b.jsx)(`h2`,{children:e.name}),(0,b.jsx)(`p`,{children:e.description}),(0,b.jsxs)(A,{to:`/components/${e.id}`,className:`button button-primary`,children:[`Preview and code`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]})]},e.id))})]})}function fn(){let e=new Set(D.map(e=>e.category)).size;return(0,b.jsxs)(`section`,{className:`container section about-page material-about`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`THE WORKSHOP AND THE THINKING BEHIND IT`}),(0,b.jsx)(`h1`,{className:`page-title`,children:`A place to learn by looking closer.`}),(0,b.jsx)(`p`,{className:`intro`,children:`Webcraft Atlas explores how small interface decisions become useful websites. Each example offers a starting point for understanding, experimentation, and practice.`}),(0,b.jsxs)(`dl`,{className:`about-statistics`,children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`dt`,{children:`Live examples`}),(0,b.jsx)(`dd`,{children:D.length})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`dt`,{children:`Categories`}),(0,b.jsx)(`dd`,{children:e})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`dt`,{children:`Practical guides`}),(0,b.jsx)(`dd`,{children:zt.length})]})]}),(0,b.jsxs)(`section`,{className:`about-section`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`HOW TO USE THE COLLECTION`}),(0,b.jsx)(`h2`,{children:`Start with a question. Leave with a direction.`}),(0,b.jsx)(`div`,{className:`about-capabilities`,children:[{title:`Explore`,description:`Browse components, larger sections, and complete templates. Search by name or narrow the collection by category.`},{title:`Understand`,description:`Try the live examples, inspect their source, and read practical notes about their behaviour.`},{title:`Adapt`,description:`Download source files, customise the details, and check how the result fits your own project.`},{title:`Return`,description:`Save useful examples, revisit recent discoveries, and export a backup of your favourites.`}].map(e=>(0,b.jsxs)(`article`,{children:[(0,b.jsx)(`h3`,{children:e.title}),(0,b.jsx)(`p`,{children:e.description})]},e.title))})]}),(0,b.jsxs)(`section`,{className:`about-section about-authorship`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`THE PERSON BEHIND THE PROJECT`}),(0,b.jsx)(`h2`,{children:`Directed by Abdulhakeem Oladapo Raji.`}),(0,b.jsx)(`p`,{children:`This project brings together my interests in communication, visual design, and front-end development. I direct its purpose, content, and design choices, using AI-assisted coding as part of the development process.`}),(0,b.jsx)(`p`,{children:`The collection is intended to make the details of interface design easier to explore and discuss.`})]}),(0,b.jsxs)(`section`,{className:`about-section`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`WHAT TO EXPECT`}),(0,b.jsx)(`h2`,{children:`Working examples with clear boundaries.`}),(0,b.jsxs)(`ul`,{className:`about-expectations`,children:[(0,b.jsx)(`li`,{children:`Examples include their React and CSS source, with notes about their intended use.`}),(0,b.jsx)(`li`,{children:`Contact forms, pricing controls, and dashboard records demonstrate interface behaviour using sample content.`}),(0,b.jsx)(`li`,{children:`Favourites and recent views belong to your browser. Export favourites to keep a separate backup.`}),(0,b.jsx)(`li`,{children:`Preview width controls resize containers. Test your final implementation in actual browsers and screen sizes too.`})]})]}),(0,b.jsxs)(`section`,{className:`about-section`,children:[(0,b.jsx)(`p`,{className:`eyebrow`,children:`DESIGN AND SOURCE`}),(0,b.jsx)(`h2`,{children:`Created with care for the work behind it.`}),(0,b.jsx)(`p`,{className:`about-body-copy`,children:`Application layouts, writing, and demonstration examples were developed for this project with AI assistance. React, Vite, and other third-party software retain their respective licences. Webcraft Atlas remains a working name.`})]}),(0,b.jsxs)(`div`,{className:`about-page-actions`,children:[(0,b.jsxs)(A,{to:`/components`,className:`button button-primary`,children:[`Explore the collection`,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsx)(A,{to:`/guides/use-a-component`,className:`text-link`,children:`Use your first component →`})]})]})}function pn(){return(0,b.jsxs)(`section`,{className:`container section atlas-not-found`,children:[(0,b.jsxs)(`div`,{className:`atlas-not-found-display`,children:[(0,b.jsx)(`span`,{className:`atlas-not-found-label`,children:`ROUTE STATUS / ADDRESS NOT FOUND`}),(0,b.jsx)(`span`,{className:`atlas-not-found-number`,"aria-hidden":`true`,children:`404`}),(0,b.jsx)(`h1`,{children:`This page is outside the atlas.`}),(0,b.jsx)(`p`,{children:`The address may have changed, or the link may be incomplete. Pick a starting point below.`})]}),(0,b.jsxs)(`div`,{className:`atlas-not-found-actions`,children:[(0,b.jsxs)(A,{to:`/components`,className:`atlas-not-found-key atlas-not-found-primary`,children:[`Explore components `,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`↗`})]}),(0,b.jsxs)(A,{to:`/`,className:`atlas-not-found-key`,children:[`Return home `,(0,b.jsx)(`span`,{"aria-hidden":`true`,children:`⌂`})]})]})]})}function mn(){let e=Kt(),t=(0,_.useRef)(e.path),{theme:n,resolvedTheme:r,chooseTheme:i}=Rt();(0,_.useEffect)(()=>{let n={"/":`The Interface Workshop`,"/saved":`Saved collection`,"/components":`Components`,"/compare":`Compare examples`,"/sections":`Sections`,"/templates":`Templates`,"/guides":`Guides`,"/about":`About`},r=D.find(t=>e.path===`/components/${t.id}`),i=zt.find(t=>e.path===`/guides/${t.id}`),a=r?.name||i?.title||n[e.path]||`Page not found`;document.title=`${a} — Webcraft Atlas`;let o=t.current!==e.path;if(t.current=e.path,!o)return;window.scrollTo({top:0,behavior:`instant`});let s=window.requestAnimationFrame(()=>{document.getElementById(`main-content`)?.focus({preventScroll:!0})});return()=>window.cancelAnimationFrame(s)},[e.path]);let a;if(e.path===`/`)a=(0,b.jsx)(Qt,{});else if(e.path===`/saved`)a=(0,b.jsx)(Zt,{});else if(e.path===`/compare`)a=(0,b.jsx)(Ct,{route:e});else if(e.path===`/components`)a=(0,b.jsx)(on,{route:e});else if(/^\/components\/[^/]+$/.test(e.path)){let t=e.path.split(`/`)[2];a=(0,b.jsx)(sn,{id:t},t)}else if(e.path===`/templates`)a=(0,b.jsx)(un,{});else if(e.path===`/sections`)a=(0,b.jsx)(dn,{});else if(e.path===`/guides`)a=(0,b.jsx)(cn,{});else if(/^\/guides\/[^/]+$/.test(e.path)){let t=e.path.split(`/`)[2];a=(0,b.jsx)(ln,{id:t},t)}else a=e.path===`/about`?(0,b.jsx)(fn,{}):(0,b.jsx)(pn,{});return(0,b.jsxs)(`div`,{className:`visual-app`,children:[(0,b.jsx)(`a`,{className:`skip-link`,href:`#main-content`,onClick:e=>{e.preventDefault();let t=document.getElementById(`main-content`);t?.focus({preventScroll:!0}),t?.scrollIntoView({block:`start`})},children:`Skip to content`}),(0,b.jsx)(qt,{path:e.path,theme:n,resolvedTheme:r,chooseTheme:i}),(0,b.jsx)(`main`,{id:`main-content`,tabIndex:-1,children:a}),(0,b.jsx)(Jt,{})]})}v.createRoot(document.getElementById(`root`)).render((0,b.jsx)(_.StrictMode,{children:(0,b.jsx)(mn,{})}));