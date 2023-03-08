import { Box, Container, Title } from '@mantine/core';
import { useLayoutContext } from './context';
import { AdminHeaderProps } from './types';

const AdminHeader: React.FC<AdminHeaderProps> = () => {
  const { appName } = useLayoutContext();
  return (
    <Box
      sx={(t) => ({
        flex: '0 0 72px',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1,
        background: t.colors.gray[1],
      })}
    >
      <Container
        fluid
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          height: '100%',
        }}
      >
        <Title order={3}>{appName}</Title>
      </Container>
    </Box>
  );
};
export default AdminHeader;
