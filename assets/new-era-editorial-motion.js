/**
 * PURPOSE: Shared motion controller for New Era editorial sections (reveal, text, pointer, kinetic fields).
 * USED BY: layout/theme.liquid + section markup using data-ned-* hooks.
 * EDIT SAFELY: Keep section lifecycle cleanup and reduced-motion exits intact to avoid duplicated listeners in Theme Editor.
 */
(() => {
  if (!document || !document.body) return;

  const MOTION_HOOKS = [
    '[data-ned-motion-root]',
    '[data-ned-reveal]',
    '[data-ned-animate]',
    '[data-ned-pointer-field]',
    '[data-ned-text-reveal]',
    '[data-ned-kinetic-field]',
    '[data-ned-gravity="true"]',
    '[data-ned-gravity-object]',
    '[data-ned-kinetic-object]',
  ].join(',');
  const EDITOR_SECTION_SELECTOR = '[id^="shopify-section-"], .shopify-section, section';

  const ACTIVE_ROOTS = new Map();
  const ACTIVE_CONTROLLERS = new Set();
  const ENTRANCE_TARGETS = new Map();
  const FIELD_VISIBILITY_TARGETS = new Map();
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');
  const FINE_POINTER = window.matchMedia('(pointer:fine)');

  const MOTION_MULTIPLIERS = { off: 0, subtle: 0.72, medium: 1, expressive: 1.34 };
  const FIELD_MARGIN = 8;
  const GRAVITY_BASE_SPEED = 26;

  let entranceObserver;
  let fieldObserver;

  const parseNumber = (value, fallback = 0) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const seededRandom = (seed) => {
    let state = seed % 2147483647;
    if (state <= 0) state += 2147483646;
    return () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    };
  };

  const readMotionEnvironment = () => {
    const body = document.body;
    const mode = body.dataset.nedMotion || 'subtle';
    const multiplier = parseNumber(body.style.getPropertyValue('--ned-global-motion-multiplier') || getComputedStyle(body).getPropertyValue('--ned-global-motion-multiplier'), 1);
    const pointer = parseNumber(body.style.getPropertyValue('--ned-pointer-strength') || getComputedStyle(body).getPropertyValue('--ned-pointer-strength'), 1);
    const threshold = parseNumber(body.dataset.nedMotionThreshold, 0.12);

    return {
      body,
      mode,
      reduced: REDUCED_MOTION.matches || mode === 'off',
      multiplier: (MOTION_MULTIPLIERS[mode] || 1) * multiplier,
      pointerStrength: pointer * (MOTION_MULTIPLIERS[mode] || 1) * multiplier,
      threshold: clamp(threshold, 0.02, 0.95),
      kineticCollision: body.dataset.nedMotionKineticCollision !== 'false',
      obstacleCollision: body.dataset.nedMotionObstacleCollision !== 'false',
    };
  };

  const ensureEntranceObserver = () => {
    if (entranceObserver || !('IntersectionObserver' in window)) return entranceObserver;
    entranceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const record = ENTRANCE_TARGETS.get(entry.target);
        if (!record) return;
        const ratio = entry.intersectionRatio || 0;
        const reached = entry.isIntersecting && ratio >= record.threshold;
        if (reached) {
          record.onEnter(entry.target);
          if (record.once) {
            ENTRANCE_TARGETS.delete(entry.target);
            entranceObserver.unobserve(entry.target);
          }
        } else if (!record.once) {
          record.onLeave(entry.target);
        }
      });
    }, { threshold: [0, 0.08, 0.12, 0.25, 0.4], rootMargin: '0px 0px -6% 0px' });
    return entranceObserver;
  };

  const ensureFieldObserver = () => {
    if (fieldObserver || !('IntersectionObserver' in window)) return fieldObserver;
    fieldObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = FIELD_VISIBILITY_TARGETS.get(entry.target);
        if (callback) callback(entry.isIntersecting);
      });
    }, { threshold: [0, 0.05, 0.1], rootMargin: '0px 0px -5% 0px' });
    return fieldObserver;
  };

  class NEDEntranceController {
    constructor(root, env) {
      this.root = root;
      this.env = env;
      this.targets = [];
      this.init();
    }

    init() {
      const revealTargets = this.root.matches('[data-ned-reveal]') ? [this.root] : [];
      this.root.querySelectorAll('[data-ned-reveal]').forEach((element) => revealTargets.push(element));
      this.root.querySelectorAll('[data-ned-animate]').forEach((element) => revealTargets.push(element));
      this.applyStaggerDelays();

      revealTargets.forEach((target) => {
        if (this.targets.includes(target)) return;
        this.targets.push(target);
        if (this.env.reduced || !('IntersectionObserver' in window)) {
          this.activate(target);
          return;
        }
        const once = target.dataset.nedReplay !== 'true';
        ENTRANCE_TARGETS.set(target, {
          threshold: clamp(parseNumber(target.dataset.nedRevealThreshold, this.env.threshold), 0.01, 0.95),
          once,
          onEnter: (element) => this.activate(element),
          onLeave: (element) => this.deactivate(element),
        });
        ensureEntranceObserver().observe(target);
      });
    }

    applyStaggerDelays() {
      this.root.querySelectorAll('[data-ned-stagger-group]').forEach((group) => {
        const items = [...group.querySelectorAll('[data-ned-animate], [data-ned-reveal]')];
        if (!items.length) return;
        const cadence = parseNumber(group.dataset.nedStaggerStep, 65) / 1000;
        const randomize = group.dataset.nedStaggerDirection === 'random';
        const ordered = randomize ? this.getStableShuffle(items) : items;
        ordered.forEach((item, index) => {
          if (item.style.getPropertyValue('--ned-motion-delay')) return;
          item.style.setProperty('--ned-motion-delay', `${(index * cadence).toFixed(3)}s`);
        });
      });
    }

    getStableShuffle(items) {
      const scopeSeed = this.root.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) + items.length;
      const random = seededRandom(scopeSeed);
      const clone = [...items];
      for (let index = clone.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(random() * (index + 1));
        [clone[index], clone[swap]] = [clone[swap], clone[index]];
      }
      return clone;
    }

    activate(target) {
      target.classList.add('is-ned-visible');
      if (target.hasAttribute('data-ned-reveal')) target.classList.add('is-visible');
      if (target.classList.contains('ned-highlight') || target.classList.contains('ned-highlight-circle')) {
        target.classList.add('active');
      }
    }

    deactivate(target) {
      target.classList.remove('is-ned-visible');
      if (target.hasAttribute('data-ned-reveal')) target.classList.remove('is-visible');
      if (target.classList.contains('ned-highlight') || target.classList.contains('ned-highlight-circle')) {
        target.classList.remove('active');
      }
    }

    destroy() {
      this.targets.forEach((target) => {
        ENTRANCE_TARGETS.delete(target);
        if (entranceObserver) entranceObserver.unobserve(target);
      });
      this.targets = [];
    }
  }

  class NEDPointerController {
    constructor(root, env) {
      this.root = root;
      this.env = env;
      this.fields = [];
      this.raf = null;
      this.init();
    }

    init() {
      this.root.querySelectorAll('[data-ned-pointer-field]').forEach((field) => {
        if (field.dataset.nedPointerReady === 'true') return;
        field.dataset.nedPointerReady = 'true';
        const onPointerMove = (event) => {
          if (this.raf) cancelAnimationFrame(this.raf);
          this.raf = requestAnimationFrame(() => {
            const rect = field.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = (((event.clientX - rect.left) / rect.width) - 0.5) * this.env.pointerStrength;
            const y = (((event.clientY - rect.top) / rect.height) - 0.5) * this.env.pointerStrength;
            field.style.setProperty('--ned-pointer-x', x.toFixed(3));
            field.style.setProperty('--ned-pointer-y', y.toFixed(3));
          });
        };
        const onPointerLeave = () => {
          field.style.setProperty('--ned-pointer-x', '0');
          field.style.setProperty('--ned-pointer-y', '0');
        };
        field.addEventListener('pointermove', onPointerMove, { passive: true });
        field.addEventListener('pointerleave', onPointerLeave);
        this.fields.push({ field, onPointerMove, onPointerLeave });
      });
    }

    destroy() {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.fields.forEach(({ field, onPointerMove, onPointerLeave }) => {
        field.removeEventListener('pointermove', onPointerMove);
        field.removeEventListener('pointerleave', onPointerLeave);
        field.removeAttribute('data-ned-pointer-ready');
      });
      this.fields = [];
    }
  }

  class NEDTextRevealController {
    constructor(root) {
      this.root = root;
      this.targets = [];
      this.init();
    }

    init() {
      this.root.querySelectorAll('[data-ned-text-reveal]:not([data-ned-text-ready])').forEach((element) => {
        const rawText = element.textContent ? element.textContent.trim() : '';
        if (!rawText || element.children.length > 0) return;
        element.dataset.nedTextReady = 'true';
        element.dataset.nedTextOriginal = rawText;
        element.dataset.nedAnimate = 'true';
        element.dataset.nedAnimation = element.dataset.nedAnimation || 'clip-up';
        const words = rawText.split(/\s+/);
        const fragment = document.createDocumentFragment();
        words.forEach((word, index) => {
          const token = document.createElement('span');
          token.className = 'ned-text-token';
          token.style.setProperty('--ned-stagger-index', String(index));
          token.textContent = word;
          fragment.appendChild(token);
          if (index < words.length - 1) fragment.appendChild(document.createTextNode(' '));
        });
        element.textContent = '';
        element.appendChild(fragment);
        this.targets.push(element);
      });
    }

    destroy() {
      this.targets.forEach((target) => {
        if (!target.dataset.nedTextOriginal) return;
        target.textContent = target.dataset.nedTextOriginal;
        target.removeAttribute('data-ned-text-ready');
        target.removeAttribute('data-ned-text-original');
      });
      this.targets = [];
    }
  }

  class NEDKineticFieldController {
    constructor(root, env) {
      this.root = root;
      this.env = env;
      this.fields = [];
      this.isPaused = false;
      this.init();
    }

    init() {
      if (this.env.reduced) return;
      const selector = '[data-ned-kinetic-field], [data-ned-gravity="true"]';
      const roots = this.root.matches(selector) ? [this.root] : [];
      this.root.querySelectorAll(selector).forEach((field) => roots.push(field));

      roots.forEach((field, index) => {
        const objects = [...field.querySelectorAll('[data-ned-kinetic-object], [data-ned-gravity-object]')];
        if (!objects.length) return;

        const random = seededRandom(index + field.id.length + objects.length);
        const state = {
          field,
          objects: [],
          pointer: { x: 0, y: 0, active: false },
          running: false,
          frame: null,
          lastTime: 0,
          onPointerMove: null,
          onPointerLeave: null,
          onResize: null,
        };

        objects.forEach((element, objectIndex) => {
          const xPercent = parseNumber(element.dataset.desktopX || element.dataset.mobileX, 50);
          const yPercent = parseNumber(element.dataset.desktopY || element.dataset.mobileY, 50);
          const baseRotation = parseNumber(element.dataset.rotation, 0);
          const vx = (random() - 0.5) * GRAVITY_BASE_SPEED;
          const vy = (random() - 0.5) * GRAVITY_BASE_SPEED;
          state.objects.push({
            element,
            index: objectIndex,
            xPercent,
            yPercent,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            vx,
            vy,
            rotation: baseRotation,
          });
        });

        const setupMeasurements = () => {
          const rect = field.getBoundingClientRect();
          const width = Math.max(rect.width, 1);
          const height = Math.max(rect.height, 1);
          state.objects.forEach((object) => {
            object.width = object.element.offsetWidth || 48;
            object.height = object.element.offsetHeight || 48;
            object.x = clamp((object.xPercent / 100) * width, FIELD_MARGIN, width - object.width - FIELD_MARGIN);
            object.y = clamp((object.yPercent / 100) * height, FIELD_MARGIN, height - object.height - FIELD_MARGIN);
            object.element.style.left = '0';
            object.element.style.top = '0';
          });
          field.classList.add('is-gravity-active');
        };

        const collideWithObstacles = (object, bounds, obstacles) => {
          if (!this.env.obstacleCollision || !obstacles.length) return;
          const centerX = bounds.left + object.x + (object.width / 2);
          const centerY = bounds.top + object.y + (object.height / 2);
          const radius = Math.max(object.width, object.height) / 2;
          obstacles.forEach((obstacle) => {
            const obstacleRect = obstacle.getBoundingClientRect();
            const nearestX = clamp(centerX, obstacleRect.left, obstacleRect.right);
            const nearestY = clamp(centerY, obstacleRect.top, obstacleRect.bottom);
            const dx = centerX - nearestX;
            const dy = centerY - nearestY;
            const distanceSq = (dx * dx) + (dy * dy);
            if (distanceSq >= radius * radius) return;
            if (Math.abs(dx) > Math.abs(dy)) object.vx *= -0.85;
            else object.vy *= -0.85;
          });
        };

        const handleObjectCollisions = (objects) => {
          if (!this.env.kineticCollision || objects.length < 2) return;
          for (let first = 0; first < objects.length; first += 1) {
            for (let second = first + 1; second < objects.length; second += 1) {
              const one = objects[first];
              const two = objects[second];
              const oneCenterX = one.x + (one.width / 2);
              const oneCenterY = one.y + (one.height / 2);
              const twoCenterX = two.x + (two.width / 2);
              const twoCenterY = two.y + (two.height / 2);
              const dx = twoCenterX - oneCenterX;
              const dy = twoCenterY - oneCenterY;
              const distance = Math.sqrt((dx * dx) + (dy * dy)) || 0.001;
              const minDistance = (Math.max(one.width, one.height) + Math.max(two.width, two.height)) * 0.32;
              if (distance >= minDistance) continue;
              const overlap = (minDistance - distance) / 2;
              const normalX = dx / distance;
              const normalY = dy / distance;
              one.x -= normalX * overlap;
              one.y -= normalY * overlap;
              two.x += normalX * overlap;
              two.y += normalY * overlap;
              const tempVx = one.vx;
              const tempVy = one.vy;
              one.vx = two.vx * 0.92;
              one.vy = two.vy * 0.92;
              two.vx = tempVx * 0.92;
              two.vy = tempVy * 0.92;
            }
          }
        };

        const tick = (time) => {
          if (!state.running || this.isPaused) return;
          if (!state.lastTime) state.lastTime = time;
          const elapsed = clamp((time - state.lastTime) / 1000, 0.001, 0.04);
          state.lastTime = time;

          const bounds = field.getBoundingClientRect();
          const maxX = Math.max(bounds.width - FIELD_MARGIN, FIELD_MARGIN + 1);
          const maxY = Math.max(bounds.height - FIELD_MARGIN, FIELD_MARGIN + 1);
          const damping = clamp(parseNumber(field.dataset.nedGravityDamping, 0.9), 0.7, 0.99);
          const strength = clamp(parseNumber(field.dataset.nedGravityStrength, 0.75) * this.env.multiplier, 0.1, 2.4);
          const obstacleNodes = this.env.obstacleCollision ? [...field.querySelectorAll('[data-ned-collision-obstacle]')] : [];

          state.objects.forEach((object) => {
            if (state.pointer.active) {
              const cx = object.x + (object.width / 2);
              const cy = object.y + (object.height / 2);
              object.vx += (state.pointer.x - cx) * 0.0015 * strength;
              object.vy += (state.pointer.y - cy) * 0.0015 * strength;
            }

            object.vx *= damping;
            object.vy *= damping;
            object.x += object.vx * elapsed * 60;
            object.y += object.vy * elapsed * 60;

            const minX = FIELD_MARGIN;
            const minY = FIELD_MARGIN;
            const objectMaxX = maxX - object.width;
            const objectMaxY = maxY - object.height;

            if (object.x <= minX) {
              object.x = minX;
              object.vx = Math.abs(object.vx) * 0.84;
            } else if (object.x >= objectMaxX) {
              object.x = objectMaxX;
              object.vx = -Math.abs(object.vx) * 0.84;
            }
            if (object.y <= minY) {
              object.y = minY;
              object.vy = Math.abs(object.vy) * 0.84;
            } else if (object.y >= objectMaxY) {
              object.y = objectMaxY;
              object.vy = -Math.abs(object.vy) * 0.84;
            }

            collideWithObstacles(object, bounds, obstacleNodes);
          });

          handleObjectCollisions(state.objects);

          state.objects.forEach((object) => {
            object.element.style.transform = `translate3d(${object.x.toFixed(2)}px, ${object.y.toFixed(2)}px, 0) rotate(${object.rotation}deg)`;
          });

          state.frame = requestAnimationFrame(tick);
        };

        const start = () => {
          if (state.running) return;
          state.running = true;
          state.lastTime = 0;
          state.frame = requestAnimationFrame(tick);
        };

        const stop = () => {
          state.running = false;
          if (state.frame) cancelAnimationFrame(state.frame);
          state.frame = null;
        };

        state.onPointerMove = (event) => {
          const rect = field.getBoundingClientRect();
          state.pointer.x = event.clientX - rect.left;
          state.pointer.y = event.clientY - rect.top;
          state.pointer.active = true;
        };
        state.onPointerLeave = () => {
          state.pointer.active = false;
        };
        state.onResize = () => {
          setupMeasurements();
        };

        field.addEventListener('pointermove', state.onPointerMove, { passive: true });
        field.addEventListener('pointerleave', state.onPointerLeave);
        window.addEventListener('resize', state.onResize);
        setupMeasurements();

        if ('IntersectionObserver' in window) {
          FIELD_VISIBILITY_TARGETS.set(field, (isVisible) => {
            if (isVisible && !this.isPaused) start();
            else stop();
          });
          ensureFieldObserver().observe(field);
        } else {
          start();
        }

        state.start = start;
        state.stop = stop;
        this.fields.push(state);
      });
    }

    setPaused(isPaused) {
      this.isPaused = isPaused;
      this.fields.forEach((fieldState) => {
        if (isPaused) fieldState.stop();
        else fieldState.start();
      });
    }

    destroy() {
      this.fields.forEach((state) => {
        state.stop();
        state.field.removeEventListener('pointermove', state.onPointerMove);
        state.field.removeEventListener('pointerleave', state.onPointerLeave);
        window.removeEventListener('resize', state.onResize);
        FIELD_VISIBILITY_TARGETS.delete(state.field);
        if (fieldObserver) fieldObserver.unobserve(state.field);
        state.objects.forEach((object) => {
          object.element.style.removeProperty('transform');
          object.element.style.removeProperty('left');
          object.element.style.removeProperty('top');
        });
      });
      this.fields = [];
    }
  }

  class NEDMotionRootController {
    constructor(root) {
      this.root = root;
      this.env = readMotionEnvironment();
      this.entrance = null;
      this.pointer = null;
      this.textReveal = null;
      this.kinetic = null;
      this.init();
    }

    init() {
      this.root.dataset.nedMotionRoot = this.root.dataset.nedMotionRoot || 'true';
      if (!this.env.reduced) {
        this.textReveal = new NEDTextRevealController(this.root);
      }
      this.entrance = new NEDEntranceController(this.root, this.env);
      if (!this.env.reduced && FINE_POINTER.matches) {
        this.pointer = new NEDPointerController(this.root, this.env);
      }
      this.kinetic = new NEDKineticFieldController(this.root, this.env);
    }

    setPaused(isPaused) {
      if (this.kinetic) this.kinetic.setPaused(isPaused);
    }

    destroy() {
      if (this.pointer) this.pointer.destroy();
      if (this.kinetic) this.kinetic.destroy();
      if (this.textReveal) this.textReveal.destroy();
      if (this.entrance) this.entrance.destroy();
      this.pointer = null;
      this.kinetic = null;
      this.textReveal = null;
      this.entrance = null;
    }
  }

  const resolveSectionRoot = (element) => {
    if (!element) return null;
    if (element.matches('[data-ned-motion-root]')) return element;
    return element.closest('[data-ned-motion-root]') || element.closest(EDITOR_SECTION_SELECTOR);
  };

  const collectMotionRoots = (scope = document) => {
    const roots = new Set();
    if (!(scope instanceof Element || scope === document)) return roots;
    const candidates = scope === document
      ? document.querySelectorAll(MOTION_HOOKS)
      : [
          ...(scope.matches(MOTION_HOOKS) ? [scope] : []),
          ...scope.querySelectorAll(MOTION_HOOKS),
        ];
    candidates.forEach((candidate) => {
      const root = resolveSectionRoot(candidate);
      if (root) roots.add(root);
    });
    return roots;
  };

  const initializeScope = (scope = document) => {
    collectMotionRoots(scope).forEach((root) => {
      if (ACTIVE_ROOTS.has(root)) return;
      const controller = new NEDMotionRootController(root);
      ACTIVE_ROOTS.set(root, controller);
      ACTIVE_CONTROLLERS.add(controller);
    });
  };

  const destroyScope = (scope = document) => {
    collectMotionRoots(scope).forEach((root) => {
      const controller = ACTIVE_ROOTS.get(root);
      if (!controller) return;
      controller.destroy();
      ACTIVE_CONTROLLERS.delete(controller);
      ACTIVE_ROOTS.delete(root);
    });
  };

  const markRuntimeReady = () => {
    document.documentElement.classList.add('ned-motion-ready');
  };

  const initialize = (scope = document) => {
    markRuntimeReady();
    initializeScope(scope);
  };

  const pauseAll = (isPaused) => {
    ACTIVE_CONTROLLERS.forEach((controller) => controller.setPaused(isPaused));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initialize());
  } else {
    initialize();
  }

  document.addEventListener('visibilitychange', () => {
    pauseAll(document.hidden);
  });

  const handleReducedMotionChange = () => {
    destroyScope(document);
    initialize(document);
  };
  if (typeof REDUCED_MOTION.addEventListener === 'function') {
    REDUCED_MOTION.addEventListener('change', handleReducedMotionChange);
  } else if (typeof REDUCED_MOTION.addListener === 'function') {
    REDUCED_MOTION.addListener(handleReducedMotionChange);
  }

  document.addEventListener('shopify:section:load', (event) => initialize(event.target));
  document.addEventListener('shopify:section:unload', (event) => destroyScope(event.target));
  document.addEventListener('shopify:section:reorder', (event) => {
    destroyScope(event.target);
    initialize(event.target);
  });
  document.addEventListener('shopify:block:select', () => pauseAll(true));
  document.addEventListener('shopify:block:deselect', () => pauseAll(document.hidden));
})();
