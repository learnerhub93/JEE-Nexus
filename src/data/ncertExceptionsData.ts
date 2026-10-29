import { Subject, ClassLevel } from '../types';
import { VaultItem } from '../utils/vaultExtractor';

export const CURATED_NCERT_EXCEPTIONS: VaultItem[] = [
  // --- INORGANIC & GENERAL CHEMISTRY CLASS 11 ---
  {
    id: 'ncert-chem-11-ie-trends',
    itemType: 'ncert-exception',
    title: 'Anomalous 1st Ionization Enthalpy: Be > B and N > O',
    content: 'In Period 2, IE₁ does NOT increase monotonically: Be (899 kJ/mol) > B (801 kJ/mol) because Be has a stable completely filled 2s² configuration, whereas B has 2p¹ which experiences greater shielding and penetrates less. Similarly, N (1402 kJ/mol) > O (1314 kJ/mol) because N possesses a stable half-filled 2p³ configuration, whereas O (2p⁴) experiences extra electron-electron pairing repulsion in the 2p orbital.',
    latex: '\\text{IE}_1(\\text{Be}) > \\text{IE}_1(\\text{B}) \\quad \\text{and} \\quad \\text{IE}_1(\\text{N}) > \\text{IE}_1(\\text{O})',
    extraTips: [
      'NTA favorite for Direct Statement & Assertion-Reason questions.',
      'Order of Period 2 IE₁: Li < B < Be < C < O < N < F < Ne.',
      'Same anomaly repeats in Period 3: Mg > Al and P > S.'
    ],
    ncertReference: 'NCERT Class 11 Chemistry, Part 1, Chapter 3 (Table 3.5)',
    chapterId: 'chem-11-03-classification-of-elements',
    chapterNumber: 3,
    chapterTitle: 'Classification of Elements & Periodicity in Properties',
    subject: 'chemistry',
    classLevel: '11',
    sectionTitle: 'Periodic Trends in Chemical Properties',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-11-electron-gain',
    itemType: 'ncert-exception',
    title: 'Electron Gain Enthalpy Anomaly: Chlorine > Fluorine & Sulfur > Oxygen',
    content: 'Chlorine has a MORE negative electron gain enthalpy (-349 kJ/mol) than Fluorine (-328 kJ/mol). Reason: The added electron enters the compact, dense 2p subshell in F, experiencing severe inter-electronic repulsion. In Cl, the electron enters the larger 3p subshell with lower repulsive density. Similarly, Sulfur (-200 kJ/mol) has more negative electron gain enthalpy than Oxygen (-141 kJ/mol). In Group 16, Oxygen has the LEAST negative electron gain enthalpy in the entire group!',
    latex: '|\\Delta_{\\text{eg}}H|: \\quad \\text{Cl} > \\text{F} > \\text{Br} > \\text{I} \\quad \\text{and} \\quad \\text{S} > \\text{Se} > \\text{Te} > \\text{Po} > \\text{O}',
    extraTips: [
      'Oxygen has the lowest magnitude in Group 16: S > Se > Te > Po > O.',
      'Fluorine is still the strongest oxidizing agent in aqueous solution due to its very low bond dissociation enthalpy and exceptionally high hydration enthalpy.'
    ],
    ncertReference: 'NCERT Class 11 Chemistry, Part 1, Chapter 3 & Chapter 4',
    chapterId: 'chem-11-03-classification-of-elements',
    chapterNumber: 3,
    chapterTitle: 'Classification of Elements & Periodicity in Properties',
    subject: 'chemistry',
    classLevel: '11',
    sectionTitle: 'Electron Gain Enthalpy Exceptions',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-11-halogen-bond-energy',
    itemType: 'ncert-exception',
    title: 'Halogen Bond Dissociation Enthalpy: Cl₂ > Br₂ > F₂ > I₂',
    content: 'The expected trend based on atomic radius would be F₂ > Cl₂ > Br₂ > I₂. However, F₂ has an anomalously low bond dissociation enthalpy (158.8 kJ/mol) compared to Cl₂ (242.6 kJ/mol) and Br₂ (192.8 kJ/mol). Reason: Due to the extremely small size of fluorine atoms, the 3 non-bonding lone pairs on each F atom suffer intense lone pair–lone pair repulsion across the short F-F bond (142 pm), weakening it drastically.',
    latex: '\\text{Bond Energy: } \\text{Cl}_2 > \\text{Br}_2 > \\text{F}_2 > \\text{I}_2 \\quad (242.6 > 192.8 > 158.8 > 151.1 \\, \\text{kJ/mol})',
    extraTips: [
      'F₂ bond is weaker than both Cl₂ and Br₂, but slightly stronger than I₂.',
      'This explains why F₂ is extremely reactive and exhibits low activation energy for dissociation.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Part 1, Chapter 7 / Class 11 Chemical Bonding',
    chapterId: 'chem-11-04-chemical-bonding',
    chapterNumber: 4,
    chapterTitle: 'Chemical Bonding & Molecular Structure',
    subject: 'chemistry',
    classLevel: '11',
    sectionTitle: 'Bond Dissociation Energies',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-11-dipole-moment-ch3cl',
    itemType: 'ncert-exception',
    title: 'Alkyl Halide Dipole Moment Exception: CH₃Cl > CH₃F',
    content: 'Although fluorine has higher electronegativity (4.0) than chlorine (3.0), Methyl Chloride (CH₃Cl, 1.86 D) has a HIGHER dipole moment than Methyl Fluoride (CH₃F, 1.60 D). Reason: Dipole moment μ = charge (q) × distance (d). The C-Cl bond length (178 pm) is substantially longer than the C-F bond length (139 pm), and this distance factor overcompensates for the slightly smaller partial charge on Cl.',
    latex: '\\mu: \\quad \\text{CH}_3\\text{Cl} \\, (1.86\\text{ D}) > \\text{CH}_3\\text{F} \\, (1.60\\text{ D}) > \\text{CH}_3\\text{Br} \\, (1.78\\text{ D}) > \\text{CH}_3\\text{I} \\, (1.64\\text{ D})',
    extraTips: [
      'Order: CH₃Cl > CH₃Br > CH₃I > CH₃F or CH₃Cl > CH₃F? Remember CH₃Cl > CH₃Br > CH₃F > CH₃I in dipole moment magnitude!',
      'NTA frequently tests this exact order in JEE Main multiple-choice questions.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Part 2, Haloalkanes & Haloarenes (Table 10.2)',
    chapterId: 'chem-11-04-chemical-bonding',
    chapterNumber: 4,
    chapterTitle: 'Chemical Bonding & Molecular Structure',
    subject: 'chemistry',
    classLevel: '11',
    sectionTitle: 'Dipole Moments & Polarity',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-11-group16-hydrides-bp',
    itemType: 'ncert-exception',
    title: 'Boiling Point Order of Group 16 Hydrides: H₂O Exception',
    content: 'Due to increasing molecular mass and Van der Waals forces, the normal trend down the group is H₂S < H₂Se < H₂Te. However, Water (H₂O, 373 K) displays an anomalously high boiling point compared to H₂Te (269 K), H₂Se (232 K), and H₂S (213 K). Reason: Oxygen is highly electronegative and has small atomic size, forming extensive 3D networks of intermolecular hydrogen bonds.',
    latex: '\\text{Boiling Point: } \\text{H}_2\\text{O} \\, (373\\text{ K}) > \\text{H}_2\\text{Te} \\, (269\\text{ K}) > \\text{H}_2\\text{Se} \\, (232\\text{ K}) > \\text{H}_2\\text{S} \\, (213\\text{ K})',
    extraTips: [
      'Volatility order (inverse of BP): H₂S > H₂Se > H₂Te > H₂O (H₂S is most volatile).',
      'Acidic strength trend is normal: H₂O < H₂S < H₂Se < H₂Te (bond dissociation energy decreases).'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, The p-Block Elements, Group 16 Table',
    chapterId: 'chem-11-04-chemical-bonding',
    chapterNumber: 4,
    chapterTitle: 'Chemical Bonding & Molecular Structure',
    subject: 'chemistry',
    classLevel: '11',
    sectionTitle: 'Hydrogen Bonding Effects',
    isHighRepeat: true,
  },

  // --- ORGANIC CHEMISTRY EXCEPTIONS ---
  {
    id: 'ncert-chem-12-amines-basicity',
    itemType: 'ncert-exception',
    title: 'Aqueous Basicity of Aliphatic Amines (Inductive vs Hydration vs Steric)',
    content: 'In gaseous phase, basicity follows purely the +I inductive effect: 3° > 2° > 1° > NH₃. In aqueous solution, basicity is governed by three competing factors: Inductive effect, Hydration energy of conjugate cation, and Steric hindrance.\n• Methyl substituted: 2° > 1° > 3° > NH₃: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ (213 order)\n• Ethyl substituted: 2° > 3° > 1° > NH₃: (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃ (231 order)',
    latex: '\\text{Methyl: } 2^\\circ > 1^\\circ > 3^\\circ > \\text{NH}_3 \\qquad \\text{Ethyl: } 2^\\circ > 3^\\circ > 1^\\circ > \\text{NH}_3',
    extraTips: [
      'Memory mnemonic: Methyl has smaller group, so "213" (smaller number). Ethyl has larger group, so "231" (larger number).',
      'In all aqueous cases, 2° (secondary amine) is the STRONGEST base!'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Part 2, Amines, Section 13.4',
    chapterId: 'chem-12-07-amines',
    chapterNumber: 7,
    chapterTitle: 'Amines',
    subject: 'chemistry',
    classLevel: '12',
    sectionTitle: 'Basicity in Aqueous vs Gas Phase',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-12-ortho-effect-acids',
    itemType: 'ncert-exception',
    title: 'The Ortho Effect in Substituted Benzoic Acids & Anilines',
    content: 'Almost all ortho-substituted benzoic acids (e.g. o-toluic acid, o-nitrobenzoic acid, o-chlorobenzoic acid) are STRONGER acids than benzoic acid, regardless of whether the ortho-substituent is electron-donating (+I/+R) or electron-withdrawing (-I/-R). Reason: Steric Inhibition of Resonance (SIR). The bulky ortho group forces the -COOH group out of the aromatic plane, preventing cross-conjugation of benzene π-electrons with the carbonyl group, which allows full resonance stabilization of the carboxylate anion.',
    latex: 'K_a: \\quad \\text{o-NO}_2\\text{-C}_6\\text{H}_4\\text{COOH} > \\text{o-CH}_3\\text{-C}_6\\text{H}_4\\text{COOH} > \\text{C}_6\\text{H}_5\\text{COOH} > \\text{p-CH}_3\\text{-C}_6\\text{H}_4\\text{COOH}',
    extraTips: [
      'o-Toluic acid is stronger than Benzoic acid even though -CH₃ is electron-donating (+I and hyperconjugation).',
      'For anilines, the ortho effect WEAKENS basicity: ortho-substituted anilines are almost always weaker bases than aniline.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Aldehydes, Ketones and Carboxylic Acids',
    chapterId: 'chem-12-06-aldehydes-ketones-carboxylic-acids',
    chapterNumber: 6,
    chapterTitle: 'Aldehydes, Ketones & Carboxylic Acids',
    subject: 'chemistry',
    classLevel: '12',
    sectionTitle: 'Acidity of Carboxylic Acids',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-12-nitrophenol-volatility',
    itemType: 'ncert-exception',
    title: 'Steam Volatility: ortho-Nitrophenol vs para-Nitrophenol Separation',
    content: 'ortho-Nitrophenol and para-nitrophenol are separated by steam distillation based on difference in hydrogen bonding. ortho-Nitrophenol exhibits INTRA-molecular hydrogen bonding (chelation between -OH and adjacent -NO₂), creating a discrete cyclic 6-membered structure with minimal intermolecular attraction, making it highly steam volatile with lower boiling point. para-Nitrophenol forms extensive INTER-molecular hydrogen bonds with neighboring molecules, resulting in strong molecular association, high boiling point, and non-volatility.',
    latex: '\\text{B.P.: } p\\text{-nitrophenol} > o\\text{-nitrophenol} \\quad (\\text{Steam Volatile: } o\\text{-isomer only})',
    extraTips: [
      'Standard NCERT experiment: Mixture of o- and p-nitrophenols separated cleanly via steam distillation.',
      'Solubility in water: para-isomer is more soluble in water because it forms H-bonds with water molecules.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Part 2, Alcohols, Phenols and Ethers',
    chapterId: 'chem-12-05-alcohols-phenols-ethers',
    chapterNumber: 5,
    chapterTitle: 'Alcohols, Phenols & Ethers',
    subject: 'chemistry',
    classLevel: '12',
    sectionTitle: 'Hydrogen Bonding in Phenols',
    isHighRepeat: true,
  },

  // --- INORGANIC CHEMISTRY CLASS 12 (COORDINATION & D-BLOCK) ---
  {
    id: 'ncert-chem-12-brown-ring-complex',
    itemType: 'ncert-exception',
    title: 'Brown Ring Nitrate Test Complex: Oxidation State & Magnetic Moment',
    content: 'In the qualitative brown ring test for nitrate (NO₃⁻), the brown complex formed at the junction of two liquids is [Fe(H₂O)₅(NO)]SO₄. NCERT Exception: In this complex, Iron is in the +1 oxidation state (Fe⁺, 3d⁷ configuration) and Nitric Oxide is coordinated as the nitrosonium cation (NO⁺). Three unpaired electrons remain in d-orbitals, giving a spin-only magnetic moment μ_eff = √(3 × 5) = √15 ≈ 3.87 BM.',
    latex: '[\\text{Fe}(\\text{H}_2\\text{O})_5(\\text{NO})]^{2+} \\quad \\implies \\quad \\text{Fe}^{(+1)} \\, (3d^7), \\, \\text{NO}^{(+1)}, \\quad \\mu = 3.87 \\, \\text{BM}',
    extraTips: [
      'JEE 2024 / 2023 repeat: Frequently asked in numerical integer and matching questions.',
      'Charge transfer: Electron transfers from NO to Fe²⁺, generating Fe⁺ and NO⁺.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Coordination Compounds / p-Block Nitrogen Compounds',
    chapterId: 'chem-12-05-coordination-compounds',
    chapterNumber: 5,
    chapterTitle: 'Coordination Compounds',
    subject: 'chemistry',
    classLevel: '12',
    sectionTitle: 'Qualitative Analysis Archetypes',
    isHighRepeat: true,
  },
  {
    id: 'ncert-chem-12-lanthanoid-contraction',
    itemType: 'ncert-exception',
    title: 'Lanthanoid Contraction: Zr/Hf and Nb/Ta Twin Radii',
    content: 'Across the 14 lanthanoid elements (Ce to Lu), electrons enter the inner 4f subshell. Because 4f orbitals have highly diffused spatial shapes, their shielding of outer 5d and 6s electrons from the nuclear charge is extremely poor. As nuclear charge Z increases by 14 units, the effective nuclear charge Z_eff increases sharply, causing a steady decrease in atomic and ionic radii. Consequently, 4d and 5d series elements in the same vertical groups have nearly identical radii: Zr (160 pm) ≈ Hf (159 pm), Nb (146 pm) ≈ Ta (146 pm), Mo ≈ W.',
    latex: 'r(\\text{Zr}^{4+}) \\approx r(\\text{Hf}^{4+}) = 0.071\\text{ nm} \\quad \\implies \\quad \\text{Chemical twins difficult to separate}',
    extraTips: [
      'Zr and Hf occur together in nature and are called "chemical twins".',
      'Ionization energy of 5d series is higher than 4d series due to greater effective nuclear charge.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, The d- and f-Block Elements, Section 8.4',
    chapterId: 'chem-12-04-d-and-f-block-elements',
    chapterNumber: 4,
    chapterTitle: 'The d- & f-Block Elements',
    subject: 'chemistry',
    classLevel: '12',
    sectionTitle: 'Consequences of Lanthanoid Contraction',
    isHighRepeat: true,
  },

  // --- PHYSICAL CHEMISTRY & SOLUTIONS ---
  {
    id: 'ncert-chem-12-azeotrope-deviations',
    itemType: 'ncert-exception',
    title: 'Azeotropic Mixtures & Non-Ideal Solution Raoult’s Law Deviations',
    content: 'Azeotropes boil at constant temperature and distill without change in liquid/vapor composition. They CANNOT be separated by fractional distillation.\n1. Minimum Boiling Azeotrope: Formed by solutions with LARGE POSITIVE deviation from Raoult\'s Law (A-B interactions weaker than A-A and B-B; ΔH_mix > 0, ΔV_mix > 0). Example: 95% Ethanol + 5% Water by volume (boiling point 351.15 K, lower than pure ethanol 351.5 K).\n2. Maximum Boiling Azeotrope: Formed by solutions with LARGE NEGATIVE deviation (A-B interactions stronger due to H-bonding; ΔH_mix < 0, ΔV_mix < 0). Example: 68% Nitric Acid (HNO₃) + 32% Water by mass (boiling point 393.5 K, higher than water 373 K).',
    latex: '\\text{Positive Deviation: } \\Delta H_{\\text{mix}} > 0, \\, \\Delta V_{\\text{mix}} > 0 \\quad | \\quad \\text{Negative Deviation: } \\Delta H_{\\text{mix}} < 0, \\, \\Delta V_{\\text{mix}} < 0',
    extraTips: [
      'Chloroform + Acetone forms a NEGATIVE deviation solution due to inter-molecular H-bonding between C-H of CHCl₃ and O of acetone.',
      'Acetone + Carbon disulfide (CS₂) or Ethanol + Cyclohexane forms a POSITIVE deviation solution.'
    ],
    ncertReference: 'NCERT Class 12 Chemistry, Part 1, Solutions, Section 2.4.2',
    chapterId: 'chem-12-01-solutions',
    chapterNumber: 1,
    chapterTitle: 'Solutions',
    subject: 'chemistry',
    classLevel: '12',
    sectionTitle: 'Vapour Pressure of Liquid-Liquid Solutions',
    isHighRepeat: true,
  },

  // --- PHYSICS EXCEPTIONS & STATEMENTS ---
  {
    id: 'ncert-phy-12-photoelectric-timelag',
    itemType: 'ncert-exception',
    title: 'Photoelectric Emission Instantaneity & Stopping Potential Independence',
    content: '1. Instantaneous Emission: In NCERT experiments, photoelectric emission occurs within 10⁻⁹ seconds (less than a nanosecond) after light strikes the metal, regardless of how faint the incident light is. Classical wave theory predicted hours of delay to accumulate energy, which failed.\n2. Stopping Potential Independence: Stopping potential V₀ depends ONLY on incident radiation frequency ν and work function φ₀. It is STRICTLY INDEPENDENT of light intensity! Increasing intensity only increases saturation photocurrent, never the kinetic energy of individual electrons.',
    latex: 'K_{\\text{max}} = e V_0 = h \\nu - \\phi_0 \\quad (\\text{Time lag } \\tau < 10^{-9} \\, \\text{s})',
    extraTips: [
      'Slope of V₀ vs ν graph is h/e, identical for Caesium, Copper, Platinum, or any metal.',
      'Caesium (Cs) has the lowest work function (2.14 eV) and is most photosensitive.'
    ],
    ncertReference: 'NCERT Class 12 Physics, Part 2, Chapter 11, Section 11.3',
    chapterId: 'phy-12-09-dual-nature-atoms-nuclei',
    chapterNumber: 9,
    chapterTitle: 'Dual Nature, Atoms & Nuclei',
    subject: 'physics',
    classLevel: '12',
    sectionTitle: 'Experimental Observations of Photoelectric Effect',
    isHighRepeat: true,
  },
  {
    id: 'ncert-phy-12-conductor-electrostatics',
    itemType: 'ncert-exception',
    title: 'Electrostatic Boundary Conditions for Conductors in Equilibrium',
    content: 'NCERT Section 2.2 lists six immutable properties of conductors:\n1. Inside a conductor, electrostatic field is ZERO everywhere (E = 0).\n2. At the surface of a charged conductor, electrostatic field must be NORMAL to the surface at every point (E = σ / ε₀ n̂).\n3. The interior of a conductor can have no excess charge in the static situation; all charge resides on the outer surface.\n4. Electrostatic potential is CONSTANT throughout the entire volume of the conductor and has the same value on its surface.\n5. Electric field inside a cavity in a conductor is zero, regardless of the cavity shape or external charge (Electrostatic Shielding).',
    latex: 'E_{\\text{inside}} = 0, \\quad V_{\\text{inside}} = V_{\\text{surface}} = \\text{constant}, \\quad E_{\\text{surface}} = \\frac{\\sigma}{\\varepsilon_0}',
    extraTips: [
      'In lightning, sitting inside a closed metallic car is safer than taking shelter under a tree (Faraday cage / shielding).',
      'For dielectric slab in electric field, field is reduced to E = E₀ / K.'
    ],
    ncertReference: 'NCERT Class 12 Physics, Part 1, Electrostatic Potential and Capacitance',
    chapterId: 'phy-12-02-electrostatic-potential-and-capacitance',
    chapterNumber: 2,
    chapterTitle: 'Electrostatic Potential & Capacitance',
    subject: 'physics',
    classLevel: '12',
    sectionTitle: 'Electrostatics of Conductors',
    isHighRepeat: true,
  },
  {
    id: 'ncert-phy-11-adiabatic-work',
    itemType: 'ncert-exception',
    title: 'Thermodynamics Sign Convention & Adiabatic Work Expression',
    content: 'NCERT Physics First Law: ΔQ = ΔU + ΔW, where ΔW = P ΔV is work done BY the gas (expansion work is positive). In Chemistry NCERT, First Law is ΔU = q + w, where w is work done ON the system (w = -P ΔV).\nAdiabatic Work Formula: In adiabatic expansion (Q = 0), ΔU = -W. Because PV^γ = constant, work done is:\n$$W = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{n R (T_1 - T_2)}{\\gamma - 1}$$\nCommon Trap: In expansion T₁ > T₂, so W is positive. Never invert γ - 1 as 1 - γ!',
    latex: 'W_{\\text{adiabatic}} = \\frac{n R (T_1 - T_2)}{\\gamma - 1} = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} \\quad (\\gamma = C_p / C_v > 1)',
    extraTips: [
      'Slope of adiabatic curve on P-V diagram is γ times steeper than isothermal curve: (dP/dV)_adia = γ (dP/dV)_iso.',
      'Monoatomic gas (He, Ar): γ = 5/3 = 1.67; Diatomic gas (O₂, N₂): γ = 7/5 = 1.40.'
    ],
    ncertReference: 'NCERT Class 11 Physics, Part 2, Chapter 12, Thermodynamics',
    chapterId: 'phy-11-08-thermodynamics',
    chapterNumber: 8,
    chapterTitle: 'Thermodynamics & Kinetic Theory',
    subject: 'physics',
    classLevel: '11',
    sectionTitle: 'Thermodynamic Processes & Work Done',
    isHighRepeat: true,
  },

  // --- MATHEMATICS EXCEPTIONS & THEOREMS ---
  {
    id: 'ncert-math-12-skew-symmetric-det',
    itemType: 'ncert-exception',
    title: 'Skew-Symmetric Matrix Determinant & Adjoint Power Theorems',
    content: '1. Skew-Symmetric Determinant: The determinant of any skew-symmetric matrix (A^T = -A) of ODD order (e.g. 3×3, 5×5) is STRICTLY ZERO. Proof: |A| = |A^T| = |-A| = (-1)^n |A| = -|A| ⇒ 2|A| = 0 ⇒ |A| = 0.\n2. Adjoint Determinant Powers for n×n matrix:\n• |adj(A)| = |A|^(n - 1)\n• |adj(adj(A))| = |A|^((n - 1)²)\n• adj(kA) = k^(n - 1) adj(A)\n• det(kA) = k^n det(A)\n3. Invertibility Condition: Matrix A has an inverse if and only if |A| ≠ 0 (non-singular).',
    latex: '|A| = 0 \\quad (\\text{if } A^T = -A \\text{ and } n \\text{ is odd}); \\quad |\\text{adj}(A)| = |A|^{n-1}',
    extraTips: [
      'If n is even, determinant of skew-symmetric matrix is a perfect square.',
      'NTA tests |adj(adj(A))| in almost every JEE Main shift with 3×3 matrices where (n-1)² = 4.'
    ],
    ncertReference: 'NCERT Class 12 Mathematics, Part 1, Determinants, Section 4.5',
    chapterId: 'math-12-02-matrices-and-determinants',
    chapterNumber: 2,
    chapterTitle: 'Matrices & Determinants',
    subject: 'mathematics',
    classLevel: '12',
    sectionTitle: 'Properties of Determinants & Adjoints',
    isHighRepeat: true,
  },
  {
    id: 'ncert-math-12-kings-property-integral',
    itemType: 'ncert-exception',
    title: 'Definite Integrals: King’s Property & Periodic Integral Symmetry',
    content: 'King\'s Property: For any continuous function f(x):\n$$\\int_a^b f(x) dx = \\int_a^b f(a + b - x) dx$$\nSpecial Case (0 to a): $\\int_0^a f(x) dx = \\int_0^a f(a - x) dx$.\nAdding both representations (I + I = 2I) cancels complicated denominators in fractions containing trigonometric, exponential, or polynomial terms, leaving simple integrals of 1 dx.',
    latex: 'I = \\int_a^b \\frac{f(x)}{f(x) + f(a + b - x)} \\, dx = \\frac{b - a}{2}',
    extraTips: [
      'Standard result: ∫[a to b] [f(x) / (f(x) + f(a+b-x))] dx = (b - a) / 2 directly!',
      'Periodic integral: If f(x + T) = f(x), then ∫[0 to nT] f(x) dx = n ∫[0 to T] f(x) dx.'
    ],
    ncertReference: 'NCERT Class 12 Mathematics, Part 2, Integrals, Section 7.11',
    chapterId: 'math-12-07-integrals',
    chapterNumber: 7,
    chapterTitle: 'Integrals (Definite & Indefinite)',
    subject: 'mathematics',
    classLevel: '12',
    sectionTitle: 'Properties of Definite Integrals',
    isHighRepeat: true,
  },
  {
    id: 'ncert-math-12-skew-lines-distance',
    itemType: 'ncert-exception',
    title: 'Shortest Distance Between Skew Lines vs Parallel Lines in 3D',
    content: 'Two non-intersecting and non-parallel lines in 3D space are called Skew Lines.\n1. Skew Lines r = a₁ + λ b₁ and r = a₂ + μ b₂:\n$$d = \\left| \\frac{(a_2 - a_1) \\cdot (b_1 \\times b_2)}{|b_1 \\times b_2|} \\right|$$\nIf lines intersect, coplanarity condition: $(a_2 - a_1) \\cdot (b_1 \\times b_2) = 0$.\n2. Parallel Lines r = a₁ + λ b and r = a₂ + μ b (Common vector b):\n$$d = \\left| \\frac{(a_2 - a_1) \\times b}{|b|} \\right|$$\nCommon Trap: Using the dot product formula on parallel lines gives 0 / 0 error because b₁ × b₂ = 0! Always check if direction ratios are proportional first.',
    latex: 'd_{\\text{skew}} = \\frac{|(\\mathbf{a}_2 - \\mathbf{a}_1) \\cdot (\\mathbf{b}_1 \\times \\mathbf{b}_2)|}{|\\mathbf{b}_1 \\times \\mathbf{b}_2|}, \\quad d_{\\text{parallel}} = \\frac{|(\\mathbf{a}_2 - \\mathbf{a}_1) \\times \\mathbf{b}|}{|\\mathbf{b}|}',
    extraTips: [
      'Always test if vector b₁ is parallel to b₂ before picking the formula!',
      'In Cartesian form, the numerator is the 3×3 determinant of (x2-x1, y2-y1, z2-z1; a1, b1, c1; a2, b2, c2).'
    ],
    ncertReference: 'NCERT Class 12 Mathematics, Part 2, 3D Geometry, Section 11.5',
    chapterId: 'math-12-09-3d-geometry',
    chapterNumber: 9,
    chapterTitle: 'Three Dimensional Geometry',
    subject: 'mathematics',
    classLevel: '12',
    sectionTitle: 'Shortest Distance Between Two Lines',
    isHighRepeat: true,
  }
];
