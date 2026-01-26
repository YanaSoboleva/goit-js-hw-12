import{a as m,S as p,i as l}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const g="54242679-4f176982105516e8b81b54235",y="https://pixabay.com/api/",h=async s=>{try{return(await m.get(y,{params:{key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(t){throw console.error("Error during request:",t),t}},c=document.querySelector(".gallery"),i=document.querySelector(".loader"),b=new p(".gallery a",{captionsData:"alt",captionDelay:250});function L(){i&&(i.classList.add("is-active"),i.classList.remove("hidden"))}function F(){i&&(i.classList.remove("is-active"),i.classList.add("hidden"))}function v(s){if(!c)return;const t=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:r,views:n,comments:d,downloads:f})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${o}" alt="${e}" width="360"/>
        <div class="info">
          <p><b>Likes</b><br>${r}</p>
          <p><b>Views</b><br>${n}</p>
          <p><b>Comments</b><br>${d}</p>
          <p><b>Downloads</b><br>${f}</p>
        </div>
      </a>
    </li>
  `).join("");c.innerHTML=t,b.refresh()}function w(){c&&(c.innerHTML="")}const u=document.querySelector(".form");u.addEventListener("submit",async s=>{s.preventDefault();const t=s.currentTarget.elements["search-text"].value.trim();t&&(w(),L(),h(t).then(o=>{o.hits.length===0?l.error({message:"Sorry, there are no images matching<br>your search query. Please try again!",position:"topRight",messageColor:"#FAFAFB",iconColor:"#FAFAFB",closeColor:"#FAFAFB",backgroundColor:"#fd4343"}):v(o.hits)}).catch(o=>{l.error({message:"Something went wrong!"}),console.log(o)}).finally(()=>{F(),u.reset()}))});
//# sourceMappingURL=index.js.map
