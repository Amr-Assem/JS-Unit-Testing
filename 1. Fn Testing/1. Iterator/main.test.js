import { range } from './main';

// Testing --> for ... of
test('"for ... of" iterates through "range"', () => {
    const results = [];
    for (const number of range(1, 10, 2)) {
        results.push(number);
    }
    const expected = [1, 3, 5, 7, 9];
    expect(results).toEqual(expected);
});


// Testing --> spread operator
test('spread operator converts "range" to an array', () => {
    const result = [...range(1, 10, 2)];
    const expected = [1, 3, 5, 7, 9];
    expect(result).toEqual(expected);
});

// Testing --> iterator.next()
test('iterator.next manually iterates through "range"', () => {
    const iterator = range(1, 10, 2)[Symbol.iterator]();
    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: 3, done: false });
    expect(iterator.next()).toEqual({ value: 5, done: false });
    expect(iterator.next()).toEqual({ value: 7, done: false });
    expect(iterator.next()).toEqual({ value: 9, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
});