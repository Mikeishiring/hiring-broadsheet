import type { EditorialPageDefinition } from '../model/page.ts'

function createSvgDataUrl(markup: string): string {
  return `data:image/svg+xml,${encodeURIComponent(markup)}`
}

// Podcast microphone with sound waves — source material icon
const MICROPHONE_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect x="85" y="40" width="30" height="60" rx="15" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.6"/>' +
    '<path d="M70 80 Q70 115 100 115 Q130 115 130 80" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.5"/>' +
    '<line x1="100" y1="115" x2="100" y2="140" stroke="#c9a84c" stroke-width="1.5" opacity="0.5"/>' +
    '<line x1="80" y1="140" x2="120" y2="140" stroke="#c9a84c" stroke-width="1.5" opacity="0.4"/>' +
    '<path d="M140 55 Q155 55 155 70" fill="none" stroke="#d97757" stroke-width="1" opacity="0.3"/>' +
    '<path d="M145 45 Q165 45 165 70" fill="none" stroke="#d97757" stroke-width="1" opacity="0.2"/>' +
    '<path d="M150 35 Q175 35 175 70" fill="none" stroke="#d97757" stroke-width="1" opacity="0.15"/>' +
    '<circle cx="100" cy="70" r="4" fill="#d97757" opacity="0.7"/>' +
    '</svg>',
)

// Handshake / partnership — trusted advisor icon
const HANDSHAKE_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<path d="M40 100 L70 80 L100 95 L130 80 L160 100" fill="none" stroke="#c9a84c" stroke-width="2" opacity="0.5"/>' +
    '<circle cx="70" cy="80" r="5" fill="#c9a84c" opacity="0.4"/>' +
    '<circle cx="130" cy="80" r="5" fill="#c9a84c" opacity="0.4"/>' +
    '<circle cx="100" cy="95" r="6" fill="#d97757" opacity="0.6"/>' +
    '<path d="M60 105 L85 120 L100 110 L115 120 L140 105" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.35"/>' +
    '<rect x="35" y="88" width="20" height="24" rx="3" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '<rect x="145" y="88" width="20" height="24" rx="3" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '<line x1="80" y1="60" x2="80" y2="75" stroke="#c9a84c" stroke-width="1" opacity="0.2"/>' +
    '<line x1="120" y1="60" x2="120" y2="75" stroke="#c9a84c" stroke-width="1" opacity="0.2"/>' +
    '</svg>',
)

// Funnel / filter — talent density icon
const DENSITY_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<path d="M50 50 L150 50 L115 100 L115 145 L85 145 L85 100 Z" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.5"/>' +
    '<circle cx="70" cy="40" r="4" fill="#c9a84c" opacity="0.25"/>' +
    '<circle cx="90" cy="35" r="3" fill="#c9a84c" opacity="0.3"/>' +
    '<circle cx="115" cy="38" r="3.5" fill="#c9a84c" opacity="0.2"/>' +
    '<circle cx="135" cy="42" r="3" fill="#c9a84c" opacity="0.25"/>' +
    '<circle cx="100" cy="30" r="4" fill="#d97757" opacity="0.5"/>' +
    '<circle cx="95" cy="75" r="3" fill="#d97757" opacity="0.6"/>' +
    '<circle cx="105" cy="85" r="2.5" fill="#c9a84c" opacity="0.4"/>' +
    '<circle cx="100" cy="130" r="4" fill="#d97757" opacity="0.8"/>' +
    '<line x1="50" y1="55" x2="150" y2="55" stroke="#c9a84c" stroke-width="0.5" opacity="0.2"/>' +
    '</svg>',
)

