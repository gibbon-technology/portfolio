import SUDOChat from "./SUDOChat";
import Chats from "./Chats";

export default function ChatManager({ user, token }) {
  return user.isSudo ? (
    <SUDOChat user={user} token={token} />
  ) : (
    <Chats user={user} token={token} />
  );
}
