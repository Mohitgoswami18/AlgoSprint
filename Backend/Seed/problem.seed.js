import { Problem } from "../Models/problem.model.js";
import ConnectToDatabase from "../Database/database.js"


const problemData = [
  {
    problemName:
      "Find the maximum subarray sum after removing one element [easy]",
    problemDescription:
      "Find the maximum subarray sum after removing one element. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_36",
      },
      {
        input: "sample_input_20",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_38",
      },
      {
        input: "sample_input_39",
        expectedOutput: "expected_output_88",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_40",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_76",
      },
    ],
    problemRanking: 1,
  },
  {
    problemName:
      "Find the maximum subarray sum after removing one element [medium]",
    problemDescription:
      "Find the maximum subarray sum after removing one element. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_50",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_28",
        expectedOutput: "expected_output_18",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_6",
      },
      {
        input: "sample_input_24",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_8",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_91",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_90",
      },
    ],
    problemRanking: 2,
  },
  {
    problemName:
      "Find the maximum subarray sum after removing one element [hard]",
    problemDescription:
      "Find the maximum subarray sum after removing one element. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_37",
        expectedOutput: "expected_output_14",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_20",
        expectedOutput: "expected_output_27",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_27",
      },
    ],
    problemRanking: 3,
  },
  {
    problemName: "Count subarrays with product less than K [easy]",
    problemDescription:
      "Count subarrays with product less than K. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_37",
        expectedOutput: "expected_output_90",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_66",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_60",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_87",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_9",
        expectedOutput: "expected_output_60",
      },
    ],
    problemRanking: 4,
  },
  {
    problemName: "Count subarrays with product less than K [medium]",
    problemDescription:
      "Count subarrays with product less than K. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_85",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_28",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_93",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_73",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_86",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_97",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_86",
      },
    ],
    problemRanking: 5,
  },
  {
    problemName: "Count subarrays with product less than K [hard]",
    problemDescription:
      "Count subarrays with product less than K. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_82",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_40",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_62",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_18",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_41",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_92",
      },
      {
        input: "sample_input_82",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_59",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_54",
      },
    ],
    problemRanking: 6,
  },
  {
    problemName:
      "Find all peak elements with no neighbors larger than it [easy]",
    problemDescription:
      "Find all peak elements with no neighbors larger than it. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_33",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_86",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_51",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_89",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_48",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_32",
      },
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_37",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_10",
      },
    ],
    problemRanking: 7,
  },
  {
    problemName:
      "Find all peak elements with no neighbors larger than it [medium]",
    problemDescription:
      "Find all peak elements with no neighbors larger than it. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_91",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_22",
        expectedOutput: "expected_output_84",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_52",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_56",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_1",
        expectedOutput: "expected_output_6",
      },
    ],
    problemRanking: 8,
  },
  {
    problemName:
      "Find all peak elements with no neighbors larger than it [hard]",
    problemDescription:
      "Find all peak elements with no neighbors larger than it. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_63",
      },
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_97",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_95",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_51",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_9",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_67",
      },
      {
        input: "sample_input_28",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_96",
      },
    ],
    problemRanking: 9,
  },
  {
    problemName:
      "Find longest substring with at most two distinct characters [easy]",
    problemDescription:
      "Find longest substring with at most two distinct characters. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_40",
        expectedOutput: "expected_output_6",
      },
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_61",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_27",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_67",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_90",
      },
    ],
    problemRanking: 10,
  },
  {
    problemName:
      "Find longest substring with at most two distinct characters [medium]",
    problemDescription:
      "Find longest substring with at most two distinct characters. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_58",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_33",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_76",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_33",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_57",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_72",
      },
    ],
    problemRanking: 11,
  },
  {
    problemName:
      "Find longest substring with at most two distinct characters [hard]",
    problemDescription:
      "Find longest substring with at most two distinct characters. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_6",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_61",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_88",
        expectedOutput: "expected_output_88",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_66",
      },
    ],
    problemRanking: 12,
  },
  {
    problemName:
      "Count palindromic substrings including single character duplicates [easy]",
    problemDescription:
      "Count palindromic substrings including single character duplicates. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_28",
        expectedOutput: "expected_output_89",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_1",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_91",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_6",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_61",
      },
    ],
    problemRanking: 13,
  },
  {
    problemName:
      "Count palindromic substrings including single character duplicates [medium]",
    problemDescription:
      "Count palindromic substrings including single character duplicates. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_68",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_37",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_22",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_98",
      },
    ],
    problemRanking: 14,
  },
  {
    problemName:
      "Count palindromic substrings including single character duplicates [hard]",
    problemDescription:
      "Count palindromic substrings including single character duplicates. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_50",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_62",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_27",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_28",
        expectedOutput: "expected_output_59",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_6",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_45",
      },
    ],
    problemRanking: 15,
  },
  {
    problemName: "Find lexicographically smallest rotation of a string [easy]",
    problemDescription:
      "Find lexicographically smallest rotation of a string. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_13",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_32",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_25",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_6",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_63",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_88",
      },
      {
        input: "sample_input_62",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_39",
      },
    ],
    problemRanking: 16,
  },
  {
    problemName:
      "Find lexicographically smallest rotation of a string [medium]",
    problemDescription:
      "Find lexicographically smallest rotation of a string. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_73",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_28",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_13",
        expectedOutput: "expected_output_32",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_25",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_41",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_85",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_59",
      },
    ],
    problemRanking: 17,
  },
  {
    problemName: "Find lexicographically smallest rotation of a string [hard]",
    problemDescription:
      "Find lexicographically smallest rotation of a string. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_32",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_27",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_52",
      },
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_6",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_1",
      },
    ],
    problemRanking: 18,
  },
  {
    problemName:
      "Find the smallest number divisible by all digits in an array [easy]",
    problemDescription:
      "Find the smallest number divisible by all digits in an array. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_40",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_68",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_14",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_51",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_8",
        expectedOutput: "expected_output_63",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_38",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_70",
      },
    ],
    problemRanking: 19,
  },
  {
    problemName:
      "Find the smallest number divisible by all digits in an array [medium]",
    problemDescription:
      "Find the smallest number divisible by all digits in an array. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_88",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_84",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_48",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_37",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_88",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_38",
      },
    ],
    problemRanking: 20,
  },
  {
    problemName:
      "Find the smallest number divisible by all digits in an array [hard]",
    problemDescription:
      "Find the smallest number divisible by all digits in an array. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_56",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_60",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_92",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_7",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_97",
      },
    ],
    problemRanking: 21,
  },
  {
    problemName:
      "Count numbers less than N with exact K distinct prime factors [easy]",
    problemDescription:
      "Count numbers less than N with exact K distinct prime factors. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_54",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_84",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_56",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_78",
      },
    ],
    problemRanking: 22,
  },
  {
    problemName:
      "Count numbers less than N with exact K distinct prime factors [medium]",
    problemDescription:
      "Count numbers less than N with exact K distinct prime factors. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_4",
        expectedOutput: "expected_output_14",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_28",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_9",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_48",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_82",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_48",
      },
    ],
    problemRanking: 23,
  },
  {
    problemName:
      "Count numbers less than N with exact K distinct prime factors [hard]",
    problemDescription:
      "Count numbers less than N with exact K distinct prime factors. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_21",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_38",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_21",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_51",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_78",
      },
    ],
    problemRanking: 24,
  },
  {
    problemName: "Find the next number with same number of set bits [easy]",
    problemDescription:
      "Find the next number with same number of set bits. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_57",
      },
      {
        input: "sample_input_88",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_4",
        expectedOutput: "expected_output_85",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_40",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_95",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_62",
      },
    ],
    problemRanking: 25,
  },
  {
    problemName: "Find the next number with same number of set bits [medium]",
    problemDescription:
      "Find the next number with same number of set bits. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_36",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_48",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_97",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_68",
      },
      {
        input: "sample_input_24",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_6",
      },
    ],
    problemRanking: 26,
  },
  {
    problemName: "Find the next number with same number of set bits [hard]",
    problemDescription:
      "Find the next number with same number of set bits. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_58",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_63",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_39",
      },
    ],
    problemRanking: 27,
  },
  {
    problemName: "Find all nodes at distance K from a given node [easy]",
    problemDescription:
      "Find all nodes at distance K from a given node. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_7",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_52",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_92",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_58",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_95",
      },
    ],
    problemRanking: 28,
  },
  {
    problemName: "Find all nodes at distance K from a given node [medium]",
    problemDescription:
      "Find all nodes at distance K from a given node. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_91",
      },
    ],
    problemRanking: 29,
  },
  {
    problemName: "Find all nodes at distance K from a given node [hard]",
    problemDescription:
      "Find all nodes at distance K from a given node. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_45",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_87",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_38",
      },
      {
        input: "sample_input_1",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_72",
      },
    ],
    problemRanking: 30,
  },
  {
    problemName:
      "Count number of connected components in a directed graph ignoring cycles [easy]",
    problemDescription:
      "Count number of connected components in a directed graph ignoring cycles. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_57",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_59",
      },
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_54",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_51",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_74",
      },
    ],
    problemRanking: 31,
  },
  {
    problemName:
      "Count number of connected components in a directed graph ignoring cycles [medium]",
    problemDescription:
      "Count number of connected components in a directed graph ignoring cycles. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_41",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_20",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_8",
      },
      {
        input: "sample_input_24",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_70",
      },
    ],
    problemRanking: 32,
  },
  {
    problemName:
      "Count number of connected components in a directed graph ignoring cycles [hard]",
    problemDescription:
      "Count number of connected components in a directed graph ignoring cycles. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_24",
        expectedOutput: "expected_output_92",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_56",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_82",
        expectedOutput: "expected_output_86",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_22",
      },
    ],
    problemRanking: 33,
  },
  {
    problemName: "Find minimum edges to make graph strongly connected [easy]",
    problemDescription:
      "Find minimum edges to make graph strongly connected. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_8",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_54",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_76",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_88",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_14",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_84",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_32",
        expectedOutput: "expected_output_43",
      },
    ],
    problemRanking: 34,
  },
  {
    problemName: "Find minimum edges to make graph strongly connected [medium]",
    problemDescription:
      "Find minimum edges to make graph strongly connected. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_86",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_36",
      },
      {
        input: "sample_input_6",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_78",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_56",
      },
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_48",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_25",
      },
    ],
    problemRanking: 35,
  },
  {
    problemName: "Find minimum edges to make graph strongly connected [hard]",
    problemDescription:
      "Find minimum edges to make graph strongly connected. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_33",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_60",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_21",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_7",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_38",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_32",
      },
    ],
    problemRanking: 36,
  },
  {
    problemName: "Find sum of nodes at maximum depth [easy]",
    problemDescription:
      "Find sum of nodes at maximum depth. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_27",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_85",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_25",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_54",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_98",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_95",
        expectedOutput: "expected_output_63",
      },
    ],
    problemRanking: 37,
  },
  {
    problemName: "Find sum of nodes at maximum depth [medium]",
    problemDescription:
      "Find sum of nodes at maximum depth. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_66",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_59",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_50",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_63",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_51",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_52",
      },
    ],
    problemRanking: 38,
  },
  {
    problemName: "Find sum of nodes at maximum depth [hard]",
    problemDescription:
      "Find sum of nodes at maximum depth. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_99",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_56",
      },
      {
        input: "sample_input_1",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_18",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_92",
      },
      {
        input: "sample_input_22",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_64",
      },
    ],
    problemRanking: 39,
  },
  {
    problemName:
      "Serialize and deserialize a binary tree with custom encoding [easy]",
    problemDescription:
      "Serialize and deserialize a binary tree with custom encoding. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_28",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_51",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_36",
      },
    ],
    problemRanking: 40,
  },
  {
    problemName:
      "Serialize and deserialize a binary tree with custom encoding [medium]",
    problemDescription:
      "Serialize and deserialize a binary tree with custom encoding. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_11",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_68",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_15",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_52",
      },
      {
        input: "sample_input_70",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_37",
        expectedOutput: "expected_output_21",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_73",
      },
      {
        input: "sample_input_8",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_20",
      },
    ],
    problemRanking: 41,
  },
  {
    problemName:
      "Serialize and deserialize a binary tree with custom encoding [hard]",
    problemDescription:
      "Serialize and deserialize a binary tree with custom encoding. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_78",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_38",
      },
      {
        input: "sample_input_88",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_57",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_56",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_41",
      },
    ],
    problemRanking: 42,
  },
  {
    problemName: "Count number of unique BSTs possible with N nodes [easy]",
    problemDescription:
      "Count number of unique BSTs possible with N nodes. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_25",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_39",
      },
    ],
    problemRanking: 43,
  },
  {
    problemName: "Count number of unique BSTs possible with N nodes [medium]",
    problemDescription:
      "Count number of unique BSTs possible with N nodes. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_74",
      },
      {
        input: "sample_input_39",
        expectedOutput: "expected_output_76",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_40",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_59",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_60",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_25",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_14",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_58",
      },
      {
        input: "sample_input_56",
        expectedOutput: "expected_output_100",
      },
    ],
    problemRanking: 44,
  },
  {
    problemName: "Count number of unique BSTs possible with N nodes [hard]",
    problemDescription:
      "Count number of unique BSTs possible with N nodes. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_13",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_1",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_66",
      },
      {
        input: "sample_input_38",
        expectedOutput: "expected_output_90",
      },
      {
        input: "sample_input_70",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_20",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_23",
      },
    ],
    problemRanking: 45,
  },
  {
    problemName:
      "Count ways to reach target sum with at most K elements [easy]",
    problemDescription:
      "Count ways to reach target sum with at most K elements. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_85",
        expectedOutput: "expected_output_78",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_37",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_73",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_60",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_77",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_51",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_47",
      },
    ],
    problemRanking: 46,
  },
  {
    problemName:
      "Count ways to reach target sum with at most K elements [medium]",
    problemDescription:
      "Count ways to reach target sum with at most K elements. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_34",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_28",
      },
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_87",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_22",
        expectedOutput: "expected_output_33",
      },
      {
        input: "sample_input_21",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_6",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_51",
        expectedOutput: "expected_output_94",
      },
    ],
    problemRanking: 47,
  },
  {
    problemName:
      "Count ways to reach target sum with at most K elements [hard]",
    problemDescription:
      "Count ways to reach target sum with at most K elements. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_48",
      },
      {
        input: "sample_input_93",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_37",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_85",
      },
      {
        input: "sample_input_4",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_32",
      },
      {
        input: "sample_input_88",
        expectedOutput: "expected_output_66",
      },
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_33",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_92",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_23",
      },
    ],
    problemRanking: 48,
  },
  {
    problemName:
      "Maximum sum of non-adjacent elements in a circular array [easy]",
    problemDescription:
      "Maximum sum of non-adjacent elements in a circular array. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_67",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_48",
      },
      {
        input: "sample_input_38",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_13",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_55",
      },
      {
        input: "sample_input_67",
        expectedOutput: "expected_output_88",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_70",
        expectedOutput: "expected_output_69",
      },
    ],
    problemRanking: 49,
  },
  {
    problemName:
      "Maximum sum of non-adjacent elements in a circular array [medium]",
    problemDescription:
      "Maximum sum of non-adjacent elements in a circular array. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_37",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_70",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_48",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_91",
      },
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_22",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_23",
      },
      {
        input: "sample_input_82",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_11",
        expectedOutput: "expected_output_5",
      },
      {
        input: "sample_input_40",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_30",
      },
    ],
    problemRanking: 50,
  },
  {
    problemName:
      "Maximum sum of non-adjacent elements in a circular array [hard]",
    problemDescription:
      "Maximum sum of non-adjacent elements in a circular array. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_82",
        expectedOutput: "expected_output_58",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_17",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_41",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_76",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_90",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_61",
      },
    ],
    problemRanking: 51,
  },
  {
    problemName: "Longest increasing subsequence with exact length L [easy]",
    problemDescription:
      "Longest increasing subsequence with exact length L. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_87",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_47",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_94",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_9",
      },
    ],
    problemRanking: 52,
  },
  {
    problemName: "Longest increasing subsequence with exact length L [medium]",
    problemDescription:
      "Longest increasing subsequence with exact length L. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_42",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_32",
      },
      {
        input: "sample_input_4",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_8",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_53",
      },
      {
        input: "sample_input_19",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_44",
        expectedOutput: "expected_output_86",
      },
    ],
    problemRanking: 53,
  },
  {
    problemName: "Longest increasing subsequence with exact length L [hard]",
    problemDescription:
      "Longest increasing subsequence with exact length L. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_48",
      },
      {
        input: "sample_input_32",
        expectedOutput: "expected_output_61",
      },
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_45",
      },
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_83",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_51",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_16",
      },
      {
        input: "sample_input_2",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_90",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_20",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_99",
      },
    ],
    problemRanking: 54,
  },
  {
    problemName:
      "Find missing number in a sequence with one corrupted number [easy]",
    problemDescription:
      "Find missing number in a sequence with one corrupted number. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_52",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_60",
        expectedOutput: "expected_output_78",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_62",
      },
      {
        input: "sample_input_30",
        expectedOutput: "expected_output_76",
      },
      {
        input: "sample_input_71",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_69",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_14",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_63",
      },
      {
        input: "sample_input_95",
        expectedOutput: "expected_output_36",
      },
    ],
    problemRanking: 55,
  },
  {
    problemName:
      "Find missing number in a sequence with one corrupted number [medium]",
    problemDescription:
      "Find missing number in a sequence with one corrupted number. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_49",
      },
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_90",
      },
      {
        input: "sample_input_43",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_18",
        expectedOutput: "expected_output_77",
      },
      {
        input: "sample_input_48",
        expectedOutput: "expected_output_78",
      },
      {
        input: "sample_input_61",
        expectedOutput: "expected_output_39",
      },
      {
        input: "sample_input_7",
        expectedOutput: "expected_output_86",
      },
      {
        input: "sample_input_58",
        expectedOutput: "expected_output_47",
      },
      {
        input: "sample_input_92",
        expectedOutput: "expected_output_34",
      },
      {
        input: "sample_input_32",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_97",
        expectedOutput: "expected_output_52",
      },
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_39",
      },
    ],
    problemRanking: 56,
  },
  {
    problemName:
      "Find missing number in a sequence with one corrupted number [hard]",
    problemDescription:
      "Find missing number in a sequence with one corrupted number. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_76",
        expectedOutput: "expected_output_36",
      },
      {
        input: "sample_input_36",
        expectedOutput: "expected_output_28",
      },
      {
        input: "sample_input_96",
        expectedOutput: "expected_output_84",
      },
      {
        input: "sample_input_4",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_10",
      },
      {
        input: "sample_input_79",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_25",
      },
      {
        input: "sample_input_22",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_56",
        expectedOutput: "expected_output_72",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_72",
      },
    ],
    problemRanking: 57,
  },
  {
    problemName:
      "Detect if an array can be partitioned into three subsets with equal sum [easy]",
    problemDescription:
      "Detect if an array can be partitioned into three subsets with equal sum. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_4",
      },
      {
        input: "sample_input_65",
        expectedOutput: "expected_output_69",
      },
      {
        input: "sample_input_3",
        expectedOutput: "expected_output_91",
      },
      {
        input: "sample_input_15",
        expectedOutput: "expected_output_93",
      },
      {
        input: "sample_input_81",
        expectedOutput: "expected_output_81",
      },
      {
        input: "sample_input_41",
        expectedOutput: "expected_output_43",
      },
      {
        input: "sample_input_57",
        expectedOutput: "expected_output_12",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_30",
      },
      {
        input: "sample_input_25",
        expectedOutput: "expected_output_58",
      },
    ],
    problemRanking: 58,
  },
  {
    problemName:
      "Detect if an array can be partitioned into three subsets with equal sum [medium]",
    problemDescription:
      "Detect if an array can be partitioned into three subsets with equal sum. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_49",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_60",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_40",
      },
      {
        input: "sample_input_50",
        expectedOutput: "expected_output_37",
      },
      {
        input: "sample_input_72",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_89",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_58",
      },
      {
        input: "sample_input_63",
        expectedOutput: "expected_output_50",
      },
      {
        input: "sample_input_64",
        expectedOutput: "expected_output_24",
      },
      {
        input: "sample_input_84",
        expectedOutput: "expected_output_21",
      },
      {
        input: "sample_input_74",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_26",
        expectedOutput: "expected_output_75",
      },
      {
        input: "sample_input_5",
        expectedOutput: "expected_output_100",
      },
      {
        input: "sample_input_83",
        expectedOutput: "expected_output_80",
      },
    ],
    problemRanking: 59,
  },
  {
    problemName:
      "Detect if an array can be partitioned into three subsets with equal sum [hard]",
    problemDescription:
      "Detect if an array can be partitioned into three subsets with equal sum. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_100",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_98",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_73",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_8",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_46",
        expectedOutput: "expected_output_80",
      },
      {
        input: "sample_input_99",
        expectedOutput: "expected_output_54",
      },
      {
        input: "sample_input_28",
        expectedOutput: "expected_output_11",
      },
      {
        input: "sample_input_35",
        expectedOutput: "expected_output_21",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_86",
        expectedOutput: "expected_output_66",
      },
      {
        input: "sample_input_75",
        expectedOutput: "expected_output_76",
      },
    ],
    problemRanking: 60,
  },
  {
    problemName:
      "Find minimum operations to convert one string into another with custom costs [easy]",
    problemDescription:
      "Find minimum operations to convert one string into another with custom costs. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "easy",
    problemTestCases: [
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_9",
        expectedOutput: "expected_output_35",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_78",
      },
      {
        input: "sample_input_14",
        expectedOutput: "expected_output_54",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_96",
      },
      {
        input: "sample_input_40",
        expectedOutput: "expected_output_51",
      },
      {
        input: "sample_input_20",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_54",
        expectedOutput: "expected_output_84",
      },
      {
        input: "sample_input_55",
        expectedOutput: "expected_output_66",
      },
      {
        input: "sample_input_12",
        expectedOutput: "expected_output_9",
      },
      {
        input: "sample_input_16",
        expectedOutput: "expected_output_59",
      },
    ],
    problemRanking: 61,
  },
  {
    problemName:
      "Find minimum operations to convert one string into another with custom costs [medium]",
    problemDescription:
      "Find minimum operations to convert one string into another with custom costs. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "medium",
    problemTestCases: [
      {
        input: "sample_input_29",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_10",
        expectedOutput: "expected_output_64",
      },
      {
        input: "sample_input_39",
        expectedOutput: "expected_output_65",
      },
      {
        input: "sample_input_39",
        expectedOutput: "expected_output_79",
      },
      {
        input: "sample_input_17",
        expectedOutput: "expected_output_26",
      },
      {
        input: "sample_input_53",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_89",
        expectedOutput: "expected_output_46",
      },
      {
        input: "sample_input_20",
        expectedOutput: "expected_output_3",
      },
      {
        input: "sample_input_66",
        expectedOutput: "expected_output_56",
      },
      {
        input: "sample_input_59",
        expectedOutput: "expected_output_15",
      },
    ],
    problemRanking: 62,
  },
  {
    problemName:
      "Find minimum operations to convert one string into another with custom costs [hard]",
    problemDescription:
      "Find minimum operations to convert one string into another with custom costs. Solve this problem considering edge cases and constraints.",
    problemDifficulty: "hard",
    problemTestCases: [
      {
        input: "sample_input_31",
        expectedOutput: "expected_output_82",
      },
      {
        input: "sample_input_80",
        expectedOutput: "expected_output_44",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_29",
      },
      {
        input: "sample_input_27",
        expectedOutput: "expected_output_2",
      },
      {
        input: "sample_input_42",
        expectedOutput: "expected_output_70",
      },
      {
        input: "sample_input_91",
        expectedOutput: "expected_output_52",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_71",
      },
      {
        input: "sample_input_23",
        expectedOutput: "expected_output_27",
      },
      {
        input: "sample_input_24",
        expectedOutput: "expected_output_31",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_19",
      },
      {
        input: "sample_input_90",
        expectedOutput: "expected_output_94",
      },
      {
        input: "sample_input_95",
        expectedOutput: "expected_output_89",
      },
      {
        input: "sample_input_48",
        expectedOutput: "expected_output_95",
      },
      {
        input: "sample_input_68",
        expectedOutput: "expected_output_88",
      },
    ],
    problemRanking: 63,
  },
];

ConnectToDatabase();

const updateProblemToDatabase = async () => {
    try {
        const response = await Problem.insertMany(seedProblems);
        console.log("Problems updated successfully:", response);
    } catch (error) {
        console.error("Error updating problem:", error);
    }
}

updateProblemToDatabase();