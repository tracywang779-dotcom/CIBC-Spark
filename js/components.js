/* Spark — shared partials (SPEC.md Section 4, DESIGN_SYSTEM 5.3).
   Skeleton versions: structurally correct, lightly styled. Phase 2 refines look. */

/* Top navigation bar. Present on every page EXCEPT login.html and index.html
   (Landing). Links: Home / Trust Center / Explore / Workflows + avatar -> profile.
   activeKey marks the current link: 'home' | 'trust-center' | 'explore' | 'workflows'. */
function renderSparkLogo(href = 'index.html', extraClass = '') {
  const className = extraClass ? `spark-logo ${extraClass}` : 'spark-logo';
  return `<a href="${href}" class="${className}">
    <img src="assets/logo.svg" alt="" width="20" height="20" class="spark-logo__mark" aria-hidden="true" />
    <span class="spark-logo__text">Spark</span>
  </a>`;
}

function renderNav(activeKey) {
  const user = getCurrentUser();
  const initials = user ? user.avatarInitials : '?';

  const links = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'trust-center', label: 'Trust Center', href: 'trust-center.html' },
    { key: 'explore', label: 'Explore', href: 'explore.html' },
    { key: 'workflows', label: 'Workflows', href: 'workflows.html' }
  ];

  const linksHtml = links
    .map((link) => {
      const isActive = link.key === activeKey;
      const activeClass = isActive ? ' spark-nav__link--active' : '';
      return `<a href="${link.href}" class="spark-nav__link${activeClass}">${link.label}</a>`;
    })
    .join('');

  return `
    <nav class="spark-nav">
      <div class="spark-container spark-nav__inner">
        ${renderSparkLogo('index.html')}
        <div class="spark-nav__links">${linksHtml}</div>
        <a href="profile.html" class="spark-nav__avatar" aria-label="My Profile" title="My Profile">${initials}</a>
      </div>
    </nav>
  `;
}

function renderFooter() {
  return `
    <footer class="spark-footer">
      <div class="spark-container spark-footer__inner">
        Spark &mdash; clickable prototype for CIBC. All AI outputs are mocked.
      </div>
    </footer>
  `;
}

/* Mounts the nav into an element with id="nav" and footer into id="footer",
   if present. Pages call mountChrome('home') after the auth guard. */
function mountChrome(activeKey) {
  const navEl = document.getElementById('nav');
  if (navEl) navEl.innerHTML = renderNav(activeKey);
  const footerEl = document.getElementById('footer');
  if (footerEl) footerEl.innerHTML = renderFooter();
}

const WORKFLOW_ROLES = [
  { id: 'reconciliation', label: 'Reconciliation Analyst', family: 'reconciliation' },
  { id: 'email-approval', label: 'Approval Processor', family: 'email-approval' }
];

const CONFIDENCE_LABELS = {
  high: '🟢 High confidence — likely reliable. Quick scan before use.',
  medium: '🟡 Medium confidence — plausible, but parts need a structured check.',
  low: '🔴 Low confidence — uncertain. Human review required before this leaves your hands.'
};

const CONFIDENCE_SHORT = {
  high: '🟢 High',
  medium: '🟡 Medium',
  low: '🔴 Low'
};

function renderConfidencePill(level, short = false) {
  const label = short ? CONFIDENCE_SHORT[level] : CONFIDENCE_LABELS[level];
  if (!label) return '';
  return `<span class="confidence-pill confidence-pill--${level}" role="status">${label}</span>`;
}

function getRoleLabelForFamily(family) {
  const role = WORKFLOW_ROLES.find((item) => item.family === family);
  return role ? role.label : family;
}

function getUserByName(name) {
  return Object.values(SPARK_DATA.users).find((user) => user.name === name) || null;
}

function getAuthorRole(authorName) {
  const user = getUserByName(authorName);
  return user ? user.role : 'employee';
}

function getWorkflowById(workflows, workflowId) {
  return workflows.find((wf) => wf.id === workflowId) || null;
}

function enrichPeerCase(peerCase, workflows, commentsByCase) {
  const workflow = getWorkflowById(workflows, peerCase.workflowId);
  const caseComments = commentsByCase[peerCase.id] || [];
  const confidence = peerCase.confidence || (workflow ? workflow.mockConfidence : 'medium');
  return {
    ...peerCase,
    confidence,
    workflowName: peerCase.workflowName || (workflow ? workflow.name : peerCase.workflowId),
    roleLabel: workflow ? getRoleLabelForFamily(workflow.family) : 'Operational',
    authorRole: peerCase.authorRole || getAuthorRole(peerCase.author),
    commentCount: caseComments.length,
    hasManagerComment: caseComments.some((c) => c.role === 'manager')
  };
}

