import { Chapter } from '../types';

export const MATHS_NOTES: Chapter[] = [
  {
    id: 'math-12-09-3d-geometry',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 9,
    title: 'Three-Dimensional Geometry & Vectors',
    ncertName: 'Three Dimensional Geometry',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (3–4 Qs)',
    avgQuestions: '3 to 4 Questions per Shift',
    expectedWeightage: '12–16 Marks',
    highlightedSubtopics: [
      'Shortest Distance Between Two Skew Lines',
      'Intersection of Two 3D Lines & Coplanarity Condition',
      'Foot of Perpendicular & Image of a Point in a Line',
      'Dot & Cross Product Geometry & Vector Projections',
      'Scalar Triple Product [a b c] & Vector Triple Product a × (b × c)'
    ],
    pyqTrend: {
      avgQuestions5Yr: 3.4,
      difficulty: 'Moderate',
      marksPercentage: '11.5% of Mathematics',
      topRepeatedConcepts: [
        'Shortest distance between two skew lines: d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|',
        'Finding foot of perpendicular from point P(x1, y1, z1) onto line (x-x0)/a = (y-y0)/b = (z-z0)/c',
        'Image of a point with respect to a 3D line',
        'Coplanarity condition for two lines: det([x2-x1, y2-y1, z2-z1; a1, b1, c1; a2, b2, c2]) = 0'
      ],
      recentShiftFocus: 'Direct, algebraic calculation of coordinates of point of intersection or shortest distance parameter.'
    },
    mustSolveChecklist: [
      'Write equation of line passing through point a and parallel to b: r = a + λ b',
      'Evaluate Shortest Distance between Skew Lines using determinant method',
      'Find Foot of Perpendicular from point to a line using dot product orthogonality condition',
      'Find Image of a point: Midpoint of Point and Image IS the Foot of Perpendicular!',
      'Vector Triple Product expansion: a × (b × c) = (a · c) b - (a · b) c ("bac - cab" rule)',
      'Calculate Volume of Parallelepiped formed by coterminous vectors a, b, c as |[a b c]|'
    ],
    notesSections: [
      {
        id: 'skew-lines',
        title: '1. Shortest Distance Between Two Skew Lines',
        standardTheory: [
          'Skew lines are lines in 3D space that are neither parallel nor intersecting; they lie in different planes. Their vector equations are $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$.',
          'The shortest distance segment between two skew lines is perpendicular to both direction vectors $\\vec{b}_1$ and $\\vec{b}_2$ (parallel to $\\vec{b}_1 \\times \\vec{b}_2$), and its length is the projection of $(\\vec{a}_2 - \\vec{a}_1)$ along the unit normal:'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Shortest Distance Formula for Skew Lines',
            content: 'For lines $L_1: \\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $L_2: \\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$:',
            latex: 'd = \\frac{\\big| (\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) \\big|}{\\big| \\vec{b}_1 \\times \\vec{b}_2 \\big|}',
            extraTips: [
              'Cartesian form determinant numerator: $\\begin{vmatrix} x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}$.',
              'If $d = 0$, the two lines INTERSECT and are COPLANAR!',
              'For parallel lines ($\\vec{b}_1 = \\vec{b}_2 = \\vec{b}$): $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Standard Form of Line Equation',
            content: 'NTA frequently tricks students by giving lines as $\\frac{1 - x}{2} = \\frac{2y + 1}{4} = \\frac{z - 3}{1}$. ALWAYS convert coefficients of $x, y, z$ to $+1$ before reading direction ratios! Here $\\frac{x - 1}{-2} = \\frac{y + 1/2}{2} = \\frac{z - 3}{1}$.',
            latex: '\\frac{1 - x}{2} \\implies \\frac{x - 1}{-2} \\quad (\\text{Direction ratio is } -2, \\text{ not } +2!)'
          }
        ]
      },
      {
        id: 'foot-and-image',
        title: '2. Foot of Perpendicular and Image of a Point',
        standardTheory: [
          'Let $P(x_1, y_1, z_1)$ be the given point and $L$ be the line $\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c} = \\lambda$.',
          'Any general point on line $L$ can be represented in terms of parameter $\\lambda$: $F(x_0 + a\\lambda, y_0 + b\\lambda, z_0 + c\\lambda)$.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Orthogonality Step for Foot of Perpendicular',
            content: 'Vector $\\overrightarrow{PF}$ is perpendicular to the line’s direction vector $\\vec{b} = a\\hat{i} + b\\hat{j} + c\\hat{k}$:',
            latex: '\\overrightarrow{PF} \\cdot \\vec{b} = 0 \\implies a(x_F - x_1) + b(y_F - y_1) + c(z_F - z_1) = 0',
            extraTips: [
              'Solve for unique parameter $\\lambda$ to find coordinates of foot $F$.',
              'Image point $Q(x\', y\', z\')$: Since $F$ is the midpoint of segment $PQ$, $\\vec{r}_Q = 2\\vec{r}_F - \\vec{r}_P$.'
            ]
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Archetype',
        conceptTested: 'Shortest Distance between Two Skew Lines',
        question: 'Find the shortest distance between the lines $L_1: \\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $L_2: \\frac{x - 2}{3} = \\frac{y - 4}{4} = \\frac{z - 5}{5}$.',
        solutionSteps: [
          'Point on $L_1$: $\\vec{a}_1 = (1, 2, 3)$. Direction vector $\\vec{b}_1 = (2, 3, 4)$.',
          'Point on $L_2$: $\\vec{a}_2 = (2, 4, 5)$. Direction vector $\\vec{b}_2 = (3, 4, 5)$.',
          'Vector $(\\vec{a}_2 - \\vec{a}_1) = (2 - 1, 4 - 2, 5 - 3) = (1, 2, 2)$.',
          'Cross product $\\vec{b}_1 \\times \\vec{b}_2 = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 3 & 4 \\\\ 3 & 4 & 5 \\end{vmatrix}$:',
          '$\\hat{i}(15 - 16) - \\hat{j}(10 - 12) + \\hat{k}(8 - 9) = -\\hat{i} + 2\\hat{j} - \\hat{k} = (-1, 2, -1)$.',
          'Magnitude $|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{(-1)^2 + 2^2 + (-1)^2} = \\sqrt{1 + 4 + 1} = \\sqrt{6}$.',
          'Dot product $(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = (1)(-1) + (2)(2) + (2)(-1) = -1 + 4 - 2 = 1$.',
          'Shortest distance $d = \\frac{|1|}{\\sqrt{6}} = \\frac{1}{\\sqrt{6}}$.'
        ],
        ntaTrapOrShortcut: 'Shortcut: Directly compute determinant of the $3\\times 3$ matrix $\\begin{vmatrix} 1 & 2 & 2 \\\\ 2 & 3 & 4 \\\\ 3 & 4 & 5 \\end{vmatrix} = 1$.',
        answer: '$\\frac{1}{\\sqrt{6}}$'
      }
    ],
    ncertGems: [
      {
        id: 'gem-3d-1',
        title: 'Direction Cosines Condition',
        statement: 'NCERT Section 11.2: If $l, m, n$ are the direction cosines of a line, then $l^2 + m^2 + n^2 = 1$ (or $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$). Also $\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2$.',
        tableOrPageRef: 'NCERT Class 12 Part 2, Page 464',
        importanceReason: 'Appeared in multiple JEE shifts as an exact direct identity question.'
      }
    ],
    flashcards: [
      {
        id: 'fc-3d1',
        question: 'What is the Vector Triple Product expansion formula?',
        answer: '$\\vec{a} \\times (\\vec{b} \\times \\vec{c}) = (\\vec{a} \\cdot \\vec{c}) \\vec{b} - (\\vec{a} \\cdot \\vec{b}) \\vec{c}$. (Mnemonic: BAC minus CAB).',
        latex: '\\vec{a} \\times (\\vec{b} \\times \\vec{c}) = (\\vec{a} \\cdot \\vec{c})\\vec{b} - (\\vec{a} \\cdot \\vec{b})\\vec{c}',
        tag: 'Vectors'
      },
      {
        id: 'fc-3d2',
        question: 'What is the condition for four points A, B, C, D to be coplanar?',
        answer: 'Vectors $\\overrightarrow{AB}, \\overrightarrow{AC}$, and $\\overrightarrow{AD}$ must be linearly dependent: their scalar triple product $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = 0$.',
        latex: '[\\overrightarrow{AB} \\; \\overrightarrow{AC} \\; \\overrightarrow{AD}] = 0',
        tag: '3D Geometry'
      }
    ]
  },
  {
    id: 'math-12-02-matrices-and-determinants',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 2,
    title: 'Matrices & Determinants',
    ncertName: 'Matrices and Determinants',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    highlightedSubtopics: [
      'Adjoint & Inverse Properties (|adj A| = |A|^(n-1))',
      'System of Linear Equations (Cramer’s Rule & Consistency)',
      'Cayley-Hamilton Theorem & Matrix Polynomials',
      'Symmetric & Skew-Symmetric Decomposition',
      'Orthogonal & Idempotent Matrix Properties'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.8,
      difficulty: 'Moderate',
      marksPercentage: '9.5% of Mathematics',
      topRepeatedConcepts: [
        'Cramer’s Rule: finding parameters (λ, μ) for Unique Solution (Δ ≠ 0), Infinite Solutions (Δ = Δ1 = Δ2 = Δ3 = 0), and No Solution',
        'Adjoint properties of square matrix: |adj(adj A)| = |A|^((n-1)²)',
        'Trace and characteristic equation: A² - Tr(A)·A + |A|·I = 0 (2×2)',
        'Finding A^n using mathematical induction or diagonalization'
      ],
      recentShiftFocus: 'Consistency of system of 3 linear equations involving parameters λ and μ.'
    },
    mustSolveChecklist: [
      'Memorize all Adjoint determinant powers: |adj A| = |A|^(n-1) and |adj(adj A)| = |A|^((n-1)²)',
      'Apply Cramer\'s Rule consistency conditions for homogeneous (AX = 0) and non-homogeneous systems',
      'Use Cayley-Hamilton Theorem to express A⁻¹ or A⁴ in lower powers of A',
      'Identify Orthogonal Matrix: A · A^T = I ⇒ |A| = ±1',
      'Properties of Skew-Symmetric matrices: Determinant of odd-order skew-symmetric matrix is ALWAYS 0',
      'Compute inverse: A⁻¹ = (1 / |A|) adj(A)'
    ],
    notesSections: [
      {
        id: 'adjoint-properties',
        title: '1. Adjoint & Inverse Properties (Most Tested Formulas)',
        standardTheory: [
          'The adjoint of a square matrix $A = [a_{ij}]_{n \\times n}$ is the transpose of its cofactor matrix: $\\text{adj}(A) = [C_{ij}]^T$.',
          'Fundamental property: $A \\cdot (\\text{adj } A) = (\\text{adj } A) \\cdot A = |A| \\cdot I_n$. For a $2 \\times 2$ matrix $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, $\\text{adj}(A) = \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.'
        ],
        highlightBoxes: [
          {
            type: 'most-repeated',
            title: '🔥 NTA Favorite: Adjoint Power Formulas Matrix',
            content: 'Let $A$ be a non-singular square matrix of order $n \\times n$ and $k$ be a scalar:',
            latex: '\\begin{aligned} |\\text{adj}(A)| &= |A|^{n-1} \\\\ |\\text{adj}(\\text{adj}(A))| &= |A|^{(n-1)^2} \\\\ \\text{adj}(\\text{adj}(A)) &= |A|^{n-2} \\cdot A \\\\ |k A| &= k^n |A| \\\\ |A^{-1}| &= \\frac{1}{|A|} \\end{aligned}',
            extraTips: [
              'For a $3\\times 3$ matrix ($n = 3$): $|\\text{adj } A| = |A|^2$ and $|\\text{adj}(\\text{adj } A)| = |A|^4$.',
              '$\\text{adj}(k A) = k^{n-1} \\text{adj}(A)$. Do not confuse with $|kA| = k^n |A|$!'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common Student Trap: Multiplying a Matrix by Scalar vs Determinant',
            content: 'In matrix multiplication, $k A$ multiplies EVERY element by $k$. But in a determinant of order $n$, taking $k$ common from every row gives $|k A| = k^n |A|$!',
            latex: '|k A| = k^n |A| \\quad \\neq \\quad k |A| \\quad (\\text{for } n \\ge 2)'
          }
        ]
      },
      {
        id: 'cramers-rule',
        title: '2. System of Linear Equations & Cramer\'s Rule',
        standardTheory: [
          'A system of equations $AX = B$ ($a_1 x + b_1 y + c_1 z = d_1$, etc.) can be analyzed using coefficient determinant $\\Delta = \\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix}$ and Cramer determinants $\\Delta_x, \\Delta_y, \\Delta_z$.',
          'The system is consistent if at least one solution exists, and inconsistent if no solution exists.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Cramer\'s Rule Conditions Matrix',
            content: 'Conditions for system of 3 linear equations in matrix form $AX = B$:',
            latex: '\\begin{aligned} \\Delta \\neq 0 &\\implies \\text{Unique Solution } \\left(x = \\frac{\\Delta_x}{\\Delta},\\, y = \\frac{\\Delta_y}{\\Delta},\\, z = \\frac{\\Delta_z}{\\Delta}\\right) \\\\ \\Delta = 0 \\text{ and } (\\Delta_x, \\Delta_y, \\Delta_z \\text{ not all } 0) &\\implies \\text{No Solution (Inconsistent)} \\\\ \\Delta = \\Delta_x = \\Delta_y = \\Delta_z = 0 &\\implies \\text{Infinitely Many Solutions or No Solution} \\end{aligned}',
            extraTips: [
              'For Homogeneous System ($AX = O$, where $d_1 = d_2 = d_3 = 0$):',
              'If $|A| \\neq 0$: Trivial solution ONLY ($x = y = z = 0$).',
              'If $|A| = 0$: Non-trivial (infinitely many non-zero) solutions exist!'
            ]
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Archetype',
        conceptTested: 'Adjoint Determinant Property with Order 3 Matrix',
        question: 'Let $A$ be a $3 \\times 3$ matrix such that $|A| = 4$. If $B = 2\\,\\text{adj}(3 A)$, then find the value of $|B|$.',
        solutionSteps: [
          'Matrix $B$ is defined as $B = 2 \\cdot \\text{adj}(3A)$. Matrix order $n = 3$.',
          'First apply determinant to scalar multiple: $|B| = |2 \\cdot \\text{adj}(3A)| = 2^3 \\cdot |\\text{adj}(3A)| = 8 \\cdot |\\text{adj}(3A)|$.',
          'Recall property $|\\text{adj}(M)| = |M|^{n - 1} = |M|^2$ for $n = 3$.',
          'Here $M = 3A$. Then $|M| = |3A| = 3^3 |A| = 27 \\times 4 = 108$.',
          'Therefore $|\\text{adj}(3A)| = |3A|^2 = (108)^2 = 11,664$.',
          'Hence $|B| = 8 \\times 11,664 = 93,312$.'
        ],
        ntaTrapOrShortcut: 'Watch out: Forgetting $2^3$ when pulling scalar $2$ out of the $3\\times 3$ matrix determinant!',
        answer: '93,312'
      }
    ],
    ncertGems: [
      {
        id: 'gem-mat-1',
        title: 'Determinant of Odd Order Skew-Symmetric Matrix',
        statement: 'NCERT Section 4.3: If $A$ is a skew-symmetric matrix ($A^T = -A$) of odd order $n$ (e.g. $3\\times 3$), then $|A| = |A^T| = |-A| = (-1)^n |A| = -|A| \\implies 2|A| = 0 \\implies |A| = 0$. Its determinant is always zero!',
        tableOrPageRef: 'NCERT Class 12 Part 1, Page 115',
        importanceReason: 'Asked directly in JEE Main as a simplification property.'
      }
    ],
    flashcards: [
      {
        id: 'fc-mat1',
        question: 'What is |adj(adj A)| for a matrix of order n?',
        answer: '|adj(adj A)| = |A|^((n - 1)²). For a 3×3 matrix, (3 - 1)² = 4, so |adj(adj A)| = |A|⁴.',
        latex: '|\\text{adj}(\\text{adj } A)| = |A|^{(n-1)^2}',
        tag: 'Adjoint'
      },
      {
        id: 'fc-mat2',
        question: 'What is the condition for a homogeneous system of linear equations to have non-trivial solutions?',
        answer: 'The determinant of the coefficient matrix must be ZERO (|A| = 0).',
        latex: '|A| = 0',
        tag: 'Cramer Rule'
      }
    ]
  },
  {
    id: 'math-11-01-sets-relations-functions',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 1,
    title: 'Sets, Relations & Functions',
    ncertName: 'Sets and Relations & Functions',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Equivalence Relations (Reflexive, Symmetric, Transitive)', 'Domain & Range of Rational, Square Root & Inverse Functions', 'One-One (Injective) & Onto (Surjective) Classifications', 'Greatest Integer Function [x] & Fractional Part {x} Properties'],
    pyqTrend: { avgQuestions5Yr: 1.6, difficulty: 'Moderate', marksPercentage: '5.4%', topRepeatedConcepts: ['Number of equivalence relations on small sets', 'Function invertibility condition (bijective: both one-one and onto)', 'Solving equations with [x] and {x}: x = [x] + {x}'], recentShiftFocus: 'Composite functions f(g(x)) domain and discontinuities.' },
    mustSolveChecklist: ['Verify equivalence relation axioms', 'Horizontal line test for one-one', 'Range equals codomain for onto'],
    notesSections: [{ id: 'functions', title: '1. Relations & Function Classification', standardTheory: ['A relation R is an equivalence relation iff it is reflexive, symmetric, and transitive.'], highlightBoxes: [{ type: 'formula', title: 'Number of Relations Formula', content: 'Total relations on set with n elements = 2^(n²)', latex: 'N = 2^{n^2}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-02-trigonometric-functions',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 2,
    title: 'Trigonometric Functions',
    ncertName: 'Trigonometric Functions',
    repeatPriority: 'foundation',
    repeatTagText: '📘 Base (0–1 Q)',
    avgQuestions: '0 to 1 Question per Shift',
    expectedWeightage: '2–4 Marks',
    highlightedSubtopics: ['Allied Angles & Sum-to-Product Identities', 'Max / Min of a sin x + b cos x (Range: [-√(a²+b²), +√(a²+b²)])', 'Conditional Trigonometric Identities in Triangle ABC'],
    pyqTrend: { avgQuestions5Yr: 0.8, difficulty: 'Moderate', marksPercentage: '2.8%', topRepeatedConcepts: ['Max value of a sin x + b cos x is √(a² + b²)', 'Product to sum formulas used in integration: 2 sin A cos B = sin(A+B) + sin(A-B)'], recentShiftFocus: 'Trigonometric simplification tool used across Calculus.' },
    mustSolveChecklist: ['Range of a sin x + b cos x', 'Half-angle formulas', 'Cos rule in triangle: cos A = (b² + c² - a²) / (2bc)'],
    notesSections: [{ id: 'trig-base', title: '1. Range & Essential Identities', standardTheory: ['Trigonometry is a foundational pillar for Calculus and Geometry.'], highlightBoxes: [{ type: 'formula', title: 'Extremum of Linear Sine and Cosine', content: 'Range of a sin x + b cos x + c is [c - √(a²+b²), c + √(a²+b²)]', latex: '-\\sqrt{a^2 + b^2} \\le a \\sin x + b \\cos x \\le \\sqrt{a^2 + b^2}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-03-complex-quadratics',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 3,
    title: 'Complex Numbers & Quadratics',
    ncertName: 'Complex Numbers and Quadratic Equations',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Cube Roots of Unity (1, ω, ω² & 1 + ω + ω² = 0)', 'Locus in Argand Plane (|z - z1| = |z - z2|, Circles |z - z0| = r)', 'Newton’s Formula for Polynomial Roots (a S_n + b S_{n-1} + c S_{n-2} = 0)', 'Location of Roots Conditions for ax² + bx + c = 0'],
    pyqTrend: { avgQuestions5Yr: 2.1, difficulty: 'Moderate', marksPercentage: '7.2%', topRepeatedConcepts: ['Newton’s sum formula for S_n = α^n + β^n in quadratics', 'Cube roots of unity: 1 + ω + ω² = 0 and ω³ = 1', 'Apollonius circle: |z - z1| / |z - z2| = k (k ≠ 1 represents a circle)'], recentShiftFocus: 'Locus of complex numbers and geometry of Argand plane.' },
    mustSolveChecklist: ['Apply Newton\'s sum shortcut on α^n + β^n', 'De Moivre\'s theorem (cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)', 'Location of roots conditions (discriminant, f(k), -b/2a)'],
    notesSections: [{ id: 'newton-roots', title: '1. Newton’s Sum Formula & Cube Roots of Unity', standardTheory: ['Complex numbers combine real and imaginary parts.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Newton’s Formula Shortcut for α^n + β^n', content: 'If α and β are roots of a x² + b x + c = 0 and S_n = α^n ± β^n, then:', latex: 'a S_n + b S_{n-1} + c S_{n-2} = 0' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-04-permutations-combinations',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 4,
    title: 'Permutations & Combinations',
    ncertName: 'Permutations and Combinations',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Gap Method & Tie Method (Together / Never Together)', 'Dictionary Rank Shortcut for Words', 'Distribution of Identical Objects (Beggar’s Method)', 'Derangements (No Object in its Natural Position)'],
    pyqTrend: { avgQuestions5Yr: 1.7, difficulty: 'Moderate', marksPercentage: '5.8%', topRepeatedConcepts: ['Beggar’s Method: number of non-negative integer solutions of x1 + x2 + ... + xr = n is (n + r - 1)C(r - 1)', 'Dictionary rank of a word with/without repeating letters', 'Derangement formula D_n = n! [1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n / n!]'], recentShiftFocus: 'Number of ways to form numbers under divisibility constraints.' },
    mustSolveChecklist: ['Beggar’s formula: non-negative vs positive integers', 'Gap method: place unrestricted objects first, then fill gaps', 'Derangement formula for n objects'],
    notesSections: [{ id: 'beggar-method', title: '1. Beggar’s Method & Derangements', standardTheory: ['Combinatorics studies counting arrangements and selections.'], highlightBoxes: [{ type: 'formula', title: 'Beggar’s Method Distribution Formula', content: 'Distributing n identical items among r persons', latex: 'N = {}^{n + r - 1}C_{r - 1}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-05-binomial-theorem',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 5,
    title: 'Binomial Theorem',
    ncertName: 'Binomial Theorem',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['General Term (T_{r+1}) & Term Independent of x', 'Remainder Problems using Binomial Expansion', 'Sum of Binomial Coefficients Series', 'Multinomial Theorem Coefficients'],
    pyqTrend: { avgQuestions5Yr: 1.9, difficulty: 'Easy', marksPercentage: '6.4%', topRepeatedConcepts: ['Finding remainder when a^n is divided by m (e.g. 7^103 divided by 25)', 'Term independent of x in (a x^p + b / x^q)^n: r = n p / (p + q)', 'Ratio of consecutive terms T_{r+1} / T_r = ((n - r + 1) / r) × (y / x)'], recentShiftFocus: 'Divisibility and remainder questions (100% guarantee in every shift).' },
    mustSolveChecklist: ['Term independent of x formula: r = n p / (p + q)', 'Remainder problems: express base as multiple of divisor ± 1', 'Sum of coefficients: put x = 1'],
    notesSections: [{ id: 'binomial-term', title: '1. Term Independent of x & Remainder Shortcut', standardTheory: ['(x + y)^n = Σ nCr x^(n-r) y^r.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Term Independent of x Shortcut', content: 'For expansion of (a x^p + b / x^q)^n, the term independent of x corresponds to:', latex: 'r = \\frac{n \\cdot p}{p + q}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-06-sequences-series',
    subject: 'mathematics' as any, // will override to mathematics
    classLevel: '11',
    chapterNumber: 6,
    title: 'Sequences & Series',
    ncertName: 'Sequences and Series',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Arithmetic & Geometric Progressions (AP, GP)', 'AM ≥ GM Inequality for Minimum / Maximum Values', 'Arithmetico-Geometric Progression (AGP) Sum', 'Telescoping Series & Vn Method'],
    pyqTrend: { avgQuestions5Yr: 2.1, difficulty: 'Moderate', marksPercentage: '7.2%', topRepeatedConcepts: ['AM ≥ GM inequality for positive real numbers (especially finding min value of a^x + a^(-x))', 'Sum of infinite GP: S_inf = a / (1 - r) for |r| < 1', 'Vn method of partial fractions for series summation'], recentShiftFocus: 'Sum of n terms of AGP using multiplier method.' },
    mustSolveChecklist: ['AM ≥ GM inequality equality holds when all terms are equal', 'Telescoping sum Vn - Vn-1 cancellation', 'Infinite GP sum formula'],
    notesSections: [{ id: 'am-gm', title: '1. AM ≥ GM & Telescoping Series', standardTheory: ['For positive real numbers, Arithmetic Mean is greater than or equal to Geometric Mean.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 AM ≥ GM Inequality', content: 'For n positive numbers: (x1 + x2 + ... + xn) / n ≥ (x1 · x2 · ... · xn)^(1/n)', latex: '\\frac{x_1 + x_2 + \\dots + x_n}{n} \\ge (x_1 x_2 \\dots x_n)^{1/n}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-07-straight-lines',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 7,
    title: 'Straight Lines',
    ncertName: 'Straight Lines',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1 Q)',
    avgQuestions: '1 Question per Shift',
    expectedWeightage: '4 Marks',
    highlightedSubtopics: ['Image & Foot of Perpendicular in 2D Line', 'Centroid, Orthocentre, Circumcentre, Incentre Relations', 'Family of Lines Passing through Intersection (L1 + λ L2 = 0)', 'Distance between Parallel Lines'],
    pyqTrend: { avgQuestions5Yr: 1.2, difficulty: 'Easy', marksPercentage: '4.2%', topRepeatedConcepts: ['Foot of perpendicular formula: (x - x1)/a = (y - y1)/b = -(a x1 + b y1 + c)/(a² + b²)', 'Euler line: Orthocentre (H), Centroid (G), Circumcentre (O) are collinear, with G dividing HO in ratio 2:1'], recentShiftFocus: 'Image of point (h, k) with multiplier -2.' },
    mustSolveChecklist: ['Foot of perpendicular & image formula in line ax + by + c = 0', 'Centroid coordinates (Σx/3, Σy/3)', 'Distance between parallel lines |c1 - c2| / √(a² + b²)'],
    notesSections: [{ id: 'straight-lines-formulas', title: '1. Foot & Image Formulas in 2D', standardTheory: ['Straight line in standard Cartesian form ax + by + c = 0.'], highlightBoxes: [{ type: 'formula', title: 'Foot & Image Shortcut Equations', content: 'Foot: (x - x1)/a = (y - y1)/b = -(a x1 + b y1 + c)/(a² + b²)\nImage: (x - x1)/a = (y - y1)/b = -2(a x1 + b y1 + c)/(a² + b²)', latex: '\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = -\\frac{a x_1 + b y_1 + c}{a^2 + b^2}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-08-conic-sections',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 8,
    title: 'Conic Sections (Circle, Parabola, Ellipse, Hyperbola)',
    ncertName: 'Conic Sections',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    highlightedSubtopics: ['Circle Chords & Common Tangents', 'Parabola Standard Equations & Focal Chords', 'Ellipse Eccentricity (e), Latus Rectum & Auxiliary Circle', 'Rectangular Hyperbola & Asymptotes'],
    pyqTrend: { avgQuestions5Yr: 2.5, difficulty: 'Moderate', marksPercentage: '8.6%', topRepeatedConcepts: ['Condition of tangency: Parabola y = mx + a/m; Ellipse c² = a² m² + b²; Hyperbola c² = a² m² - b²', 'Eccentricity: Ellipse e² = 1 - b²/a²; Hyperbola e² = 1 + b²/a²', 'Focal chord of parabola y² = 4ax: t1 · t2 = -1'], recentShiftFocus: 'Common tangent to circle x² + y² = r² and parabola y² = 4ax.' },
    mustSolveChecklist: ['Tangency condition for parabola, ellipse, hyperbola', 'Circle orthogonal intersection condition 2 g1 g2 + 2 f1 f2 = c1 + c2', 'Focal distance sum for ellipse (SP + S\'P = 2a) and difference for hyperbola (|SP - S\'P| = 2a)'],
    notesSections: [{ id: 'conics-tangents', title: '1. Master Tangency & Eccentricity Vault', standardTheory: ['A conic is the locus of a point whose distance from focus to directrix has constant ratio e.'], highlightBoxes: [{ type: 'formula', title: 'Tangency Master Equations', content: 'Parabola y²=4ax: y = mx + a/m\nEllipse x²/a² + y²/b²=1: y = mx ± √(a²m² + b²)\nHyperbola x²/a² - y²/b²=1: y = mx ± √(a²m² - b²)', latex: 'c = \\pm \\sqrt{a^2 m^2 \\pm b^2}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-09-limits-derivatives',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 9,
    title: 'Limits & Introduction to Derivatives',
    ncertName: 'Limits and Derivatives',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['0/0 & ∞/∞ Indeterminate Forms & L’Hôpital’s Rule', '1^∞ Indeterminate Form Shortcut (e^lim(f-1)g)', 'Taylor / Maclaurin Expansion Series (sin x, cos x, e^x, ln(1+x))', 'Rationalization & Factorization Techniques'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Easy', marksPercentage: '6.0%', topRepeatedConcepts: ['1^∞ form shortcut: lim [f(x)]^g(x) = exp(lim (f(x) - 1) g(x))', 'Maclaurin expansion for evaluating complex limits without multiple L\'Hôpital steps', 'Standard limits: lim sin(x)/x = 1, lim (e^x - 1)/x = 1, lim ln(1+x)/x = 1'], recentShiftFocus: 'Limits involving greatest integer function [x] from left and right.' },
    mustSolveChecklist: ['1^∞ shortcut: e^(lim (f-1)g)', 'Maclaurin expansions: sin x = x - x³/6; cos x = 1 - x²/2; e^x = 1 + x + x²/2', 'L’Hôpital rule: differentiate numerator and denominator separately'],
    notesSections: [{ id: 'limits-shortcuts', title: '1. 1^∞ Shortcut & Series Expansions', standardTheory: ['Limit of a function describes behavior near a point.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 1^∞ Evaluation Shortcut', content: 'If lim f(x) = 1 and lim g(x) = ∞:', latex: '\\lim [f(x)]^{g(x)} = e^{\\lim_{x \\to a} [f(x) - 1] \\cdot g(x)}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-11-10-statistics',
    subject: 'mathematics',
    classLevel: '11',
    chapterNumber: 10,
    title: 'Statistics',
    ncertName: 'Statistics',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1 Q Sure)',
    avgQuestions: '1 Question per Shift (Guaranteed)',
    expectedWeightage: '4 Marks',
    highlightedSubtopics: ['Variance & Standard Deviation (σ² = Σ x_i² / N - (x̄)²)', 'Effect of Adding / Multiplying a Constant on Mean & Variance', 'Correcting Incorrect Observation in Mean & Variance'],
    pyqTrend: { avgQuestions5Yr: 1.0, difficulty: 'Easy', marksPercentage: '3.5%', topRepeatedConcepts: ['If every observation is multiplied by k: New Mean = k × Mean; New Variance = k² × Variance', 'If every observation is shifted by adding c: New Mean = Mean + c; Variance remains UNCHANGED!', 'Variance formula σ² = (1/N) Σ x_i² - (x̄)²'], recentShiftFocus: 'Finding original mean and variance when one observation was recorded incorrectly.' },
    mustSolveChecklist: ['Variance of first n natural numbers is (n² - 1) / 12', 'Adding constant does not change variance or SD', 'Multiplying by k multiplies variance by k²'],
    notesSections: [{ id: 'variance-formulas', title: '1. Variance Formulas & Constant Transformations', standardTheory: ['Variance measures the dispersion of observations around the mean.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Transformations of Data', content: 'Adding c: Mean → Mean + c, Variance → UNCHANGED\nMultiplying by k: Mean → k × Mean, Variance → k² × Variance, SD → |k| × SD', latex: '\\text{Var}(k X + c) = k^2 \\text{Var}(X)' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-01-itf',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 1,
    title: 'Inverse Trigonometric Functions (ITF)',
    ncertName: 'Inverse Trigonometric Functions',
    repeatPriority: 'medium',
    repeatTagText: '⭐ Med (1 Q)',
    avgQuestions: '1 Question per Shift',
    expectedWeightage: '4 Marks',
    highlightedSubtopics: ['Principal Value Branches (sin⁻¹ [-π/2, π/2], cos⁻¹ [0, π])', 'Graphs of sin(sin⁻¹x) vs sin⁻¹(sin x)', 'Telescoping tan⁻¹ Series Summation', 'Properties: sin⁻¹x + cos⁻¹x = π/2'],
    pyqTrend: { avgQuestions5Yr: 1.2, difficulty: 'Moderate', marksPercentage: '4.0%', topRepeatedConcepts: ['tan⁻¹(x) - tan⁻¹(y) = tan⁻¹((x - y)/(1 + xy)) for telescoping series', 'cos⁻¹(cos x) zigzag graph with period 2π', 'sin⁻¹x + cos⁻¹x = π/2 for x ∈ [-1, 1]'], recentShiftFocus: 'Telescoping series of inverse tangents.' },
    mustSolveChecklist: ['Principal branches of all 6 inverse trig functions', 'Telescoping tan⁻¹((r - (r-1))/(1 + r(r-1))) = tan⁻¹r - tan⁻¹(r-1)', 'Domain and range check before applying f⁻¹(f(x)) = x'],
    notesSections: [{ id: 'itf-branches', title: '1. Principal Values & Telescoping Series', standardTheory: ['Trigonometric functions must be restricted to their principal domains to be invertible.'], highlightBoxes: [{ type: 'formula', title: 'Telescoping Inverse Tangent Identity', content: 'tan⁻¹((a - b)/(1 + ab)) = tan⁻¹a - tan⁻¹b', latex: '\\tan^{-1}\\left(\\frac{a - b}{1 + ab}\\right) = \\tan^{-1}a - \\tan^{-1}b' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-03-continuity-diff',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 3,
    title: 'Continuity & Differentiability',
    ncertName: 'Continuity and Differentiability',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Continuity at a Point (LHL = RHL = f(a))', 'Sharp Corners & Non-differentiable Points of |f(x)|', 'Parametric & Implicit Differentiation', 'Differentiability of Piecewise Functions'],
    pyqTrend: { avgQuestions5Yr: 1.7, difficulty: 'Moderate', marksPercentage: '5.8%', topRepeatedConcepts: ['Non-differentiability at zeros of absolute value functions where derivative doesn\'t vanish', 'Differentiability implies continuity, but continuity does NOT imply differentiability', 'Parametric derivative dy/dx = (dy/dt) / (dx/dt) and d²y/dx²'], recentShiftFocus: 'Number of points of non-differentiability in composite functions.' },
    mustSolveChecklist: ['Check continuity: LHL = RHL = f(c)', 'Sharp corner in graph means non-differentiable', 'Second derivative in parametric form includes dt/dx factor'],
    notesSections: [{ id: 'continuity-tests', title: '1. Differentiability Tests & Sharp Corners', standardTheory: ['A function is continuous if its graph has no breaks or jumps.'], highlightBoxes: [{ type: 'trap', title: '⚠️ Second Derivative in Parametric Trap', content: 'd²y/dx² = [d/dt (dy/dx)] × (dt/dx). Forgetting to multiply by dt/dx is the most frequent silly mistake!', latex: '\\frac{d^2 y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{dt}{dx}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-04-aod',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 4,
    title: 'Application of Derivatives (AOD)',
    ncertName: 'Application of Derivatives',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Monotonicity (Increasing / Decreasing Intervals via f\'(x))', 'Maxima & Minima Optimization (First & Second Derivative Tests)', 'Rolle’s Theorem & Lagrange’s Mean Value Theorem (LMVT)', 'Rate Measure Problems'],
    pyqTrend: { avgQuestions5Yr: 2.2, difficulty: 'Moderate', marksPercentage: '7.4%', topRepeatedConcepts: ['Strictly increasing if f\'(x) > 0 on interval', 'LMVT: f\'(c) = (f(b) - f(a)) / (b - a)', 'Geometric optimization word problems (cylinders inscribed in spheres, max volume)'], recentShiftFocus: 'Intervals of increase and local extrema of algebraic functions.' },
    mustSolveChecklist: ['f\'(x) sign chart for monotonicity', 'Find critical points where f\'(x) = 0 or undefined', 'Apply LMVT condition: f continuous on [a, b], diff on (a, b)'],
    notesSections: [{ id: 'aod-maxima', title: '1. Monotonicity & Mean Value Theorems', standardTheory: ['Derivatives give rates of change and local slope.'], highlightBoxes: [{ type: 'formula', title: 'Lagrange’s Mean Value Theorem (LMVT)', content: 'There exists c ∈ (a, b) such that f\'(c) = (f(b) - f(a)) / (b - a)', latex: 'f\'(c) = \\frac{f(b) - f(a)}{b - a}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-05-integrals',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 5,
    title: 'Indefinite & Definite Integrals',
    ncertName: 'Integrals',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2–3 Qs)',
    avgQuestions: '2 to 3 Questions per Shift',
    expectedWeightage: '8–12 Marks',
    highlightedSubtopics: [
      'Standard Indefinite Integrals & Special Quadratic Forms',
      'Integration by Parts & e^x [f(x) + f\'(x)] dx Archetype',
      'Fundamental Theorem of Calculus & Definite Integral Properties',
      'King’s Property: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx (Symmetry Method)',
      'Queen’s Property (Halving Limits) & Even/Odd Integrals',
      'Leibniz Rule for Differentiating under Integral Sign with Variable Limits',
      'Limit of a Riemann Sum: lim (1/n) Σ f(r/n) = ∫_0^1 f(x) dx',
      'Integrals Involving Modulus |x - c|, Greatest Integer [x] & Fractional Part {x}'
    ],
    pyqTrend: {
      avgQuestions5Yr: 2.8,
      difficulty: 'Tough',
      marksPercentage: '9.5% of Mathematics',
      topRepeatedConcepts: [
        'King’s Property symmetry trick: I = ∫_a^b f(x) dx, adding I + I = 2I to eliminate denominator terms',
        'Leibniz Rule combined with L’Hôpital’s Rule (0/0 form limit evaluation)',
        'Limit of a Riemann sum: converting (r/n) → x and (1/n) → dx over limits [0, k]',
        'Definite integrals of discontinuous functions: breaking intervals at integer roots of [x] or |x|',
        'Integration by parts: ∫ e^(ax) [a f(x) + f\'(x)] dx = e^(ax) f(x) + C'
      ],
      recentShiftFocus: 'Leibniz differentiation of integrals with algebraic and trigonometric limits in composite functions.'
    },
    mustSolveChecklist: [
      'Master the 9 Standard Quadratic Integrals (1/(x²±a²), 1/√(x²±a²), √(a²-x²))',
      'Apply King’s Property and solve 2I = ∫ (f(x) + f(a+b-x)) dx',
      'Differentiate integrals with variable limits using Leibniz Rule',
      'Convert discrete series limits into definite integrals using Riemann Sum method',
      'Split definite integrals at roots of modulus |g(x)| and discontinuities of [h(x)]',
      'Apply Queen’s Property: ∫_0^2a f(x) dx = 2 ∫_0^a f(x) dx when f(2a - x) = f(x)'
    ],
    notesSections: [
      {
        id: 'indefinite-integration-and-special-forms',
        title: '1. Standard Indefinite Forms, By-Parts & Exponential Shortcuts',
        standardTheory: [
          'Integration is the reverse process of differentiation (anti-differentiation). If $\\frac{d}{dx}[F(x)] = f(x)$, then $\\int f(x)\\,dx = F(x) + C$, where $C$ is the arbitrary constant of integration.',
          'Integration by Parts: For two differentiable functions $u(x)$ and $v(x)$: $\\int u\\,v\\,dx = u\\int v\\,dx - \\int \\left[u\' \\cdot \\left(\\int v\\,dx\\right)\\right]dx$. The priority for selecting the first function $u$ is dictated by the ILATE rule (Inverse trigonometric, Logarithmic, Algebraic, Trigonometric, Exponential).',
          'Rational functions $\\frac{P(x)}{Q(x)}$ are integrated via Partial Fractions when $\\deg P(x) < \\deg Q(x)$. If $\\deg P(x) \\ge \\deg Q(x)$, polynomial long division must precede integration.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: 9 Standard Quadratic Integral Formulas',
            content: 'Crucial special standard integrals for JEE Main & Advanced:',
            latex: '\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a} \\ln\\left|\\frac{x - a}{x + a}\\right| + C, \\qquad \\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C, \\qquad \\int \\sqrt{a^2 - x^2} \\, dx = \\frac{x}{2}\\sqrt{a^2 - x^2} + \\frac{a^2}{2}\\arcsin\\left(\\frac{x}{a}\\right) + C',
            extraTips: [
              '$\\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a} \\ln\\left|\\frac{a + x}{a - x}\\right| + C$.',
              '$\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C$.',
              '$\\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\arcsin\\left(\\frac{x}{a}\\right) + C$ (NO $\\frac{1}{a}$ factor outside for $\\arcsin$!).',
              '$\\int \\sqrt{x^2 \\pm a^2}\\,dx = \\frac{x}{2}\\sqrt{x^2 \\pm a^2} \\pm \\frac{a^2}{2}\\ln\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C$.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Missing the Chain Rule Coefficient in Linear Substitutions',
            content: 'When integrating $f(ax + b)$, you MUST divide by the coefficient $a$: $\\int f(ax + b)\\,dx = \\frac{1}{a} F(ax + b) + C$. For example, $\\int \\cos(3x + 5)\\,dx = \\frac{1}{3} \\sin(3x + 5) + C$. Forgetting the factor of $\\frac{1}{a}$ is a persistent trap in multi-step questions.',
            latex: '\\int f(ax + b) \\, dx = \\frac{1}{a} \\, F(ax + b) + C \\quad (a \\ne 0)'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: The Exponential by Parts Shortcut',
            content: 'When an integrand contains $e^{kx}$ multiplied by a function and its derivative:',
            latex: '\\int e^{k x} \\left[ k \\, f(x) + f\'(x) \\right] dx = e^{k x} \\, f(x) + C \\quad \\implies \\quad \\int e^x \\left[ f(x) + f\'(x) \\right] dx = e^x \\, f(x) + C',
            extraTips: [
              'Classic archetype: $\\int e^x \\frac{x - 1}{(x + 1)^3}\\,dx = \\int e^x \\left[\\frac{1}{(x+1)^2} - \\frac{2}{(x+1)^3}\\right]dx = \\frac{e^x}{(x + 1)^2} + C$.',
              'Also applies to logarithmic functions: $\\int [f(\\ln x) + f\'(\\ln x)]\\,dx = x\\,f(\\ln x) + C$ by substituting $t = \\ln x \\implies x = e^t$.'
            ]
          }
        ]
      },
      {
        id: 'kings-and-queens-properties',
        title: '2. Definite Integral Symmetry: King’s Property & Queen’s Rule',
        standardTheory: [
          'The Fundamental Theorem of Calculus states that if $f$ is continuous on $[a, b]$ and $F$ is an anti-derivative of $f$, then $\\int_a^b f(x)\\,dx = F(b) - F(a)$.',
          'King’s Property (Property 4 in NCERT) is the single most powerful weapon in definite integration: $\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx$. It geometrically reflects the integrand about the midpoint $x = \\frac{a + b}{2}$ without changing the signed area under the curve.',
          'Queen’s Property allows halving the upper integration limit from $2a$ to $a$ when the integrand displays reflective symmetry about the midpoint $x = a$.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: King’s & Queen’s Master Symmetry Properties',
            content: '1. King’s Property:\n$$\\int_a^b f(x) \\, dx = \\int_a^b f(a + b - x) \\, dx$$\nSpecial Case ($0$ to $a$): $\\int_0^a f(x) \\, dx = \\int_0^a f(a - x) \\, dx$.\n2. Queen’s Property:\n$$\\int_0^{2a} f(x) \\, dx = \\int_0^a f(x) \\, dx + \\int_0^a f(2a - x) \\, dx = \\begin{cases} 2 \\int_0^a f(x) \\, dx & \\text{if } f(2a - x) = f(x) \\\\ 0 & \\text{if } f(2a - x) = -f(x) \\end{cases}$$',
            latex: '\\int_a^b f(x) \\, dx = \\int_a^b f(a + b - x) \\, dx, \\qquad \\int_0^{2a} f(x) \\, dx = 2 \\int_0^a f(x) \\, dx \\quad [\\text{if } f(2a-x)=f(x)]',
            extraTips: [
              'King’s Rule + Addition Trick: $I + I = 2I = \\int_a^b [f(x) + f(a + b - x)]\\,dx$. If $f(x) + f(a+b-x) = k$, then $I = \\frac{k(b - a)}{2}$.',
              'Classic archetype: $\\int_a^b \\frac{f(x)}{f(x) + f(a + b - x)}\\,dx = \\frac{b - a}{2}$ directly!',
              'Even/Odd property: $\\int_{-a}^a f(x)\\,dx = 2\\int_0^a f(x)\\,dx$ (if $f(-x) = f(x)$) and $0$ (if $f(-x) = -f(x)$).'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Applying Substitution Across Discontinuities',
            content: 'Never apply a substitution (like t = 1/x or t = tan x) across a point where the function is discontinuous or undefined (such as x = 0 or x = π/2) without splitting the integral! The Fundamental Theorem of Calculus STRICTLY requires the integrand to be continuous on the entire closed interval [a, b].',
            latex: '\\int_{-1}^1 \\frac{dx}{x^2} \\ne \\left[ -\\frac{1}{x} \\right]_{-1}^1 = -1 - (1) = -2 \\quad (\\text{FATAL TRAP! Integral diverges to } +\\infty)'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Universal King’s Integral Formula (b - a) / 2',
            content: 'Appears in virtually every JEE Main shift with trigonometric, algebraic, or logarithmic functions:',
            latex: 'I = \\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x} \\, dx = \\frac{\\frac{\\pi}{2} - 0}{2} = \\frac{\\pi}{4} \\quad (\\text{for ANY real power } n)',
            extraTips: [
              'Applies to: ∫_0^(π/2) [1 / (1 + tan^n x)] dx = π/4.',
              'Also applies to: ∫_2^3 [√x / (√x + √(5 - x))] dx = (3 - 2) / 2 = 1/2.'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Standard Log-Sine Integral Result',
            content: 'NCERT Section 7.11 (Example 44): The definite integral of ln(sin x) from 0 to π/2 is a foundational standard result frequently cited in JEE Advanced: ∫_0^(π/2) ln(sin x) dx = ∫_0^(π/2) ln(cos x) dx = - (π/2) ln 2 = (π/2) ln(1/2).'
          }
        ]
      },
      {
        id: 'leibniz-and-riemann-sum',
        title: '3. Leibniz Rule of Differentiation & Limit of a Riemann Sum',
        standardTheory: [
          'Leibniz Integral Rule allows differentiation of a definite integral whose upper and lower limits are differentiable functions of x.',
          'When limits of integration are variable functions u(x) and v(x), differentiation with respect to x requires applying the chain rule to the limits.',
          'Definite integration originated as the limit of a Riemann sum of rectangles as the width of subintervals approaches zero (Δx = 1/n → 0).'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Leibniz Rule & Riemann Sum Conversions',
            content: '1. Leibniz Differentiation Rule:\n$$\\frac{d}{dx} \\left[ \\int_{u(x)}^{v(x)} f(t) \\, dt \\right] = f(v(x)) \\cdot v\'(x) - f(u(x)) \\cdot u\'(x)$$\n2. Limit of a Riemann Sum as a Definite Integral:\n$$\\lim_{n \\to \\infty} \\sum_{r=1}^{k \\cdot n} \\frac{1}{n} \\, f\\left(\\frac{r}{n}\\right) = \\int_0^k f(x) \\, dx$$',
            latex: '\\frac{d}{dx} \\int_{u(x)}^{v(x)} f(t) \\, dt = f(v(x)) \\cdot v\'(x) - f(u(x)) \\cdot u\'(x), \\qquad \\lim_{n \\to \\infty} \\frac{1}{n} \\sum f\\left(\\frac{r}{n}\\right) = \\int f(x) \\, dx',
            extraTips: [
              'Riemann Sum mapping recipe: replace r/n with x, replace 1/n with dx, and replace lim Σ with ∫.',
              'Lower limit of integral = lim_{n→∞} (r_min / n). Upper limit = lim_{n→∞} (r_max / n).',
              'If limits are r = 1 to n: integral is from 0 to 1. If r = 1 to 2n: integral is from 0 to 2.'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Missing the Lower Limit Derivative in Leibniz Rule',
            content: 'Students frequently remember to evaluate the upper limit f(v(x)) · v\'(x) but FORGET the lower limit term - f(u(x)) · u\'(x) when the lower limit is also a function of x (e.g. ∫_x^(x²) sin(t) dt)!',
            latex: '\\frac{d}{dx} \\int_x^{x^2} \\sin(t) \\, dt = \\sin(x^2) \\cdot (2x) - \\sin(x) \\cdot (1)'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Leibniz Combined with L’Hôpital’s Rule (0/0 Limit)',
            content: 'Evaluating indeterminate limits where the numerator is a definite integral with variable limit:',
            latex: '\\lim_{x \\to 0} \\frac{\\int_0^{x^2} \\sin(\\sqrt{t}) \\, dt}{x^3} \\xrightarrow{\\text{L\'H}} \\lim_{x \\to 0} \\frac{\\sin(x) \\cdot 2x - 0}{3x^2} = \\frac{2}{3} \\lim_{x \\to 0} \\frac{\\sin x}{x} = \\frac{2}{3}',
            extraTips: [
              'Step 1: Verify 0/0 indeterminate form by setting x = 0 (∫_0^0 = 0).',
              'Step 2: Differentiate numerator with Leibniz rule and denominator normally.',
              'Step 3: Cancel common factors or apply standard trigonometric limits.'
            ]
          }
        ]
      },
      {
        id: 'discontinuous-and-reduction-formulas',
        title: '4. Modulus, Greatest Integer [x], Fractional Part {x} & Wallis Formula',
        standardTheory: [
          'Integrals involving non-smooth or discontinuous functions such as absolute value |g(x)|, greatest integer function [x], and fractional part {x} = x - [x] must be integrated by partitioning the domain into subintervals where the function is smooth and continuous.',
          'Fractional part function {x} is periodic with fundamental period T = 1. Periodic functions obey: ∫_0^(nT) f(x) dx = n ∫_0^T f(x) dx.',
          'Wallis Formula provides a rapid closed-form evaluation for integrals of the form ∫_0^(π/2) sin^m x cos^n x dx without tedious repeated integration by parts.'
        ],
        highlightBoxes: [
          {
            type: 'formula',
            title: '📐 Master Formula Vault: Wallis Formula & Periodic Integrals',
            content: '1. Wallis Formula for ∫_0^(π/2) sin^m x cos^n x dx (where m, n are non-negative integers):\n$$\\int_0^{\\pi/2} \\sin^m x \\cos^n x \\, dx = \\frac{[(m - 1)(m - 3) \\cdots][(n - 1)(n - 3) \\cdots]}{(m + n)(m + n - 2)(m + n - 4) \\cdots} \\times K$$\nwhere K = π/2 if BOTH m and n are even, and K = 1 otherwise.\n2. Periodic function property with period T:\n$$\\int_0^{n T} f(x) \\, dx = n \\int_0^T f(x) \\, dx, \\qquad \\int_a^{a + n T} f(x) \\, dx = n \\int_0^T f(x) \\, dx$$',
            latex: '\\int_0^{\\pi/2} \\sin^m x \\cos^n x \\, dx = \\frac{(m-1)!! \\, (n-1)!!}{(m+n)!!} \\times K, \\qquad \\int_0^{nT} f(x) \\, dx = n \\int_0^T f(x) \\, dx',
            extraTips: [
              'Example: ∫_0^(π/2) sin⁶ x dx = (5 × 3 × 1) / (6 × 4 × 2) × (π/2) = 15π / 96 = 5π / 32.',
              'For fractional part {x}: ∫_0^(100) {x} dx = 100 ∫_0^1 x dx = 100 × [x²/2]_0^1 = 50.',
              'Notice: if upper limit is not an integer multiple (e.g. 100.4), split as ∫_0^(100) + ∫_(100)^(100.4).'
            ]
          },
          {
            type: 'trap',
            title: '⚠️ Common JEE Trap: Modulus Function Sign in Trigonometric Integrals',
            content: 'When evaluating ∫_0^(2π) √(1 - cos 2x) dx, recall that √(2 sin² x) = √2 |sin x|, NOT √2 sin x! Since sin x is negative in quadrants III and IV [π, 2π], dropping the modulus results in 0, which is completely wrong (area of non-negative curve must be positive!):',
            latex: '\\int_0^{2\\pi} \\sqrt{1 - \\cos 2x} \\, dx = \\sqrt{2} \\int_0^{2\\pi} |\\sin x| \\, dx = \\sqrt{2} \\times 4 \\int_0^{\\pi/2} \\sin x \\, dx = 4\\sqrt{2} \\ne 0'
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Greatest Integer Integrals ∫ [x²] dx',
            content: 'Break the interval at points where the expression inside the floor function takes INTEGER values:',
            latex: '\\int_0^2 [x^2] \\, dx = \\int_0^1 0 \\, dx + \\int_1^{\\sqrt{2}} 1 \\, dx + \\int_{\\sqrt{2}}^{\\sqrt{3}} 2 \\, dx + \\int_{\\sqrt{3}}^2 3 \\, dx',
            extraTips: [
              'Evaluating: 0 + 1(√2 - 1) + 2(√3 - √2) + 3(2 - √3) = √2 - 1 + 2√3 - 2√2 + 6 - 3√3 = 5 - √2 - √3.',
              'Always identify the transition points: x² = 0, 1, 2, 3, 4 ⇒ x = 0, 1, √2, √3, 2.'
            ]
          },
          {
            type: 'most-repeated',
            title: '🔥 Most Repeated PYQ Topic: Definite Integral of Fractional Part Function {x}',
            content: 'Since {x} = x - [x] is periodic with period T = 1:\n$$\\int_0^n \\{x\\} \\, dx = n \\int_0^1 x \\, dx = n \\left[\\frac{x^2}{2}\\right]_0^1 = \\frac{n}{2}$$\nFor non-integer limits (e.g. ∫_0^(n + f) {x} dx where 0 < f < 1): split as ∫_0^n {x} dx + ∫_0^f x dx = n/2 + f²/2.',
            latex: '\\int_0^n \\{x\\} \\, dx = \\frac{n}{2}, \\qquad \\int_0^{n + f} \\{x\\} \\, dx = \\frac{n}{2} + \\frac{f^2}{2} \\quad (0 \\le f < 1)',
            extraTips: [
              'Example: ∫_0^(20.6) {x} dx = 20/2 + (0.6)²/2 = 10 + 0.18 = 10.18 in 3 seconds!',
              'For periodic integrands: ∫_0^(100) e^{x} dx = 100 ∫_0^1 e^x dx = 100(e - 1).'
            ]
          },
          {
            type: 'ncert-line',
            title: '📘 Direct NCERT Statement: Area as Limit of Sum and Primitive Uniqueness',
            content: 'NCERT Section 7.7: The definite integral of a continuous function f(x) over [a, b] represents the algebraic sum of the areas bounded by the curve y = f(x), the x-axis, and the ordinates x = a and x = b (areas above the x-axis are positive, areas below are negative). Any two primitives (anti-derivatives) of the same function differ only by an arbitrary constant C.'
          }
        ]
      }
    ],
    solvedArchetypes: [
      {
        number: 1,
        yearTag: 'JEE Main 2024 / 2023 Repeating Archetype',
        conceptTested: 'King’s Rule with Trigonometric Fractions & Cancellation',
        question: 'Evaluate the definite integral: I = ∫_0^(π/2) (sin³ x) / (sin³ x + cos³ x) dx.',
        solutionSteps: [
          'Given: I = ∫_0^(π/2) [sin³ x / (sin³ x + cos³ x)] dx  ---- (Equation 1)',
          'Apply King’s Property: replace x with (0 + π/2 - x) = (π/2 - x):',
          'Since sin(π/2 - x) = cos x and cos(π/2 - x) = sin x:\nI = ∫_0^(π/2) [cos³ x / (cos³ x + sin³ x)] dx  ---- (Equation 2)',
          'Add Equation 1 and Equation 2:\n2I = ∫_0^(π/2) [(sin³ x + cos³ x) / (sin³ x + cos³ x)] dx = ∫_0^(π/2) 1 dx',
          '2I = [x]_0^(π/2) = π/2 - 0 = π/2.',
          'Therefore: I = π / 4.'
        ],
        ntaTrapOrShortcut: 'Shortcut: For any integral of the form ∫_a^b [f(x) / (f(x) + f(a+b-x))] dx, the answer is ALWAYS (b - a) / 2 = (π/2 - 0) / 2 = π/4.',
        answer: 'I = π / 4'
      },
      {
        number: 2,
        yearTag: 'JEE Main 2024 Shift Archetype',
        conceptTested: 'Limit of a Riemann Sum Conversion to Definite Integral',
        question: 'Evaluate the limit: L = lim_{n→∞} [ 1/(n+1) + 1/(n+2) + ... + 1/(n+2n) ].',
        solutionSteps: [
          'Express the general term of the series: T_r = 1 / (n + r) for r = 1, 2, ..., 2n.',
          'Write in summation notation: L = lim_{n→∞} Σ_{r=1}^{2n} [1 / (n + r)].',
          'Factor out 1/n to form (r/n): L = lim_{n→∞} (1/n) Σ_{r=1}^{2n} [1 / (1 + r/n)].',
          'Convert Riemann sum into a definite integral:\nReplace (1/n) with dx, replace (r/n) with x.\nLower limit = lim_{n→∞} (1 / n) = 0.\nUpper limit = lim_{n→∞} (2n / n) = 2.',
          'Definite integral: L = ∫_0^2 [1 / (1 + x)] dx.',
          'Evaluate: L = [ ln|1 + x| ]_0^2 = ln(1 + 2) - ln(1 + 0) = ln 3 - ln 1 = ln 3.'
        ],
        ntaTrapOrShortcut: 'Notice the upper limit is 2n, so the integral upper limit is 2n / n = 2, not 1!',
        answer: 'L = ln(3)'
      }
    ],
    ncertGems: [
      {
        id: 'gem-integrals-1',
        title: 'Integral of Even and Odd Functions Geometric Rationale',
        statement: 'For any integrable function on [-a, a], ∫_-a^a f(x) dx = 0 if f(-x) = -f(x) (odd function), and 2 ∫_0^a f(x) dx if f(-x) = f(x) (even function). For an odd function, the region between [-a, 0] lies opposite in sign to [0, a], canceling total signed area to strictly zero.',
        tableOrPageRef: 'NCERT Class 12 Mathematics, Part 2, Chapter 7, Property P7',
        importanceReason: 'NTA favorite for simplifying monstrous-looking symmetric integrals (e.g. x³ cos(x) + sin⁵(x)).'
      },
      {
        id: 'gem-integrals-2',
        title: 'Fundamental Theorem of Calculus and Derivative of Integral',
        statement: 'If f is a continuous function on [a, b] and A(x) = ∫_a^x f(t) dt for all x ∈ [a, b], then A\'(x) = f(x). This bridges differential and integral calculus, showing that differentiation and integration are inverse operations.',
        tableOrPageRef: 'NCERT Class 12 Mathematics, Part 2, Section 7.8',
        importanceReason: 'Theoretical foundation tested in assertion-reason and calculus continuity problems.'
      }
    ],
    flashcards: [
      {
        id: 'fc-int-1',
        question: 'What is King’s Property in definite integrals?',
        answer: '∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx. Adding both representations cancels difficult denominators.',
        latex: '\\int_a^b f(x) \\, dx = \\int_a^b f(a + b - x) \\, dx',
        tag: 'King’s Property'
      },
      {
        id: 'fc-int-2',
        question: 'What is the Leibniz Rule for differentiating an integral with variable limits?',
        answer: 'd/dx [∫_u(x)^v(x) f(t) dt] = f(v(x)) · v\'(x) - f(u(x)) · u\'(x).',
        latex: '\\frac{d}{dx} \\int_{u(x)}^{v(x)} f(t) \\, dt = f(v(x)) \\, v\'(x) - f(u(x)) \\, u\'(x)',
        tag: 'Leibniz Rule'
      },
      {
        id: 'fc-int-3',
        question: 'What is the formula for converting a Riemann sum into a definite integral?',
        answer: 'lim (1/n) Σ f(r/n) = ∫_0^k f(x) dx, where r/n becomes x, 1/n becomes dx, and limits come from r_min/n and r_max/n.',
        latex: '\\lim_{n \\to \\infty} \\frac{1}{n} \\sum f\\left(\\frac{r}{n}\\right) = \\int f(x) \\, dx',
        tag: 'Riemann Sum'
      },
      {
        id: 'fc-int-4',
        question: 'What is the exponential by-parts shortcut?',
        answer: '∫ e^x [f(x) + f\'(x)] dx = e^x f(x) + C.',
        latex: '\\int e^x [f(x) + f\'(x)] \\, dx = e^x f(x) + C',
        tag: 'By Parts'
      }
    ]
  },
  {
    id: 'math-12-06-application-of-integrals',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 6,
    title: 'Application of Integrals (Area)',
    ncertName: 'Application of Integrals',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Area Bounded by Parabola & Line (8a² / 3m³ Shortcut)', 'Area Bounded by Two Parabolas (y² = 4ax & x² = 4by)', 'Area Involving Modulus (|x| + |y| ≤ k) & Inequalities'],
    pyqTrend: { avgQuestions5Yr: 1.6, difficulty: 'Easy', marksPercentage: '5.5%', topRepeatedConcepts: ['Area between y² = 4ax and y = mx is 8a² / (3m³)', 'Area between y² = 4ax and x² = 4by is 16ab / 3', 'Area of rhombus |x|/a + |y|/b ≤ 1 is 2ab'], recentShiftFocus: 'Regions bounded by inequalities with circles and parabolas.' },
    mustSolveChecklist: ['Parabola and line area shortcut 8a² / 3m³', 'Two parabolas area shortcut 16ab / 3', 'Modulus diamond area 2ab'],
    notesSections: [{ id: 'area-shortcuts', title: '1. Standard Area Shortcuts Vault', standardTheory: ['Area under curve y = f(x) from a to b is ∫_a^b y dx.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 5-Second Area Shortcuts Matrix', content: '1. Area between y² = 4ax and y = mx: Area = 8a² / (3m³)\n2. Area between y² = 4ax and x² = 4by: Area = 16ab / 3', latex: '\\text{Area} = \\frac{8a^2}{3m^3} \\quad \\text{and} \\quad \\text{Area} = \\frac{16ab}{3}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-07-differential-equations',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 7,
    title: 'Differential Equations',
    ncertName: 'Differential Equations',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Variable Separable Method', 'Homogeneous Differential Equations (y = v x)', 'Linear Differential Equations (Integrating Factor IF = e^∫P dx)', 'Exact Differential Equations (d(xy) = x dy + y dx)'],
    pyqTrend: { avgQuestions5Yr: 1.9, difficulty: 'Moderate', marksPercentage: '6.4%', topRepeatedConcepts: ['First order linear: dy/dx + P(x) y = Q(x) with IF = e^(∫P dx); solution y · IF = ∫ Q · IF dx + C', 'Homogeneous substitution y = vx ⇒ dy/dx = v + x dv/dx', 'Standard exact differentials: d(x/y) = (y dx - x dy) / y²'], recentShiftFocus: 'Linear differential equation with initial condition to find particular solution y(x0).' },
    mustSolveChecklist: ['Integrating factor IF = e^(∫P dx)', 'Solution format: y · IF = ∫ Q · IF dx + C', 'Verify degree and order of differential equation'],
    notesSections: [{ id: 'lde-formulas', title: '1. Linear Differential Equations & Integrating Factor', standardTheory: ['A differential equation relates a function with its derivatives.'], highlightBoxes: [{ type: 'formula', title: 'LDE Solution Master Equation', content: 'dy/dx + P(x) y = Q(x) ⇒ IF = e^∫P dx ⇒ y · IF = ∫ (Q · IF) dx + C', latex: 'y \\cdot e^{\\int P dx} = \\int \\left( Q \\cdot e^{\\int P dx} \\right) dx + C' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-08-vector-algebra',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 8,
    title: 'Vector Algebra',
    ncertName: 'Vector Algebra',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (2 Qs)',
    avgQuestions: '2 Questions per Shift',
    expectedWeightage: '8 Marks',
    highlightedSubtopics: ['Dot & Cross Product Geometry & Angle between Vectors', 'Projection of Vector a on Vector b ((a · b) / |b|)', 'Scalar Triple Product [a b c] & Coplanarity', 'Vector Triple Product a × (b × c) Expansion'],
    pyqTrend: { avgQuestions5Yr: 2.0, difficulty: 'Easy', marksPercentage: '6.8%', topRepeatedConcepts: ['Projection of a on b = (a · b) / |b|', 'Scalar triple product [a b c] = volume of parallelepiped', 'Vector triple product: a × (b × c) = (a · c) b - (a · b) c'], recentShiftFocus: 'Solving vector linear equations involving dot and cross products.' },
    mustSolveChecklist: ['Projection formula', 'Condition for coplanarity [a b c] = 0', 'Vector triple product expansion'],
    notesSections: [{ id: 'vector-products', title: '1. Projections & Triple Products', standardTheory: ['Vectors have magnitude and direction.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Projection of Vector a along b', content: 'Scalar projection = (a · b) / |b|\nVector projection = [(a · b) / |b|²] b', latex: '\\text{proj}_{\\vec{b}}(\\vec{a}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  },
  {
    id: 'math-12-10-probability',
    subject: 'mathematics',
    classLevel: '12',
    chapterNumber: 10,
    title: 'Probability',
    ncertName: 'Probability',
    repeatPriority: 'high',
    repeatTagText: '🔥 High Repeat (1–2 Qs)',
    avgQuestions: '1 to 2 Questions per Shift',
    expectedWeightage: '4–8 Marks',
    highlightedSubtopics: ['Conditional Probability & Multiplication Rule', 'Bayes’ Theorem & Law of Total Probability', 'Binomial Distribution (Mean = n p, Variance = n p q)', 'Random Variable Probability Distribution & Expected Value'],
    pyqTrend: { avgQuestions5Yr: 1.8, difficulty: 'Moderate', marksPercentage: '6.0%', topRepeatedConcepts: ['Bayes’ Theorem reverse probability P(A_i | B) = P(A_i) P(B | A_i) / Σ P(A_j) P(B | A_j)', 'Binomial probability P(X = r) = nCr p^r q^(n - r)', 'Variance of binomial distribution is always LESS than mean (n p q < n p)'], recentShiftFocus: 'Conditional probability and urn/bag problems.' },
    mustSolveChecklist: ['Bayes\' theorem partition formulation', 'Binomial distribution: Mean = np, Variance = np(1-p)', 'Independent events: P(A ∩ B) = P(A) · P(B)'],
    notesSections: [{ id: 'bayes', title: '1. Bayes’ Theorem & Binomial Distribution', standardTheory: ['Probability measures the likelihood that an event occurs.'], highlightBoxes: [{ type: 'most-repeated', title: '🔥 Bayes’ Theorem Formula', content: 'Finding probability of cause given the outcome has occurred:', latex: 'P(A_i | B) = \\frac{P(A_i) \\cdot P(B | A_i)}{\\sum_{j=1}^k P(A_j) \\cdot P(B | A_j)}' }] }],
    solvedArchetypes: [],
    ncertGems: [],
    flashcards: []
  }
];

export const mathsNotes = MATHS_NOTES;
export default MATHS_NOTES;
