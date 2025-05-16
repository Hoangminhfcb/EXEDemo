import { cookies } from "next/headers";
import accountApiRequest from "../apiRequests/account";
import ProfileForm from "./profileForm";

export default async function AboutMe() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return <div>Bạn chưa đăng nhập</div>;

  const res = await accountApiRequest.me(accessToken);

  if (res.status !== 200) return <div>Lỗi khi gọi API</div>;

  return (
    <>
      <ProfileForm profile={res.payload} />
    </>
  );
}
