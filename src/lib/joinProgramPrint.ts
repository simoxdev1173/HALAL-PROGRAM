export const JOIN_PROGRAM_PRINT_SESSION_KEY = "arab-halal-join-application-print-v2";

export type JoinProgramPrintValue = string | boolean | string[] | null;
export type JoinProgramPrintData = Record<string, JoinProgramPrintValue>;

export type JoinProgramPrintSession = {
  requestNumber: string;
  submittedAt: string;
  data: JoinProgramPrintData;
};
