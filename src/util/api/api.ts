export type ApiResponse<T> = {
  success: 'true' | 'false';
  data: T;
};

export type Question = {
  question: string;
  options: Option[];
};

export type Option = {
  answer: string;
  personalityType: PersonalityType;
  score: number;
};

export type PersonalityType =
  | 'EXTROVERSION'
  | 'INTROVERSION'
  | 'SENSING'
  | 'INTUITION'
  | 'THINKING'
  | 'FEELING'
  | 'JUDGING'
  | 'PERCEIVING';

export type UserAnswer = Record<PersonalityType, number>;

export type TestResult = {
  result: string;
  description: string;
  mbtiType: string;
  imageDto: {
    url: string;
  };
};

export type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | string;
};

const API_URL = 'https://joon6093.link';

const _fetch = async <T>(
  url: string,
  options: RequestOptions = { method: 'GET' },
): Promise<ApiResponse<T>> => {
  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, options as RequestInit);
  const data = await response.json();
  return data;
};

export const checkStatus = async (): Promise<ApiResponse<boolean>> => {
  return await _fetch(`${API_URL}/api/status/v1/check`);
};

export const getQuestions = async (): Promise<ApiResponse<Question[]>> => {
  return await _fetch(`${API_URL}/api/propensity-analysis/v1/question`);
};

const PERSONALITY_PROPERTIES: Record<PersonalityType, string> = {
  EXTROVERSION: 'E',
  INTROVERSION: 'I',
  SENSING: 'S',
  INTUITION: 'N',
  THINKING: 'T',
  FEELING: 'F',
  JUDGING: 'J',
  PERCEIVING: 'P',
};

const input = {
  E: 2,
  I: 1,
  N: 2,
  S: 1,
  T: 2,
  F: 1,
  P: 2,
  J: 1,
};
export const postAnswers = async (
  answers: UserAnswer,
): Promise<ApiResponse<TestResult>> => {
  const answer = Object.entries(answers).reduce((acc, [key, value]) => {
    acc[PERSONALITY_PROPERTIES[key as PersonalityType]] = value;
    return acc;
  }, {} as Record<string, number>);
  return await _fetch(`${API_URL}/api/propensity-analysis/v1/result`, {
    method: 'POST',
    body: answer,
  });
};
