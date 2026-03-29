import type { EditorialPageDefinition } from '../model/page.ts'

function createSvgDataUrl(markup: string): string {
  return `data:image/svg+xml,${encodeURIComponent(markup)}`
}

// Signal radar — concentric rings with scattered dots representing noise vs signal
const RADAR_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<circle cx="100" cy="100" r="80" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '<circle cx="100" cy="100" r="55" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.4"/>' +
    '<circle cx="100" cy="100" r="30" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.5"/>' +
    '<circle cx="65" cy="72" r="3" fill="#c9a84c" opacity="0.25"/>' +
    '<circle cx="140" cy="88" r="3" fill="#c9a84c" opacity="0.2"/>' +
    '<circle cx="82" cy="130" r="3" fill="#c9a84c" opacity="0.2"/>' +
    '<circle cx="120" cy="55" r="3" fill="#c9a84c" opacity="0.25"/>' +
    '<circle cx="155" cy="115" r="3" fill="#c9a84c" opacity="0.15"/>' +
    '<circle cx="98" cy="96" r="5" fill="#d97757" opacity="0.85"/>' +
    '<line x1="100" y1="100" x2="100" y2="20" stroke="#c9a84c" stroke-width="1.5" opacity="0.5"/>' +
    '</svg>',
)

// Blueprint grid — architectural interview structure
const BLUEPRINT_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">' +
    '<rect x="30" y="30" width="160" height="160" fill="none" stroke="#5a8fb8" stroke-width="1.5" opacity="0.4"/>' +
    '<line x1="30" y1="90" x2="190" y2="90" stroke="#5a8fb8" stroke-width="1" opacity="0.3"/>' +
    '<line x1="30" y1="150" x2="190" y2="150" stroke="#5a8fb8" stroke-width="1" opacity="0.3"/>' +
    '<line x1="90" y1="30" x2="90" y2="190" stroke="#5a8fb8" stroke-width="1" opacity="0.3"/>' +
    '<line x1="150" y1="30" x2="150" y2="190" stroke="#5a8fb8" stroke-width="1" opacity="0.3"/>' +
    '<circle cx="60" cy="60" r="12" fill="#5a8fb8" opacity="0.15"/>' +
    '<circle cx="120" cy="120" r="18" fill="#5a8fb8" opacity="0.2"/>' +
    '<circle cx="170" cy="60" r="8" fill="#9dc7de" opacity="0.3"/>' +
    '<path d="M40 170 L80 170 L80 180 L40 180 Z" fill="#5a8fb8" opacity="0.25"/>' +
    '</svg>',
)

// Scale/balance — calibration metaphor
const SCALE_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<line x1="100" y1="40" x2="100" y2="160" stroke="#6d8f67" stroke-width="2" opacity="0.5"/>' +
    '<line x1="40" y1="80" x2="160" y2="100" stroke="#6d8f67" stroke-width="2" opacity="0.6"/>' +
    '<circle cx="100" cy="40" r="6" fill="#6d8f67" opacity="0.7"/>' +
    '<path d="M30 80 Q40 65 50 80 L50 95 Q40 100 30 95 Z" fill="#6d8f67" opacity="0.4"/>' +
    '<path d="M150 100 Q160 85 170 100 L170 115 Q160 120 150 115 Z" fill="#d8c57a" opacity="0.5"/>' +
    '<circle cx="40" cy="82" r="4" fill="#d8c57a" opacity="0.6"/>' +
    '<circle cx="160" cy="102" r="4" fill="#6d8f67" opacity="0.6"/>' +
    '<circle cx="160" cy="102" r="2" fill="#d8c57a" opacity="0.9"/>' +
    '<rect x="90" y="155" width="20" height="8" rx="2" fill="#6d8f67" opacity="0.4"/>' +
    '</svg>',
)

