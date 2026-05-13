// role.js — tiny role-aware shell for the Qonto demo
// Reads ?role= from the URL, sets <body data-role>, hides sidebar
// sections above the user's role, updates the role switcher and the
// bottom-of-sidebar profile slot.

(function () {
  const ROLES = ["employee", "manager", "hr", "founder"];

  const PROFILES = {
    employee: { name: "Mélanie L.",      title: "Engineering Manager · Cards", initials: "ML", bg: "var(--qonto-mint-50)",      fg: "var(--qonto-mint-1000)" },
    manager:  { name: "Mélanie L.",      title: "Engineering Manager · Cards", initials: "ML", bg: "var(--qonto-mint-50)",      fg: "var(--qonto-mint-1000)" },
    hr:       { name: "Élise Zammit",     title: "People Partner · Tech",        initials: "EZ", bg: "var(--qonto-sakura-50)",   fg: "var(--qonto-sakura-1000)" },
    founder:  { name: "Alexandre Prot",   title: "CEO · Co-founder",             initials: "AP", bg: "var(--qonto-blueberry-50)", fg: "var(--qonto-blueberry-1000)" },
  };

  // Where each role lands when the role switcher is clicked.
  // Paths are relative to demo/pages/.
  const HOMES = {
    employee: "dashboard.html",
    manager:  "perf-team.html",
    hr:       "admin-cycles.html",
    founder:  "admin-insights.html",
  };

  function currentRole() {
    const u = new URL(window.location.href);
    const r = u.searchParams.get("role");
    return ROLES.includes(r) ? r : "manager";
  }

  function preserveRoleInLinks(role) {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
      try {
        const u = new URL(href, window.location.href);
        u.searchParams.set("role", role);
        const same = u.origin === window.location.origin;
        const newHref = same ? (u.pathname + u.search + u.hash) : u.toString();
        // Don't rewrite if the link itself is just the role-switcher
        if (!a.hasAttribute("data-role")) a.setAttribute("href", newHref);
      } catch (_) {}
    });
  }

  function wireRoleSwitcher(role) {
    document.querySelectorAll(".role-switch a[data-role]").forEach((a) => {
      a.classList.toggle("active", a.dataset.role === role);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = a.dataset.role;
        // Navigate to that role's home; keep param on URL.
        const home = HOMES[target] || "dashboard.html";
        // We're inside demo/pages/, so home is sibling.
        const next = new URL(home, window.location.href);
        next.searchParams.set("role", target);
        window.location.href = next.toString();
      });
    });
  }

  function paintProfile(role) {
    const slot = document.querySelector("[data-role-profile]");
    if (!slot) return;
    const p = PROFILES[role];
    if (!p) return;
    slot.innerHTML = `
      <div class="row">
        <div class="avatar" style="background:${p.bg};color:${p.fg}">${p.initials}</div>
        <div>
          <div style="font-weight:600;font-size:13px">${p.name}</div>
          <div style="font-size:11px;color:var(--qonto-grey-500)">${p.title}</div>
        </div>
      </div>
    `;
  }

  function apply() {
    const role = currentRole();
    document.body.dataset.role = role;
    preserveRoleInLinks(role);
    wireRoleSwitcher(role);
    paintProfile(role);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
