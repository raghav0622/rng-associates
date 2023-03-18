import { Box, Container } from '@mantine/core';

const AdminHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
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
        {children}
      </Container>
    </Box>
  );
};
export default AdminHeader;
