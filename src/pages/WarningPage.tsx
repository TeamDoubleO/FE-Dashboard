import Layout from '../components/layout/Layout.tsx';
import Background from '../components/background/Background.tsx';
import Warning from '../components/warning/Warning.tsx';

const WarningPage = () => {
  return (
    <>
      <Background />
      <Layout>
        <Warning />
      </Layout>
    </>
  );
};

export default WarningPage;
