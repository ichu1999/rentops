"use client";

import React, { useMemo, useState } from "react";

/*
  Rental Operations Platform website preview
  - No external icon/animation packages are used.
  - This single React file simulates a premium multi-page SaaS website using internal page state.
  - In production with Next.js, split HomePage into app/page.jsx and AboutPage into app/about/page.jsx.
*/

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    arrow: "→",
    check: "✓",
    bell: "🔔",
    building: "🏢",
    calendar: "📅",
    clipboard: "📋",
    close: "×",
    demo: "▶",
    document: "📄",
    home: "🏠",
    hostel: "🏨",
    language: "🌐",
    layers: "▦",
    login: "🔐",
    mail: "✉️",
    menu: "☰",
    phone: "📞",
    receipt: "🧾",
    rupee: "₹",
    shield: "🛡️",
    sparkles: "✦",
    users: "👥",
    wallet: "💳",
    zap: "⚡",
    settings: "⚙️",
    resort: "🌴",
    roles: "🧩",
  };

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center leading-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.82 }}
    >
      {icons[name] || "•"}
    </span>
  );
};

const copy = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navFeatures: "Features",
    navWorkflow: "Workflow",
    navLanguages: "Languages",
    navPricing: "Pricing",
    heroBadge: "Built for landlords, hostels, apartments, resorts, and rental managers",
    heroTitle: "Operate rentals, tenants, bills, documents, and daily work without messy workflows.",
    heroText:
      "A Rental Operations Platform designed for real-world property workflows — helping owners manage rent, tenants, utilities, documents, caretaker delegation, tenant login, and settlements in one clear system.",
    start: "Request Demo",
    demo: "View Demo",
    languageLabel: "മലയാളം",
  },
  ml: {
    navHome: "ഹോം",
    navAbout: "അബൗട്ട്",
    navFeatures: "സവിശേഷതകൾ",
    navWorkflow: "പ്രവർത്തനരീതി",
    navLanguages: "ഭാഷകൾ",
    navPricing: "വില",
    heroBadge: "വാടക വീടുകൾ, ഹോസ്റ്റൽ, അപാർട്ട്മെന്റ്, റിസോർട്ട് മാനേജ്മെന്റിന്",
    heroTitle: "വാടക, ടെനന്റ്, ബില്ലുകൾ, രേഖകൾ, ദിനംപ്രതി ജോലി — എല്ലാം ഒരു വ്യക്തമായ സിസ്റ്റത്തിൽ.",
    heroText:
      "വാടക, വെള്ളം/കറന്റ് ബിൽ, ഡോക്യുമെന്റുകൾ, കെയർടേക്കർ ഡെലിഗേഷൻ, ടെനന്റ് ലോഗിൻ, സെറ്റിൽമെന്റ് എന്നിവ വ്യക്തമായി കൈകാര്യം ചെയ്യാൻ സഹായിക്കുന്ന Rental Operations Platform.",
    start: "ഡെമോ ആവശ്യപ്പെടുക",
    demo: "ഡെമോ കാണുക",
    languageLabel: "English",
  },
};

const modules = [
  {
    icon: "rupee",
    title: "Rent Collection",
    text: "Track paid, partial, and pending rent for every tenant in one monthly view.",
  },
  {
    icon: "zap",
    title: "Utilities & Shared Bills",
    text: "Manage electricity, water, owner share, tenant reimbursement, and payment proof.",
  },
  {
    icon: "receipt",
    title: "Tenant Ledger",
    text: "See the complete financial truth: rent, utilities, payments, deductions, and balance.",
  },
  {
    icon: "users",
    title: "Tenant 360 Profile",
    text: "View current details, past rent, documents, agreement, unit history, and notes.",
  },
  {
    icon: "roles",
    title: "Role-Based Delegation",
    text: "Owner, caretaker, manager, and tenant access can be separated clearly.",
  },
  {
    icon: "language",
    title: "Malayalam & Regional Language",
    text: "Reduce miscommunication with tenant-facing screens and messages in local language.",
  },
  {
    icon: "hostel",
    title: "Custom Property Types",
    text: "Configure apartments, hostels, resorts, shops, offices, villas, or mixed buildings.",
  },
  {
    icon: "clipboard",
    title: "Move-out Settlement",
    text: "Calculate rent, utilities, deductions, and refundable deposit without confusion.",
  },
];

