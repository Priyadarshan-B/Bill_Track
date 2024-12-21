import React from "react";
import { Card, CardHeader, Image, CardBody, Divider } from "@nextui-org/react";

const CountCard = ({ title,imageUrl, subtitle, count }) => {
  return (
    <Card hoverable className="flex justify-between items-center">
      <div className="p-2 w-[200]">
        <CardHeader>
          <div className="flex gap-3">
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
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <h2 className="flex justify-center text-lg font-semibold">{count}</h2>
        </CardBody>
      </div>
    </Card>
  );
};

export default CountCard;
