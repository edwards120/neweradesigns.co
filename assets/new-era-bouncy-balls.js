/**
 * PURPOSE: Runs floating ball physics in a standalone overlay section with optional SVG icon balls.
 * USED BY: sections/new-era-bouncy-balls.liquid.
 * EDIT SAFELY: Keep section scoping + unload cleanup to prevent duplicate loops in Theme Editor.
 */
(() => {
  const sections = new Map();

  class NewEraBouncyOverlay {
    constructor(root) {
      this.root = root;
      this.field = root.querySelector('[data-bouncy-field]');
      this.objects = [...root.querySelectorAll('[data-bouncy-object]')];
      this.scopeSelector = root.dataset.scopeSelector || '.ned-editorial-hero';
      this.obstacleSelector = root.dataset.obstacleSelector || '';
      this.gravity = Number(root.dataset.gravity || 0.25);
      this.damping = Number(root.dataset.damping || 0.75);
      this.maxSpeed = Number(root.dataset.maxSpeed || 22);
      this.clickRadius = Number(root.dataset.clickRadius || 150);
      this.clickForce = Number(root.dataset.clickForce || 8);
      this.mobileBreakpoint = Number(root.dataset.mobileBreakpoint || 989);
      this.bounds = { left: 0, top: 0, width: 0, height: 0 };
      this.states = [];
      this.obstacles = [];
      this.frame = 0;
      this.lastTime = performance.now();
      this.resizeObserver = null;
      this.scrollRaf = 0;
      this.destroyed = false;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.sectionId = root.dataset.sectionId;
    }

    start() {
      if (!this.field || !this.objects.length || this.reducedMotion) return;
      this.updateBounds(true);
      this.bind();
      this.frame = requestAnimationFrame((t) => this.tick(t));
    }

    stop() {
      this.destroyed = true;
      cancelAnimationFrame(this.frame);
      cancelAnimationFrame(this.scrollRaf);
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('scroll', this.handleScroll);
      this.field.removeEventListener('pointerdown', this.handlePointerDown);
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
    }

    bind() {
      this.handleResize = () => this.updateBounds(false);
      this.handleScroll = () => {
        if (this.scrollRaf) return;
        this.scrollRaf = requestAnimationFrame(() => {
          this.scrollRaf = 0;
          this.updateBounds(false);
        });
      };
      this.handlePointerDown = (event) => this.kick(event.clientX, event.clientY);

      window.addEventListener('resize', this.handleResize, { passive: true });
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.field.addEventListener('pointerdown', this.handlePointerDown, { passive: true });

      const scope = this.getScopeElement();
      if (scope && typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.updateBounds(false));
        this.resizeObserver.observe(scope);
      }
    }

    getScopeElement() {
      return document.querySelector(this.scopeSelector);
    }

    updateBounds(initial) {
      const scope = this.getScopeElement();
      if (!scope) {
        this.root.hidden = true;
        return;
      }

      const rect = scope.getBoundingClientRect();
      if (rect.width < 24 || rect.height < 24) {
        this.root.hidden = true;
        return;
      }

      this.root.hidden = false;
      this.bounds = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      this.field.style.left = `${rect.left}px`;
      this.field.style.top = `${rect.top}px`;
      this.field.style.width = `${rect.width}px`;
      this.field.style.height = `${rect.height}px`;

      this.collectObstacles(scope, rect);
      this.rebuildStates(initial);
    }

    collectObstacles(scope, scopeRect) {
      if (!this.obstacleSelector) {
        this.obstacles = [];
        return;
      }

      this.obstacles = [...scope.querySelectorAll(this.obstacleSelector)]
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left - scopeRect.left,
            y: rect.top - scopeRect.top,
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((item) => item.width > 12 && item.height > 12);
    }

    rebuildStates(initial) {
      const was = this.states;
      const mobile = window.innerWidth <= this.mobileBreakpoint;
      this.states = this.objects.map((el, index) => {
        const sizeProp = getComputedStyle(el).getPropertyValue(mobile ? '--object-mobile-size' : '--object-size').trim();
        const size = Number.parseFloat(sizeProp) || el.getBoundingClientRect().width || 50;
        const radius = Math.max(12, size / 2);
        const prior = was[index];
        const startX = Number(el.dataset[mobile ? 'mobileX' : 'desktopX']) || (10 + ((index * 14) % 82));
        const startY = Number(el.dataset[mobile ? 'mobileY' : 'desktopY']) || 12;

        const x = initial || !prior ? this.bounds.width * (startX / 100) : prior.x * (this.bounds.width / Math.max(1, prior.boundsWidth));
        const y = initial || !prior ? this.bounds.height * (startY / 100) : prior.y * (this.bounds.height / Math.max(1, prior.boundsHeight));

        return {
          el,
          radius,
          x: Math.max(radius, Math.min(this.bounds.width - radius, x)),
          y: Math.max(radius, Math.min(this.bounds.height - radius, y)),
          vx: prior?.vx ?? ((index % 2 ? -1 : 1) * (1 + Math.random() * 1.8)),
          vy: prior?.vy ?? (-2 - Math.random() * 2),
          boundsWidth: this.bounds.width,
          boundsHeight: this.bounds.height,
        };
      });
    }

    collideWithObstacles(state) {
      this.obstacles.forEach((rect) => {
        const nearestX = Math.max(rect.x, Math.min(state.x, rect.x + rect.width));
        const nearestY = Math.max(rect.y, Math.min(state.y, rect.y + rect.height));
        const dx = state.x - nearestX;
        const dy = state.y - nearestY;
        const distSq = (dx * dx) + (dy * dy);
        if (distSq >= state.radius * state.radius) return;

        const overlapX = state.radius - Math.abs(dx);
        const overlapY = state.radius - Math.abs(dy);

        if (overlapX < overlapY) {
          const direction = dx < 0 ? -1 : 1;
          state.x += overlapX * direction;
          state.vx = -state.vx * this.damping;
        } else {
          const direction = dy < 0 ? -1 : 1;
          state.y += overlapY * direction;
          state.vy = -state.vy * this.damping;
        }
      });
    }

    collideWithObjects() {
      for (let i = 0; i < this.states.length; i += 1) {
        for (let j = i + 1; j < this.states.length; j += 1) {
          const a = this.states[i];
          const b = this.states[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy) || 1;
          const minDist = a.radius + b.radius;
          if (distance >= minDist) continue;

          const nx = dx / distance;
          const ny = dy / distance;
          const overlap = (minDist - distance) / 2;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          const relative = ((b.vx - a.vx) * nx) + ((b.vy - a.vy) * ny);
          if (relative < 0) {
            const impulse = relative * 0.82;
            a.vx += impulse * nx;
            a.vy += impulse * ny;
            b.vx -= impulse * nx;
            b.vy -= impulse * ny;
          }
        }
      }
    }

    kick(clientX, clientY) {
      const localX = clientX - this.bounds.left;
      const localY = clientY - this.bounds.top;
      this.states.forEach((state) => {
        const dx = state.x - localX;
        const dy = state.y - localY;
        const distance = Math.hypot(dx, dy);
        if (distance >= this.clickRadius || distance === 0) return;
        const force = ((this.clickRadius - distance) / this.clickRadius) * this.clickForce;
        const angle = Math.atan2(dy, dx);
        state.vx += Math.cos(angle) * force;
        state.vy += Math.sin(angle) * force;
      });
    }

    tick(now) {
      if (this.destroyed) return;
      const step = Math.min(2, ((now - this.lastTime) / 16.667) || 1);
      this.lastTime = now;

      this.states.forEach((state) => {
        state.vy += this.gravity * step;
        state.x += state.vx * step;
        state.y += state.vy * step;

        state.vx *= 0.998;
        state.vy *= 0.998;

        const speed = Math.hypot(state.vx, state.vy);
        if (speed > this.maxSpeed) {
          const factor = this.maxSpeed / speed;
          state.vx *= factor;
          state.vy *= factor;
        }

        if (state.x - state.radius < 0) {
          state.x = state.radius;
          state.vx = Math.abs(state.vx) * this.damping;
        } else if (state.x + state.radius > this.bounds.width) {
          state.x = this.bounds.width - state.radius;
          state.vx = -Math.abs(state.vx) * this.damping;
        }

        if (state.y - state.radius < 0) {
          state.y = state.radius;
          state.vy = Math.abs(state.vy) * this.damping;
        } else if (state.y + state.radius > this.bounds.height) {
          state.y = this.bounds.height - state.radius;
          state.vy = -Math.abs(state.vy) * this.damping;
        }

        this.collideWithObstacles(state);
      });

      this.collideWithObjects();
      this.states.forEach((state) => {
        state.el.style.transform = `translate3d(${state.x - state.radius}px, ${state.y - state.radius}px, 0)`;
      });

      this.frame = requestAnimationFrame((t) => this.tick(t));
    }
  }

  const init = (scope = document) => {
    scope.querySelectorAll('[data-ned-bouncy-overlay]').forEach((root) => {
      const id = root.dataset.sectionId || root.id;
      if (!id || sections.has(id)) return;
      const instance = new NewEraBouncyOverlay(root);
      sections.set(id, instance);
      instance.start();
    });
  };

  const teardownBySectionId = (sectionId) => {
    const instance = sections.get(sectionId);
    if (!instance) return;
    instance.stop();
    sections.delete(sectionId);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', (event) => init(event.target));
  document.addEventListener('shopify:section:unload', (event) => teardownBySectionId(event.detail.sectionId));
})();
