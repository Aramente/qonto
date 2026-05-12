# Comp Ratio Calculator

A simple, single-file calculator for computing compensation ratios and salaries based on salary bands.

## What is Comp Ratio?

Comp-ratio is defined as the associate's pay expressed as a percentage of the midpoint of the salary range.

**Formula**: `Comp-ratio = base pay ÷ midpoint`

## Features

- **Two calculator modes** in a tabbed interface:
  - **Ratio → Salary**: Input your salary band and comp ratio to calculate salary
  - **Salary → Ratio**: Input your salary band and actual salary to calculate comp ratio
- **Shared salary range inputs** - enter min/mid/max once for both calculators
- Input validation to ensure salary ranges are valid (min < mid < max)
- Dynamic slider ranges and step sizes based on your salary band
- Clean, responsive UI that works on desktop and mobile
- No installation, no dependencies, works completely offline

## Usage

1. **Download** the `index.html` file (or visit the [live demo](https://alexvulaj.github.io/comp-calc/))
2. **Double-click** it to open in your browser
3. **Enter your salary band** (minimum, midpoint, maximum)
4. **Switch between tabs** to calculate salary from ratio or ratio from salary

No installation, no dependencies, works completely offline.

## Examples

### Example 1: Find Your Salary at 85% Comp Ratio

If your salary band is:
- Minimum: $80,000
- Midpoint: $100,000
- Maximum: $120,000

And your comp ratio is 85%, your salary would be **$85,000** (85% × $100,000)

### Example 2: Find Your Comp Ratio

If your salary band is:
- Minimum: $80,000
- Midpoint: $100,000
- Maximum: $120,000

And your actual salary is $110,000, your comp ratio is **110%** ($110,000 ÷ $100,000 × 100)

## License

MIT
