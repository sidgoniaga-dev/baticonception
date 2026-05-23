// Reusable scroll/cursor animation primitives.
// Drop on top of React 18 + Babel. No external deps.

const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;

// ─────────────────────────────────────────────────────────────
// Reveal — fade + translateY on viewport enter
// ─────────────────────────────────────────────────────────────
const Reveal = ({
  children,
  delay = 0,
  y = 16,
  duration = 800,
  as: Tag = "div",
  className = "",
  threshold = 0.12,
  once = true,
  style = {},
  ...rest
}) => {
  const ref = useRefM(null);
  const [visible, setVisible] = useStateM(false);

  useEffectM(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// ─────────────────────────────────────────────────────────────
// Magnetic — element drifts toward cursor when nearby
// ─────────────────────────────────────────────────────────────
const Magnetic = ({ children, strength = 0.28, radius = 90, className = "" }) => {
  const ref = useRefM(null);

  useEffectM(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    let raf = null;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = r.left + r.width / 2;
      const py = r.top + r.height / 2;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      const reach = radius + Math.max(r.width, r.height) / 2;
      if (Math.hypot(dx, dy) < reach) {
        tx = dx * strength;
        ty = dy * strength;
      } else {
        tx = 0;
        ty = 0;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// CountUp — animates 0 → target on viewport enter
// ─────────────────────────────────────────────────────────────
const CountUp = ({ to, suffix = "", prefix = "", duration = 1500, className = "" }) => {
  const ref = useRefM(null);
  const [value, setValue] = useStateM(0);

  useEffectM(() => {
    if (!ref.current) return;
    let raf;
    let start;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const step = (t) => {
            if (!start) start = t;
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(eased * to);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const display = Number.isInteger(to) ? Math.round(value) : value.toFixed(0);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

Object.assign(window, { Reveal, Magnetic, CountUp });
