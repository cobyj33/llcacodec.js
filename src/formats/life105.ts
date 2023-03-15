// Life 1.05 File Format Spec: https://conwaylife.com/wiki/Life_1.05

import { isNextChar, isNextChars, readChar, readChars, readIntegers, readLine } from "../core/stringStream";
import { CONWAY_LIFE_RULE_DATA, CONWAY_RULE_STRING_SB, readLifeRuleString } from "./rule";

const LIFE_105_HEADER = "#Life 1.05"
const MAX_DESCRIPTION_LINE_COUNT = 22
const LIFE_105_MAX_LINE_LENGTH = 80

const Life105FileExtensions = [".lif", ".life"] as const;

type LifeRuleData = { birth: number[], survival: number[] }

interface Life105Config {
  descriptions: string | string[],
  rule: string | LifeRuleData | [number[], number[]] | "N#"
}



// export function writeLife105File(pattern: Life105InputPattern[], config: Life105Config): string {
    //     const fileData: number[] = []
    //     pushUTFBytes(fileData, LIFE_105_HEADER + "\n");
    //     return byteArrayAsString(fileData);
    // }

interface HashLine {
    id: string,
    content: string,
    full: string
}


interface Life105CellBlock {
    x: number,
    y: number,
    width: number,
    height: number,
    pattern: (0 | 1)[][]
    cellCoordinates: [number, number][]
}

export interface Life105FileData {
    cellBlocks: Life105CellBlock[]
    cellCoordinates: [number, number][]
    descriptions: string[],
    ruleString: string | null,
    rule: LifeRuleData | null,
    hashLines: HashLine[]
}

const LIFE_105_DEAD_CHAR = "."
const LIFE_105_ALIVE_CHAR = "*"

function readLife105CellBlock(data: string): [Life105CellBlock, string] {
    if (isNextChars(data, "#P")) {
        const cellBlock: Life105CellBlock = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            pattern: [],
            cellCoordinates: []
        }

        const [pointLine, afterPointLine] = readLine(data)
        const [, afterPointDeclaration] = readChars(pointLine, "#P")
        const [[x, y]] = readIntegers(afterPointDeclaration, 2)
        cellBlock.x = x;
        cellBlock.y = y;
        
        let [currentLine, currentRemainingStream] = readLine(afterPointLine);
        while (!isNextChars(currentLine, "#P")) { // exits when the next #P line is hit
            cellBlock.width = Math.max(cellBlock.width, currentLine.length)

            
            const row = new Array<0 | 1>(cellBlock.width).fill(0);
            for (let i = 0; i < cellBlock.width; i++) {
                if (currentLine[i] === LIFE_105_ALIVE_CHAR) {
                    row[i] = 1
                    cellBlock.cellCoordinates.push([x + i, y - cellBlock.height])
                }
            }
            cellBlock.pattern.push(row)

            const [nextLine, nextRemainingStream] = readLine(currentRemainingStream)
            if (isNextChars(nextLine, "#P")) {
                break;
            }

            currentLine = nextLine
            currentRemainingStream = nextRemainingStream
            cellBlock.height++; // increments after setting the coordinates, 
        }

        for (let i = 0; i < cellBlock.height; i++) { // Correct all pattern rows to be the same size
            if (cellBlock.pattern[i].length < cellBlock.width) {
                cellBlock.pattern[i].push(...new Array<0>(cellBlock.width - cellBlock.pattern[i].length).fill(0))
            }
        }

        return [cellBlock, currentRemainingStream]
    } else {
        throw new Error(`Cannot read next Life 105 Cell Block, not positioned correctly. Must have "#P" next in the stream`)
    }
}

export function isLife105String(file: string): boolean {
    return file.trim().startsWith(LIFE_105_HEADER)
}

export function readLife105String(file: string): Life105FileData {
    file = file.replace("\r", "")

    const life105FileData: Life105FileData = {
        cellBlocks: [],
        cellCoordinates: [],
        descriptions: [],
        ruleString: CONWAY_RULE_STRING_SB,
        rule: CONWAY_LIFE_RULE_DATA(),
        hashLines: []
    }

    const lines = file.split("\n")
    const headerLine = lines[0]
    if (!headerLine.trim().startsWith(LIFE_105_HEADER)) {
        throw new Error("")
    }

    let currentLine = 1;

    while (isNextChar(lines[currentLine], "#")) {
        const [, afterHash] = readChar(lines[currentLine], "#")
        const [id, afterID] = readChar(afterHash)
        const trimmedContent = afterID.trim();

        if (id === "D") {
            life105FileData.descriptions.push(trimmedContent)
        } else if (id === "R") {
            life105FileData.ruleString = trimmedContent
            life105FileData.rule = readLifeRuleString(trimmedContent)
        } else if (id === "N") {
            life105FileData.ruleString = CONWAY_RULE_STRING_SB
            life105FileData.rule = CONWAY_LIFE_RULE_DATA()
        } else if (id === "P") {
            break;
        }


        life105FileData.hashLines.push({
            id: id,
            content: trimmedContent,
            full: lines[currentLine].trim()
        })

        currentLine++
    }

    if (isNextChars(lines[currentLine], "#P")) {
        const cellBlocksString = lines.slice(currentLine).join("\n").trim()
        let remainingCellBlocksString = cellBlocksString

        while (remainingCellBlocksString.length > 0) {
            try {
                const cellBlockReadingData = readLife105CellBlock(remainingCellBlocksString)
                console.log("Read cell block: ", cellBlockReadingData[0])
                console.log("Remaining: ", cellBlockReadingData[1])
                life105FileData.cellBlocks.push(cellBlockReadingData[0])
                life105FileData.cellCoordinates.push(...cellBlockReadingData[0].cellCoordinates)
                remainingCellBlocksString = cellBlockReadingData[1]
            } catch (err) {
                break;
            }
        }

    }

    return life105FileData
}

export function hello(): number {
  return 5;
}