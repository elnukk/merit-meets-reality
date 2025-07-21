<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(() => {
      const createSketch = (p) => {
        let groups = [
          { name: "White Men", wage: 1.00, x: 150, color: [78, 205, 196], figures: [] },
          { name: "White Women", wage: 0.82, x: 300, color: [120, 180, 255], figures: [] },
          { name: "Black Men", wage: 0.73, x: 450, color: [255, 180, 100], figures: [] },
          { name: "Black Women", wage: 0.63, x: 600, color: [255, 107, 157], figures: [] }
        ];
  
        p.setup = () => {
          p.createCanvas(800, 500);
          
          for (let group of groups) {
            for (let i = 0; i < 20; i++) {
              group.figures.push({
                x: group.x + p.random(-20, 20),
                y: p.height - 60,
                targetY: p.height - 60 - (group.wage * 280),
                currentY: p.height - 60,
                size: p.random(5, 8)
              });
            }
          }
        };
  
        p.draw = () => {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[8];
          })();
          
          if (!state || state.progress === 0) return;
          
          p.stroke(80, 80, 100, 120);
          p.strokeWeight(1);
          for (let i = 0; i <= 10; i++) {
            let y = p.height - 60 - (i * 28);
            p.line(80, y, p.width - 80, y);
            
            p.fill(150, 150);
            p.noStroke();
            p.textAlign(p.LEFT);
            p.textSize(12);
            p.text(`${i * 10}k`, 40, y + 4);
          }
          
          for (let group of groups) {
            for (let figure of group.figures) {
              figure.currentY = p.lerp(figure.currentY, figure.targetY, 0.015 * state.progress);
              
              p.fill(group.color[0], group.color[1], group.color[2], 180);
              p.noStroke();
              p.ellipse(figure.x, figure.currentY, figure.size);
            }
            
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(14);
            p.text(group.name, group.x, p.height - 25);
            
            p.fill(group.color[0], group.color[1], group.color[2]);
            p.textSize(20);
            p.text(`${Math.round(group.wage * 100)}¢`, group.x, p.height - 5);
          }
          
          p.fill(255);
          p.textAlign(p.CENTER);
          p.textSize(18);
          p.text("For Every Dollar a White Man Earns", p.width/2, 30);
          
          p.textSize(12);
          p.text("(Controlling for education, experience, and job performance)", p.width/2, 50);
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