import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Hero section entrance animation
  gsap.from(".hero-title", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".hero-subtitle", {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  });

  // Scroll-triggered fade-in animations
  gsap.utils.toArray(".fade-in").forEach(elem => {
    gsap.from(elem, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
}

/**
 * Staggered fade-in animation for multiple elements
 */
export function createStaggeredFadeIn(targets, options = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    ...options
  });
}

/**
 * Scroll-triggered parallax effect
 */
export function createParallaxEffect(target, options = {}) {
  return gsap.to(target, {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      start: "top bottom",
      scrub: true,
      ...options.scrollTrigger
    },
    ...options
  });
}

/**
 * Timeline-based section animation with staggered children
 */
export function createSectionTimeline(sectionSelector, options = {}) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionSelector,
      start: "top 80%",
      toggleActions: "play none none none",
      ...options.scrollTrigger
    },
    ...options.timeline
  });

  tl.from(`${sectionSelector} .fade-in-child`, {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
  });

  return tl;
}

// Optional: call initAnimations() on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initAnimations);