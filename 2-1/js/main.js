document.addEventListener('DOMContentLoaded', () => {
  const hd = document.getElementById('hd');
  addEventListener('scroll', () => hd.classList.toggle('scrolled', scrollY > 40));

  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .16 });
  document.querySelectorAll('.reveal,.hr').forEach(el => io.observe(el));

  const burger = document.querySelector('.burger');
  const closeNav = () => { hd.classList.remove('nav-open'); document.body.classList.remove('nav-lock'); };
  burger.addEventListener('click', () => { hd.classList.toggle('nav-open'); document.body.classList.toggle('nav-lock'); });
  document.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', closeNav));

  const cio = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count, sfx = el.querySelector('small');
      const numNode = document.createTextNode('0');
      el.insertBefore(numNode, sfx || null);
      let t0 = null;
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / 600, 1);
        numNode.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * to);
        if (p < 1) requestAnimationFrame(step); else numNode.textContent = to;
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('.num[data-count]').forEach(el => cio.observe(el));
});
