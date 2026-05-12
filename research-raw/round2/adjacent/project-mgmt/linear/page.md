## The product development system for teams and agents

Purpose-built for planning and building products. Designed for the AI era.

[

Issue tracking is dead linear.app/next →

](/next)

![](https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/6600ca96-e49b-4fd9-c03a-7979faddad00/f=auto,dpr=2,q=95,fit=scale-down,metadata=none) ![](https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/c7fa8f5f-d439-4329-6a65-de549b51e300/f=auto,dpr=2,q=95,fit=scale-down,metadata=none)

### Faster app launch

Render UI before `vehicle_state` sync when minimum required state is present, instead of blocking on full refresh during iOS startup.

#### Activity

Linear created the issue via Slack on behalf of karri · 2min ago

Triage Intelligence added the label Performance and iOS · 2min ago

karri · 4 min ago

Right now we show a spinner forever, which makes it look like the car disappeared...

jori · just now

**@Codex** can you take a stab at this?

jori connected Codex · just now

Codex

Examining issue ENG-2703

Codex moved from Todo to In Progress · just now

On it! I've received your request.Kicked off a task in kinetic/kinetic-iOS environment.Searching for root AGENTS file kinetic/kinetic-iOS$ /bin/bash -lc rg --files -g 'AGENTS.md' AGENTS.md Locating initialization logic for vehicle\_state

Thinking...

## A new species of product tool. Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.

Built for purpose

Linear is shaped by the practices and principles of world-class product teams.

Designed for speed

Reduces noise and restores momentum to help teams ship with high velocity and focus.

FIG 0.2

Built for purpose

Linear is shaped by the practices and principles of world-class product teams.

FIG 0.3

FIG 0.4

Designed for speed

Reduces noise and restores momentum to help teams ship with high velocity and focus.

Backlog 8

ENG-2085

Reduce UI flicker during autonomy...

ENG-2094

Add buffering for autonomy event streams

ENG-2092

Reduce startup delay caused by vehicle sync

ENG-2200

Fix delayed route updates during rerouting

Todo 71

ENG-926

Remove UI inconsistencies

Bug Design

ENG-2088

TypeError: Cannot read properties

Bug

ENG-924

Upgrade to Claude Opus 4.5

AI

ENG-1882

Optimize load times

Performance

In Progress 3

ENG-1487

Remove contentData from GraphQL API

61039

MKT-1028

Launch page assets

Design

ENG-2187

Prevent duplicate ride requests on poor...

Bug 62048

Done 53

ENG-2074

Clean up deprecated APIs...

API 61002

ENG-1912

Reduce latency in autonomy st...

61005

ENG-1951

Reduce ETA fluctuations durin...

61202

ENG-1960

Improve fallback messaging

UI 61149

ENG-1991

Improve rider visibility into veh...

didier

Has anyone been looking into the iOS startup performance issues?

lena

Anyone else noticing the iOS app feels slow to open if you haven't used it in a bit?

didier

Yea, we're still blocking initial render on a full vehicle\_state sync every time...

andreas

Feels like we could render sooner and load the rest in the background. Probably also worth tracking startup timing so we know how often this happens!

@Linear create issues urgent issues and assign to me

![](https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/7d7115d9-a0eb-4a92-5900-3ca3ee077d00/f=auto,dpr=2,q=95,fit=scale-down,metadata=none)

FEB

MAR

APR

MAY

JUN

JUL

AUG

SEP

2

9

16

23

2

9

16

23

30

6

13

20

27

4

11

18

25

1

8

15

22

29

6

13

20

27

3

10

17

24

31

7

14

21

28

Split fares

Internal

Public Beta

Autonomy status clarity

Alpha

GA

Infra stability 28

Autonomous systems 16

Mobile apps 8

Japan Launch 12

Customer-driven priorities 9

![](https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/c16152f3-a36c-468e-89ae-f87c2f244d00/f=auto,dpr=2,q=95,fit=scale-down,metadata=none)

kinetic-ios/src/screens/Home/HomeScreen.tsx kinetic-ios/src/HomeScreen.tsx

```
import
import
import
import

export
  

  
    
  }

  
    <
      <
    </
  )
}
```

```
import
import
import
import

export
  

  
    
  }

  
    <
      <
    </
  )
}
```

```
export
  <
    <
    <
    <
    <
    <
    <
  </
};
```

![](https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/33ec1482-c0b8-402e-d67e-c4902a71ee00/f=auto,dpr=2,q=95,fit=scale-down,metadata=none)

18

16

14

12

10

8

6

4

2

0

Feb 2025 May 2025 Aug 2025 Nov 2025

Cursor

Codex

No Agent

Projects

UI refresh

At risk

By romain · 1 day ago

- iOS implementation is mostly complete, but Android updates are still work in progress
- Risk of timeline slip if remaining design decisions aren’t finalized soon

Tokyo launch

On track

By julian · 3 hours ago

- Localization efforts have been completed
- Everything else on track for launch in early September

## Changelog[Releases Plan and track your software releases directly from Linear.Apr 30, 2026](/changelog/2026-04-30-releases)[Linear Agent MCP support Linear Agent can now connect to your tools via MCP, giving it access to data and actions beyond your Linear workspace. Bring external context into your workflows to investigate issues, plan projects, write specs, and draft updates grounded in your full context.Apr 23, 2026](/changelog/2026-04-23-linear-agent-mcp-support)[Linear for Microsoft Teams Mention @Linear in any Microsoft Teams channel to turn your conversations into actionable work.Apr 15, 2026](/changelog/2026-04-16-linear-for-microsoft-teams)[Multi-level sub-teams Structure your teams in Linear to match how your organization works.Apr 8, 2026](/changelog/2026-04-09-multi-level-sub-teams)[View all →](/changelog)> [You just have to use it and you will see, you will just feel it.](/customers/openai)

[Gabriel Peal OpenAI](/customers/openai)

[

> Our speed is intense and Linear helps us be action biased.

Nik Koblov Ramp

](/customers/ramp)[

> Linear is excellent, just excellent. It has the right opinions for fast moving teams.

Kaz Nejatian Opendoor

](/customers/opendoor)[You just have to use it and you will see, you will just feel it.](/customers/openai)

[Gabriel Peal OpenAI](/customers/openai)

[

Our speed is intense and Linear helps us be action biased.

Nik Koblov Head of Engineering, Ramp

](/customers/ramp)