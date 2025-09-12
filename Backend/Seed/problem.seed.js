import { Problem } from "../models/problem.model.js";
import ConnectToDatabase from "../Database/database.js"


const problemData  = [
  {
    problemDescription: "Given an array of integers, return the sum of all elements in the array. The array can contain positive, negative, or zero values. Input format: First line contains n (number of elements), second line contains n space-separated integers.",
    problemName: "Array Sum",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "15"
      },
      {
        input: "4\n-1 -2 3 4",
        expectedOutput: "4"
      },
      {
        input: "3\n0 0 0",
        expectedOutput: "0"
      }
    ],
    problemRanking: 100
  },
  
  {
    problemDescription: "Given a string, return true if it is a palindrome (reads the same forwards and backwards), false otherwise. Consider only alphanumeric characters and ignore case. Input format: A single line containing the string to check.",
    problemName: "Valid Palindrome",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "racecar",
        expectedOutput: "true"
      },
      {
        input: "A man, a plan, a canal: Panama",
        expectedOutput: "true"
      },
      {
        input: "hello",
        expectedOutput: "false"
      }
    ],
    problemRanking: 150
  },

  {
    problemDescription: "Given an array of integers and a target sum, return the indices of two numbers that add up to the target. You may assume that each input has exactly one solution. Input format: First line contains n (array size), second line contains n space-separated integers, third line contains target value. Output format: Two space-separated indices.",
    problemName: "Two Sum",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "4\n2 7 11 15\n9",
        expectedOutput: "0 1"
      },
      {
        input: "3\n3 2 4\n6",
        expectedOutput: "1 2"
      },
      {
        input: "2\n3 3\n6",
        expectedOutput: "0 1"
      }
    ],
    problemRanking: 200
  },

  {
    problemDescription: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not found, return the index where it would be inserted to maintain sorted order. Input format: First line contains n (array size), second line contains n space-separated integers, third line contains target value.",
    problemName: "Search Insert Position",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "4\n1 3 5 6\n5",
        expectedOutput: "2"
      },
      {
        input: "4\n1 3 5 6\n2",
        expectedOutput: "1"
      },
      {
        input: "4\n1 3 5 6\n7",
        expectedOutput: "4"
      }
    ],
    problemRanking: 250
  },

  {
    problemDescription: "Given a binary tree in array representation (level order with null for missing nodes), return the maximum depth. Input format: First line contains n (number of nodes), second line contains n space-separated values (use -1 for null).",
    problemName: "Maximum Depth of Binary Tree",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "7\n3 9 20 -1 -1 15 7",
        expectedOutput: "3"
      },
      {
        input: "2\n1 -1 2",
        expectedOutput: "2"
      },
      {
        input: "0\n",
        expectedOutput: "0"
      }
    ],
    problemRanking: 300
  },

  {
    problemDescription: "Given an array of integers where every element appears twice except for one, find that single element. Input format: First line contains n (array size), second line contains n space-separated integers.",
    problemName: "Single Number",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "3\n2 2 1",
        expectedOutput: "1"
      },
      {
        input: "5\n4 1 2 1 2",
        expectedOutput: "4"
      },
      {
        input: "1\n1",
        expectedOutput: "1"
      }
    ],
    problemRanking: 350
  },

  {
    problemDescription: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string has valid parentheses. Input format: A single line containing the string.",
    problemName: "Valid Parentheses",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "()",
        expectedOutput: "true"
      },
      {
        input: "()[]{}",
        expectedOutput: "true"
      },
      {
        input: "(]",
        expectedOutput: "false"
      }
    ],
    problemRanking: 400
  },

  {
    problemDescription: "You are climbing stairs with n steps. Each time you can climb 1 or 2 steps. Return the number of distinct ways to climb to the top. Input format: A single integer n.",
    problemName: "Climbing Stairs",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "2",
        expectedOutput: "2"
      },
      {
        input: "3",
        expectedOutput: "3"
      },
      {
        input: "4",
        expectedOutput: "5"
      }
    ],
    problemRanking: 450
  },

  {
    problemDescription: "Given a sorted array, remove duplicates in-place and return the number of unique elements. Input format: First line contains n (array size), second line contains n space-separated integers.",
    problemName: "Remove Duplicates from Sorted Array",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "3\n1 1 2",
        expectedOutput: "2"
      },
      {
        input: "10\n0 0 1 1 1 2 2 3 3 4",
        expectedOutput: "5"
      },
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "5"
      }
    ],
    problemRanking: 500
  },

  {
    problemDescription: "Given a linked list represented as an array with an additional position indicating cycle start (-1 means no cycle), determine if it has a cycle. Input format: First line contains n (list size), second line contains n space-separated values, third line contains cycle position (-1 for no cycle).",
    problemName: "Linked List Cycle",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "4\n3 2 0 -4\n1",
        expectedOutput: "true"
      },
      {
        input: "2\n1 2\n0",
        expectedOutput: "true"
      },
      {
        input: "1\n1\n-1",
        expectedOutput: "false"
      }
    ],
    problemRanking: 550
  },

  // Medium Problems (11-20)
  {
    problemDescription: "Given an integer array, find the contiguous subarray with the largest sum and return its sum (Kadane's algorithm). Input format: First line contains n (array size), second line contains n space-separated integers.",
    problemName: "Maximum Subarray",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        expectedOutput: "6"
      },
      {
        input: "1\n1",
        expectedOutput: "1"
      },
      {
        input: "5\n5 4 -1 7 8",
        expectedOutput: "23"
      }
    ],
    problemRanking: 600
  },

  {
    problemDescription: "Given a linked list represented as an array, reverse it and return the reversed array. Input format: First line contains n (list size), second line contains n space-separated integers.",
    problemName: "Reverse Array",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "5 4 3 2 1"
      },
      {
        input: "2\n1 2",
        expectedOutput: "2 1"
      },
      {
        input: "1\n42",
        expectedOutput: "42"
      }
    ],
    problemRanking: 650
  },

  {
    problemDescription: "Given an array of integers and an integer k, return the k most frequent elements. Input format: First line contains n (array size), second line contains n space-separated integers, third line contains k. Output format: k space-separated integers in any order.",
    problemName: "Top K Frequent Elements",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "6\n1 1 1 2 2 3\n2",
        expectedOutput: "1 2"
      },
      {
        input: "1\n1\n1",
        expectedOutput: "1"
      },
      {
        input: "7\n1 2 3 3 3 4 4\n2",
        expectedOutput: "3 4"
      }
    ],
    problemRanking: 700
  },

  {
    problemDescription: "Given a binary tree in level order format, return the level order traversal as space-separated values for each level, with levels separated by semicolons. Input format: First line contains n (number of nodes), second line contains n space-separated values (use -1 for null).",
    problemName: "Binary Tree Level Order Traversal",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "7\n3 9 20 -1 -1 15 7",
        expectedOutput: "3;9 20;15 7"
      },
      {
        input: "1\n1",
        expectedOutput: "1"
      },
      {
        input: "0\n",
        expectedOutput: ""
      }
    ],
    problemRanking: 750
  },

  {
    problemDescription: "Given an array of strings, group anagrams together. Return groups separated by semicolons, words in each group separated by spaces. Input format: First line contains n (number of strings), next n lines contain one string each.",
    problemName: "Group Anagrams",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "6\neat\ntea\ntan\nate\nnat\nbat",
        expectedOutput: "bat;nat tan;ate eat tea"
      },
      {
        input: "1\n",
        expectedOutput: ""
      },
      {
        input: "1\na",
        expectedOutput: "a"
      }
    ],
    problemRanking: 800
  },

  {
    problemDescription: "Given number of courses and prerequisites array, determine if you can finish all courses (detect cycle in directed graph). Input format: First line contains numCourses, second line contains numPrereqs, next numPrereqs lines contain two integers each (ai, bi) meaning course ai requires course bi.",
    problemName: "Course Schedule",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "2\n1\n1 0",
        expectedOutput: "true"
      },
      {
        input: "2\n2\n1 0\n0 1",
        expectedOutput: "false"
      },
      {
        input: "3\n2\n1 0\n2 1",
        expectedOutput: "true"
      }
    ],
    problemRanking: 850
  },

  {
    problemDescription: "Given a string, find the length of the longest substring without repeating characters. Input format: A single line containing the string.",
    problemName: "Longest Substring Without Repeating Characters",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "abcabcbb",
        expectedOutput: "3"
      },
      {
        input: "bbbbb",
        expectedOutput: "1"
      },
      {
        input: "pwwkew",
        expectedOutput: "3"
      }
    ],
    problemRanking: 900
  },

  {
    problemDescription: "Implement a simple word dictionary that supports adding words and searching with '.' as wildcard. Input format: First line contains n (number of operations), next n lines contain either 'ADD word' or 'SEARCH pattern'.",
    problemName: "Add and Search Word - Data Structure Design",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "4\nADD bad\nADD dad\nADD mad\nSEARCH pad",
        expectedOutput: "false"
      },
      {
        input: "4\nADD bad\nADD dad\nADD mad\nSEARCH bad",
        expectedOutput: "true"
      },
      {
        input: "4\nADD bad\nADD dad\nADD mad\nSEARCH .ad",
        expectedOutput: "true"
      }
    ],
    problemRanking: 950
  },

  {
    problemDescription: "Given an integer array, return an array where each element is the product of all other elements (without using division). Input format: First line contains n (array size), second line contains n space-separated integers. Output format: n space-separated integers.",
    problemName: "Product of Array Except Self",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "4\n1 2 3 4",
        expectedOutput: "24 12 8 6"
      },
      {
        input: "5\n-1 1 0 -3 3",
        expectedOutput: "0 0 9 0 0"
      },
      {
        input: "4\n2 3 4 5",
        expectedOutput: "60 40 30 24"
      }
    ],
    problemRanking: 1000
  },

  {
    problemDescription: "Given an m x n binary matrix, find the shortest path from top-left (0,0) to bottom-right (m-1,n-1). You can move in 8 directions. Return -1 if no path exists. Input format: First line contains m and n, next m lines contain n space-separated 0s and 1s (0 means open, 1 means blocked).",
    problemName: "Shortest Path in Binary Matrix",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "3 3\n0 0 0\n1 1 0\n1 1 0",
        expectedOutput: "4"
      },
      {
        input: "2 2\n0 1\n1 0",
        expectedOutput: "-1"
      },
      {
        input: "3 3\n1 0 0\n1 1 0\n1 1 0",
        expectedOutput: "-1"
      }
    ],
    problemRanking: 1050
  },

  // Hard Problems (21-30)
  {
    problemDescription: "Given two sorted arrays, find the median of the combined array in O(log(m+n)) time. Input format: First line contains m and n (sizes), second line contains m integers, third line contains n integers.",
    problemName: "Median of Two Sorted Arrays",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "2 1\n1 3\n2",
        expectedOutput: "2.0"
      },
      {
        input: "2 2\n1 2\n3 4",
        expectedOutput: "2.5"
      },
      {
        input: "2 2\n0 0\n0 0",
        expectedOutput: "0.0"
      }
    ],
    problemRanking: 1100
  },

  {
    problemDescription: "Place n queens on an n×n chessboard such that no two queens attack each other. Return the number of distinct solutions. Input format: A single integer n.",
    problemName: "N-Queens Count",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "4",
        expectedOutput: "2"
      },
      {
        input: "1",
        expectedOutput: "1"
      },
      {
        input: "8",
        expectedOutput: "92"
      }
    ],
    problemRanking: 1150
  },

  {
    problemDescription: "Given a string and a dictionary of words, return true if the string can be segmented into dictionary words. Input format: First line contains the string, second line contains n (dictionary size), next n lines contain dictionary words.",
    problemName: "Word Break",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "leetcode\n2\nleet\ncode",
        expectedOutput: "true"
      },
      {
        input: "applepenapple\n2\napple\npen",
        expectedOutput: "true"
      },
      {
        input: "catsandog\n5\ncats\ndog\nsand\nand\ncat",
        expectedOutput: "false"
      }
    ],
    problemRanking: 1200
  },

  {
    problemDescription: "Given an integer array and integer k, return the maximum sum of any subarray with length at most k. Input format: First line contains n and k, second line contains n space-separated integers.",
    problemName: "Maximum Sum Subarray Size K",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "6 2\n1 -1 -2 4 -7 3",
        expectedOutput: "5"
      },
      {
        input: "4 1\n2 1 -6 4",
        expectedOutput: "4"
      },
      {
        input: "4 2\n2 1 -6 4",
        expectedOutput: "6"
      }
    ],
    problemRanking: 1250
  },

  {
    problemDescription: "Given an elevation map as array of heights, compute how much water can be trapped after raining. Input format: First line contains n (array size), second line contains n space-separated integers representing heights.",
    problemName: "Trapping Rain Water",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        expectedOutput: "6"
      },
      {
        input: "6\n4 2 0 3 2 5",
        expectedOutput: "9"
      },
      {
        input: "5\n1 2 3 4 5",
        expectedOutput: "0"
      }
    ],
    problemRanking: 1300
  },

  {
    problemDescription: "Find shortest transformation sequence from beginWord to endWord using dictionary words, changing one letter at a time. Input format: First line contains beginWord and endWord, second line contains n (dictionary size), next n lines contain dictionary words.",
    problemName: "Word Ladder",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "hit cog\n6\nhot\ndot\ndog\nlot\nlog\ncog",
        expectedOutput: "5"
      },
      {
        input: "hit cog\n5\nhot\ndot\ndog\nlot\nlog",
        expectedOutput: "0"
      },
      {
        input: "a c\n3\na\nb\nc",
        expectedOutput: "2"
      }
    ],
    problemRanking: 1350
  },

  {
    problemDescription: "Given a string containing digits 2-9, return all possible letter combinations that the number could represent (like phone keypad). Input format: A single line containing the digit string.",
    problemName: "Letter Combinations of Phone Number",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "23",
        expectedOutput: "ad ae af bd be bf cd ce cf"
      },
      {
        input: "",
        expectedOutput: ""
      },
      {
        input: "2",
        expectedOutput: "a b c"
      }
    ],
    problemRanking: 1400
  },

  {
    problemDescription: "Serialize a binary tree to a string and deserialize back to tree. For this problem, just return the serialized string. Input format: First line contains n (number of nodes), second line contains level-order traversal with -1 for null.",
    problemName: "Serialize Binary Tree",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "7\n1 2 3 -1 -1 4 5",
        expectedOutput: "1,2,3,null,null,4,5"
      },
      {
        input: "0\n",
        expectedOutput: "null"
      },
      {
        input: "1\n1",
        expectedOutput: "1"
      }
    ],
    problemRanking: 1450
  },

  {
    problemDescription: "Find all unique combinations in candidates array that sum to target. Each number may be used only once. Input format: First line contains n and target, second line contains n space-separated candidate numbers. Output: Each combination on separate line, combinations separated by semicolon.",
    problemName: "Combination Sum II",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "7 8\n10 1 2 7 6 1 5",
        expectedOutput: "1 1 6;1 2 5;1 7;2 6"
      },
      {
        input: "5 5\n2 5 2 1 2",
        expectedOutput: "1 2 2;5"
      },
      {
        input: "1 1\n1",
        expectedOutput: "1"
      }
    ],
    problemRanking: 1500
  },

  {
    problemDescription: "Find minimum cuts needed for palindrome partitioning of string s. Input format: A single line containing the string.",
    problemName: "Palindrome Partitioning II",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "aab",
        expectedOutput: "1"
      },
      {
        input: "a",
        expectedOutput: "0"
      },
      {
        input: "ab",
        expectedOutput: "1"
      }
    ],
    problemRanking: 1550
  }
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