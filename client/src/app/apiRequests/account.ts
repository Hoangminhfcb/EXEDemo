import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  me: (accessToken: string) =>
    http.get<AccountResType>("api/users/me", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    }),
  meClient: () => http.get<AccountResType>("api/users/me"),
  updateMe: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("api/users", body),
};

export default accountApiRequest;
