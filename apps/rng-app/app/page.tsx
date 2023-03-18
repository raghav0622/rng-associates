'use client';

import { Stack, Title } from '@mantine/core';
import Link from 'next/link';

export default function CompanyDashboard() {
  return (
    <Stack>
      <Title order={6} ml="sm">
        Wlecome to RNG Accounting
      </Title>
      <Link href="company/B8OBTrHtBtNnnWeS3xiO">Raghav Goyal</Link>
    </Stack>
  );
}
