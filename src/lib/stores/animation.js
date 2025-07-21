import { writable } from 'svelte/store';

export const animationStates = writable({});
export const currentSection = writable(1);

export function animateSection(sectionNum) {
  animationStates.update(states => {
    states[sectionNum] = { progress: 0, animating: true };
    return states;
  });
  
  const duration = 3000;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    animationStates.update(states => {
      if (states[sectionNum]) {
        states[sectionNum].progress = progress * progress * (3 - 2 * progress);
      }
      return states;
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      animationStates.update(states => {
        if (states[sectionNum]) {
          states[sectionNum].animating = false;
        }
        return states;
      });
    }
  }
  
  animate();
}