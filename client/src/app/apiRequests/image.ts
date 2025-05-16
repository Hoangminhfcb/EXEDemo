import envConfig from "@/config";
import http from "@/lib/http";

const imageApiRequest = {
  upload: (body: FormData) =>
    http.post<{ filePath: string }>("api/images/upload", body),
  getUrl: (filePath: string) =>
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/images/file/${filePath}`,
};

export default imageApiRequest;