const useCases = [
  {
    icon: "building",
    title: "Apartments",
    text: "Multiple units, tenants, rent collection, agreement alerts, and vacancy tracking.",
  },
  {
    icon: "hostel",
    title: "Hostels / PG",
    text: "Room-based setup, shared bills, tenant login, and caretaker-managed operations.",
  },
  {
    icon: "resort",
    title: "Resorts",
    text: "Delegate daily work, manage stays, bills, documents, and operational visibility.",
  },
  {
    icon: "building",
    title: "Shops & Offices",
    text: "Lease tracking, rent follow-up, document storage, and renewal alerts.",
  },
  {
    icon: "settings",
    title: "Mixed Properties",
    text: "Custom structures for buildings that combine rooms, flats, shops, and offices.",
  },
];

const actionRows = [
  { name: "Ameen K", unit: "A-101", rent: "₹10,000", paid: "₹0", balance: "₹10,000", status: "Pending" },
  { name: "Nisha P", unit: "B-204", rent: "₹12,000", paid: "₹6,000", balance: "₹6,000", status: "Partial" },
  { name: "Rahul M", unit: "C-02", rent: "₹8,500", paid: "₹8,500", balance: "₹0", status: "Paid" },
];

const workflowSteps = [
  {
    number: "1",
    title: "Configure property model",
    text: "Apartment, hostel, resort, shop, villa, office, or a custom mixed structure.",
    icon: "settings",
  },
  {
    number: "2",
    title: "Assign roles",
    text: "Owner gets full visibility. Caretaker handles daily work. Tenant sees their own dues and documents.",
    icon: "roles",
  },
  {
    number: "3",
    title: "Use local language",
    text: "Malayalam and regional language views reduce confusion between owner, caretaker, and tenant.",
    icon: "language",
  },
  {
    number: "4",
    title: "Track and settle",
    text: "Rent, utilities, ledger, vacancy, documents, and move-out settlement stay connected.",
    icon: "check",
  },
];

const statusClass = {
  Pending: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  Partial: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  Paid: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
};

function getStoredDemoLeads() {
  if (typeof window === "undefined") return [];
  try {
    const rawLeads = window.localStorage.getItem("rental_operations_demo_leads");
    const parsedLeads = rawLeads ? JSON.parse(rawLeads) : [];
    return Array.isArray(parsedLeads) ? parsedLeads : [];
  } catch (error) {
    console.warn("Could not read saved demo leads", error);
    return [];
  }
}

function storeDemoLead(lead) {
  if (typeof window === "undefined") return [];
  const existingLeads = getStoredDemoLeads();
  const nextLeads = [
    ...existingLeads,
    {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    },
  ];
  window.localStorage.setItem("rental_operations_demo_leads", JSON.stringify(nextLeads));
  return nextLeads;
}

function runLightweightTests() {
  const expectedStatuses = ["Pending", "Partial", "Paid"];
  const moduleTitles = modules.map((module) => module.title);
  const useCaseTitles = useCases.map((useCase) => useCase.title);

  console.assert(modules.length >= 8, "Expected at least 8 product modules.");
  console.assert(moduleTitles.includes("Tenant Ledger"), "Tenant Ledger module should exist.");
  console.assert(moduleTitles.includes("Role-Based Delegation"), "Role-Based Delegation module should exist.");
  console.assert(moduleTitles.includes("Malayalam & Regional Language"), "Regional language module should exist.");
  console.assert(useCaseTitles.includes("Resorts"), "Resorts use case should exist.");
  console.assert(actionRows.every((row) => expectedStatuses.includes(row.status)), "Every row should have a valid rent status.");
  console.assert(statusClass.Pending && statusClass.Partial && statusClass.Paid, "All status classes should be defined.");
  console.assert(typeof storeDemoLead === "function", "Demo lead storage function should exist.");
}

if (typeof window !== "undefined") runLightweightTests();