function renderManagerBadge() {
  return '<span class="manager-badge" aria-label="Manager comment">Manager</span>';
}

function renderEmptyState(message, options = {}) {
  const icon = options.icon || '&#128221;';
  const actionHtml = options.actionHtml || '';
  return `
    <div class="empty-state-block">
      <div class="empty-state-block__icon" aria-hidden="true">${icon}</div>
      <p class="empty-state-block__text">${message}</p>
      ${actionHtml}
    </div>
  `;
}

function showSuccessBanner(message, options = {}) {
  const targetId = options.targetId || null;
  const autoDismissMs = options.autoDismissMs ?? 4000;
  let banner = targetId ? document.getElementById(targetId) : null;

  if (banner) {
    const textEl = banner.querySelector('.success-banner__text');
    if (textEl) {
      textEl.textContent = message;
    } else if (!banner.querySelector('span')) {
      banner.textContent = message;
    }
  } else {
    banner = document.createElement('div');
    banner.className = 'success-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `<span aria-hidden="true">&#10003;</span><span class="success-banner__text">${message}</span>`;
    const main = document.querySelector('main');
    if (main) main.insertBefore(banner, main.firstChild);
  }

  banner.classList.remove('panel-hidden');
  if (options.hideClass) banner.classList.remove(options.hideClass);
  banner.classList.add('success-banner--visible', 'visible');

  const dismiss = () => {
    banner.classList.remove('success-banner--visible', 'visible');
    if (options.hideClass) banner.classList.add(options.hideClass);
  };

  banner.onclick = dismiss;
  clearTimeout(showSuccessBanner._timer);
  showSuccessBanner._timer = setTimeout(dismiss, autoDismissMs);
}

function showToast(message) {
  let toast = document.getElementById('spark-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'spark-toast';
    toast.className = 'spark-toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('spark-toast--visible');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove('spark-toast--visible');
  }, 2400);
}

function renderRoleTag(role) {
  const label = role === 'manager' ? 'Manager' : 'Employee';
  return `<span class="tag">${label}</span>`;
}

function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text || '';
  return `${text.slice(0, maxLength).trim()}…`;
}

function countPromptUsage(peerCases, workflowId, prompt) {
  const normalized = (prompt || '').trim().toLowerCase();
  return peerCases.filter(
    (c) => c.workflowId === workflowId && (c.prompt || '').trim().toLowerCase() === normalized
  ).length;
}

