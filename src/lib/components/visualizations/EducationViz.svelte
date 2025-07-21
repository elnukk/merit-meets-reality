<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(() => {
      const createSketch = (p) => {
        let comparisons = [];
  
        p.setup = () => {
          p.createCanvas(600, 500);
          
          comparisons = [
            {
              label: "White Men",
              education: "High School",
              wage: 78000,
              x: p.width * 0.25,
              y: 150,
              color: [78, 205, 196],
              currentWage: 0
            },
            {
              label: "Black Women",
              education: "Bachelor's",
              wage: 65000,
              x: p.width * 0.75,
              y: 150,
              color: [255, 107, 157],
              currentWage: 0
            }
          ];
        };
  
        p.draw = () => {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[4];
          })();
          
          if (!state || state.progress === 0) return;
          
          for (let comp of comparisons) {
            comp.currentWage = p.lerp(comp.currentWage, comp.wage * state.progress, 0.02);
            
            p.fill(comp.color[0], comp.color[1], comp.color[2], 180);
            p.noStroke();
            p.ellipse(comp.x, comp.y, 40, 40);
            p.rect(comp.x - 15, comp.y + 15, 30, 50, 5);
            
            if (comp.education === "Bachelor's") {
              p.fill(255, 217, 61, 200);
              p.rect(comp.x - 20, comp.y - 60, 40, 25, 5);
              p.textAlign(p.CENTER);
              p.textSize(10);
              p.fill(0);
              p.text("DEGREE", comp.x, comp.y - 48);
            }
            
            let barHeight = p.map(comp.currentWage, 0, 100000, 0, 180);
            p.fill(comp.color[0], comp.color[1], comp.color[2], 200);
            p.rect(comp.x - 25, p.height - 100 - barHeight, 50, barHeight, 5);
            
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(16);
            p.text(comp.label, comp.x, comp.y + 80);
            p.textSize(14);
            p.text(comp.education, comp.x, comp.y + 100);
            p.textSize(18);
            p.text(`$${Math.floor(comp.currentWage).toLocaleString()}`, comp.x, p.height - 70);
          }
          
          p.fill(255, 107, 157);
          p.textAlign(p.CENTER);
          p.textSize(16);
          p.text("Higher Education ≠ Higher Pay", p.width/2, 50);
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