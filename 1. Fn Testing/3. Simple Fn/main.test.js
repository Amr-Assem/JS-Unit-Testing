import { sum, subtract, sumAsync } from './main';

test('sumAsync adds two numbers async', async () => {
    const result = await sumAsync(1, 2);
    const expected = 3;
    expect(result).toBe(expected);

})

test('sum adds two numbers', () => {
    const result = sum(1, 2);
    const expected = 3;
    expect(result).toBe(expected);
});

test('subtract subtracts two numbers', () => {
    const result = subtract(4, 2)
    const expected = 2;
    expect(result).toBe(expected);
});
