<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(() => {
      const createSketch = (p) => {
        let people = [];
        let jobBuckets = [];
  
        p.setup = function() {
          p.createCanvas(1000, 600);
  
          jobBuckets = [
            {
              x: 120, y: 400, w: 160, h: 120,
              name: "Landscaping", blackPct: 29.8, wage: 35000, color: [139, 69, 19]
            },
            {
              x: 320, y: 350, w: 160, h: 140,
              name: "Security", blackPct: 26.4, wage: 31000, color: [70, 130, 180]
            },
            {
              x: 520, y: 300, w: 160, h: 160,
              name: "Retail", blackPct: 18.3, wage: 28000, color: [255, 140, 0]
            },
            {
              x: 720, y: 200, w: 160, h: 200,
              name: "Software", blackPct: 8.9, wage: 95000, color: [100, 200, 100]
            }
          ];
  
          for (let i = 0; i < 200; i++) {
            people.push({
              x: p.random(20, 100),
              y: p.random(200, 500),
              targetJob: -1,
              isBlack: p.random() < 0.13,
              speed: p.random(0.8, 2.5),
              size: p.random(8, 14),
              assigned: false
            });
          }
        };
  
        p.draw = function() {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[5];
          })();
          
          if (!state || state.progress === 0) return;
  
          jobBuckets.forEach((bucket, index) => {
            let inequality = (30 - bucket.blackPct) / 30;
            p.fill(bucket.color[0], bucket.color[1], bucket.color[2], 60 + inequality * 120);
            p.rect(bucket.x - 15, bucket.y - 15, bucket.w + 30, bucket.h + 30, 20);
  
            p.fill(bucket.color[0], bucket.color[1], bucket.color[2], 180);
            p.rect(bucket.x, bucket.y, bucket.w, bucket.h, 15);
  
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(16);
            p.text(bucket.name, bucket.x + bucket.w / 2, bucket.y - 25);
  
            if (state.progress > 0.4) {
              p.textSize(12);
              p.fill(255, 200, 100);
              p.text(`${bucket.blackPct.toFixed(1)}% Black`, bucket.x + bucket.w / 2, bucket.y + bucket.h + 25);
              p.fill(150, 255, 150);
              p.text(`$${(bucket.wage / 1000).toFixed(0)}K median`, bucket.x + bucket.w / 2, bucket.y + bucket.h + 45);
            }
          });
  
          people.forEach(person => {
            if (!person.assigned && state.progress > 0.2) {
              let jobIndex;
              if (person.isBlack) {
                jobIndex = p.random() < 0.65 ? p.floor(p.random(0, 2)) : p.floor(p.random(2, 4));
              } else {
                jobIndex = p.random() < 0.45 ? p.floor(p.random(2, 4)) : p.floor(p.random(0, 4));
              }
              person.targetJob = jobIndex;
              person.assigned = true;
            }
  
            if (person.targetJob >= 0) {
              let target = jobBuckets[person.targetJob];
              let targetX = target.x + p.random(20, target.w - 20);
              let targetY = target.y + p.random(20, target.h - 20);
  
              person.x = p.lerp(person.x, targetX, 0.015 * person.speed);
              person.y = p.lerp(person.y, targetY, 0.015 * person.speed);
            }
  
            if (person.isBlack) {
              p.fill(255, 107, 157, 180);
            } else {
              p.fill(78, 205, 196, 180);
            }
            
            p.noStroke();
            p.ellipse(person.x, person.y, person.size);
          });
  
          p.fill(255, 107, 157, 180);
          p.ellipse(40, 40, 10);
          p.fill(78, 205, 196, 180);
          p.ellipse(40, 60, 10);
          
          p.fill(255);
          p.textAlign(p.LEFT);
          p.textSize(12);
          p.text("Black Workers", 55, 45);
          p.text("White Workers", 55, 65);
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