// Compass / direction — influence & leadership icon
const COMPASS_SVG_DATA_URL = createSvgDataUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<circle cx="100" cy="100" r="60" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.4"/>' +
    '<circle cx="100" cy="100" r="40" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.25"/>' +
    '<polygon points="100,55 108,92 100,100 92,92" fill="#d97757" opacity="0.6"/>' +
    '<polygon points="100,145 92,108 100,100 108,108" fill="#c9a84c" opacity="0.4"/>' +
    '<polygon points="55,100 92,92 100,100 92,108" fill="#c9a84c" opacity="0.35"/>' +
    '<polygon points="145,100 108,108 100,100 108,92" fill="#c9a84c" opacity="0.35"/>' +
    '<circle cx="100" cy="100" r="4" fill="#d97757" opacity="0.8"/>' +
    '<line x1="100" y1="35" x2="100" y2="45" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '<line x1="100" y1="155" x2="100" y2="165" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '<line x1="35" y1="100" x2="45" y2="100" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '<line x1="155" y1="100" x2="165" y2="100" stroke="#c9a84c" stroke-width="1" opacity="0.3"/>' +
    '</svg>',
)

const SOURCE_MATERIAL_BODY = `In a recent episode of Offer Accepted, Shannon Ogborn sat down with Adam Ward, founding partner of Growth by Design Talent, to explore what it really means to be a trusted adviser in recruiting. The conversation landed at a time when leaner teams are juggling more roles and more inbound, and recruiters are getting less face time with hiring managers. Ward, whose career arc includes early recruiting leadership at Facebook through its IPO and scaling the function at Pinterest from two hundred to two thousand employees, has been thinking about this question for the better part of two decades. What emerged from their dialogue is a practical framework for how recruiting leaders can earn their seat at the executive table, and why the stakes have never been higher. The central argument is deceptively simple. Recruiting organizations tend to fall into one of two categories: service providers or trusted advisers. A service provider gets handed a headcount number at the beginning of the year and goes to work filling it. The influence and decision-making sit with the hiring manager alone, and the recruiting team is essentially shepherding a process. A trusted adviser, by contrast, is in the room helping shape the plan. They are bringing data about capacity and market conditions, surfacing challenges before they become crises, and co-owning the outcome with the business. The difference is not about titles or organizational charts. It is about how the recruiting function shows up in conversations that matter. Ward identifies four attributes that distinguish trusted advisers from service providers, and they form a coherent system rather than a checklist. The first is influencing with data. Not simply having dashboards or metrics, but the ability to synthesize, organize, and visualize information into a compelling narrative. A service provider reports numbers. A trusted adviser tells a story with those numbers, one that makes visible the gap between what the business wants and what the recruiting function can deliver, along with three concrete options for closing that gap. The data becomes a lever for conversation, not just a report card. The second attribute is market insight. Trusted advisers maintain formal and informal networks of peers in other companies and organizations. They use these relationships to bring real-time benchmarking data and competitive intelligence to their leaders. This is not about attending conferences or reading industry reports. It is about having the kind of relationships where you can pick up the phone and ask what someone is seeing in the market right now, and getting an honest answer. The third is shared accountability, which Ward frames as the difference between recruiting owning the hiring goal alone versus the business sharing that goal equally. If recruiting is the only function that gets rewarded or penalized when hiring targets are hit or missed, the organization is treating it as a service provider by definition. Shared accountability means the outcomes cascade into both the recruiting team and the business unit leaders, and both are measured in the same cadence and the same format as every other key business goal. The fourth is relationship building, though Ward frames it in a way that challenges the conventional understanding. Being a business leader first and a talent leader second means approaching every conversation through the lens of how recruiting can help the business succeed, not how the business can make recruiting's job easier. This is not about being defensive of the team or protective of the function. In fact, Ward observes that recruiting leaders who are overly defensive of their teams often plateau at the director level because other leaders begin to see them as staffing organizations rather than strategic partners. The practical implications cascade through the entire team. When a recruiting leader operates as a trusted adviser, their individual contributors mirror that curiosity about the business. Sourcers and recruiters who understand how the company makes money, who have spent time shadowing engineers or sitting with the sales team, recruit differently. They are more credible with candidates and more effective with hiring managers. And strategically, a trusted adviser has access to planning conversations early enough to resource their team ahead of demand rather than scrambling to catch up after the headcount number drops. Ward shared a pointed example from his time at Pinterest. When the company decided to invest heavily in monetization, the recruiting team was handed a number rather than being part of the planning conversation. Had they been in a trusted adviser position, they would have known months in advance that H1 would require a significant ramp-up in sales hiring, and they could have started building pipeline and contingency plans accordingly. The cost of being a service provider is not just organizational. It is deeply personal. The conversation reveals how the gap between service provider and trusted adviser maps onto individual career trajectories, and how the instinct to be liked rather than respected can hold leaders back from making the transition.`

