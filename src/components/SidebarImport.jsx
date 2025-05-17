"use client";

import React, { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SidebarImport() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("something went wrong");
        return;
      }
      const data = await response.json();
      // router.push(`/note/${data.uid}`);
      startTransition(() => router.push(`/note/${data.uid}`));
      startTransition(() => router.refresh());
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <label
        htmlFor="file"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 24px",
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          borderRadius: "8px",
          color: "white",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          border: "none",
          fontSize: "16px",
          position: "relative",
          overflow: "hidden",
          ":hover": {
            background: "linear-gradient(135deg, #4f46e5, #4338ca)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            transform: "translateY(-1px)",
          },
          ":active": {
            transform: "translateY(1px)",
          },
        }}
        className="upload-btn"
      >
        <svg
          style={{
            width: "20px",
            height: "20px",
            marginRight: "8px",
            fill: "currentColor",
          }}
          viewBox="0 0 24 24"
        >
          <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5M12 3v12m0 0 4-4m-4 4-4-4" />
        </svg>
        上传 .md 文件
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