const SIGNAL_PROBLEM_BODY = `Most hiring processes are optimized for the wrong signals. They measure confidence instead of competence, articulation instead of insight, and pattern-matching instead of problem-solving. The result is a system that reliably selects for people who are good at interviewing, which is a skill almost entirely orthogonal to the work itself. Consider what a typical screening call actually tests. A recruiter spends thirty minutes assessing whether the candidate sounds polished, gives crisp answers about their career trajectory, and demonstrates enthusiasm for the role. These are all proxies. They tell you whether someone has practiced their narrative, not whether they can do the job. The best engineer I ever hired stumbled through our first conversation, circled back to correct herself twice, and paused for uncomfortable silences while thinking. She was filtering signal from noise in real time, the exact skill we needed, and almost got screened out because the process was tuned to reward fluency over depth. This is the signal problem: the metrics we use to evaluate candidates are measuring the wrong thing, and worse, we rarely check. In medicine, a diagnostic test that produces this many false positives would be pulled from the market. In hiring, we just keep doing it, because the feedback loop is so slow and diffuse that nobody connects the hiring decision to the outcome. The gap between what we think we are measuring and what we are actually measuring is the central pathology of modern hiring. Take the case of resume screening. Most hiring managers will tell you they are looking for evidence of impact, ownership, and technical depth. What they are actually doing is pattern-matching against a mental template: right school, right companies, right keywords, right trajectory. This template is shaped by who they have previously hired, which means it self-reinforces. If your last three successful hires came from the same background, that background starts to look like a requirement rather than a coincidence. The signal is contaminated by survivorship bias before the first interview even begins. Structured interviews were supposed to fix this, and they help, but not as much as people think. The research shows that structured interviews predict job performance better than unstructured ones, which is true but sets a low bar. The correlation between structured interview scores and actual job performance hovers around 0.44 to 0.51, depending on the meta-analysis you prefer. That means roughly seventy-five percent of the variance in job performance is unexplained by the interview. We are making consequential decisions about people's lives and our organizations' futures with a tool that captures about a quarter of the relevant information. The deeper issue is that most organizations never close the loop. They make a hire, the person starts, and the hiring team moves on to the next opening. Nobody goes back six months later to compare the interview signal against the actual performance signal. Nobody asks whether the questions they asked actually predicted anything. Nobody checks whether the rubric they used correlated with the outcomes they care about. Without this feedback, the system cannot learn. It just repeats, generating the same errors at the same rate, with the same confidence. There is a structural reason why hiring stays bad despite the obvious costs. The people who make hiring decisions rarely bear the consequences directly. The hiring manager who makes a bad call does not personally absorb the six months of wasted salary, the team disruption, the opportunity cost of the person you did not hire. These costs are distributed across the organization and over time, making them nearly invisible to the decision-maker. Meanwhile, the costs of a rigorous hiring process are immediate and personal: it takes longer, it requires more effort, it means saying no to candidates who seem fine. The incentives are arranged against improvement. What would a signal-first hiring process look like? It would start by defining, in writing and before seeing any candidates, exactly what evidence would change your mind about a person's ability to do this specific job. Not their general impressiveness, not their culture fit, not their career arc, but their ability to do the concrete work. It would then design every stage of the process to generate that specific evidence and nothing else. A good signal-first process treats every interview question like a scientific instrument. You would not use a thermometer to measure weight. You should not use a behavioral question to assess technical judgment. Every question should have a defined signal it is trying to capture, a rubric for interpreting the response, and a track record of actually predicting the outcome you care about. If a question does not have these properties, it is not a question. It is theater. The hardest part is not designing the process. It is maintaining the discipline to follow it when a charismatic candidate walks in and makes everyone feel good. Humans are social primates. We are wired to trust people who make us feel comfortable, who mirror our values, who tell stories that resonate with our experience. These are powerful instincts, and they are almost entirely uncorrelated with job performance. A signal-first process acknowledges this weakness and designs around it, the same way a pilot follows a checklist even though she knows how to fly.`

