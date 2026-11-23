const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({ console });
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../scales-data.js'), 'utf8'), context);
const calculate = (expression) => JSON.parse(vm.runInContext(`JSON.stringify(${expression})`, context));

test('staff octaves preserve every scale interval across sharps, flats, and octave boundaries', () => {
    for (const clef of ['treble', 'bass']) {
        for (const spelling of ['sharpNotes', 'flatNotes']) {
            for (const scale of ['major', 'minor', 'harmonic-minor', 'pentatonic']) {
                for (let root = 0; root < 12; root++) {
                    const indices = calculate(`calculateExtendedScale(${root}, '${scale}', '${clef}')`);
                    const octaves = calculate(`calculateNoteOctaves(calculateExtendedScale(${root}, '${scale}', '${clef}').map(i => ${spelling}[i]), '${clef}')`);
                    const pitches = indices.map((pitch, i) => pitch + 12 * octaves[i]);
                    const intervals = calculate(`scales['${scale}'].intervals`);
                    for (let i = 1; i < pitches.length; i++) {
                        const expectedStep = (intervals[i % intervals.length] - intervals[(i - 1) % intervals.length] + 12) % 12;
                        assert.equal(pitches[i] - pitches[i - 1], expectedStep, `${clef} ${spelling} ${root} ${scale} note ${i}`);
                    }
                }
            }
        }
    }
});

test('bass B major pentatonic crosses into octave 3 on C sharp', () => {
    assert.deepEqual(calculate("calculateNoteOctaves(['B', 'C♯', 'D♯', 'F♯', 'G♯', 'B'], 'bass')"), [2, 3, 3, 3, 3, 3]);
});

test('upper octaves remain ascending so renderers can omit out-of-range notes', () => {
    assert.deepEqual(calculate("calculateNoteOctaves(['B', 'C♯', 'B', 'C♯', 'B', 'C♯'], 'treble')"), [3, 4, 4, 5, 5, 6]);
});

test('CAGED chord shapes stay together and every fret matches its major chord degree', () => {
    const tuning = [4, 9, 2, 7, 11, 4];
    const chordIntervals = { 1: 0, 3: 4, 5: 7 };
    for (const shape of ['C', 'A', 'G', 'E', 'D']) {
        for (let root = 0; root < 12; root += 1) {
            const positions = calculate(`calculateCagedPositions('${shape}', ${root})`);
            const frets = positions.map(([, fret]) => fret);
            assert.ok(Math.max(...frets) - Math.min(...frets) <= 3, `${shape} shape split across the fretboard`);
            assert.ok(Math.max(...frets) <= 14, `${shape} shape exceeds the CAGED diagram`);
            for (const [string, fret, degree] of positions) {
                assert.equal((tuning[string - 1] + fret) % 12, (root + chordIntervals[degree]) % 12,
                    `${shape} shape, root ${root}, string ${string}, fret ${fret}, degree ${degree}`);
            }
        }
    }
});
