import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTE_HOME } from 'routes';

export const RedirectToHome: FC = (): ReactElement => (
  <Redirect to={ROUTE_HOME} />
);