const INTERVIEW_ARCHITECTURE_BODY = `The word "process" makes people flinch in hiring because most interview processes feel like bureaucracy rather than craft. They are built by committee, accreted over time, and optimized for legal defensibility rather than predictive power. But there is nothing inherently bureaucratic about rigor. A well-designed interview process is an instrument of perception, a machine for seeing what is actually true about a person's capabilities. The first principle of interview architecture is that every stage should generate evidence that no other stage generates. This sounds obvious but almost no company actually does it. Most interview loops contain significant redundancy: the phone screen asks about technical background, then the on-site asks about technical background again, then the hiring manager asks about technical background a third time. Each conversation generates a marginally different impression of the same thing, which creates the illusion of multiple data points while actually producing a single, slightly noisy signal repeated three times. Genuine multi-signal architecture means that each stage tests a different dimension of the candidate. If the phone screen assesses technical communication, the technical round should assess problem-decomposition under ambiguity, and the system design round should assess architectural taste and tradeoff reasoning. None of these should overlap. The panel debrief should then weigh independent signals from independent assessors, not three people's feelings about the same thing. The second principle is that the evaluation criteria must be defined before the candidate walks in, and they must be specific to the role, not generic. A rubric that says "strong technical skills" is useless because it means different things to different people. A rubric that says "candidate correctly identified the memory bottleneck in the system design prompt within ten minutes and proposed at least two viable solutions with explicit tradeoff analysis" is an instrument. You can calibrate it. You can check whether interviewers agree on what they are seeing. You can compare it against outcomes. Most companies resist this specificity because it requires actually knowing what the job demands, which is harder than it sounds. It means sitting down with the people who do the work, watching them do it, and identifying the specific cognitive operations that distinguish good performance from mediocre performance. This is ethnographic work, not HR work, and it takes time. But without it, you are guessing. You are designing an interview for a job you have not actually observed. The third principle is calibration, the systematic comparison of interview assessments against actual performance outcomes. This is where almost every organization fails, not out of negligence but out of structural difficulty. Calibration requires tracking what interviewers said, what the hire decision was, and how the person actually performed over the following year. It requires sample sizes large enough to be statistically meaningful, which means most teams will need to pool data across roles and time periods. And it requires the willingness to discover that your favorite interview question, the one you have been asking for five years, has zero predictive validity. Most interviewers have never received this feedback. They carry a mental model of what "good" looks like that was formed by their first few hires and never updated. Some interviewers are dramatically better than others at identifying talent, and nobody knows who they are because nobody measures it. This is like running a hospital where no one tracks which surgeons have better outcomes. The organizational cost is enormous and invisible. A properly calibrated interview loop can be remarkably efficient. When you know which questions actually predict performance, you can compress the process without losing signal. Some of the best hiring organizations in the world use shorter interview loops than average because every minute is generating real information. The length of your process is not a proxy for its rigor. A four-hour interview that asks the same question four different ways is less rigorous than a ninety-minute interview that tests three orthogonal dimensions with validated instruments. Work samples are the most underused tool in interview architecture. The research consistently shows that structured work samples are among the strongest predictors of job performance, stronger than cognitive ability tests alone and far stronger than unstructured interviews. Yet most companies either skip them entirely or implement them poorly, asking candidates to complete a take-home exercise with no rubric, no standardization, and no calibration against outcomes. A well-designed work sample takes a real problem the team has solved in the past, strips it of proprietary context, and asks the candidate to solve it under conditions that approximate the actual work environment. The key is fidelity. The closer the sample is to the real work, the more predictive it becomes. A whiteboard algorithm puzzle has low fidelity for most engineering roles because nobody writes algorithms on a whiteboard at work. A three-hour pairing session on a real codebase has high fidelity because it closely mirrors the actual daily experience. The architecture of the debrief matters as much as the architecture of the interviews. Research on group decision-making shows that the first person to speak in a debrief anchors everyone else's assessment. If the most senior person says "strong hire" before others have shared their independent evaluations, the debrief is contaminated. The fix is structural: require written, independent evaluations before the debrief begins. The debrief itself should be a calibration exercise, not a consensus exercise. The goal is not to reach agreement but to surface disagreement and understand what it means.`

