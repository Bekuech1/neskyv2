"use client";

import Playground from "../components/layout/playground";

export default function Page() {
  return (
    <div className="no-scrollbar">
      <Playground limit={0} />
    </div>
  );
}