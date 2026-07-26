(() => {
  const STOP_WORDS = new Set(['a', 'an', 'and', 'are', 'can', 'do', 'for', 'how', 'i', 'is', 'it', 'me', 'my', 'of', 'on', 'the', 'to', 'what', 'with', 'you']);
  const TOKEN_ALIASES = {
    about: ['overview', 'studio'],
    ai: ['assistant', 'chatbot', 'aether'],
    branding: ['brand', 'identity'],
    build: ['fabricate', 'manufacture', 'create'],
    company: ['business', 'studio'],
    cost: ['price', 'pricing', 'budget', 'fee'],
    graphics: ['design', 'visual'],
    job: ['career', 'employment', 'hire'],
    logo: ['identity', 'brand'],
    navigation: ['wayfinding', 'direction'],
    signs: ['signage', 'sign'],
    store: ['retail', 'shopify'],
  };

  const normalize = (value = '') => value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens = (value) => normalize(value)
    .split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

  const stem = (token) => {
    if (token.length > 5 && token.endsWith('ing')) return token.slice(0, -3);
    if (token.length > 4 && token.endsWith('ed')) return token.slice(0, -2);
    if (token.length > 4 && token.endsWith('s')) return token.slice(0, -1);
    return token;
  };

  const expandedTokens = (value) => [...new Set(tokens(value).flatMap((token) => [token, ...(TOKEN_ALIASES[token] || [])]))];

  const isNearMatch = (left, right) => {
    if (left === right) return true;
    if (left.length < 5 || right.length < 5 || Math.abs(left.length - right.length) > 1) return false;
    let changes = 0;
    for (let i = 0, j = 0; i < left.length && j < right.length;) {
      if (left[i] === right[j]) {
        i += 1;
        j += 1;
      } else if (++changes > 1) {
        return false;
      } else if (left.length > right.length) {
        i += 1;
      } else if (right.length > left.length) {
        j += 1;
      } else {
        i += 1;
        j += 1;
      }
    }
    return true;
  };

  class AetherAssistant {
    constructor(root) {
      this.root = root;
      this.launcher = root.querySelector('[data-aether-launcher]');
      this.panel = root.querySelector('[data-aether-panel]');
      this.bubble = root.querySelector('[data-aether-bubble]');
      this.closeButton = root.querySelector('[data-aether-close]');
      this.messages = root.querySelector('[data-aether-messages]');
      this.questions = root.querySelector('[data-aether-questions]');
      this.form = root.querySelector('[data-aether-form]');
      this.input = root.querySelector('[data-aether-input]');
      this.knowledge = this.readKnowledge();
      this.open = false;
      this.nudgeTimer = null;
      this.bubbleTimer = null;
      this.lastBubble = '';

      if (!this.launcher || !this.panel || !this.knowledge) return;
      this.bind();
      this.seedConversation();
      this.scheduleNudge();
      if (this.knowledge.bubbleEnabled !== false) {
        this.scheduleBubble(Number(this.knowledge.bubbleDelay) || 3000);
      }
    }

    readKnowledge() {
      const source = this.root.querySelector('[data-aether-knowledge]');
      if (!source) return null;
      try {
        return JSON.parse(source.textContent);
      } catch (error) {
        console.warn('Aether knowledge could not be read.', error);
        return null;
      }
    }

    bind() {
      this.launcher.addEventListener('click', (event) => {
        if (this.wasDragged) {
          this.wasDragged = false;
          return;
        }
        this.setOpen(!this.open);
      });
      this.closeButton?.addEventListener('click', () => this.setOpen(false));
      this.bubble?.addEventListener('click', () => this.setOpen(true));
      this.form?.addEventListener('submit', (event) => this.handleSubmit(event));
      this.questions?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-aether-question]');
        if (!button) return;
        const entry = this.knowledge.items[Number(button.dataset.index)];
        if (entry) this.answer(entry.question, entry);
      });

      this.handleKeydown = (event) => {
        if (event.key === 'Escape' && this.open) this.setOpen(false);
      };
      document.addEventListener('keydown', this.handleKeydown);

      if (this.root.dataset.enableDrag !== 'false') {
        this.initDrag();
      }
      if (this.root.dataset.enableFlying !== 'false') {
        this.initFlyingScroll();
      }
    }

    initDrag() {
      const handle = this.launcher;
      if (!handle) return;
      let startX = 0, startY = 0;
      let offsetX = this.currentOffsetX || 0;
      let offsetY = this.currentOffsetY || 0;
      let dragging = false;
      this.wasDragged = false;

      const onPointerDown = (e) => {
        if (e.target.closest('[data-aether-close]') || e.target.closest('input')) return;
        dragging = true;
        this.wasDragged = false;
        startX = e.clientX;
        startY = e.clientY;
        this.root.classList.add('is-dragging');
        try { handle.setPointerCapture(e.pointerId); } catch (err) {}
      };

      const onPointerMove = (e) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          this.wasDragged = true;
        }
        const nextX = offsetX + dx;
        const nextY = offsetY + dy;

        this.root.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      };

      const onPointerUp = (e) => {
        if (!dragging) return;
        dragging = false;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        offsetX += dx;
        offsetY += dy;
        this.currentOffsetX = offsetX;
        this.currentOffsetY = offsetY;
        this.root.classList.remove('is-dragging');
        try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
      };

      handle.addEventListener('pointerdown', onPointerDown);
      handle.addEventListener('pointermove', onPointerMove);
      handle.addEventListener('pointerup', onPointerUp);
      handle.addEventListener('pointercancel', onPointerUp);
    }

    initFlyingScroll() {
      let lastScrollY = window.scrollY;
      let scrollTimer = null;
      window.addEventListener('scroll', () => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        if (Math.abs(delta) > 3) {
          this.root.classList.add('is-flying');
          const petStage = this.root.querySelector('.aether-assistant__pet-stage');
          if (petStage) {
            const tilt = Math.min(18, Math.max(-18, delta * 0.4));
            const translateY = Math.min(14, Math.max(-14, delta * 0.25));
            petStage.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${tilt}deg)`;
          }
          window.clearTimeout(scrollTimer);
          scrollTimer = window.setTimeout(() => {
            this.root.classList.remove('is-flying');
            const petStage = this.root.querySelector('.aether-assistant__pet-stage');
            if (petStage) petStage.style.transform = '';
          }, 240);
        }
      }, { passive: true });
    }

    seedConversation() {
      this.addMessage(this.knowledge.greeting, 'assistant');
      this.renderQuestions(this.contextualEntries());
    }

    setOpen(nextOpen) {
      this.open = nextOpen;
      this.root.classList.toggle('is-open', nextOpen);
      this.root.classList.remove('has-bubble');
      window.clearTimeout(this.bubbleTimer);
      this.panel.hidden = !nextOpen;
      this.launcher.setAttribute('aria-expanded', String(nextOpen));

      if (nextOpen) {
        window.setTimeout(() => this.input?.focus(), 220);
      } else {
        this.launcher.focus();
        if (this.knowledge.bubbleEnabled !== false) this.scheduleBubble(5200);
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      const question = this.input?.value.trim();
      if (!question) return;
      const entry = this.findBestEntry(question);
      this.input.value = '';
      this.answer(question, entry);
    }

    answer(question, entry) {
      this.addMessage(question, 'visitor');
      this.root.classList.add('is-thinking');

      window.setTimeout(() => {
        this.root.classList.remove('is-thinking');
        if (entry) {
          this.addMessage(entry.answer, 'assistant', entry);
          this.renderQuestions(this.relatedEntries(entry));
        } else {
          this.addMessage(this.knowledge.fallback, 'assistant', this.knowledge.contact);
          this.renderQuestions(this.contextualEntries());
        }
      }, 320);
    }

    findBestEntry(question, allowCompound = true) {
      const phrase = normalize(question);
      const queryTokens = expandedTokens(question);
      if (!queryTokens.length) return null;

      if (allowCompound) {
        const segments = phrase.split(/\b(?:and|also|plus)\b|[,;&/]/).map((part) => part.trim()).filter(Boolean);
        const segmentMatches = segments
          .map((segment) => this.findBestEntry(segment, false))
          .filter((entry, index, entries) => entry && entries.findIndex((candidate) => candidate.id === entry.id) === index);

        if (segmentMatches.length > 1) {
          return {
            question,
            answer: segmentMatches.slice(0, 3).map((entry) => entry.answer).join('\n\n'),
            keywords: segmentMatches.map((entry) => entry.keywords || '').join(' '),
            category: segmentMatches[0].category,
            url: '/pages/contact',
            linkLabel: 'Discuss the full scope',
          };
        }
      }

      let best = null;
      let bestScore = 0;

      this.knowledge.items.forEach((entry) => {
        const questionText = normalize(entry.question);
        const keywordText = normalize(entry.keywords || '');
        const haystack = `${questionText} ${keywordText} ${normalize(entry.category || '')}`;
        const questionTokens = expandedTokens(questionText);
        const entryTokens = expandedTokens(haystack);
        const entryTokenSet = new Set(entryTokens);
        let score = 0;

        if (phrase === questionText) score += 14;
        else if (phrase.length > 5 && questionText.includes(phrase)) score += 7;
        if (entry.category && phrase.includes(normalize(entry.category))) score += 2;

        queryTokens.forEach((token) => {
          if (questionTokens.includes(token)) score += 4;
          else if (questionTokens.some((candidate) => stem(candidate) === stem(token))) score += 3;
          else if (entryTokenSet.has(token)) score += 2;
          else if (entryTokens.some((candidate) => stem(candidate) === stem(token))) score += 1.5;
          else if (entryTokens.some((candidate) => isNearMatch(candidate, token))) score += 1;
          else if (haystack.includes(token)) score += 1;
        });

        const coverage = queryTokens.filter((token) => entryTokens.some((candidate) => stem(candidate) === stem(token) || isNearMatch(candidate, token))).length;
        score += coverage / queryTokens.length;

        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      });

      const threshold = queryTokens.length === 1 ? 3.5 : 4;
      if (bestScore < threshold) return null;
      return best;
    }

    contextualEntries() {
      const path = normalize(window.location.pathname.replaceAll('/', ' '));
      return [...this.knowledge.items]
        .sort((a, b) => this.contextScore(b, path) - this.contextScore(a, path))
        .slice(0, 4);
    }

    contextScore(entry, path) {
      if (!path) return 0;
      return tokens(`${entry.question} ${entry.keywords || ''}`)
        .reduce((score, token) => score + (path.includes(token) ? 1 : 0), 0);
    }

    relatedEntries(current) {
      const currentTokens = new Set(tokens(`${current.question} ${current.keywords || ''}`));
      return this.knowledge.items
        .filter((entry) => entry !== current)
        .map((entry) => ({
          entry,
          score: tokens(`${entry.question} ${entry.keywords || ''}`)
            .reduce((sum, token) => sum + (currentTokens.has(token) ? 1 : 0), 0),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(({ entry }) => entry);
    }

    addMessage(text, speaker, entry = null) {
      if (!text || !this.messages) return;
      const message = document.createElement('div');
      message.className = `aether-assistant__message aether-assistant__message--${speaker}`;
      message.textContent = text;

      if (entry?.url && entry?.linkLabel) {
        const link = document.createElement('a');
        link.href = entry.url;
        link.textContent = entry.linkLabel;
        if (/^https?:\/\//.test(entry.url)) link.rel = 'noopener noreferrer';
        message.append(document.createElement('br'), link);
      }

      this.messages.append(message);
      this.messages.scrollTop = this.messages.scrollHeight;
    }

    renderQuestions(entries) {
      if (!this.questions) return;
      this.questions.replaceChildren();
      entries.forEach((entry) => {
        const index = this.knowledge.items.indexOf(entry);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'aether-assistant__question';
        button.dataset.aetherQuestion = '';
        button.dataset.index = String(index);
        button.textContent = entry.question;
        this.questions.append(button);
      });
    }

    scheduleNudge() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      window.clearTimeout(this.nudgeTimer);
      this.nudgeTimer = window.setTimeout(() => {
        if (!this.open) {
          this.root.classList.add('is-nudging');
          window.setTimeout(() => this.root.classList.remove('is-nudging'), 700);
        }
        this.scheduleNudge();
      }, 6500 + Math.round(Math.random() * 4500));
    }

    scheduleBubble(delay = 9000 + Math.round(Math.random() * 7000)) {
      const options = String(this.knowledge.bubbleMessages || '')
        .split(/\r?\n|\|/)
        .map((message) => message.trim())
        .filter(Boolean);
      if (!this.bubble || !options.length || this.open) return;

      window.clearTimeout(this.bubbleTimer);
      this.bubbleTimer = window.setTimeout(() => {
        const available = options.filter((message) => message !== this.lastBubble);
        const pool = available.length ? available : options;
        const message = pool[Math.floor(Math.random() * pool.length)];
        this.lastBubble = message;
        this.bubble.textContent = message;
        this.root.classList.add('has-bubble');

        window.setTimeout(() => {
          this.root.classList.remove('has-bubble');
          this.scheduleBubble();
        }, Number(this.knowledge.bubbleDuration) || 5000);
      }, delay);
    }
  }

  const boot = (scope = document) => {
    scope.querySelectorAll('[data-aether-assistant]:not([data-aether-ready])').forEach((root) => {
      root.dataset.aetherReady = 'true';
      new AetherAssistant(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => boot());
  } else {
    boot();
  }

  document.addEventListener('shopify:section:load', (event) => boot(event.target));
})();
