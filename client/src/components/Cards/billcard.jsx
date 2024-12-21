import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Chip } from '@nextui-org/react';

const getStatusLabel = (status) => {
  switch (status) {
    case '2':
      return 'Approved';
    case '1':
      return 'Pending';
    case '0':
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

const BillCard = ({ imageUrl, title, subtitle, description, status, date,onPress }) => {
  return (
    <Card className="min-w-[400px] cursor-pointer flex-1" isPressable onPress={onPress}>
      <CardHeader className="flex gap-3">
        <Image
          alt={title}
          height={40}
          radius="sm"
          src={imageUrl}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{subtitle}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {description.split('\n').map((line, index) => {
          const [label, value] = line.split(':');
          return (
            <p key={index}>
              <strong>{label}:</strong> {value.trim()}
            </p>
          );
        })}
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full flex justify-between">
          <p className="text-xs text-default-500 mt-2">Date: {date}</p> 
          <Chip className="text-white  font-extrabold " color={status === '1' ? 'warning' : status === '2' ? 'success' : 'danger'}>
            {getStatusLabel(status)}
          </Chip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BillCard;
