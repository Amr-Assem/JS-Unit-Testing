/* -------------------------------------------------------------------------- */
/*                Range Implementation with Generator Function                */
/* -------------------------------------------------------------------------- */

export function* range(start, end, step) {
  for (start; start <= end; start += step) {
    yield start;
  }
}