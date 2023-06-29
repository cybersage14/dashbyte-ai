import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Chat from '../components/chat';

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Chat id={id} />
    </Layout>
  );
}