const TRUSTED_ADVISOR_BODY = `The distinction between a service provider and a trusted adviser is one of those ideas that sounds obvious until you try to make it operational. Most recruiting leaders would tell you they aspire to be trusted advisers. Very few have articulated what that actually requires, let alone built the organizational infrastructure to sustain it. Adam Ward and his team at Growth by Design have distilled it into four attributes, and the framework has held up because it addresses not just what a trusted adviser does differently, but why the shift is structurally difficult. The first attribute is influencing with data, and the emphasis should fall on the word influencing rather than the word data. Most recruiting teams have data. They have dashboards showing time to fill, pipeline velocity, offer acceptance rates, and source of hire breakdowns. The problem is not the absence of information. It is the absence of narrative. A service provider sends a weekly report. A trusted adviser walks into a room and says: if you want twenty SDRs in the building by end of Q1, here is the work it will take, here is the gap in our current capacity, and here are three options for closing that gap. The data is the same. The framing is entirely different. One is a report card. The other is a business conversation. The distinction matters because executives do not make decisions based on data. They make decisions based on stories that are supported by data. A finance leader who presents quarterly results does not simply read numbers off a spreadsheet. They construct a narrative about what happened, why it happened, and what it means for the next quarter. A sales leader presenting pipeline does the same thing. Recruiting leaders who want to operate at the same level need to develop the same skill, and it does not come naturally to people whose training has been in process management and candidate experience. The skill is synthesis. It is the ability to take disparate data points and weave them into a coherent story that leads to a clear recommendation. The second attribute, market insight, is less about what you know and more about who you know. Ward describes a trusted adviser as someone who maintains a network of peers in other companies that they can tap for real-time benchmarking data. This is not the kind of insight you get from compensation surveys published once a year. It is the kind of intelligence that comes from a phone call to a peer at a comparable company who can tell you what they are seeing in their engineering pipeline this month, or what offer acceptance rates look like in their market right now. Building this network takes years and requires genuine reciprocity. You have to be willing to share your own data and insights as openly as you ask for theirs. The third attribute, shared accountability, is where the framework gets uncomfortable. Ward is explicit: if recruiting alone holds the goal for hiring, the organization is operating in service provider mode regardless of what anyone says about strategic partnership. Shared accountability means that when the hiring target is missed, it is not recruiting's failure. It is the business unit's failure and recruiting's failure jointly, because they were jointly responsible for the outcome. This sounds reasonable in theory, but implementing it requires structural changes that many organizations resist. It means reporting hiring progress in the same format and cadence as revenue or product milestones. It means cascading hiring goals into business unit leaders' performance reviews. It means the CEO or executive team treating a miss on hiring with the same urgency as a miss on revenue. Where shared accountability breaks down most often is at the line manager level. Individual hiring decisions are made by hiring managers, and if there is not a clear set of manager effectiveness expectations, the accountability framework has no teeth. Ward emphasizes that manager effectiveness in hiring is rarely defined, rarely measured, and rarely consequential. Managers who consistently make poor hiring decisions or who drag their feet on interviews or who refuse to give timely feedback to candidates face no consequences. Until that changes, shared accountability remains aspirational. The fourth attribute is building relationships as a business leader first and a talent leader second. The nuance here is important. It is not simply about being friendly or building rapport. It is about approaching every interaction with the question: how can recruiting help the business succeed? This requires understanding the business at a depth that most recruiting leaders do not invest in. It means knowing how the company makes money, understanding the product roadmap, being able to speak credibly about engineering challenges or go-to-market strategy. When a recruiting leader shows up with that level of business fluency, the conversation changes. They stop being the person who fills roles and start being the person who helps build the company. Ward makes a subtle but important observation about the dark side of this attribute. Recruiting leaders who are overly protective of their team often do so out of good intentions. They want to shield their recruiters from unreasonable demands, unclear requirements, or moving targets. But other functions read this protectiveness as a lack of objectivity. The trusted adviser is someone who can be critical of their own team when the situation warrants it, who can acknowledge when recruiting has dropped the ball, and who can hold their team to the same standard they expect from the business. This does not mean throwing the team under the bus. It means demonstrating the same even-handed judgment about recruiting's performance that a CFO would apply to the finance team or a CTO would apply to engineering.`

