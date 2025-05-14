import React from "react";
import "./style.css";
import Sidebar from "@/components/Sidebar";

export interface IProps {
  children: React.ReactElement;
}

export default async function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
