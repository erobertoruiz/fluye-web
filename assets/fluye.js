(function () {
  document.querySelectorAll('h2.titular, .hero h1').forEach(function (titular) {
    var palabras = titular.textContent.trim().split(/\s+/);
    titular.innerHTML = palabras.map(function (palabra, i) {
      return '<span class="palabra" style="transition-delay:' + (i * 85) + 'ms">' + palabra + '</span>';
    }).join(' ');
  });

  // El hero se ve nada más cargar (no hace falta scroll para descubrirlo), así
  // que se revela solo, una vez, poco después de cargar — no depende del
  // IntersectionObserver de abajo.
  var heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    setTimeout(function () { heroH1.classList.add('visible'); }, 150);
  }

  var elementos = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !elementos.length) {
    elementos.forEach(function (el) { el.classList.add('visible'); });
    document.querySelectorAll('h2.titular').forEach(function (t) { t.classList.add('visible'); });
    return;
  }
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        var titular = entrada.target.querySelector('h2.titular');
        if (titular) titular.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  elementos.forEach(function (el) { observador.observe(el); });
})();