const CALIBRATION_GAP_BODY = `There is a number that most hiring managers do not know about themselves, and it matters more than almost anything else in their professional lives. That number is their hit rate: the percentage of their hiring decisions that produce genuinely strong performers. Most managers estimate their hit rate at somewhere between seventy and eighty-five percent. The actual figure, when organizations bother to measure it honestly, is closer to fifty. This gap between perceived and actual accuracy is the calibration gap, and it is the single largest unaddressed problem in organizational talent management. Calibration, in the precise sense, means the correspondence between your confidence in a judgment and the accuracy of that judgment. A well-calibrated interviewer who says "I am eighty percent sure this person will be a strong performer" should be right about eighty percent of the time. A poorly calibrated interviewer might say the same thing and be right only fifty percent of the time. The difference is invisible in any individual decision. It only shows up in the aggregate, over dozens or hundreds of hires, and most people never see their aggregate. This invisibility is what makes the calibration gap so persistent and so costly. Consider the asymmetry of feedback in hiring. When you hire someone and they succeed, you get positive reinforcement for your decision. You feel validated. When you hire someone and they struggle, you attribute it to circumstances: the team changed, the role evolved, the market shifted. Very rarely do you trace the failure back to a specific flaw in your evaluation. And when you decline a candidate who would have been excellent, you never find out. This is the most pernicious asymmetry. Your misses are invisible, your hits are salient, and your interpretation of ambiguous cases leans toward self-affirmation. Under these conditions, calibration cannot improve. It drifts. Interviewers who have been making hiring decisions for twenty years are not twenty years more calibrated than beginners. They are twenty years more confident, which is a very different thing. The research on expert calibration outside of hiring is sobering. Studies of clinical psychologists show that their diagnostic confidence increases with experience while their diagnostic accuracy does not. Studies of financial analysts show the same pattern. Experience without structured feedback produces overconfidence, not expertise. There is no reason to believe hiring is different, and considerable evidence to suggest it follows the same pattern. What makes calibration particularly difficult in hiring is that the outcome variable is itself noisy. Job performance is not a clean signal. It depends on the team, the manager, the market conditions, the specific projects assigned, and dozens of other factors that have nothing to do with the person's underlying capability. When a hire does not work out, it is genuinely hard to know whether the problem was a bad evaluation, a bad match, or bad luck. This noise is real, but it is also an excuse. Organizations that take calibration seriously find ways to work within it. They define clear performance benchmarks at the time of hire and measure against them. They track not just whether someone is still employed after a year but whether they are performing at the level the interview signal predicted. They build statistical models that account for environmental variance and still extract useful information about interviewer accuracy. The first step toward closing the calibration gap is simply making it visible. Most organizations could dramatically improve their hiring by doing one thing: tracking, for every hire, what each interviewer said, what they were confident about, and whether it turned out to be true. This data does not need to be perfect. It just needs to exist. Once it exists, patterns emerge quickly. You discover that one interviewer's "strong hire" recommendation predicts success seventy percent of the time while another's predicts it forty percent of the time. You discover that certain interview questions are essentially random number generators while others carry real signal. You discover that the team's collective assessment of "culture fit" has no correlation with retention or performance. These discoveries are uncomfortable, but they are the preconditions for improvement. Calibration sessions, where interviewers review their past assessments against actual outcomes, are one of the most effective interventions available. They work because they break the asymmetry of feedback. An interviewer who sees that three of their last five "strong hire" recommendations produced mediocre performers cannot maintain the illusion of accuracy. The discomfort is productive. It creates the conditions for genuine learning. The organizations that take calibration seriously, and they are still a small minority, report substantial improvements in hiring quality within twelve to eighteen months. The improvements come not from better interview questions or more structured rubrics, though those help, but from a cultural shift in how people think about their own judgment. When interviewers know they will be evaluated against outcomes, they become more careful, more humble, and more specific in their assessments. They stop saying "I liked her" and start saying "she demonstrated strong evidence of X, moderate evidence of Y, and I could not assess Z." The shift from impressionistic to evidentiary language is the leading indicator that calibration is improving. The ultimate aspiration is an organization where hiring decisions are treated with the same rigor as financial investments. No venture capital firm would fund a company based on a single partner's gut feeling after a pleasant dinner conversation. They have investment committees, structured due diligence, explicit thesis statements, and ruthless post-mortem analysis of their hits and misses. Yet most companies make hiring decisions, which are multi-hundred-thousand-dollar investments in uncertain outcomes, with less rigor than a Series A term sheet. The gap is not about intelligence or intention. It is about systems. Building the system is the work.`

