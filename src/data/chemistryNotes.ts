import { Chapter } from '../types';

export const CHEMISTRY_NOTES: Chapter[] = [
  {
    id: 'chem-11-04-chemical-bonding',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 4,
    title: 'Chemical Bonding & Molecular Structure',
    ncertName: 'Chemical Bonding and Molecular Structure',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    branch: 'inorganic',
    highlightedSubtopics: [
      'VSEPR Theory & Lone Pair Repulsion Shapes',
      'Hybridization & Steric Number Calculation',
      'Molecular Orbital Theory (MOT) Bond Order & Magnetism',
      'Dipole Moment Vector Summation & Exceptions',
      'Hydrogen Bonding & Boiling Point Anomalies'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.7,
      difficulty: 'Moderate',
      marksPercentage: '9.0% of Chemistry',
      topRepeatedConcepts: [
        'MOT configuration and bond order of O2, O2+, O2-, O2(2-), N2, N2+, CO, NO',
        'Shapes and lone pairs in Xenon fluorides and oxofluorides (XeF2, XeF4, XeF6, XeOF4, XeO3)',
        'Dipole moment comparisons: NH3 vs NF3; ortho/meta/para dichlorobenzene',
        'Hybridization of interhalogens: BrF5 (sp³d² square pyramidal), ClF3 (sp³d T-shaped)'
      ],
      recentShiftFocus: 'Diamagnetic vs Paramagnetic species identification using Molecular Orbital Theory (count odd vs even electrons).'
    },
    mustSolveChecklist: [
      'Calculate Steric Number: SN = 1/2 [V + M - C + A] to determine hybridization (sp, sp², sp³, sp³d, sp³d², sp³d³)',
      'Draw MOT energy diagrams for ≤ 14 electrons vs > 14 electrons (mixing of 2s and 2p)',
      'Calculate Bond Order = 1/2 [N_b - N_a] and relate to Bond Length and Bond Dissociation Enthalpy',
      'Predict geometry vs shape (VSEPR): distinguish electronic geometry from molecular shape',
      'Explain why dipole moment of NH3 (1.47 D) > NF3 (0.23 D)',
      'Identify intramolecular vs intermolecular H-bonding (o-nitrophenol vs p-nitrophenol)'
    ],
    notesSections: [
      {
        id: 'mot-rules',
        title: '1. Molecular Orbital Theory (MOT) & Bond Order Vault',
        standardTheory: [
          'Linear Combination of Atomic Orbitals (LCAO) yields bonding molecular orbitals (lower energy, constructive interference) and antibonding molecular orbitals (higher energy, destructive interference).',
          'For homonuclear diatomic molecules with ≤ 14 electrons (Li2, Be2, B2, C2, N2), 2s-2p mixing causes π2px = π2py to be LOWER in energy than σ2pz. For > 14 electrons (O2, F2), regular ordering holds: σ2pz is lower than π2px = π2py.'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Quick 10-Second Bond Order Trick',
            content: 'Count total electrons. If total electrons = 14 (like N2), Bond Order = 3.0. For every electron added or subtracted by 1, DECREASE bond order by 0.5!',
            latex: '\\begin{aligned} 10 e^- &\\to 1.0 & 14 e^- &\\to 3.0 \\\\ 11 e^- &\\to 1.5 & 15 e^- &\\to 2.5 \\\\ 12 e^- &\\to 2.0 & 16 e^- &\\to 2.0 \\\\ 13 e^- &\\to 2.5 & 17 e^- &\\to 1.5 \\end{aligned}',
            extraTips: [
              'Paramagnetic species have UNPAIRED electrons: O2 (16 e⁻), B2 (10 e⁻), NO (15 e⁻), O2⁺ (15 e⁻), O2⁻ (17 e⁻).',
              'O2 is paramagnetic with 2 unpaired electrons in antibonding π*2px and π*2py orbitals (VBT failed to explain this!).',
              'Higher Bond Order = Shorter Bond Length = Greater Bond Dissociation Energy.'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: MOT C2 Molecule Nature',
            content: 'NCERT Section 4.7: In C2 molecule (12 electrons), BOTH the bonds in the double bond are PI (π) BONDS because all 4 valence electrons are present in two degenerate π molecular orbitals (π2px² and π2py²). No sigma bond is present!'
          }
        ]
      },
      {
        id: 'vsepr-and-shapes',
        title: '2. VSEPR Theory & Lone Pair Geometries',
        standardTheory: [
          'Electron pairs surrounding the central atom repel each other and orient themselves to minimize repulsion.',
          'Repulsion strength order: Lone Pair - Lone Pair (lp - lp) > Lone Pair - Bond Pair (lp - bp) > Bond Pair - Bond Pair (bp - bp).'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Steric Number & Hybridization',
            content: 'Calculate steric number to identify hybridization and lone pairs:',
            latex: 'SN = \\frac{1}{2} \\Big[ V + M - C + A \\Big]',
            extraTips: [
              'V = Valence electrons of central atom; M = Monovalent surrounding atoms (H, F, Cl, Br, I); C = Positive charge; A = Negative charge.',
              'SN = 2: sp (Linear) | SN = 3: sp² (Trigonal Planar / Bent)',
              'SN = 4: sp³ (Tetrahedral / Pyramidal / Bent) | SN = 5: sp³d (TBP / See-saw / T-shaped / Linear)',
              'SN = 6: sp³d² (Octahedral / Square Pyramidal / Square Planar)'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Dipole Moment of NH3 vs NF3',
            content: 'In NH3, the individual N-H bond dipoles and the lone pair dipole point in the SAME direction (additive, μ = 1.47 D). In NF3, fluorine is more electronegative than nitrogen, so N-F dipoles point OPPOSITE to the lone pair dipole (opposing, μ = 0.23 D).',
            latex: '\\mu(\\text{NH}_3) = 1.47 \\, \\text{D} \\quad \\gg \\quad \\mu(\\text{NF}_3) = 0.23 \\, \\text{D}'
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Repeating',
        conceptTested: 'Xenon Compounds Hybridization, Shape & Lone Pair Count',
        question: 'Match the Xenon compounds in Column-I with their molecular shapes and number of lone pairs on Xenon in Column-II: (A) XeF2, (B) XeF4, (C) XeF6, (D) XeOF4.',
        solutionSteps: [
          '(A) XeF2: Xe has 8 valence e⁻. 2 bond pairs + 3 lone pairs. Steric Number = 5 (sp³d). Lone pairs occupy equatorial positions to minimize repulsion. Shape: Linear.',
          '(B) XeF4: 4 bond pairs + 2 lone pairs. Steric Number = 6 (sp³d²). Lone pairs occupy axial positions at 180°. Shape: Square Planar.',
          '(C) XeF6: 6 bond pairs + 1 lone pair. Steric Number = 7 (sp³d³). Shape: Distorted Octahedral / Capped Octahedral.',
          '(D) XeOF4: 5 bond pairs (4 Xe-F + 1 Xe=O) + 1 lone pair. Steric Number = 6 (sp³d²). Lone pair is trans to oxygen. Shape: Square Pyramidal.'
        ],
        ntaTrapOrShortcut: 'Never confuse Geometry with Shape! In XeF4 geometry is Octahedral, but molecular Shape (ignoring lone pairs) is Square Planar.',
        answer: 'XeF2: Linear (3 lp); XeF4: Square Planar (2 lp); XeF6: Distorted Octahedral (1 lp); XeOF4: Square Pyramidal (1 lp)'
      }
    ],
    ncertGems: [
      {
        id: 'gem-cb-1',
        title: 'Axial vs Equatorial Bonds in PCl5',
        statement: 'NCERT Section 4.3: In PCl5 (sp³d hybridization, trigonal bipyramidal), the two axial P-Cl bonds (240 pm) are LONGER and WEAKER than the three equatorial P-Cl bonds (202 pm) due to greater repulsive forces from equatorial bond pairs. Hence, PCl5 decomposes upon heating into PCl3 and Cl2.',
        tableOrPageRef: 'NCERT Class 11 Part 1, Page 116',
        importanceReason: 'Appeared in JEE Main 2021, 2022, 2023, and 2024.'
      }
    ],
    flashcards: [
      {
        id: 'fc-cb1',
        question: 'Why is O2 paramagnetic according to Molecular Orbital Theory?',
        answer: 'Because its electronic configuration has 2 unpaired electrons in degenerate antibonding molecular orbitals: (π*2px)¹ (π*2py)¹.',
        latex: '(\\pi^* 2p_x)^1 (\\pi^* 2p_y)^1',
        tag: 'MOT'
      },
      {
        id: 'fc-cb2',
        question: 'What is the shape and hybridization of I3⁻ (triiodide ion)?',
        answer: 'Central Iodine has 8 valence electrons (7 + 1 negative charge), forms 2 bond pairs with surrounding iodines, and has 3 lone pairs. Steric Number = 5, hybridization is sp³d, and shape is LINEAR.',
        tag: 'VSEPR'
      }
    ]
  },
  {
    id: 'chem-12-05-coordination-compounds',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 5,
    title: 'Coordination Compounds',
    ncertName: 'Coordination Compounds',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    branch: 'inorganic',
    highlightedSubtopics: [
      'Werner’s Theory & Primary vs Secondary Valency',
      'IUPAC Nomenclature & Isomerism (Geometrical, Optical, Linkage)',
      'Valence Bond Theory (Inner vs Outer Orbital Complexes)',
      'Crystal Field Theory (CFT) Octahedral & Tetrahedral Splitting (Δo, Δt)',
      'Spectrochemical Series, Magnetic Moment & Synergic Bonding in Metal Carbonyls'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.5,
      difficulty: 'Moderate',
      marksPercentage: '8.8% of Chemistry',
      topRepeatedConcepts: [
        'Spin-only magnetic moment calculation μ = √(n(n+2)) BM',
        'Optical activity check in coordination complexes: [M(AA)2Cl2] cis is optically active, trans has plane of symmetry',
        'Strong field ligands (CN⁻, CO, en, NH3) pairing up electrons vs weak field (halides, H2O)',
        'Linkage isomerism with ambidentate ligands (NO2⁻ / ONO⁻, SCN⁻ / NCS⁻)'
      ],
      recentShiftFocus: 'Direct CFSE (Crystal Field Stabilization Energy) calculation including pairing energy P.'
    },
    mustSolveChecklist: [
      'Differentiate Primary Valency (ionizable, oxidation state) from Secondary Valency (non-ionizable, coordination number)',
      'Memorize Spectrochemical Series: I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < F⁻ < OH⁻ < C2O4²⁻ < H2O < NCS⁻ < edta⁴⁻ < NH3 < en < CN⁻ < CO',
      'Determine Octahedral Crystal Field Splitting: Δo > P (low spin, pairing occurs) vs Δo < P (high spin, Hund\'s rule)',
      'Calculate tetrahedral splitting: Δt = 4/9 Δo (pairing NEVER occurs in tetrahedral complexes)',
      'Calculate spin-only magnetic moment: μ = √(n(n + 2)) BM',
      'Explain Synergic Bonding in [M(CO)x]: M(dπ) → CO(π*) back-bonding increases M-C bond order and weakens C-O bond'
    ],
    notesSections: [
      {
        id: 'cft-splitting',
        title: '1. Crystal Field Theory (CFT) & Electronic Configuration',
        standardTheory: [
          'CFT treats metal-ligand bonds as purely electrostatic. In an octahedral crystal field, the 5 degenerate d-orbitals split into two sets:',
          'Higher energy eg set (dx²-y², dz² pointing directly along Cartesian axes, destabilized by +0.6 Δo) and lower energy t2g set (dxy, dyz, dxz pointing between axes, stabilized by -0.4 Δo).'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Low Spin vs High Spin Configurations for d⁴ to d⁷',
            content: 'Check whether ligand is Strong Field (Δo > P) or Weak Field (Δo < P):',
            latex: '\\begin{aligned} d^4 \\, (\\Delta_o > P): &\\; t_{2g}^4 e_g^0 \\implies n = 2 \\text{ unpaired } e^-, \\; \\mu = \\sqrt{8} = 2.83 \\text{ BM} \\\\ d^4 \\, (\\Delta_o < P): &\\; t_{2g}^3 e_g^1 \\implies n = 4 \\text{ unpaired } e^-, \\; \\mu = \\sqrt{24} = 4.90 \\text{ BM} \\end{aligned}',
            extraTips: [
              'd¹, d², d³ and d⁸, d⁹, d¹⁰ have identical electron distribution regardless of ligand field strength!',
              'For Co³⁺ (d⁶), H2O acts as a STRONG field ligand: [Co(H2O)6]³⁺ is diamagnetic (t2g⁶ eg⁰, n = 0).'
            ]
          },
          {
            type: 'formula',
            title: '📐 Master Formula Vault: CFSE and Magnetic Moment',
            content: 'Crystal Field Stabilization Energy for octahedral complex:',
            latex: '\\text{CFSE} = \\Big[ -0.4 \\times n(t_{2g}) + 0.6 \\times n(e_g) \\Big] \\Delta_o + m \\cdot P',
            extraTips: [
              'Spin-only magnetic moment: μ = √(n(n + 2)) BM',
              'n = 1 → 1.73 BM | n = 2 → 2.83 BM | n = 3 → 3.87 BM | n = 4 → 4.90 BM | n = 5 → 5.92 BM'
            ]
          }
        ]
      },
      {
        id: 'synergic-bonding',
        title: '2. Synergic Bonding in Metal Carbonyls',
        standardTheory: [
          'In metal carbonyls, bonding involves two synergistic components: σ-donation from carbon lone pair to empty metal d-orbital, and π-backdonation from filled metal d-orbital into empty π* antibonding orbital of CO.',
          'This synergic effect strengthens the M-C bond while simultaneously WEAKENING the C-O bond.'
        ],
        highlightBoxes: [
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: C-O Bond Strength vs Negative Charge on Metal',
            content: 'NCERT Section 9.6: Greater the negative charge on the metal complex, greater is the π-backdonation to CO(π*). Consequently: M-C bond order INCREASES and C-O bond order DECREASES (C-O bond length increases, vibrational frequency decreases)!'
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Optical Isomerism in [Co(en)2Cl2]⁺',
            content: 'Trans-[Co(en)2Cl2]⁺ has a plane of symmetry (and center of inversion) and is OPTICALLY INACTIVE. Cis-[Co(en)2Cl2]⁺ has NO plane of symmetry and is CHIRAL (optically active, exhibits d and l enantiomers)!',
            latex: '\\text{Cis} = \\text{Optically Active (Chiral)} \\quad | \\quad \\text{Trans} = \\text{Optically Inactive (Achiral)}'
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2022',
        conceptTested: 'C-O Bond Order & Infrared Stretching Frequency in Carbonyls',
        question: 'Arrange the following metal carbonyl complexes in the increasing order of C-O bond length: [Mn(CO)6]⁺, [Cr(CO)6], [V(CO)6]⁻.',
        solutionSteps: [
          'All three complexes are isoelectronic with 18 valence electrons.',
          'Central metal oxidation states: V(-1), Cr(0), Mn(+1).',
          'V(-1) has the highest negative charge, meaning highest electron density on metal.',
          'Highest electron density → maximum π-backdonation into antibonding π* of CO.',
          'More electrons in π*(CO) → lowest C-O bond order → LONGEST C-O bond length.',
          'Conversely, [Mn(CO)6]⁺ has lowest π-backbonding → strongest C-O bond → shortest C-O bond length.'
        ],
        ntaTrapOrShortcut: 'Rule of thumb: Negative charge on complex = Longest C-O bond & Shortest M-C bond.',
        answer: '[Mn(CO)6]⁺ < [Cr(CO)6] < [V(CO)6]⁻'
      }
    ],
    ncertGems: [
      {
        id: 'gem-coord-1',
        title: 'Color of Coordination Complexes & Ligand Field Strength',
        statement: 'NCERT Section 9.5.5: Color of coordination complexes arises from d-d transitions. The energy absorbed ΔE = h c / λ_absorbed depends on ligand field strength. The observed color is complementary to the absorbed wavelength (e.g., if yellow light is absorbed, complex appears violet). If no d-d transition is possible (d⁰ or d¹⁰), the complex is colorless.',
        tableOrPageRef: 'NCERT Class 12 Part 1, Page 256',
        importanceReason: 'Tested in JEE Main matching questions on colors of [Ni(H2O)6]²⁺ vs [Ni(en)3]²⁺.'
      }
    ],
    flashcards: [
      {
        id: 'fc-c1',
        question: 'What is the relation between tetrahedral splitting Δt and octahedral splitting Δo?',
        answer: 'Δt = (4/9) Δo. Tetrahedral splitting is much smaller, so pairing NEVER occurs in tetrahedral complexes (always high-spin).',
        latex: '\\Delta_t = \\frac{4}{9} \\Delta_o',
        tag: 'CFT'
      },
      {
        id: 'fc-c2',
        question: 'What is an ambidentate ligand? Give two examples.',
        answer: 'A unidentate ligand that can coordinate to the central metal atom through two different donor atoms, leading to linkage isomerism. Examples: NO2⁻ (nitro, binds via N) vs ONO⁻ (nitrito, binds via O); SCN⁻ (thiocyanato) vs NCS⁻ (isothiocyanato).',
        tag: 'Ligands'
      }
    ]
  },
  {
    id: 'chem-11-01-mole-concept',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 1,
    title: 'Some Basic Concepts of Chemistry (Mole)',
    ncertName: 'Some Basic Concepts of Chemistry',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'physical',
    highlightedSubtopics: ['Limiting Reagent & Stoichiometry Calculations', 'Molarity, Molality, Mole Fraction Interconversions', 'Empirical & Molecular Formula Determination', 'Oxidation State & Equivalent Weight'],
    pyqTrend: { avgQuestions5Yr: 1.6, difficulty: 'Moderate', marksPercentage: '5.2%', topRepeatedConcepts: ['Limiting reagent when reactants are given in grams', 'Molality m = (1000 M) / (1000 d - M M_w)'], recentShiftFocus: 'Molarity of mixing solutions and dilution formula M1 V1 = M2 V2.' },
    mustSolveChecklist: ['Identify limiting reagent by moles/stoichiometric coefficient ratio', 'Convert % w/w to Molarity: M = (10 × % × d) / M_solute', 'Calculate empirical formula from mass percentages'],
    notesSections: [{ id: 'mole', title: '1. Concentration Terms & Limiting Reagent', standardTheory: ['Molality is temperature independent because mass is invariant with temperature.'], highlightBoxes: [{ type: 'formula', title: 'Molarity to Molality Conversion', content: 'm = (1000 M) / (1000 d - M M2)', latex: 'm = \\frac{1000 M}{1000 d - M M_2}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-02-structure-of-atom',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 2,
    title: 'Structure of Atom',
    ncertName: 'Structure of Atom',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'physical',
    highlightedSubtopics: ['Quantum Numbers (n, l, m, s) & Allowed Orbitals', 'Radial Nodes (n - l - 1) & Angular Nodes (l)', 'de Broglie Wavelength & Heisenberg Uncertainty', 'Electronic Configuration Exceptions (Cr, Cu)'],
    pyqTrend: { avgQuestions5Yr: 1.7, difficulty: 'Easy', marksPercentage: '5.6%', topRepeatedConcepts: ['Total nodes = n - 1; Radial nodes = n - l - 1; Angular nodes = l', 'Heisenberg principle Δx · Δp ≥ h / (4π)', 'Half-filled and fully-filled extra stability of Cr (3d⁵ 4s¹) and Cu (3d¹⁰ 4s¹)'], recentShiftFocus: 'Radial probability distribution curve peaks and node counts.' },
    mustSolveChecklist: ['Calculate number of radial and angular nodes', 'Apply Hund’s rule and Pauli exclusion principle', 'Compute de Broglie wavelength λ = h / mv'],
    notesSections: [{ id: 'nodes', title: '1. Radial/Angular Nodes & Heisenberg Vault', standardTheory: ['Electrons in atoms are described by four quantum numbers.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Node Counting Formulas', content: 'Radial Nodes = n - l - 1\nAngular Nodes = l\nTotal Nodes = n - 1', latex: '\\text{Radial Nodes} = n - l - 1' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-03-periodicity',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 3,
    title: 'Classification & Periodicity of Elements',
    ncertName: 'Classification of Elements and Periodicity in Properties',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1 Q)',
    avgQuestions: '1 Question per Shift',
    expectedWeightage: '4 Marks',
    branch: 'inorganic',
    highlightedSubtopics: ['Ionization Enthalpy Anomalies (Be > B, N > O)', 'Electron Gain Enthalpy Trends (Cl > F, S > O)', 'Isoelectronic Species Ionic Radii Order', 'Electronegativity Scales (Pauling & Mulliken)'],
    pyqTrend: { avgQuestions5Yr: 1.2, difficulty: 'Easy', marksPercentage: '4.0%', topRepeatedConcepts: ['IE1: N > O (due to stable half-filled 2p³) and Be > B (penetrating 2s²)', 'Electron gain enthalpy of Chlorine is MORE negative than Fluorine (-349 vs -328 kJ/mol)'], recentShiftFocus: 'Isoelectronic species radius decreases as atomic number Z increases.' },
    mustSolveChecklist: ['Isoelectronic radii: greater positive charge = smaller radius', 'Cl has higher electron gain enthalpy than F due to small size of F causing interelectronic repulsions', 'Second ionization enthalpy of Cr and Cu'],
    notesSections: [{ id: 'trends', title: '1. Periodic Exceptions & Anomalies', standardTheory: ['Periodic trends arise from effective nuclear charge and electronic configuration stability.'], highlightBoxes: [{ type: 'ncert-line', title: '📘 NCERT Exception: Cl vs F Electron Gain Enthalpy', content: 'Electron gain enthalpy of Cl is more negative than F because addition of electron to small 2p orbital in F encounters strong electron-electron repulsion.' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-05-chemical-thermo',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 5,
    title: 'Chemical Thermodynamics',
    ncertName: 'Thermodynamics',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    branch: 'physical',
    highlightedSubtopics: ['ΔH = ΔU + Δng RT Relation', 'Hess’s Law & Bond Enthalpy Calculations', 'Entropy (ΔS) & Gibbs Free Energy (ΔG = ΔH - TΔS)', 'Spontaneity Criteria & Equilibrium Constant (ΔG° = -RT ln K)'],
    pyqTrend: { avgQuestions5Yr: 2.2, difficulty: 'Moderate', marksPercentage: '7.5%', topRepeatedConcepts: ['ΔH = ΔU + Δng RT where Δng = moles of gaseous products - reactants', 'Spontaneity table: ΔH negative, ΔS positive → always spontaneous (ΔG < 0)', 'Standard Gibbs free energy ΔG° = -2.303 RT log10 K'], recentShiftFocus: 'Calculation of reaction enthalpy using bond dissociation enthalpies.' },
    mustSolveChecklist: ['ΔH_rxn = Σ (Bond energy of reactants) - Σ (Bond energy of products)', 'ΔH_rxn = Σ ΔfH°(products) - Σ ΔfH°(reactants)', 'Equilibrium condition: ΔG = 0, so T_equilibrium = ΔH / ΔS'],
    notesSections: [{ id: 'gibbs', title: '1. Gibbs Free Energy & Hess Law', standardTheory: ['A process is spontaneous at constant T and P if ΔG is negative.'], highlightBoxes: [{ type: 'formula', title: 'Gibbs-Helmholtz Equation', content: 'ΔG = ΔH - T ΔS and ΔG° = -RT ln K', latex: '\\Delta G^\\circ = -RT \\ln K' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-06-equilibrium',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 6,
    title: 'Equilibrium (Chemical & Ionic)',
    ncertName: 'Equilibrium',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'physical',
    highlightedSubtopics: ['Kp = Kc (RT)^Δng Relation', 'Le Chatelier’s Principle (Pressure, Volume, Temp, Inert Gas)', 'pH of Buffer Solutions (Henderson-Hasselbalch)', 'Salt Hydrolysis & Solubility Product (Ksp) with Common Ion Effect'],
    pyqTrend: { avgQuestions5Yr: 1.9, difficulty: 'Tough', marksPercentage: '6.5%', topRepeatedConcepts: ['Solubility product Ksp calculation for AB, AB2, A2B3 salts', 'Adding inert gas at constant volume (NO effect) vs constant pressure (shifts to more moles)', 'Acidic buffer: pH = pKa + log([Salt]/[Acid])'], recentShiftFocus: 'Precipitation condition: Ionic Product Q_sp > K_sp.' },
    mustSolveChecklist: ['Henderson equation for acidic & basic buffers', 'Salt hydrolysis pH formulas for WA-SB, SA-WB, WA-WB', 'Common ion effect suppressing weak electrolyte dissociation'],
    notesSections: [{ id: 'ionic-buffers', title: '1. Buffer Solutions & Salt Hydrolysis pH', standardTheory: ['Buffer resists change in pH upon small addition of acid or base.'], highlightBoxes: [{ type: 'formula', title: 'Henderson-Hasselbalch Equation', content: 'pH = pKa + log([Conjugate Base] / [Acid])', latex: '\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Salt}]}{[\\text{Acid}]}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-07-redox-reactions',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 7,
    title: 'Redox Reactions',
    ncertName: 'Redox Reactions',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1 Q)',
    avgQuestions: '1 Question per Shift',
    expectedWeightage: '4 Marks',
    branch: 'physical',
    highlightedSubtopics: ['Oxidation Number Paradoxes (CrO5, H2SO5, C3O2)', 'Balancing Redox Reactions (Ion-Electron Method)', 'Equivalent Weight & n-Factor in Acidic/Basic Medium', 'Redox Titrations with KMnO4 & K2Cr2O7'],
    pyqTrend: { avgQuestions5Yr: 1.1, difficulty: 'Easy', marksPercentage: '3.6%', topRepeatedConcepts: ['CrO5 butterfly structure has 2 peroxo bonds, oxidation state of Cr is +6', 'n-factor of KMnO4 in acidic (n=5, Mn²⁺), neutral (n=3, MnO2), basic (n=1, MnO4²⁻)'], recentShiftFocus: 'Equivalent weight = Molecular weight / n-factor.' },
    mustSolveChecklist: ['Balancing equations in acidic vs basic medium', 'Calculate n-factor in disproportionation reactions', 'Oxidation states in peroxo compounds'],
    notesSections: [{ id: 'nfactor', title: '1. n-Factor of Oxidizing Agents & Peroxo Structures', standardTheory: ['Redox involves electron transfer.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 KMnO4 n-Factors', content: 'Acidic medium: MnO4⁻ → Mn²⁺ (n = 5)\nNeutral: MnO4⁻ → MnO2 (n = 3)\nStrongly Basic: MnO4⁻ → MnO4²⁻ (n = 1)', latex: 'n_{\\text{acidic}} = 5, \\quad n_{\\text{neutral}} = 3, \\quad n_{\\text{basic}} = 1' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-08-goc',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 8,
    title: 'Organic Chemistry: Basic Principles (GOC)',
    ncertName: 'Organic Chemistry – Some Basic Principles and Techniques',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    branch: 'organic',
    highlightedSubtopics: ['IUPAC Nomenclature Rules & Polyfunctional Priority', 'Inductive, Resonance, Mesomeric & Hyperconjugation Effects', 'Aromaticity (Hückel’s 4n+2 π Rule, Anti-aromatic, Non-aromatic)', 'Acidic & Basic Strength Comparisons', 'Kjeldahl & Dumas Nitrogen Estimation Calculations'],
    pyqTrend: { avgQuestions5Yr: 2.6, difficulty: 'Moderate', marksPercentage: '8.8%', topRepeatedConcepts: ['Acidic strength of carboxylic acids & phenols (-M/-I increases acidity)', 'Carbocation stability: 3° > 2° > 1° (hyperconjugation + resonance)', 'Hückel rule 4n + 2 π electrons for aromaticity (Tropylium ion, Cyclopentadienyl anion)'], recentShiftFocus: 'Quantitative nitrogen estimation formulas (Kjeldahl & Dumas).' },
    mustSolveChecklist: ['Identify aromatic vs anti-aromatic (4n π, planar) vs non-aromatic', 'Ortho-effect in benzoic acids and anilines', 'Kjeldahl %N = (1.4 × N × V) / W_sample'],
    notesSections: [{ id: 'aromaticity', title: '1. Aromaticity & Stability Orders', standardTheory: ['Aromatic molecules must be planar, cyclic, completely conjugated, and have (4n+2) π electrons.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Hückel’s 4n+2 Rule Vault', content: 'Aromatic: Cyclic + Planar + Conjugated + (4n+2) π e⁻ (n = 0, 1, 2... → 2, 6, 10, 14 π e⁻).\nAnti-aromatic: Cyclic + Planar + Conjugated + 4n π e⁻ (4, 8, 12... Extremely unstable!).', latex: '4n + 2 \\; \\pi \\; e^- \\implies \\text{Aromatic}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-11-09-hydrocarbons',
    subject: 'chemistry',
    classLevel: '11',
    chapterNumber: 9,
    title: 'Hydrocarbons',
    ncertName: 'Hydrocarbons',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    branch: 'organic',
    highlightedSubtopics: ['Markovnikov vs Anti-Markovnikov (Peroxide Effect) Addition', 'Ozonolysis of Alkenes (Reductive Zn/H2O vs Oxidative H2O2)', 'Acidity of Terminal Alkynes & Kolbe Electrolysis', 'Benzene Electrophilic Aromatic Substitution (EAS) Mechanisms'],
    pyqTrend: { avgQuestions5Yr: 2.1, difficulty: 'Moderate', marksPercentage: '7.2%', topRepeatedConcepts: ['Ozonolysis product identification to deduce original alkene structure', 'Peroxide effect operates ONLY with HBr (NOT with HCl or HI)', 'Terminal alkynes react with NaNH2 or ammoniacal AgNO3'], recentShiftFocus: 'Friedel-Crafts alkylation rearrangements via hydride/methyl shift.' },
    mustSolveChecklist: ['Ozonolysis reverse-engineering', 'Peroxide effect with HBr via free-radical intermediate', 'Activating (ortho/para) vs deactivating (meta) directing groups'],
    notesSections: [{ id: 'ozonolysis', title: '1. Ozonolysis & Alkene Additions', standardTheory: ['Ozonolysis cleaves C=C double bonds into carbonyl fragments.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 5-Second Ozonolysis Shortcut', content: 'Break the C=C double bond cleanly and cap each broken end with an Oxygen atom (=O)!', latex: 'R_1 R_2 C = C R_3 R_4 \\xrightarrow{\\text{1. } O_3, \\; 2. \\; Zn/H_2 O} R_1 R_2 C=O + O=C R_3 R_4' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-01-solutions',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 1,
    title: 'Solutions',
    ncertName: 'Solutions',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'physical',
    highlightedSubtopics: ['Raoult’s Law (Ideal & Non-ideal Solutions, Azeotropes)', 'van ’t Hoff Factor (i) for Association & Dissociation', 'Colligative Properties (ΔTb, ΔTf, Osmotic Pressure π)', 'Henry’s Law & Solubility of Gases in Liquids'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Moderate', marksPercentage: '6.2%', topRepeatedConcepts: ['van ’t Hoff factor: i = 1 + (n - 1)α for dissociation; i = 1 + (1/n - 1)α for association', 'Non-ideal solutions with positive (acetone + ethanol) vs negative deviation (chloroform + acetone)', 'Osmotic pressure π = i C R T'], recentShiftFocus: 'Molecular weight determination using depression in freezing point.' },
    mustSolveChecklist: ['Colligative properties always include factor i: ΔTb = i Kb m', 'Calculate α given freezing point depression', 'Minimum vs maximum boiling azeotropes'],
    notesSections: [{ id: 'colligative', title: '1. Colligative Formulas & van ’t Hoff Factor', standardTheory: ['Colligative properties depend only on number of solute particles, not identity.'], highlightBoxes: [{ type: 'formula', title: 'Colligative Master Equations', content: 'ΔTb = i Kb m, ΔTf = i Kf m, π = i C R T', latex: '\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\pi = i C R T' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-02-electrochemistry',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 2,
    title: 'Electrochemistry',
    ncertName: 'Electrochemistry',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    branch: 'physical',
    highlightedSubtopics: [
      'Galvanic Cells, Daniell Cell & Standard Electrode Potentials (E°)',
      'Nernst Equation for Single Electrode & Full Cell EMF',
      'Gibbs Energy of Reaction (ΔG° = -nFE°) & Equilibrium Constant (K_eq)',
      'Concentration Cells & pH Dependent Half-Cells',
      'Electrolytic Conductance, Cell Constant & Kohlrausch’s Law',
      'Debye-Hückel-Onsager Equation for Strong vs Weak Electrolytes',
      'Faraday’s Laws of Electrolysis, Lead Storage Battery & Fuel Cells'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.4,
      difficulty: 'Moderate',
      marksPercentage: '8.2% of Chemistry',
      topRepeatedConcepts: [
        'Nernst Equation calculation at 298 K with reaction quotient Q = [products]^x / [reactants]^y',
        'Combining two half-cells to determine unknown E° using ΔG° = -nFE° (never adding E° directly!)',
        'Kohlrausch Law: finding limiting molar conductivity Λ°m and degree of dissociation α = Λm / Λ°m',
        'Electrolysis products of aqueous solutions (NaCl, CuSO4, dilute H2SO4) and overpotential of oxygen',
        'Faraday’s Laws: mass deposited w = (M · I · t) / (n · F)'
      ],
      recentShiftFocus: 'Direct numerical problems on Nernst equation with gas electrodes (Pt, H2 | H+) and concentration cells.'
    },
    mustSolveChecklist: [
      'Write cell notation (Anode | Anodic Soln || Cathodic Soln | Cathode) and calculate E°_cell = E°_cathode - E°_anode',
      'Apply Nernst Equation: E_cell = E°_cell - (0.0591 / n) log10 Q at 298 K',
      'Calculate standard Gibbs energy ΔG° = -n F E°_cell and relate to log10 K = n E° / 0.0591',
      'Calculate Cell Constant G* = l/A = R · κ and Molar Conductivity Λm = (1000 κ) / M',
      'Apply Kohlrausch’s Law to compute Λ°m for weak acetic acid from strong salts',
      'Calculate mass and moles of gas liberated in electrolysis using Q = I · t and n Faraday equivalents'
    ],
    notesSections: [
      {
        id: 'galvanic-cells-and-potentials',
        title: '1. Galvanic Cells, Electrochemical Series & Combining Half-Cells',
        standardTheory: [
          'A galvanic (voltaic) cell converts chemical energy released in a spontaneous redox reaction into electrical energy. The standard Daniell cell consists of a $\\text{Zn}$ rod in $\\text{ZnSO}_4$ solution (anode) and a $\\text{Cu}$ rod in $\\text{CuSO}_4$ solution (cathode) connected via an external circuit and a salt bridge.',
          'Anode is the electrode where OXIDATION occurs (negative terminal in galvanic cell: LOAN — Left, Oxidation, Anode, Negative). Cathode is the electrode where REDUCTION occurs (positive terminal).',
          'Standard electrode potential ($E^\\circ$) is measured against the Standard Hydrogen Electrode ($\\text{SHE}: \\text{Pt}(s) \\mid \\text{H}_2(g, 1\\text{ bar}) \\mid \\text{H}^+(aq, 1\\text{ M})$), assigned an arbitrary potential of $0.00\\text{ V}$ at all temperatures.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Cell EMF & Free Energy Equations ($\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$)',
            content: 'Standard cell potential and thermodynamic Gibbs energy relationship $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$:',
            latex: 'E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ_{\\text{right}} - E^\\circ_{\\text{left}}, \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}} = -2.303 R T \\log_{10} K_{\\text{eq}}',
            extraTips: [
              'Both $E^\\circ_{\\text{cathode}}$ and $E^\\circ_{\\text{anode}}$ MUST be standard REDUCTION potentials (IUPAC convention).',
              'For a spontaneous reaction under standard states: $E^\\circ_{\\text{cell}} > 0$ and $\\Delta G^\\circ < 0$.',
              'Faraday constant $F = 96485\\text{ C/mol} \\approx 96500\\text{ C/mol}$ (charge on $1\\text{ mole}$ of electrons).'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Electrode Potential is Intensive (Never Add $E^\\circ$ Directly!)',
            content: 'Electrode potential $E^\\circ$ is an INTENSIVE property and does not depend on the stoichiometric coefficients of the reaction. When combining two half-reactions to find the $E^\\circ$ of a third half-reaction, you CANNOT add $E^\\circ$ values directly! You MUST add their extensive Gibbs energies ($\\Delta G^\\circ = -nFE^\\circ$):',
            latex: '\\Delta G^\\circ_3 = \\Delta G^\\circ_1 + \\Delta G^\\circ_2 \\implies n_3 E^\\circ_3 = n_1 E^\\circ_1 + n_2 E^\\circ_2 \\implies E^\\circ_3 = \\frac{n_1 E^\\circ_1 + n_2 E^\\circ_2}{n_3}',
            extraTips: [
              'Example: $\\text{Fe}^{3+} + e^- \\to \\text{Fe}^{2+}$ ($E^\\circ_1 = +0.77\\text{ V}, n_1 = 1$) and $\\text{Fe}^{2+} + 2e^- \\to \\text{Fe}$ ($E^\\circ_2 = -0.44\\text{ V}, n_2 = 2$).',
              'For $\\text{Fe}^{3+} + 3e^- \\to \\text{Fe}$ ($n_3 = 3$): $E^\\circ_3 = \\frac{1(0.77) + 2(-0.44)}{3} = -0.037\\text{ V}$. Never do $0.77 - 0.44 = +0.33\\text{ V}$!'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Relative Oxidizing & Reducing Strengths',
            content: 'Electrochemical series ranks elements in increasing order of standard reduction potentials $E^\\circ$:',
            latex: '\\text{Higher } E^\\circ \\implies \\text{Greater tendency to be reduced (Stronger Oxidizing Agent)}',
            extraTips: [
              'Fluorine ($\\text{F}_2 + 2e^- \\to 2\\text{F}^-, E^\\circ = +2.87\\text{ V}$) has the highest reduction potential and is the strongest oxidizing agent.',
              'Lithium ($\\text{Li}^+ + e^- \\to \\text{Li}, E^\\circ = -3.05\\text{ V}$) has the lowest reduction potential, making $\\text{Li}$ metal the strongest reducing agent in aqueous solution.'
            ]
          }
        ]
      },
      {
        id: 'nernst-equation-and-equilibrium',
        title: '2. Nernst Equation, Equilibrium Constant & Concentration Cells',
        standardTheory: [
          'Walther Nernst established the mathematical relationship between electrode/cell potential and electrolyte concentrations (or gas partial pressures) under non-standard states.',
          'At chemical equilibrium, the rate of forward electron transfer equals reverse transfer; net current is zero and cell potential drops to ZERO ($E_{\\text{cell}} = 0$). The reaction quotient $Q$ becomes equal to the equilibrium constant $K_{\\text{eq}}$.',
          'A Concentration Cell is an electrochemical cell where both electrodes are made of the exact same material and dipped into solutions of the same electrolyte but at different concentrations ($c_1$ and $c_2$). Hence, $E^\\circ_{\\text{cell}} = 0$.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Complete Nernst Equation & Equilibrium Constant',
            content: 'Nernst equation for a general redox reaction $aA + bB \\rightleftharpoons cC + dD$ at $298.15\\text{ K}$ (where $\\frac{2.303 RT}{F} = 0.0591\\text{ V}$):',
            latex: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} Q = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} \\left( \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\right)',
            extraTips: [
              'At equilibrium ($E_{\\text{cell}} = 0$ and $Q = K_{\\text{eq}}$): $\\log_{10} K_{\\text{eq}} = \\frac{n E^\\circ_{\\text{cell}}}{0.0591}$.',
              'Pure solids and pure liquids have unit activity ($[\\text{Solid}] = 1, [\\text{Liquid}] = 1$); omit them from $Q$.',
              'For gas electrodes, use partial pressure in bar/atm: e.g. for $\\text{H}_2$ gas, use $P_{\\text{H}_2}$.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Stoichiometric Exponents in Reaction Quotient Q',
            content: 'For Daniell cell: Zn(s) + Cu²⁺(aq) ⇌ Zn²⁺(aq) + Cu(s), n = 2 and Q = [Zn²⁺]/[Cu²⁺]. But for a reaction like Zn(s) + 2 Ag⁺(aq) ⇌ Zn²⁺(aq) + 2 Ag(s), n = 2 and Q = [Zn²⁺] / [Ag⁺]²! Forgetting to SQUARE the concentration of Ag⁺ is the #1 mistake in JEE Main.',
            latex: 'Q = \\frac{[\\text{Zn}^{2+}]}{[\\text{Ag}^+]^2} \\quad (\\text{Exponent must match stoichiometric coefficient!})'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Concentration Cells (E°_cell = 0)',
            content: 'Electrode concentration cells and electrolyte concentration cells generate EMF solely from the difference in concentrations:',
            latex: 'E_{\\text{cell}} = -\\frac{0.0591}{n} \\log_{10} \\left(\\frac{c_1}{c_2}\\right) = \\frac{0.0591}{n} \\log_{10} \\left(\\frac{c_2}{c_1}\\right) \\quad [\\text{Spontaneous when } c_2 > c_1]',
            extraTips: [
              'Anodic half-cell has LOWER concentration (c1) and cathodic half-cell has HIGHER concentration (c2).',
              'Hydrogen electrode concentration cell: Pt, H2(1 atm) | H⁺(c1) || H⁺(c2) | H2(1 atm), Pt has E_cell = 0.0591 × [pH(anode) - pH(cathode)].'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Hydrogen Electrode Potential vs pH',
            content: 'For the hydrogen reduction half-reaction: 2 H⁺(aq) + 2e⁻ ⇌ H2(g, 1 bar). Applying Nernst equation gives E(H⁺/H2) = E° - (0.0591/1) log(1 / [H⁺]) = -0.0591 × pH! As pH increases (more basic solution), electrode reduction potential becomes MORE NEGATIVE.',
            latex: 'E_{\\text{H}^+/\\text{H}_2} = -0.0591 \\times \\text{pH} \\quad (\\text{At pH = 7, } E = -0.414 \\text{ V; at pH = 14, } E = -0.828 \\text{ V})'
          }
        ]
      },
      {
        id: 'electrolytic-conductance-kohlrausch',
        title: '3. Electrolytic Conductance, Molar Conductivity & Kohlrausch’s Law',
        standardTheory: [
          'Resistance R of a uniform conductor is proportional to length l and inversely proportional to cross-sectional area A: R = ρ (l / A). Conductance G = 1 / R. Conductivity (specific conductance) κ = 1 / ρ = G (l / A) = G · G*, where G* = l / A is the Cell Constant.',
          'Molar conductivity (Λm) is the conducting power of all the ions produced by dissolving 1 mole of an electrolyte in solution: Λm = κ / c.',
          'Kohlrausch’s Law of Independent Migration of Ions: At infinite dilution, when dissociation is complete and inter-ionic interactions vanish, each ion makes a definite independent contribution toward total molar conductivity of the electrolyte regardless of the nature of the co-ion.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Conductance, Kohlrausch & Degree of Dissociation',
            content: '1. Molar Conductivity conversion formulas:\n$$\\Lambda_m = \\frac{\\kappa \\times 1000}{M} \\, (\\text{when } \\kappa \\text{ in S}\\cdot\\text{cm}^{-1}, M \\text{ in mol/L}) \\quad | \\quad \\Lambda_m = \\frac{\\kappa}{1000 \\times M} \\, (\\text{when } \\kappa \\text{ in S}\\cdot\\text{m}^{-1})$$\n2. Kohlrausch Law for electrolyte AxBy:\n$$\\Lambda^\\circ_m(\\text{A}_x\\text{B}_y) = x \\, \\lambda^\\circ_m(\\text{A}^{y+}) + y \\, \\lambda^\\circ_m(\\text{B}^{x-})$$\n3. Degree of Dissociation (α) and Dissociation Constant (Ka) of weak electrolyte:\n$$\\alpha = \\frac{\\Lambda_m}{\\Lambda^\\circ_m}, \\qquad K_a = \\frac{c \\, \\alpha^2}{1 - \\alpha} = \\frac{c \\, \\Lambda_m^2}{\\Lambda^\\circ_m (\\Lambda^\\circ_m - \\Lambda_m)}$$',
            latex: '\\Lambda_m = \\frac{1000 \\, \\kappa}{M}, \\quad \\alpha = \\frac{\\Lambda_m}{\\Lambda^\\circ_m}, \\quad K_a = \\frac{c \\, \\alpha^2}{1 - \\alpha}',
            extraTips: [
              'SI units of Λm: S·m²·mol⁻¹; common practical units: S·cm²·mol⁻¹ (1 S·m²·mol⁻¹ = 10⁴ S·cm²·mol⁻¹).',
              'Conductivity κ always DECREASES upon dilution because the number of current-carrying ions per unit volume decreases.',
              'Molar conductivity Λm always INCREASES upon dilution for both strong and weak electrolytes.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Debye-Hückel-Onsager vs Weak Electrolyte Dilution Curve',
            content: 'Strong electrolytes (KCl, NaCl) follow the Debye-Hückel-Onsager linear equation: Λm = Λ°m - A √c. Graph of Λm vs √c is a straight line with y-intercept = Λ°m. For weak electrolytes (CH3COOH), Λm increases steeply at high dilution due to surge in degree of dissociation α; its Λ°m CANNOT be found by extrapolation to c = 0! Kohlrausch’s law must be used.',
            latex: '\\Lambda_m = \\Lambda^\\circ_m - A \\sqrt{c} \\quad (\\text{Strictly for STRONG electrolytes at low concentration})'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Calculating Λ°m of Weak Acid from Strong Salt Combinations',
            content: 'Classic NCERT calculation for limiting molar conductivity of acetic acid (CH3COOH):',
            latex: '\\Lambda^\\circ_m(\\text{CH}_3\\text{COOH}) = \\Lambda^\\circ_m(\\text{CH}_3\\text{COONa}) + \\Lambda^\\circ_m(\\text{HCl}) - \\Lambda^\\circ_m(\\text{NaCl})',
            extraTips: [
              'Similarly for NH4OH: Λ°m(NH4OH) = Λ°m(NH4Cl) + Λ°m(NaOH) - Λ°m(NaCl).',
              'Check ion stoichiometry: for Al2(SO4)3, Λ°m = 2 λ°(Al³⁺) + 3 λ°(SO4²⁻).'
            ]
          }
        ]
      },
      {
        id: 'electrolysis-and-batteries',
        title: '4. Faraday’s Laws of Electrolysis, Commercial Batteries & Fuel Cells',
        standardTheory: [
          'Electrolysis uses electrical energy from an external power supply to force non-spontaneous chemical redox reactions at electrodes immersed in molten or aqueous electrolytes.',
          'Faraday’s 1st Law: Mass of substance deposited or liberated at any electrode is directly proportional to quantity of electricity passed: w = Z · Q = Z · I · t.',
          'Faraday’s 2nd Law: When the same quantity of electricity passes through several electrolytes in series, masses of substances deposited are proportional to their chemical equivalent weights: w1 / E1 = w2 / E2.',
          'Commercial batteries are classified as Primary (non-rechargeable: Leclanché dry cell, Mercury button cell) and Secondary (rechargeable: Lead storage battery, Nickel-Cadmium cell).'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Faraday Electrolysis Equations',
            content: 'Mass of substance deposited (molar mass M, valence factor / electrons exchanged n):',
            latex: 'w = \\frac{M \\cdot I \\cdot t}{n \\cdot 96500} = \\frac{M \\cdot Q}{n \\cdot F}, \\quad \\text{Moles deposited } = \\frac{w}{M} = \\frac{I \\cdot t}{n \\cdot 96500}',
            extraTips: [
              '1 Faraday (96500 C) deposits 1 gram-equivalent of any element.',
              'Depositing 1 mol Ag (n=1) requires 1 F; 1 mol Cu (n=2) requires 2 F; 1 mol Al (n=3) requires 3 F.',
              'Liberating 1 mol O2 gas from water (2 H2O → O2 + 4H⁺ + 4e⁻) requires 4 Faradays (4 × 96500 C)!'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Electrolysis Products of Aqueous NaCl (Overpotential Trap)',
            content: 'In aqueous NaCl electrolysis:\n• At Cathode: H2O is reduced preferentially over Na⁺ (E° of H2O = -0.83 V vs Na⁺ = -2.71 V). H2 gas is liberated and solution turns alkaline (OH⁻ forms).\n• At Anode: Thermodynamically, H2O oxidation to O2 (E° = +1.23 V) is favored over Cl⁻ oxidation to Cl2 (E° = +1.36 V). However, kinetic barrier (overpotential) for oxygen evolution is large, so Cl2 gas is liberated instead! Never choose O2 gas as primary anode product in concentrated brine!',
            latex: '\\text{Cathode: } 2\\text{H}_2\\text{O} + 2e^- \\to \\text{H}_2(g) + 2\\text{OH}^- \\qquad \\text{Anode: } 2\\text{Cl}^- \\to \\text{Cl}_2(g) + 2e^-'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Lead Storage Battery Discharge & Recharge Reactions',
            content: 'Overall cell reaction during discharge:',
            latex: '\\text{Pb}(s) + \\text{PbO}_2(s) + 2\\text{H}_2\\text{SO}_4(aq) \\xrightarrow{\\text{Discharge}} 2\\text{PbSO}_4(s) + 2\\text{H}_2\\text{O}(l)',
            extraTips: [
              'During discharge: H2SO4 is consumed and water is produced; density of sulfuric acid drops from 1.30 g/mL to below 1.20 g/mL.',
              'During recharge (connected to external DC charger): Reactions are reversed; PbSO4 on anode is reduced back to Pb, and PbSO4 on cathode is oxidized back to PbO2.'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Corrosion Electrochemical Mechanism & Rusting',
            content: 'Corrosion is an electrochemical phenomenon occurring on iron surfaces:\n• Anode: 2 Fe(s) → 2 Fe²⁺(aq) + 4e⁻ (E° = -0.44 V)\n• Cathode: O2(g) + 4 H⁺(aq) + 4e⁻ → 2 H2O(l) (E° = +1.23 V)\nOverall: 2 Fe + O2 + 4 H⁺ → 2 Fe²⁺ + 2 H2O (E°_cell = +1.67 V). Further oxidation yields rust Fe2O3 · x H2O.',
            latex: '2\\text{Fe} + \\text{O}_2 + 4\\text{H}^+ \\to 2\\text{Fe}^{2+} + 2\\text{H}_2\\text{O} \\quad (E^\\circ_{\\text{cell}} = +1.67\\text{ V})',
            extraTips: [
              'Cathodic / Sacrificial Protection: Zinc coating (galvanization) protects iron because Zn (E° = -0.76 V) has lower reduction potential than Fe (E° = -0.44 V) and oxidizes preferentially.',
              'Even if galvanized coating is scratched, Zn continues to protect exposed iron.'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Hydrogen-Oxygen Fuel Cell Efficiency',
            content: 'NCERT Section 2.5: The hydrogen-oxygen fuel cell used in Apollo space programs operates at approximately 70% thermal efficiency compared to conventional thermal power plants (about 40%). The drinking water produced from condensation of reaction vapors was used by astronauts.'
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Repeating Archetype',
        conceptTested: 'Nernst Equation with Gas Partial Pressures & pH',
        question: 'Calculate the EMF of the following cell at 298 K: Zn(s) | Zn²⁺(0.1 M) || H⁺(0.01 M) | H2(g, 1 bar), Pt(s). Given E°(Zn²⁺/Zn) = -0.76 V and 2.303 RT/F = 0.0591 V.',
        solutionSteps: [
          'Identify anode and cathode reactions:\nAnode (Oxidation): Zn(s) → Zn²⁺(aq) + 2e⁻\nCathode (Reduction): 2 H⁺(aq) + 2e⁻ → H2(g)',
          'Overall cell reaction: Zn(s) + 2 H⁺(aq) ⇌ Zn²⁺(aq) + H2(g), so number of electrons transferred n = 2.',
          'Standard EMF: E°_cell = E°_cathode - E°_anode = 0.00 V - (-0.76 V) = +0.76 V.',
          'Write reaction quotient Q: Q = ([Zn²⁺] · P_{H2}) / [H⁺]² = (0.1 × 1) / (0.01)² = 0.1 / (10⁻⁴) = 1000 = 10³.',
          'Apply Nernst Equation: E_cell = E°_cell - (0.0591 / n) log10 Q\nE_cell = 0.76 - (0.0591 / 2) log10(10³)\nE_cell = 0.76 - (0.02955 × 3) = 0.76 - 0.08865 = 0.67135 V ≈ 0.671 V.'
        ],
        ntaTrapOrShortcut: 'Crucial trap: Do not forget to square the concentration of H⁺ in Q: [H⁺]² = (10⁻²)² = 10⁻⁴, so Q = 10³.',
        answer: 'E_cell = +0.671 V'
      },
      {
        number: 2,
        yearTag: 'JEE Main 2024 Shift Archetype',
        conceptTested: 'Kohlrausch Law & Degree of Dissociation Calculation',
        question: 'Conductivity of 0.00241 M acetic acid solution is 7.896 × 10⁻⁵ S·cm⁻¹. Given λ°m(H⁺) = 349.6 S·cm²·mol⁻¹ and λ°m(CH3COO⁻) = 40.9 S·cm²·mol⁻¹. Calculate (a) molar conductivity Λm, and (b) its dissociation constant Ka.',
        solutionSteps: [
          'Calculate Molar Conductivity: Λm = (1000 × κ) / M = (1000 × 7.896 × 10⁻⁵) / 0.00241 = 7.896 × 10⁻² / 0.00241 = 32.76 S·cm²·mol⁻¹.',
          'Calculate Limiting Molar Conductivity Λ°m using Kohlrausch’s Law: Λ°m(CH3COOH) = λ°m(H⁺) + λ°m(CH3COO⁻) = 349.6 + 40.9 = 390.5 S·cm²·mol⁻¹.',
          'Calculate degree of dissociation α = Λm / Λ°m = 32.76 / 390.5 ≈ 0.0839 (or 8.39%).',
          'Calculate Ka = (c · α²) / (1 - α) = (0.00241 × (0.0839)²) / (1 - 0.0839) = (0.00241 × 0.00704) / 0.9161 ≈ 1.85 × 10⁻⁵ mol/L.'
        ],
        ntaTrapOrShortcut: 'Since α = 0.0839 > 0.05 (8.39%), do not approximate 1 - α ≈ 1 in the denominator for precision numerical questions.',
        answer: 'Λm = 32.76 S·cm²·mol⁻¹, Ka = 1.85 × 10⁻⁵ mol/L'
      }
    ],
    ncertGems: [
      {
        id: 'gem-electrochem-1',
        title: 'Molar Conductivity Units and Volume Conversion',
        statement: 'In the formula Λm = κ / c, if κ is expressed in S·m⁻¹ and concentration c in mol·m⁻³, then Λm has units of S·m²·mol⁻¹. However, if concentration is in traditional molarity (mol/L) and κ in S·cm⁻¹, 1 L = 1000 cm³ must be multiplied in numerator: Λm = (1000 · κ) / M.',
        tableOrPageRef: 'NCERT Class 12 Chemistry, Chapter 2, Example 2.4',
        importanceReason: 'NTA numerical integer questions frequently mix S·m⁻¹ and mol/L to create unit mismatches.'
      },
      {
        id: 'gem-electrochem-2',
        title: 'Mercury Cell Constant Potential Over Lifetime',
        statement: 'Mercury cell provides a constant potential of approximately 1.35 V throughout its operational lifetime because the overall cell reaction (Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)) involves no ions in solution whose concentration could change during its use.',
        tableOrPageRef: 'NCERT Class 12 Chemistry, Chapter 2, Section 2.5.1',
        importanceReason: 'Frequent NCERT Assertion-Reason question testing why mercury cell EMF does not decay over time.'
      }
    ],
    flashcards: [
      {
        id: 'fc-ec-1',
        question: 'What is the relationship between standard cell EMF and equilibrium constant K_eq at 298 K?',
        answer: 'log10 K_eq = (n · E°_cell) / 0.0591, derived from ΔG° = -nFE° = -2.303 RT log10 K.',
        latex: '\\log_{10} K_{\\text{eq}} = \\frac{n \\, E^\\circ_{\\text{cell}}}{0.0591}',
        tag: 'Equilibrium'
      },
      {
        id: 'fc-ec-2',
        question: 'How do you correctly combine two half-cell reduction potentials to find E° of a third half-cell?',
        answer: 'You must add extensive Gibbs free energies: n3 E°3 = n1 E°1 + n2 E°2. Never add E° directly!',
        latex: 'E^\\circ_3 = \\frac{n_1 E^\\circ_1 + n_2 E^\\circ_2}{n_3}',
        tag: 'Potentials'
      },
      {
        id: 'fc-ec-3',
        question: 'What is the formula for degree of dissociation α of a weak electrolyte from conductivities?',
        answer: 'α = Λm / Λ°m, where Λ°m is calculated using Kohlrausch’s Law of independent ion migration.',
        latex: '\\alpha = \\frac{\\Lambda_m}{\\Lambda^\\circ_m}',
        tag: 'Conductance'
      },
      {
        id: 'fc-ec-4',
        question: 'Why does conductivity κ decrease with dilution while molar conductivity Λm increases?',
        answer: 'κ decreases because ions per unit volume decrease. Λm increases because total volume containing 1 mole increases and inter-ionic hindrances reduce.',
        latex: '\\kappa \\downarrow \\quad \\text{and} \\quad \\Lambda_m \\uparrow \\quad (\\text{upon dilution})',
        tag: 'Conductance'
      }
    ]
  },
  {
    id: 'chem-12-03-chemical-kinetics',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 3,
    title: 'Chemical Kinetics',
    ncertName: 'Chemical Kinetics',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    branch: 'physical',
    highlightedSubtopics: ['Zero & First Order Integrated Rate Laws & Half-Life (t1/2)', 'Arrhenius Equation (k = A e^(-Ea/RT)) & Activation Energy', 'Pseudo First-Order Reactions', 'Collision Theory & Catalyst Effect on Ea'],
    pyqTrend: { avgQuestions5Yr: 2.1, difficulty: 'Easy', marksPercentage: '7.0%', topRepeatedConcepts: ['First order t_1/2 = 0.693 / k is INDEPENDENT of initial concentration', 'Two temperatures Arrhenius: log10(k2/k1) = (Ea / 2.303R) (1/T1 - 1/T2)', 'First order completion times: t_99.9% = 10 × t_1/2; t_75% = 2 × t_1/2'], recentShiftFocus: 'Rate law determination from initial rate method tables.' },
    mustSolveChecklist: ['First order k = (2.303 / t) log([A]0 / [A])', 'Zero order [A] = [A]0 - kt, t_1/2 = [A]0 / (2k)', 'Arrhenius activation energy slope = -Ea / (2.303 R)'],
    notesSections: [{ id: 'kinetics-rates', title: '1. Integrated Rate Laws & Arrhenius', standardTheory: ['Rate of reaction depends on reactant concentration raised to powers (orders).'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 First Order Multiples of Half-Life', content: 't_75% = 2 t_1/2\nt_87.5% = 3 t_1/2\nt_99.9% ≈ 10 t_1/2', latex: 't_{99.9\\%} = 10 \\cdot t_{1/2}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-04-d-and-f-block',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 4,
    title: 'd- and f-Block Elements',
    ncertName: 'The d- and f-Block Elements',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    branch: 'inorganic',
    highlightedSubtopics: ['Lanthanoid Contraction & Consequences (Zr/Hf similarity)', 'Spin-Only Magnetic Moment (μ = √(n(n+2)) BM)', 'KMnO4 & K2Cr2O7 Preparation, Structures & Oxidizing Properties', 'Catalytic Properties & Variable Oxidation States'],
    pyqTrend: { avgQuestions5Yr: 2.0, difficulty: 'Easy', marksPercentage: '6.8%', topRepeatedConcepts: ['KMnO4 titration reactions in acidic medium (oxidizes Fe²⁺, C2O4²⁻, I⁻)', 'Lanthanoid contraction causes 4d and 5d series elements (Zr and Hf) to have nearly identical atomic radii (160 pm vs 159 pm)', 'Color of permanganate MnO4⁻ (purple) and dichromate Cr2O7²⁻ (orange) is due to Charge Transfer, NOT d-d transition!'], recentShiftFocus: 'Structure of chromate (tetrahedral yellow) vs dichromate (bridged tetrahedral orange).' },
    mustSolveChecklist: ['Write balanced equations for KMnO4 and K2Cr2O7 in acidic medium', 'Explain why Cr²⁺ is reducing while Mn³⁺ is oxidizing though both are d⁴', 'Identify actinoid contraction greater than lanthanoid contraction due to poorer shielding by 5f'],
    notesSections: [{ id: 'df-block', title: '1. Lanthanoids & Oxidizing Agents', standardTheory: ['Transition metals have incomplete d-subshell.'], highlightBoxes: [{ type: 'ncert-line', title: '📘 Direct NCERT Gem: Permanganate Color Mechanism', content: 'NCERT Section 8.3: KMnO4 is intensely colored purple because of Ligand to Metal Charge Transfer (LMCT), as Mn is in +7 oxidation state with d⁰ configuration!' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-06-p-block-elements',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 6,
    title: 'p-Block Elements (Gr 13–18 JEE)',
    ncertName: 'The p-Block Elements',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'inorganic',
    highlightedSubtopics: ['Inert Pair Effect Down Groups 13, 14, 15', 'Anomalous Behavior of First Row (B, C, N, O, F)', 'Hydrides Boiling Point & Acidic Strength Trends', 'Oxoacids of Phosphorus, Sulfur & Halogens Structures'],
    pyqTrend: { avgQuestions5Yr: 1.7, difficulty: 'Moderate', marksPercentage: '5.8%', topRepeatedConcepts: ['Inert pair effect: Tl⁺ > Tl³⁺, Pb²⁺ > Pb⁴⁺, Bi³⁺ > Bi⁵⁺ stability', 'Basicity of H3PO2 (monobasic), H3PO3 (dibasic), H3PO4 (tribasic) based on P-OH count', 'Interhalogen compounds reactivity > halogens (except F2)'], recentShiftFocus: 'Thermal stability and reducing nature of Group 15 hydrides.' },
    mustSolveChecklist: ['Identify number of P-OH, P-H, and P=O bonds in oxoacids of phosphorus', 'Boiling points of Group 16 hydrides: H2O >> H2Te > H2Se > H2S', 'Inert pair effect explanation'],
    notesSections: [{ id: 'pblock-oxo', title: '1. Inert Pair Effect & Oxoacid Structures', standardTheory: ['Reluctance of valence s-electrons to participate in bonding down the group is the inert pair effect.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Phosphorus Oxoacids Basicity & Reducing Power', content: 'Only H atoms attached to Oxygen (P-OH) are ionizable (give basicity).\nH atoms attached DIRECTLY to Phosphorus (P-H) act as reducing agents!\nH3PO2 has 2 P-H bonds → strong reducing agent and monobasic.', latex: '\\text{H}_3\\text{PO}_2: 1 \\; \\text{P-OH} \\; (\\text{monobasic}), \\; 2 \\; \\text{P-H} \\; (\\text{reducing})' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-07-haloalkanes-haloarenes',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 7,
    title: 'Haloalkanes & Haloarenes',
    ncertName: 'Haloalkanes and Haloarenes',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'organic',
    highlightedSubtopics: ['SN1 vs SN2 Mechanisms, Reactivity & Stereochemistry (Inversion/Walden)', 'Elimination Reactions: E1 vs E2 & Zaitsev Rule', 'Grignard Reagent Preparation & Nucleophilic Additions', 'Aryl Halide Unreactivity towards SN due to Resonance & sp² Hybridization'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Moderate', marksPercentage: '6.2%', topRepeatedConcepts: ['SN2 reactivity order: 1° > 2° > 3° (polar aprotic solvents, inversion of configuration)', 'SN1 reactivity order: 3° > 2° > 1° (polar protic solvents, carbocation intermediate, racemization)', 'Finkelstein reaction (acetone + NaI) & Swarts reaction (AgF, SbF3)'], recentShiftFocus: 'Chirality and optical activity in SN1 vs SN2 products.' },
    mustSolveChecklist: ['Differentiate SN1 and SN2 based on substrate, nucleophile, solvent', 'Zaitsev elimination: more substituted alkene is major', 'Grignard reaction with aldehydes, ketones, esters'],
    notesSections: [{ id: 'sn1-sn2', title: '1. SN1 vs SN2 Stereochemistry Matrix', standardTheory: ['Nucleophilic substitution occurs via biomolecular backside attack (SN2) or unimolecular carbocation path (SN1).'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 SN1 vs SN2 Comparison Table', content: 'SN2: 1-step, backside attack, Walden Inversion, Rate = k[R-X][Nu⁻], favored by Polar Aprotic (DMSO, DMF, Acetone).\nSN1: 2-step, carbocation, Racemization, Rate = k[R-X], favored by Polar Protic (H2O, EtOH).' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-08-alcohols-phenols-ethers',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 8,
    title: 'Alcohols, Phenols & Ethers',
    ncertName: 'Alcohols, Phenols and Ethers',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'organic',
    highlightedSubtopics: ['Lucas Test for 1°, 2°, 3° Alcohols (Immediate turbidity with 3°)', 'Reimer-Tiemann & Kolbe Reactions of Phenol', 'Williamson Ether Synthesis & HI Cleavage of Ethers', 'Acidity of Phenol vs Alcohols (Resonance stabilization of phenoxide)'],
    pyqTrend: { avgQuestions5Yr: 1.9, difficulty: 'Moderate', marksPercentage: '6.5%', topRepeatedConcepts: ['Reimer-Tiemann converts phenol to salicylaldehyde using CHCl3 + aq NaOH (:CCl2 carbene intermediate)', 'Kolbe reaction converts phenol to salicylic acid using CO2 + NaOH', 'HI cleavage of ethers: with tertiary alkyl group, reaction goes by SN1 mechanism!'], recentShiftFocus: 'Product of asymmetric ether cleavage with excess HI.' },
    mustSolveChecklist: ['Lucas test turbidity times', 'Reimer-Tiemann carbene intermediate :CCl2', 'Williamson synthesis: R-X must be unhindered (1°) to avoid E2'],
    notesSections: [{ id: 'phenol-reactions', title: '1. Named Reactions & Ether Cleavage', standardTheory: ['Phenol is more acidic than aliphatic alcohols due to resonance stabilization of phenoxide ion.'], highlightBoxes: [{ type: 'trap', title: '⚠️ Ether Cleavage with HI Trap', content: 'If one alkyl group is 3° (e.g. t-butyl methyl ether), SN1 occurs forming 3° alkyl iodide and methanol!\nIf both alkyl groups are 1° or 2°, SN2 occurs: iodide attacks SMALLER alkyl group.', latex: '(CH_3)_3C - O - CH_3 + HI \\to (CH_3)_3C - I + CH_3OH \\quad (S_N1)' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-09-aldehydes-ketones-carboxylic',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 9,
    title: 'Aldehydes, Ketones & Carboxylic Acids',
    ncertName: 'Aldehydes, Ketones and Carboxylic Acids',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    branch: 'organic',
    highlightedSubtopics: ['Aldol & Cross-Aldol Condensation Mechanisms', 'Cannizzaro Reaction (Aldehydes with No α-Hydrogen)', 'Tollens, Fehling & Iodoform (Haloform) Tests', 'Clemmensen & Wolff-Kishner Reduction', 'Hell-Volhard-Zelinsky (HVZ) Reaction'],
    pyqTrend: { avgQuestions5Yr: 2.7, difficulty: 'Moderate', marksPercentage: '9.2%', topRepeatedConcepts: ['Aldol requires α-hydrogen; Cannizzaro occurs when NO α-hydrogen (HCHO, PhCHO)', 'Iodoform test given by CH3-C=O or CH3-CH(OH)- groups (yellow precipitate of CHI3)', 'Clemmensen (Zn-Hg / conc HCl, acid-sensitive groups avoid) vs Wolff-Kishner (NH2NH2 / KOH, base-sensitive avoid)'], recentShiftFocus: 'Cross-aldol product distribution and intramolecular aldol cyclization.' },
    mustSolveChecklist: ['Identify compounds giving positive Iodoform test', 'Differentiate Clemmensen and Wolff-Kishner reaction conditions', 'HVZ reaction of carboxylic acids with X2/red P to form α-halocarboxylic acids'],
    notesSections: [{ id: 'aldol-tests', title: '1. Aldol, Cannizzaro & Diagnostic Tests', standardTheory: ['Carbonyl carbon is electrophilic due to oxygen electronegativity.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Iodoform Test Structural Criterion', content: 'Positive yellow CHI3 ppt given by compounds possessing either:\n1. CH3 - C(=O) - R (Methyl ketone or Acetaldehyde)\n2. CH3 - CH(OH) - R (Oxidizable to methyl ketone)\nEthanol gives positive iodoform; Methanol gives NEGATIVE!', latex: 'CH_3 - C(=O) - R \\xrightarrow{I_2 / NaOH} CHI_3 \\downarrow (\\text{yellow}) + RCOONa' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-10-amines',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 10,
    title: 'Amines',
    ncertName: 'Amines',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'organic',
    highlightedSubtopics: ['Basicity Order in Gas Phase vs Aqueous Phase (2° > 1° > 3° in methyl)', 'Hoffmann Bromamide Degradation (Step-Down Reaction)', 'Carbylamine Test for Primary Amines (Foul smelling isocyanide)', 'Hinsberg’s Reagent (Benzenesulfonyl chloride) Separation', 'Diazonium Salt Coupling & Sandmeyer Reactions'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Easy', marksPercentage: '6.2%', topRepeatedConcepts: ['Aqueous basicity order: (CH3)2NH > CH3NH2 > (CH3)3N > NH3 (213 order for methyl)', 'For ethyl group: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3 (231 order for ethyl)', 'Hoffmann Bromamide reduces carbon chain by one: R-CONH2 + Br2 + 4KOH → R-NH2 + K2CO3 + 2KBr + 2H2O'], recentShiftFocus: 'Hinsberg reagent: 1° amine soluble in alkali, 2° insoluble in alkali, 3° no reaction.' },
    mustSolveChecklist: ['Aqueous basicity order 213 (methyl) vs 231 (ethyl)', 'Carbylamine test is specific to 1° amines (both aliphatic and aromatic)', 'Sandmeyer vs Gattermann reaction for aryl halides'],
    notesSections: [{ id: 'amine-basicity', title: '1. Basicity Anomalies & Hoffmann Degradation', standardTheory: ['Basicity in aqueous solution is dictated by inductive effect, solvation energy, and steric hindrance combined.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Amine Aqueous Basicity Order Secret', content: 'Methyl substituted: 2° > 1° > 3° > NH3 (Remember code: 213)\nEthyl substituted: 2° > 3° > 1° > NH3 (Remember code: 231)', latex: '213 \\; (\\text{Methyl}) \\quad \\text{vs} \\quad 231 \\; (\\text{Ethyl})' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'chem-12-11-biomolecules',
    subject: 'chemistry',
    classLevel: '12',
    chapterNumber: 11,
    title: 'Biomolecules',
    ncertName: 'Biomolecules',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    branch: 'organic',
    highlightedSubtopics: ['Glucose Reactions (HI, Br2 water, conc HNO3, acetic anhydride)', 'Disaccharide Linkages (Maltose α(1→4), Lactose β(1→4), Sucrose α1→β2)', 'Reducing vs Non-Reducing Sugars (Sucrose is non-reducing)', 'Amino Acids: Zwitterion, Isoelectric Point, Essential Amino Acids', 'Denaturation of Proteins (Destroys 2°, 3°, 4° structures; 1° remains intact)'],
    pyqTrend: { avgQuestions5Yr: 1.6, difficulty: 'Easy', marksPercentage: '5.5%', topRepeatedConcepts: ['Glucose reactions: HI/heat gives n-hexane; Br2 water oxidizes to Gluconic acid; HNO3 oxidizes to Saccharic acid', 'Sucrose is a NON-REDUCING sugar because both anomeric carbons are involved in glycosidic linkage (α-D-glucose and β-D-fructose)', 'DNA vs RNA differences (Thymine vs Uracil; 2\'-deoxyribose vs ribose)'], recentShiftFocus: 'Isoelectric point and peptide bond formation.' },
    mustSolveChecklist: ['Identify glycosidic linkage in Maltose, Lactose, Sucrose', 'List of essential amino acids', 'Denaturation causes loss of biological activity but primary structure is preserved'],
    notesSections: [{ id: 'glucose-linkages', title: '1. Glucose Chemistry & Disaccharide Linkages', standardTheory: ['Carbohydrates are polyhydroxy aldehydes or ketones.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Disaccharide Glycosidic Linkages Table', content: 'Maltose: α-D-Glucose + α-D-Glucose (α-1,4 linkage, Reducing)\nLactose: β-D-Galactose + β-D-Glucose (β-1,4 linkage, Reducing)\nSucrose: α-D-Glucose + β-D-Fructose (α-1, β-2 linkage, NON-Reducing, Invert Sugar)' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  }
];

export const chemistryNotes = CHEMISTRY_NOTES;
export default CHEMISTRY_NOTES;