function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100";
  const variants = {
    primary: "bg-slate-950 text-white shadow-xl shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-800",
    secondary: "border border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50",
    ghost: "bg-white/10 text-white ring-1 ring-white/20 hover:-translate-y-0.5 hover:bg-white/15",
    white: "bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-slate-100",
  };
  return (
    <button type={type} className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    purple: "bg-violet-50 text-violet-700 ring-violet-100",
    white: "bg-white/10 text-white ring-white/20",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone] || tones.blue}`}>
      {children}
    </span>
  );
}

function MetricCard({ label, value, sub, tone = "slate" }) {
  const tones = {
    slate: "from-slate-50 to-white border-slate-100",
    green: "from-emerald-50 to-white border-emerald-100",
    red: "from-rose-50 to-white border-rose-100",
    blue: "from-blue-50 to-white border-blue-100",
    amber: "from-amber-50 to-white border-amber-100",
    purple: "from-violet-50 to-white border-violet-100",
  };
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm ${tones[tone] || tones.slate}`}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function SectionHeading({ badge, title, text, tone = "blue" }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge && <Badge tone={tone}>{badge}</Badge>}
      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-slate-600">{text}</p>}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-6xl rounded-[2rem] border border-white/60 bg-white/85 p-3 shadow-2xl shadow-blue-950/15 backdrop-blur">
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50">
        <div className="flex min-h-[540px]">
          <aside className="hidden w-56 shrink-0 bg-slate-950 p-5 text-white md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500">
                <Icon name="home" size={22} />
              </div>
              <div>
                <p className="font-bold">Rental Ops</p>
                <p className="text-xs text-slate-400">Owner Console</p>
              </div>
            </div>
            <nav className="mt-9 space-y-2 text-sm">
              {["Dashboard", "Rent", "Tenants", "Units", "Utilities", "Roles", "Reports"].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-2xl px-4 py-3 ${index === 0 ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/5"}`}
                >
                  {item}
                </div>
              ))}
            </nav>
          </aside>

          <main className="flex-1 p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">April 2026 • Malayalam enabled</p>
                <h3 className="text-2xl font-bold text-slate-950">Action Required</h3>
              </div>
              <div className="flex gap-2">
                <Badge tone="amber"><Icon name="bell" size={16} /> 7 alerts</Badge>
                <Badge tone="purple"><Icon name="language" size={16} /> ML</Badge>
                <Badge tone="green"><Icon name="check" size={16} /> Live</Badge>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Expected" value="₹1.82L" sub="Monthly rent" tone="blue" />
              <MetricCard label="Collected" value="₹1.24L" sub="68% collected" tone="green" />
              <MetricCard label="Pending" value="₹58K" sub="9 tenants" tone="red" />
              <MetricCard label="Vacant" value="3 Units" sub="₹32K rent loss" tone="amber" />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
              <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-950">Rent Collection Status</h4>
                  <span className="text-xs font-semibold text-blue-700">View all</span>
                </div>
                <div className="mt-4 space-y-3">
                  {actionRows.map((row) => (
                    <div key={row.name} className="grid grid-cols-2 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 lg:grid-cols-6">
                      <div className="col-span-2 lg:col-span-1">
                        <p className="font-semibold text-slate-950">{row.name}</p>
                        <p className="text-xs text-slate-500">Unit {row.unit}</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{row.rent}</p>
                      <p className="text-sm text-slate-500">Paid {row.paid}</p>
                      <p className="text-sm font-semibold text-slate-950">Bal {row.balance}</p>
                      <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${statusClass[row.status] || statusClass.Pending}`}>
                        {row.status}
                      </span>
                      <button className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
                        Mark Rent
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                  <h4 className="font-bold text-slate-950">Tenant Login Preview</h4>
                  <div className="mt-4 rounded-2xl bg-blue-50 p-4">
                    <p className="font-semibold text-slate-950">ബാക്കി വാടക: ₹4,500</p>
                    <p className="mt-1 text-sm text-slate-600">Tenant sees dues, bills, receipts, and documents in their language.</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                  <h4 className="font-bold text-slate-950">Delegation</h4>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-bold">
                    {["Owner", "Caretaker", "Tenant"].map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-center text-slate-700">{item}</span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
        <Icon name={icon} size={24} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function AnimatedWorkflow() {
  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5">
      <style>{`
        @keyframes softFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes connectorPulse { 0%, 100% { opacity: .25; transform: scaleX(.88); } 50% { opacity: 1; transform: scaleX(1); } }
        .workflow-float { animation: softFloat 3s ease-in-out infinite; }
        .workflow-pulse { animation: connectorPulse 2.4s ease-in-out infinite; transform-origin: left; }
      `}</style>
      <div className="grid gap-4 lg:grid-cols-4">
        {workflowSteps.map((step, index) => (
          <div key={step.title} className="relative">
            {index < workflowSteps.length - 1 && <div className="workflow-pulse absolute left-[68%] top-12 z-0 hidden h-1 w-[70%] rounded-full bg-blue-300 lg:block" />}
            <div className="workflow-float relative z-10 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm" style={{ animationDelay: `${index * 0.25}s` }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                <Icon name={step.icon} size={28} />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.25em] text-blue-600">Step {step.number}</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", organization: "", email: "", contact: "", propertyType: "Apartment", preferredLanguage: "Malayalam", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  if (!isOpen) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedLeads = storeDemoLead(form);
    setLeadCount(updatedLeads.length);
    setSubmitted(true);
    setForm({ name: "", organization: "", email: "", contact: "", propertyType: "Apartment", preferredLanguage: "Malayalam", message: "" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge tone="blue"><Icon name="demo" size={16} /> Request demo</Badge>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">See the platform for your property type.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share your details. This preview stores demo requests in this browser. Production should send them to your backend API.
            </p>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold text-slate-700 hover:bg-slate-200" aria-label="Close demo form">
            <Icon name="close" size={24} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
            <h3 className="text-xl font-black text-emerald-800">Demo request saved.</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-700">
              Thank you. In production, this should be saved to your database and sent to email/WhatsApp/Telegram. Saved demo leads in this browser: {leadCount}.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setSubmitted(false)}>Add another request</Button>
              <Button variant="secondary" onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Name *</span>
                <input required name="name" value={form.name} onChange={updateField} placeholder="Your name" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Organization name</span>
                <input name="organization" value={form.organization} onChange={updateField} placeholder="Company / Hostel / Building" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Email *</span>
                <input required type="email" name="email" value={form.email} onChange={updateField} placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Contact number *</span>
                <input required name="contact" value={form.contact} onChange={updateField} placeholder="Mobile / WhatsApp" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Property type</span>
                <select name="propertyType" value={form.propertyType} onChange={updateField} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  {['Apartment', 'Hostel / PG', 'Resort', 'Shop / Office', 'Mixed Property', 'Other'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Preferred language</span>
                <select name="preferredLanguage" value={form.preferredLanguage} onChange={updateField} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  {['Malayalam', 'English', 'Hindi', 'Tamil', 'Other'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">Requirement</span>
              <textarea name="message" value={form.message} onChange={updateField} rows={4} placeholder="Example: Apartment with 12 units, Malayalam tenant login, caretaker access, utilities and rent tracking needed." className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </label>

            <div className="rounded-2xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
              Production note: replace localStorage with <span className="font-mono font-bold">POST /demo-leads</span>, save to database, and notify the admin by email/WhatsApp/Telegram.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit">Save demo request <Icon name="arrow" size={18} /></Button>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function HomePage({ t, language, nextLanguage, setLanguage, openDemo, goAbout }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),radial-gradient(circle_at_top_right,#dcfce7,transparent_28%)] px-5 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl text-center">
          <Badge tone="blue"><Icon name="sparkles" size={16} /> {t.heroBadge}</Badge>
          <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">{t.heroTitle}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">{t.heroText}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={openDemo}>{t.start} <Icon name="arrow" size={18} /></Button>
            <Button variant="secondary" onClick={goAbout}>Why this exists</Button>
          </div>
          <div className="mt-14"><DashboardMockup /></div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-rose-100 bg-rose-50/50 p-8">
            <Badge tone="amber">Before</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">Rental operations become confusing as you grow.</h2>
            <div className="mt-6 space-y-4">
              {[
                "Rent details scattered across notes, WhatsApp, and spreadsheets",
                "Utility bills become hard to split, verify, and settle",
                "Owner has to stay directly involved in every small task",
                "Tenant communication fails because of language barriers",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/50 p-8">
            <Badge tone="green">After</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">One clear operating system for owner, caretaker, and tenant.</h2>
            <div className="mt-6 space-y-4">
              {[
                "Owner sees statistics, pending items, and full control",
                "Caretaker gets access only to the work they need",
                "Tenant login shows dues, bills, receipts, and documents",
                "Malayalam and regional language support reduces confusion",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge={<><Icon name="layers" size={16} /> Connected modules</>}
            title="Every module connected. No duplicate work."
            text="Rent, utilities, delegation, documents, vacancy, tenant login, reports, and settlements work together so the owner sees the real position."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => <FeatureCard key={module.title} {...module} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge={<><Icon name="building" size={16} /> Use cases</>}
            title="Configurable for different rental businesses."
            text="The platform is designed to adapt to different property models instead of forcing every owner into the same workflow."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {useCases.map((useCase) => <FeatureCard key={useCase.title} {...useCase} />)}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-slate-50 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge={<><Icon name="demo" size={16} /> Animated workflow</>}
            title="From setup to settlement in one guided flow."
            text="The workflow is designed for property operations, not just data entry."
            tone="green"
          />
          <div className="mt-12"><AnimatedWorkflow /></div>
        </div>
      </section>

      <section id="languages" className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge tone="white"><Icon name="language" size={16} /> Malayalam + regional languages</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Avoid language barriers and missed communication.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Tenants can understand dues, bills, receipts, agreement dates, and documents in their preferred language. Malayalam support is highlighted first, with a structure ready for more languages.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Owner dashboard in English", "Tenant view in Malayalam", "Payment reminders in local language", "Configurable message templates"].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white ring-1 ring-white/10">
                  <Icon name="check" size={16} /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
            <div className="rounded-3xl bg-blue-50 p-5">
              <p className="text-sm font-bold text-blue-700">Tenant login preview</p>
              <h3 className="mt-3 text-2xl font-black">നിങ്ങളുടെ വാടക വിവരങ്ങൾ</h3>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">ഈ മാസത്തെ ബാക്കി</p>
                  <p className="mt-1 text-3xl font-black text-rose-600">₹4,500</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-bold">കറന്റ് ബിൽ</p>
                  <p className="mt-1 text-sm text-slate-600">₹1,250 • Due this week</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-bold">കരാർ അവസാനിക്കുന്നത്</p>
                  <p className="mt-1 text-sm text-slate-600">ഈ മാസം • Renewal required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-50 px-5 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <SectionHeading
            badge={<><Icon name="wallet" size={16} /> Future licensing</>}
            title="Start focused. Scale into configurable plans."
            text="As the product matures, licensing can be based on modules, users, properties, and operational scale."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-left shadow-sm">
              <p className="text-sm font-bold text-blue-700">Early Access</p>
              <h3 className="mt-3 text-4xl font-black">Demo</h3>
              <p className="mt-3 text-slate-600">For owners who want to test and shape the workflow.</p>
              <div className="mt-8 space-y-3 text-sm text-slate-700">
                {["Rent and tenants", "Utilities and documents", "Malayalam tenant preview", "Feedback-based improvements"].map((item) => (
                  <p key={item} className="flex gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">✓</span>{item}</p>
                ))}
              </div>
              <Button variant="secondary" onClick={openDemo} className="mt-8 w-full">Request Demo</Button>
            </div>
            <div className="rounded-[2rem] border border-slate-950 bg-slate-950 p-8 text-left text-white shadow-2xl shadow-slate-900/20">
              <p className="text-sm font-bold text-blue-300">Scalable License</p>
              <h3 className="mt-3 text-4xl font-black">Coming Soon</h3>
              <p className="mt-3 text-slate-300">For owners and operators who need multi-user roles, modules, and property-level customization.</p>
              <div className="mt-8 space-y-3 text-sm text-slate-200">
                {["Owner/caretaker/tenant access", "Module-based configuration", "Multi-property management", "Reports and operational control"].map((item) => (
                  <p key={item} className="flex gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span>{item}</p>
                ))}
              </div>
              <Button onClick={openDemo} variant="white" className="mt-8 w-full">Join Waitlist</Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection openDemo={openDemo} setLanguage={setLanguage} nextLanguage={nextLanguage} />
    </>
  );
}

function AboutPage({ openDemo }) {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white md:py-28">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Badge tone="white"><Icon name="sparkles" size={16} /> About the platform</Badge>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">Designed for real-world rental operations — not generic software.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              The Rental Operations Platform exists to bring clarity, delegation, and structure into everyday property operations — especially where owners manage multiple tenants, bills, documents, caretakers, and settlements.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button onClick={openDemo} variant="white">Request Demo <Icon name="arrow" size={18} /></Button>
              <Button variant="ghost">Read the approach</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge tone="blue"><Icon name="receipt" size={16} /> Why it exists</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Manual work is okay at first. Then it breaks.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-600">
            <p>
              Managing a small number of tenants can feel simple. A phone note, WhatsApp message, spreadsheet, or memory may be enough when the operation is small.
            </p>
            <p>
              But as the number of tenants, rooms, units, bills, documents, and responsibilities increases, the same manual methods become confusing. Rent follow-up gets missed. Utility bills become unclear. Documents get scattered. Move-out settlement takes time. Owners become directly involved in every small task.
            </p>
            <p>
              The platform is built to solve this operational mess with one structured system that fits how rental businesses actually work.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge={<><Icon name="shield" size={16} /> Product approach</>}
            title="Problem-first. Workflow-first. Operations-first."
            text="The goal is not to force users into a complicated tool. The goal is to make the tool fit the real workflow."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Not assumption-led", "Features should come from real owner, tenant, and caretaker problems — not from guessing."],
              ["Not feature-heavy", "Every module should reduce confusion and save time. If it adds work, it should be redesigned."],
              ["Not owner-dependent", "Owners should be able to delegate daily work while keeping control through reports and permissions."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge={<><Icon name="users" size={16} /> Who it is for</>}
            title="Built for owners and operators who need clarity and control."
            text="The same operating system can adapt to different rental models and role structures."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {useCases.map((useCase) => <FeatureCard key={useCase.title} {...useCase} />)}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Badge tone="white"><Icon name="roles" size={16} /> Delegation</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Owner control without direct involvement in everything.</h2>
            <p className="mt-5 text-slate-300 leading-8">This is where the platform becomes operational, not just informational.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-2">
            {[
              ["Owner", "Full visibility, statistics, reports, permissions, and financial control."],
              ["Caretaker / Manager", "Access only to assigned tasks like rent update, bill upload, tenant coordination, and document collection."],
              ["Tenant", "View own dues, bills, receipts, documents, agreement alerts, and messages in preferred language."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50/50 p-8">
            <Badge tone="blue"><Icon name="language" size={16} /> India / Kerala workflow</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">Designed for practical local realities.</h2>
            <p className="mt-5 leading-8 text-slate-600">
              Rental operations in India often involve advance/deposit handling, electricity and water bill adjustments, hard-copy agreements, ID proof collection, caretaker coordination, WhatsApp communication, and language differences.
            </p>
          </div>
          <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/50 p-8">
            <Badge tone="green"><Icon name="settings" size={16} /> Future direction</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">A configurable SaaS licensing model.</h2>
            <p className="mt-5 leading-8 text-slate-600">
              As the product matures, the platform can support configurable modules, property types, role-based access, and licensing plans based on usage, users, and operational scale.
            </p>
          </div>
        </div>
      </section>

      <CTASection openDemo={openDemo} />
    </>
  );
}

function CTASection({ openDemo, setLanguage, nextLanguage }) {
  return (
    <section id="contact" className="px-5 py-20">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-slate-950 p-8 text-center text-white shadow-2xl shadow-blue-950/20 md:p-14">
        <Badge tone="white"><Icon name="sparkles" size={16} /> Ready to simplify rental operations?</Badge>
        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
          Build a clear rental business without language barriers or messy manual work.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-blue-100">
          Track rent, utilities, tenants, documents, vacancies, tenant login, caretaker delegation, Malayalam communication, and settlements in one operating workflow.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={openDemo} variant="white">Request Demo <Icon name="arrow" size={18} /></Button>
          {setLanguage && <Button variant="ghost" onClick={() => setLanguage(nextLanguage)}><Icon name="language" size={16} /> Switch Language</Button>}
        </div>
      </div>
    </section>
  );
}

function Header({ t, currentPage, setCurrentPage, language, setLanguage, openDemo, isMobileOpen, setIsMobileOpen }) {
  const nextLanguage = language === "en" ? "ml" : "en";

  const navigate = (page) => {
    setCurrentPage(page);
    setIsMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={() => navigate("home")} className="flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/20">
            <Icon name="building" size={24} />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight">Rental Operations Platform</p>
            <p className="hidden text-xs text-slate-500 sm:block">Rental operations made clear</p>
          </div>
        </button>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          <button onClick={() => navigate("home")} className={currentPage === "home" ? "text-slate-950" : "hover:text-slate-950"}>{t.navHome}</button>
          <button onClick={() => navigate("about")} className={currentPage === "about" ? "text-slate-950" : "hover:text-slate-950"}>{t.navAbout}</button>
          <a href="#features" onClick={() => currentPage !== "home" && navigate("home")} className="hover:text-slate-950">{t.navFeatures}</a>
          <a href="#workflow" onClick={() => currentPage !== "home" && navigate("home")} className="hover:text-slate-950">{t.navWorkflow}</a>
          <a href="#pricing" onClick={() => currentPage !== "home" && navigate("home")} className="hover:text-slate-950">{t.navPricing}</a>
        </nav>

        <div className="hidden gap-3 sm:flex">
          <Button variant="secondary" onClick={() => setLanguage(nextLanguage)} className="px-4 py-2.5"><Icon name="language" size={16} /> {t.languageLabel}</Button>
          <Button variant="secondary" onClick={openDemo} className="px-4 py-2.5">Live Demo</Button>
          <Button onClick={openDemo} className="px-4 py-2.5">{t.start}</Button>
        </div>

        <button onClick={() => setIsMobileOpen((open) => !open)} className="rounded-2xl border border-slate-200 p-2 lg:hidden" aria-label="Open menu">
          <Icon name="menu" size={24} />
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-xl lg:hidden">
          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <button onClick={() => navigate("home")} className="rounded-2xl px-4 py-3 text-left hover:bg-slate-50">{t.navHome}</button>
            <button onClick={() => navigate("about")} className="rounded-2xl px-4 py-3 text-left hover:bg-slate-50">{t.navAbout}</button>
            <button onClick={() => setLanguage(nextLanguage)} className="rounded-2xl px-4 py-3 text-left hover:bg-slate-50"><Icon name="language" size={16} /> {t.languageLabel}</button>
            <button onClick={openDemo} className="rounded-2xl bg-slate-950 px-4 py-3 text-left text-white">Request Demo</button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ setCurrentPage }) {
  return (
    <footer className="border-t border-slate-100 px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
        <p>© 2026 Rental Operations Platform. Rental operations made clear.</p>
        <div className="flex gap-6">
          <button onClick={() => setCurrentPage("about")} className="hover:text-slate-950">About</button>
          <a href="#" className="hover:text-slate-950">Privacy</a>
          <a href="#" className="hover:text-slate-950">Terms</a>
          <a href="#" className="hover:text-slate-950">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default function RentalManagerWebsite() {
  const [language, setLanguage] = useState("en");
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const t = useMemo(() => copy[language] || copy.en, [language]);
  const nextLanguage = language === "en" ? "ml" : "en";
  const openDemo = () => setIsDemoOpen(true);
  const goAbout = () => {
    setCurrentPage("about");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <Header
        t={t}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        openDemo={openDemo}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {currentPage === "about" ? (
        <AboutPage openDemo={openDemo} />
      ) : (
        <HomePage
          t={t}
          language={language}
          nextLanguage={nextLanguage}
          setLanguage={setLanguage}
          openDemo={openDemo}
          goAbout={goAbout}
        />
      )}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
