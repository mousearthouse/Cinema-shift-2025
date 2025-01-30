import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';

import {
    MainPage,
    FilmPage
} from '@/components/imports';

import { Layout } from '@/components/Layout/Layout';

import { ROUTES } from '@/utils/routes';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route path={ROUTES.MAINPAGE} element = {<MainPage/>} />
            <Route path={ROUTES.FILMPAGE} element = {<FilmPage/>} />
        </Route>,
    )
)

export const Router = () => <RouterProvider router={router} />;