const TALENT_DENSITY_BODY = `There is a concept gaining traction in executive conversations that goes by the name of talent density, and it is worth unpacking because it reveals something important about how companies think about hiring quality across different market conditions. Adam Ward describes talent density as essentially quality of hire viewed through the lens of a lower volume hiring environment. In a high-volume environment, quality of hire is the familiar worry: we are hiring fast, and we are afraid we are lowering the bar to meet a number. In a low-volume environment, the anxiety inverts. There are more referrals, more inbound, potentially more qualified candidates competing for fewer openings. The question becomes: how do we know we are seeing the entire market and hiring the truly best person when we have the luxury of being selective? The answer, according to Ward, starts well before the first candidate conversation. It starts with what industrial-organizational psychologists call job analysis, and what most companies skip because it feels like overhead. Job analysis is the systematic study of the actual employees doing the job today. Not what the job description says they should be doing, but what they actually do, day by day, decision by decision. What does success look like in practice? What are the specific cognitive operations, not general competencies but actual observable behaviors, that distinguish strong performers from adequate ones? What transferable skills predict success in this role, as opposed to the proxy signals that happen to correlate with the backgrounds of people already on the team? Larger companies with dedicated people science functions do this rigorously, and the results are striking. When you know precisely what you are looking for, the entire upstream process becomes sharper. Your sourcing strategy improves because you know which signal to hunt for. Your outreach messaging improves because you can speak to the specific challenges of the role. Your interview questions improve because they are designed to elicit evidence of the exact capabilities you have identified. And your inter-rater reliability improves because interviewers are evaluating the same dimensions against the same rubric, rather than each bringing their own mental model of what good looks like. For smaller companies that do not have the resources for formal job analysis, Ward suggests a lighter-weight version that still captures the essential benefit. The starting point is the intake conversation between recruiter and hiring manager, and the goal is to push past the generic. Most intake conversations produce a list of requirements that could describe dozens of roles: strong communication skills, collaborative, detail-oriented, five-plus years of experience. These are not requirements. They are platitudes. A good intake conversation gets specific about the work. What will this person be doing in their first thirty days? What decisions will they need to make independently? What does a failed hire in this role look like, and what specifically went wrong? These questions force the hiring manager to think concretely about the job rather than abstractly about the ideal candidate, and that concreteness is what makes everything downstream more effective. The payoff extends to the assessment process. When you know the specific competencies you are testing for, you can design structured interview questions with rubrics that map directly to those competencies. Each interviewer has a defined focus area, a set of questions calibrated to that area, and a rubric that specifies what strong, adequate, and weak responses look like for each dimension. The result is not just a more predictive process but a faster one, because you are not wasting interview slots on redundant signals. Where companies get into trouble, Ward observes, is when they skip this front-end work because they want to move fast. The irony is that skipping the scoping creates more work downstream, not less. When the role is poorly defined, interviews generate ambiguous signals. Ambiguous signals lead to indecisive debriefs. Indecisive debriefs lead to additional interview rounds. Additional rounds slow the process, frustrate candidates, and increase the probability that the best candidates accept competing offers while you are deliberating. The recruiting debt accumulates silently until it manifests as a reset: new recruiting leadership, new tools, new processes, all at significant cost. Ward also addresses a common organizational response to quality anxiety: the introduction of speed bumps and safety nets. Bar raiser programs, hiring committees, executive review of every offer or candidate packet. These interventions exist because leaders do not trust the process, and they represent an interesting design choice. You can fix individual decisions by adding checkpoints, or you can fix the system by making everyone better at hiring. The checkpoint approach scales poorly because it creates bottlenecks, concentrates decision-making in a few individuals, and sends a message to hiring managers that their judgment is not trusted. The systemic approach, investing in clear role scoping, structured assessments, interviewer training, and calibration against outcomes, scales indefinitely because it distributes capability across the organization. Ward frames this as an early design decision for companies. What culture do you want to create around talent? If you want a culture where every manager is a competent, calibrated hiring decision-maker, you have to invest in building that capability. If you default to adding safety nets, you are implicitly accepting that most managers will never be good at hiring, and you are designing your organization around that assumption. The assumption tends to become self-fulfilling. The practical implication for recruiting teams is clear: invest in the intake. Do not skip the scoping because you are trying to save time. Every hour spent getting specific about what you are looking for saves multiple hours downstream in cleaner sourcing, tighter screening, faster interviews, and more decisive debriefs. The compound return on that investment is one of the few reliable arbitrages in talent acquisition.`

