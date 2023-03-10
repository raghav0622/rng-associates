import { ScrollArea, Stack } from '@mantine/core';

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ScrollArea
      sx={(t) => ({
        flexGrow: 1,
        background: t.colors.gray[3],
      })}
      styles={(t) => ({
        root: {
          dsiplay: 'flex',
          flexDirection: 'column',
          padding: t.spacing.lg,
          gap: t.spacing.lg,
        },
      })}
      offsetScrollbars
    >
      <Stack spacing="md">{children}</Stack>
    </ScrollArea>
  );
};

export default Content;
