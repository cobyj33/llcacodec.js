import { LifeRuleData } from "./ruleData";


export const MAX_LIFE_INTEGER = 65535; // 2^16 - 1

function getLifeIntegerError(lifeInteger: number): string | "" {
    if (!Number.isInteger(lifeInteger)) {
        return "Life integer is not an integer value"
    }
    if (lifeInteger > MAX_LIFE_INTEGER) {
        return `Life integer is an integer greater than maximum value of 2^16 - 1 (${MAX_LIFE_INTEGER})`
    }
    if (lifeInteger < 0) {
        return "Life integer is an integer less than 0"
    }

    return ""
}

export function isValidLifeInteger(lifeInteger: number) {
    return getLifeIntegerError(lifeInteger) === ""
}

export function readLifeRuleInteger(lifeInteger: number): LifeRuleData {
    if (isValidLifeInteger(lifeInteger)) {
        const birthRules = lifeInteger & 0xff
        const survivalRules = (lifeInteger & 0xff00) >> 9
        const lifeRuleData: LifeRuleData = { birth: [], survival: [] }

        for (let i = 0; i <= 8; i++) {
            if (birthRules & 1 << i) {
                lifeRuleData.birth.push(i)
            }
            if (survivalRules & 1 << i) {
                lifeRuleData.survival.push(i);
            }
        }

        return lifeRuleData
    }
    throw new Error(`Could not read life rule integer: ${getLifeIntegerError(lifeInteger)}`)
}

// export function makeLifeRuleInteger(lifeRuleData: LifeRuleData): number {
    
// }