const LEADING_WITH_INFLUENCE_BODY = `There is a moment in every recruiting leader's career where they face a choice they may not recognize as a choice. Someone with authority and budget tells them to hire two hundred people. The natural instinct, especially for someone drawn to recruiting because they love people and want to help, is to say great and start planning. Adam Ward describes how this instinct, which feels like helpfulness, is actually the moment where trusted advisers and service providers diverge. The leader who says great and scrambles to figure it out is optimizing for being liked. The leader who pauses and says here is what the data tells us about our capacity, here is what the market looks like, here are the tradeoffs we need to discuss is optimizing for being respected. Over a career, these two paths lead to very different places. Ward is candid about learning this the hard way. Early in his career, he felt the pull to agree in the room. The pattern was predictable: agree to the number, go back to the desk, panic about how to deliver. What changed over time was the realization that pushing back with data and insight did not damage the relationship. It strengthened it. The more confidence he had in his craft, the more clearly and crisply he could frame the situation, the more meetings he was invited to, the more information he received, and the more successful his team became. The dynamic maps onto a broader truth about organizational influence that recruiting leaders rarely discuss explicitly. Being liked and being respected are not the same thing, and they are not even on the same axis. Being liked is about making people comfortable. Being respected is about demonstrating competence, judgment, and the willingness to hold a position when you believe it is right. Ward observes that many recruiting leaders have what the CliftonStrengths framework calls Woo as a top strength: the love of meeting new people, winning them over, making connections. It is a genuine asset in recruiting, but it carries a shadow side. The need to be liked can make it difficult to deliver hard messages, push back on unrealistic expectations, or hold firm when a hiring manager wants to move forward with a candidate who does not meet the bar. The overcorrection is equally dangerous. When leaders recognize that agreeableness is holding them back, they sometimes swing too far in the other direction, becoming curt, defensive, or combative. Ward describes this as the dark side of the strength. Under pressure, the person who is naturally warm and accommodating can flip to a style that feels abrasive precisely because it is so far from their natural register. The skill is not choosing between being liked and being respected. It is understanding that respect creates the conditions for a different kind of liking, one based on credibility rather than pleasantness. Ward extends this into a practical framework for how to build influence with different stakeholders, and the framework has application well beyond recruiting. He identifies three influencing styles: rational, social, and emotional. Rational influencers respond to logic, data, and structured argumentation. They want to see the numbers. They want to understand the tradeoffs. They negotiate based on evidence. Social influencers are relationship-driven. They respond to rapport, to being consulted, to feeling that their expertise is valued. The most effective approach with a social influencer is to ask for their advice, to position them as an expert, to build the relationship before making the ask. Emotional influencers are values-driven. They respond to appeals that connect to what they care about personally, to modeling the behavior you want to see, to framing requests in terms of principles rather than pragmatics. The insight is not that one style is better than another. It is that most people default to their own preferred style when trying to influence others, and this is a mistake. The recruiting leader whose natural style is social will try to build rapport with a rational CFO, and the CFO will wonder why they are not getting to the point. The leader whose natural style is rational will lead with data when talking to a values-driven founder, and the founder will feel like the conversation is missing something important. Effective influence requires diagnosing the other person's style and adapting your approach accordingly. Ward recommends actually mapping out your key stakeholders and their influencing styles before going into critical conversations. This extends to team building as well. Ward observes that early hiring managers tend to hire people who are shades of themselves. The recruiting leader with high Woo hires a team of high-Woo recruiters, and the result is a team that is great at building rapport but may struggle with the analytical rigor or direct communication that trusted adviser status requires. The better approach is to think about the team as a puzzle, deliberately seeking complementary strengths rather than reinforcing your own. The implications for career development are significant. The recruiting leaders who advance beyond the director level are not necessarily the most likeable or the most technically skilled. They are the ones who have developed the judgment to know when to push back and when to align, who can read a room and adapt their communication style, who can be critical of their own team without being disloyal, and who understand that the respect of their peers is a more durable asset than their affection. The path is not about suppressing the natural warmth that drew you to recruiting in the first place. It is about adding a layer of strategic thinking on top of it, so that the warmth serves the business rather than just the relationship.`

