import { Box, ScrollArea, ScrollAreaProps } from '@mantine/core';

const ContentWin: React.FC<React.PropsWithChildren<ScrollAreaProps>> = ({
  children,
  ...rest
}) => {
  return (
    <ScrollArea
      offsetScrollbars
      styles={{
        viewport: {
          boxSizing: 'border-box',
        },
      }}
      {...rest}
    >
      <Box
        sx={(t) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: t.spacing.md,
        })}
      >
        {children}
      </Box>
    </ScrollArea>
  );
};

export default ContentWin;
