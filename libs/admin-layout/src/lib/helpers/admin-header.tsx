import { Container, Header, Title } from '@mantine/core';
import { useLayoutContext } from './context';
import { AdminHeaderProps } from './types';

const AdminHeader: React.FC<AdminHeaderProps> = () => {
  const { appName } = useLayoutContext();
  return (
    <Header height={72}>
      <Container
        fluid
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          height: '100%',
          background: '#F5F5F5',
        }}
      >
        <Title order={3}>{appName}</Title>
      </Container>
    </Header>
  );
};
export default AdminHeader;