export const signalProblemPage: EditorialPageDefinition = {
  id: 'signal-problem',
  name: 'The Signal Problem',
  instructions: 'Read mode. Explore how hiring processes optimize for the wrong signals.',
  content: {
    headline: 'THE SIGNAL PROBLEM',
    credit: 'Michael Williams',
    bodyText: SIGNAL_PROBLEM_BODY,
    pullQuote:
      'The gap between what we think we are measuring and what we are actually measuring is the central pathology of modern hiring.',
  },
  layout: {
    dropCapLines: 3,
    dropCapPadding: 8,
    pullQuote: {
      widthRatio: 0.52,
      yRatio: 0.42,
      lineHeight: 26,
      paddingV: 12,
      paddingH: 16,
    },
    draggableRect: {
      width: 170,
      height: 130,
      label: 'noise',
      anchor: { xRatio: 0.88, yRatio: 0.55 },
      horizontalPadding: 12,
      verticalPadding: 8,
    },
    circle: {
      radius: 60,
      label: 'signal',
      anchor: { xRatio: 0.7, yRatio: 0.78 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
    image: {
      src: RADAR_SVG_DATA_URL,
      width: 130,
      height: 130,
      anchor: { xRatio: 0.32, yRatio: 0.65 },
      horizontalPadding: 12,
      verticalPadding: 6,
    },
  },
}

export const interviewArchitecturePage: EditorialPageDefinition = {
  id: 'interview-architecture',
  name: 'Interview Architecture',
  instructions: 'Read mode. Explore how to design interviews that predict real job performance.',
  content: {
    headline: 'INTERVIEW ARCHITECTURE',
    credit: 'Michael Williams',
    bodyText: INTERVIEW_ARCHITECTURE_BODY,
    pullQuote:
      'A four-hour interview that asks the same question four different ways is less rigorous than a ninety-minute interview that tests three orthogonal dimensions.',
  },
  layout: {
    dropCapLines: 4,
    dropCapPadding: 10,
    pullQuote: {
      widthRatio: 0.50,
      yRatio: 0.55,
      lineHeight: 27,
      paddingV: 14,
      paddingH: 18,
    },
    draggableRect: {
      width: 155,
      height: 165,
      label: 'rubric',
      anchor: { xRatio: 0.85, yRatio: 0.3 },
      horizontalPadding: 10,
      verticalPadding: 10,
    },
    circle: {
      radius: 65,
      label: 'fidelity',
      anchor: { xRatio: 0.25, yRatio: 0.82 },
      horizontalPadding: 16,
      verticalPadding: 10,
    },
    image: {
      src: BLUEPRINT_SVG_DATA_URL,
      width: 145,
      height: 145,
      anchor: { xRatio: 0.78, yRatio: 0.72 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
  },
}

export const calibrationGapPage: EditorialPageDefinition = {
  id: 'calibration-gap',
  name: 'The Calibration Gap',
  instructions: 'Read mode. Explore why interviewers are rarely calibrated against outcomes.',
  content: {
    headline: 'THE CALIBRATION GAP',
    credit: 'Michael Williams',
    bodyText: CALIBRATION_GAP_BODY,
    pullQuote:
      'Interviewers who have been making hiring decisions for twenty years are not twenty years more calibrated. They are twenty years more confident, which is a very different thing.',
  },
  layout: {
    dropCapLines: 3,
    dropCapPadding: 12,
    pullQuote: {
      widthRatio: 0.46,
      yRatio: 0.36,
      lineHeight: 26,
      paddingV: 14,
      paddingH: 16,
    },
    draggableRect: {
      width: 180,
      height: 140,
      label: 'feedback',
      anchor: { xRatio: 0.82, yRatio: 0.62 },
      horizontalPadding: 12,
      verticalPadding: 10,
    },
    circle: {
      radius: 75,
      label: 'outcomes',
      anchor: { xRatio: 0.72, yRatio: 0.2 },
      horizontalPadding: 16,
      verticalPadding: 10,
    },
    image: {
      src: SCALE_SVG_DATA_URL,
      width: 140,
      height: 140,
      anchor: { xRatio: 0.15, yRatio: 0.52 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
  },
}

export const hiringPages: readonly EditorialPageDefinition[] = [
  signalProblemPage,
  interviewArchitecturePage,
  calibrationGapPage,
]
