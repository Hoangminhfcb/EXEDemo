

import UserLayout from "./(pages)/(user)/layout";
import Home from "./(pages)/(user)/home/page";

export default function RootPage() {
  return (
    <UserLayout>
      <Home />
    </UserLayout>
  );
}