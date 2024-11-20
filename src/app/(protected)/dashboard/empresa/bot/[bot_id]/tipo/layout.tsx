"use client";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex h-full min-h-screen  fixed `} style={{width: '-webkit-fill-available'}}>
      <div className="flex-1 ">{children}</div>
    </div>
  );
}
