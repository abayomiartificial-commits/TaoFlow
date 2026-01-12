export interface LevelInfo {
    level: number;
    currentXP: number;
    nextLevelXP: number;
    progress: number;
    title: string;
}

const LEVEL_THRESHOLDS = [
    { level: 1, xp: 0, title: "Aprendiz del Tao" },
    { level: 2, xp: 500, title: "Estudiante Dedicado" },
    { level: 3, xp: 1500, title: "Practicante Constante" },
    { level: 4, xp: 3000, title: "Discípulo Avanzado" },
    { level: 5, xp: 5000, title: "Maestro en Formación" },
    { level: 6, xp: 8000, title: "Maestro del Equilibrio" },
    { level: 7, xp: 12000, title: "Gran Maestro" },
];

/**
 * Calculate user level based on XP
 */
export const calculateLevel = (xp: number): LevelInfo => {
    let currentLevel = LEVEL_THRESHOLDS[0];
    let nextLevel = LEVEL_THRESHOLDS[1];

    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (xp >= LEVEL_THRESHOLDS[i].xp) {
            currentLevel = LEVEL_THRESHOLDS[i];
            nextLevel = LEVEL_THRESHOLDS[i + 1] || LEVEL_THRESHOLDS[i];
        } else {
            break;
        }
    }

    const xpInCurrentLevel = xp - currentLevel.xp;
    const xpNeededForNext = nextLevel.xp - currentLevel.xp;
    const progress = xpNeededForNext > 0 ? (xpInCurrentLevel / xpNeededForNext) * 100 : 100;

    return {
        level: currentLevel.level,
        currentXP: xp,
        nextLevelXP: nextLevel.xp,
        progress: Math.min(progress, 100),
        title: currentLevel.title
    };
};
