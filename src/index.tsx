import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { App } from '~/pages'

import './styles/global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(<RouterProvider router={router} />)
