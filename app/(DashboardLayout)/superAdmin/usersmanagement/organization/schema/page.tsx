
import React from "react";
import BreadcrumbComp from "../../../../layout/shared/breadcrumb/BreadcrumbComp";
import DataTable from "../../../../../components/utilities/data-table/DataTable";

const BCrumb = [
  {
    to: '/',
    title: 'UsersManagement',
  },
  {
    title: 'Organization',
  },
  {
    title: 'Schema',
  },
]

 const SchemaName = [
  {
    organizationName: "City Care Hospital",
    tenantName: "UintedKingdom",
    status: "Active",
    created_at: "2022-01-10T08:30:00Z",
    updated_at: "2024-03-12T10:15:00Z",
    deleted_at: ""
  },
  {
    organizationName: "LifeSaver Blood Bank",
    tenantName: "USA",
    status: "Active",
    created_at: "2021-06-25T09:45:00Z",
    updated_at: "2023-11-05T14:20:00Z",
    deleted_at: ""
  },
  {
    organizationName: "GreenLeaf Pharmacy",
    tenantName: "UintedKingdom",
    status: "Inactive",
    created_at: "2020-09-18T07:20:00Z",
    updated_at: "2022-12-01T11:10:00Z",
    deleted_at: "2023-01-01T00:00:00Z"
  },
  {
    organizationName: "Precision Lab Services",
    tenantName: "USA",
    status: "Active",
    created_at: "2019-03-12T12:00:00Z",
    updated_at: "2024-01-20T16:45:00Z",
    deleted_at: ""
  },
  {
    organizationName: "Hope Blood Donation Center",
    tenantName: "Canada",
    status: "Pending",
    created_at: "2023-07-01T10:10:00Z",
    updated_at: "",
    deleted_at: ""
  },
  {
    organizationName: "Sunrise Medical Center",
    tenantName: "USA",
    status: "Active",
    created_at: "2022-05-14T06:50:00Z",
    updated_at: "2024-02-18T09:30:00Z",
    deleted_at: ""
  },
  {
    organizationName: "MediQuick Pharmacy",
    tenantName: "UintedKingdom",
    status: "Inactive",
    created_at: "2021-11-03T13:25:00Z",
    updated_at: "2022-08-19T15:00:00Z",
    deleted_at: "2022-09-01T00:00:00Z"
  },
  {
    organizationName: "BioTest Laboratory",
    tenantName: "UintedKingdom",
    status: "Active",
    created_at: "2020-02-22T08:00:00Z",
    updated_at: "2023-10-30T17:40:00Z",
    deleted_at: ""
  },
  {
    organizationName: "RedDrop Blood Center",
    tenantName: "USA",
    status: "Pending",
    created_at: "2024-01-05T09:00:00Z",
    updated_at: "",
    deleted_at: ""
  },
  {
    organizationName: "CarePlus Hospital",
    tenantName: "Europ",
    status: "Active",
    created_at: "2018-12-11T07:15:00Z",
    updated_at: "2024-04-01T12:00:00Z",
    deleted_at: ""
  }
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title='Table' items={BCrumb} />
      <DataTable data={SchemaName}  />
    </>
  );
};

export default page;
