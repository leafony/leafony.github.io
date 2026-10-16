const A=(function(){const a=typeof document<"u"&&document.createElement("link").relList;return a&&a.supports&&a.supports("modulepreload")?"modulepreload":"preload"})(),C=function(t){return"/"+t},f={},S=function(a,i,e){let s=Promise.resolve();if(i&&i.length>0){let h=function(o){return Promise.all(o.map(m=>Promise.resolve(m).then(l=>({status:"fulfilled",value:l}),l=>({status:"rejected",reason:l}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),r=n?.nonce||n?.getAttribute("nonce");s=h(i.map(o=>{if(o=C(o),o in f)return;f[o]=!0;const m=o.endsWith(".css"),l=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${l}`))return;const c=document.createElement("link");if(c.rel=m?"stylesheet":A,m||(c.as="script"),c.crossOrigin="",c.href=o,r&&c.setAttribute("nonce",r),document.head.appendChild(c),m)return new Promise((E,w)=>{c.addEventListener("load",E),c.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${o}`)))})}))}function d(n){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=n,window.dispatchEvent(r),!r.defaultPrevented)throw n}return s.then(n=>{for(const r of n||[])r.status==="rejected"&&d(r.reason);return a().catch(d)})},b=()=>{},y=(...t)=>console.error("[astro-mermaid]",...t),v=()=>document.querySelectorAll("pre.mermaid").length>0;let u=null;async function P(){return u||(u=S(()=>import("./mermaid.core.CJDTi5OV.js").then(t=>t.cc),[]).then(async({default:t})=>{const a=[];if(a&&a.length>0){const i=a.map(e=>e.icons?{name:e.name,icons:e.icons}:{name:e.name,loader:()=>fetch(e.url).then(s=>s.json())});await t.registerIconPacks(i)}return t}).catch(t=>{throw y("Failed to load mermaid:",t),u=null,t}),u)}const g={startOnLoad:!1,theme:"default"},x={light:"default",dark:"dark"};async function p(){const t=document.querySelectorAll("pre.mermaid");if(b("Found",t.length),t.length===0)return;const a=await P();let i=g.theme;{const e=document.documentElement.getAttribute("data-theme"),s=document.body.getAttribute("data-theme");i=x[e||s]||g.theme}a.initialize({...g,theme:i,gitGraph:{mainBranchName:"main",showCommitLabel:!0,showBranches:!0,rotateCommitLabel:!0}});for(const e of t){if(e.hasAttribute("data-processed"))continue;e.hasAttribute("data-diagram")||e.setAttribute("data-diagram",e.textContent||"");const s=e.getAttribute("data-diagram")||"",d="mermaid-"+Math.random().toString(36).slice(2,11);try{const n=document.getElementById(d);n&&n.remove();const{svg:r}=await a.render(d,s);e.innerHTML=r,e.setAttribute("data-processed","true"),b("Successfully rendered diagram:",d)}catch(n){y("Mermaid rendering error for diagram:",d,n);const r=document.createElement("div");r.style.cssText="color: red; padding: 1rem; border: 1px solid red; border-radius: 0.5rem;";const h=document.createElement("strong");h.textContent="Error rendering diagram:";const o=document.createElement("span");o.textContent=" "+(n.message||"Unknown error"),r.appendChild(h),r.appendChild(o),e.textContent="",e.appendChild(r),e.setAttribute("data-processed","true")}}}v()&&p();{const t=new MutationObserver(a=>{for(const i of a)i.type==="attributes"&&i.attributeName==="data-theme"&&(document.querySelectorAll("pre.mermaid[data-processed]").forEach(e=>{e.removeAttribute("data-processed")}),p())});t.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),t.observe(document.body,{attributes:!0,attributeFilter:["data-theme"]})}document.addEventListener("astro:after-swap",()=>{v()&&p()});const k=document.createElement("style");k.textContent=`
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
          `;document.head.appendChild(k);export{S as _};
