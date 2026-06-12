import { getAllPosts } from "../lib/posts";

export default function Devlog() {
  return <>{getAllPosts()}</>;
}
