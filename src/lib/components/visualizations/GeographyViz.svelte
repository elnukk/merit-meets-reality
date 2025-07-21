<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(() => {
      const createSketch = (p) => {
        let counties = [];
  
        p.setup = function() {
          p.createCanvas(800, 600);
  
          counties = [
            {
              x: 150, y: 200, size: 80, name: "Clayton Co, GA",
              blackIncome: 45000, whiteIncome: 68000, blackPct: 67.8
            },
            {
              x: 350, y: 250, size: 90, name: "Cook Co, IL",
              blackIncome: 38000, whiteIncome: 72000, blackPct: 24.1
            },
            {
              x: 550, y: 150, name: "Prince George's, MD", size: 85,
              blackIncome: 62000, whiteIncome: 78000, blackPct: 62.3
            },
            {
              x: 650, y: 220, size: 95, name: "Fulton Co, GA",
              blackIncome: 55000, whiteIncome: 85000, blackPct: 44.2
            }
          ];
        };
  
        p.draw = function() {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[6];
          })();
          
          if (!state || state.progress === 0) return;
  
          counties.forEach((county, index) => {
            let ratio = county.blackIncome / county.whiteIncome;
            let inequality = 1 - ratio;
  
            let pulse = p.sin(p.millis() * 0.005 + index) * 15 * inequality;
            let red = p.map(inequality, 0, 0.5, 100, 255);
            let green = p.map(inequality, 0, 0.5, 200, 50);
  
            p.fill(red, green, 100, 150);
            p.ellipse(county.x, county.y, county.size + pulse, county.size + pulse);
  
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(14);
            p.text(county.name, county.x, county.y - county.size / 2 - 25);
            p.textSize(12);
            p.fill(200, 200, 200);
            p.text(`${county.blackPct.toFixed(0)}% Black population`, county.x, county.y - county.size / 2 - 10);
  
            if (state.progress > 0.3) {
              let barHeight = 80;
              let blackBar = p.map(county.blackIncome, 20000, 90000, 15, barHeight);
              let whiteBar = p.map(county.whiteIncome, 20000, 90000, 15, barHeight);
  
              p.fill(255, 150, 150);
              p.rect(county.x - 35, county.y + county.size / 2 + 20, 25, blackBar);
  
              p.fill(150, 150, 255);
              p.rect(county.x + 10, county.y + county.size / 2 + 20, 25, whiteBar);
  
              if (state.progress > 0.6) {
                p.fill(255, 150, 150);
                p.textSize(12);
                p.textAlign(p.CENTER);
                p.text(`${(county.blackIncome / 1000).toFixed(0)}K`, county.x - 22, county.y + county.size / 2 + 110);
                p.fill(150, 150, 255);
                p.text(`${(county.whiteIncome / 1000).toFixed(0)}K`, county.x + 22, county.y + county.size / 2 + 110);
  
                let gap = county.whiteIncome - county.blackIncome;
                p.fill(255, 100, 100);
                p.textSize(14);
                p.text(`Gap: ${(gap / 1000).toFixed(0)}K`, county.x, county.y + county.size / 2 + 130);
              }
            }
  
            if (state.progress > 0.5 && index < counties.length - 1) {
              let nextCounty = counties[index + 1];
              let streamIntensity = inequality * 200;
  
              p.stroke(255, 200, 100, streamIntensity);
              p.strokeWeight(inequality * 6);
              p.line(county.x, county.y, nextCounty.x, nextCounty.y);
              p.noStroke();
            }
          });
  
          if (state.progress > 0.7) {
            p.fill(255, 150, 150);
            p.rect(50, 480, 25, 20);
            p.fill(150, 150, 255);
            p.rect(50, 510, 25, 20);
            p.fill(255);
            p.textAlign(p.LEFT);
            p.textSize(14);
            p.text("Black median income", 85, 495);
            p.text("White median income", 85, 525);
  
            p.fill(255, 200, 100);
            p.textAlign(p.CENTER);
            p.textSize(18);
            p.text("Geographic location amplifies income inequality", 400, 570);
          }
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