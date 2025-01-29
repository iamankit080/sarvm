const boarding = require("./boarding");

describe("Boarding Sequence Assignment", () => {
    test("assign boarding correctly", () => {
        let input = {
            "PNR001": ["A3", "B4", "C5", "D6"],
            "PNR002": ["A1", "B2", "C3", "D4"]
        };

        let expectedOutput = [
            { pnr: "PNR001", seat: "D6", sequence: 1 },
            { pnr: "PNR002", seat: "D4", sequence: 2 },
            { pnr: "PNR001", seat: "A3", sequence: 3 },
            { pnr: "PNR002", seat: "A1", sequence: 4 },
            { pnr: "PNR001", seat: "C5", sequence: 5 },
            { pnr: "PNR002", seat: "C3", sequence: 6 },
            { pnr: "PNR001", seat: "B4", sequence: 7 },
            { pnr: "PNR002", seat: "B2", sequence: 8 }
        ];

        let result = boarding(input);
        expect(result).toEqual(expectedOutput);
    });

    test("Handles single PNR correctly", () => {
        let input = {
            "PNR001": ["A10", "B12", "C8", "D15"]
        };

        let expectedOutput = [
            { pnr: "PNR001", seat: "D15", sequence: 1 },
            { pnr: "PNR001", seat: "A10", sequence: 2 },
            { pnr: "PNR001", seat: "C8", sequence: 3 },
            { pnr: "PNR001", seat: "B12", sequence: 4 }
        ];

        let result = boarding(input);
        expect(result).toEqual(expectedOutput);
    });

    test("Handles empty input", () => {
        let input = {};
        let expectedOutput = [];

        let result = boarding(input);
        expect(result).toEqual(expectedOutput);
    });

    test("seat numbers are same but different PNRs", () => {
        let input = {
            "PNR001": ["A5", "B5"],
            "PNR002": ["D5", "C5"]
        };

        let expectedOutput = [
            { pnr: "PNR002", seat: "D5", sequence: 1 },
            { pnr: "PNR001", seat: "A5", sequence: 2 },
            { pnr: "PNR002", seat: "C5", sequence: 3 },
            { pnr: "PNR001", seat: "B5", sequence: 4 }
        ];

        let result = boarding(input);
        expect(result).toEqual(expectedOutput);
    });

});
