import { readLife106String } from "../../src/formats/life106";


const CONWAY_LIFE_LIFE_106_PATTERNS = [
    {
        "fileName": "revolver_106.lif",
        "content": "#Life 1.06\n-7 -4\n6 -4\n-7 -3\n-6 -3\n-5 -3\n0 -3\n4 -3\n5 -3\n6 -3\n-4 -2\n-2 -2\n0 -2\n3 -2\n-5 -1\n2 -1\n4 -1\n-5 0\n-3 0\n4 0\n-4 1\n-1 1\n1 1\n3 1\n-7 2\n-6 2\n-5 2\n-1 2\n4 2\n5 2\n6 2\n-7 3\n6 3\n"
    },
    {
        "fileName": "enretard_106.lif",
        "content": "#Life 1.06\n0 -5\n-1 -4\n1 -4\n-5 -3\n-4 -3\n-2 -3\n0 -3\n2 -3\n4 -3\n5 -3\n-4 -2\n-2 -2\n2 -2\n4 -2\n-5 -1\n-2 -1\n0 -1\n2 -1\n5 -1\n-4 0\n-3 0\n3 0\n4 0\n-2 1\n-1 1\n1 1\n2 1\n-2 2\n0 2\n2 2\n-1 3\n1 3\n-3 4\n-1 4\n1 4\n3 4\n-3 5\n-2 5\n2 5\n3 5\n"
    },
    {
        "fileName": "gosperglidergun_106.lif",
        "content": "#Life 1.06\n6 -4\n4 -3\n6 -3\n-6 -2\n-5 -2\n2 -2\n3 -2\n16 -2\n17 -2\n-7 -1\n-3 -1\n2 -1\n3 -1\n16 -1\n17 -1\n-18 0\n-17 0\n-8 0\n-2 0\n2 0\n3 0\n-18 1\n-17 1\n-8 1\n-4 1\n-2 1\n-1 1\n4 1\n6 1\n-8 2\n-2 2\n6 2\n-7 3\n-3 3\n-6 4\n-5 4\n"
    },
    {
        "fileName": "piorbital_106.lif",
        "content": "#Life 1.06\n-15 -29\n-14 -29\n-3 -29\n-2 -29\n-16 -28\n-13 -28\n-4 -28\n-1 -28\n-16 -27\n-15 -27\n-14 -27\n-11 -27\n-10 -27\n-9 -27\n-8 -27\n-7 -27\n-6 -27\n-3 -27\n-2 -27\n-1 -27\n-13 -26\n-12 -26\n-5 -26\n-4 -26\n-14 -25\n-3 -25\n-14 -24\n-13 -24\n-11 -24\n-6 -24\n-4 -24\n-3 -24\n-9 -23\n-8 -23\n-17 -22\n9 -22\n10 -22\n21 -22\n-22 -21\n-21 -21\n-20 -21\n-19 -21\n-15 -21\n-10 -21\n-3 -21\n9 -21\n10 -21\n21 -21\n-19 -20\n-15 -20\n-12 -20\n-11 -20\n-10 -20\n-9 -20\n-8 -20\n-5 -20\n-1 -20\n0 -20\n1 -20\n2 -20\n21 -20\n-15 -19\n-12 -19\n-11 -19\n-10 -19\n-9 -19\n-8 -19\n-5 -19\n-1 -19\n20 -19\n21 -19\n-18 -18\n-11 -18\n-10 -18\n-9 -18\n-5 -18\n18 -18\n-17 -17\n-16 -17\n-10 -17\n-2 -17\n17 -17\n22 -17\n-4 -16\n-3 -16\n17 -16\n27 -16\n28 -16\n19 -15\n20 -15\n21 -15\n27 -15\n29 -15\n24 -14\n25 -14\n27 -14\n29 -14\n24 -13\n26 -13\n28 -13\n26 -12\n6 -11\n7 -11\n19 -11\n25 -11\n28 -11\n-22 -10\n-21 -10\n6 -10\n8 -10\n19 -10\n20 -10\n25 -10\n-22 -9\n-21 -9\n8 -9\n9 -9\n19 -9\n25 -9\n29 -9\n6 -8\n8 -8\n25 -8\n29 -8\n-9 -7\n-8 -7\n6 -7\n7 -7\n25 -7\n-6 -6\n-4 -6\n25 -6\n28 -6\n-4 -5\n18 -5\n19 -5\n20 -5\n26 -5\n-6 -4\n16 -4\n24 -4\n26 -4\n28 -4\n-10 -3\n16 -3\n21 -3\n24 -3\n25 -3\n27 -3\n29 -3\n-20 -2\n-9 -2\n-8 -2\n17 -2\n27 -2\n29 -2\n-20 -1\n19 -1\n20 -1\n27 -1\n28 -1\n-20 0\n20 0\n-28 1\n-27 1\n-20 1\n-19 1\n20 1\n-29 2\n-27 2\n-17 2\n20 2\n-29 3\n-27 3\n-25 3\n-24 3\n-21 3\n-16 3\n-28 4\n-26 4\n-24 4\n-16 4\n-26 5\n-20 5\n-19 5\n-18 5\n-28 6\n-25 6\n-25 7\n-29 8\n-25 8\n-29 9\n-25 9\n-19 9\n21 9\n22 9\n-25 10\n-20 10\n-19 10\n21 10\n22 10\n-28 11\n-25 11\n-19 11\n-26 12\n-28 13\n-26 13\n-24 13\n-29 14\n-27 14\n-25 14\n-24 14\n-29 15\n-27 15\n-21 15\n-20 15\n-19 15\n-28 16\n-27 16\n-17 16\n3 16\n4 16\n-22 17\n-17 17\n2 17\n10 17\n16 17\n17 17\n-18 18\n5 18\n9 18\n10 18\n11 18\n18 18\n-21 19\n-20 19\n1 19\n5 19\n8 19\n9 19\n10 19\n11 19\n12 19\n15 19\n-21 20\n-2 20\n-1 20\n0 20\n1 20\n5 20\n8 20\n9 20\n10 20\n11 20\n12 20\n15 20\n19 20\n-21 21\n-10 21\n-9 21\n3 21\n10 21\n15 21\n19 21\n20 21\n21 21\n22 21\n-21 22\n-10 22\n-9 22\n17 22\n8 23\n9 23\n3 24\n4 24\n6 24\n11 24\n13 24\n14 24\n3 25\n14 25\n4 26\n5 26\n12 26\n13 26\n1 27\n2 27\n3 27\n6 27\n7 27\n8 27\n9 27\n10 27\n11 27\n14 27\n15 27\n16 27\n1 28\n4 28\n13 28\n16 28\n2 29\n3 29\n14 29\n15 29\n"
    },
    {
        "fileName": "gggwfishhook.lif",
        "content": "#Life 1.06\n6 -4\n4 -3\n6 -3\n-6 -2\n-5 -2\n2 -2\n3 -2\n16 -2\n17 -2\n-7 -1\n-3 -1\n2 -1\n3 -1\n16 -1\n17 -1\n-18 0\n-17 0\n-8 0\n-2 0\n2 0\n3 0\n-18 1\n-17 1\n-8 1\n-4 1\n-2 1\n-1 1\n4 1\n6 1\n-8 2\n-2 2\n6 2\n-7 3\n-3 3\n-6 4\n-5 4\n16 -8\n17 -8\n16 -7\n18 -7\n18 -6\n18 -5\n19 -5\n"
    },
    {
        "fileName": "oddtesttubebaby_106.lif",
        "content": "#Life 1.06\n3 -3\n-4 -2\n-3 -2\n2 -2\n4 -2\n-4 -1\n-2 -1\n1 -1\n3 -1\n-2 0\n1 0\n-2 1\n1 1\n-1 2\n0 2\n"
    },
    {
        "fileName": "blocker_106.lif",
        "content": "#Life 1.06\n1 -2\n3 -2\n0 -1\n-5 0\n-4 0\n-1 0\n4 0\n-5 1\n-4 1\n-2 1\n1 1\n3 1\n4 1\n-1 2\n0 2\n"
    },
    {
        "fileName": "blinkership1_106.lif",
        "content": "#Life 1.06\n-3 -7\n-2 -7\n-1 -7\n0 -7\n-3 -6\n1 -6\n-3 -5\n-12 -4\n-11 -4\n-2 -4\n1 -4\n-13 -3\n-12 -3\n-10 -3\n-9 -3\n-12 -2\n-11 -2\n-10 -2\n-9 -2\n-5 -2\n-11 -1\n-10 -1\n-6 -1\n-4 -1\n-3 -1\n6 -1\n11 -1\n12 -1\n13 -1\n-7 0\n-3 0\n6 0\n11 0\n13 0\n-11 1\n-10 1\n-6 1\n-4 1\n-3 1\n6 1\n11 1\n12 1\n13 1\n-12 2\n-11 2\n-10 2\n-9 2\n-5 2\n-13 3\n-12 3\n-10 3\n-9 3\n-12 4\n-11 4\n-2 4\n1 4\n-3 5\n-3 6\n1 6\n-3 7\n-2 7\n-1 7\n0 7\n"
    }
]


describe.each(CONWAY_LIFE_LIFE_106_PATTERNS)("Brute force Life 1.06", ({ fileName, content }) => {
    test(`Parsing ${fileName} Does Not Throw`, () => {
        expect(() => readLife106String(content)).not.toThrow();
    })
})