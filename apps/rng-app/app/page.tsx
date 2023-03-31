'use client';

import { Grid, Stack, Title } from '@mantine/core';
import { useCompanyDataByUser } from '@rng-associates/accounts';
import { CompanyInfoCard } from '../components/Company';
import { UserLayout } from '../components/Layout';

export default function UserDashboard() {
  const companies = useCompanyDataByUser('super-user');

  return (
    <UserLayout>
      <Stack>
        <Title order={6} pl="md">
          Companies
        </Title>
        <Grid>
          {companies.map((company) => (
            <Grid.Col xs={12} md={6} lg={3} key={`company-${company.id}`}>
              <CompanyInfoCard {...company} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </UserLayout>
  );
}
