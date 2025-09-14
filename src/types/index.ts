type BaseApiResponse = {
  success: boolean;
  message: string;
  status: number;
};

type ApiResponse<T = {}> = BaseApiResponse & {
  data: T;
};
type OmitNested<T, K1 extends keyof T, K2 extends keyof T[K1]> = Omit<T, K1> & {
  [P in K1]: Omit<T[K1], K2>;
};

export type { BaseApiResponse, ApiResponse, OmitNested };
