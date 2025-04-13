// Track all click events
function setupClickTracking() {
    document.addEventListener('click', function(e) {
      const target = e.target;
      const timestamp = new Date().toISOString();
      let elementType = target.tagName.toLowerCase();
      
      // Enhance element type detection with classes
      if (target.classList.length > 0) {
        elementType += `.${Array.from(target.classList).join('.')}`;
      }
      
      console.log(`${timestamp}, click, ${elementType}`);
    });
  }
  
  // Track element views using Intersection Observer
  function setupViewTracking() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const timestamp = new Date().toISOString();
          const target = entry.target;
          let elementType = target.tagName.toLowerCase();
          
          if (target.classList.length > 0) {
            elementType += `.${Array.from(target.classList).join('.')}`;
          }
          
          console.log(`${timestamp}, view, ${elementType}`);
        }
      });
    }, { threshold: 0.5 });
  
    // Observe important elements
    const elementsToObserve = [
      ...document.querySelectorAll('[id]'),
      ...document.querySelectorAll('[class]'),
      ...document.querySelectorAll('section'),
      ...document.querySelectorAll('img'),
      ...document.querySelectorAll('a'),
      ...document.querySelectorAll('button'),
      ...document.querySelectorAll('h1, h2, h3')
    ];
  
    // Remove duplicates and observe
    const uniqueElements = [...new Set(elementsToObserve)];
    uniqueElements.forEach(el => observer.observe(el));
  }
  
  // Initialize tracking when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    setupClickTracking();
    setupViewTracking();
    
    // Track initial page load
    console.log(`${new Date().toISOString()}, view, page.load`);
  });