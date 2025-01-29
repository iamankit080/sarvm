const readline = require("readline");

function boarding(seatdata) {
    const seatPriority = { A: 1, D: 1, C: 2, B: 2 };

    let allSeats = [];
    for (let pnr in seatdata) {
        seatdata[pnr].forEach(seat => {
            allSeats.push({ pnr, seat });
        });
    }

    allSeats.sort((s1, s2) => {
        let [r1, n1] = [s1.seat[0], parseInt(s1.seat.slice(1))];
        let [r2, n2] = [s2.seat[0], parseInt(s2.seat.slice(1))];

        if (seatPriority[r1] !== seatPriority[r2]) {
            return seatPriority[r1] - seatPriority[r2];
        }
        return n2 - n1;
    });

    let result = allSeats.map((entry, index) => ({
        pnr: entry.pnr,
        seat: entry.seat,
        sequence: index + 1
    }));

    return result;
}

const readline1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readline1.question("Enter PNR numbers: ", function (pnrInput) {
    let pnrs = pnrInput.split(",").map(pnr => pnr.trim());

    let seatdata = {};

    function processNextPNR(index) {
        if (index >= pnrs.length) {
            let result = boarding(seatdata);

            console.log("Boarding sequence:");
            result.forEach(entry => {
                console.log(`PNR: ${entry.pnr}, Seat: ${entry.seat}, Sequence: ${entry.sequence}`);
            });

            readline1.close();
            return;
        }

        let pnr = pnrs[index];
        readline1.question(`Enter selected seats for PNR ${pnr}`, function (seatInput) {
            let selectedSeats = seatInput.split(",").map(s => s.trim());
            if (selectedSeats.length > 4) {
                console.log("Error: Maximum 4 seats allowed per PNR.");
                processNextPNR(index + 1);
                return;
            }

            seatdata[pnr] = selectedSeats;
            processNextPNR(index + 1);
        });
    }
    processNextPNR(0);
});

