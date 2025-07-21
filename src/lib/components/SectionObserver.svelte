<script>
  import { onMount } from 'svelte';
  import { currentSection } from '../stores/animation.js';
  import { animateSection } from '../stores/animation.js';
  
  export let sectionNumber;
  let sectionElement;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection.update(current => {
            if (sectionNumber !== current && sectionNumber >= 2 && sectionNumber <= 8) {
              animateSection(sectionNumber);
              return sectionNumber;
            }
            return current;
          });
          
          entry.target.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px'
    });
    
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    
    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  });
</script>

<section bind:this={sectionElement} class="section section-{sectionNumber}">
  <slot />
</section>

<style>
  .section {
    height: 100vh;
    width: 100vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
    padding: 4rem 2rem;
  }
  
  .section-1 { background: radial-gradient(ellipse at center, #2c1810 0%, #0a0a0a 100%); }
  .section-2 { background: radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 100%); }
  .section-3 { background: radial-gradient(ellipse at center, #0f3460 0%, #0a0a0a 100%); }
  .section-4 { background: radial-gradient(ellipse at center, #533a3a 0%, #0a0a0a 100%); }
  .section-5 { background: radial-gradient(ellipse at center, #4a1a4a 0%, #0a0a0a 100%); }
  .section-6 { background: radial-gradient(ellipse at center, #1a2a1a 0%, #0a0a0a 100%); }
  .section-7 { background: radial-gradient(ellipse at center, #3a1a1a 0%, #0a0a0a 100%); }
  .section-8 { background: radial-gradient(ellipse at center, #2a2a4a 0%, #0a0a0a 100%); }
  .section-9 { background: radial-gradient(ellipse at center, #1a4a2a 0%, #0a0a0a 100%); }
</style>