import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';

import {
    MainPage,
} from '@/components/imports';

import { ROUTES } from '@/utils/routes';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={ROUTES.MAINPAGE} element = {<MainPage/>} />
    )
)

export const Router = () => <RouterProvider router={router} />;