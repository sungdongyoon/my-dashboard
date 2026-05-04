import React from "react";
import { Badge } from "./ui/badge";
import { Spinner } from "./ui/spinner";

const Loading = () => {
  return (
    <div>
      <Badge>
        <Spinner data-icon="inline-start" />
        loading
      </Badge>
    </div>
  );
};

export default Loading;
