/**
 * observer.js
 * One shared IntersectionObserver used by every module that adds
 * `data-reveal` elements (projects grid, timeline, etc.). Sharing avoids
 * spinning up multiple observers for the same effect.
 *
 *   observeReveal(el)  — start watching a single element
 *   stop()             — disconnect entirely (rarely needed)
 */
const io = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

export function observeReveal(el) {
  if (el) io.observe(el);
}

export function stop() {
  io.disconnect();
}

export default io;
