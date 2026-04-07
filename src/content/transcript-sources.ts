export interface TranscriptSegment {
  readonly timestamp: string
  readonly text: string
}

export interface TranscriptSource {
  readonly id: string
  readonly videoUrl: string
  readonly title: string
  readonly speaker: string
  readonly host: string
  readonly show: string
  readonly date?: string
  readonly segments: readonly TranscriptSegment[]
}

export const adamWardTranscript: TranscriptSource = {
  id: 'adam-ward-trusted-advisors',
  videoUrl: 'https://www.youtube.com/watch?v=8jKzmjIjqOA',
  title: 'Taking Recruiting Functions From Service Providers to Trusted Advisors',
  speaker: 'Adam Ward',
  host: 'Shannon Ogborn',
  show: 'Offer Accepted',
  date: '2024',
  segments: [
    {
      timestamp: '00:00:00',
      text: 'The starting point is helping realize that hiring is a business goal. It\'s a business outcome. Just like revenue or customer growth or customer experience or user percentage, whatever it might be, recruiting has to be one of those topline goals and measured. And when you get it put into that echelon, you get the treatment and visualization in the same way.',
    },
    {
      timestamp: '00:02:56',
      text: 'Companies are looking for a different level of partnership with their recruiting and talent leaders. Recruiting leaders and recruiting teams weren\'t prepared to show up at the same level of depth, accuracy, data, and insights that maybe sales or finance or engineering leaders have. And so this gap has been growing over time.',
    },
    {
      timestamp: '00:04:37',
      text: 'A service provider might be seen as a staffing organization, a wreck fulfillment operation where a lot of the influence and decision-making happens with the hiring manager alone and the recruiting team is really just shepherding a process. If recruiting gets handed a headcount number at the beginning of the year, you might be a service provider.',
    },
    {
      timestamp: '00:05:42',
      text: 'We\'ve really boiled it down to four key things that it takes to be able to make a talent leader a trusted adviser. The first is influence with data — not just leading with data, but the ability to synthesize, organize, and visualize the data into a compelling narrative.',
    },
    {
      timestamp: '00:07:09',
      text: 'A trusted advisor has a formal and informal network of peers and relationships that they can tap into to bring real-time insights and benchmarking data to the executive or to the leader.',
    },
    {
      timestamp: '00:07:33',
      text: 'Shared accountability means we have the same goal around making these hires. There\'s no scenario where we miss or make the goal and recruiting alone gets the rewards or the punishment. We\'re in it together. We\'re mutually aligned because the outcome is the same for us.',
    },
    {
      timestamp: '00:08:31',
      text: 'Hiring is a business goal. It\'s a business outcome. Just like revenue or customer growth, recruiting has to be one of those topline goals and measured. And when you get it put into that echelon, you get the treatment and visualization in the same way.',
    },
    {
      timestamp: '00:10:27',
      text: 'If the recruiting and talent leader is a business leader first and a talent leader second, all business leaders work cross-functionally and collaboratively to drive business outcomes. That means they\'re putting the hat they\'re wearing first — how is this talent and how can we help unlock or drive business?',
    },
    {
      timestamp: '00:11:25',
      text: 'We see often recruiting leaders, regardless of years experience, plateau at the director level because they are defensive of their team. Other teams see that and then you get put into the "go fill that wreck for me, you\'re a staffing organization to me, you\'re not a talent advisor."',
    },
    {
      timestamp: '00:12:27',
      text: 'If you as a trusted adviser are really curious about the business, you understand how the company makes money, you\'re asking to shadow an engineer for a day — that curiosity is not only going to make you a better recruiter, but you\'re going to be seen as someone who really cares.',
    },
    {
      timestamp: '00:13:17',
      text: 'If we were more in a trusted advisor spot, I would have had access to information that I could start to share with my team and start resourcing my team ahead of plan or have more contingency levers I could pull to quickly ramp up our team.',
    },
    {
      timestamp: '00:15:47',
      text: 'Talent density is essentially quality of hire in a lower volume hiring environment. In a high volume hiring environment we know quality of hire. It\'s really tough to be a CEO because you\'re always afraid of the quality of people coming into your company.',
    },
    {
      timestamp: '00:17:17',
      text: 'Job analysis is a real deep approach to studying the actual employees in the company — what success looks like, what the characteristics are, what transferable skills make someone really good at that specific job — and then pulling that back into the assessment process.',
    },
    {
      timestamp: '00:17:45',
      text: 'Really helping a hiring manager to think critically of what the work is going to be, what success looks like, how we conjugate those into actual competencies, experiences, and skills, and how we create focus areas for interviewers with question banks and rubrics so we get better inter-rater reliability.',
    },
    {
      timestamp: '00:19:07',
      text: 'Leaders put in speed bumps or safety nets because they don\'t trust the process. Bars, razor programs, hiring committees, CEO reviewing every offer. You can do these fixes or you could change the system. The most scalable long-term solution is to make the company effective at hiring.',
    },
    {
      timestamp: '00:22:03',
      text: 'The more confidence I had in my craft and what I knew, and the more clearly and crisply and data-backed I was able to make that framing for them, the more information I got, the more meetings I was in, the more success we had as a team.',
    },
    {
      timestamp: '00:22:36',
      text: 'Being liked is not a pathway to getting respect. Getting respect can be a pathway to also being liked. A lot of recruiting leaders are drawn to woo — love working with people, meeting new people — but part of it is an insatiable need to be liked.',
    },
    {
      timestamp: '00:26:22',
      text: 'There are three influencing styles: rational, social, and emotional. Rational means using logic and data to persuade. Social is building rapport and leveraging relationships. Emotional is appealing to someone\'s values or modeling ways you\'d like others to behave.',
    },
    {
      timestamp: '00:25:36',
      text: 'Understanding your strengths is really important but also understanding the dark side of them. As you\'re building teams, how are you finding complementary pieces to yourself? Early hiring managers often hire people who are shades of themselves, and you end up building a team that\'s high woo.',
    },
  ],
}

export const transcriptSources: readonly TranscriptSource[] = [adamWardTranscript]
