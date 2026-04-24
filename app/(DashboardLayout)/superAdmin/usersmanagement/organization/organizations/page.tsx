
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
    title: 'Organizations',
  },
]

const OrganizationData = [
  {
    name: {
      text: "City Care Hospital",
      image: "/hrm_image/hospital.png"
    },
    email: "contact@citycare.com",
    orgtype: "Hospital",
    registration_number: "HOSP-7788",
    emergency_contact: "+1-800-222-1000",
    Tax_id: "TX-77889",
    website: "www.citycarehospital.com",
    address_line1: "45 Health Street",
    address_line2: "Block B",
    city: "New York",
    state: "NY",
    country: "USA",
    postal_code: "10001",
    description: "24/7 multi-specialty hospital",
    continent: "North America",
    established_date: "2008-03-21",
  },

  {
    name: {
      text: "LifeSaver Blood Bank",
      image: "/hrm_image/blood-donation.png"
    },
    email: "donate@lifesaver.org",
    orgtype: "Blood Donation",
    registration_number: "BLD-5544",
    emergency_contact: "+1-800-BLOOD",
    Tax_id: "TX-55443",
    website: "www.lifesaverblood.org",
    address_line1: "12 Red Cross Lane",
    address_line2: "",
    city: "Chicago",
    state: "IL",
    country: "USA",
    postal_code: "60601",
    description: "Blood donation and emergency supply services",
    continent: "North America",
    established_date: "2012-09-10",
  },

  {
    name: {
      text: "GreenLeaf Pharmacy",
      image: "/hrm_image/pharmacy.png"
    },
    email: "support@greenleafpharma.com",
    orgtype: "Pharmacy",
    registration_number: "PHM-2233",
    emergency_contact: "+1-800-MEDS",
    Tax_id: "TX-22334",
    website: "www.greenleafpharma.com",
    address_line1: "78 Wellness Blvd",
    address_line2: "",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    postal_code: "90001",
    description: "Retail and prescription pharmacy",
    continent: "North America",
    established_date: "2016-01-05",
  },

  {
    name: {
      text: "Precision Lab Services",
      image: "/hrm_image/laboratory.png"
    },
    email: "info@precisionlab.com",
    orgtype: "Laboratory",
    registration_number: "LAB-8899",
    emergency_contact: "+1-800-LABS",
    Tax_id: "TX-88990",
    website: "www.precisionlab.com",
    address_line1: "200 Science Park",
    address_line2: "Building 3",
    city: "Boston",
    state: "MA",
    country: "USA",
    postal_code: "02115",
    description: "Diagnostic and research laboratory",
    continent: "North America",
    established_date: "2010-11-18",
  },

  {
    name: {
      text: "Hope Blood Donation Center",
      image: "/hrm_image/blood-donation.png"
    },
    email: "help@hopeblood.org",
    orgtype: "Blood Donation",
    registration_number: "BLD-9900",
    emergency_contact: "+1-800-HOPE",
    Tax_id: "TX-99001",
    website: "www.hopeblood.org",
    address_line1: "55 Charity Road",
    address_line2: "",
    city: "Houston",
    state: "TX",
    country: "USA",
    postal_code: "77001",
    description: "Community blood donation drives",
    continent: "North America",
    established_date: "2018-07-22",
  },
  {
  name: {
    text: "Sunrise Medical Center",
      image: "/hrm_image/blood-donation.png"
  },
  email: "info@sunrisemedical.com",
  orgtype: "Hospital",
  registration_number: "HOSP-1122",
  emergency_contact: "+1-800-SUNCARE",
  Tax_id: "TX-11223",
  website: "www.sunrisemedical.com",
  address_line1: "90 Sunrise Avenue",
  address_line2: "",
  city: "Miami",
  state: "FL",
  country: "USA",
  postal_code: "33101",
  description: "Advanced healthcare and emergency services",
  continent: "North America",
  established_date: "2011-04-15",
},

{
  name: {
    text: "MediQuick Pharmacy",
      image: "/hrm_image/blood-donation.png"
  },
  email: "contact@mediquick.com",
  orgtype: "Pharmacy",
  registration_number: "PHM-4455",
  emergency_contact: "+1-800-QUICKMED",
  Tax_id: "TX-44556",
  website: "www.mediquickpharmacy.com",
  address_line1: "22 Care Street",
  address_line2: "",
  city: "Seattle",
  state: "WA",
  country: "USA",
  postal_code: "98101",
  description: "Fast and reliable prescription services",
  continent: "North America",
  established_date: "2017-08-09",
},

{
  name: {
    text: "BioTest Laboratory",
      image: "/hrm_image/blood-donation.png"
  },
  email: "support@biotestlabs.com",
  orgtype: "Laboratory",
  registration_number: "LAB-3344",
  emergency_contact: "+1-800-BIOTEST",
  Tax_id: "TX-33445",
  website: "www.biotestlabs.com",
  address_line1: "10 Research Way",
  address_line2: "Floor 2",
  city: "San Diego",
  state: "CA",
  country: "USA",
  postal_code: "92101",
  description: "Clinical and diagnostic testing services",
  continent: "North America",
  established_date: "2013-02-28",
},

{
  name: {
    text: "RedDrop Blood Center",
      image: "/hrm_image/blood-donation.png"
  },
  email: "donate@reddrop.org",
  orgtype: "Blood Donation",
  registration_number: "BLD-6677",
  emergency_contact: "+1-800-REDDROP",
  Tax_id: "TX-66778",
  website: "www.reddrop.org",
  address_line1: "5 Humanity Plaza",
  address_line2: "",
  city: "Atlanta",
  state: "GA",
  country: "USA",
  postal_code: "30301",
  description: "Voluntary blood donation and awareness programs",
  continent: "North America",
  established_date: "2014-06-11",
},

{
  name: {
    text: "CarePlus Hospital",
      image: "/hrm_image/blood-donation.png"
  },
  email: "support@careplus.com",
  orgtype: "Hospital",
  registration_number: "HOSP-5566",
  emergency_contact: "+1-800-CAREPLUS",
  Tax_id: "TX-55667",
  website: "www.careplushospital.com",
  address_line1: "300 Healing Blvd",
  address_line2: "",
  city: "Dallas",
  state: "TX",
  country: "USA",
  postal_code: "75001",
  description: "Comprehensive patient care and surgery center",
  continent: "North America",
  established_date: "2009-12-05",
},

{
  name: {
    text: "HealthFirst Pharmacy",
      image: "/hrm_image/blood-donation.png"
  },
  email: "hello@healthfirst.com",
  orgtype: "Pharmacy",
  registration_number: "PHM-7788",
  emergency_contact: "+1-800-HEALTH",
  Tax_id: "TX-77880",
  website: "www.healthfirstpharmacy.com",
  address_line1: "15 Wellness Drive",
  address_line2: "",
  city: "Denver",
  state: "CO",
  country: "USA",
  postal_code: "80014",
  description: "Affordable medicines and healthcare products",
  continent: "North America",
  established_date: "2019-03-17",
}
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title='Table' items={BCrumb} />
      <DataTable data={OrganizationData}  />
    </>
  );
};

export default page;
