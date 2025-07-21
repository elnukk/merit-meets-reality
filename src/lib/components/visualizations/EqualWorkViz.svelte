<script>
    import { onMount } from 'svelte';
    import { animationStates } from '../../stores/animation.js';
    import p5 from 'p5';
    
    let vizContainer;
    let sketch;
    
    onMount(() => {
      const createSketch = (p) => {
        let workers = [];
        let paychecks = [];
        let particles = [];
  
        p.setup = function() {
          p.createCanvas(800, 500);
  
          workers.push({
            x: 200,
            y: 250,
            color: [120, 80, 60],
            name: "Marcus",
            race: "Black Construction Worker",
            hammering: 0
          });
  
          workers.push({
            x: 600,
            y: 250,
            color: [255, 220, 177],
            name: "Brad",
            race: "White Construction Worker",
            hammering: 0
          });
  
          paychecks.push({x: 200, y: 80, amount: 0, targetAmount: 750});
          paychecks.push({x: 600, y: 80, amount: 0, targetAmount: 1000});
        };
  
        p.draw = function() {
          p.clear();
          
          let state;
          animationStates.subscribe(states => {
            state = states[3];
          })();
          
          if (!state || state.progress === 0) return;
  
          workers.forEach((worker, index) => {
            worker.hammering = p.sin(p.millis() * 0.01) * 15;
  
            p.fill(worker.color);
            p.ellipse(worker.x, worker.y, 70, 70);
  
            p.fill(255, 165, 0);
            p.ellipse(worker.x, worker.y - 30, 60, 40);
  
            p.push();
            p.translate(worker.x + 25, worker.y + worker.hammering);
            p.rotate(worker.hammering * 0.05);
            p.fill(139, 69, 19);
            p.rect(0, 0, 40, 8);
            p.fill(180, 180, 180);
            p.rect(35, -8, 15, 24);
            p.pop();
  
            if (p.frameCount % 15 === 0 && state.progress > 0.2) {
              particles.push({
                x: worker.x + 25,
                y: worker.y,
                vx: p.random(-2, 2),
                vy: p.random(-5, -2),
                life: 40,
                toPaycheck: index
              });
            }
  
            p.noStroke();
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(16);
            p.text(worker.name, worker.x, worker.y + 60);
            p.textSize(12);
            p.fill(200, 200, 200);
            p.text(worker.race, worker.x, worker.y + 80);
            p.text("5 years experience", worker.x, worker.y + 95);
            p.text("Same performance rating", worker.x, worker.y + 110);
          });
  
          particles = particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
  
            p.fill(255, 200, 100, particle.life * 6);
            p.ellipse(particle.x, particle.y, 6, 6);
  
            if (particle.life <= 0) {
              if (particle.toPaycheck === 0) {
                paychecks[particle.toPaycheck].amount += (600 / 100) * state.progress;
              } else {
                paychecks[particle.toPaycheck].amount += (800 / 100) * state.progress;
              }
            }
  
            return particle.life > 0;
          });
  
          paychecks.forEach((paycheck, index) => {
            let height = p.map(paycheck.amount, 0, 1000, 0, 120);
  
            p.fill(100, 200, 100);
            p.noStroke();
            p.rect(paycheck.x - 40, paycheck.y + 40 - height, 80, height);
  
            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(20);
            p.text(`$${Math.round(paycheck.amount)}`, paycheck.x, paycheck.y + 20);
            p.textSize(12);
            p.fill(200, 200, 200);
            p.text("per week", paycheck.x, paycheck.y + 35);
  
            if (state.progress > 0.7 && index === 0) {
              p.fill(255, 100, 100);
              p.textSize(14);
              p.text("25% LESS", paycheck.x, paycheck.y + 60);
              p.textSize(10);
              p.text("for identical work", paycheck.x, paycheck.y + 75);
            }
          });
  
          if (state.progress > 0.6) {
            p.fill(255, 100, 100, 150);
            p.textAlign(p.CENTER);
            p.textSize(16);
            p.text("SYSTEMIC WAGE GAP", 400, 450);
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