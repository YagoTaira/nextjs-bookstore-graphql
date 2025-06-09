"use client";

import { RelayEnvironmentProvider } from "react-relay";
import { ReactNode } from "react";
import { RelayEnvironment } from "./RelayEnvironment";

type Props = {
  children: ReactNode;
};

export const RelayProvider = ({ children }: Props) => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
