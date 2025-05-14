import dayjs from "dayjs";
import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/redis";

export default async function NoteList() {
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // await sleep(10000);
  const notes = await getAllNotes();

  const arr = Object.entries(notes);
  //判断笔记是否为空
  if (arr.length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        // const { title, updateTime } = JSON.parse(note);
        return (
          <li key={noteId}>
            {/* 封装成每条笔记 */}
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}
