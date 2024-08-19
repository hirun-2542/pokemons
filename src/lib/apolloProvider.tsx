"use client";

import React from "react";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";

interface Props {
  children: React.ReactNode;
}

export const ApolloProvider: React.FC<Props> = ({ children }) => {
  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
};
