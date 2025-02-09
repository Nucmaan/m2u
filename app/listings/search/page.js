"use client";
import { Suspense } from "react";
import ViewSingleList from "@/components/ViewSingleList";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search parameters...</div>}>
      <ViewSingleList />
    </Suspense>
  );
}