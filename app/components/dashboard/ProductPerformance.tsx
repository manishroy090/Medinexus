'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import CardBox from '../shared/CardBox'
import { Badge } from '../../components/ui/badge'

export const ProductPerformance = () => {
  const PerformersData = [
  {
    key: 'performerData1',
    organizationName: 'Everest General Hospital',
    OrganizationType: 'Hospital',
    package: 'Starter',
    Duration: '1 Year',
  },
  {
    key: 'performerData2',
    organizationName: 'Himalayan Care Pharmacy',
    OrganizationType: 'Pharmacy',
    package: 'Premium',
    Duration: '2 Year',
  },
  {
    key: 'performerData3',
    organizationName: 'Kathmandu Diagnostic Laboratory',
    OrganizationType: 'Laboratory',
    package: 'Growth',
    Duration: '3 Year',
  },
  {
    key: 'performerData4',
    organizationName: 'City Health Clinic',
    OrganizationType: 'Clinic',
    package: 'Starter',
    Duration: '4 Year',
  },
  {
    key: 'performerData5',
    organizationName: 'Green Cross Medical Center',
    OrganizationType: 'Medical Center',
    package: 'Premium',
    Duration: '5 Year',
  },
  {
    key: 'performerData6',
    organizationName: 'LifeCare Blood Bank',
    OrganizationType: 'Blood Bank',
    package: 'Starter',
    Duration: '6 Year',
  }
]
  return (
    <CardBox>
      <div id='product' className='mb-6'>
        <div>
          <h5 className='card-title'>Recent Order</h5>
          <p className='text-sm text-muted-foreground font-normal'>
            Overview of Recent Order
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='-m-1.5 overflow-x-auto'>
          <div className='p-1.5 min-w-full inline-block align-middle'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='text-sm font-semibold'>Id</TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Organization Name
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Organization Type
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Package
                    </TableHead>
                    <TableHead className='text-sm font-semibold'>
                      Duration
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {PerformersData.map((item, index) => (
                    <TableRow key={item.key} className='border-b border-border'>
                      <TableCell>
                        <p className='text-muted-foreground font-medium text-sm'>
                          {index + 1}
                        </p>
                      </TableCell>

                      <TableCell className='ps-0 min-w-[200px]'>
                        <div>
                          <h6 className='text-sm font-semibold mb-1'>
                            {item.organizationName}
                          </h6>
                          <p className='text-xs font-medium text-muted-foreground'>
                            {item.OrganizationType}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <p className='font-medium text-muted-foreground text-sm'>
                          {item.OrganizationType}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`text-[13px] px-3 rounded-full justify-center py-0.5 ${item.bgcolor}`}>
                          {item.package}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <p className='text-muted-foreground text-[15px] font-medium'>
                          {item.Duration}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </CardBox>
  )
}
