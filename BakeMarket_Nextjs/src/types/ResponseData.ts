export interface ResponseData<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface PageProps {
  params: Promise<{ id: string }>;
}
