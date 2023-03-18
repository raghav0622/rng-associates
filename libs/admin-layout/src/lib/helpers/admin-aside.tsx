import { Box, ScrollArea, Stack } from '@mantine/core';

export const AsideMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={(t) => ({
        height: '100%',
        flex: '0 0 300px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: t.colors.gray[1],

        [`@media (max-width: ${t.breakpoints.sm})`]: {
          display: 'none',
        },
      })}
    >
      <ScrollArea p="md">
        <Stack spacing={'xs'}>{children}</Stack>
      </ScrollArea>
    </Box>
  );
};
export default AsideMenu;
