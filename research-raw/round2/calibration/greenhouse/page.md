# Greenhouse — Interviewer Calibration Report (recruitment-side, translatable to perf)

Sources:
- https://support.greenhouse.io/hc/en-us/articles/203941429-Interviewer-calibration-report
- https://support.greenhouse.io/hc/en-us/articles/4414777492891-Scorecard-overview

## Concept worth stealing for performance calibration
- **Interviewer Calibration Report**: shows **how each interviewer rated candidates across all their scorecards** vs team average.
- Reveals: which interviewers grade tougher / easier than average.
- Org then "recalibrates assessments as needed" — fixes raters, not just ratings.

## UI primitive
- Per-rater distribution view (rater on Y-axis, rating distribution on X).
- Direct comparison to team mean.
- **Names the rater, not the candidate** → bias surfaced at the right layer.

## Cross-application for Qonto perf demo
- Show each manager's rating distribution vs all-managers distribution.
- Surface "Manager X gives 60% top ratings, all-managers mean is 22%" without flagging any specific employee as miscalibrated.
- This is **rater-level bias surfacing** — different and complementary to *ratee-level* outlier flagging.