export const sourceMaterialPage: EditorialPageDefinition = {
  id: 'source-material',
  name: 'The Source',
  instructions: 'Read mode. The original conversation that sparked these insights.',
  content: {
    headline: 'THE SOURCE MATERIAL',
    credit: 'Adam Ward & Shannon Ogborn — Offer Accepted',
    bodyText: SOURCE_MATERIAL_BODY,
    pullQuote:
      'If recruiting gets handed a headcount number at the beginning of the year, you might be a service provider. If recruiting is in the room helping shape the plan, you might be a trusted adviser.',
  },
  layout: {
    dropCapLines: 3,
    dropCapPadding: 8,
    pullQuote: {
      widthRatio: 0.50,
      yRatio: 0.38,
      lineHeight: 26,
      paddingV: 12,
      paddingH: 16,
    },
    draggableRect: {
      width: 160,
      height: 120,
      label: 'source',
      anchor: { xRatio: 0.85, yRatio: 0.52 },
      horizontalPadding: 12,
      verticalPadding: 8,
    },
    circle: {
      radius: 55,
      label: 'insight',
      anchor: { xRatio: 0.68, yRatio: 0.75 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
    image: {
      src: MICROPHONE_SVG_DATA_URL,
      width: 125,
      height: 125,
      anchor: { xRatio: 0.28, yRatio: 0.62 },
      horizontalPadding: 12,
      verticalPadding: 6,
    },
  },
}

export const trustedAdvisorPage: EditorialPageDefinition = {
  id: 'trusted-advisor',
  name: 'Trusted Advisor',
  instructions: 'Read mode. The four attributes that separate trusted advisers from service providers.',
  content: {
    headline: 'THE TRUSTED ADVISOR',
    credit: 'Synthesized from Adam Ward — Growth by Design',
    bodyText: TRUSTED_ADVISOR_BODY,
    pullQuote:
      'Shared accountability means when the hiring target is missed, it is not recruiting\'s failure alone. It is the business unit\'s failure and recruiting\'s failure jointly.',
  },
  layout: {
    dropCapLines: 4,
    dropCapPadding: 10,
    pullQuote: {
      widthRatio: 0.48,
      yRatio: 0.50,
      lineHeight: 26,
      paddingV: 14,
      paddingH: 18,
    },
    draggableRect: {
      width: 165,
      height: 145,
      label: 'partnership',
      anchor: { xRatio: 0.86, yRatio: 0.35 },
      horizontalPadding: 12,
      verticalPadding: 10,
    },
    circle: {
      radius: 62,
      label: 'trust',
      anchor: { xRatio: 0.25, yRatio: 0.80 },
      horizontalPadding: 16,
      verticalPadding: 10,
    },
    image: {
      src: HANDSHAKE_SVG_DATA_URL,
      width: 135,
      height: 135,
      anchor: { xRatio: 0.75, yRatio: 0.70 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
  },
}

export const talentDensityPage: EditorialPageDefinition = {
  id: 'talent-density',
  name: 'Talent Density',
  instructions: 'Read mode. How structured hiring and job analysis drive quality at any scale.',
  content: {
    headline: 'TALENT DENSITY',
    credit: 'Synthesized from Adam Ward — Growth by Design',
    bodyText: TALENT_DENSITY_BODY,
    pullQuote:
      'Every hour spent getting specific about what you are looking for saves multiple hours downstream in cleaner sourcing, tighter screening, and more decisive debriefs.',
  },
  layout: {
    dropCapLines: 3,
    dropCapPadding: 8,
    pullQuote: {
      widthRatio: 0.52,
      yRatio: 0.44,
      lineHeight: 26,
      paddingV: 12,
      paddingH: 16,
    },
    draggableRect: {
      width: 175,
      height: 135,
      label: 'quality',
      anchor: { xRatio: 0.84, yRatio: 0.58 },
      horizontalPadding: 12,
      verticalPadding: 8,
    },
    circle: {
      radius: 68,
      label: 'density',
      anchor: { xRatio: 0.72, yRatio: 0.22 },
      horizontalPadding: 14,
      verticalPadding: 10,
    },
    image: {
      src: DENSITY_SVG_DATA_URL,
      width: 130,
      height: 130,
      anchor: { xRatio: 0.18, yRatio: 0.55 },
      horizontalPadding: 12,
      verticalPadding: 6,
    },
  },
}

export const leadingWithInfluencePage: EditorialPageDefinition = {
  id: 'leading-with-influence',
  name: 'Leading with Influence',
  instructions: 'Read mode. Why respect outperforms likeability and the three styles of influence.',
  content: {
    headline: 'LEADING WITH INFLUENCE',
    credit: 'Synthesized from Adam Ward — Growth by Design',
    bodyText: LEADING_WITH_INFLUENCE_BODY,
    pullQuote:
      'Being liked is not a pathway to getting respect. Getting respect can be a pathway to also being liked, which is a very different thing.',
  },
  layout: {
    dropCapLines: 3,
    dropCapPadding: 10,
    pullQuote: {
      widthRatio: 0.46,
      yRatio: 0.40,
      lineHeight: 26,
      paddingV: 14,
      paddingH: 16,
    },
    draggableRect: {
      width: 155,
      height: 150,
      label: 'respect',
      anchor: { xRatio: 0.82, yRatio: 0.48 },
      horizontalPadding: 12,
      verticalPadding: 10,
    },
    circle: {
      radius: 58,
      label: 'influence',
      anchor: { xRatio: 0.30, yRatio: 0.76 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
    image: {
      src: COMPASS_SVG_DATA_URL,
      width: 140,
      height: 140,
      anchor: { xRatio: 0.72, yRatio: 0.68 },
      horizontalPadding: 14,
      verticalPadding: 8,
    },
  },
}

export const synthesisPages: readonly EditorialPageDefinition[] = [
  sourceMaterialPage,
  trustedAdvisorPage,
  talentDensityPage,
  leadingWithInfluencePage,
]
