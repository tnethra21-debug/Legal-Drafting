// frontend/src/utils/shuffle.js

/**
 * Fisher-Yates shuffle algorithm to randomly shuffle an array.
 * Returns a new shuffled array without mutating the original.
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffles the options for each question in a questions array.
 * Ensures the options within each question have a randomized display order,
 * while retaining each option's unique id (e.g. 'A', 'B', 'C', 'D') for correct answer validation.
 */
export function shuffleQuestionsOptions(questions) {
  if (!Array.isArray(questions)) return [];
  return questions.map(q => {
    if (!q.options || !Array.isArray(q.options)) return q;
    return {
      ...q,
      options: shuffleArray(q.options)
    };
  });
}
