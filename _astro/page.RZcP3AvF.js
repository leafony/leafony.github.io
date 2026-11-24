const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/mermaid.core.CiI5jyUA.js","_astro/preload-helper.CVfkMyKi.js"])))=>i.map(i=>d[i]);
import{_ as f}from"./preload-helper.CVfkMyKi.js";const h=()=>{},g=(...t)=>console.error("[astro-mermaid]",...t),p=()=>document.querySelectorAll("pre.mermaid").length>0;let s=null;async function y(){return s||(s=f(()=>import("./mermaid.core.CiI5jyUA.js").then(t=>t.cc),__vite__mapDeps([0,1])).then(async({default:t})=>{const r=[];if(r&&r.length>0){const a=r.map(e=>e.icons?{name:e.name,icons:e.icons}:{name:e.name,loader:()=>fetch(e.url).then(n=>n.json())});await t.registerIconPacks(a)}return t}).catch(t=>{throw g("Failed to load mermaid:",t),s=null,t}),s)}const m={startOnLoad:!1,theme:"default"},k={light:"default",dark:"dark"};async function c(){const t=document.querySelectorAll("pre.mermaid");if(h("Found",t.length),t.length===0)return;const r=await y();let a=m.theme;{const e=document.documentElement.getAttribute("data-theme"),n=document.body.getAttribute("data-theme");a=k[e||n]||m.theme}r.initialize({...m,theme:a,gitGraph:{mainBranchName:"main",showCommitLabel:!0,showBranches:!0,rotateCommitLabel:!0}});for(const e of t){if(e.hasAttribute("data-processed"))continue;e.hasAttribute("data-diagram")||e.setAttribute("data-diagram",e.textContent||"");const n=e.getAttribute("data-diagram")||"",i="mermaid-"+Math.random().toString(36).slice(2,11);try{const d=document.getElementById(i);d&&d.remove();const{svg:o}=await r.render(i,n);e.innerHTML=o,e.setAttribute("data-processed","true"),h("Successfully rendered diagram:",i)}catch(d){g("Mermaid rendering error for diagram:",i,d);const o=document.createElement("div");o.style.cssText="color: red; padding: 1rem; border: 1px solid red; border-radius: 0.5rem;";const u=document.createElement("strong");u.textContent="Error rendering diagram:";const l=document.createElement("span");l.textContent=" "+(d.message||"Unknown error"),o.appendChild(u),o.appendChild(l),e.textContent="",e.appendChild(o),e.setAttribute("data-processed","true")}}}p()&&c();{const t=new MutationObserver(r=>{for(const a of r)a.type==="attributes"&&a.attributeName==="data-theme"&&(document.querySelectorAll("pre.mermaid[data-processed]").forEach(e=>{e.removeAttribute("data-processed")}),c())});t.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),t.observe(document.body,{attributes:!0,attributeFilter:["data-theme"]})}document.addEventListener("astro:after-swap",()=>{p()&&c()});const b=document.createElement("style");b.textContent=`
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
          `;document.head.appendChild(b);
