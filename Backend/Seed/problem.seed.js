import { Problem } from "../models/problem.model.js";
import ConnectToDatabase from "../Database/database.js"


const problemData = [
  {
    problemName: "Two Sum",
    problemDescription:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Assume each input has exactly one solution, and you may not use the same element twice.",
    problemDifficulty: "easy",
    problemRanking: 1,
    problemTestCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
    ],
  },
  {
    problemName: "Valid Parentheses",
    problemDescription:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed in the correct order.",
    problemDifficulty: "easy",
    problemRanking: 2,
    problemTestCases: [
      { input: "s = '()'", expectedOutput: "true" },
      { input: "s = '()[]{}'", expectedOutput: "true" },
      { input: "s = '(]'", expectedOutput: "false" },
    ],
  },
  {
    problemName: "Longest Substring Without Repeating Characters",
    problemDescription:
      "Given a string s, find the length of the longest substring without repeating characters.",
    problemDifficulty: "medium",
    problemRanking: 3,
    problemTestCases: [
      { input: "s = 'abcabcbb'", expectedOutput: "3" },
      { input: "s = 'bbbbb'", expectedOutput: "1" },
      { input: "s = 'pwwkew'", expectedOutput: "3" },
    ],
  },
  {
    problemName: "Merge Intervals",
    problemDescription:
      "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    problemDifficulty: "medium",
    problemRanking: 4,
    problemTestCases: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        expectedOutput: "[[1,6],[8,10],[15,18]]",
      },
      { input: "intervals = [[1,4],[4,5]]", expectedOutput: "[[1,5]]" },
    ],
  },
  {
    problemName: "Word Ladder",
    problemDescription:
      "Given two words, beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord such that only one letter can be changed at a time and each transformed word must exist in wordList.",
    problemDifficulty: "hard",
    problemRanking: 5,
    problemTestCases: [
      {
        input:
          "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']",
        expectedOutput: "5",
      },
      {
        input:
          "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log']",
        expectedOutput: "0",
      },
    ],
  },
  {
    problemName: "Maximum Flow in a Network",
    problemDescription:
      "You are given a directed graph where each edge has a capacity. Find the maximum flow from a given source to a sink node using the Ford-Fulkerson or Edmonds-Karp algorithm.",
    problemDifficulty: "hard",
    problemRanking: 6,
    problemTestCases: [
      {
        input: "n=4, edges=[[0,1,3],[0,2,2],[1,2,5],[1,3,2],[2,3,3]]",
        expectedOutput: "5",
      },
      {
        input:
          "n=6, edges=[[0,1,16],[0,2,13],[1,2,10],[1,3,12],[2,1,4],[2,4,14],[3,2,9],[3,5,20],[4,3,7],[4,5,4]]",
        expectedOutput: "23",
      },
    ],
  },
];

const connectingToDatabase = async () => {
  await ConnectToDatabase();
} 
connectingToDatabase();


const updateProblemToDatabase = async () => {
    try {
        const response = await Problem.insertMany(problemData);
        console.log("Problems updated successfully:", response);
    } catch (error) {
        console.error("Error updating problem:", error);
    }
}

updateProblemToDatabase ();