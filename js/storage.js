/* Spark — localStorage wrapper + data merger.
   Runtime data lives under a single key, spark_runtime (SPEC.md Section 5.4).
   All pages read data via getMergedData() so anything created in one page is
   visible everywhere else (SPEC.md Section 5.5). */

const RUNTIME_KEY = 'spark_runtime';

const DEFAULT_RUNTIME = {
  currentUser: null,
  pledgeOverrides: {},
  newPeerCases: [],
  newComments: {},
  upvoteDeltas: {},
  upvotedCases: [],
  joinedPods: [],
  directorQuestions: [],
  journeyPoints: 0,
  skillLabCompleted: []
};

function getRuntime() {
  try {
    const raw = localStorage.getItem(RUNTIME_KEY);
    if (!raw) return { ...DEFAULT_RUNTIME };
    return { ...DEFAULT_RUNTIME, ...JSON.parse(raw) };
  } catch (error) {
    return { ...DEFAULT_RUNTIME };
  }
}

function setRuntime(runtime) {
  localStorage.setItem(RUNTIME_KEY, JSON.stringify(runtime));
}

function updateRuntime(patch) {
  const next = { ...getRuntime(), ...patch };
  setRuntime(next);
  return next;
}

const WORKFLOW_RUN_KEY = 'spark_workflow_run';

function saveWorkflowRun(run) {
  sessionStorage.setItem(WORKFLOW_RUN_KEY, JSON.stringify(run));
}

function getWorkflowRun() {
  try {
    const raw = sessionStorage.getItem(WORKFLOW_RUN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function clearWorkflowRun() {
  sessionStorage.removeItem(WORKFLOW_RUN_KEY);
}

function appendPeerCase(caseData) {
  const runtime = getRuntime();
  const newPeerCases = [...(runtime.newPeerCases || []), caseData];
  updateRuntime({ newPeerCases });
  return caseData;
}

function appendComment(caseId, comment) {
  const runtime = getRuntime();
  const newComments = { ...(runtime.newComments || {}) };
  newComments[caseId] = [...(newComments[caseId] || []), comment];
  updateRuntime({ newComments });
  return comment;
}

function upvoteCase(caseId) {
  const runtime = getRuntime();
  const upvotedCases = runtime.upvotedCases || [];
  if (upvotedCases.includes(caseId)) return false;
  const upvoteDeltas = { ...(runtime.upvoteDeltas || {}) };
  upvoteDeltas[caseId] = (upvoteDeltas[caseId] || 0) + 1;
  updateRuntime({ upvoteDeltas, upvotedCases: [...upvotedCases, caseId] });
  return true;
}

function hasUpvotedCase(caseId) {
  return (getRuntime().upvotedCases || []).includes(caseId);
}

function submitDirectorQuestion(question) {
  const runtime = getRuntime();
  const entry = {
    id: `director-q-${Date.now()}`,
    ...question,
    status: 'pending',
    createdAt: new Date().toISOString().slice(0, 10)
  };
  updateRuntime({ directorQuestions: [...(runtime.directorQuestions || []), entry] });
  return entry;
}

function getDirectorQuestions() {
  return getRuntime().directorQuestions || [];
}

function getStageBaselinePoints(user) {
  const baseline = {
    beginner: 1,
    'daily-user': 9,
    'ai-expert': 18,
    'ai-champion': 32
  };
  return baseline[user.progressionStage] || 0;
}

function getTotalJourneyPoints(user) {
  const runtime = getRuntime();
  return getStageBaselinePoints(user) + (runtime.journeyPoints || 0);
}

function addJourneyPoints(amount) {
  if (!amount) return getRuntime();
  const runtime = getRuntime();
  return updateRuntime({ journeyPoints: (runtime.journeyPoints || 0) + amount });
}

function isSkillLabExerciseComplete(exerciseId) {
  return (getRuntime().skillLabCompleted || []).includes(exerciseId);
}

function completeSkillLabExercise(exerciseId) {
  const runtime = getRuntime();
  const completed = runtime.skillLabCompleted || [];
  if (completed.includes(exerciseId)) return false;

  const exercise = SPARK_DATA.skillLabExercises.find((item) => item.id === exerciseId);
  const points = exercise ? exercise.points : 1;

  updateRuntime({
    skillLabCompleted: [...completed, exerciseId],
    journeyPoints: (runtime.journeyPoints || 0) + points
  });
  return true;
}

function getRecentWorkflowRuns(user, limit = 3) {
  const runtime = getRuntime();
  const fromRuntime = (runtime.newPeerCases || [])
    .filter((item) => item.author === user.name)
    .map((item) => ({
      name: item.workflowName,
      date: item.createdAt,
      confidence: item.confidence,
      timeSavedMinutes: item.timeSavedMinutes || 0
    }));

  const seeded = [
    { name: 'Discrepancy Explanation', date: '2026-07-01', confidence: 'high', timeSavedMinutes: 22 },
    { name: 'Email summary', date: '2026-06-25', confidence: 'medium', timeSavedMinutes: 18 },
    { name: 'Approval draft', date: '2026-06-23', confidence: 'high', timeSavedMinutes: 30 }
  ];

  return [...fromRuntime, ...seeded].slice(0, limit);
}

/* Returns seeded data with runtime overrides applied. Read-only snapshot —
   never mutate the returned object directly; write through the helpers above. */
function getMergedData() {
  const runtime = getRuntime();
  const merged = JSON.parse(JSON.stringify(SPARK_DATA));

  // Department pledge overrides (manager edits overwrite seeded text).
  Object.entries(runtime.pledgeOverrides || {}).forEach(([dept, override]) => {
    merged.pledges.departments[dept] = {
      ...(merged.pledges.departments[dept] || {}),
      ...override
    };
  });

  // Appended peer cases.
  merged.peerCases = [...merged.peerCases, ...(runtime.newPeerCases || [])];

  // Appended comments, keyed by case id.
  Object.entries(runtime.newComments || {}).forEach(([caseId, comments]) => {
    merged.comments[caseId] = [...(merged.comments[caseId] || []), ...comments];
  });

  // Upvote deltas applied to peer cases and ideas.
  const applyDelta = (item) => {
    const delta = runtime.upvoteDeltas?.[item.id];
    if (delta) item.upvotes = (item.upvotes || 0) + delta;
  };
  merged.peerCases.forEach(applyDelta);
  merged.ideas.forEach(applyDelta);

  // Joined PODs flag.
  merged.pods.forEach((pod) => {
    pod.joined = (runtime.joinedPods || []).includes(pod.id);
  });

  return merged;
}
