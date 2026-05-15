import ansiEscapes from 'ansi-escapes';
import { sleep } from 'bun';

let sleep_ms = 30;
const MAX_TICK = 50
const SLEEP_MIN = sleep_ms;
const SLOW_START = MAX_TICK * 0.75;
const SLOW_FACTOR = 15
const FRUITS = ["🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅"];

// function easeOutElastic(x: number): number {
//     if (x == 0) return 0;
//     if (x == 1) return 1;
//     let c_4 = (2 * Math.PI) / 3;
//     return Math.sin((x * 10 - 0.75) * c_4) * Math.exp(-10 * x * Math.LN2) + 1
// }

const easeInCubic = (x: number) => x * x * x;

function randomFruit() {
    return FRUITS[Math.floor(Math.random() * FRUITS.length)];
}

async function main() {
    for (let tick = 0; tick < MAX_TICK; tick++) {
        if (tick >= SLOW_START) {
            const t = (tick - SLOW_START) / (MAX_TICK - SLOW_START);
            sleep_ms = SLEEP_MIN * (1 + easeInCubic(t) * (SLOW_FACTOR - 1));
        }
        let fb = [randomFruit(), randomFruit(), randomFruit(), randomFruit()]
        console.log(``)
        fb.forEach(val => process.stdout.write(val! + " "))
        process.stdout.write("\n")

        if (tick != MAX_TICK - 1) {
            await sleep(sleep_ms);
            process.stdout.write(ansiEscapes.cursorUp(1) + ansiEscapes.eraseLine);
            process.stdout.write(ansiEscapes.cursorUp(1) + ansiEscapes.eraseLine);
        } else {
            let duplicateCount = fb.length - new Set(fb).size;
            if (duplicateCount >= 1) {
                console.log("You won!")
                await sleep(250)
                process.stdout.write(ansiEscapes.clearTerminal)
            }
            else {
                console.log("You lost.")
            }
        }
    }
}

main();