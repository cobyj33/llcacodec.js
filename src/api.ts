import { readLife106String, isLife106String } from "./formats/life106"
import { readPlainTextString, isPlainTextString, PlainTextStringDecodedContents } from "./formats/plaintext"
import { RLEFileData, isRLEString, readRLEString } from "./formats/rle"
import { Life105FileData, isLife105String, readLife105String } from "./formats/life105"

type SupportedLifeLikeFormats = "life 1.06" | "life 1.05" | "plaintext" | "rle"
    
export function readPatternCoordinatesFromFile<T extends SupportedLifeLikeFormats>(data: string, format: T | ""): [number, number][] {
    switch (format) {
        case "plaintext": return readPlainTextString(data).cellCoordinates
        case "life 1.06": return readLife106String(data)
        case "": {
            const format = getLifeFileFormat(data)
            if (format !== "N/A") {
                return readPatternCoordinatesFromFile(data, format)
            }
            throw new Error("")
        }
    }
    throw new Error("")
}

export function readLifeFile(data: string, format: "plaintext"): PlainTextStringDecodedContents
export function readLifeFile(data: string, format: "life 1.06"): [number, number][]
export function readLifeFile(data: string, format: "rle"): RLEFileData
export function readLifeFile(data: string, format: "life 1.05"): Life105FileData
export function readLifeFile(data: string, format: SupportedLifeLikeFormats | "" = ""): [number, number][] | PlainTextStringDecodedContents | RLEFileData | Life105FileData {
    const foundFormat = format === "" ? getLifeFileFormat(data) : format;
    switch (foundFormat) {
        case "plaintext": return readPlainTextString(data);
        case "life 1.06": return readLife106String(data);
        case "rle": return readRLEString(data);
        case "life 1.05": return readLife105String(data);
        case "N/A": throw new Error(`[libcaread] Could not read life file: matching life file format could not be found`) 
    }
}

export function getLifeFileFormat(data: string): SupportedLifeLikeFormats | "N/A" {
    if (isLife106String(data)) {
        return "life 1.06"
    }
    if (isPlainTextString(data)) {
        return "plaintext"
    }
    if (isRLEString(data)) {
        return "rle"
    }
    if (isLife105String(data)) {
        return "life 1.05"
    }
    return "N/A"
}
