import React from "react";
import { Card,CardHeader, CardBody, Divider } from "@nextui-org/react";

const CountCard = ({ title, count }) => {
  return (
    <Card hoverable className="flex justify-between items-center">
      <div className="p-4 w-[200]">
        <CardHeader>
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{title}</p>
        </div>  
        </CardHeader>
        <Divider/>
        <CardBody>
            <h2>{count}</h2>
        </CardBody>
      </div>
    </Card>
  );
};

export default CountCard;
