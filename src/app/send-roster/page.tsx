import SendRosterForm from '@/components/SendRosterForm';

export const metadata = {
  title: 'Send Us Your Roster | Anytime Soccer Training',
  description:
    'Send us your team roster, or tell us roughly how many players you have. We will issue your invoice and send you a link to share with your team.',
  robots: { index: false, follow: false },
};

export default function SendRosterPage() {
  return <SendRosterForm />;
}
