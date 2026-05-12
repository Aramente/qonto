# Buffer — Salary Formula

Source: https://buffer.com/salary

## Formula (3 steps)
1. **Buffer Benchmark** — custom percentile per area applied to level 5 market data (baseline)
2. **Cost of Living adjustment** — 2 bands: Global (90%), High (100%)
3. **Calculation** — combines benchmark + location

## Inputs
- Role type (e.g., Product Marketer, Customer Advocate)
- Experience level (Senior, Staff, Head of, etc.)
- Geographic location (cost-of-living band)

## Notable: what is NOT in the formula
- Years of experience as numerical input
- Dependents / family status
- Formal competency framework linkage

## Public outcome
All individual salaries publicly listed in a table. "Simple and transparent" is the explicit goal.

## Insight for Qonto
Buffer's formula is **decoupled from competency framework** — level is just a label, the formula reads `level + location + role`. This is the cleanest, most defensible separation: framework determines level; level + location determines pay. No subjective adjustments inside the formula.