function formatDisplayDate(iso) {
  if (!iso) return '';
  const date = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`);
  return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

const PROGRESSION_STAGES = [
  {
    id: 'beginner',
    label: 'Beginner',
    framing: 'You\u2019re getting started. Your goal is to feel safe trying.'
  },
  {
    id: 'daily-user',
    label: 'Daily User',
    framing: 'AI is part of your weekly rhythm. Most employees stop here, and that\u2019s the goal.'
  },
  {
    id: 'ai-expert',
    label: 'AI Expert',
    framing: 'You\u2019ve gone deeper. Optional, for the curious.'
  },
  {
    id: 'ai-champion',
    label: 'AI Champion',
    framing: 'You help others learn. Optional, for those who want to.'
  }
];

const PROGRESSION_THRESHOLDS = {
  beginner: [0, 3],
  'daily-user': [3, 12],
  'ai-expert': [12, 25],
  'ai-champion': [25, 40]
};

function getUserWorkflowFamily(user) {
  if ((user.title || '').toLowerCase().includes('approval')) return 'email-approval';
  return 'reconciliation';
}

function formatTimeSaved(minutes) {
  if (!minutes) return '0m';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function getProfileStats(user) {
  const runtime = getRuntime();
  const runtimeCases = (runtime.newPeerCases || []).filter((item) => item.author === user.name);
  const base = user.wins || {
    timeSavedMinutes: 0,
    tasksCompleted: 0,
    promptsContributed: 0,
    ideasPosted: 0
  };

  const addedMinutes = runtimeCases.reduce((sum, item) => sum + (item.timeSavedMinutes || 0), 0);
  const addedCount = runtimeCases.length;

  return {
    timeSavedMinutes: base.timeSavedMinutes + addedMinutes,
    tasksCompleted: base.tasksCompleted + addedCount,
    promptsContributed: base.promptsContributed + addedCount,
    ideasPosted: base.ideasPosted
  };
}

function getProgressionView(user, stats) {
  const stageId = user.progressionStage || 'beginner';
  const stageIndex = Math.max(0, PROGRESSION_STAGES.findIndex((stage) => stage.id === stageId));
  const stage = PROGRESSION_STAGES[stageIndex] || PROGRESSION_STAGES[0];
  const [min, max] = PROGRESSION_THRESHOLDS[stage.id] || [0, 1];
  const span = Math.max(max - min, 1);
  const intra = Math.min(1, Math.max(0, (stats.tasksCompleted - min) / span));
  const progressPercent = Math.min(100, ((stageIndex + intra) / 3) * 100);
  const nextStage = PROGRESSION_STAGES[stageIndex + 1];
  const note = nextStage
    ? `You\u2019re at ${stage.label}. ${stage.framing}`
    : stage.framing;

  return { stage, stageIndex, progressPercent, note, stages: PROGRESSION_STAGES };
}

const CHAMPION_CROWN_SVG = '<svg class="champion-reward-icon champion-reward-icon--crown" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 19h20v2H2v-2zm2.2-2h15.6l-2.4-7.2-3.2 3.6L12 8.5 9.8 13.4 6.6 9.8 4.2 17z"/></svg>';
const CHAMPION_TROPHY_SVG = '<svg class="champion-reward-icon champion-reward-icon--trophy" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 3h8v2a4 4 0 01-8 0V3zm-3 3h14a5 5 0 01-4.9 5.1A6.5 6.5 0 0012 18.5 6.5 6.5 0 005.9 11.1 5 5 0 015 6zm2 13h10l-1 3H8l-1-3z"/></svg>';
const CHAMPION_CROWN_HERO_SVG = '<svg class="champion-reward-hero__icon" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 19h20v2H2v-2zm2.2-2h15.6l-2.4-7.2-3.2 3.6L12 8.5 9.8 13.4 6.6 9.8 4.2 17z"/></svg>';
const CHAMPION_TROPHY_HERO_SVG = '<svg class="champion-reward-hero__icon" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 3h8v2a4 4 0 01-8 0V3zm-3 3h14a5 5 0 01-4.9 5.1A6.5 6.5 0 0012 18.5 6.5 6.5 0 005.9 11.1 5 5 0 015 6zm2 13h10l-1 3H8l-1-3z"/></svg>';
const CHAMPION_REWARD_BULLET_SVG = '<svg class="champion-reward-popover__bullet-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 3h8v2a4 4 0 01-8 0V3zm-3 3h14a5 5 0 01-4.9 5.1A6.5 6.5 0 0012 18.5 6.5 6.5 0 005.9 11.1 5 5 0 015 6zm2 13h10l-1 3H8l-1-3z"/></svg>';

function getChampionRewardState(user) {
  const unlocked = (user.progressionStage || 'beginner') === 'ai-champion';
  return { unlocked };
}

function renderChampionStageLabel(stage, isActive, user) {
  const activeClass = isActive ? ' active' : '';
  const { unlocked } = getChampionRewardState(user);
  const triggerClass = unlocked ? 'champion-reward-trigger--unlocked' : 'champion-reward-trigger--locked';
  return `<span class="progression-stage${activeClass}">${stage.label}<button type="button" class="champion-reward-trigger ${triggerClass}" id="champion-reward-trigger" aria-expanded="false" aria-controls="champion-reward-popover" aria-label="AI Champion rewards"><span class="champion-reward-trigger__icons">${CHAMPION_CROWN_SVG}${CHAMPION_TROPHY_SVG}</span></button></span>`;
}

function renderChampionRewardPopover(user, rewardCopy) {
  if (!rewardCopy) return '';
  const { unlocked } = getChampionRewardState(user);
  const rewardItems = [rewardCopy.digital, ...(rewardCopy.material || [])];
  const rewardList = rewardItems
    .map((item) => `<li class="champion-reward-popover__item">${CHAMPION_REWARD_BULLET_SVG}<span>${item}</span></li>`)
    .join('');

  const celebrateBlock = unlocked
    ? '<button type="button" class="champion-reward-celebrate" id="champion-reward-celebrate">Congratulations</button>'
    : '<p class="champion-reward-popover__locked">Reach AI Champion to unlock this recognition. Optional, for those who want to.</p>';

  return `
    <div class="champion-reward-popover panel-hidden${unlocked ? ' champion-reward-popover--unlocked' : ''}" id="champion-reward-popover" role="dialog" aria-labelledby="champion-reward-title">
      <div class="champion-reward-popover__hero">
        <div class="champion-reward-hero__icons" aria-hidden="true">${CHAMPION_CROWN_HERO_SVG}${CHAMPION_TROPHY_HERO_SVG}</div>
        ${celebrateBlock}
      </div>
      <div class="champion-reward-popover__body">
        <h3 class="champion-reward-popover__title" id="champion-reward-title">${rewardCopy.title}</h3>
        <ul class="champion-reward-popover__list">${rewardList}</ul>
        <p class="champion-reward-popover__disclaimer">${rewardCopy.disclaimer}</p>
      </div>
    </div>`;
}

function launchChampionFireworks(originEl) {
  if (!originEl) return;
  const popover = originEl.closest('.champion-reward-popover');
  if (!popover) return;

  const burst = document.createElement('div');
  burst.className = 'champion-fireworks';
  burst.setAttribute('aria-hidden', 'true');

  const colors = ['#C8102E', '#F59E0B', '#FCD34D', '#F97316', '#EAB308'];
  const particleCount = 28;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'champion-fireworks__particle';
    const angle = (360 / particleCount) * i + (Math.random() * 16 - 8);
    const distance = 36 + Math.random() * 52;
    const size = 4 + Math.random() * 5;
    particle.style.setProperty('--angle', `${angle}deg`);
    particle.style.setProperty('--distance', `${distance}px`);
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--color', colors[i % colors.length]);
    particle.style.setProperty('--delay', `${Math.random() * 0.12}s`);
    burst.appendChild(particle);
  }

  popover.appendChild(burst);
  originEl.classList.add('champion-reward-celebrate--active');
  setTimeout(() => {
    burst.remove();
    originEl.classList.remove('champion-reward-celebrate--active');
  }, 1100);
}

function getWhatsNextSuggestions(user, data, dismissedIds) {
  const dismissed = new Set(dismissedIds || []);
  const suggestions = [];
  const family = getUserWorkflowFamily(user);
  const myWorkflowIds = new Set(
    data.peerCases.filter((item) => item.author === user.name).map((item) => item.workflowId)
  );

  const untriedWorkflow = data.workflows.find(
    (workflow) => workflow.family === family && !myWorkflowIds.has(workflow.id)
  ) || data.workflows.find((workflow) => !myWorkflowIds.has(workflow.id));

  if (untriedWorkflow) {
    suggestions.push({
      id: `wf-${untriedWorkflow.id}`,
      label: 'Workflow to try',
      title: untriedWorkflow.name,
      description: untriedWorkflow.summary,
      href: `workflow-detail.html?id=${untriedWorkflow.id}`
    });
  }

  suggestions.push({
    id: 'skill-prompt-basics',
    label: 'Skill Lab exercise',
    title: 'Prompt tuning basics',
    description: 'Rewrite a vague prompt into something verifiable.',
    href: 'skill-lab.html'
  });

  const peerCase = data.peerCases
    .map((item) => enrichPeerCase(item, data.workflows, data.comments))
    .find((item) => {
      if (item.author === user.name) return false;
      const workflow = getWorkflowById(data.workflows, item.workflowId);
      return workflow && workflow.family === family;
    }) || data.peerCases.find((item) => item.author !== user.name);

  if (peerCase) {
    suggestions.push({
      id: `case-${peerCase.id}`,
      label: 'Peer Case to read',
      title: peerCase.title,
      description: `${peerCase.author} · ${peerCase.upvotes || 0} upvotes`,
      href: `case-detail.html?id=${peerCase.id}`
    });
  }

  const idea = [...data.ideas]
    .filter((item) => item.author !== user.name)
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))[0];

  if (idea) {
    suggestions.push({
      id: `idea-${idea.id}`,
      label: 'Idea to weigh in on',
      title: idea.title,
      description: `${idea.upvotes || 0} upvotes · share your view in Ideas Lab`,
      href: 'ideas-lab.html'
    });
  }

  return suggestions.filter((item) => !dismissed.has(item.id));
}

function getProfileDismissedIds() {
  try {
    const raw = sessionStorage.getItem('spark_profile_dismissed');
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function dismissProfileSuggestion(id) {
  const dismissed = getProfileDismissedIds();
  if (dismissed.includes(id)) return dismissed;
  const next = [...dismissed, id];
  sessionStorage.setItem('spark_profile_dismissed', JSON.stringify(next));
  return next;
}
