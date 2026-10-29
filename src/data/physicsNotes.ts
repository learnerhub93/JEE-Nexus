import { Chapter } from '../types';

export const PHYSICS_NOTES: Chapter[] = [
  {
    id: 'phy-12-03-current-electricity',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 3,
    title: 'Current Electricity',
    ncertName: 'Current Electricity',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    highlightedSubtopics: [
      'Kirchhoff’s Laws & Wheatstone Bridge',
      'Drift Velocity & Mobility Relations',
      'Cell Combinations & EMF vs Terminal Potential',
      'Galvanometer to Ammeter/Voltmeter Conversion',
      'Meter Bridge & Temperature Dependence of Resistivity'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.4,
      difficulty: 'Moderate',
      marksPercentage: '8.5% of Physics',
      topRepeatedConcepts: [
        'Galvanometer conversion calculations (shunt & series resistor)',
        'Wheatstone bridge balance conditions with delta-star or symmetrical circuits',
        'Internal resistance r = R(E/V - 1) & battery grouping for max power'
      ],
      recentShiftFocus: 'Direct numerical value questions on circuit loop currents and galvanometer coil resistance calculations.'
    },
    mustSolveChecklist: [
      'Derive Drift Velocity v_d = eEτ/m and Current Relation I = n e A v_d',
      'Solve Balanced & Unbalanced Wheatstone Bridge with Symmetrical Fold Method',
      'Calculate Terminal Voltage during Charging vs Discharging: V = E + Ir vs V = E - Ir',
      'Convert Galvanometer (G) to Ammeter of range I and Voltmeter of range V',
      'Calculate Maximum Power Transfer across variable load (R = r_eq)',
      'Analyze temperature coefficient of resistance R(T) = R_0[1 + α(T - T_0)]'
    ],
    notesSections: [
      {
        id: 'drift-and-ohms-law',
        title: '1. Microscopic Ohm\'s Law & Drift Mechanics',
        standardTheory: [
          'In conductors, free electrons execute random thermal motion with speeds around $10^5\\text{ m/s}$, but net thermal current is zero due to isotropic velocity distribution.',
          'Upon applying an external electric field $\\vec{E}$, electrons experience acceleration $\\vec{a} = -\\frac{e\\vec{E}}{m}$ and acquire an average steady drift velocity $\\vec{v}_d = -\\frac{e\\vec{E}\\tau}{m}$ opposing $\\vec{E}$ between successive relaxation collisions, producing current density $\\vec{J} = \\sigma \\vec{E}$.'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Drift Velocity & Vector Current Density ($\\vec{J} = \\sigma \\vec{E}$)',
            content: 'Always remember the link between microscopic and macroscopic quantities. Current $I$ through a conductor of cross-section $A$ and vector current density $\\vec{J}$ are given by:',
            latex: 'I = n e A v_d \\quad \\implies \\quad \\vec{J} = \\frac{I}{A}\\hat{n} = -n e \\vec{v}_d = \\sigma \\vec{E} = \\frac{\\vec{E}}{\\rho}',
            extraTips: [
              'Drift velocity magnitude: $v_d = \\frac{e E \\tau}{m}$',
              'Mobility $\\mu = \\frac{v_d}{E} = \\frac{e \\tau}{m}$ (Always positive, SI unit: $\\text{m}^2\\text{V}^{-1}\\text{s}^{-1}$)',
              'Conductivity $\\sigma = \\frac{n e^2 \\tau}{m}$ and Resistivity $\\rho = \\frac{m}{n e^2 \\tau}$'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Stretching a Wire vs Cutting',
            content: 'When a wire of initial resistance $R$ is STRETCHED by $n$ times its length (or radius halved), VOLUME REMAINS CONSTANT ($A \\cdot L = \\text{const}$). Never use $R \\propto L$ alone!',
            latex: 'R = \\rho \\frac{L}{A} = \\rho \\frac{L^2}{\\text{Volume}} \\implies R_{\\text{new}} = n^2 R_{\\text{initial}} = \\frac{R_{\\text{initial}}}{m^4} \\; (\\text{if } r \\to m r)',
            extraTips: [
              'If stretched so length increases by $x\\%$ (where $x < 5\\%$): $\\frac{\\Delta R}{R} \\approx 2\\frac{\\Delta L}{L}$',
              'If stretched so radius decreases by $1\\%$: $\\frac{\\Delta R}{R} \\approx -4\\frac{\\Delta r}{r} = +4\\%$ increase'
            ]
          }
        ]
      },
      {
        id: 'kirchhoff-wheatstone',
        title: '2. Kirchhoff’s Laws & Wheatstone Bridge Archetypes',
        standardTheory: [
          'Kirchhoff\'s Current Law (KCL) is based on the Conservation of Charge ($\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$). Kirchhoff\'s Voltage Law (KVL) is based on the Conservation of Energy ($\\oint \\vec{E}\\cdot d\\vec{l} = \\sum \\Delta V = 0$ around any closed mesh).',
          'A Wheatstone bridge consists of four resistors $P, Q, R, S$. When the galvanometer shows zero deflection ($I_g = 0$), the bridge is balanced and no current flows through the central branch.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Wheatstone Condition & Maximum Sensitivity',
            content: 'For null deflection in bridge $ABCD$ with resistances $P, Q, R, S$:',
            latex: '\\frac{P}{Q} = \\frac{R}{S} \\quad \\iff \\quad V_B = V_D \\quad (I_g = 0)',
            extraTips: [
              'Galvanometer and battery can be interchanged without affecting the balance condition $\\frac{P}{Q} = \\frac{R}{S}$.',
              'The bridge is most sensitive when all four resistances $P, Q, R, S$ are of approximately equal magnitude.'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Carbon Resistor Color Code & Tolerances',
            content: 'NCERT Table 3.2: "BBROY Great Britain Very Good Wife" — Black ($0$), Brown ($1$), Red ($2$), Orange ($3$), Yellow ($4$), Green ($5$), Blue ($6$), Violet ($7$), Grey ($8$), White ($9$). Gold ($\\pm 5\\%$), Silver ($\\pm 10\\%$), No Color ($\\pm 20\\%$).'
          }
        ],
        flowchartOrDerivation: {
          title: 'Step-by-Step Nodal Analysis for Complex Multi-Loop Circuits',
          steps: [
            { step: 'Step 1', desc: 'Identify all essential nodes and assign one node as Reference/Ground ($V = 0\\text{ V}$).' },
            { step: 'Step 2', desc: 'Assign unknown node potentials $V_1, V_2$ to the remaining nodes.' },
            { step: 'Step 3', desc: 'Write KCL at each node: sum of outward currents $= 0$: $\\sum \\frac{V_{\\text{node}} - V_{\\text{neighbor}}}{R} = 0$.' },
            { step: 'Step 4', desc: 'Solve linear algebraic equations directly using substitution or Cramer\'s Rule.' }
          ]
        }
      },
      {
        id: 'cells-and-measuring-instruments',
        title: '3. Cells, Combinations & Meter Bridge',
        standardTheory: [
          'An electrochemical cell maintains a potential difference between its electrodes. The EMF $\\mathcal{E}$ is the potential difference between terminals in an open circuit ($I = 0$).',
          'When drawing current $I$, terminal potential $V = \\mathcal{E} - I r$ due to internal resistance $r$. During charging by an external source, $V = \\mathcal{E} + I r$.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Mixed Cell Combinations & Max Power',
            content: 'For $n$ identical cells in $m$ parallel rows with external load $R$:',
            latex: 'I = \\frac{n \\mathcal{E}}{R + \\frac{n r}{m}}, \\quad P_{\\text{max}} = \\frac{n m \\mathcal{E}^2}{4 r} \\quad \\text{when } R = \\frac{n r}{m}',
            extraTips: [
              'Parallel cells of unequal EMF: $\\mathcal{E}_{\\text{eq}} = \\frac{\\mathcal{E}_1/r_1 + \\mathcal{E}_2/r_2}{1/r_1 + 1/r_2}$',
              'Equivalent internal resistance: $\\frac{1}{r_{\\text{eq}}} = \\frac{1}{r_1} + \\frac{1}{r_2}$'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Galvanometer Conversion to Ammeter & Voltmeter',
            content: '1. Ammeter: Connect small shunt resistance $S$ in PARALLEL with galvanometer $G$: $S = \\frac{I_g G}{I - I_g}$\n2. Voltmeter: Connect high resistance $R$ in SERIES with galvanometer $G$: $R = \\frac{V}{I_g} - G$',
            latex: 'S = \\frac{I_g G}{I - I_g} \\quad \\text{and} \\quad R = \\frac{V}{I_g} - G',
            extraTips: [
              'Ideal Ammeter resistance $= 0\\;\\Omega$. Ideal Voltmeter resistance $= \\infty\\;\\Omega$.',
              'If ammeter range is increased $n$ times ($I = n I_g$): $S = \\frac{G}{n - 1}$',
              'If voltmeter range is increased $n$ times ($V = n V_g$): $R = (n - 1) G$'
            ]
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Repeating Archetype',
        conceptTested: 'Galvanometer to Multi-Range Ammeter & Shunt Calculation',
        question: 'A galvanometer with coil resistance $G = 50\\;\\Omega$ gives full-scale deflection for a current of $I_g = 10\\text{ mA}$. To convert this galvanometer into an ammeter reading up to $I = 5\\text{ A}$, find the value of shunt resistance $S$ required.',
        solutionSteps: [
          'Given: Galvanometer resistance $G = 50\\;\\Omega$, Full-scale deflection current $I_g = 10\\text{ mA} = 0.01\\text{ A}$.',
          'Total current to be measured $I = 5\\text{ A}$.',
          'Current passing through shunt $S$: $I_s = I - I_g = 5 - 0.01 = 4.99\\text{ A}$.',
          'Since shunt and galvanometer are in parallel, $V_s = V_g \\implies S (I - I_g) = I_g G$.',
          '$S = \\frac{0.01 \\times 50}{4.99} = \\frac{0.50}{4.99} \\approx 0.1002\\;\\Omega$.'
        ],
        ntaTrapOrShortcut: 'Shortcut: $S = \\frac{G}{n - 1}$ where $n = \\frac{I}{I_g} = \\frac{5000}{10} = 500 \\implies S = \\frac{50}{499} \\approx 0.1002\\;\\Omega$. Beware of units: $10\\text{ mA}$ must be converted to Amperes!',
        answer: '$S \\approx 0.10\\;\\Omega$'
      },
      {
        number: 2,
        yearTag: 'JEE Main 2023 / 2021 Numerical',
        conceptTested: 'Unequal Cells in Parallel with Internal Resistance',
        question: 'Two cells of EMF $2\\text{ V}$ and $4\\text{ V}$ with internal resistances $1\\;\\Omega$ and $2\\;\\Omega$ respectively are connected in parallel with their like terminals together. Calculate the equivalent EMF $\\mathcal{E}_{\\text{eq}}$ and terminal potential $V$ across an external load of $R = 5\\;\\Omega$.',
        solutionSteps: [
          'Formula for two parallel cells: $\\mathcal{E}_{\\text{eq}} = \\frac{\\mathcal{E}_1/r_1 + \\mathcal{E}_2/r_2}{1/r_1 + 1/r_2}$',
          '$\\mathcal{E}_{\\text{eq}} = \\frac{2/1 + 4/2}{1/1 + 1/2} = \\frac{4}{1.5} = \\frac{8}{3}\\text{ V} \\approx 2.67\\text{ V}$.',
          'Internal resistance $r_{\\text{eq}}$: $\\frac{1}{r_{\\text{eq}}} = \\frac{1}{1} + \\frac{1}{2} = \\frac{3}{2} \\implies r_{\\text{eq}} = \\frac{2}{3}\\;\\Omega$.',
          'Circuit current through $5\\;\\Omega$ load: $I = \\frac{\\mathcal{E}_{\\text{eq}}}{R + r_{\\text{eq}}} = \\frac{8/3}{5 + 2/3} = \\frac{8}{17}\\text{ A}$.',
          'Terminal potential $V = I \\times R = \\frac{8}{17} \\times 5 = \\frac{40}{17}\\text{ V} \\approx 2.35\\text{ V}$.'
        ],
        ntaTrapOrShortcut: 'Common mistake: Students directly average EMFs $\\frac{2 + 4}{2} = 3\\text{ V}$, which ignores internal resistance weighting!',
        answer: '$\\mathcal{E}_{\\text{eq}} = \\frac{8}{3}\\text{ V}, \\; V = \\frac{40}{17}\\text{ V}$'
      }
    ],
    ncertGems: [
      {
        id: 'gem-1',
        title: 'Manganin and Constantan for Standard Resistors',
        statement: 'NCERT Section 3.7: Alloys such as Manganin, Constantan, and Nichrome are used for standard wire-wound resistors because their resistivity is very high and has extremely low temperature coefficient of resistance (almost independent of temperature).',
        tableOrPageRef: 'NCERT Class 12 Part 1, Page 104',
        importanceReason: 'Asked directly as a statement/assertion-reason question in JEE Main 2022 & 2024.'
      },
      {
        id: 'gem-2',
        title: 'Semiconductor vs Metallic Resistivity Curve',
        statement: 'For metals, resistivity increases with temperature (positive α). For semiconductors and insulators, resistivity DECREASES exponentially with increasing temperature because charge carrier density n increases exponentially: n(T) ∝ exp(-E_g / k_B T).',
        tableOrPageRef: 'NCERT Class 12 Part 1, Page 105 (Fig 3.9 & 3.10)',
        importanceReason: 'NTA frequently asks students to match the correct ρ vs T graph for Copper, Nichrome, and Silicon.'
      }
    ],
    flashcards: [
      {
        id: 'fc-1',
        question: 'What is the relation between current I and drift velocity v_d?',
        answer: 'I = n · e · A · v_d, where n is free electron density, e is electronic charge, and A is cross-sectional area.',
        latex: 'I = n e A v_d',
        tag: 'Drift Theory'
      },
      {
        id: 'fc-2',
        question: 'How does wire resistance change when length is stretched to n times initial length?',
        answer: 'Since volume is conserved (V = A·L), R increases by a factor of n²: R_new = n² · R_old.',
        latex: 'R_{new} = n^2 R_{old}',
        tag: 'Resistance'
      },
      {
        id: 'fc-3',
        question: 'What is the condition for Maximum Power delivered by a battery to a variable load resistor R?',
        answer: 'Maximum power is delivered when load resistance R equals the internal resistance r of the source (R = r). Max power P_max = E² / (4r).',
        latex: 'P_{max} = \\frac{E^2}{4r} \\quad \\text{when } R = r',
        tag: 'Maximum Power Theorem'
      },
      {
        id: 'fc-4',
        question: 'What shunt resistance is needed to convert a galvanometer of resistance G and full-scale current I_g to measure total current I?',
        answer: 'S = (I_g · G) / (I - I_g). It must be connected in parallel.',
        latex: 'S = \\frac{I_g G}{I - I_g}',
        tag: 'Instruments'
      }
    ]
  },
  {
    id: 'phy-12-09-dual-nature-atoms-nuclei',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 9,
    title: 'Dual Nature, Atoms & Nuclei',
    ncertName: 'Dual Nature of Radiation & Matter, Atoms, Nuclei',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (3–4 Qs)',
    avgQuestions: '3 to 4 Questions per Shift',
    expectedWeightage: '12–16 Marks',
    highlightedSubtopics: [
      'Einstein’s Photoelectric Equation & Stopping Potential Graphs',
      'de Broglie Wavelength of Charged & Neutral Particles',
      'Bohr Model Radii, Velocities & Total Energy Formulas',
      'Hydrogen Emission Spectral Series & Rydberg Formula',
      'Nuclear Binding Energy per Nucleon Curve & Q-Value Calculations'
    ],
    pyqTrend: {
      avgQuestions5Yr: 3.5,
      difficulty: 'Easy',
      marksPercentage: '11.8% of Physics',
      topRepeatedConcepts: [
        'Stopping potential vs frequency (V_0 vs ν) slope (= h/e) & intercept',
        'Bohr model transitions (Lyman, Balmer series wave numbers: 1/λ = R_H (1/n1² - 1/n2²))',
        'de Broglie wavelength for accelerated electrons: λ = 12.27 / √V Å',
        'Binding energy per nucleon stability curve & alpha/beta mass defect calculations'
      ],
      recentShiftFocus: 'Direct, formula-based scoring questions. High accuracy chapter with 100% predictable patterns.'
    },
    mustSolveChecklist: [
      'Analyze Photoelectric Effect: Saturation Current vs Intensity, Stopping Potential vs Frequency',
      'Calculate de Broglie wavelength for electron (λ = 1.227 nm / √V) and thermal neutron (λ = h / √(3mkT))',
      'Memorize Bohr formulas for r_n (0.529 n²/Z Å), v_n (2.18 × 10^6 Z/n m/s), and E_n (-13.6 Z²/n² eV)',
      'Calculate Shortest (series limit) and Longest wavelengths in Lyman and Balmer series',
      'Compute Q-value of nuclear reactions: Q = [m_reactants - m_products] × 931.5 MeV',
      'Solve radioactive decay law N(t) = N_0 e^(-λt) and half-life T_1/2 = 0.693 / λ'
    ],
    notesSections: [
      {
        id: 'photoelectric-effect',
        title: '1. Photoelectric Effect & Einstein\'s Photon Theory',
        standardTheory: [
          'Photoelectric effect is the instantaneous emission of electrons from a metal surface when irradiated with electromagnetic radiation above a threshold frequency ν_0.',
          'Classical wave theory failed because it predicted a time lag for energy accumulation and energy dependence on intensity. Einstein treated light as discrete quanta (photons) of energy E = hν.'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Einstein’s Photoelectric Equation & Graph Slopes',
            content: 'Energy conservation for an emitted photoelectron with maximum kinetic energy K_max:',
            latex: 'K_{\\text{max}} = e V_0 = h \\nu - \\phi_0 = h(\\nu - \\nu_0) = h c \\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right)',
            extraTips: [
              'Graph of Stopping Potential V_0 vs frequency ν is a STRAIGHT LINE with slope = h/e (universal constant, identical for ALL metals!).',
              'The x-intercept gives threshold frequency ν_0. The y-intercept gives -φ_0 / e.',
              'Saturation current is directly proportional to intensity of incident radiation, but INDEPENDENT of frequency.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Intensity Doubled vs Frequency Doubled',
            content: 'If intensity is doubled (keeping ν constant), stopping potential remains UNCHANGED; only saturation current doubles! If frequency is doubled, stopping potential increases more than twice because φ_0 is constant.',
            latex: 'e V_0\' = 2 h \\nu - \\phi_0 = 2(h\\nu - \\phi_0) + \\phi_0 > 2 e V_0'
          }
        ]
      },
      {
        id: 'bohr-atom',
        title: '2. Bohr Model of Hydrogen-Like Atoms',
        standardTheory: [
          'Bohr postulated that electrons orbit the nucleus in non-radiating stationary orbits where orbital angular momentum is quantized: L = m v r = n(h / 2π).',
          'Radiation is emitted or absorbed only during quantum jumps between energy levels: ΔE = E_2 - E_1 = hν.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Complete Bohr Scaling Laws',
            content: 'For an atom/ion with atomic number Z and principal quantum number n:',
            latex: 'r_n = 0.529 \\, \\frac{n^2}{Z} \\, \\text{Å}, \\quad v_n = 2.18 \\times 10^6 \\, \\frac{Z}{n} \\, \\text{m/s}, \\quad E_n = -13.6 \\, \\frac{Z^2}{n^2} \\, \\text{eV}',
            extraTips: [
              'Kinetic Energy K = -E_total = 13.6 Z²/n² eV',
              'Potential Energy U = 2 × E_total = -27.2 Z²/n² eV',
              'Orbital Time Period T_n ∝ n³ / Z²; Orbital Frequency f_n ∝ Z² / n³',
              'Equivalent Current I = e · f_n ∝ Z² / n³; Magnetic Dipole Moment M = I · A ∝ n'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Spectral Series & Region Matching',
            content: 'NCERT Table 12.1: Lyman series (n1 = 1) lies strictly in ULTRAVIOLET region; Balmer series (n1 = 2) lies in the VISIBLE region (first 4 lines in visible); Paschen (n1 = 3), Brackett (n1 = 4), Pfund (n1 = 5) lie in INFRARED.'
          }
        ]
      },
      {
        id: 'nuclear-physics',
        title: '3. Nuclear Structure, Mass Defect & Binding Energy',
        standardTheory: [
          'Nuclei consist of protons and neutrons (nucleons). Nuclear radius scales with mass number A as R = R_0 A^(1/3), where R_0 ≈ 1.2 × 10^(-15) m = 1.2 fm.',
          'Nuclear density is independent of mass number A and is extremely high (ρ ≈ 2.3 × 10^17 kg/m³).'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Mass Defect & Nuclear Q-Value',
            content: 'Mass defect Δm = [Z·m_p + (A - Z)m_n] - M_nucleus. Binding Energy E_b = Δm × c².',
            latex: 'E_b = \\Delta m \\times 931.5 \\, \\text{MeV/amu}, \\quad Q = [\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}] \\times 931.5 \\, \\text{MeV}',
            extraTips: [
              'Nuclear Fusion: Light nuclei (A < 30) fuse to increase BE/nucleon.',
              'Nuclear Fission: Heavy nuclei (A > 200) split to increase BE/nucleon.',
              'Highest BE per nucleon is for Fe-56 (approx 8.75 MeV/nucleon), making it the most stable nucleus.'
            ]
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Archetype',
        conceptTested: 'de Broglie Wavelength Ratio for Accelerated Particles',
        question: 'An electron, an alpha particle, and a proton are accelerated from rest through the same potential difference V. Find the ratio of their de Broglie wavelengths λ_e : λ_p : λ_α.',
        solutionSteps: [
          'de Broglie wavelength for a particle of mass m, charge q accelerated by potential V: λ = h / p = h / √(2 m q V).',
          'Since V and h are constant: λ ∝ 1 / √(m · q).',
          'Electron: m_e, q_e = e ⇒ product = m_e · e.',
          'Proton: m_p, q_p = e ⇒ product = m_p · e.',
          'Alpha particle: m_α = 4 m_p, q_α = 2 e ⇒ product = 8 m_p · e.',
          'Ratio λ_p / λ_α = √(8 m_p · e / m_p · e) = √8 = 2√2.',
          'Since m_e << m_p, λ_e is significantly larger than λ_p and λ_α.'
        ],
        ntaTrapOrShortcut: 'Shortcut: Remember the standard accelerated electron formula λ_e = 12.27 / √V Å. For proton λ_p = 0.286 / √V Å.',
        answer: 'λ ∝ 1 / √(m q), hence λ_e >> λ_p = 2√2 λ_α'
      }
    ],
    ncertGems: [
      {
        id: 'gem-modern-1',
        title: 'Universal Nature of Stopping Potential Slope',
        statement: 'NCERT Section 11.4: The slope of the V_0 vs ν curve is always h/e, completely independent of the nature of the cathode material, the temperature of the emitter, or the intensity of radiation.',
        tableOrPageRef: 'NCERT Class 12 Part 2, Page 391',
        importanceReason: 'Appeared in multiple JEE shifts as an assertion-reason question.'
      }
    ],
    flashcards: [
      {
        id: 'fc-m1',
        question: 'What is the formula for the radius of the n-th Bohr orbit?',
        answer: 'r_n = 0.529 · (n² / Z) Å.',
        latex: 'r_n = 0.529 \\frac{n^2}{Z} \\text{ Å}',
        tag: 'Bohr Model'
      },
      {
        id: 'fc-m2',
        question: 'What is the total energy of an electron in the n-th orbit of a hydrogen-like atom?',
        answer: 'E_n = -13.6 · (Z² / n²) eV. Note that Kinetic Energy = +13.6 (Z²/n²) eV and Potential Energy = -27.2 (Z²/n²) eV.',
        latex: 'E_n = -13.6 \\frac{Z^2}{n^2} \\text{ eV}',
        tag: 'Bohr Model'
      },
      {
        id: 'fc-m3',
        question: 'Which spectral series of Hydrogen lies in the visible spectrum?',
        answer: 'Balmer series (n_1 = 2, n_2 = 3, 4, 5...). Specifically, H_α (656 nm red), H_β (486 nm cyan), H_γ (434 nm blue), H_δ (410 nm violet).',
        tag: 'Spectra'
      }
    ]
  },
  {
    id: 'phy-11-06-system-of-particles-and-rotation',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 6,
    title: 'System of Particles & Rotational Motion',
    ncertName: 'System of Particles and Rotational Motion',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    highlightedSubtopics: [
      'Center of Mass & Negative Mass Cavity Problems',
      'Moment of Inertia: Parallel & Perpendicular Axis Theorems',
      'Torque, Angular Momentum Conservation & Collisions',
      'Pure Rolling Motion on Horizontal & Inclined Planes',
      'Toppling vs Sliding Conditions'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.6,
      difficulty: 'Tough',
      marksPercentage: '9.2% of Physics',
      topRepeatedConcepts: [
        'Pure rolling on inclined plane (acceleration a = g sinθ / (1 + k²/R²))',
        'Moment of Inertia calculation after removing circular cavity of radius R/2',
        'Angular momentum conservation about instantaneous axis of rotation (IAOR)',
        'Conservation of angular momentum when person walks on rotating turntable'
      ],
      recentShiftFocus: 'Calculation of friction force direction and magnitude during rolling with slipping.'
    },
    mustSolveChecklist: [
      'Cavity mass reduction method: X_com = (M1 X1 - M2 X2) / (M1 - M2)',
      'Parallel axis theorem: I = I_cm + M d² (remember d is distance from center of mass)',
      'Perpendicular axis theorem: I_z = I_x + I_y (valid strictly for 2D planar bodies)',
      'Pure rolling condition: v_cm = ω R and a_cm = α R',
      'Acceleration down incline: a = g sinθ / (1 + I_cm / (MR²))',
      'Calculate angular momentum about origin: L = r_cm × P_cm + I_cm ω'
    ],
    notesSections: [
      {
        id: 'cavity-and-moi',
        title: '1. Center of Mass & Cavity Problems',
        standardTheory: [
          'For a discrete system of particles, the center of mass position vector is R_cm = (Σ m_i r_i) / (Σ m_i).',
          'When a portion of mass is excavated from a symmetrical body, treat the cavity as negative mass (-m) added to the complete, un-excavated body.'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Cavity Problems in COM & MOI',
            content: 'Whenever a disc/sphere of radius R/2 is cut from a uniform disc of radius R touching the boundary:',
            latex: 'X_{\\text{com}} = \\frac{M_1 X_1 - M_2 X_2}{M_1 - M_2} = \\frac{M(0) - (M/4)(R/2)}{M - M/4} = -\\frac{R}{6}',
            extraTips: [
              'Mass of removed portion M_removed = M_total × (Area_removed / Area_total) = M/4 (for 2D disc).',
              'For 3D sphere: M_removed = M × (R/2)³ / R³ = M/8.',
              'Remaining Moment of Inertia: I_remaining = I_total - I_removed.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Applying Perpendicular Axis Theorem to 3D Bodies',
            content: 'The Perpendicular Axis Theorem (I_z = I_x + I_y) applies ONLY to 2D Planar Laminas (like discs, rings, thin rectangular sheets). NEVER apply it to a sphere, cylinder, or cone!',
            latex: 'I_z = I_x + I_y \\quad (\\text{STRICTLY 2D PLANAR BODIES ONLY})'
          }
        ]
      },
      {
        id: 'pure-rolling',
        title: '2. Pure Rolling on Inclined Plane & Energy',
        standardTheory: [
          'Pure rolling is the combination of pure translational motion of center of mass and pure rotation about the center of mass.',
          'At the point of contact with the ground, instantaneous velocity is zero: v_bottom = v_cm - ω R = 0 ⇒ v_cm = ω R.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Incline Acceleration & Velocity at Bottom',
            content: 'When a body of radius R and radius of gyration k rolls down an incline of angle θ and height h:',
            latex: 'a = \\frac{g \\sin\\theta}{1 + \\frac{k^2}{R^2}}, \\quad v = \\sqrt{\\frac{2gh}{1 + \\frac{k^2}{R^2}}}, \\quad f_s = \\frac{mg \\sin\\theta}{1 + \\frac{R^2}{k^2}} \\le \\mu_s N',
            extraTips: [
              'Order of acceleration down incline: Solid Sphere (k²/R² = 2/5 = 0.4) > Solid Cylinder/Disc (0.5) > Hollow Sphere (2/3 ≈ 0.67) > Ring/Hollow Cylinder (1.0).',
              'Hence, Solid Sphere reaches the bottom FIRST with highest speed!'
            ]
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2022',
        conceptTested: 'Disc with Circular Cavity Moment of Inertia',
        question: 'From a uniform circular disc of mass M and radius R, a circular disc of diameter R is cut out whose boundary passes through the center and edge of the main disc. Find the moment of inertia of the remaining portion about an axis passing through the center of the main disc and perpendicular to its plane.',
        solutionSteps: [
          'Initial disc: Mass = M, Radius = R. Moment of Inertia about central axis I_0 = (1/2) M R².',
          'Removed disc has radius r = R/2. Area = π(R/2)² = (1/4) π R². Mass m = M/4.',
          'Distance between center of main disc and removed disc d = R/2.',
          'MOI of removed disc about its own central axis: I_cm = (1/2) m r² = (1/2)(M/4)(R/2)² = M R² / 32.',
          'By Parallel Axis Theorem, MOI of removed disc about central axis of main disc: I\' = I_cm + m d² = (M R² / 32) + (M/4)(R/2)² = (M R² / 32) + (M R² / 16) = 3 M R² / 32.',
          'MOI of remaining disc: I_rem = I_0 - I\' = (1/2 M R²) - (3/32 M R²) = (16 - 3) M R² / 32 = 13/32 M R².'
        ],
        ntaTrapOrShortcut: 'Trap: Forgetting to apply parallel axis theorem to the removed disc before subtracting from the total MOI!',
        answer: '13/32 M R²'
      }
    ],
    ncertGems: [
      {
        id: 'gem-rot-1',
        title: 'Work Done by Static Friction in Pure Rolling',
        statement: 'NCERT Section 7.14: In pure rolling motion on a stationary horizontal or inclined surface, the point of contact is instantaneously at rest. Therefore, the work done by static friction is EXACTLY ZERO, and mechanical energy is completely conserved!',
        tableOrPageRef: 'NCERT Class 11 Part 1, Page 174',
        importanceReason: 'Frequently asked conceptual question in JEE Main multiple choice.'
      }
    ],
    flashcards: [
      {
        id: 'fc-r1',
        question: 'What is the condition for a body to roll without slipping down an incline of angle θ?',
        answer: 'The coefficient of static friction must satisfy: μ_s ≥ (tan θ) / (1 + R² / k²).',
        latex: '\\mu_s \\ge \\frac{\\tan\\theta}{1 + \\frac{R^2}{k^2}}',
        tag: 'Rolling'
      },
      {
        id: 'fc-r2',
        question: 'What is the total kinetic energy of a rolling body?',
        answer: 'K_total = K_trans + K_rot = (1/2) M v_cm² + (1/2) I_cm ω² = (1/2) M v_cm² (1 + k²/R²).',
        latex: 'K_{\\text{total}} = \\frac{1}{2} M v_{\\text{cm}}^2 \\left(1 + \\frac{k^2}{R^2}\\right)',
        tag: 'Energy'
      }
    ]
  },
  {
    id: 'phy-11-01-units-and-measurements',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 1,
    title: 'Units, Dimensions & Errors',
    ncertName: 'Units and Measurements',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: [
      'Dimensional Analysis & Finding Unknown Exponents',
      'Vernier Callipers & Screw Gauge Least Count Calculations',
      'Propagation of Errors (Relative & Percentage Error)',
      'Significant Figures & Rounding Off Rules'
    ],
    pyqTrend: {
      avgQuestions5Yr: 1.6,
      difficulty: 'Easy',
      marksPercentage: '5.2% of Physics',
      topRepeatedConcepts: [
        'Screw gauge zero error (positive/negative) and pitch calculation',
        'Vernier Callipers: LC = 1 MSD - 1 VSD',
        'Relative error formula: ΔZ/Z = a(ΔA/A) + b(ΔB/B)'
      ],
      recentShiftFocus: 'Direct experimental physics numericals on screw gauge pitch and zero error adjustment.'
    },
    mustSolveChecklist: [
      'Vernier LC = 1 MSD (1 - m/n) when n VSD = m MSD',
      'Screw gauge: Reading = Pitch Scale + (Circular Scale Reading - Zero Error) × LC',
      'Error in Z = A^p B^q / C^r is ΔZ/Z = p(ΔA/A) + q(ΔB/B) + r(ΔC/C)',
      'Dimensions of permeability μ0, permittivity ε0, and Planck constant h'
    ],
    notesSections: [
      {
        id: 'screw-gauge',
        title: '1. Experimental Mechanics: Vernier & Screw Gauge',
        standardTheory: [
          'Vernier calliper least count is the smallest value that can be measured directly. Usually n VSD = (n - 1) MSD.',
          'Screw gauge works on the principle of converting circular motion into linear advancement.'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Least Count & True Reading Formulas',
            content: 'Vernier Callipers: LC = 1 MSD - 1 VSD = (1 - m/n) MSD.\nScrew Gauge: LC = Pitch / (Number of Circular Scale Divisions).\nTrue Reading = Main Scale Reading + (Coinciding Division × LC) - (Zero Error).',
            latex: '\\text{True Reading} = \\text{MSR} + (\\text{CSR} \\times \\text{LC}) - (\\pm \\text{Zero Error})',
            extraTips: ['Positive zero error is SUBTRACTED; Negative zero error is ADDED!']
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024',
        conceptTested: 'Screw Gauge with Negative Zero Error',
        question: 'A screw gauge has pitch 0.5 mm and 50 circular divisions. When jaws are closed, the 45th division of circular scale coincides with reference line and zero is above reference. If measurement gives 2 mm MSR and 20 CSR, find the true diameter.',
        solutionSteps: [
          'LC = 0.5 mm / 50 = 0.01 mm.',
          'Zero is above reference line: Zero Error is negative: ZE = -(50 - 45) × 0.01 = -0.05 mm.',
          'Observed Reading = 2 mm + 20 × 0.01 mm = 2.20 mm.',
          'True Reading = Observed - (Zero Error) = 2.20 - (-0.05) = 2.25 mm.'
        ],
        ntaTrapOrShortcut: 'Negative zero error adds up to the observed reading.',
        answer: '2.25 mm'
      }
    ],
    ncertGems: [
      {
        id: 'gem-u1',
        title: 'Relation between c, μ0, and ε0',
        statement: 'NCERT Section 2.7: The speed of light in vacuum is c = 1 / √(μ0 ε0). Therefore, the dimension of [1 / √(μ0 ε0)] is [L T⁻¹].',
        tableOrPageRef: 'NCERT Class 11 Part 1, Page 22',
        importanceReason: 'Appeared in multiple JEE shifts as an exact match of dimensions.'
      }
    ],
    flashcards: [
      {
        id: 'fc-u1',
        question: 'What is the formula for percentage error in X = A^a B^b / C^c?',
        answer: '% error in X = a(% error in A) + b(% error in B) + c(% error in C). Errors always ADD up!',
        latex: '\\frac{\\Delta X}{X} \\times 100 = a\\%_A + b\\%_B + c\\%_C',
        tag: 'Error Analysis'
      }
    ]
  },
  {
    id: 'phy-11-02-motion-straight-line',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 2,
    title: 'Motion in a Straight Line',
    ncertName: 'Motion in a Straight Line',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1 Q)',
    avgQuestions: '1 Question per Shift',
    expectedWeightage: '4 Marks',
    highlightedSubtopics: ['v-t & a-t Graphs Conversion', 'Motion under Gravity & Reaction Time', 'Variable Acceleration Calculus (v dv/dx)'],
    pyqTrend: { avgQuestions5Yr: 1.1, difficulty: 'Easy', marksPercentage: '3.5%', topRepeatedConcepts: ['v-t graph area and slope', 'Ratio of distances in successive equal time intervals (1:3:5:7 Galileo)'], recentShiftFocus: 'Calculus based variable acceleration: a = v dv/dx.' },
    mustSolveChecklist: ['Galileo odd numbers law for free fall', 'Stopping distance proportional to v²', 'Average speed for equal distance vs equal time'],
    notesSections: [{ id: 'graphs', title: '1. Kinematics Graphs & Calculus', standardTheory: ['Slope of x-t is velocity, slope of v-t is acceleration, area under v-t is displacement.'], highlightBoxes: [{ type: 'formula', title: 'Calculus Relations', content: 'v = dx/dt, a = dv/dt = v(dv/dx)', latex: 'a = v \\frac{dv}{dx}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-03-motion-in-a-plane',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 3,
    title: 'Motion in a Plane',
    ncertName: 'Motion in a Plane',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1 Q)',
    avgQuestions: '1 Question per Shift',
    expectedWeightage: '4 Marks',
    highlightedSubtopics: ['Projectile Motion Trajectory & Range', 'River-Swimmer & Rain-Man Relative Velocity', 'Centripetal Acceleration in Circular Motion'],
    pyqTrend: { avgQuestions5Yr: 1.2, difficulty: 'Moderate', marksPercentage: '3.8%', topRepeatedConcepts: ['Shortest time vs shortest path in river crossing', 'Trajectory equation y = x tanθ (1 - x/R)'], recentShiftFocus: 'Rain-man umbrella angle when running.' },
    mustSolveChecklist: ['Trajectory equation y = x tanθ - gx²/(2u²cos²θ)', 'Max range R_max = u²/g at 45°', 'River shortest path sinθ = v_r / v_m'],
    notesSections: [{ id: 'proj', title: '1. Projectile Motion Trajectory Vault', standardTheory: ['Horizontal motion is uniform, vertical motion is under constant gravity.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Shortcut Trajectory Formula', content: 'y = x tanθ (1 - x/R)', latex: 'y = x \\tan\\theta \\left(1 - \\frac{x}{R}\\right)' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-04-laws-of-motion',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 4,
    title: 'Laws of Motion & Friction',
    ncertName: 'Laws of Motion',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Free Body Diagrams & Pseudo Force', 'Pulley-Wedge String Constraint Relations', 'Two-Block Friction Systems', 'Circular Banking with Friction'],
    pyqTrend: { avgQuestions5Yr: 1.7, difficulty: 'Moderate', marksPercentage: '5.8%', topRepeatedConcepts: ['Two-block friction threshold acceleration', 'Banking of road v = √(rg(tanθ + μ)/(1 - μ tanθ))'], recentShiftFocus: 'Constraint equations relating acceleration of movable pulleys.' },
    mustSolveChecklist: ['Tension method for string constraints: Σ T · a = 0', 'Two block friction: identify which block moves first', 'Optimum banking speed v_0 = √(r g tanθ)'],
    notesSections: [{ id: 'two-block', title: '1. Two-Block Friction & Banking', standardTheory: ['Static friction adjusts self-direction and magnitude up to limiting value fs ≤ μs N.'], highlightBoxes: [{ type: 'formula', title: 'Banked Road Safe Speed Range', content: 'Maximum safe speed with friction', latex: 'v_{\\max} = \\sqrt{r g \\frac{\\tan\\theta + \\mu}{1 - \\mu \\tan\\theta}}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-05-work-energy-power',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 5,
    title: 'Work, Energy & Power',
    ncertName: 'Work, Energy and Power',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Work-Energy Theorem (W_net = ΔK)', 'Vertical Circular Motion Critical Speeds', 'Spring Potential Energy & Equilibrium', 'Collisions in 1D & 2D (Coefficient of Restitution)'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Moderate', marksPercentage: '6.0%', topRepeatedConcepts: ['Critical velocity at lowest point for loop = √(5gR)', 'Coefficient of restitution e = (v2 - v1)/(u1 - u2)'], recentShiftFocus: 'Power delivered by variable force: P = F · v = dW/dt.' },
    mustSolveChecklist: ['Work-Energy Theorem: W_conservative + W_non-conservative + W_external = ΔK', 'Vertical circle: T_bottom - T_top = 6mg', 'Inelastic collision energy loss formula'],
    notesSections: [{ id: 'vertical-circle', title: '1. Vertical Circular Motion & Critical Speeds', standardTheory: ['String goes slack if tension vanishes before zenith.'], highlightBoxes: [{ type: 'formula', title: 'Critical Speeds for Full Loop', content: 'Bottom: v ≥ √(5gR), Top: v ≥ √(gR)', latex: 'v_{\\text{bottom}} \\ge \\sqrt{5gR}, \\quad v_{\\text{top}} \\ge \\sqrt{gR}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-07-gravitation',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 7,
    title: 'Gravitation',
    ncertName: 'Gravitation',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Variation of g with Height, Depth & Rotation', 'Escape Velocity & Orbital Velocity', 'Kepler’s Third Law & Satellite Binding Energy', 'Gravitational Potential & Potential Energy'],
    pyqTrend: { avgQuestions5Yr: 1.5, difficulty: 'Easy', marksPercentage: '5.0%', topRepeatedConcepts: ['g_depth = g(1 - d/R) vs g_height = g/(1 + h/R)²', 'Escape speed v_e = √(2GM/R) = √(2gR) = 11.2 km/s'], recentShiftFocus: 'Energy required to boost a satellite to higher orbit.' },
    mustSolveChecklist: ['g at depth d is linear: g(1 - d/R)', 'Orbital speed v_0 = √(GM/r); Total energy E = -GMm/(2r)', 'Kepler’s Law T² ∝ r³'],
    notesSections: [{ id: 'grav-var', title: '1. Variation of g & Satellite Energy', standardTheory: ['Gravitational force is conservative and central.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Binding Energy of Satellite', content: 'Kinetic energy = GMm/(2r), Potential energy = -GMm/r, Total energy = -GMm/(2r)', latex: 'E = -\\frac{GMm}{2r}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-08-solids-and-fluids',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 8,
    title: 'Mechanical Properties of Solids & Fluids',
    ncertName: 'Mechanical Properties of Solids and Fluids',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Stress-Strain Curve & Young’s Modulus', 'Bernoulli’s Principle & Equation of Continuity', 'Surface Tension & Excess Pressure (Bubble vs Drop)', 'Terminal Velocity & Stokes’ Law'],
    pyqTrend: { avgQuestions5Yr: 1.4, difficulty: 'Moderate', marksPercentage: '4.8%', topRepeatedConcepts: ['Excess pressure inside soap bubble ΔP = 4T/R vs water drop 2T/R', 'Terminal velocity v_t = 2r²(ρ - σ)g / (9η)'], recentShiftFocus: 'Capillary rise h = 2T cosθ / (r ρ g).' },
    mustSolveChecklist: ['Young’s modulus Y = (F/A) / (ΔL/L)', 'Bernoulli equation P + 1/2 ρ v² + ρgh = constant', 'Torricelli speed of efflux v = √(2gh)'],
    notesSections: [{ id: 'fluids', title: '1. Fluid Dynamics & Surface Phenomena', standardTheory: ['Incompressible, non-viscous fluid follows continuity A1 v1 = A2 v2 and Bernoulli theorem.'], highlightBoxes: [{ type: 'formula', title: 'Terminal Velocity Formula', content: 'v_t = 2r²(ρ - σ)g / (9η)', latex: 'v_t = \\frac{2 r^2 (\\rho - \\sigma) g}{9 \\eta}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-09-thermal-ktg',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 9,
    title: 'Thermal Properties & Kinetic Theory of Gases',
    ncertName: 'Thermal Properties of Matter & Kinetic Theory',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Calorimetry & Latent Heat Combinations', 'Thermal Conduction in Series/Parallel Rods', 'RMS, Average & Most Probable Gas Speeds', 'Degrees of Freedom & Molar Heat Capacities (Cp, Cv, γ)'],
    pyqTrend: { avgQuestions5Yr: 1.7, difficulty: 'Easy', marksPercentage: '5.5%', topRepeatedConcepts: ['Gas speed order: v_rms > v_avg > v_mp (ratio √3 : √(8/π) : √2)', 'Mixture γ_mix = (n1 Cp1 + n2 Cp2) / (n1 Cv1 + n2 Cv2)'], recentShiftFocus: 'Degrees of freedom: monoatomic f=3, diatomic f=5 (rigid), non-linear polyatomic f=6.' },
    mustSolveChecklist: ['v_rms = √(3RT/M)', 'Cv = f/2 R, Cp = (f/2 + 1)R, γ = 1 + 2/f', 'Heat current H = k A (T1 - T2) / L'],
    notesSections: [{ id: 'ktg', title: '1. Speeds & Degrees of Freedom', standardTheory: ['Equipartition theorem states each quadratic degree of freedom possesses 1/2 k_B T energy per molecule.'], highlightBoxes: [{ type: 'formula', title: 'Gas Molecular Speeds', content: 'v_rms = √(3RT/M), v_avg = √(8RT/πM), v_mp = √(2RT/M)', latex: 'v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-10-thermodynamics',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 10,
    title: 'Thermodynamics',
    ncertName: 'Thermodynamics',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['First Law of Thermodynamics (ΔQ = ΔU + W)', 'Isothermal, Adiabatic, Isochoric & Isobaric Work', 'P-V Indicator Diagrams & Cyclic Process Efficiency', 'Carnot Engine & Efficiency η = 1 - T2/T1'],
    pyqTrend: { avgQuestions5Yr: 2.1, difficulty: 'Moderate', marksPercentage: '7.2%', topRepeatedConcepts: ['Adiabatic work W = (P1 V1 - P2 V2) / (γ - 1)', 'Slope of adiabatic curve = γ × slope of isothermal curve', 'Area enclosed by cyclic P-V graph = Net work done'], recentShiftFocus: 'Sign convention trap: Physics W = ∫ P dV (work done by gas) vs Chemistry W = -∫ P dV.' },
    mustSolveChecklist: ['ΔU = n Cv ΔT for ANY process of an ideal gas', 'Isothermal work W = nRT ln(V2/V1)', 'Carnot efficiency η = 1 - T_C / T_H'],
    notesSections: [{ id: 'thermo-laws', title: '1. First Law & Process Work Formulas', standardTheory: ['In Physics, heat added ΔQ > 0, work done by system W > 0.'], highlightBoxes: [{ type: 'trap', title: '⚠️ Physics vs Chemistry Work Done', content: 'In Physics: ΔQ = ΔU + W where W = +P ΔV.\nIn Chemistry: ΔU = q + w where w = -P_ext ΔV.', latex: '\\Delta Q = \\Delta U + W \\quad (\\text{Physics})' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-11-11-oscillations-waves',
    subject: 'physics',
    classLevel: '11',
    chapterNumber: 11,
    title: 'Oscillations (SHM) & Waves',
    ncertName: 'Oscillations and Waves',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Spring-Mass System Time Period & Combinations', 'Energy in SHM (Kinetic vs Potential interchange)', 'Organ Pipes (Open & Closed) Harmonics', 'Beats Frequency (f_b = |f1 - f2|)'],
    pyqTrend: { avgQuestions5Yr: 1.5, difficulty: 'Moderate', marksPercentage: '5.2%', topRepeatedConcepts: ['Open organ pipe has all harmonics (v/2L, 2v/2L...)', 'Closed organ pipe has ONLY ODD harmonics (v/4L, 3v/4L...)', 'Time period of cut spring: k ∝ 1/L'], recentShiftFocus: 'Total energy of SHM E = 1/2 m ω² A².' },
    mustSolveChecklist: ['T = 2π √(m/k) for spring; series 1/k = 1/k1 + 1/k2, parallel k = k1 + k2', 'Average KE = Average PE = 1/4 m ω² A² over full cycle', 'End correction: open pipe e = 0.6r on each side'],
    notesSections: [{ id: 'shm-pipes', title: '1. SHM Energy & Standing Sound Waves', standardTheory: ['SHM restoring force F = -kx. Sound waves are longitudinal pressure waves.'], highlightBoxes: [{ type: 'formula', title: 'Organ Pipes Harmonics', content: 'Closed: f_n = (2n - 1) v / (4L)\nOpen: f_n = n v / (2L)', latex: 'f_{\\text{closed}} = \\frac{(2n - 1)v}{4L}, \\quad f_{\\text{open}} = \\frac{nv}{2L}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-01-electric-charges-fields',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 1,
    title: 'Electric Charges & Fields',
    ncertName: 'Electric Charges and Fields',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Coulomb’s Law Vector Form & Principle of Superposition', 'Electric Dipole Field (Axial & Equatorial) & Torque (τ = p × E)', 'Gauss’s Law Applications (Infinite Wire, Sheet, Shell)'],
    pyqTrend: { avgQuestions5Yr: 1.6, difficulty: 'Moderate', marksPercentage: '5.4%', topRepeatedConcepts: ['Electric dipole field: E_axial = 2kp/r³, E_equatorial = kp/r³', 'Electric field inside uniform charged spherical shell is ZERO'], recentShiftFocus: 'Gauss flux through cube faces when charge is at corner (q/8ε0).' },
    mustSolveChecklist: ['Coulomb vector form', 'Torque τ = p × E and potential energy U = -p · E', 'Gauss flux Φ = q_enclosed / ε0'],
    notesSections: [{ id: 'gauss-dipole', title: '1. Dipoles & Gauss Flux', standardTheory: ['Electric field lines originate on positive charges and terminate on negative charges.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Dipole Field Ratio', content: 'E_axial / E_equatorial = 2 (for short dipole)', latex: '\\frac{E_{\\text{axial}}}{E_{\\text{equatorial}}} = 2' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-02-potential-capacitance',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 2,
    title: 'Electrostatic Potential & Capacitance',
    ncertName: 'Electrostatic Potential and Capacitance',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Equipotential Surfaces & E = -dV/dr', 'Capacitor Networks with Dielectric Slabs', 'Common Potential & Heat Loss in Sharing of Charges', 'Energy Density of Electric Field (1/2 ε0 E²)'],
    pyqTrend: { avgQuestions5Yr: 2.0, difficulty: 'Moderate', marksPercentage: '7.0%', topRepeatedConcepts: ['Dielectric slab inserted: Battery connected (V const) vs Battery disconnected (Q const)', 'Heat loss during sharing of charge ΔH = 1/2 (C1 C2 / (C1 + C2)) (V1 - V2)²'], recentShiftFocus: 'Mixed dielectric capacitors: parallel slabs (k_eff = Σ k_i A_i / A) vs series slabs.' },
    mustSolveChecklist: ['C = k ε0 A / d', 'Common potential V_c = (C1 V1 + C2 V2) / (C1 + C2)', 'Energy stored U = 1/2 C V² = Q² / (2C)'],
    notesSections: [{ id: 'capacitors', title: '1. Dielectrics & Energy Loss', standardTheory: ['Insertion of dielectric always increases capacitance by factor K.'], highlightBoxes: [{ type: 'formula', title: 'Heat Loss in Charge Sharing', content: 'ΔH = 1/2 [C1 C2 / (C1 + C2)] (V1 - V2)²', latex: '\\Delta H = \\frac{1}{2} \\frac{C_1 C_2}{C_1 + C_2} (V_1 - V_2)^2' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-04-moving-charges-magnetism',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 4,
    title: 'Moving Charges & Magnetism',
    ncertName: 'Moving Charges and Magnetism',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Biot-Savart Law (Circular Arcs & Straight Wires)', 'Ampere’s Circuital Law & Solenoid/Toroid', 'Charged Particle in B-Field (Radius r = mv/qB & Helical Motion)', 'Force between Parallel Currents & Moving Coil Galvanometer'],
    pyqTrend: { avgQuestions5Yr: 2.2, difficulty: 'Moderate', marksPercentage: '7.5%', topRepeatedConcepts: ['B on axis of circular loop B = μ0 i R² / (2(R² + x²)^(3/2))', 'Radius of helical path r = m v_perp / (q B), Pitch = v_parallel × (2πm / qB)'], recentShiftFocus: 'Magnetic field at center of circular arc: B = (μ0 i / 4π R) × θ.' },
    mustSolveChecklist: ['Lorentz force F = q(E + v × B)', 'Force per unit length between parallel wires f = μ0 I1 I2 / (2π d)', 'Magnetic dipole moment of loop M = I · A'],
    notesSections: [{ id: 'biot-savart', title: '1. Biot-Savart & Motion in B-Field', standardTheory: ['Magnetic force does no work on a moving charged particle since F is always perpendicular to velocity.'], highlightBoxes: [{ type: 'formula', title: 'Circular Motion in B-Field', content: 'r = mv / qB = p / qB = √(2mqV) / qB', latex: 'r = \\frac{mv}{qB} = \\frac{\\sqrt{2mqV}}{qB}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-05-magnetism-emi',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 5,
    title: 'Magnetism & Matter + EMI',
    ncertName: 'Magnetism and Matter & Electromagnetic Induction',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Dia-, Para-, and Ferro-Magnetic Properties & Curie Law', 'Faraday’s & Lenz’s Law of Induction', 'Motional EMF (e = B v L) & Rotating Rod EMF', 'Self & Mutual Inductance (L, M)'],
    pyqTrend: { avgQuestions5Yr: 1.4, difficulty: 'Easy', marksPercentage: '4.8%', topRepeatedConcepts: ['Lenz’s law direction conservation of energy', 'Rotating rod motional EMF e = 1/2 B ω L²'], recentShiftFocus: 'Magnetic susceptibility χ: Diamagnetic (small negative), Paramagnetic (small positive, ∝ 1/T).' },
    mustSolveChecklist: ['Induced EMF e = -dΦ/dt', 'Self-inductance of solenoid L = μ0 n² A l', 'RL circuit growth current I = I0(1 - e^(-t/τ))'],
    notesSections: [{ id: 'emi', title: '1. Faraday Law & Motional EMF', standardTheory: ['Induction opposes the change in magnetic flux that produces it.'], highlightBoxes: [{ type: 'formula', title: 'Rotating Rod EMF', content: 'e = 1/2 B ω L²', latex: 'e = \\frac{1}{2} B \\omega L^2' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-06-ac-emwaves',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 6,
    title: 'Alternating Current & EM Waves',
    ncertName: 'Alternating Current and Electromagnetic Waves',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Series LCR Circuit & Resonance (ω_0 = 1/√(LC))', 'Quality Factor Q & Power Factor (cos φ = R/Z)', 'Transformer Efficiency & Turns Ratio', 'EM Wave Relations (c = E0 / B0, Poynting Vector)'],
    pyqTrend: { avgQuestions5Yr: 2.1, difficulty: 'Easy', marksPercentage: '7.2%', topRepeatedConcepts: ['Resonance condition XL = XC, Z_min = R, current is maximum', 'EM wave relation E0/B0 = c and speed c = 1/√(μ0 ε0)'], recentShiftFocus: 'Average power in AC circuit: P_avg = V_rms I_rms cos φ.' },
    mustSolveChecklist: ['Impedance Z = √(R² + (XL - XC)²)', 'Resonant frequency f0 = 1 / (2π √(LC))', 'Power factor cosφ = R / Z'],
    notesSections: [{ id: 'lcr', title: '1. Series LCR Resonance & EM Wave Ratio', standardTheory: ['At resonance, voltage and current are in phase; circuit is purely resistive.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 EM Wave Amplitude Ratio', content: 'E0 / B0 = c = 3 × 10^8 m/s', latex: '\\frac{E_0}{B_0} = c' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-07-ray-optics',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 7,
    title: 'Ray Optics & Optical Instruments',
    ncertName: 'Ray Optics and Optical Instruments',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    highlightedSubtopics: [
      'Mirror Formula & Longitudinal vs Transverse Magnification',
      'Refraction at Spherical Interfaces & Apparent Depth',
      'Total Internal Reflection (TIR) & Optical Fibers',
      'Lens Maker’s Formula, Medium Changes & Silvering of Lenses',
      'Prism Minimum Deviation Formula & Dispersion',
      'Compound Microscope & Astronomical Telescope Magnifying Power'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.6,
      difficulty: 'Moderate',
      marksPercentage: '8.8% of Physics',
      topRepeatedConcepts: [
        'Prism minimum deviation: μ = sin((A + δ_m)/2) / sin(A/2) and grazed incidence',
        'Silvering of lens face (P_eff = 2 P_L + P_M) acting as concave mirror',
        'Lens maker formula with surrounding medium index: 1/f = (μ_lens/μ_med - 1)(1/R1 - 1/R2)',
        'Compound microscope & telescope magnifying powers at normal adjustment (infinity) vs near point (D = 25 cm)',
        'Refraction at single spherical interface: μ2/v - μ1/u = (μ2 - μ1)/R'
      ],
      recentShiftFocus: 'Combination of lenses, silvered lenses, and astronomical telescope length & magnification in normal adjustment.'
    },
    mustSolveChecklist: [
      'Derive Mirror Formula 1/v + 1/u = 1/f and apply sign convention without pre-assigning unknown signs',
      'Calculate Critical Angle sin(i_c) = 1/μ and analyze TIR in prisms and optical fibers',
      'Apply Lens Maker’s Formula in different media (air vs water vs denser liquids)',
      'Calculate Effective Power of Silvered Plano-Convex Lens: P_eff = 2 P_L + P_M',
      'Solve Prism problems at Minimum Deviation (r1 = r2 = A/2, i = e)',
      'Compute Compound Microscope Magnification: m = -(L/f_o)(D/f_e) and Telescope Length: L = f_o + f_e'
    ],
    notesSections: [
      {
        id: 'spherical-mirrors',
        title: '1. Reflection at Spherical Mirrors & Cartesian Sign Convention',
        standardTheory: [
          'In geometric optics, light rays travel in straight lines in homogeneous media. All distances are measured from the pole ($P$) of the mirror or optical center ($O$) of the lens.',
          'Distances measured in the direction of incident light are POSITIVE, while distances measured opposing the incident ray are NEGATIVE. Distances measured upward perpendicular to the principal axis are POSITIVE ($+y$), and downward are NEGATIVE ($-y$).',
          'For spherical mirrors with paraxial rays (rays making small angles with the principal axis), the focal length is half the radius of curvature: $f = \\frac{R}{2}$.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Mirror Formula & Magnifications',
            content: 'Relationship connecting object distance $u$, image distance $v$, and focal length $f$ ($f < 0$ for concave mirror, $f > 0$ for convex mirror):',
            latex: '\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f} = \\frac{2}{R}, \\quad m_T = -\\frac{v}{u} = \\frac{f}{f - u} = \\frac{f - v}{f}',
            extraTips: [
              'Transverse magnification $m_T = \\frac{h_i}{h_o} = -\\frac{v}{u}$.',
              'Longitudinal (axial) magnification for small object: $m_L = \\frac{dv}{du} = -\\left(\\frac{v}{u}\\right)^2 = -m_T^2$.',
              'Since $m_L$ is always negative, longitudinal image is always inverted with respect to object orientation.',
              'Superficial (areal) magnification: $m_A = \\frac{\\text{Area}_{\\text{image}}}{\\text{Area}_{\\text{object}}} = m_T^2$.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Pre-Assigning Signs to Unknown Quantities',
            content: 'Never substitute a sign for an unknown variable (like $v$ or $f$) when setting up the mirror or lens equation! Only substitute signs for the KNOWN given quantities. The algebra will naturally output the correct sign for the unknown.',
            extraTips: [
              'Example: If calculating object position for a virtual image, substitute $v$ as positive and $f$ as negative (for concave), but leave $u$ as a bare symbol "$u$".',
              'For concave mirror, real focus means $f = -|f|$. For convex mirror, virtual focus means $f = +|f|$.'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Relation Between Speed of Object and Speed of Image',
            content: 'Differentiating the mirror formula with respect to time gives the instantaneous image velocity $\\vec{v}_{\\text{image}}$ along the principal axis:',
            latex: '\\vec{v}_{\\text{image}} = -\\left(\\frac{v}{u}\\right)^2 \\vec{v}_{\\text{object}} = -m_T^2 \\, \\vec{v}_{\\text{object}}',
            extraTips: [
              'Image and object always move in OPPOSITE directions along the principal axis for a spherical mirror!',
              'When an object approaches a concave mirror from $\\infty$ to $F$, the image moves from $F$ to $\\infty$ with accelerating speed.'
            ]
          }
        ]
      },
      {
        id: 'refraction-tir',
        title: '2. Refraction at Interfaces, Apparent Depth & Total Internal Reflection',
        standardTheory: [
          'Snell’s Law states that for a ray passing from medium 1 (index $\\mu_1$) to medium 2 (index $\\mu_2$): $\\mu_1 \\sin i = \\mu_2 \\sin r$. Absolute index of refraction $\\mu = \\frac{c}{v} = \\frac{\\lambda_0}{\\lambda}$.',
          'When light travels from a denser medium ($\\mu_1$) into a rarer medium ($\\mu_2 < \\mu_1$), the refracted ray bends away from the normal. At a specific angle of incidence called the Critical Angle $i_c$, the angle of refraction becomes $90^\\circ$. For $i > i_c$, no refraction occurs; all energy is reflected back into the denser medium as Total Internal Reflection (TIR).'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Critical Angle & Apparent Depth Shifts',
            content: '1. Critical Angle condition (denser $\\mu_1$ to rarer $\\mu_2$): $\\sin i_c = \\frac{\\mu_2}{\\mu_1} = \\frac{1}{\\mu_{\\text{rel}}}$.\n2. Apparent depth of an object in denser medium viewed normally from rarer medium:',
            latex: '\\sin(i_c) = \\frac{\\mu_2}{\\mu_1}, \\quad d\' = \\frac{d}{\\mu}, \\quad \\Delta t = d\\left(1 - \\frac{1}{\\mu}\\right)',
            extraTips: [
              'Apparent normal shift $\\Delta t$ is INDEPENDENT of the position of the object below the surface.',
              'For a composite slab with layers of thickness $d_1, d_2$ and indices $\\mu_1, \\mu_2$: total shift $\\Delta t = d_1\\left(1 - \\frac{1}{\\mu_1}\\right) + d_2\\left(1 - \\frac{1}{\\mu_2}\\right)$.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Apparent Depth Formula is Only for Near-Normal Viewing',
            content: 'The simple formula $d\' = \\frac{d}{\\mu}$ is strictly valid ONLY for paraxial rays (rays viewed almost perpendicular to the interface). For oblique viewing at incident angle $i$, you MUST use exact Snell’s law: $d\' = d \\frac{\\tan r}{\\tan i}$. Never use $d\' = \\frac{d}{\\mu}$ when an oblique angle is specified in JEE Advanced!',
            latex: 'd\'_{\\text{oblique}} = d \\, \\frac{\\tan r}{\\tan i} \\approx \\frac{d}{\\mu} \\quad (\\text{only when } i, r \\to 0)'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Maximum Entry Angle for TIR in Optical Fiber / Glass Slab',
            content: 'For a ray entering the flat face of a glass block or optical fiber core (index $\\mu_{\\text{core}}$) in air, the maximum angle of incidence $i_{\\text{max}}$ such that the ray undergoes TIR at the lateral cylindrical cladding surface is:',
            latex: '\\sin(i_{\\text{max}}) = \\sqrt{\\mu_{\\text{core}}^2 - \\mu_{\\text{clad}}^2} \\quad (\\text{Numerical Aperture } NA = \\sin i_{\\text{max}})',
            extraTips: [
              'If cladding is air ($\\mu_{\\text{clad}} = 1$): $\\sin(i_{\\text{max}}) = \\sqrt{\\mu^2 - 1}$.',
              'If $\\mu \\ge \\sqrt{2} \\approx 1.414$, any ray entering the flat face undergoes TIR on the adjacent lateral face for ALL incident angles!'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Optical Fibers & Cladding Condition',
            content: 'NCERT Section 9.4: An optical fiber consists of a core of high refractive index ($\\mu_1 \\approx 1.68$) surrounded by a cladding of lower refractive index ($\\mu_2 \\approx 1.44$). Light undergoes repeated total internal reflections along the core with virtually zero intensity loss over kilometers.'
          }
        ]
      },
      {
        id: 'lenses-and-silvering',
        title: '3. Refraction at Spherical Surfaces, Lens Maker’s Formula & Silvering',
        standardTheory: [
          'Refraction at a single spherical surface of radius R separating medium 1 from medium 2 obeys: μ2 / v - μ1 / u = (μ2 - μ1) / R.',
          'Applying this relation to two successive spherical surfaces gives the celebrated Lens Maker’s Formula. A thin lens has negligible thickness compared to its surface radii.',
          'When two thin lenses of focal lengths f1 and f2 are placed in contact, their combined optical power is additive: P = P1 + P2.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Lens Maker & Effective Power Equations',
            content: 'Lens Maker’s equation for a lens of refractive index μ_L immersed in a surrounding medium of refractive index μ_M:',
            latex: '\\frac{1}{f} = \\left(\\frac{\\mu_L}{\\mu_M} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad P_{\\text{contact}} = P_1 + P_2 \\implies \\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2}',
            extraTips: [
              'For lenses separated by distance d in air: P_eq = P1 + P2 - d P1 P2.',
              'Equiconvex lens in air (R1 = +R, R2 = -R, μ = 1.5): 1/f = (1.5 - 1)(1/R - (-1/R)) = 1/R ⇒ f = R.',
              'Equiconcave lens in air (R1 = -R, R2 = +R, μ = 1.5): f = -R (diverging).'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Lens Immersed in Liquid Denser Than Lens Material',
            content: 'If a glass convex lens (μ_L = 1.5) is immersed in carbon disulfide or denser liquid (μ_M = 1.6 > μ_L), the term (μ_L / μ_M - 1) becomes NEGATIVE! The converging lens becomes DIVERGING (concave behavior), and a concave lens becomes converging!',
            latex: '\\frac{\\mu_L}{\\mu_M} < 1 \\implies \\frac{1}{f_{\\text{liquid}}} < 0 \\quad (\\text{Nature of lens inverts completely!})',
            extraTips: [
              'Ratio of focal lengths: f_liquid / f_air = [(μ_L - 1) / (μ_L/μ_M - 1)].',
              'If glass lens (1.5) is immersed in water (4/3): f_water = 4 × f_air (focal length quadruples!).'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Silvering of One Face of a Lens',
            content: 'Silvering transforms the lens into an equivalent curved mirror. Light passes through the lens, reflects from the silvered mirror surface, and passes back through the lens:',
            latex: 'P_{\\text{eff}} = 2 P_L + P_M = \\frac{2}{f_L} + \\frac{1}{f_M}, \\quad F_{\\text{eff}} = -\\frac{1}{P_{\\text{eff}}}',
            extraTips: [
              'Notice the MINUS sign in F_eff = -1 / P_eff because the system acts as a MIRROR (Power of mirror P_M = -1 / f_M).',
              'Plano-convex lens with flat side silvered: f_M = ∞ ⇒ P_M = 0 ⇒ P_eff = 2 P_L ⇒ F_eff = - f_L / 2.',
              'Plano-convex lens with curved side silvered: f_M = R/2 ⇒ P_M = 2/R ⇒ P_eff = 2/f_L + 2/R.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Cutting a Lens Along vs Perpendicular to Principal Axis',
            content: '1. Cut along the principal axis (horizontally): Radii of curvature and focal length f REMAIN UNCHANGED. Only aperture area halves, so image intensity becomes I / 2.\n2. Cut perpendicular to principal axis (vertically through center into two plano-convex lenses): Each half has one flat surface (R2 = ∞), so new focal length DOUBLES to 2f!',
            latex: 'f_{\\text{horizontal cut}} = f \\, (I\' = I/2), \\qquad f_{\\text{vertical cut}} = 2 f \\, (I\' = I)'
          }
        ]
      },
      {
        id: 'prism-and-instruments',
        title: '4. Prism Optics, Minimum Deviation & Optical Instruments',
        standardTheory: [
          'A prism has two non-parallel refracting surfaces inclined at angle A (angle of prism). Total deviation δ = (i + e) - A.',
          'At the condition of Minimum Deviation (δ = δ_m), the light ray traverses symmetrically through the prism: angle of incidence equals angle of emergence (i = e), and internal refraction angles are equal: r1 = r2 = A / 2. The refracted ray is parallel to the base of an equilateral prism.',
          'Optical instruments magnify visual angles subtended at the eye. Angular magnification (magnifying power) m = visual angle with instrument (β) / visual angle of unaided eye at near point (α).'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Prism Formula & Optical Instruments',
            content: '1. Prism Refractive Index at Minimum Deviation:\n$$\\mu = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}$$\n2. Compound Microscope Magnification (Tube length L, near point D = 25 cm):\n$$m = -\\frac{L}{f_o} \\left(1 + \\frac{D}{f_e}\\right) \\quad [\\text{Near Point}], \\qquad m = -\\frac{L}{f_o} \\left(\\frac{D}{f_e}\\right) \\quad [\\text{Normal Adjustment/\\infty}]$$\n3. Astronomical Telescope Magnification & Tube Length:\n$$m = -\\frac{f_o}{f_e}, \\quad L = f_o + f_e \\quad [\\text{Normal Adjustment at } \\infty]$$',
            latex: '\\mu = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}, \\quad m_{\\text{telescope}} = -\\frac{f_o}{f_e}, \\quad L = f_o + f_e',
            extraTips: [
              'Thin prism approximation (A < 10°): δ = (μ - 1) A.',
              'Dispersive power ω = (δ_v - δ_r) / δ_y = (μ_v - μ_r) / (μ_y - 1).',
              'For astronomical telescope: objective has LARGE aperture and LARGE focal length (f_o >> f_e) to maximize light collection and magnification.'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Resolving Power of Microscope & Telescope',
            content: 'Limit of resolution and resolving power derived from wave nature of light:',
            latex: 'RP_{\\text{telescope}} = \\frac{D}{1.22 \\, \\lambda}, \\qquad RP_{\\text{microscope}} = \\frac{2 \\mu \\sin\\theta}{1.22 \\, \\lambda}',
            extraTips: [
              'Telescope resolving power increases with larger objective aperture diameter D.',
              'Microscope resolving power increases with higher Numerical Aperture (μ sin θ) and shorter wavelength (e.g. oil immersion objective, ultraviolet/electron microscope).'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Dispersion Without Deviation & Deviation Without Dispersion',
            content: 'Combination of two thin prisms of angles A and A\' made of crown and flint glass:\n1. Dispersion without deviation (Zero net deviation): (μ - 1) A + (μ\' - 1) A\' = 0 ⇒ A\' / A = - (μ - 1) / (μ\' - 1).\n2. Deviation without dispersion (Achromatism for dispersion): (μ_v - μ_r) A + (μ\'_v - μ\'_r) A\' = 0 ⇒ A\' / A = - (ω δ) / (ω\' δ\').',
            latex: '\\frac{A\'}{A} = -\\frac{\\mu - 1}{\\mu\' - 1} \\quad [\\text{Zero Net Deviation}], \\qquad \\frac{A\'}{A} = -\\frac{\\omega \\, \\delta}{\\omega\' \\, \\delta\'} \\quad [\\text{Achromatism}]',
            extraTips: [
              'Negative sign indicates the two prisms must be inverted relative to each other.',
              'Net deviation δ_net = (μ - 1)A + (μ\' - 1)A\'.'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Rainbow Physics & Primary vs Secondary Rainbow',
            content: 'NCERT Section 9.7: Primary rainbow is formed by TWO refractions and ONE internal reflection inside spherical raindrops; red color is on the outer ring (42°) and violet on the inner ring (40°). Secondary rainbow involves TWO refractions and TWO internal reflections, resulting in inverted color order (violet at 53°, red at 50°) and fainter intensity.'
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Repeating Archetype',
        conceptTested: 'Silvering of Plano-Convex Lens on Curved vs Flat Face',
        question: 'An equiconvex thin lens made of glass (μ = 1.5) with radius of curvature R = 20 cm has one of its surfaces silvered. Find the effective focal length and power of the system when (a) the curved surface is silvered, and (b) if it were a plano-convex lens with flat surface silvered.',
        solutionSteps: [
          'Focal length of unsilvered equiconvex lens: 1/f_L = (1.5 - 1)(1/20 - (-1/20)) = 0.5 × (2/20) = 1/20 ⇒ f_L = 20 cm.',
          'Case (a): Curved face silvered (R = 20 cm). Radius of curvature of mirror = 20 cm ⇒ f_M = R/2 = 10 cm.',
          'Power of silvered mirror P_M = 1/f_M (in cm^-1) = 1/10.',
          'Total power P_eff = 2 P_L + P_M = 2(1/20) + 1/10 = 1/10 + 1/10 = 2/10 = 1/5 cm^-1.',
          'Effective focal length F_eff = -1 / P_eff = -5 cm (Equivalent Concave Mirror of focal length 5 cm).',
          'Case (b): Plano-convex lens (R1 = 20 cm, R2 = ∞) with flat face silvered. 1/f_L = 0.5(1/20 - 0) = 1/40 ⇒ f_L = 40 cm. Mirror is plane mirror (f_M = ∞ ⇒ P_M = 0).',
          'P_eff = 2 P_L + 0 = 2/40 = 1/20 cm^-1 ⇒ F_eff = -20 cm.'
        ],
        ntaTrapOrShortcut: 'Always remember: P_eff = 2 P_L + P_M and F_eff = -1 / P_eff. The negative sign means it always functions as a CONCAVE mirror.',
        answer: '(a) F_eff = -5 cm (Concave Mirror); (b) F_eff = -20 cm'
      },
      {
        number: 2,
        yearTag: 'JEE Main 2024 Shift Archetype',
        conceptTested: 'Prism Grazed Incidence & Maximum Deviation Angle',
        question: 'A glass prism with refracting angle A = 60° has refractive index μ = √3. Find the angle of incidence i for which a ray of light undergoes minimum deviation, and calculate the value of minimum deviation δ_m.',
        solutionSteps: [
          'At minimum deviation: r1 = r2 = A / 2 = 60° / 2 = 30°.',
          'Apply Snell’s law at first refracting face: 1 · sin(i) = μ · sin(r1) = √3 · sin(30°) = √3 · (1/2) = √3 / 2.',
          'Therefore: i = 60°.',
          'At minimum deviation: δ_m = 2i - A = 2(60°) - 60° = 60°.'
        ],
        ntaTrapOrShortcut: 'Shortcut: Use μ = sin((A + δ_m)/2) / sin(A/2) ⇒ √3 = sin(30° + δ_m/2) / 0.5 ⇒ sin(30° + δ_m/2) = √3/2 ⇒ 30° + δ_m/2 = 60° ⇒ δ_m = 60°.',
        answer: 'Angle of incidence i = 60°, Minimum deviation δ_m = 60°'
      }
    ],
    ncertGems: [
      {
        id: 'gem-optics-1',
        title: 'Apparent Shift and Sun Rising/Setting Time Lag',
        statement: 'Due to atmospheric refraction, the sun is visible about 2 minutes before the actual sunrise and about 2 minutes after the actual sunset, lengthening day time by approximately 4 minutes. The apparent flattening (oval shape) of the sun at sunrise and sunset is also caused by differential atmospheric refraction across the top and bottom of the solar disc.',
        tableOrPageRef: 'NCERT Class 12 Physics, Section 9.3.2',
        importanceReason: 'NTA Assertion-Reasoning favorite testing reasons for day length increase (approx 4 min) and solar disc flattening.'
      },
      {
        id: 'gem-optics-2',
        title: 'Mirage as Total Internal Reflection Phenomenon',
        statement: 'In hot summer deserts, air near the ground is hot and less dense (lower refractive index) than cooler, denser air higher up. Light from the sky or distant trees descending toward the ground travels from denser to rarer air layers and bends away from the normal until angle of incidence exceeds critical angle, undergoing total internal reflection and giving an inverted virtual image of the sky (mirage).',
        tableOrPageRef: 'NCERT Class 12 Physics, Section 9.4.1',
        importanceReason: 'Frequently asked in direct NCERT concept matching questions.'
      }
    ],
    flashcards: [
      {
        id: 'fc-optics-1',
        question: 'What is the formula for the effective power and focal length of a silvered lens?',
        answer: 'P_eff = 2 P_L + P_M. Since it acts as an equivalent concave mirror, F_eff = -1 / P_eff.',
        latex: 'P_{\\text{eff}} = 2 P_L + P_M, \\quad F_{\\text{eff}} = -\\frac{1}{P_{\\text{eff}}}',
        tag: 'Silvering'
      },
      {
        id: 'fc-optics-2',
        question: 'How does focal length change when a glass lens (μ = 1.5) is immersed in water (μ = 4/3)?',
        answer: 'Focal length quadruples: f_water = 4 × f_air. It remains converging.',
        latex: 'f_{\\text{water}} = 4 \\, f_{\\text{air}}',
        tag: 'Lens Maker'
      },
      {
        id: 'fc-optics-3',
        question: 'What is the magnifying power and length of an astronomical telescope in normal adjustment?',
        answer: 'Magnification m = -f_o / f_e. Tube length L = f_o + f_e.',
        latex: 'm = -\\frac{f_o}{f_e}, \\quad L = f_o + f_e',
        tag: 'Optical Instruments'
      },
      {
        id: 'fc-optics-4',
        question: 'What is the condition of refracted ray at minimum deviation in an equilateral prism?',
        answer: 'The refracted ray inside the prism is strictly parallel to the base, with r1 = r2 = A / 2 and i = e.',
        latex: 'r_1 = r_2 = \\frac{A}{2}, \\quad i = e',
        tag: 'Prism'
      }
    ]
  },
  {
    id: 'phy-12-08-wave-optics',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 8,
    title: 'Wave Optics',
    ncertName: 'Wave Optics',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Young’s Double Slit Experiment (YDSE) & Fringe Width', 'Optical Path Shift due to Thin Transparent Slab', 'Single-Slit Fraunhofer Diffraction Minima/Maxima', 'Brewster’s Law & Malus’s Law (I = I0 cos²θ)'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Moderate', marksPercentage: '6.2%', topRepeatedConcepts: ['YDSE fringe width β = λ D / d', 'Fringe shift with slab of thickness t: Δy = (μ - 1)t D / d', 'Single slit diffraction first minimum at a sinθ = λ'], recentShiftFocus: 'Intensity distribution I = I_max cos²(Δφ / 2) with phase difference.' },
    mustSolveChecklist: ['YDSE bright fringe y_n = n λ D / d', 'YDSE dark fringe y_n = (2n - 1) λ D / (2d)', 'Malus law I = I0 cos²θ'],
    notesSections: [{ id: 'ydse', title: '1. YDSE & Slab Shift', standardTheory: ['Coherent sources have constant phase difference over time.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Optical Path & Fringe Shift', content: 'Shift = (μ - 1) t D / d = (μ - 1) t (β / λ)', latex: '\\Delta y = \\frac{(\\mu - 1) t D}{d}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'phy-12-10-semiconductors',
    subject: 'physics',
    classLevel: '12',
    chapterNumber: 10,
    title: 'Semiconductor Electronics',
    ncertName: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['p-n Junction Diode (Forward/Reverse V-I Characteristics)', 'Half-Wave & Full-Wave Rectifiers (Ripple Factor, Efficiency)', 'Zener Diode as Voltage Regulator', 'Logic Gates Truth Tables & De Morgan’s Theorems'],
    pyqTrend: { avgQuestions5Yr: 1.9, difficulty: 'Easy', marksPercentage: '6.5%', topRepeatedConcepts: ['Zener diode voltage stabilization numericals', 'Logic gates combinations (NAND, NOR as universal gates)', 'Full-wave rectifier output frequency = 2 × input frequency (100 Hz for 50 Hz input)'], recentShiftFocus: 'Identification of output waveform of logic gate networks.' },
    mustSolveChecklist: ['Zener current calculation: I_L = V_z / R_L and I_z = I_s - I_L', 'De Morgan: (A · B)\' = A\' + B\' and (A + B)\' = A\' · B\'', 'Rectifier: Half-wave ripple factor 1.21; Full-wave 0.48'],
    notesSections: [{ id: 'logic-zener', title: '1. Zener Regulator & Logic Gates', standardTheory: ['Zener diode operates in breakdown region under reverse bias with constant voltage V_z.'], highlightBoxes: [{ type: 'formula', title: 'Zener Regulator Equations', content: 'V_in = I_s R_s + V_z, with I_s = I_z + I_L', latex: 'I_s = \\frac{V_{in} - V_z}{R_s} = I_z + I_L' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  }
];

export const physicsNotes = PHYSICS_NOTES;
export default PHYSICS_NOTES;
