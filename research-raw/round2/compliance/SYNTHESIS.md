# Compliance & Country Norms for Qonto Perf+Comp

**Scope.** Qonto operates in 8 EU markets (confirmed via expansion Sept 2024): **France, Germany, Italy, Spain, Austria, Belgium, Netherlands, Portugal**. Headcount >1,500. All four "tier-A" thresholds (50 / 100 / 150 / 250 employees) apply to Qonto. Perf+comp tooling lands inside a thicket of EU-level and national obligations; this brief maps them to product features.

---

## EU Pay Transparency Directive (2023/970) — what we must support

**Status.** Adopted May 2023. Member State transposition deadline: **7 June 2026**. First reporting cycle: **June 2027** for employers ≥150 (Qonto is in scope from day one). NL has already announced a delay to 1 Jan 2027 entry-into-force; FR/DE/IT/ES/BE/AT/PT are mid-transposition. Some provisions have direct effect from June 2026 regardless of national delay.

**Tiered reporting cadence (employer-side).**
- ≥250 employees: annual report from June 2027.
- 150–249: every 3 years from June 2027.
- 100–149: every 3 years from June 2031.
- <100: voluntary (but other obligations apply).

**Six obligations a perf+comp tool must back.**

1. **Pre-employment transparency.** Salary range or starting salary disclosed in job posting or before interview. Ban on asking candidates about salary history. → product implication: job-req creation must capture & surface band; ATS integration must propagate band to posting.
2. **Right to information.** Employees can request (a) their individual pay, (b) average pay levels broken down by sex for workers doing equal/equivalent work. Employer must respond within **2 months** and **remind annually** that the right exists. → product: self-service "my pay information" request flow with 2-month SLA + audit log; annual auto-notification.
3. **Criteria transparency.** Pay, pay levels, pay progression criteria must be **objective, gender-neutral, accessible to all workers**. Criteria: skills, effort, responsibility, working conditions. → product: job architecture / leveling framework as a first-class object, exposed read-only to employees.
4. **Gender pay gap reporting.** Median + mean gap, total + by component (variable, equity), and by **category of workers doing equal or equivalent work** (this is the hard one — requires job clustering, not just job title).
5. **5% threshold → Joint Pay Assessment.** Unexplained gap ≥5% in any category, not remedied within **6 months**, mandates a joint pay assessment with worker representatives (CSE / Betriebsrat / RSU / Comité d'entreprise / Plan de Igualdad commission). → product: gap analysis output must be exportable for representative consultation; assessment workflow with status tracking.
6. **Burden of proof reversal.** In equal-pay litigation, **employer must prove no discrimination**. Practically: every comp decision (offer, raise, promotion, bonus, equity) must have a defensible, documented rationale tied to gender-neutral criteria. → product: decision-rationale capture is no longer optional UX — it is legal evidence.

**Most consequential requirement** (single line): the **burden-of-proof reversal** combined with the **right-to-information** turns every individual pay decision into a documented artifact the employer must be able to defend, on demand, in court — perf+comp tools without per-decision rationale capture are non-viable.

---

## Per-country requirements

### France (HQ; biggest headcount)

| Obligation | In scope | What the system must support |
|---|---|---|
| **Entretien professionnel** (L6315-1 Code du travail) | All employees, all contract types | Schedule + log mandatory career-development interview every 2 years (post-Oct 2025 reform: in first year then every 4 years for some). Distinct from perf review. Must record evidence of training/qualification discussion. |
| **Entretien annuel** | Mandatory **only if** convention collective requires it (most do at Qonto's size) | Annual perf cycle template, written record, employee acknowledgment. |
| **NAO** (Négociation Annuelle Obligatoire, L2242-1) | All companies with union delegates | Annual mandatory negotiation on salaries, gender equality, QWL. System must produce **comp aggregates by category × gender** as input to NAO; track conclusions of negotiation. |
| **CSE consultation** | All companies ≥11 employees | CSE consulted on social policy, working conditions, employment. Annual "BDESE" (Base de Données Économiques, Sociales et Environnementales) must include perf+comp data points. |
| **Index Égalité Femmes-Hommes ("Penicaud")** | ≥50 employees, published by 1 March each year | Compute 100-point score on 5 indicators: pay gap (40 pts), individual raises gap (20 pts for 50–250, 35 pts for >250), promotions gap (15 pts, >250 only), maternity-return raise rate (15 pts), gender balance in top-10 earners (10 pts). Below 75 → corrective measures published. Below 85 → improvement targets published. |

**Top FR feature:** **Index Égalité dashboard with auto-computed 5-indicator score + publication-ready export**, tied to NAO/CSE evidence pack.

### Germany

| Obligation | In scope | What the system must support |
|---|---|---|
| **Entgelttransparenzgesetz** (Pay Transparency Act 2017) | ≥200 employees for individual-info right; ≥500 for periodic equality report | Individual right to comparator pay info (median of opposite-sex colleagues in equivalent role, min 6 comparators). Existing — EUPTD will tighten thresholds. |
| **Mitbestimmung / BetrVG §87(1) No. 6** | Any company with a Betriebsrat | **Hard co-determination right** over any "technical device capable of monitoring behavior or performance." Federal Labour Court interprets this broadly — **even Excel and Outlook calendars qualify**. Perf+comp software cannot be rolled out in Germany without a Betriebsvereinbarung (works agreement). |
| **BetrVG §94/95** | Any company with Betriebsrat | Co-determination on personnel evaluation guidelines, selection criteria for hiring/promotion/dismissal. |
| **AI deployment in HR** | Any Betriebsrat-covered employer | Use of AI for perf evaluation requires Betriebsrat agreement under §87(1) No. 6 + §95. |

**Top DE feature:** **Betriebsvereinbarung-ready configuration layer** — every monitoring/evaluation parameter (what data is collected, who sees it, retention, AI use) must be configurable per-deployment and exportable as a draft works agreement.

### Italy

| Obligation | In scope | What the system must support |
|---|---|---|
| **CCNL** (national collective bargaining agreement) | All employers (sector-specific) | Pay bands, classification levels (livelli), minimum increments dictated by CCNL. System must support CCNL livello as a first-class attribute on every employee + pay decision. Variable pay layered on top. |
| **Rapporto biennale (Law 162/2021, Art. 46 D.Lgs. 198/2006)** | ≥50 employees, biennial, by 30 April | Electronic gender report via Ministry of Labour portal: headcount by position/level × gender, salary conditions, gender-pay-gap actions. Companies that file can apply for UNI/PdR 125:2022 Gender Equality Certification. |
| **RSU consultation** | Unionized workplaces | Workplace union representation (RSU) consulted on perf/comp practices analogous to FR CSE. |
| **Italian EUPTD draft (DLA Piper, 2026)** | Already published | Draft makes CCNL compliance **insufficient** alone — separate analytical layer required on actual total compensation including variable. |

**Top IT feature:** **Rapporto biennale generator** (Ministry-of-Labour XML/portal-format export) plus **livello-aware pay analytics** that decompose total comp into CCNL-mandated vs employer-discretionary components.

### Spain

| Obligation | In scope | What the system must support |
|---|---|---|
| **Registro retributivo** (RD 902/2020) | **All companies regardless of size**, including management | Pay register: average + median pay by sex, broken down by category, level, job classification group; including base + supplements + extra-salary items. Updated annually. |
| **Plan de Igualdad** | ≥50 employees | Equality plan negotiated with worker reps, registered with REGCON. Mandatory diagnostic includes pay audit. |
| **Auditoría retributiva** (RD 902/2020, art. 7–8) | ≥50 employees (any company required to have Plan de Igualdad) | In-depth pay audit: relevance of job-classification system, evaluation of effort/skills/responsibility, evidence that pay system is gender-neutral. Justification required for any pay gap >25% in same job. |
| **EUPTD impact** | All employers | RD 902/2020 will be tightened — 5% threshold replaces 25%. |

**Top ES feature:** **Registro retributivo export** (compliant with RD 902/2020 schema) + **Auditoría retributiva workflow** producing the equality-plan diagnostic.

### Belgium

| Obligation | In scope | What the system must support |
|---|---|---|
| **CCT n°25** (CBA 25) | All employers | Equal pay for equal/equivalent work — long-standing federal CBA. |
| **Loi 22 April 2012 (analyse comparative)** | ≥50 employees | Biennial pay-structure analysis by gender; ≥100 employees file the long-form (function, qualifications, seniority all broken down by gender). |
| **EUPTD transposition** | Confirmed by Minister Clarinval, Apr 2026 | Federal transposition pending. Wallonia-Brussels Federation already transposed for public companies (Sept 2024). |

**Top BE feature:** **Biennial comparative pay analysis** in the federal long-form format (function × seniority × qualifications × gender).

### Netherlands

| Obligation | In scope | What the system must support |
|---|---|---|
| **Wet gelijke behandeling m/v** (Equal Treatment Act) | All employers | Underlying equal-pay framework. |
| **EUPTD transposition draft** (Loyens & Loeff, Jan 2026) | ≥150 employees | First report due **7 June 2028** (NL postponed entry-in-force to 1 Jan 2027). |
| **Ondernemingsraad (Works Council, WOR)** | ≥50 employees | Works council gains **approval rights** over the methodology employers use to meet transparency/reporting obligations (per draft). Methodology — not data validation. |
| **Job evaluation system requirement** | All employers | Draft mandates a job evaluation/classification system guaranteeing equal pay for equal/equivalent work. |

**Top NL feature:** **Works-council-approvable methodology configuration** (the evaluation method, not the data, is the artifact OR must approve).

### Portugal

| Obligation | In scope | What the system must support |
|---|---|---|
| **Código do Trabalho** + **Law 60/2018** | All employers ≥50 employees for reporting; ≥250 for annual report | Pay-data reporting by gender; ACT (Authority for Working Conditions) publishes gap data by company, profession, qualification. |
| **Remediation duty** | If gap detected | Submit corrective plan to ACT. |
| **EUPTD transposition** | Pending; expected to amend Law 60/2018 | Aligns with EUPTD framework. |

**Top PT feature:** **ACT-format gender pay-gap report** + **remediation-plan tracker** with submission status.

### Austria

| Obligation | In scope | What the system must support |
|---|---|---|
| **Einkommensbericht** (Gleichbehandlungsgesetz §11a) | ≥150 employees, biennial | Income report by collective-agreement category × gender: headcount, mean and median wages. Confidential — only Betriebsrat + employees may see it. |
| **Betriebsrat** | Any company ≥5 employees can elect one | Co-determination rights similar to DE (though narrower); Einkommensbericht must be transmitted to Betriebsrat. |
| **EUPTD transposition** | 2026 income reporting may be last cycle under current law | New rules will replace Einkommensbericht with EUPTD-aligned framework. |

**Top AT feature:** **Einkommensbericht export** (by collective-agreement category × gender, mean + median) with secure Betriebsrat-only access channel.

---

## EU AI Act — implications for "evaluation of employees" tools

**Status.** Regulation (EU) 2024/1689. **High-risk obligations apply from 2 August 2026** for new systems; existing systems have until 2 August 2027.

**Annex III, point 4 explicitly classifies as high-risk:**
- AI used to make decisions on **promotion, termination, allocation of tasks based on individual behavior/traits**.
- AI used to **monitor and evaluate performance and behavior** in work-related relationships.
- AI used in recruitment/selection (job ads, filtering, candidate evaluation).

**Any LLM-based "draft my review" or "score this performance" feature in Qonto's tool is in scope.**

**Provider obligations (Qonto, if building its own AI):**
1. Risk management system across the AI lifecycle.
2. Data governance: training/validation data must be relevant, representative, free of errors, bias-tested.
3. Technical documentation + conformity assessment + CE marking + EU database registration.
4. Logs that allow traceability of inputs/outputs.
5. Transparency: deployers told the system's capabilities, limits, intended use.
6. **Human oversight** designed in (Article 14): a natural person must be able to understand outputs, monitor, intervene, override, and stop the system.
7. Accuracy, robustness, cybersecurity.

**Deployer obligations (Qonto, even if using a vendor's AI):**
1. Use system per instructions; assign human oversight to a competent person.
2. **Inform affected workers + their representatives** before putting it into service (Article 26(7)).
3. Keep logs ≥6 months.
4. Conduct a **FRIA (Fundamental Rights Impact Assessment)** under Article 27 for employment-related high-risk systems (deadline: **2 Aug 2026**). FRIA must cover: deployer processes, frequency of use, categories of affected persons, specific harm risks, human-oversight measures, complaint mechanisms. FRIA **complements** GDPR DPIA — does not replace.
5. Cooperate with national authorities.
6. Affected employees have **right to explanation** of any high-risk AI decision (Article 86).

**Non-compliance penalty:** up to €15M or 3% global turnover.

**Product implications.** Any AI in the perf+comp tool needs: (a) deployer-side configurable human-in-the-loop checkpoints, (b) explanation generator per decision (not just confidence score), (c) employee-facing contestation flow, (d) audit log retained ≥6 months, (e) FRIA template auto-populated from system configuration, (f) Article 26(7) notification workflow for works councils.

---

## GDPR-specific patterns for perf+comp tools

**DPIA triggers (Art. 35).** Mandatory for perf+comp because tools typically combine **systematic evaluation of natural persons** + **profiling with significant effects on the data subject** + **large-scale processing** — at least two of CNIL's "high-risk" criteria are met. DPIA must be done **before** processing starts and **revisited** when scope changes. EDPB guidelines treat employee evaluation as a paradigm DPIA case.

**Article 22 (automated decision-making).** Decisions "based solely on automated processing producing legal effects or similarly significant effects" are restricted. A promotion denial or termination based on an AI score with no meaningful human review = Article 22 violation. **Meaningful human involvement** means an actual reviewer with authority to override, not a rubber-stamp. Affected employees have explicit right to: human intervention, express their view, contest the decision.

**Retention defaults.**
- GDPR sets no fixed periods — controller defines based on purpose (Art. 5(1)(e), storage limitation).
- Typical defaults seen in HR/legal advice: review records 3–5 years post-cycle; longer if tied to ongoing employment or litigation hold. Tax/payroll records have statutory minimums (FR 5y, DE 6–10y, IT 5–10y, ES 4–10y depending on doc).
- France: CNIL guidance on HR processing recommends 2 years post-departure for active perf records.

**Data subject rights flow that must work end-to-end.**
- **Access (Art. 15)** — DSAR must return all perf records, including manager comments, calibration notes, peer review verbatims, AI scores + explanations. 1-month SLA, extendable to 3.
- **Rectification (Art. 16)** — employee can challenge factual inaccuracies in review.
- **Erasure (Art. 17)** — limited by legal obligation (employment law) but applies once retention period elapses.
- **Restriction (Art. 18)** — during a contested review, processing may need to pause.
- **Objection (Art. 21)** — to processing based on legitimate interest.
- **Portability (Art. 20)** — perf data in machine-readable export.

**Lawful basis.** Legitimate interest is the typical basis for perf-management, but balancing test must be documented; consent is **not** a valid basis in an employment relationship (power imbalance — EDPB Opinion 2/2017). Special-category data (e.g., health-related performance impacts) needs Art. 9 basis.

---

## Feature inventory — compliance-driven

Aim: features the perf+comp tool needs to exist for Qonto to ship in 8 EU markets. Each row is a feature the tool would expose or back-fill; "country_scope" of `all` means EU-wide (EUPTD/AI Act/GDPR).

| id | name | description | primary_user | help_mode | ai_mode | complexity | poc_fit | country_scope |
|---|---|---|---|---|---|---|---|---|
| C01 | Per-decision rationale capture | Every comp decision (offer, raise, promo, bonus, equity) requires structured rationale tied to gender-neutral criteria (skills, effort, responsibility, working conditions). Frozen at decision time. | manager | assisted | suggest-rationale-draft | M | high | all |
| C02 | Right-to-information request flow | Employee self-service flow: request own pay info + comparator group medians by sex. 2-month SLA, audit log, annual auto-reminder. | employee | full | none | M | high | all |
| C03 | EUPTD gender pay gap report | Compute median + mean pay gap, total and by variable/equity component, broken down by category of workers doing equal/equivalent work. Annual for ≥250, triennial otherwise. | hr | full | none | L | high | all |
| C04 | Job architecture / leveling object | First-class job-leveling framework using objective gender-neutral criteria (skills, effort, responsibility, conditions). Exposed read-only to employees. Versioned. | hr | partial | suggest-level-from-jd | L | high | all |
| C05 | Joint Pay Assessment workflow | When ≥5% unexplained gap in any worker-category not remedied in 6 months, trigger assessment workflow with worker-rep export pack + status tracking. | hr | full | none | L | medium | all |
| C06 | Salary-band-in-job-posting integration | Push range/starting salary into ATS/job postings; block postings without band; ban salary-history field in candidate forms. | recruiter | full | none | S | medium | all |
| C07 | Annual right-to-info reminder | Auto-notify each employee yearly of their EUPTD right to request pay information. | employee | full | none | S | high | all |
| C08 | Index Égalité dashboard (FR) | Auto-compute 100-point Penicaud score on 5 indicators; publication-ready export by 1 March. | hr | full | none | M | high | fr |
| C09 | NAO/CSE evidence pack (FR) | Generate comp aggregates by category × gender for NAO negotiation + CSE consultation; track conclusions. | hr | partial | none | M | medium | fr |
| C10 | Entretien professionnel scheduler (FR) | Track every-2-year (or post-2025 4-year) career-development interview obligation per employee under L6315-1; flag overdue. | hr | full | none | S | medium | fr |
| C11 | Betriebsvereinbarung config layer (DE) | Per-deployment configurable controls (data collected, retention, AI use, visibility) exportable as draft works agreement. Required for §87(1) No. 6 co-determination. | hr-admin | partial | none | L | high | de, at |
| C12 | Entgelttransparenzgesetz comparator response (DE) | Automated comparator-group median computation for individual pay-info requests (≥6 comparators, opposite-sex, equivalent role). | hr | full | none | M | medium | de |
| C13 | Rapporto biennale generator (IT) | Ministry-of-Labour portal-format export of biennial gender report; UNI/PdR 125 certification-ready data. | hr | full | none | M | medium | it |
| C14 | CCNL livello attribute (IT) | First-class CCNL classification level on every employee + decision; decompose total comp into CCNL-mandated vs discretionary. | hr | full | none | M | medium | it |
| C15 | Registro retributivo export (ES) | Pay register in RD 902/2020 schema: avg + median by sex × category × level, including supplements. | hr | full | none | M | high | es |
| C16 | Auditoría retributiva workflow (ES) | Pay-audit workflow producing equality-plan diagnostic; justification capture for any gap above threshold. | hr | full | none | M | medium | es |
| C17 | Belgian biennial comparative analysis (BE) | Loi 22 April 2012 long-form pay-structure analysis (function × seniority × qualifications × gender). | hr | full | none | M | low | be |
| C18 | Einkommensbericht export (AT) | Biennial income report by collective-agreement category × gender (mean + median); Betriebsrat-only secure delivery. | hr | full | none | S | low | at |
| C19 | ACT gender pay-gap report (PT) | Law 60/2018 format report + remediation-plan tracker with ACT submission status. | hr | full | none | M | low | pt |
| C20 | Works-council methodology approval (NL) | Configurable methodology object that works council can review/approve (per Dutch EUPTD draft); separate from data validation. | hr | partial | none | M | low | nl |
| C21 | AI Act FRIA template & log | Auto-populate Fundamental Rights Impact Assessment from system configuration; deadline 2 Aug 2026; refresh on scope change. | hr-admin, dpo | partial | summarize-config | L | high | all |
| C22 | Article 22 human-in-loop enforcement | Block any "significant-effect" decision (promo, termination, comp >X%) from being finalized without recorded meaningful human review and override capability. | manager | full | flag-when-ai-influenced | M | high | all |
| C23 | Article 86 right-to-explanation | Per-decision explanation generator for any AI-influenced output; employee-facing contestation flow. | employee | full | generate-explanation | M | high | all |
| C24 | Worker-rep AI deployment notification (AI Act Art. 26(7)) | Pre-deployment notification workflow to CSE/Betriebsrat/RSU/OR/Comité before any high-risk AI feature is turned on. | hr-admin | partial | none | S | medium | all |
| C25 | DSAR export for perf records | Machine-readable export of all perf data per employee (records, manager notes, peer verbatims, AI outputs+explanations); 1-month SLA. | dpo, employee | full | none | M | high | all |
| C26 | Retention-policy engine | Per-record retention with country-aware defaults (FR 2y post-departure CNIL guidance; DE 6–10y for payroll; etc.); auto-purge with hold-on-litigation flag. | hr-admin, dpo | full | none | M | medium | all |
| C27 | Lawful-basis & legitimate-interest balancing test | Documented LIA for each processing purpose in the tool; ban on consent as basis for employment processing. | dpo | partial | none | S | medium | all |
| C28 | Calibration audit trail | Capture every calibration-meeting change to rating/comp with rationale and decision-maker; required evidence for burden-of-proof reversal. | hr, manager | full | flag-large-changes | M | high | all |

(28 features — exceeds the 12–20 target because compliance density across 8 markets + AI Act + EUPTD + GDPR genuinely justifies it.)

---

## Sources

EU Pay Transparency Directive:
- [Pay transparency in the EU — Council of the EU](https://www.consilium.europa.eu/en/policies/pay-transparency/)
- [Directive (EU) 2023/970 — EUR-Lex](https://eur-lex.europa.eu/eli/dir/2023/970/oj/eng)
- [Ravio — complete legislation guide and FAQs](https://ravio.com/blog/everything-you-need-to-know-about-the-eu-pay-transparency-directive)
- [EU-wide guidelines on gender-neutral job evaluation — DLA Piper GENIE](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/gender-pay-transparency-EU-wide-guidelines-on-gender-neutral-job-evaluation-and-classification)
- [EUPTD 5% gap & compliance steps — Europe HR Solutions](https://europe-hr-solutions.com/resources/eu-pay-transparency-directive-5-gap-compliance-steps/)

France:
- [Index Égalité Professionnelle — egalite-femmes-hommes.gouv.fr](https://www.egalite-femmes-hommes.gouv.fr/index-de-legalite-professionnelle-entre-les-femmes-et-les-hommes)
- [Index Égalité — economie.gouv.fr](https://www.economie.gouv.fr/entreprises/index-egalite-professionnelle-obligatoire)
- [Entretien professionnel — Legalstart](https://www.legalstart.fr/fiches-pratiques/relations-employeur-salaries/entretien-professionnel/)
- [Entretien annuel — Silae](https://www.silae.fr/entretien-annuel-quelles-sont-les-obligations-de-l-employeur/)
- [NAO — Juritravail](https://www.juritravail.com/Actualite/negociation-annuelle-obligatoire-nao-definition-negociation/Id/85661)

Germany:
- [Transparency in Wage Structures Act — Gesetze-im-internet (English)](https://www.gesetze-im-internet.de/englisch_entgtranspg/englisch_entgtranspg.html)
- [Pay Transparency in Germany — Figures](https://figures.hr/post/guide-to-pay-transparency-in-germany-entgelttransparenz-for-compensation-professionals)
- [BetrVG §87(1) No. 6 — Luther Lawfirm](https://www.luther-lawfirm.com/en/newsroom/blog/detail/dauerbrenner-software-vs-mitbestimmung-87-abs-1-nr-6-betrvg)
- [German works councils & AI — Bird & Bird](https://www.twobirds.com/en/insights/2024/germany/erstes-urteil-zu-rechten-des-betriebsrats-bei-einsatz-von-kuenstlicher-intelligenz)

Italy:
- [Italy: recent legislative steps — IBA](https://www.ibanet.org/recent-legislative-steps-gender-equality-italy)
- [Italy pay equity laws — L&E Global](https://leglobal.law/countries/italy/employment-law/employment-law-overview-italy/05-pay-equity-laws/)
- [Italy EUPTD draft — DLA Piper GENIE](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/Italy-publishes-draft-legislation-to-implement-the-Gender-Pay-Transparency-Directive)
- [Italy expands equality reporting — Mercer](https://www.mercer.com/insights/law-and-policy/italy-expands-equality-reporting-duty/)

Spain:
- [RD 902/2020 — BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2020-12215)
- [Registro retributivo FAQ — MITES](https://www.mites.gob.es/ficheros/ministerio/herramienta_registro_retributivo/FAQs_registro_retributivo.pdf)
- [Auditoría retributiva — Personio](https://www.personio.es/glosario/auditoria-retributiva/)

Belgium:
- [Belgium EUPTD prep — Baker McKenzie](https://insightplus.bakermckenzie.com/bm/employment-compensation/belgium-preparing-for-the-eu-pay-transparency-directive-what-employers-need-to-know)
- [Belgium pay transparency guide — Figures](https://figures.hr/post/guide-on-pay-transparency-in-belgium-transparence-salariale-loontransparantie-for-employers)
- [Belgium law guide — Trusaic](https://trusaic.com/resources/global-pay-transparency-center/belgium/)

Netherlands:
- [Dutch EUPTD proposal — Loyens & Loeff](https://www.loyensloeff.com/insights/news--events/news/dutch-implementation-proposal-of-the-eu-pay-transparency-directive-amended/)
- [Netherlands pay transparency requirements — WTW](https://www.wtwco.com/en-eg/insights/2025/04/netherlands-extensive-new-pay-transparency-requirements-proposed)
- [NL pay transparency — Trusaic](https://trusaic.com/blog/netherlands-advances-eu-pay-transparency-directive-transposition/)

Portugal:
- [Portugal labour & employment — L&E Global](https://leglobal.law/countries/portugal/employment-law/employment-law-overview-portugal/)
- [Portugal pay equity — Pay Analytics](https://www.payanalytics.com/resources/articles/pay-equity-laws-portugal)
- [Portugal pay transparency — Trusaic](https://trusaic.com/regulatory-pay-transparency-reporting/portugal/)

Austria:
- [Austria pay transparency law — IZA discussion paper](https://docs.iza.org/dp14206.pdf)
- [Austria 2026 income reporting — Kinstellar](https://www.kinstellar.com/news-and-insights/detail/4147/2026-income-reporting-in-austria-the-last-cycle-before-the-eu-pay-transparency-reform)
- [Austria pay transparency — Trusaic](https://trusaic.com/resources/global-pay-transparency-center/austria/)

EU AI Act:
- [Annex III — artificialintelligenceact.eu](https://artificialintelligenceact.eu/annex/3/)
- [Article 14 (human oversight) — artificialintelligenceact.eu](https://artificialintelligenceact.eu/article/14/)
- [Article 27 (FRIA) — artificialintelligenceact.eu](https://artificialintelligenceact.eu/article/27/)
- [Impact on HR — Hunton](https://www.hunton.com/insights/legal/the-impact-of-the-eu-ai-act-on-human-resources-activities)
- [FRIA guide — Nemko](https://digital.nemko.com/insights/fundamental-rights-impact-assessments-frias-under-the-eu-ai-act-what-you-need-to-know)

GDPR:
- [Article 22 — gdpr-info.eu](https://gdpr-info.eu/art-22-gdpr/)
- [HR systems & GDPR — DPO Consulting](https://www.dpo-consulting.com/blog/hr-system-and-gdpr)
- [ICO automated decision-making guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/rights-related-to-automated-decision-making-including-profiling/)
- [Automated decision-making practical cases — Future of Privacy Forum](https://fpf.org/wp-content/uploads/2022/05/FPF-ADM-Report-R2-singles.pdf)

Qonto markets:
- [Qonto expansion — Sifted](https://sifted.eu/articles/qonto-expansion-europe)
- [Qonto services in additional countries — The Paypers](https://thepaypers.com/online-mobile-banking/qonto-expands-its-services-to-additional-european-countries--1270311)
