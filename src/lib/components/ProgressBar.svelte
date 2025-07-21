<script>
    import { onMount } from 'svelte';
    
    let progress = 0;
    
    function updateProgress() {
      const scrolled = window.pageYOffset;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      progress = (scrolled / maxHeight) * 100;
    }
    
    onMount(() => {
      let ticking = false;
      
      function handleScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
          });
          ticking = true;
        }
      }
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });
  </script>
  
  <div class="progress-indicator" style="width: {progress}%"></div>
  
  <style>
    .progress-indicator {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #ff6b9d, #4ecdc4, #ffd93d);
      z-index: 100;
      transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  </style>