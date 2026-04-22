import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: string
  children?: ChildItem[]
  item?: unknown
  url?: string
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: string
  id?: number | string
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: string
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  // ==================== NON-PRO SECTIONS ====================
  {
    heading: 'Dashboard',
    children: [
      {
        name: 'Home',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/',
        isPro: false,
      },
    ],
  },


  {
    heading: 'Users Management',
    children: [
      {
        id: uniqueId(),
        name: 'Roles',
        icon: 'solar:notes-linear',
        url: 'superAdmin/usersmanagement/roles',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'Users',
        icon: 'solar:ticker-star-linear',
        url: '/superAdmin/usersmanagement/users',
        isPro: false,
      },
      {
        name: 'Organization',
        id: uniqueId(),
        icon: 'solar:sort-by-alphabet-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Organizations',
            url: '/superAdmin/usersmanagement/organization/organizations',
            isPro: false,
          },
          {
            id: uniqueId(),
            name: 'Schema',
            url: '/superAdmin/usersmanagement/organization/schema',
            isPro: false,
          },
        ],
      },
    ],
  },



 




  {
    heading: 'Organization Management',
    children: [
      {
        name: 'Hoshpital',
        id: uniqueId(),
        icon: 'solar:login-2-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Hoshpitals',
            url: '/superAdmin/organizationmanagement/hoshpital/hoshpitals',
            isPro: true,
          },
        ],
      },
      // {
      //   name: 'Blood Donation',
      //   id: uniqueId(),
      //   icon: 'solar:user-plus-rounded-linear',
      //   children: [
      //     {
      //       id: uniqueId(),
      //       name: 'Side Register',
      //       url: '/hrm_image/blood-donation.png',
      //       isPro: true,
      //     },
      //   ],
      // },
      // {
      //   name: 'Pharmacy',
      //   id: uniqueId(),
      //   icon: 'solar:password-linear',
      //   children: [
      //     {
      //       id: uniqueId(),
      //       name: 'Side Forgot Pwd',
      //       url: 'https://react.tailwind-admin.com/auth/auth1/forgot-password',
      //       isPro: true,
      //     },
      //     {
      //       id: uniqueId(),
      //       name: 'Boxed Forgot Pwd',
      //       url: 'https://react.tailwind-admin.com/auth/auth2/forgot-password',
      //       isPro: true,
      //     },
      //   ],
      // },
      // {
      //   name: 'Laboratory',
      //   id: uniqueId(),
      //   icon: 'solar:shield-keyhole-minimalistic-linear',
      //   children: [
      //     {
      //       id: uniqueId(),
      //       name: 'Side Two Steps',
      //       url: 'https://react.tailwind-admin.com/auth/auth1/two-steps',
      //       isPro: true,
      //     },
      //     {
      //       id: uniqueId(),
      //       name: 'Boxed Two Steps',
      //       url: 'https://react.tailwind-admin.com/auth/auth2/two-steps',
      //       isPro: true,
      //     },
      //   ],
      // },
     
    ],
  },
  //  {
  //   heading: 'Doctors Management',
  //   children: [
  //     {
  //       name: 'Doctors',
  //       id: uniqueId(),
  //       icon: 'solar:sort-by-alphabet-linear',
  //       children: [
  //         {
  //           id: uniqueId(),
  //           name: 'Doctors',
  //           url: '/apps/blog/post',
  //           isPro: false,
  //         },
  //         {
  //           id: uniqueId(),
  //           name: 'Appointments',
  //           url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
  //           isPro: false,
  //         },
  //         {
  //           id: uniqueId(),
  //           name: 'Meetings',
  //           url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
  //           isPro: false,
  //         },
  //       ],
  //     },
  //   ],
  // },

]

export default SidebarContent
