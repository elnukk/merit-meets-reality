<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(async () => {
      const createSketch = (p) => {
        let sarah, michael;
        let animationPhase = 0;
  
        p.setup = () => {
          p.createCanvas(600, 500);
          
          sarah = {
            x: p.width * 0.25,
            y: p.height * 0.4,
            wage: 58000,
            currentWage: 0,
            color: [255, 107, 157]
          };
          
          michael = {
            x: p.width * 0.75,
            y: p.height * 0.4,
            wage: 75000,
            currentWage: 0,
            color: [78, 205, 196]
          };
        };
  
        p.draw = () => {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[2];
          })();
          
          if (!state || state.progress === 0) return;
          
          animationPhase += 0.01;
          
          sarah.currentWage = p.lerp(sarah.currentWage, sarah.wage * state.progress, 0.02);
          michael.currentWage = p.lerp(michael.currentWage, michael.wage * state.progress, 0.02);
          
          p.fill(sarah.color[0], sarah.color[1], sarah.color[2], 180);
          p.noStroke();
          p.ellipse(sarah.x, sarah.y, 45, 45);
          p.rect(sarah.x - 18, sarah.y + 18, 36, 60, 8);
          
          p.fill(michael.color[0], michael.color[1], michael.color[2], 180);
          p.ellipse(michael.x, michael.y, 45, 45);
          p.rect(michael.x - 18, michael.y + 18, 36, 60, 8);
          
          let sarahBarHeight = p.map(sarah.currentWage, 0, 100000, 0, 200);
          let michaelBarHeight = p.map(michael.currentWage, 0, 100000, 0, 200);
          
          p.fill(sarah.color[0], sarah.color[1], sarah.color[2], 200);
          p.rect(sarah.x - 25, p.height - 80 - sarahBarHeight, 50, sarahBarHeight, 5);
          
          p.fill(michael.color[0], michael.color[1], michael.color[2], 200);
          p.rect(michael.x - 25, p.height - 80 - michaelBarHeight, 50, michaelBarHeight, 5);
          
          p.fill(255);
          p.textAlign(p.CENTER);
          p.textSize(18);
          p.text("Sarah", sarah.x, sarah.y - 60);
          p.text("Michael", michael.x, michael.y - 60);
          
          p.textSize(16);
          p.text(`$${Math.floor(sarah.currentWage).toLocaleString()}`, sarah.x, p.height - 50);
          p.text(`$${Math.floor(michael.currentWage).toLocaleString()}`, michael.x, p.height - 50);
          
          let gap = michael.currentWage - sarah.currentWage;
          p.fill(255, 217, 61);
          p.textSize(20);
          p.text(`$${Math.floor(gap).toLocaleString()} gap`, p.width/2, p.height - 20);
        };
      };
      
      sketch = new p5(createSketch, vizContainer);
      
      return () => {
        if (sketch) {
          sketch.remove();
        }
      };
    });
  </script>
  
  <div bind:this={vizContainer}></div>