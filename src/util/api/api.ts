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

export type SurveyData = {
  result: string;
  description: string;
  mbtiType: string;
  imageDto: {
    url: string;
  };
};

export type Statistic = {
  result: string;
  count: number;
  matchCount: number;
  modifiedAt: string;
};

export type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | string;
  headers?: Record<string, string>;
};

const API_URL = 'https://joon6093.link';

const _fetch = async <T>(
  url: string,
  options: RequestOptions = { method: 'GET' },
): Promise<ApiResponse<T>> => {
  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
    options.headers = {
      'Content-Type': 'application/json',
    };
  }
  const response = await fetch(url, options as RequestInit);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const checkStatus = async (): Promise<ApiResponse<boolean>> => {
  return await _fetch(`${API_URL}/api/status/v1/check`);
};

export const getQuestions = async (): Promise<ApiResponse<Question[]>> => {
  return await _fetch(`${API_URL}/api/propensity-analysis/v1/question`);
};

export const postAnswers = async (
  answers: UserAnswer,
): Promise<ApiResponse<SurveyData>> => {
  return await _fetch(`${API_URL}/api/propensity-analysis/v1/result`, {
    method: 'POST',
    body: answers,
  });
};

export const submitAnswer = async (
  mbtiType: string,
  matched: boolean,
): Promise<ApiResponse<undefined>> => {
  return await _fetch(`${API_URL}/api/results/v1/test-result`, {
    method: 'POST',
    body: { mbtiType, match: matched },
  });
};

export const getStatistics = async (): Promise<
  ApiResponse<Statistic[]>
> => {
  return await _fetch(`${API_URL}/api/results/v1/statistics`);
};
