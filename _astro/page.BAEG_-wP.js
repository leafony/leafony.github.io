const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/mermaid.core.McTgNLIc.js","_astro/preload-helper.CVfkMyKi.js"])))=>i.map(i=>d[i]);
import{_ as S}from"./preload-helper.CVfkMyKi.js";const C={},w=new Set,m=new WeakSet;let f=!0,k,v=!1;function x(e){v||(v=!0,f??=!1,k??="hover",M(),O(),P(),I())}function M(){for(const e of["touchstart","mousedown"])document.addEventListener(e,r=>{const n=r.target.closest("a");c(n,"tap")&&u(n.href,{ignoreSlowConnection:!0})},{passive:!0})}function O(){let e;document.body.addEventListener("focusin",t=>{const a=t.target.closest("a");c(a,"hover")&&r(a.href)},{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),h(()=>{for(const t of document.getElementsByTagName("a"))m.has(t)||c(t,"hover")&&(m.add(t),t.addEventListener("mouseenter",a=>r(a.currentTarget.href),{passive:!0}),t.addEventListener("mouseleave",n,{passive:!0}))});function r(t){e&&clearTimeout(e),e=setTimeout(()=>{u(t)},80)}function n(){e&&(clearTimeout(e),e=0)}}function P(){let e;h(()=>{for(const r of document.getElementsByTagName("a"))m.has(r)||c(r,"viewport")&&(m.add(r),e??=_(),e.observe(r))})}function _(){const e=new WeakMap;return new IntersectionObserver((r,n)=>{for(const t of r){const a=t.target,o=e.get(a);t.isIntersecting?(o&&clearTimeout(o),e.set(a,setTimeout(()=>{n.unobserve(a),e.delete(a),u(a.href)},300))):o&&(clearTimeout(o),e.delete(a))}})}function I(){h(()=>{for(const e of document.getElementsByTagName("a"))c(e,"load")&&u(e.href)})}function u(e,r){e=e.replace(/#.*/,"");const n=r?.ignoreSlowConnection??!1;if(B(e,n))if(w.add(e),document.createElement("link").relList?.supports?.("prefetch")){const t=document.createElement("link");t.rel="prefetch",t.setAttribute("href",e),document.head.append(t)}else{const t=new Headers;for(const[a,o]of Object.entries(C))t.set(a,o);fetch(e,{priority:"low",headers:t})}}function B(e,r){if(!navigator.onLine||!r&&E())return!1;try{const n=new URL(e,location.href);return location.origin===n.origin&&(location.pathname!==n.pathname||location.search!==n.search)&&!w.has(e)}catch{}return!1}function c(e,r){if(e?.tagName!=="A")return!1;const n=e.dataset.astroPrefetch;return n==="false"?!1:r==="tap"&&(n!=null||f)&&E()?!0:n==null&&f||n===""?r===k:n===r}function E(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function h(e){e();let r=!1;document.addEventListener("astro:page-load",()=>{if(!r){r=!0;return}e()})}const y=()=>{},T=(...e)=>console.error("[astro-mermaid]",...e),A=()=>document.querySelectorAll("pre.mermaid").length>0;let d=null;async function D(){return d||(d=S(()=>import("./mermaid.core.McTgNLIc.js").then(e=>e.cc),__vite__mapDeps([0,1])).then(async({default:e})=>{const r=[];if(r&&r.length>0){const n=r.map(t=>t.icons?{name:t.name,icons:t.icons}:{name:t.name,loader:()=>fetch(t.url).then(a=>a.json())});await e.registerIconPacks(n)}return e}).catch(e=>{throw T("Failed to load mermaid:",e),d=null,e}),d)}const l={startOnLoad:!1,theme:"default"},H={light:"default",dark:"dark"};async function g(){const e=document.querySelectorAll("pre.mermaid");if(y("Found",e.length),e.length===0)return;const r=await D();let n=l.theme;{const t=document.documentElement.getAttribute("data-theme"),a=document.body.getAttribute("data-theme");n=H[t||a]||l.theme}r.initialize({...l,theme:n,gitGraph:{mainBranchName:"main",showCommitLabel:!0,showBranches:!0,rotateCommitLabel:!0}});for(const t of e){if(t.hasAttribute("data-processed"))continue;t.hasAttribute("data-diagram")||t.setAttribute("data-diagram",t.textContent||"");const a=t.getAttribute("data-diagram")||"",o="mermaid-"+Math.random().toString(36).slice(2,11);try{const s=document.getElementById(o);s&&s.remove();const{svg:i}=await r.render(o,a);t.innerHTML=i,t.setAttribute("data-processed","true"),y("Successfully rendered diagram:",o)}catch(s){T("Mermaid rendering error for diagram:",o,s);const i=document.createElement("div");i.style.cssText="color: red; padding: 1rem; border: 1px solid red; border-radius: 0.5rem;";const p=document.createElement("strong");p.textContent="Error rendering diagram:";const b=document.createElement("span");b.textContent=" "+(s.message||"Unknown error"),i.appendChild(p),i.appendChild(b),t.textContent="",t.appendChild(i),t.setAttribute("data-processed","true")}}}A()&&g();{const e=new MutationObserver(r=>{for(const n of r)n.type==="attributes"&&n.attributeName==="data-theme"&&(document.querySelectorAll("pre.mermaid[data-processed]").forEach(t=>{t.removeAttribute("data-processed")}),g())});e.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),e.observe(document.body,{attributes:!0,attributeFilter:["data-theme"]})}document.addEventListener("astro:after-swap",()=>{A()&&g()});const L=document.createElement("style");L.textContent=`
            /* Prevent layout shifts by setting minimum height */
            pre.mermaid {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 2rem 0;
              padding: 1rem;
              background-color: transparent;
              border: none;
              overflow: auto;
              min-height: 200px; /* Prevent layout shift */
              position: relative;
            }
            
            /* Loading state with skeleton loader */
            pre.mermaid:not([data-processed]) {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
            }
            
            /* Dark mode skeleton loader */
            [data-theme="dark"] pre.mermaid:not([data-processed]) {
              background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
              background-size: 200% 100%;
            }
            
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            
            /* Show processed diagrams with smooth transition */
            pre.mermaid[data-processed] {
              animation: none;
              background: transparent;
              min-height: auto; /* Allow natural height after render */
            }
            
            /* Ensure responsive sizing for mermaid SVGs */
            pre.mermaid svg {
              max-width: 100%;
              height: auto;
            }
            
            /* Optional: Add subtle background for better visibility */
            @media (prefers-color-scheme: dark) {
              pre.mermaid[data-processed] {
                background-color: rgba(255, 255, 255, 0.02);
                border-radius: 0.5rem;
              }
            }
            
            @media (prefers-color-scheme: light) {
              pre.mermaid[data-processed] {
                background-color: rgba(0, 0, 0, 0.02);
                border-radius: 0.5rem;
              }
            }
            
            /* Respect user's color scheme preference */
            [data-theme="dark"] pre.mermaid[data-processed] {
              background-color: rgba(255, 255, 255, 0.02);
              border-radius: 0.5rem;
            }
            
            [data-theme="light"] pre.mermaid[data-processed] {
              background-color: rgba(0, 0, 0, 0.02);
              border-radius: 0.5rem;
            }
          `;document.head.appendChild(L);x();
