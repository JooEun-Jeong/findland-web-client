/** Findland Admin Page
 *  - Listing all payment by status.
 *  - Approve payment.
 */
import React from 'react';

import { TransferRequestListComponent } from '@pages/Admin/TransferRequestListComponent';

export interface AdminProps {}

// eslint-disable-next-line no-empty-pattern
export const Admin = ({}: AdminProps) => {
  return (
    <div>
      <h1>Admin Page: Transfer Request List</h1>
      <TransferRequestListComponent />
    </div>
  );
};
