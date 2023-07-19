import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getInvoiceById } from 'apiSdk/invoices';
import { InvoiceInterface } from 'interfaces/invoice';

function InvoiceViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<InvoiceInterface>(
    () => (id ? `/invoices/${id}` : null),
    () =>
      getInvoiceById(id, {
        relations: ['garage', 'user_invoice_mechanic_idTouser', 'user_invoice_accountant_idTouser'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Invoices',
              link: '/invoices',
            },
            {
              label: 'Invoice Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper>
              <Stack direction="column" spacing={2} mb={4}>
                <Text
                  sx={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: 'base.content',
                  }}
                >
                  Invoice Details
                </Text>
              </Stack>
              <List spacing={3} w="100%">
                <FormListItem label="Status:" text={data?.status} />

                <FormListItem label="Payment Status:" text={data?.payment_status} />

                <FormListItem label="Created At:" text={data?.created_at as unknown as string} />

                <FormListItem label="Updated At:" text={data?.updated_at as unknown as string} />

                {hasAccess('garage', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Garage:"
                    text={
                      <Link as={NextLink} href={`/garages/view/${data?.garage?.id}`}>
                        {data?.garage?.name}
                      </Link>
                    }
                  />
                )}
                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User Invoice Mechanic Id Touser:"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user_invoice_mechanic_idTouser?.id}`}>
                        {data?.user_invoice_mechanic_idTouser?.email}
                      </Link>
                    }
                  />
                )}
                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User Invoice Accountant Id Touser:"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user_invoice_accountant_idTouser?.id}`}>
                        {data?.user_invoice_accountant_idTouser?.email}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'invoice',
    operation: AccessOperationEnum.READ,
  }),
)(InvoiceViewPage);
