<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(() => {
      const createSketch = (p) => {
        let counties = [];
  
        p.setup = () => {
          p.createCanvas(1000, 500);
          
          let countyNames = ["Jefferson", "Madison", "Washington", "Franklin", "Lincoln", "Jackson"];
          
          for (let i = 0; i < countyNames.length; i++) {
            counties.push({
              name: countyNames[i],
              x: 120 + i * 140,
              actualWage: p.random(450, 750),
              livingWage: p.random(650, 950),
              blackPct: p.random(20, 40),
              currentActual: 0,
              currentLiving: 0
            });
          }
        };
  
        p.draw = () => {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[7];
          })();
          
          if (!state || state.progress === 0) return;
          
          for (let county of counties) {
            county.currentActual = p.lerp(county.currentActual, county.actualWage * state.progress, 0.025);
            county.currentLiving = p.lerp(county.currentLiving, county.livingWage * state.progress, 0.025);
            
            let maxBarHeight = 250;
            let actualHeight = p.map(county.currentActual, 0, 1000, 0, maxBarHeight);
            let livingHeight = p.map(county.currentLiving, 0, 1000, 0, maxBarHeight);
            
            let baseY = p.height - 80;
            
            p.fill(78, 205, 196, 200);
            p.noStroke();
            p.rect(county.x - 25, baseY - actualHeight, 20, actualHeight, 4);
            
            p.fill(255, 107, 157, 200);
            p.rect(county.x + 5, baseY - livingHeight, 20, livingHeight, 4);
            
            if (county.currentLiving > county.currentActual) {
              p.fill(255, 80, 80, 100);
              p.rect(county.x - 30, baseY - livingHeight, 60, livingHeight - actualHeight, 4);
            }
            
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(12);
            p.text(county.name, county.x, baseY + 20);
            p.textSize(10);
            p.text(`${Math.floor(county.blackPct)}% Black`, county.x, baseY + 35);
            
            p.textSize(11);
            p.text(`${Math.floor(county.currentActual)}`, county.x - 15, baseY - actualHeight - 8);
            p.text(`${Math.floor(county.currentLiving)}`, county.x + 15, baseY - livingHeight - 8);
          }
          
          p.fill(255);
          p.textAlign(p.CENTER);
          p.textSize(20);
          p.text("Weekly Wages vs Living Wages in High-Black Counties", p.width/2, 30);
          
          p.textAlign(p.LEFT);
          p.textSize(14);
          p.fill(78, 205, 196);
          p.rect(50, 60, 20, 20);
          p.fill(255);
          p.text("Average Weekly Wage", 80, 75);
          
          p.fill(255, 107, 157);
          p.rect(50, 90, 20, 20);
          p.fill(255);
          p.text("Living Wage Requirement", 80, 105);
          
          p.fill(255, 80, 80, 100);
          p.rect(50, 120, 20, 20);
          p.fill(255);
          p.text("Weekly Shortfall", 80, 135);
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