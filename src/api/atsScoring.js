export const calculateATSScore = (jobDescription, resumeContent) => {
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeContent);

  // Calculate matches
  const matches = jobKeywords.filter((keyword) =>
    resumeKeywords.includes(keyword)
  );
  const score = Math.round((matches.length / jobKeywords.length) * 100);

  return {
    score,
    matchedKeywords: matches,
    missingKeywords: jobKeywords.filter(
      (keyword) => !matches.includes(keyword)
    ),
  };
};

// Helper function to extract keywords
const extractKeywords = (text) => {
  const stopWords = [
    "and",
    "or",
    "with",
    "the",
    "to",
    "for",
    "in",
    "on",
    "of",
    "a",
    "an",
  ];
  return text
    .toLowerCase()
    .replace(/[.,]/g, "") // Remove punctuation
    .split(/\s+/)
    .filter((word) => word && !stopWords.includes(word)); // Filter out stop words
};
