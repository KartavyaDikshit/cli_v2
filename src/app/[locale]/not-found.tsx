import { NotFoundClient, NotFoundPageContent } from './NotFoundClient';

export default async function NotFoundPage() {
  return (
    <NotFoundClient>
      <NotFoundPageContent />
    </NotFoundClient>
  );
}
